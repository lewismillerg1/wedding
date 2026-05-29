# Wedding Invitation Website — Spec

**Date:** 2026-05-29
**Couple:** Lewis & Nicole
**Wedding date:** May 27, 2026

---

## Architecture

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres) via `@supabase/supabase-js`
- **Deployment:** Vercel (free tier)
- **Auth:** None — fully public site

---

## Pages & Sections

Single-page site (`/`) with four sections:

1. **Hero** — Full-width couples photo. Names "Lewis & Nicole" and date "May 27, 2026" overlaid in minimal sans-serif typography.
2. **Event Details** — Two cards:
   - *Sealing:* Lincoln Temple · 3:00 PM · May 27, 2026
   - *Reception:* Terra Vista Clubhouse, Lehi, Utah · Food, Pool & Hot Tub · 5:00 PM
3. **RSVP Form** — See below.
4. **Footer** — Names and date, minimal.

---

## RSVP Form

### Fields

| Field | Type | Required |
|-------|------|----------|
| Full name | Text | Yes |
| Email | Email | Yes |
| Phone number | Tel | Yes |
| Bringing a plus-one? | Checkbox | No |
| Dietary restrictions | Textarea | No |

### Behavior

- Attending-only — no decline option.
- On submit: calls a Next.js Server Action.
- Server Action queries current RSVP count.
  - If count >= 50 → return error: *"We're sorry, RSVPs are now full."*
  - If count < 50 → insert row → return success: *"You're on the list! We can't wait to celebrate with you."*
- Success/error message shown inline below the form.

---

## Supabase Schema

```sql
create table rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  plus_one boolean default false,
  dietary_restrictions text,
  created_at timestamptz default now()
);
```

---

## Data Flow

1. Guest submits form on the client.
2. Next.js Server Action (`app/actions/rsvp.ts`) runs server-side:
   - `select count(*) from rsvps`
   - If >= 50 → error response
   - Else → insert row → success response
3. Client renders inline success or error message.

---

## Design System

- **Background:** White (`white`)
- **Accents:** Warm neutral (`stone-100`, `stone-200`)
- **Text:** Dark (`stone-900`)
- **Font:** Inter or Geist Sans
- **Cards:** `border border-stone-200`, soft shadow, `rounded-xl`
- **Layout:** Centered, `max-w-2xl`, generous vertical spacing
- **No animations**

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Set in `.env.local` for local dev and in Vercel project settings for production.

---

## Out of Scope

- Editing or cancelling an RSVP after submission
- Email confirmation to guests
- Admin dashboard (use Supabase table view directly)
- Multi-page routing
