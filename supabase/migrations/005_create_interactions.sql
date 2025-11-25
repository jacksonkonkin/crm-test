-- Migration: Create interactions table
-- Interactions log all touchpoints with contacts and organizations

-- Create interaction type enum
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

-- Create interaction direction enum (for emails/calls)
DO $$ BEGIN
  CREATE TYPE interaction_direction AS ENUM (
    'Inbound',     -- They contacted us
    'Outbound',    -- We contacted them
    'N/A'          -- Not applicable (e.g., meeting, note)
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create interactions table
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type interaction_type NOT NULL DEFAULT 'Note',
  direction interaction_direction DEFAULT 'N/A',

  -- Content
  subject TEXT,                  -- Subject line or brief title
  summary TEXT,                  -- Summary of the interaction
  details TEXT,                  -- Full details/notes

  -- Date/Time
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Related entities (at least one should be set)
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  workshop_id UUID REFERENCES workshops(id) ON DELETE SET NULL,

  -- For email-specific fields
  email_from TEXT,
  email_to TEXT,
  email_cc TEXT,

  -- Follow-up tracking
  requires_followup BOOLEAN DEFAULT FALSE,
  followup_date DATE,
  followup_completed BOOLEAN DEFAULT FALSE,

  -- Additional info
  tags TEXT[],

  -- Ownership
  user_id UUID REFERENCES auth.users(id),
  created_by_name TEXT,          -- Store name for display purposes

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interactions_type ON interactions(type);
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_organization_id ON interactions(organization_id);
CREATE INDEX IF NOT EXISTS idx_interactions_interaction_date ON interactions(interaction_date);
CREATE INDEX IF NOT EXISTS idx_interactions_requires_followup ON interactions(requires_followup);
CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON interactions(user_id);

-- Enable Row Level Security
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own interactions" ON interactions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interactions" ON interactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interactions" ON interactions
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own interactions" ON interactions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS set_interactions_user_id ON interactions;
CREATE TRIGGER set_interactions_user_id
  BEFORE INSERT ON interactions
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

DROP TRIGGER IF EXISTS update_interactions_updated_at ON interactions;
CREATE TRIGGER update_interactions_updated_at
  BEFORE UPDATE ON interactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
