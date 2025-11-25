import { supabase } from './supabase'

/**
 * Fetch all workshops with optional filters
 */
export async function fetchWorkshops({
  search = '',
  type = 'all',
  status = 'all',
  upcoming = false,
  sortBy = 'event_date',
  sortDirection = 'asc',
  limit = null
} = {}) {
  let query = supabase
    .from('workshops')
    .select(`
      *,
      organization:organizations(id, name, type),
      program:programs(id, name)
    `)

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%,facilitator_name.ilike.%${search}%`)
  }

  // Apply type filter
  if (type !== 'all') {
    query = query.eq('type', type)
  }

  // Apply status filter
  if (status !== 'all') {
    query = query.eq('status', status)
  }

  // Filter to upcoming only
  if (upcoming) {
    query = query.gte('event_date', new Date().toISOString().split('T')[0])
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortDirection === 'asc' })

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching workshops:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single workshop by ID
 */
export async function fetchWorkshopById(id) {
  const { data, error } = await supabase
    .from('workshops')
    .select(`
      *,
      organization:organizations(id, name, type),
      program:programs(id, name),
      facilitator:contacts!workshops_facilitator_contact_id_fkey(id, name, email, phone)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching workshop:', error)
    throw error
  }

  return data
}

/**
 * Fetch registrations for a workshop
 */
export async function fetchWorkshopRegistrations(workshopId) {
  const { data, error } = await supabase
    .from('workshop_registrations')
    .select(`
      *,
      contact:contacts(id, name, email, phone, contact_type)
    `)
    .eq('workshop_id', workshopId)
    .order('registration_date', { ascending: false })

  if (error) {
    console.error('Error fetching workshop registrations:', error)
    throw error
  }

  return data
}

/**
 * Get registration count for a workshop
 */
export async function getWorkshopRegistrationCount(workshopId) {
  const { count, error } = await supabase
    .from('workshop_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('workshop_id', workshopId)
    .in('status', ['Registered', 'Confirmed', 'Attended', 'Completed'])

  if (error) {
    console.error('Error getting registration count:', error)
    throw error
  }

  return count || 0
}

/**
 * Create a new workshop
 */
export async function createWorkshop(workshop) {
  const { data, error } = await supabase
    .from('workshops')
    .insert(workshop)
    .select()
    .single()

  if (error) {
    console.error('Error creating workshop:', error)
    throw error
  }

  return data
}

/**
 * Update an existing workshop
 */
export async function updateWorkshop(id, updates) {
  const { data, error } = await supabase
    .from('workshops')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating workshop:', error)
    throw error
  }

  return data
}

/**
 * Delete a workshop
 */
export async function deleteWorkshop(id) {
  const { error } = await supabase
    .from('workshops')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting workshop:', error)
    throw error
  }

  return true
}

/**
 * Register a contact for a workshop
 */
export async function registerContactForWorkshop(contactId, workshopId, {
  role = 'Participant',
  status = 'Registered',
  feeAmount = null
} = {}) {
  const { data, error } = await supabase
    .from('workshop_registrations')
    .insert({
      contact_id: contactId,
      workshop_id: workshopId,
      role,
      status,
      fee_amount: feeAmount
    })
    .select()
    .single()

  if (error) {
    console.error('Error registering contact for workshop:', error)
    throw error
  }

  // Update workshop registered_count
  await updateWorkshopRegisteredCount(workshopId)

  return data
}

/**
 * Update registration status
 */
export async function updateRegistrationStatus(registrationId, status) {
  const { data, error } = await supabase
    .from('workshop_registrations')
    .update({ status })
    .eq('id', registrationId)
    .select()
    .single()

  if (error) {
    console.error('Error updating registration status:', error)
    throw error
  }

  return data
}

/**
 * Check in attendee
 */
export async function checkInAttendee(registrationId) {
  const { data, error } = await supabase
    .from('workshop_registrations')
    .update({
      attended: true,
      check_in_time: new Date().toISOString(),
      status: 'Attended'
    })
    .eq('id', registrationId)
    .select()
    .single()

  if (error) {
    console.error('Error checking in attendee:', error)
    throw error
  }

  return data
}

/**
 * Remove registration
 */
export async function removeRegistration(registrationId, workshopId) {
  const { error } = await supabase
    .from('workshop_registrations')
    .delete()
    .eq('id', registrationId)

  if (error) {
    console.error('Error removing registration:', error)
    throw error
  }

  // Update workshop registered_count
  if (workshopId) {
    await updateWorkshopRegisteredCount(workshopId)
  }

  return true
}

/**
 * Update workshop's registered_count
 */
async function updateWorkshopRegisteredCount(workshopId) {
  const count = await getWorkshopRegistrationCount(workshopId)
  await supabase
    .from('workshops')
    .update({ registered_count: count })
    .eq('id', workshopId)
}

/**
 * Subscribe to realtime changes on workshops table
 */
export function subscribeToWorkshops(callback) {
  const channel = supabase
    .channel('workshops_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'workshops' },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Workshop type options for UI
export const WORKSHOP_TYPES = [
  { value: 'Clinic', label: 'Clinic' },
  { value: 'Seminar', label: 'Seminar' },
  { value: 'Info_Session', label: 'Info Session' },
  { value: 'Training', label: 'Training' },
  { value: 'Conference', label: 'Conference' },
  { value: 'Networking', label: 'Networking' },
  { value: 'Other', label: 'Other' }
]

// Workshop status options for UI
export const WORKSHOP_STATUSES = [
  { value: 'planning', label: 'Planning' },
  { value: 'open', label: 'Open for Registration' },
  { value: 'full', label: 'Full' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]
