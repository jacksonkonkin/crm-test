-- Seed data for contacts table
-- Run this after creating the schema

INSERT INTO contacts (employee_id, name, role, email, phone, gender, location, category, status, avatar_url) VALUES
  ('1001', 'Ricky Antony', 'Web Designer', 'ricky.antony@gmail.com', '+91 123 456 7890', 'Male', 'Delhi', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1002', 'Sarah Johnson', 'Product Manager', 'sarah.johnson@gmail.com', '+91 234 567 8901', 'Female', 'Mumbai', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19'),
  ('1003', 'Michael Chen', 'Software Engineer', 'michael.chen@gmail.com', '+91 345 678 9012', 'Male', 'Bangalore', 'Employee', 'pending', 'https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f'),
  ('1004', 'Emily Davis', 'UX Designer', 'emily.davis@gmail.com', '+91 456 789 0123', 'Female', 'Chennai', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1005', 'James Wilson', 'Data Analyst', 'james.wilson@gmail.com', '+91 567 890 1234', 'Male', 'Hyderabad', 'Employee', 'pending', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19'),
  ('1006', 'Priya Sharma', 'HR Manager', 'priya.sharma@gmail.com', '+91 678 901 2345', 'Female', 'Delhi', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f'),
  ('1007', 'David Brown', 'DevOps Engineer', 'david.brown@gmail.com', '+91 789 012 3456', 'Male', 'Pune', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1008', 'Anjali Patel', 'Marketing Lead', 'anjali.patel@gmail.com', '+91 890 123 4567', 'Female', 'Mumbai', 'Employee', 'pending', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19'),
  ('1009', 'Robert Taylor', 'Backend Developer', 'robert.taylor@gmail.com', '+91 901 234 5678', 'Male', 'Bangalore', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f'),
  ('1010', 'Neha Gupta', 'QA Engineer', 'neha.gupta@gmail.com', '+91 012 345 6789', 'Female', 'Kolkata', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1011', 'Chris Anderson', 'Frontend Developer', 'chris.anderson@gmail.com', '+91 111 222 3333', 'Male', 'Chennai', 'Employee', 'pending', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19'),
  ('1012', 'Kavita Singh', 'Project Manager', 'kavita.singh@gmail.com', '+91 222 333 4444', 'Female', 'Delhi', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f'),
  ('1013', 'Robert Fox', 'Account Executive', 'robertfox@example.com', '(671) 555-0110', 'Male', 'Austin', 'Customers', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1014', 'Cody Fisher', 'Sales Representative', 'codyfisher@example.com', '(505) 555-0125', 'Male', 'Orange', 'Customers', 'active', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19'),
  ('1015', 'Albert Flores', 'Business Analyst', 'albertflores@example.com', '(704) 555-0127', 'Female', 'Pembroke Pines', 'Customers', 'active', 'https://www.figma.com/api/mcp/asset/869829cd-287c-46d0-9d10-ce881001ea4f'),
  ('1016', 'Floyd Miles', 'Senior Developer', 'floydmiles@example.com', '(405) 555-0128', 'Male', 'Fairfield', 'Employee', 'active', 'https://www.figma.com/api/mcp/asset/1c4a3203-ca8d-4be0-91c8-67c86f39c218'),
  ('1017', 'Arlene McCoy', 'Partner Relations', 'arlenemccoy@example.com', '(219) 555-0114', 'Female', 'Toledo', 'Partners', 'active', 'https://www.figma.com/api/mcp/asset/197ccbb9-4e6b-4bbf-8af6-1d462bd18d19')
ON CONFLICT (employee_id) DO NOTHING;
