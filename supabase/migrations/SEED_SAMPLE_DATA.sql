-- ============================================
-- PSCB CRM - Sample Data Seed Script
-- ============================================
-- Run this AFTER running APPLY_ALL_PHASE1.sql
-- This will populate tables with realistic sample data
--
-- NOTE: This script uses auth.uid() to automatically assign
-- your user_id. Make sure you're logged in when running this,
-- or replace auth.uid() with your actual user ID.
-- ============================================

-- ============================================
-- 1. ORGANIZATIONS - Sample LSOs, Partners, etc.
-- ============================================

INSERT INTO organizations (name, type, status, email, phone, website, address_street, address_city, address_province, address_postal_code, description, notes) VALUES
-- LSOs
('Scarborough Basketball Association', 'LSO', 'active', 'info@scarboroughbasketball.ca', '(416) 555-0101', 'https://scarboroughbasketball.ca', '123 Progress Ave', 'Scarborough', 'ON', 'M1P 2Y7', 'Community basketball league serving youth ages 6-18', 'Strong partnership, very responsive'),
('North York Soccer Club', 'LSO', 'active', 'contact@nysoccer.org', '(416) 555-0102', 'https://nysoccer.org', '456 Sheppard Ave E', 'North York', 'ON', 'M2N 3B1', 'Youth soccer development program', 'Looking to expand winter indoor programs'),
('East End Track & Field', 'LSO', 'active', 'admin@eastendtrack.ca', '(416) 555-0103', NULL, '789 Danforth Ave', 'Toronto', 'ON', 'M4J 1L2', 'Track and field training for ages 8-16', NULL),
('Parkdale Youth Hockey', 'LSO', 'prospect', 'pyh@gmail.com', '(416) 555-0104', NULL, '321 Queen St W', 'Toronto', 'ON', 'M6J 1J4', 'Affordable hockey programming', 'Interested in partnership discussion'),

-- Schools
('Central Tech High School', 'School', 'active', 'athletics@centraltech.ca', '(416) 555-0201', 'https://centraltech.tdsb.on.ca', '725 Bathurst St', 'Toronto', 'ON', 'M5S 2R5', 'Public high school with strong athletics program', 'Contact: Coach Marcus'),
('St. Michael College School', 'School', 'active', 'sports@smcsmail.com', '(416) 555-0202', NULL, '1515 Bathurst St', 'Toronto', 'ON', 'M5P 3H4', 'Private school, basketball powerhouse', NULL),

-- Partners
('City of Toronto Parks & Rec', 'Partner', 'active', 'recreation@toronto.ca', '(416) 555-0301', 'https://toronto.ca/parks', '100 Queen St W', 'Toronto', 'ON', 'M5H 2N2', 'Municipal parks and recreation department', 'Key partner for facility access'),
('Nike Canada Community', 'Partner', 'active', 'community@nike.ca', '(416) 555-0302', 'https://nike.com/ca', '175 Bloor St E', 'Toronto', 'ON', 'M4W 3R8', 'Equipment and sponsorship partner', 'Annual grant application due March'),

-- Funders
('Ontario Trillium Foundation', 'Funder', 'active', 'grants@otf.ca', '(416) 555-0401', 'https://otf.ca', '800 Bay St', 'Toronto', 'ON', 'M5S 3A9', 'Provincial government funding body', 'Current grant ends Dec 2025'),
('Jays Care Foundation', 'Funder', 'active', 'info@jayscare.com', '(416) 555-0402', 'https://jayscare.com', '1 Blue Jays Way', 'Toronto', 'ON', 'M5V 1J1', 'Blue Jays charitable foundation', 'Met at conference, follow up'),
('TD Bank Community Fund', 'Funder', 'prospect', 'community@td.com', '(416) 555-0403', NULL, '66 Wellington St W', 'Toronto', 'ON', 'M5K 1A2', 'Corporate community investment', 'Application deadline April 15'),

