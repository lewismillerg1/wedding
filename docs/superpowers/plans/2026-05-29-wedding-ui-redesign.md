# Wedding UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the minimal wedding site into a cinematic-romantic landing page with Framer Motion animations, new typography, and a premium RSVP form.

**Architecture:** Mobile-first redesign across 5 components. Cormorant Garamond + Great Vibes fonts loaded via `next/font/google`, exposed as Tailwind `font-display` / `font-script` utilities. Framer Motion drives all animations; `useReducedMotion()` gates every animated element. The 21st.dev MCP provides the RSVP card shell; server action wiring is preserved.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next/font/google, 21st.dev MCP, Supabase (unchanged)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Modify | Add framer-motion |
| `app/layout.tsx` | Modify | Add Cormorant Garamond + Great Vibes font variables |
| `tailwind.config.ts` | Modify | Add `font-display` and `font-script` font families |
| `components/Hero.tsx` | Rewrite | Parchment bg, typographic layout, botanical SVG, cinematic Framer sequence |
| `components/EventDetails.tsx` | Modify | Warm stone tones + `whileInView` fade-up animations |
| `components/RSVPForm.tsx` | Rewrite | 21st.dev premium card shell + gold focus glow + AnimatePresence success |
| `components/Footer.tsx` | Modify | Warm stone tones + gold accent |

---

## Task 1: Install framer-motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install framer-motion**

```bash
cd /mnt/c/Users/igodl/code/wedding && npm install framer-motion
```

Expected: framer-motion added to `dependencies` in `package.json`, no peer dep errors.

- [ ] **Step 2: Verify install**

```bash
ls node_modules/framer-motion/dist/index.js
```

Expected: file exists.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json && git commit -m "feat: install framer-motion"
```

---

## Task 2: Add fonts to layout + Tailwind

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lewis & Nicole — May 27, 2026",
  description: "Join us to celebrate the wedding of Lewis and Nicole.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${cormorant.variable} ${greatVibes.variable} font-sans bg-white text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update `tailwind.config.ts`**

Replace the entire file with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Run dev server to verify fonts load**

```bash
npm run dev
```

Open http://localhost:3000 — no console errors about fonts. (Kill server after check.)

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx tailwind.config.ts && git commit -m "feat: add Cormorant Garamond and Great Vibes fonts"
```

---

## Task 3: Rewrite Hero with cinematic intro

**Files:**
- Rewrite: `components/Hero.tsx`

- [ ] **Step 1: Replace `components/Hero.tsx` entirely**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

