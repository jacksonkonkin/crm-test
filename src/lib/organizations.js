import { supabase } from './supabase'

/**
 * Fetch all organizations with optional filters
 */
export async function fetchOrganizations({
  search = '',
  type = 'all',
  status = 'all',
  sortBy = 'name',
  sortDirection = 'asc',
  limit = null
} = {}) {
  let query = supabase
    .from('organizations')
    .select('*')

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,address_city.ilike.%${search}%`)
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
  query = query.order(sortBy, { ascending: sortDirection === 'asc' })

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching organizations:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single organization by ID with related data
 */
export async function fetchOrganizationById(id) {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      primary_contact:contacts!organizations_primary_contact_id_fkey(id, name, email, phone)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching organization:', error)
    throw error
  }

  return data
}

/**
 * Fetch contacts associated with an organization
 */
export async function fetchOrganizationContacts(organizationId) {
  const { data, error } = await supabase
    .from('contact_organizations')
    .select(`
      *,
      contact:contacts(*)
    `)
    .eq('organization_id', organizationId)

  if (error) {
    console.error('Error fetching organization contacts:', error)
    throw error
  }

  return data
}

/**
 * Create a new organization
 */
export async function createOrganization(organization) {
  const { data, error } = await supabase
    .from('organizations')
    .insert(organization)
    .select()
    .single()

  if (error) {
    console.error('Error creating organization:', error)
    throw error
  }

  return data
}

/**
 * Update an existing organization
 */
export async function updateOrganization(id, updates) {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating organization:', error)
    throw error
  }

  return data
}

/**
 * Delete an organization
 */
export async function deleteOrganization(id) {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting organization:', error)
    throw error
  }

  return true
}

/**
 * Link a contact to an organization
 */
export async function linkContactToOrganization(contactId, organizationId, { role = null, isPrimary = false } = {}) {
  const { data, error } = await supabase
    .from('contact_organizations')
    .insert({
      contact_id: contactId,
      organization_id: organizationId,
      role,
      is_primary: isPrimary
    })
    .select()
    .single()

  if (error) {
    console.error('Error linking contact to organization:', error)
    throw error
  }

  return data
}

/**
 * Unlink a contact from an organization
 */
export async function unlinkContactFromOrganization(contactId, organizationId) {
  const { error } = await supabase
    .from('contact_organizations')
    .delete()
    .eq('contact_id', contactId)
    .eq('organization_id', organizationId)

  if (error) {
    console.error('Error unlinking contact from organization:', error)
    throw error
  }

  return true
}

/**
 * Subscribe to realtime changes on organizations table
 */
export function subscribeToOrganizations(callback) {
  const channel = supabase
    .channel('organizations_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'organizations' },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Organization type options for UI
export const ORGANIZATION_TYPES = [
  { value: 'LSO', label: 'LSO (Local Sport Organization)' },
  { value: 'Partner', label: 'Partner' },
  { value: 'School', label: 'School' },
  { value: 'Government', label: 'Government' },
  { value: 'Community', label: 'Community Organization' },
  { value: 'Funder', label: 'Funder' },
  { value: 'Other', label: 'Other' }
]

// Organization status options for UI
export const ORGANIZATION_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'prospect', label: 'Prospect' }
]
