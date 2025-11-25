# Production Deployment Checklist

## Pre-Deployment (Required)

### 1. Supabase Setup
- [ ] Create Supabase project at https://app.supabase.com
- [ ] Run `supabase/schema.sql` in SQL Editor to create contacts table
- [ ] Run `supabase/migrations/001_add_user_id_to_contacts.sql` to secure RLS policies
- [ ] (Optional) Run `supabase/seed.sql` to add sample data
- [ ] Enable Email authentication in Authentication > Providers
- [ ] Configure Site URL in Authentication > URL Configuration (set to your Vercel URL)
- [ ] **REGENERATE API KEYS** if they were ever exposed (Settings > API > Regenerate)

### 2. Environment Variables
Set these in Vercel (Settings > Environment Variables):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Publishable key (starts with `sb_publishable_`) |

### 3. Vercel Configuration
- [ ] Connect GitHub repository
- [ ] Set Framework Preset to "Vite"
- [ ] Add environment variables
- [ ] Deploy

---

## Post-Deployment Verification

### Authentication Flow
- [ ] Can access `/login` page
- [ ] Can register new account at `/signup`
- [ ] Receives confirmation email
- [ ] Can verify email and log in
- [ ] Protected routes redirect to login when not authenticated
- [ ] Can log out successfully

### Data Operations
- [ ] Can view contacts (Dashboard table and Contacts page)
- [ ] Can create new contact
- [ ] Can edit existing contact
- [ ] Can delete contact
- [ ] Can toggle contact status
- [ ] Can export to CSV
- [ ] Users can only see their own data (RLS working)

### UI/UX
- [ ] Toast notifications appear for all operations
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Password strength meter works on signup
- [ ] Form validation shows errors inline

---

## Security Checklist

### Completed
- [x] Authentication required for all protected routes
- [x] Row Level Security (RLS) enabled on database
- [x] User-scoped data access (users only see their data)
- [x] Strong password requirements (8+ chars, upper, lower, number)
- [x] Input validation with Zod
- [x] CSRF protection via Supabase session handling
- [x] Secure session management

### Recommended for Production
- [ ] Set up custom domain with HTTPS
- [ ] Configure Supabase email templates (branding)
- [ ] Enable rate limiting on Supabase (Settings > API > Rate Limits)
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Enable Supabase audit logs
- [ ] Configure CORS settings if needed
- [ ] Review and tighten RLS policies for your use case

---

## Supabase Email Configuration

1. Go to Authentication > Email Templates
2. Customize:
   - Confirm signup email
   - Password reset email
   - Magic link email (if using)
3. Set "From" email address in Settings > SMTP (optional, requires custom SMTP)

---

## Monitoring & Analytics (Recommended)

### Error Tracking
```bash
npm install @sentry/react
```
Then configure in your app entry point.

### Analytics
Consider adding:
- Vercel Analytics (built-in)
- PostHog (open source)
- Plausible (privacy-friendly)

---

## Database Backup

Supabase provides daily backups on paid plans. For free tier:
- Use `pg_dump` for manual backups
- Set up scheduled exports

---

## Support

- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- React Router Docs: https://reactrouter.com/

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials
3. Run the app locally to test
