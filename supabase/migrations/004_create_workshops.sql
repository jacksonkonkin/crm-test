-- Migration: Create workshops table
-- Workshops are one-time events (e.g., single-day clinics, seminars, info sessions)

-- Create workshop type enum
DO $$ BEGIN
  CREATE TYPE workshop_type AS ENUM (
    'Clinic',          -- Skills clinic
    'Seminar',         -- Educational seminar
    'Info_Session',    -- Information session
    'Training',        -- One-time training
    'Conference',      -- Conference or summit
    'Networking',      -- Networking event
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create workshop status enum
DO $$ BEGIN
  CREATE TYPE workshop_status AS ENUM (
    'planning',
    'open',            -- Open for registration
    'full',            -- At capacity
    'completed',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type workshop_type NOT NULL DEFAULT 'Other',
  status workshop_status NOT NULL DEFAULT 'planning',

  -- Workshop details
  description TEXT,
  sport TEXT,

  -- Date/Time (specific since workshops are one-time events)
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,

  -- Location
  location TEXT,
  address TEXT,
  is_virtual BOOLEAN DEFAULT FALSE,
  virtual_link TEXT,

  -- Capacity
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,

  -- Target audience
  target_audience TEXT,          -- Free text description

  -- Fees
  fee_amount DECIMAL(10, 2),
  fee_notes TEXT,

  -- Facilitator/presenter
  facilitator_name TEXT,
  facilitator_contact_id UUID,   -- Link to contacts table

  -- Additional info
  notes TEXT,
  tags TEXT[],

  -- Related entities
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,  -- If part of a program

  -- Ownership
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_workshops_name ON workshops(name);
CREATE INDEX IF NOT EXISTS idx_workshops_type ON workshops(type);
CREATE INDEX IF NOT EXISTS idx_workshops_status ON workshops(status);
CREATE INDEX IF NOT EXISTS idx_workshops_event_date ON workshops(event_date);
CREATE INDEX IF NOT EXISTS idx_workshops_user_id ON workshops(user_id);

-- Enable Row Level Security
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own workshops" ON workshops
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workshops" ON workshops
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workshops" ON workshops
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workshops" ON workshops
  FOR DELETE
  USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS set_workshops_user_id ON workshops;
CREATE TRIGGER set_workshops_user_id
  BEFORE INSERT ON workshops
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_workshops_updated_at ON workshops;
CREATE TRIGGER update_workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
