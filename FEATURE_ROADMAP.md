# PSCB CRM Feature Roadmap

## Project Overview

**Purpose:** Build a lightweight CRM and communications workflow system that enables PSCB to:
- Capture key information from emails automatically (deadlines, people, asks, follow-ups, opportunities)
- Convert email insights into actionable to-dos and CRM entries
- Track LSOs, partners, programs, workshops, targeted athletes, grants, and community touchpoints
- Understand how people move through programs and pathways over time

**Constraints:**
- Budget: ~$2,000 setup + <$75/month ongoing
- Timeline: Before April 30, 2026
- Team: Small, non-technical staff
- Priority: Simple, reliable, usable

---

## Current State (Already Built)

| Feature | Status | Notes |
|---------|--------|-------|
| User Authentication | ✅ Complete | Sign up, login, logout, session management |
| Dashboard Overview | ✅ Complete | Stats, charts, recent activity |
| Contacts Management | ✅ Complete | Full CRUD, search, filter, sort, export |
| Real-time Sync | ✅ Complete | Supabase subscriptions |
| Row-Level Security | ✅ Complete | User-scoped data access |
| Toast Notifications | ✅ Complete | User feedback system |
| Responsive UI | ✅ Complete | Works on desktop and mobile |

---

## Phase 1: Core CRM Foundation (Weeks 1-4)
**Goal:** Establish the basic CRM structure to replace scattered spreadsheets

### 1.1 Organizations/Companies Management
**Priority:** 🔴 Critical | **Effort:** Medium

- [ ] Create `organizations` table (LSOs, partners, schools, community orgs)
- [ ] Organization types: LSO, Partner, School, Government, Community Org, Funder
- [ ] Fields: name, type, address, phone, website, primary contact, notes, status
- [ ] Link contacts to organizations (many-to-many)
- [ ] Organization profile page with linked contacts and interactions
- [ ] Import existing LSO/partner data from spreadsheets

### 1.2 Enhanced Contact Types
**Priority:** 🔴 Critical | **Effort:** Small

- [ ] Expand contact categories: Athlete, Coach, Parent, LSO Rep, Partner, Funder, Staff, Volunteer
- [ ] Add custom fields: sport, program affiliation, how they found PSCB
- [ ] Contact journey stage: Lead → Engaged → Active → Alumni
- [ ] Tags for flexible categorization

### 1.3 Programs & Workshops Registry
**Priority:** 🔴 Critical | **Effort:** Medium

- [ ] Create `programs` table (ongoing programs)
- [ ] Create `workshops` table (one-time events)
- [ ] Fields: name, type, date(s), location, capacity, description, status
- [ ] Link contacts to programs (enrollments/participation)
- [ ] Track attendance and completion status

### 1.4 Basic Interactions/Activity Log
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Create `interactions` table
- [ ] Types: Email, Phone, Meeting, Event, Note, Other
- [ ] Link to contacts and/or organizations
- [ ] Quick-add interaction from contact/org profile
- [ ] Timeline view of all interactions per contact/org

---

## Phase 2: Task & Workflow Management (Weeks 5-8)
**Goal:** Enable staff to track follow-ups and hand-offs

### 2.1 Tasks System
**Priority:** 🔴 Critical | **Effort:** Medium

- [ ] Create `tasks` table
- [ ] Fields: title, description, due date, priority, status, assigned to
- [ ] Link tasks to contacts, organizations, programs
- [ ] Task list view with filters (my tasks, overdue, by priority)
- [ ] Task detail/edit modal
- [ ] Mark complete functionality
- [ ] Overdue task notifications

### 2.2 Staff Assignment & Hand-offs
**Priority:** 🟡 High | **Effort:** Small

- [ ] Staff member selector on tasks and contacts
- [ ] "Assign to" functionality
- [ ] Filter views by assigned staff member
- [ ] Hand-off notes field when reassigning

### 2.3 Calendar Integration
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Calendar view of tasks and deadlines
- [ ] Calendar view of programs/workshops
- [ ] Integration with Google Calendar (optional, phase 2b)

