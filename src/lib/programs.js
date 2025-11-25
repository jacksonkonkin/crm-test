import { supabase } from './supabase'

/**
 * Fetch all programs with optional filters
 */
export async function fetchPrograms({
  search = '',
  type = 'all',
  status = 'all',
  sortBy = 'start_date',
  sortDirection = 'desc',
  limit = null
} = {}) {
  let query = supabase
    .from('programs')
    .select(`
      *,
      organization:organizations(id, name, type)
    `)

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,sport.ilike.%${search}%,location.ilike.%${search}%`)
  }

  // Apply type filter
  if (type !== 'all') {
    query = query.eq('type', type)
  }

  // Apply status filter
  if (status !== 'all') {
    query = query.eq('status', status)
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortDirection === 'asc', nullsFirst: false })

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching programs:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single program by ID with related data
 */
export async function fetchProgramById(id) {
  const { data, error } = await supabase
    .from('programs')
    .select(`
      *,
      organization:organizations(id, name, type)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching program:', error)
    throw error
  }

  return data
}

/**
 * Fetch enrollments for a program
 */
export async function fetchProgramEnrollments(programId) {
  const { data, error } = await supabase
    .from('program_enrollments')
    .select(`
      *,
      contact:contacts(id, name, email, phone, contact_type)
    `)
    .eq('program_id', programId)
    .order('enrollment_date', { ascending: false })

  if (error) {
    console.error('Error fetching program enrollments:', error)
    throw error
  }

  return data
}

/**
 * Get enrollment count for a program
 */
export async function getProgramEnrollmentCount(programId) {
  const { count, error } = await supabase
    .from('program_enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('program_id', programId)
    .in('status', ['Registered', 'Confirmed', 'Attended', 'Completed'])

  if (error) {
    console.error('Error getting enrollment count:', error)
    throw error
  }

  return count || 0
}

/**
 * Create a new program
 */
export async function createProgram(program) {
  const { data, error } = await supabase
    .from('programs')
    .insert(program)
    .select()
    .single()

  if (error) {
    console.error('Error creating program:', error)
    throw error
  }

  return data
}

/**
 * Update an existing program
 */
export async function updateProgram(id, updates) {
  const { data, error } = await supabase
    .from('programs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating program:', error)
    throw error
  }

  return data
}

/**
 * Delete a program
 */
export async function deleteProgram(id) {
  const { error } = await supabase
    .from('programs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting program:', error)
    throw error
  }

  return true
}

/**
 * Enroll a contact in a program
 */
export async function enrollContactInProgram(contactId, programId, {
  role = 'Participant',
  status = 'Registered',
  feeAmount = null
} = {}) {
  const { data, error } = await supabase
    .from('program_enrollments')
    .insert({
      contact_id: contactId,
      program_id: programId,
      role,
      status,
      fee_amount: feeAmount
    })
    .select()
    .single()

  if (error) {
    console.error('Error enrolling contact in program:', error)
    throw error
  }

  return data
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(enrollmentId, status) {
  const { data, error } = await supabase
    .from('program_enrollments')
    .update({ status })
    .eq('id', enrollmentId)
    .select()
    .single()

  if (error) {
    console.error('Error updating enrollment status:', error)
    throw error
  }

  return data
}

/**
 * Remove enrollment
 */
export async function removeEnrollment(enrollmentId) {
  const { error } = await supabase
    .from('program_enrollments')
    .delete()
    .eq('id', enrollmentId)

  if (error) {
    console.error('Error removing enrollment:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to realtime changes on programs table
 */
export function subscribeToPrograms(callback) {
  const channel = supabase
    .channel('programs_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'programs' },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Program type options for UI
export const PROGRAM_TYPES = [
  { value: 'Training', label: 'Training' },
  { value: 'Development', label: 'Development' },
  { value: 'Community', label: 'Community' },
  { value: 'Competition', label: 'Competition' },
  { value: 'Camp', label: 'Camp' },
  { value: 'Other', label: 'Other' }
]

// Program status options for UI
export const PROGRAM_STATUSES = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'on_hold', label: 'On Hold' }
]

// Enrollment status options for UI
export const ENROLLMENT_STATUSES = [
  { value: 'Registered', label: 'Registered' },
  { value: 'Waitlisted', label: 'Waitlisted' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Attended', label: 'Attended' },
  { value: 'Completed', label: 'Completed' },
  { value: 'No_Show', label: 'No Show' },
  { value: 'Withdrawn', label: 'Withdrawn' },
  { value: 'Cancelled', label: 'Cancelled' }
]
