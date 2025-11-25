-- Migration: Create programs table
-- Programs are ongoing/recurring offerings (e.g., seasonal programs, training series)

-- Create program type enum
DO $$ BEGIN
  CREATE TYPE program_type AS ENUM (
    'Training',        -- Athlete training programs
    'Development',     -- Coach/staff development
    'Community',       -- Community outreach programs
    'Competition',     -- Competitive programs
    'Camp',            -- Camps and intensive programs
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create program status enum
DO $$ BEGIN
  CREATE TYPE program_status AS ENUM (
    'planning',        -- In planning phase
    'active',          -- Currently running
    'completed',       -- Finished
    'cancelled',       -- Cancelled
    'on_hold'          -- Temporarily paused
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type program_type NOT NULL DEFAULT 'Other',
  status program_status NOT NULL DEFAULT 'planning',

  -- Program details
  description TEXT,
  sport TEXT,                    -- Primary sport (if applicable)

  -- Schedule
  start_date DATE,
  end_date DATE,
  schedule_notes TEXT,           -- e.g., "Tuesdays and Thursdays, 4-6pm"

  -- Location
  location TEXT,
  address TEXT,

  -- Capacity
  capacity INTEGER,

  -- Target audience
  target_age_min INTEGER,
  target_age_max INTEGER,
  target_skill_level TEXT,       -- e.g., "Beginner", "Intermediate", "Advanced"

  -- Fees
  fee_amount DECIMAL(10, 2),
  fee_notes TEXT,

  -- Additional info
  notes TEXT,
  tags TEXT[],

  -- Related organization (e.g., partner delivering the program)
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,

  -- Ownership
  user_id UUID REFERENCES auth.users(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_programs_name ON programs(name);
CREATE INDEX IF NOT EXISTS idx_programs_type ON programs(type);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_start_date ON programs(start_date);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);
CREATE INDEX IF NOT EXISTS idx_programs_organization_id ON programs(organization_id);

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own programs" ON programs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own programs" ON programs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs" ON programs
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own programs" ON programs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS set_programs_user_id ON programs;
CREATE TRIGGER set_programs_user_id
  BEFORE INSERT ON programs
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