### 2.4 Notes System (Enhanced)
**Priority:** 🟢 Medium | **Effort:** Small

- [ ] Link notes to contacts, orgs, programs
- [ ] Rich text editor for notes
- [ ] Note templates for common scenarios
- [ ] Search within notes

---

## Phase 3: Email Integration & AI Workflow (Weeks 9-14)
**Goal:** Connect emails to CRM and enable AI-assisted data capture

### 3.1 Email Logging (Manual First)
**Priority:** 🔴 Critical | **Effort:** Small

- [ ] "Log Email" button to manually capture email details
- [ ] Fields: subject, from, to, date, body summary, linked contact/org
- [ ] Email-to-task quick conversion
- [ ] Email-to-interaction quick conversion

### 3.2 Email Forwarding Integration
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Unique forwarding address per user (via Supabase Edge Functions + email service)
- [ ] Parse forwarded emails and create draft interactions
- [ ] Suggest contact matches based on email addresses

### 3.3 AI Email Analysis (ChatGPT/Claude Integration)
**Priority:** 🟡 High | **Effort:** Large

- [ ] Connect to OpenAI/Anthropic API
- [ ] "Analyze Email" button on logged emails
- [ ] Extract: key dates, people mentioned, asks/requests, follow-ups needed, opportunities
- [ ] Auto-suggest tasks based on analysis
- [ ] Auto-suggest contact/org links
- [ ] Confidence indicators on AI suggestions
- [ ] Human review/approval before creating records

### 3.4 Bulk Email Analysis
**Priority:** 🟢 Medium | **Effort:** Medium

- [ ] Upload/paste multiple emails for batch analysis
- [ ] Review queue for AI-generated suggestions
- [ ] Bulk approve/reject functionality

---

## Phase 4: Grants & Funding Tracking (Weeks 15-18)
**Goal:** Track grant applications, deadlines, and funding relationships

### 4.1 Grants Management
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Create `grants` table
- [ ] Fields: name, funder (link to org), amount, deadline, status, requirements
- [ ] Grant stages: Researching → Applying → Submitted → Awarded/Declined
- [ ] Document upload for grant materials
- [ ] Link to related programs/workshops

### 4.2 Grant Calendar & Reminders
**Priority:** 🟡 High | **Effort:** Small

- [ ] Grant deadlines on calendar view
- [ ] Reminder tasks auto-created X days before deadline
- [ ] Grant reporting deadlines tracking

### 4.3 Funder Relationship Tracking
**Priority:** 🟢 Medium | **Effort:** Small

- [ ] Funder-specific interaction history
- [ ] Grant history per funder
- [ ] Funder communication preferences

---

## Phase 5: Reporting & Analytics (Weeks 19-22)
**Goal:** Understand program impact and participant journeys

### 5.1 Basic Dashboards
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Contact growth over time
- [ ] Program enrollment trends
- [ ] Task completion rates
- [ ] Interaction frequency by type
- [ ] LSO engagement metrics

### 5.2 Participant Journey Tracking
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Journey stage tracking per contact
- [ ] Program pathway visualization (which programs lead to which)
- [ ] Cohort analysis (how do participants from X program progress?)
- [ ] Retention metrics

### 5.3 Export & Reporting
**Priority:** 🟢 Medium | **Effort:** Small

- [ ] Export any view to CSV
- [ ] Scheduled report emails (weekly summary)
- [ ] Custom report builder (basic filters)

---

## Phase 6: Quality of Life & Polish (Weeks 23-26)
**Goal:** Improve usability for non-technical staff

### 6.1 Search & Discovery
**Priority:** 🟡 High | **Effort:** Medium

- [ ] Global search across all entities
- [ ] Recent items quick access
- [ ] Saved filters/views

### 6.2 Bulk Operations
**Priority:** 🟢 Medium | **Effort:** Small

