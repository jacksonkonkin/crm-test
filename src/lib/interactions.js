import { supabase } from './supabase'

/**
 * Fetch all interactions with optional filters
 */
export async function fetchInteractions({
  search = '',
  type = 'all',
  contactId = null,
  organizationId = null,
  requiresFollowup = null,
  sortBy = 'interaction_date',
  sortDirection = 'desc',
  limit = null
} = {}) {
  let query = supabase
    .from('interactions')
    .select(`
      *,
      contact:contacts(id, name, email),
      organization:organizations(id, name, type),
      program:programs(id, name),
      workshop:workshops(id, name)
    `)

  // Apply search filter
  if (search) {
    query = query.or(`subject.ilike.%${search}%,summary.ilike.%${search}%,details.ilike.%${search}%`)
  }

  // Apply type filter
  if (type !== 'all') {
    query = query.eq('type', type)
  }

  // Filter by contact
  if (contactId) {
    query = query.eq('contact_id', contactId)
  }

  // Filter by organization
  if (organizationId) {
    query = query.eq('organization_id', organizationId)
  }

  // Filter by followup required
  if (requiresFollowup !== null) {
    query = query.eq('requires_followup', requiresFollowup)
    if (requiresFollowup) {
      query = query.eq('followup_completed', false)
    }
  }

  // Apply sorting
  query = query.order(sortBy, { ascending: sortDirection === 'asc' })

  // Apply limit
  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching interactions:', error)
    throw error
  }

  return data
}

/**
 * Fetch a single interaction by ID
 */
export async function fetchInteractionById(id) {
  const { data, error } = await supabase
    .from('interactions')
    .select(`
      *,
      contact:contacts(id, name, email, phone),
      organization:organizations(id, name, type),
      program:programs(id, name),
      workshop:workshops(id, name)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching interaction:', error)
    throw error
  }

  return data
}

/**
 * Fetch interactions for a contact
 */
export async function fetchContactInteractions(contactId, limit = null) {
  let query = supabase
    .from('interactions')
    .select(`
      *,
      organization:organizations(id, name)
    `)
    .eq('contact_id', contactId)
    .order('interaction_date', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching contact interactions:', error)
    throw error
  }

  return data
}

/**
 * Fetch interactions for an organization
 */
export async function fetchOrganizationInteractions(organizationId, limit = null) {
  let query = supabase
    .from('interactions')
    .select(`
      *,
      contact:contacts(id, name)
    `)
    .eq('organization_id', organizationId)
    .order('interaction_date', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching organization interactions:', error)
    throw error
  }

  return data
}

/**
 * Fetch pending follow-ups
 */
export async function fetchPendingFollowups() {
  const { data, error } = await supabase
    .from('interactions')
    .select(`
      *,
      contact:contacts(id, name, email),
      organization:organizations(id, name)
    `)
    .eq('requires_followup', true)
    .eq('followup_completed', false)
    .order('followup_date', { ascending: true, nullsFirst: false })

  if (error) {
    console.error('Error fetching pending followups:', error)
    throw error
  }

  return data
}

/**
 * Create a new interaction
 */
export async function createInteraction(interaction) {
  const { data, error } = await supabase
    .from('interactions')
    .insert(interaction)
    .select()
    .single()

  if (error) {
    console.error('Error creating interaction:', error)
    throw error
  }

  // Update last_interaction_date on contact if applicable
  if (interaction.contact_id) {
    await supabase
      .from('contacts')
      .update({ last_interaction_date: new Date().toISOString() })
      .eq('id', interaction.contact_id)
  }

  return data
}

/**
 * Update an existing interaction
 */
export async function updateInteraction(id, updates) {
  const { data, error } = await supabase
    .from('interactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating interaction:', error)
    throw error
  }

  return data
}

/**
 * Mark followup as completed
 */
export async function completeFollowup(id) {
  return updateInteraction(id, { followup_completed: true })
}

/**
 * Delete an interaction
 */
export async function deleteInteraction(id) {
  const { error } = await supabase
    .from('interactions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting interaction:', error)
    throw error
  }

  return true
}

/**
 * Quick log an email interaction
 */
export async function logEmail({
  contactId = null,
  organizationId = null,
  subject,
  summary,
  direction = 'Inbound',
  emailFrom = null,
  emailTo = null,
  requiresFollowup = false,
  followupDate = null
}) {
  return createInteraction({
    type: 'Email',
    direction,
    contact_id: contactId,
    organization_id: organizationId,
    subject,
    summary,
    email_from: emailFrom,
    email_to: emailTo,
    requires_followup: requiresFollowup,
    followup_date: followupDate
  })
}

/**
 * Quick log a phone call
 */
export async function logPhoneCall({
  contactId = null,
  organizationId = null,
  subject,
  summary,
  direction = 'Outbound',
  requiresFollowup = false,
  followupDate = null
}) {
  return createInteraction({
    type: 'Phone',
    direction,
    contact_id: contactId,
    organization_id: organizationId,
    subject,
    summary,
    requires_followup: requiresFollowup,
    followup_date: followupDate
  })
}

/**
 * Quick log a meeting
 */
export async function logMeeting({
  contactId = null,
  organizationId = null,
  subject,
  summary,
  details = null,
  requiresFollowup = false,
  followupDate = null
}) {
  return createInteraction({
    type: 'Meeting',
    direction: 'N/A',
    contact_id: contactId,
    organization_id: organizationId,
    subject,
    summary,
    details,
    requires_followup: requiresFollowup,
    followup_date: followupDate
  })
}

/**
 * Quick add a note
 */
export async function addNote({
  contactId = null,
  organizationId = null,
  programId = null,
  subject,
  details
}) {
  return createInteraction({
    type: 'Note',
    direction: 'N/A',
    contact_id: contactId,
    organization_id: organizationId,
    program_id: programId,
    subject,
    details
  })
}

/**
 * Subscribe to realtime changes on interactions table
 */
export function subscribeToInteractions(callback) {
  const channel = supabase
    .channel('interactions_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'interactions' },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Interaction type options for UI
export const INTERACTION_TYPES = [
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone Call' },
  { value: 'Meeting', label: 'Meeting' },
  { value: 'Event', label: 'Event' },
  { value: 'Note', label: 'Note' },
  { value: 'Social_Media', label: 'Social Media' },
  { value: 'Other', label: 'Other' }
]

// Interaction direction options for UI
export const INTERACTION_DIRECTIONS = [
  { value: 'Inbound', label: 'Inbound (they contacted us)' },
  { value: 'Outbound', label: 'Outbound (we contacted them)' },
  { value: 'N/A', label: 'N/A' }
]
