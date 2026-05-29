# Wedding Website — Brainstorming

**Date:** 2026-05-29
**Couple:** Lewis & Nicole

---

## The Idea

A digital wedding invitation website for Lewis and Nicole's wedding on May 27, 2026. The site displays event details and lets guests RSVP online, with responses stored in a Supabase database. Once 50 RSVPs are submitted, the form closes automatically.

---

## Event Details

- **Sealing:** Lincoln Temple, 3:00 PM, May 27 2026
- **Reception:** Terra Vista Clubhouse, Apartment Terra Vista, Lehi, Utah — food, pool & hot tub, 5:00–6:00 PM onward

---

## Questions Explored

| Question | Answer |
|----------|--------|
| Wedding date | May 27, 2026 |
| Design aesthetic | Modern & minimal — clean whites, soft neutrals, sans-serif |
| Hero section | Couples photo with names and date overlaid |
| RSVP fields | Name, Email, Phone, Plus-one, Dietary restrictions |
| RSVP cap | 50 attendees max |
| Decline option | No — attending-only form |
| Reception time | 5:00–6:00 PM (same day as sealing) |

---

## Approaches Considered

### Option A — Static site + Supabase
Plain HTML/CSS/JS or Astro. Simplest, free hosting on Netlify/Vercel, no server needed. Best for a one-time event.

### Option B — Next.js + Supabase ✅ Chosen
React-based, App Router, server actions for RSVP submission logic. More structured and familiar for React developers. Deploys cleanly to Vercel.

### Option C — Fully static (no DB)
HTML/CSS with Formspree. No RSVP cap control. Rejected — doesn't meet requirements.

---

## Decision

**Next.js 14 + Supabase**, deployed to Vercel. Server Actions handle RSVP count checking and insertion server-side, keeping Supabase keys off the client.