- [ ] Bulk edit contacts
- [ ] Bulk assign tags
- [ ] Bulk import from CSV (with mapping UI)

### 6.3 Data Cleanup Tools
**Priority:** 🟢 Medium | **Effort:** Medium

- [ ] Duplicate detection
- [ ] Merge duplicate contacts/orgs
- [ ] Data validation warnings (missing required fields)

### 6.4 User Onboarding
**Priority:** 🟢 Medium | **Effort:** Small

- [ ] First-time user walkthrough
- [ ] Help tooltips on key features
- [ ] In-app documentation links

---

## Deferred / Future Phases

### Social Media Integration
- Connect Instagram/Facebook mentions to contacts
- Track social engagement metrics
- **Why deferred:** Adds complexity, not core to initial workflow

### Full Email Client
- Direct Gmail/Outlook integration (read inbox in-app)
- **Why deferred:** Security complexity, cost, staff workflow disruption

### Mobile App
- Native iOS/Android app
- **Why deferred:** Web app is mobile-responsive, dedicated app is costly

### Advanced AI Features
- Predictive follow-up suggestions
- Automated email drafting
- Sentiment analysis
- **Why deferred:** Start simple, add intelligence once workflows are established

### Multi-tenant / Team Features
- Team workspaces
- Role-based permissions (admin, editor, viewer)
- **Why deferred:** Current RLS handles user separation; expand if team grows

---

## Budget Estimate

### Setup Costs (~$2,000)
| Item | Cost |
|------|------|
| Development time (your rate) | $1,500 |
| Email forwarding service setup | $50 |
| Domain/SSL (if needed) | $50 |
| AI API credits for testing | $100 |
| Data migration assistance | $200 |
| Contingency | $100 |

### Monthly Costs (<$75/month)
| Item | Cost |
|------|------|
| Supabase Pro (if needed) | $25/month |
| Vercel hosting (free tier likely sufficient) | $0 |
| AI API usage (GPT-4 or Claude) | $20-40/month |
| Email forwarding service | $10/month |
| **Total** | **$55-75/month** |

---

## Recommended Implementation Order

```
MUST HAVE (Phases 1-2)          SHOULD HAVE (Phase 3)         NICE TO HAVE (Phases 4-6)
─────────────────────────────   ─────────────────────────     ───────────────────────────
✓ Contacts (done)               Email logging                 Grants tracking
Organizations                   Email forwarding              Advanced analytics
Programs/Workshops              AI email analysis             Participant journeys
Enhanced contact types          Bulk email processing         Data cleanup tools
Interactions/Activity log                                     Global search
Tasks system                                                  Bulk operations
Staff assignment                                              User onboarding
Calendar view
```

---

## Risk & Considerations

1. **Data Migration:** Existing spreadsheets may have inconsistent formats. Plan for manual cleanup.

2. **AI Reliability:** AI suggestions will need human review. Don't fully automate CRM entry initially.

3. **User Adoption:** Keep the UI simple. Resist feature creep. Train staff on core workflows first.

4. **Email Privacy:** Forwarding emails to the system requires staff awareness. Establish guidelines.

5. **Scope Creep:** This roadmap is ambitious. Be willing to cut features to meet timeline/budget.

6. **Backup Strategy:** Regular database exports. Supabase has built-in backups on Pro plan.

---

## Success Metrics

- [ ] 90% of contacts migrated from spreadsheets within 30 days
- [ ] Staff logging 5+ interactions per week within 60 days
- [ ] Zero "lost" follow-ups reported after 90 days
- [ ] 80% of emails processed through AI workflow within 6 months
- [ ] Staff can find any contact/org information in <30 seconds

---

## Next Steps

1. **Review this roadmap** - Adjust priorities based on PSCB feedback
2. **Finalize Phase 1 scope** - Confirm organizations/programs structure
3. **Data inventory** - Catalog all existing spreadsheets for migration planning
4. **Begin Phase 1 development** - Start with Organizations table

---

*Last updated: November 24, 2025*
*Version: 1.0*
