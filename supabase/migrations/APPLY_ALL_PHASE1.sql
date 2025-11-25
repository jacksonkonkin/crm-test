-- ============================================
-- PSCB CRM Phase 1 - Combined Migration Script
-- Run this in your Supabase SQL Editor
-- ============================================

-- IMPORTANT: This script creates new tables for Organizations, Programs,
-- Workshops, and Interactions. It does NOT modify existing contacts data.

-- ============================================
-- 1. Create helper functions if they don't exist
-- ============================================

-- Function to set user_id automatically
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. Create Organizations table
-- ============================================

-- Create organization type enum
DO $$ BEGIN
  CREATE TYPE organization_type AS ENUM (
    'LSO',
    'Partner',
    'School',
    'Government',
    'Community',
    'Funder',
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
  email TEXT,
  phone TEXT,
  website TEXT,
  address_street TEXT,
  address_city TEXT,
  address_province TEXT,
  address_postal_code TEXT,
  description TEXT,
  notes TEXT,
  tags TEXT[],
  primary_contact_id UUID,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations(name);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_user_id ON organizations(user_id);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create
DROP POLICY IF EXISTS "Users can read own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can insert own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can update own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can delete own organizations" ON organizations;

CREATE POLICY "Users can read own organizations" ON organizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own organizations" ON organizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own organizations" ON organizations
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own organizations" ON organizations
  FOR DELETE USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS set_organizations_user_id ON organizations;
CREATE TRIGGER set_organizations_user_id
  BEFORE INSERT ON organizations
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. Create Programs table
-- ============================================

DO $$ BEGIN
  CREATE TYPE program_type AS ENUM (
    'Training',
    'Development',
    'Community',
    'Competition',
    'Camp',
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE program_status AS ENUM (
    'planning',
    'active',
    'completed',
    'cancelled',
    'on_hold'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type program_type NOT NULL DEFAULT 'Other',
  status program_status NOT NULL DEFAULT 'planning',
  description TEXT,
  sport TEXT,
  start_date DATE,
  end_date DATE,
  schedule_notes TEXT,
  location TEXT,
  address TEXT,
  capacity INTEGER,
  target_age_min INTEGER,
  target_age_max INTEGER,
  target_skill_level TEXT,
  fee_amount DECIMAL(10, 2),
  fee_notes TEXT,
  notes TEXT,
  tags TEXT[],
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_programs_name ON programs(name);
CREATE INDEX IF NOT EXISTS idx_programs_type ON programs(type);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own programs" ON programs;
DROP POLICY IF EXISTS "Users can insert own programs" ON programs;
DROP POLICY IF EXISTS "Users can update own programs" ON programs;
DROP POLICY IF EXISTS "Users can delete own programs" ON programs;

CREATE POLICY "Users can read own programs" ON programs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own programs" ON programs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs" ON programs
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own programs" ON programs
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_programs_user_id ON programs;
CREATE TRIGGER set_programs_user_id
  BEFORE INSERT ON programs
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. Create Workshops table
-- ============================================

DO $$ BEGIN
  CREATE TYPE workshop_type AS ENUM (
    'Clinic',
    'Seminar',
    'Info_Session',
    'Training',
    'Conference',
    'Networking',
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE workshop_status AS ENUM (
    'planning',
    'open',
    'full',
    'completed',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS workshops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type workshop_type NOT NULL DEFAULT 'Other',
  status workshop_status NOT NULL DEFAULT 'planning',
  description TEXT,
  sport TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  address TEXT,
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_link TEXT,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  target_audience TEXT,
  fee_amount DECIMAL(10, 2),
  fee_notes TEXT,
  facilitator_name TEXT,
  facilitator_contact_id UUID,
  notes TEXT,
  tags TEXT[],
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workshops_event_date ON workshops(event_date);
CREATE INDEX IF NOT EXISTS idx_workshops_user_id ON workshops(user_id);

ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own workshops" ON workshops;
DROP POLICY IF EXISTS "Users can insert own workshops" ON workshops;
DROP POLICY IF EXISTS "Users can update own workshops" ON workshops;
DROP POLICY IF EXISTS "Users can delete own workshops" ON workshops;

CREATE POLICY "Users can read own workshops" ON workshops
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workshops" ON workshops
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workshops" ON workshops
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workshops" ON workshops
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_workshops_user_id ON workshops;
CREATE TRIGGER set_workshops_user_id
  BEFORE INSERT ON workshops
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_workshops_updated_at ON workshops;
CREATE TRIGGER update_workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. Create Interactions table
-- ============================================

DO $$ BEGIN
  CREATE TYPE interaction_type AS ENUM (
    'Email',
    'Phone',
    'Meeting',
    'Event',
    'Note',
    'Social_Media',
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE interaction_direction AS ENUM (
    'Inbound',
    'Outbound',
    'N/A'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type interaction_type NOT NULL DEFAULT 'Note',
  direction interaction_direction DEFAULT 'N/A',
  subject TEXT,
  summary TEXT,
  details TEXT,
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  workshop_id UUID REFERENCES workshops(id) ON DELETE SET NULL,
  email_from TEXT,
  email_to TEXT,
  email_cc TEXT,
  requires_followup BOOLEAN DEFAULT FALSE,
  followup_date DATE,
  followup_completed BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  user_id UUID REFERENCES auth.users(id),
  created_by_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(type);
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_organization_id ON interactions(organization_id);
CREATE INDEX IF NOT EXISTS idx_interactions_interaction_date ON interactions(interaction_date);
CREATE INDEX IF NOT EXISTS idx_interactions_requires_followup ON interactions(requires_followup);
CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON interactions(user_id);

ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own interactions" ON interactions;
DROP POLICY IF EXISTS "Users can insert own interactions" ON interactions;
DROP POLICY IF EXISTS "Users can update own interactions" ON interactions;
DROP POLICY IF EXISTS "Users can delete own interactions" ON interactions;

CREATE POLICY "Users can read own interactions" ON interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions" ON interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interactions" ON interactions
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own interactions" ON interactions
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_interactions_user_id ON interactions;
CREATE TRIGGER set_interactions_user_id
  BEFORE INSERT ON interactions
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_interactions_updated_at ON interactions;
CREATE TRIGGER update_interactions_updated_at
  BEFORE UPDATE ON interactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Create Junction Tables
-- ============================================

-- Enrollment status enum
DO $$ BEGIN
  CREATE TYPE enrollment_status AS ENUM (
    'Registered',
    'Waitlisted',
    'Confirmed',
    'Attended',
    'Completed',
    'No_Show',
    'Withdrawn',
    'Cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Contact-Organization relationship
CREATE TABLE IF NOT EXISTS contact_organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  start_date DATE,
  end_date DATE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(contact_id, organization_id)
);

CREATE INDEX IF NOT EXISTS idx_contact_orgs_contact ON contact_organizations(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_orgs_org ON contact_organizations(organization_id);

ALTER TABLE contact_organizations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own contact_organizations" ON contact_organizations;
DROP POLICY IF EXISTS "Users can insert own contact_organizations" ON contact_organizations;
DROP POLICY IF EXISTS "Users can update own contact_organizations" ON contact_organizations;
DROP POLICY IF EXISTS "Users can delete own contact_organizations" ON contact_organizations;

CREATE POLICY "Users can read own contact_organizations" ON contact_organizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contact_organizations" ON contact_organizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contact_organizations" ON contact_organizations
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contact_organizations" ON contact_organizations
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_contact_orgs_user_id ON contact_organizations;
CREATE TRIGGER set_contact_orgs_user_id
  BEFORE INSERT ON contact_organizations
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

-- Program Enrollments
CREATE TABLE IF NOT EXISTS program_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  status enrollment_status NOT NULL DEFAULT 'Registered',
  enrollment_date DATE DEFAULT CURRENT_DATE,
  role TEXT DEFAULT 'Participant',
  sessions_attended INTEGER DEFAULT 0,
  sessions_total INTEGER,
  fee_paid BOOLEAN DEFAULT FALSE,
  fee_amount DECIMAL(10, 2),
  payment_notes TEXT,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(contact_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_program_enrollments_contact ON program_enrollments(contact_id);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_program ON program_enrollments(program_id);

ALTER TABLE program_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own program_enrollments" ON program_enrollments;
DROP POLICY IF EXISTS "Users can insert own program_enrollments" ON program_enrollments;
DROP POLICY IF EXISTS "Users can update own program_enrollments" ON program_enrollments;
DROP POLICY IF EXISTS "Users can delete own program_enrollments" ON program_enrollments;

CREATE POLICY "Users can read own program_enrollments" ON program_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own program_enrollments" ON program_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own program_enrollments" ON program_enrollments
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own program_enrollments" ON program_enrollments
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_program_enrollments_user_id ON program_enrollments;
CREATE TRIGGER set_program_enrollments_user_id
  BEFORE INSERT ON program_enrollments
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

-- Workshop Registrations
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  status enrollment_status NOT NULL DEFAULT 'Registered',
  registration_date DATE DEFAULT CURRENT_DATE,
  role TEXT DEFAULT 'Participant',
  attended BOOLEAN,
  check_in_time TIMESTAMP WITH TIME ZONE,
  fee_paid BOOLEAN DEFAULT FALSE,
  fee_amount DECIMAL(10, 2),
  notes TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(contact_id, workshop_id)
);

CREATE INDEX IF NOT EXISTS idx_workshop_registrations_contact ON workshop_registrations(contact_id);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_workshop ON workshop_registrations(workshop_id);

ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own workshop_registrations" ON workshop_registrations;
DROP POLICY IF EXISTS "Users can insert own workshop_registrations" ON workshop_registrations;
DROP POLICY IF EXISTS "Users can update own workshop_registrations" ON workshop_registrations;
DROP POLICY IF EXISTS "Users can delete own workshop_registrations" ON workshop_registrations;

CREATE POLICY "Users can read own workshop_registrations" ON workshop_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workshop_registrations" ON workshop_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workshop_registrations" ON workshop_registrations
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workshop_registrations" ON workshop_registrations
  FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_workshop_registrations_user_id ON workshop_registrations;
CREATE TRIGGER set_workshop_registrations_user_id
  BEFORE INSERT ON workshop_registrations
  FOR EACH ROW EXECUTE FUNCTION set_user_id();

-- ============================================
-- DONE! All Phase 1 tables created.
-- ============================================
SELECT 'Phase 1 migration completed successfully!' as result;
