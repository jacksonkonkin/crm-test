-- Migration: Add user_id to contacts and update RLS policies
-- Run this in your Supabase SQL Editor after enabling authentication

-- Step 1: Add user_id column to contacts table
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Step 2: Create index on user_id for performance
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);

-- Step 3: Drop existing permissive policies
DROP POLICY IF EXISTS "Allow public read access" ON contacts;
DROP POLICY IF EXISTS "Allow public insert access" ON contacts;
DROP POLICY IF EXISTS "Allow public update access" ON contacts;
DROP POLICY IF EXISTS "Allow public delete access" ON contacts;

-- Step 4: Create secure RLS policies that require authentication

-- Users can only read their own contacts
CREATE POLICY "Users can read own contacts" ON contacts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert contacts with their own user_id
CREATE POLICY "Users can insert own contacts" ON contacts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own contacts
CREATE POLICY "Users can update own contacts" ON contacts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own contacts
CREATE POLICY "Users can delete own contacts" ON contacts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Step 5: Create a function to automatically set user_id on insert
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Step 6: Create trigger to auto-set user_id
DROP TRIGGER IF EXISTS set_contacts_user_id ON contacts;
CREATE TRIGGER set_contacts_user_id
  BEFORE INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();
