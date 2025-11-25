-- Migration: Enhance contacts table with new fields for PSCB CRM
-- Adds contact types, journey stages, and additional fields

-- Create contact type enum (replacing old category)
DO $$ BEGIN
  CREATE TYPE contact_type AS ENUM (
    'Athlete',
    'Coach',
    'Parent',
    'LSO_Rep',           -- LSO Representative
    'Partner_Rep',       -- Partner Representative
    'Funder',
    'Staff',
    'Volunteer',
    'Community_Member',
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create journey stage enum
DO $$ BEGIN
  CREATE TYPE journey_stage AS ENUM (
    'Lead',              -- Initial contact, not yet engaged
    'Prospect',          -- Showing interest
    'Engaged',           -- Actively participating
    'Active',            -- Regular participant
    'Alumni',            -- Former participant
    'Inactive'           -- No recent engagement
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new columns to contacts table
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS contact_type contact_type DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS journey_stage journey_stage DEFAULT 'Lead',
ADD COLUMN IF NOT EXISTS sport TEXT,                     -- Primary sport (if applicable)
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS how_found_us TEXT,              -- How they discovered PSCB
ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT CHECK (preferred_contact_method IN ('Email', 'Phone', 'Text', 'Social')),
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],                    -- Flexible tagging
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS last_interaction_date TIMESTAMP WITH TIME ZONE;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_contacts_contact_type ON contacts(contact_type);
CREATE INDEX IF NOT EXISTS idx_contacts_journey_stage ON contacts(journey_stage);
CREATE INDEX IF NOT EXISTS idx_contacts_sport ON contacts(sport);
CREATE INDEX IF NOT EXISTS idx_contacts_last_interaction ON contacts(last_interaction_date);

-- Update the old category values to new contact_type (run once)
-- This is a data migration - handle carefully
UPDATE contacts
SET contact_type = CASE
  WHEN category = 'Employee' THEN 'Staff'::contact_type
  WHEN category = 'Customers' THEN 'Athlete'::contact_type
  WHEN category = 'Partners' THEN 'Partner_Rep'::contact_type
  ELSE 'Other'::contact_type
END
WHERE contact_type IS NULL OR contact_type = 'Other';

-- Note: We keep the old 'category' column for backwards compatibility
-- but new code should use 'contact_type' instead
