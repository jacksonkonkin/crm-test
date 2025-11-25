-- ============================================
-- FIX: Assign user_id to existing contacts
-- ============================================
--
-- PROBLEM: Contacts created before the user_id migration have NULL user_id,
-- making them invisible due to RLS policies.
--
-- SOLUTION: Assign existing contacts to your user account.
--
-- HOW TO USE:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Copy your user ID (UUID)
-- 3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
-- 4. Run this script in SQL Editor
-- ============================================

-- Option 1: Assign all contacts with NULL user_id to a specific user
-- Replace the UUID below with YOUR user ID from Supabase Auth > Users
UPDATE contacts
SET user_id = 'YOUR_USER_ID_HERE'::uuid
WHERE user_id IS NULL;

-- Option 2: If you want to see how many contacts need fixing first:
-- SELECT COUNT(*) as contacts_needing_fix FROM contacts WHERE user_id IS NULL;

-- Option 3: Temporarily allow access to all contacts (NOT RECOMMENDED for production)
-- This creates a fallback policy that allows users to see contacts with NULL user_id
-- ONLY use this temporarily while you fix the data:
--
-- CREATE POLICY "Temporary: Allow access to unassigned contacts" ON contacts
--   FOR ALL
--   USING (user_id IS NULL OR auth.uid() = user_id)
--   WITH CHECK (true);

-- ============================================
-- After running the UPDATE, verify with:
-- SELECT COUNT(*) FROM contacts WHERE user_id IS NOT NULL;
-- ============================================