-- Community Organizations
('YMCA Greater Toronto', 'Community', 'active', 'info@ymcagta.org', '(416) 555-0501', 'https://ymcagta.org', '42 Charles St E', 'Toronto', 'ON', 'M4Y 1T4', 'Community wellness organization', 'Facility partner'),
('Boys & Girls Club of East Toronto', 'Community', 'active', 'hello@bgceast.org', '(416) 555-0502', NULL, '1499 Queen St E', 'Toronto', 'ON', 'M4L 1E3', 'Youth development programs', 'Referral partner');


-- ============================================
-- 2. PROGRAMS - Sample ongoing programs
-- ============================================

INSERT INTO programs (name, type, status, description, sport, start_date, end_date, schedule_notes, location, capacity, target_age_min, target_age_max, target_skill_level, fee_amount, fee_notes, notes) VALUES
-- Active Programs
('Winter Basketball League', 'Competition', 'active', 'Competitive basketball league for youth in the GTA. Teams compete weekly with playoffs in March.', 'Basketball', '2025-01-06', '2025-03-28', 'Saturdays 9am-4pm', 'Central Tech Gymnasium', 120, 12, 17, 'Intermediate', 150.00, 'Subsidies available for low-income families', 'Partnership with Central Tech'),
('Spring Soccer Development', 'Training', 'planning', 'Skills development program focusing on fundamentals and game awareness.', 'Soccer', '2025-04-07', '2025-06-20', 'Tuesdays and Thursdays 4-6pm', 'Riverdale Park East', 60, 8, 14, 'Beginner', 75.00, NULL, 'Outdoor weather dependent'),
('Track & Field Summer Camp', 'Camp', 'planning', 'Week-long intensive camp covering sprints, distance, jumps, and throws.', 'Track & Field', '2025-07-07', '2025-07-11', 'Monday-Friday 9am-3pm', 'East York Civic Centre Track', 40, 10, 16, NULL, 200.00, 'Early bird discount until May 1', NULL),
('Year-Round Athlete Development', 'Development', 'active', 'Comprehensive athletic development program focusing on strength, agility, and mental skills.', NULL, '2025-01-01', '2025-12-31', 'Wednesdays 5-7pm', 'YMCA Downtown', 30, 14, 18, 'Advanced', 500.00, 'Payment plans available', 'For competitive athletes'),
('Community Basketball Drop-In', 'Community', 'active', 'Free weekly drop-in basketball for neighborhood youth. No registration required.', 'Basketball', '2025-01-01', '2025-12-31', 'Fridays 6-9pm', 'Parkdale Community Centre', NULL, 12, 25, NULL, 0.00, 'Free program', 'Funded by City grant'),

-- Completed Programs
('Fall Hockey Skills', 'Training', 'completed', 'Skating and hockey fundamentals for beginners.', 'Hockey', '2024-09-09', '2024-12-13', 'Sundays 8-10am', 'Ted Reeve Arena', 24, 6, 10, 'Beginner', 125.00, NULL, 'Very successful - 100% capacity'),

-- On Hold
('Swimming Lessons Partnership', 'Training', 'on_hold', 'Partnership with city pools for swimming instruction.', 'Swimming', NULL, NULL, 'TBD', 'Various city pools', 50, 6, 12, 'Beginner', 50.00, NULL, 'Waiting for pool availability confirmation');


-- ============================================
-- 3. WORKSHOPS - Sample one-time events
-- ============================================