function BotanicalDivider() {
  return (
    <svg
      viewBox="0 0 240 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[160px] sm:w-[200px] md:w-[240px]"
      aria-hidden="true"
    >
      <line x1="0" y1="14" x2="98" y2="14" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M120 5 L129 14 L120 23 L111 14 Z" stroke="#B8975A" strokeWidth="0.75" fill="none" />
      <line x1="142" y1="14" x2="240" y2="14" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M70 14 C66 8 58 5 53 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M70 14 C66 20 58 23 53 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M44 14 C40 8 32 5 27 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M44 14 C40 20 32 23 27 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M170 14 C174 8 182 5 187 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M170 14 C174 20 182 23 187 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M196 14 C200 8 208 5 213 9" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M196 14 C200 20 208 23 213 19" stroke="#B8975A" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const shouldReduce = useReducedMotion();

  function fadeUp(delayMs: number) {
    return {
      initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.7,
        delay: shouldReduce ? 0 : delayMs / 1000,
        ease: "easeOut",
      },
    };
  }

  function fadeIn(delayMs: number) {
    return {
      initial: shouldReduce ? { opacity: 1 } : { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: 0.8,
        delay: shouldReduce ? 0 : delayMs / 1000,
        ease: "easeOut",
      },
    };
  }

  return (
    <section className="min-h-dvh flex items-center justify-center bg-[#FAF7F2] px-6 py-20">
      <div className="text-center flex flex-col items-center gap-0">
        <motion.h1
          {...fadeUp(0)}
          className="font-display font-light text-[56px] leading-none sm:text-[84px] md:text-[108px] lg:text-[128px] text-stone-900 tracking-tight"
        >
          Lewis
        </motion.h1>

        <motion.p
          {...fadeUp(200)}
          className="font-script text-[36px] sm:text-[48px] md:text-[56px] text-[#B8975A] leading-tight -my-1 sm:-my-2"
        >
          and
        </motion.p>

        <motion.h1
          {...fadeUp(400)}
          className="font-display font-light text-[56px] leading-none sm:text-[84px] md:text-[108px] lg:text-[128px] text-stone-900 tracking-tight"
        >
          Nicole
        </motion.h1>

        <motion.div {...fadeIn(700)} className="mt-8 mb-6">
          <BotanicalDivider />
        </motion.div>

        <motion.p
          {...fadeUp(1100)}
          className="font-sans text-[11px] tracking-[0.22em] uppercase text-stone-400"
        >
          May 27, 2026
        </motion.p>

        <motion.div
          {...fadeIn(1600)}
          className="mt-10"
        >
          <motion.span
            animate={shouldReduce ? {} : { y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="inline-block text-[#B8975A] text-base select-none"
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify on mobile viewport**

```bash
npm run dev
```

Open http://localhost:3000. In browser devtools set viewport to 375px wide. Verify:
- Names animate in sequence
- "and" renders in script gold
- Botanical SVG appears after names
- Date and scroll arrow appear last
- Layout fits 375px with no horizontal scroll

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx && git commit -m "feat: cinematic hero with Framer Motion intro sequence"
```

---

## Task 4: Update EventDetails with warm tones + scroll animations

**Files:**
- Modify: `components/EventDetails.tsx`

- [ ] **Step 1: Replace `components/EventDetails.tsx` entirely**

```tsx
"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EventDetails() {
  return (
    <section className="py-16 md:py-24 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-2xl sm:text-3xl font-display font-light tracking-wide text-stone-900 mb-10 md:mb-12"
        >
          The Wedding
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm"
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#B8975A] mb-4 font-sans">
              Sealing Ceremony
            </p>
            <h3 className="text-xl font-display font-medium text-stone-900 mb-3">
              Lincoln Temple
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              May 27, 2026
              <br />
              3:00 PM
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm"
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#B8975A] mb-4 font-sans">
              Reception
            </p>
            <h3 className="text-xl font-display font-medium text-stone-900 mb-3">
              Terra Vista Clubhouse
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              Apartment Terra Vista
              <br />
              Lehi, Utah
              <br />
              5:00 PM onwards
              <br />
              Food, pool &amp; hot tub
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify scroll animations**

With dev server running, scroll down past the hero. Both cards should fade up as they enter the viewport.

- [ ] **Step 3: Commit**

```bash
git add components/EventDetails.tsx && git commit -m "feat: warm tones and scroll-triggered animations on event details"
```

---

## Task 5: RSVPForm — fetch 21st.dev card component + integrate

**Files:**
- Rewrite: `components/RSVPForm.tsx`

- [ ] **Step 1: Fetch 21st.dev premium card form component**

Call `mcp__magic__21st_magic_component_builder` with:
- `message`: "Premium card-based RSVP form with gold focus glow on inputs, warm ivory card surface, subtle shimmer, fields: Full Name, Email, Phone, Plus-one toggle, Dietary Restrictions textarea, full-width submit button"
- `searchQuery`: "card form premium glow"
- `absolutePathToCurrentFile`: `/mnt/c/Users/igodl/code/wedding/components/RSVPForm.tsx`
- `absolutePathToProjectDirectory`: `/mnt/c/Users/igodl/code/wedding`
- `standaloneRequestQuery`: "Premium card-based RSVP form component for Next.js with Tailwind CSS. Card has warm white surface with subtle box-shadow. Inputs have gold focus glow ring (#B8975A at 40% opacity). Fields: Full Name, Email, Phone, Plus-one checkbox/toggle, Dietary Restrictions textarea. Full-width dark submit button. Mobile-first, all inputs min-height 52px."

Take the returned component snippet and adapt it per Step 2.

- [ ] **Step 2: Write `components/RSVPForm.tsx` integrating the 21st.dev snippet**

The file must:
1. Keep `"use client"` at top
2. Keep the imports: `useFormState`, `useFormStatus` from `"react-dom"`, `submitRSVP` and `RSVPState` from `"@/app/actions/rsvp"`
3. Keep `initialState` and `SubmitButton` component unchanged
4. Wrap the card in `AnimatePresence` from framer-motion for the success state transition
5. Apply gold focus ring via Tailwind: `focus:ring-2 focus:ring-[#B8975A]/40 focus:border-[#B8975A]`
6. Apply card shadow: `shadow-[0_4px_32px_rgba(0,0,0,0.07)]`

Minimum viable structure if 21st.dev returns a usable snippet — adapt its card shell and input styles into this skeleton:

```tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { submitRSVP, type RSVPState } from "@/app/actions/rsvp";

const initialState: RSVPState = { status: "idle", message: "" };

const inputClass =
  "w-full border border-stone-200 rounded-xl px-4 py-3.5 text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8975A]/40 focus:border-[#B8975A] transition-all duration-200 bg-white min-h-[52px]";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-stone-900 text-white text-sm tracking-widest uppercase py-4 px-8 rounded-xl hover:bg-stone-800 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
    >
      {pending ? "Sending…" : "RSVP"}
    </button>
  );
}

export default function RSVPForm() {
  const [state, formAction] = useFormState(submitRSVP, initialState);

  return (
    <section id="rsvp" className="py-16 md:py-24 px-6 bg-[#FAF7F2]">
      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {state.status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center py-12"
            >
              <p className="font-display text-3xl font-light text-stone-900 mb-4">
                See You There
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">{state.message}</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-wide text-stone-900 mb-3">
                  Join Us
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Kindly RSVP below. Space is limited to 50 guests.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.07)] p-6 sm:p-8">
                <form action={formAction} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium tracking-wide text-stone-500 uppercase mb-2">
                      Full Name <span className="text-[#B8975A]">*</span>
                    </label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium tracking-wide text-stone-500 uppercase mb-2">
                      Email <span className="text-[#B8975A]">*</span>
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium tracking-wide text-stone-500 uppercase mb-2">
                      Phone <span className="text-[#B8975A]">*</span>
                    </label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>

                  <div className="flex items-center gap-3 py-1">
                    <div className="relative flex items-center">
                      <input
                        id="plus_one"
                        name="plus_one"
                        type="checkbox"
                        className="peer w-5 h-5 appearance-none rounded border border-stone-300 bg-white checked:bg-stone-900 checked:border-stone-900 focus:outline-none focus:ring-2 focus:ring-[#B8975A]/40 transition-all cursor-pointer"
                      />
                      <svg className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <label htmlFor="plus_one" className="text-sm text-stone-700 cursor-pointer select-none">
                      I will be bringing a plus-one
                    </label>
                  </div>

                  <div>
                    <label htmlFor="dietary_restrictions" className="block text-xs font-medium tracking-wide text-stone-500 uppercase mb-2">
                      Dietary Restrictions <span className="text-stone-400 font-normal normal-case tracking-normal">(optional)</span>
                    </label>
                    <textarea
                      id="dietary_restrictions"
                      name="dietary_restrictions"
                      rows={3}
                      placeholder="Any allergies or dietary needs…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {state.status === "error" && (
                    <p role="alert" className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {state.message}
                    </p>
                  )}

                  <SubmitButton />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

Note: If the 21st.dev snippet from Step 1 provides a better card shell or input style, use it. Replace the card `div` and `inputClass` with the 21st.dev version. The server action wiring (`formAction`, `state`, `SubmitButton`) must stay exactly as above.

- [ ] **Step 3: Verify form on mobile**

With dev server running, scroll to RSVP section at 375px viewport. Verify:
- Card renders with warm shadow
- Inputs show gold glow on focus
- Custom checkbox renders correctly
- Submit button is full-width
- Submitting shows loading state then success with fade transition

- [ ] **Step 4: Commit**

```bash
git add components/RSVPForm.tsx && git commit -m "feat: premium card RSVP form with gold focus glow and AnimatePresence"
```

---

## Task 6: Update Footer

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-stone-200 bg-stone-50">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-stone-400 text-sm tracking-wide font-sans">
          Lewis &amp; Nicole{" "}
          <span className="text-[#B8975A]">&middot;</span>{" "}
          May 27, 2026
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx && git commit -m "feat: warm footer tones with gold accent"
```

---

## Task 7: Final smoke test + build check

- [ ] **Step 1: Run full dev check at 375px**

```bash
npm run dev
```

At 375px viewport, scroll through the full page and verify:
- Hero intro sequence plays (names → "and" → botanical → date → arrow)
- Event cards fade up on scroll
- RSVP form card has warm shadow, gold focus glow on inputs
- Footer gold dot visible
- No horizontal scroll at any point
- No console errors

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript or Next.js errors.

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "feat: complete cinematic-romantic UI redesign

- Cormorant Garamond + Great Vibes typography
- Framer Motion cinematic hero intro sequence
- Scroll-triggered EventDetails animations
- Premium RSVP card with gold focus glow
- Warm parchment color system throughout
- Mobile-first, prefers-reduced-motion respected

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
