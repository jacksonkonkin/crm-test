import { supabase } from './supabase'

/**
 * Fetch all contacts with optional filters
 */
export async function fetchContacts({
  search = '',
  status = 'all',
  gender = 'all',
  category = 'all',
  sortBy = 'employee_id',
  sortDirection = 'asc',
  limit = null
} = {}) {
  let query = supabase
    .from('contacts')
    .select('*')

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,employee_id.ilike.%${search}%,role.ilike.%${search}%,location.ilike.%${search}%`)
  }

  // Apply status filter
  if (status !== 'all') {
    query = query.eq('status', status)
  }

  // Apply gender filter
  if (gender !== 'all') {
    query = query.eq('gender', gender)
  }

  // Apply category filter
  if (category !== 'all') {
    query = query.eq('category', category)
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortDirection === 'asc' })

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single contact by ID
 */
export async function fetchContactById(id) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching contact:', error)
    throw error
  }

  return data
}

/**
 * Create a new contact
 */
export async function createContact(contact) {
  // Generate employee_id if not provided
  if (!contact.employee_id) {
    const { data: maxId } = await supabase
      .from('contacts')
      .select('employee_id')
      .order('employee_id', { ascending: false })
      .limit(1)
      .single()

    const nextId = maxId ? parseInt(maxId.employee_id) + 1 : 1001
    contact.employee_id = String(nextId)
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single()

  if (error) {
    console.error('Error creating contact:', error)
    throw error
  }

  return data
}

/**
 * Update an existing contact
 */
export async function updateContact(id, updates) {
  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating contact:', error)
    throw error
  }

  return data
}

/**
 * Toggle contact status between 'active' and 'pending'
 */
export async function toggleContactStatus(id, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'pending' : 'active'
  return updateContact(id, { status: newStatus })
}

/**
 * Delete a contact
 */
export async function deleteContact(id) {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting contact:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to realtime changes on contacts table
 */
export function subscribeToContacts(callback) {
  const channel = supabase
    .channel('contacts_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'contacts' },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