INSERT INTO workshops (name, type, status, description, sport, event_date, start_time, end_time, location, address, is_virtual, capacity, registered_count, target_audience, fee_amount, facilitator_name, notes) VALUES
-- Upcoming Workshops
('Coach Certification Level 1', 'Training', 'open', 'NCCP Community Sport Coach certification workshop. Required for all volunteer coaches.', NULL, '2025-02-15', '09:00', '17:00', 'YMCA Downtown', '20 Grosvenor St, Toronto', FALSE, 30, 12, 'Volunteer coaches and parents', 50.00, 'Coach Development Ontario', 'Lunch provided'),
('Parent Information Night', 'Info_Session', 'open', 'Overview of PSCB programs for parents. Q&A session included.', NULL, '2025-02-08', '18:30', '20:00', 'Virtual - Zoom', NULL, TRUE, 100, 45, 'Parents and guardians', 0.00, 'PSCB Staff', 'Zoom link sent 1 day before'),
('Basketball Skills Clinic', 'Clinic', 'open', 'Half-day clinic focusing on ball handling, shooting, and defense.', 'Basketball', '2025-02-22', '10:00', '14:00', 'Central Tech Gymnasium', '725 Bathurst St, Toronto', FALSE, 50, 38, 'Youth ages 10-16', 25.00, 'Marcus Johnson', 'Bring water and indoor shoes'),
('Nutrition for Young Athletes', 'Seminar', 'planning', 'Sports nutrition basics for youth athletes and their parents.', NULL, '2025-03-08', '13:00', '15:00', 'Community Health Centre', '955 Queen St E, Toronto', FALSE, 40, 0, 'Athletes and parents', 0.00, 'Dr. Sarah Chen, RD', 'Partnership with local health centre'),
('Spring Program Registration Fair', 'Info_Session', 'planning', 'One-stop registration event for all spring programs.', NULL, '2025-03-22', '10:00', '14:00', 'Parkdale Community Centre', '1499 Queen St W, Toronto', FALSE, NULL, 0, 'General public', 0.00, 'PSCB Staff', 'Bring cash or credit for registration'),

-- Past Workshops
('Winter Season Kickoff', 'Networking', 'completed', 'Welcome event for winter program participants and families.', NULL, '2025-01-11', '14:00', '16:00', 'YMCA Downtown', '20 Grosvenor St, Toronto', FALSE, 80, 67, 'Program participants', 0.00, 'PSCB Team', 'Great turnout!'),
('First Aid & Safety Training', 'Training', 'completed', 'Basic first aid certification for coaches and volunteers.', NULL, '2025-01-18', '09:00', '13:00', 'St. John Ambulance', '1900 City Park Dr, Ottawa', FALSE, 20, 20, 'Coaches and volunteers', 35.00, 'St. John Ambulance', 'All participants certified');


-- ============================================
-- 4. INTERACTIONS - Sample activity log entries
-- ============================================

-- Note: These reference organizations by name. In production, you'd use actual UUIDs.
-- This simplified version creates interactions without foreign keys for demo purposes.

INSERT INTO interactions (type, direction, subject, summary, details, interaction_date, requires_followup, followup_date, followup_completed) VALUES
-- Recent Interactions
('Email', 'Inbound', 'Grant Application Question', 'Ontario Trillium Foundation asked for budget clarification', 'Received email from OTF program officer requesting additional detail on facility rental line item. Need to respond within 5 business days.', NOW() - INTERVAL '2 days', TRUE, CURRENT_DATE + INTERVAL '3 days', FALSE),
('Phone', 'Outbound', 'Partnership Discussion - Nike', 'Called Nike Community rep about equipment donation', 'Spoke with Jennifer about potential basketball equipment donation for winter league. She will present to their grants committee next week.', NOW() - INTERVAL '3 days', TRUE, CURRENT_DATE + INTERVAL '7 days', FALSE),
('Meeting', 'N/A', 'Monthly Staff Meeting', 'January all-hands meeting', 'Discussed Q1 goals, reviewed winter program enrollment numbers, assigned tasks for upcoming registration fair.', NOW() - INTERVAL '5 days', FALSE, NULL, FALSE),
('Email', 'Outbound', 'Coach Recruitment', 'Sent volunteer recruitment email to contact list', 'Distributed call for volunteer coaches for spring soccer program. Need 8 additional coaches.', NOW() - INTERVAL '7 days', TRUE, CURRENT_DATE + INTERVAL '14 days', FALSE),
('Note', 'N/A', 'Program Idea', 'Idea for summer partnership', 'City of Toronto has new outdoor courts opening in June. Could be good location for summer 3v3 tournament.', NOW() - INTERVAL '10 days', FALSE, NULL, FALSE),
('Phone', 'Inbound', 'Parent Inquiry', 'Question about registration fee subsidy', 'Parent called asking about financial assistance options. Explained subsidy application process and sent follow-up email with form.', NOW() - INTERVAL '1 day', FALSE, NULL, FALSE),
('Meeting', 'N/A', 'Site Visit - Central Tech', 'Visited gymnasium for winter league', 'Met with school athletics director. Confirmed Saturday availability through March. Discussed potential expansion for next year.', NOW() - INTERVAL '14 days', FALSE, NULL, FALSE),
('Email', 'Inbound', 'Sponsorship Offer', 'Local business interested in sponsoring', 'Received email from Scarborough Sports Store offering to sponsor team jerseys. Asked for meeting to discuss details.', NOW() - INTERVAL '4 days', TRUE, CURRENT_DATE + INTERVAL '5 days', FALSE),
('Social_Media', 'Inbound', 'Instagram DM - Program Inquiry', 'Question about basketball league age groups', 'Responded to DM asking about U14 vs U16 divisions. Directed to website registration page.', NOW() - INTERVAL '6 hours', FALSE, NULL, FALSE),
('Event', 'N/A', 'Winter Season Kickoff Event', 'Hosted welcome event for participants', '67 attendees including athletes and families. Positive feedback. Photos posted to social media.', NOW() - INTERVAL '14 days', FALSE, NULL, FALSE),

