-- Migration: Create junction tables for many-to-many relationships
-- Links contacts to organizations, programs, and workshops

-- ============================================
-- Contact-Organization relationship
-- ============================================
CREATE TABLE IF NOT EXISTS contact_organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Role within the organization
  role TEXT,                     -- e.g., "Board Member", "Coach", "Participant"
  is_primary BOOLEAN DEFAULT FALSE,  -- Is this their primary organization?

  -- Date range
  start_date DATE,
  end_date DATE,

  -- Ownership (for RLS)
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate relationships
  UNIQUE(contact_id, organization_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_orgs_contact ON contact_organizations(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_orgs_org ON contact_organizations(organization_id);
CREATE INDEX IF NOT EXISTS idx_contact_orgs_user ON contact_organizations(user_id);

-- RLS
ALTER TABLE contact_organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own contact_organizations" ON contact_organizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contact_organizations" ON contact_organizations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contact_organizations" ON contact_organizations
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contact_organizations" ON contact_organizations
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for user_id
DROP TRIGGER IF EXISTS set_contact_orgs_user_id ON contact_organizations;
CREATE TRIGGER set_contact_orgs_user_id
  BEFORE INSERT ON contact_organizations
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();


-- ============================================
-- Program Enrollments (Contact-Program relationship)
-- ============================================

-- Create enrollment status enum
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

CREATE TABLE IF NOT EXISTS program_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,

  -- Enrollment details
  status enrollment_status NOT NULL DEFAULT 'Registered',
  enrollment_date DATE DEFAULT CURRENT_DATE,

  -- Role in program
  role TEXT DEFAULT 'Participant',  -- e.g., "Participant", "Coach", "Volunteer"

  -- Attendance
  sessions_attended INTEGER DEFAULT 0,
  sessions_total INTEGER,

  -- Fees
  fee_paid BOOLEAN DEFAULT FALSE,
  fee_amount DECIMAL(10, 2),
  payment_notes TEXT,

  -- Notes
  notes TEXT,

  -- Ownership
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate enrollments
  UNIQUE(contact_id, program_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_program_enrollments_contact ON program_enrollments(contact_id);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_program ON program_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_status ON program_enrollments(status);
CREATE INDEX IF NOT EXISTS idx_program_enrollments_user ON program_enrollments(user_id);

-- RLS
ALTER TABLE program_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own program_enrollments" ON program_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own program_enrollments" ON program_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own program_enrollments" ON program_enrollments
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own program_enrollments" ON program_enrollments
  FOR DELETE USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS set_program_enrollments_user_id ON program_enrollments;
CREATE TRIGGER set_program_enrollments_user_id
  BEFORE INSERT ON program_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_program_enrollments_updated_at ON program_enrollments;
CREATE TRIGGER update_program_enrollments_updated_at
  BEFORE UPDATE ON program_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- Workshop Registrations (Contact-Workshop relationship)
-- ============================================
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,

  -- Registration details
  status enrollment_status NOT NULL DEFAULT 'Registered',
  registration_date DATE DEFAULT CURRENT_DATE,

  -- Role
  role TEXT DEFAULT 'Participant',

  -- Attendance
  attended BOOLEAN,
  check_in_time TIMESTAMP WITH TIME ZONE,

  -- Fees
  fee_paid BOOLEAN DEFAULT FALSE,
  fee_amount DECIMAL(10, 2),

  -- Notes
  notes TEXT,

  -- Ownership
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate registrations
  UNIQUE(contact_id, workshop_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_contact ON workshop_registrations(contact_id);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_workshop ON workshop_registrations(workshop_id);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_status ON workshop_registrations(status);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_user ON workshop_registrations(user_id);

-- RLS
ALTER TABLE workshop_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own workshop_registrations" ON workshop_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workshop_registrations" ON workshop_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workshop_registrations" ON workshop_registrations
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workshop_registrations" ON workshop_registrations
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for user_id
DROP TRIGGER IF EXISTS set_workshop_registrations_user_id ON workshop_registrations;
CREATE TRIGGER set_workshop_registrations_user_id
  BEFORE INSERT ON workshop_registrations
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();


-- ============================================
-- Add foreign key for organizations.primary_contact_id
-- ============================================
ALTER TABLE organizations
ADD CONSTRAINT fk_organizations_primary_contact
FOREIGN KEY (primary_contact_id) REFERENCES contacts(id) ON DELETE SET NULL;
