# Magnolia Home Buyers — Full Site Revamp Design Spec

**Date:** 2026-03-24
**Client:** David Machado / Magnolia Home Buyers LLC
**Stack:** Next.js, TypeScript, Framer Motion, CSS custom properties

---

## Design System

### Typography
- **Display + Body:** Plus Jakarta Sans (Google Fonts)
- **Weights used:** 300 (light), 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **No serif fonts** — clean, geometric, modern throughout
- **Hero headlines:** `clamp(4rem, 10vw, 10rem)`, weight 800, `letter-spacing: -0.04em`
- **Section headings:** `clamp(2.5rem, 5vw, 5rem)`, weight 700
- **Body:** 1rem / 1.6 line-height, weight 400
- **Eyebrows:** 0.65rem, weight 700, `letter-spacing: 0.10em`, uppercase

### Color Palette
```
--bg-dark:    #111111   /* near-black, dominant dark sections */
--bg-mid:     #1A1A1A   /* cards, alt dark */
--bg-cream:   #F8F4EE   /* dominant light sections */
--bg-parchment: #EDE7D9 /* cream cards / alt light */
--blue:       #2B5BA8   /* primary accent — steel blue */
--blue-light: #3D6FBF   /* hover state */
--blue-pale:  #D6E4F7   /* light tint for cream sections */
--text-dark:  #111111   /* on cream sections */
--text-light: #F8F4EE   /* on dark sections */
--text-muted-dark:  rgba(17,17,17,0.5)
--text-muted-light: rgba(248,244,238,0.45)
--border-dark:  rgba(248,244,238,0.07)
--border-cream: rgba(43,91,168,0.15)
```
No gold/green — clean blue+cream throughout.

### Section Rhythm (alternating)
1. **Hero** — dark (`#111111`)
2. **How It Works** — cream (`#F8F4EE`)
3. **Why Magnolia** — dark (`#111111`)
4. **Testimonials** — cream (`#F8F4EE`)
5. **FAQ** — dark (`#111111`)
6. **CTA / Contact** — dark (`#111111`)
7. **Footer** — near-black (`#0A0A0A`)

### Effects
- Film grain `body::after` — `opacity: 0.028`, `position: fixed; inset: 0` (never negative inset)
- No rounded corners (border-radius 2–4px max — editorial/refined)
- No shadows — separation via color contrast only
- Subtle blue border accents (`1px solid rgba(43,91,168,0.2)`) on cream cards

---

## Page Architecture

### Nav
- Fixed top, transparent → blur on scroll
- Logo: "Magnolia" in Plus Jakarta Sans 700, no letter-spacing
- Links: How It Works · About · FAQ
- CTA button: "Get Offer" — blue fill, 2px border-radius

### Hero Section (dark)
- Full viewport height
- Large editorial headline, 2–3 lines:
  - Line 1: "We Buy" — weight 300 (light, thin)
  - Line 2: "Your Home." — weight 800 (extrabold, dominant)
  - Line 3: "Fast. Cash." — weight 800, blue accent color
- Subtext: "Fair offer in 24 hours. No repairs. No fees. No hassle."
- Primary CTA: "Get My Cash Offer" — blue button
- Secondary: "How It Works ↓" — ghost/text link
- Background: `#111111` + film grain
- Hero image: `public/images/hero.jpg` exists — use as right-side visual (50% split layout on desktop: text left, image right with dark gradient overlay). On mobile: text only, image hidden.
- Scroll-triggered fade-in via Framer Motion

### How It Works (cream)
- Editorial numbered row layout (01 / 02 / 03)
- Step numbers in blue, large, italic weight
- Each row: number + title + description, separated by thin lines
- Hover: blue left-border indicator slides in
- Framer Motion staggered scroll reveal

### Why Magnolia (dark)
- 2×2 editorial grid with border lines separating quadrants
- Each cell: icon (SVG, not emoji) + heading + description
- Hover: blue accent bleeds in from left border
- Eyebrow: "Why Choose Us"