-- Older Interactions (completed followups)
('Email', 'Outbound', 'Facility Booking Confirmation', 'Confirmed YMCA booking for athlete development', 'Received signed facility agreement from YMCA. Wednesday 5-7pm slot confirmed for full year.', NOW() - INTERVAL '30 days', TRUE, NOW() - INTERVAL '25 days', TRUE),
('Phone', 'Outbound', 'Follow-up with Jays Care', 'Discussed upcoming grant cycle', 'Connected with Jays Care program manager. New intake opens February 1. Will send updated program proposal.', NOW() - INTERVAL '21 days', TRUE, NOW() - INTERVAL '14 days', TRUE),
('Meeting', 'N/A', 'Board Meeting Q4', 'Quarterly board meeting', 'Presented annual report, discussed strategic priorities for 2025, approved budget.', NOW() - INTERVAL '45 days', FALSE, NULL, FALSE);


-- ============================================
-- 5. SAMPLE CONTACTS (if you need more)
-- ============================================
-- Uncomment if you want additional contacts beyond your existing ones

/*
INSERT INTO contacts (employee_id, name, role, email, phone, gender, location, category, status) VALUES
('2001', 'Marcus Johnson', 'Head Coach - Basketball', 'marcus.j@email.com', '(416) 555-1001', 'Male', 'Scarborough', 'Employee', 'active'),
('2002', 'Sarah Chen', 'Program Coordinator', 'sarah.chen@email.com', '(416) 555-1002', 'Female', 'Downtown', 'Employee', 'active'),
('2003', 'David Williams', 'Volunteer Coach', 'dwilliams@email.com', '(416) 555-1003', 'Male', 'North York', 'Partners', 'active'),
('2004', 'Jennifer Lopez', 'Nike Community Rep', 'jlopez@nike.com', '(416) 555-1004', 'Female', 'Downtown', 'Partners', 'active'),
('2005', 'Michael Thompson', 'OTF Program Officer', 'mthompson@otf.ca', '(416) 555-1005', 'Male', 'Queens Park', 'Partners', 'active'),
('2006', 'Lisa Park', 'Parent Volunteer', 'lisapark@gmail.com', '(416) 555-1006', 'Female', 'East York', 'Customers', 'active'),
('2007', 'James Wilson', 'Youth Athlete', 'jwilson.parent@email.com', '(416) 555-1007', 'Male', 'Scarborough', 'Customers', 'active'),
('2008', 'Emma Davis', 'School Athletic Director', 'edavis@tdsb.on.ca', '(416) 555-1008', 'Female', 'Midtown', 'Partners', 'active');
*/


-- ============================================
-- DONE! Sample data inserted.
-- ============================================
SELECT
  (SELECT COUNT(*) FROM organizations) as organizations_count,
  (SELECT COUNT(*) FROM programs) as programs_count,
  (SELECT COUNT(*) FROM workshops) as workshops_count,
  (SELECT COUNT(*) FROM interactions) as interactions_count;
