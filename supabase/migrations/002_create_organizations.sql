-- Migration: Create organizations table
-- Organizations include LSOs, partners, schools, government agencies, funders, etc.

-- Create organization type enum
DO $$ BEGIN
  CREATE TYPE organization_type AS ENUM (
    'LSO',           -- Local Sport Organization
    'Partner',       -- Partner organization
    'School',        -- School or educational institution
    'Government',    -- Government agency
    'Community',     -- Community organization
    'Funder',        -- Funding organization/foundation
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create organization status enum
DO $$ BEGIN
  CREATE TYPE organization_status AS ENUM (
    'active',
    'inactive',
    'prospect'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type organization_type NOT NULL DEFAULT 'Other',
  status organization_status NOT NULL DEFAULT 'active',

  -- Contact information
  email TEXT,
  phone TEXT,
  website TEXT,

  -- Address
  address_street TEXT,
  address_city TEXT,
  address_province TEXT,
  address_postal_code TEXT,

  -- Additional info
  description TEXT,
  notes TEXT,
  tags TEXT[], -- Flexible tagging system

  -- Primary contact (will be linked via junction table, but store quick reference)
  primary_contact_id UUID,

  -- Ownership
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations(name);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_user_id ON organizations(user_id);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own organizations
CREATE POLICY "Users can read own organizations" ON organizations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own organizations" ON organizations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own organizations" ON organizations
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own organizations" ON organizations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to auto-set user_id on insert
DROP TRIGGER IF EXISTS set_organizations_user_id ON organizations;
CREATE TRIGGER set_organizations_user_id
  BEFORE INSERT ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- Trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