### Testimonials (cream)
- Single pull-quote slider
- Large `"` character (CSS entity `&#8220;`) in blue
- Customer name + location below
- Dot nav + prev/next arrows
- 6s auto-advance, crossfade transition

### FAQ (dark)
- Accordion list
- Question rows separated by thin lines
- Expand/collapse with Framer Motion AnimatePresence
- Blue `+` / `−` indicator

### CTA Section (dark)
- Full-width centered
- Headline: "Ready to Sell?"
- Subtext + blue CTA button
- Reuse existing `LeadForm` component (Resend API already wired) embedded within the CTA section — not a separate page section, just inline beneath the headline
- Form is the primary CTA — no duplicate standalone button needed

### Footer (near-black)
- Logo + nav links
- Legal: dynamic year via `new Date().getFullYear()` — "© 2025 Magnolia Home Buyers LLC"
- Simple, minimal — 2-column max

---

---

## Removed / Consolidated Components

| Component | Disposition |
|-----------|-------------|
| `MarqueeTicker` | **Remove** — not in new section rhythm, adds visual noise |
| `Stats` | **Absorb into Hero** — show 3 key stats (e.g. "500+ homes bought · 24hr offer · Zero fees") as a simple row beneath the hero CTA |
| `Situations` | **Remove** — replaced by improved Why Magnolia editorial grid which covers the same intent |
| `LeadForm` | **Keep, reskin** — embedded inside new CTASection with updated cream/blue styling; backend (Resend) stays intact |

All italic type treatment from the old Cormorant Garamond design is removed. Plus Jakarta Sans italic is intentionally avoided — use weight contrast (300 vs 800) for drama instead.

---

## Mobile Behavior

- **How It Works rows:** Stack vertically on mobile. Step number moves above title. Full-width rows, no horizontal layout.
- **Why Magnolia grid:** 2×2 → 1×4 (single column) below 768px. Each cell full width with left blue border accent retained.
- **Testimonials:** Hide prev/next arrows on touch devices (`@media (hover: none)`). Dot nav remains. Auto-advance stays active.
- **Hero:** Split layout (text left / image right) collapses to text-only on mobile. Image hidden below 768px.
- **Nav:** Existing hamburger behavior retained (or simple mobile collapse).
- **Base breakpoints:** 375px (small phone), 768px (tablet/nav collapse), 1024px (desktop full layout)

---

## Component Inventory

| Component | File | Status |
|-----------|------|--------|
| Nav | `components/Nav.tsx` | Rewrite |
| Hero | `components/Hero.tsx` | Rewrite |
| HowItWorks | `components/HowItWorks.tsx` | Rewrite |
| WhyMagnolia | `components/WhyMagnolia.tsx` | Rewrite |
| Testimonials | `components/Testimonials.tsx` | Rewrite |
| FAQ | `components/FAQ.tsx` | Create new |
| CTASection | `components/CTASection.tsx` | Create new |
| Footer | `components/Footer.tsx` | Rewrite |
| globals.css | `app/globals.css` | Full update |
| layout.tsx | `app/layout.tsx` | Update fonts |

---

## Font Setup

Replace Cormorant Garamond + Outfit with Plus Jakarta Sans only:

```tsx
// app/layout.tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
})
```

CSS variable: `--font-display` and `--font-body` both map to `--font-jakarta`.

---

## Animation Approach (Framer Motion)

- Scroll reveals: `useInView` + `initial={{ opacity:0, y:24 }}` → `animate={{ opacity:1, y:0 }}`
- Stagger: `0.08s` between items
- Duration: `0.5s`, `ease: [0.25, 0, 0, 1]`
- Nav: blur background on `scrollY > 40`
- Testimonials: `AnimatePresence` crossfade, `duration: 0.4s`
- FAQ accordion: `AnimatePresence` height expand, `duration: 0.3s`

---

## Out of Scope

- Contact form backend / email integration
- Lead capture / CRM
- Blog / content pages
- Mobile app
