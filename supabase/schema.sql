-- Contacts table schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  location TEXT,
  category TEXT CHECK (category IN ('Employee', 'Customers', 'Partners')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_category ON contacts(category);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (adjust based on your auth needs)
-- For public access (no auth required):
CREATE POLICY "Allow public read access" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON contacts
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON contacts
  FOR DELETE USING (true);

-- Function to auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function on updates
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
