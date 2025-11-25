import { supabase } from './supabase'

// Generic CRUD operations for any table

/**
 * Fetch all records from a table
 * @param {string} table - Table name
 * @param {Object} options - Query options (select, order, limit, etc.)
 */
export async function fetchAll(table, options = {}) {
  let query = supabase.from(table).select(options.select || '*')

  if (options.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true })
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error(`Error fetching from ${table}:`, error)
    throw error
  }

  return data
}

/**
 * Fetch a single record by ID
 * @param {string} table - Table name
 * @param {string|number} id - Record ID
 */
export async function fetchById(table, id) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching ${table} by id:`, error)
    throw error
  }

  return data
}

/**
 * Insert a new record
 * @param {string} table - Table name
 * @param {Object} record - Record data
 */
export async function insert(table, record) {
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select()
    .single()

  if (error) {
    console.error(`Error inserting into ${table}:`, error)
    throw error
  }

  return data
}

/**
 * Update a record by ID
 * @param {string} table - Table name
 * @param {string|number} id - Record ID
 * @param {Object} updates - Fields to update
 */
export async function update(table, id, updates) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating ${table}:`, error)
    throw error
  }

  return data
}

/**
 * Delete a record by ID
 * @param {string} table - Table name
 * @param {string|number} id - Record ID
 */
export async function remove(table, id) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting from ${table}:`, error)
    throw error
  }

  return true
}

/**
 * Subscribe to realtime changes on a table
 * @param {string} table - Table name
 * @param {Function} callback - Callback function for changes
 */
export function subscribeToTable(table, callback) {
  const channel = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => callback(payload)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
