# Magnolia Home Buyers — Full Site Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark forest green / gold editorial site with a cream + steel blue design using Plus Jakarta Sans throughout, keeping the editorial layout structure but updating every visual token.

**Architecture:** CSS custom property swap in `globals.css` and font swap in `layout.tsx` are the foundation — every component inherits from these tokens. Components are then rewritten one by one, each independently verifiable. No new backend code; the existing Resend API route at `app/api/contact/` is left untouched.

**Tech Stack:** Next.js (Turbopack), TypeScript, Framer Motion, CSS custom properties, next/font/google (Plus Jakarta Sans), inline styles + scoped `<style>` blocks per component.

**Spec:** `docs/superpowers/specs/2026-03-24-magnolia-full-revamp-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| **Modify** | `app/globals.css` | Replace all color tokens (green→cream/blue), replace eyebrow letter-spacing, remove marquee keyframe, update scrollbar tokens |
| **Modify** | `app/layout.tsx` | Swap Cormorant Garamond + Outfit → Plus Jakarta Sans only |
| **Modify** | `app/page.tsx` | Remove MarqueeTicker/Stats/Situations imports; add CTASection |
| **No change** | `app/about/page.tsx` | Exists in repo — uses same CSS custom properties, no direct gold/green hex values. Token swap in globals.css handles it automatically. No edits needed. |
| **Rewrite** | `components/Nav.tsx` | Fixed nav, transparent→blur on scroll, cream+blue |
| **Rewrite** | `components/Hero.tsx` | Split layout (text left / hero.jpg right), dark bg, blue CTA, stat row |
| **Reskin** | `components/HowItWorks.tsx` | Same editorial row structure; swap gold→blue, forest→dark |
| **Reskin** | `components/WhyMagnolia.tsx` | Same 2×2 grid; swap gold→blue, section bg dark |
| **Reskin** | `components/Testimonials.tsx` | Same pull-quote slider; swap gold→blue quote mark, cream bg |
| **Reskin** | `components/FAQ.tsx` | Existing accordion; swap gold→blue, dark bg |
| **Create** | `components/CTASection.tsx` | Dark section wrapper: headline + embedded LeadForm |
| **Reskin** | `components/LeadForm.tsx` | Swap all gold tokens → blue; remove section wrapper (now embedded in CTASection) |
| **Rewrite** | `components/Footer.tsx` | Minimal 2-col, near-black, blue hover links |
| **Delete** | `components/MarqueeTicker.tsx` | Removed from design |
| **Delete** | `components/Stats.tsx` | Stats absorbed into Hero |
| **Delete** | `components/Situations.tsx` | Removed from design |

---

## Task 1: Design System Foundation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

### globals.css — Replace all tokens

- [ ] **Step 1: Replace the `:root` CSS custom properties block**

Replace lines 6–35 (the full `:root` block) with:

```css
:root {
  /* Backgrounds */
  --bg-dark:        #111111;
  --bg-mid:         #1A1A1A;
  --bg-card:        #222222;
  --bg-cream:       #F8F4EE;
  --bg-parchment:   #EDE7D9;
  --bg-footer:      #0A0A0A;

  /* Accent */
  --blue:           #2B5BA8;
  --blue-light:     #3D6FBF;
  --blue-pale:      #D6E4F7;
  --blue-border:    rgba(43, 91, 168, 0.2);
  --blue-border-md: rgba(43, 91, 168, 0.4);

  /* Text */
  --text-light:      #F8F4EE;
  --text-muted:      rgba(248, 244, 238, 0.45);
  --text-subtle:     rgba(248, 244, 238, 0.22);
  --text-dark:       #111111;
  --text-dark-muted: rgba(17, 17, 17, 0.5);

  /* Fonts — single font family */
  --font-display: var(--font-jakarta), 'Helvetica Neue', Arial, sans-serif;
  --font-body:    var(--font-jakarta), 'Helvetica Neue', Arial, sans-serif;

  /* Spacing */
  --section-gap:  clamp(80px, 12vw, 160px);
  --section-pad:  clamp(64px, 10vw, 128px);
}
```

- [ ] **Step 2: Update `html` and `body` base colors**

```css
html {
  scroll-behavior: smooth;
  background: #111111;
  overflow-x: hidden;
}

body {
  width: 100%;
  overflow-x: hidden;
  font-family: var(--font-body);
  background-color: var(--bg-dark);
  color: var(--text-light);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 3: Update the `.eyebrow` class**

```css
.eyebrow {
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--blue);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 16px;
}
```

- [ ] **Step 4: Remove the `@keyframes marquee` block** (no longer used — MarqueeTicker is being deleted)

- [ ] **Step 5: Update scrollbar styles**

The existing file has Webkit scrollbar rules that reference old gold colors. Replace them:

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-dark); }
::-webkit-scrollbar-thumb { background: var(--blue-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue); }
```

- [ ] **Step 6: Note on `--bg-alt` removal**

`--bg-alt: #111F13` (old forest green mid-tone) is intentionally removed from `:root`. `Testimonials.tsx` currently references it — this will cause that section to fall back to transparent until Task 7 replaces it with `var(--bg-cream)`. This is expected interim breakage, not a bug.

- [ ] **Step 7: Keep film grain, fadeUp, pulse-dot, clip-path classes, and section utilities unchanged**

### layout.tsx — Swap fonts

- [ ] **Step 6: Replace font imports and variables**

```tsx
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})
```

- [ ] **Step 7: Update the `html` className**

```tsx
<html lang="en" className={jakarta.variable}>
```

- [ ] **Step 8: Verify build passes**

```bash
cd C:/Users/Cal/magnolia-home-buyers && npm run build
```

Expected: Build succeeds, no type errors. (Dev server font warnings for old components using `--font-cormorant` / `--font-outfit` are OK — they fall back to the `var(--font-jakarta)` stack.)

- [ ] **Step 9: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: replace green/gold design tokens with cream+blue, swap to Plus Jakarta Sans"
```

---

## Task 2: page.tsx — Remove dead imports, add CTASection

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx**

```tsx
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhyMagnolia from '@/components/WhyMagnolia'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyMagnolia />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
  )
}
```

- [ ] **Step 2: Delete removed component files**

```bash
rm "C:/Users/Cal/magnolia-home-buyers/components/MarqueeTicker.tsx"
rm "C:/Users/Cal/magnolia-home-buyers/components/Stats.tsx"
rm "C:/Users/Cal/magnolia-home-buyers/components/Situations.tsx"
```

- [ ] **Step 3: Verify dev server starts without import errors**

```bash
npm run dev
```

Expected: Server starts. The page will render broken visually (CTASection doesn't exist yet, LeadForm is still gold-styled) — that's fine. No import errors in terminal.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/MarqueeTicker.tsx components/Stats.tsx components/Situations.tsx
git commit -m "feat: remove MarqueeTicker/Stats/Situations, add CTASection slot"
```

---

## Task 3: Nav

**Files:**
- Rewrite: `components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 64px)',
        background: scrolled ? 'rgba(17,17,17,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(248,244,238,0.06)' : '1px solid transparent',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--text-light)',
          letterSpacing: 0,
        }}
      >
        Magnolia
      </span>

      {/* Links */}
      <div
        className="nav-links"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          fontWeight: 500,
          color: 'var(--text-muted)',
        }}
      >
        <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-light)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          How It Works
        </a>
        <a href="#why-magnolia" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-light)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          Why Us
        </a>
        <a href="#faq" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-light)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          FAQ
        </a>
        <a
          href="#contact"
          style={{
            background: 'var(--blue)',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '0.78rem',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}
        >
          Get Offer
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-links a:not(:last-child) { display: none; }
        }
      `}</style>
    </nav>
  )
}
```

- [ ] **Step 2: Check in browser** — Nav should be transparent on page load, blur on scroll, blue "Get Offer" button.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: rewrite Nav with cream+blue design, scroll blur"
```

---

## Task 4: Hero

**Files:**
- Rewrite: `components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { num: '500+', label: 'Homes Purchased' },
  { num: '24hr', label: 'Cash Offer' },
  { num: '$0', label: 'Fees or Repairs' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0, 0, 1] },
  }),
}

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'var(--bg-dark)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64, /* nav height */
      }}
      className="hero-section"
    >
      {/* Left: copy */}
      <div
        style={{
          padding: 'clamp(48px, 8vw, 120px) clamp(24px, 5vw, 80px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.span
          className="eyebrow"
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          Nationwide Cash Home Buyers
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            marginBottom: 24,
          }}
        >
          <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(3rem, 6vw, 7rem)', color: 'var(--text-light)' }}>
            We Buy
          </span>
          <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(4rem, 8vw, 10rem)', color: 'var(--text-light)' }}>
            Your Home.
          </span>
          <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 7rem)', color: 'var(--blue)' }}>
            Fast. Cash.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            marginBottom: 36,
            maxWidth: 480,
          }}
        >
          Fair offer in 24 hours. No repairs. No agent fees. Close in as few as 7 days.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 56 }}
        >
          <a
            href="#contact"
            style={{
              background: 'var(--blue)',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: 2,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-light)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue)')}
          >
            Get My Cash Offer
          </a>
          <a
            href="#how-it-works"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-light)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            How It Works ↓
          </a>
        </motion.div>

        {/* Stat row */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          style={{
            display: 'flex',
            gap: 32,
            paddingTop: 24,
            borderTop: '1px solid rgba(248,244,238,0.08)',
          }}
          className="hero-stats"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  color: 'var(--text-light)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: image */}
      {!imgError && (
        <div
          className="hero-image-panel"
          style={{
            position: 'relative',
            height: '100%',
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Home exterior"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            onError={() => setImgError(true)}
          />
          {/* Gradient overlay — left edge blends into dark bg */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #111111 0%, rgba(17,17,17,0.3) 40%, rgba(17,17,17,0.1) 100%)',
            }}
          />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hero-section { grid-template-columns: 1fr !important; }
          .hero-image-panel { display: none !important; }
          .hero-stats { gap: 20px !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser** — Dark hero, large weight-contrast headline, blue "Fast. Cash.", stat row, hero.jpg on right with gradient blend.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite Hero with split layout, weight-contrast headline, blue accent, stat row"
```

---

## Task 5: HowItWorks — Reskin

**Files:**
- Modify: `components/HowItWorks.tsx`

The editorial numbered row structure already exists. Only the color tokens and section background need updating.

- [ ] **Step 1: Change section background to cream**

Find the outer `<section>` style and set:
```tsx
background: 'var(--bg-cream)',
```

- [ ] **Step 2: Update all tokens specifically**

Find and replace each occurrence:
- `var(--gold)` → `var(--blue)` (step numbers, hover border, any accents)
- `var(--text-warm)` → `var(--text-dark)` (headings/body on cream bg)
- `var(--text-muted)` on dark text context → `var(--text-dark-muted)`
- `rgba(255,255,255,0.08)` (divider lines) → `rgba(17,17,17,0.08)`
- `borderTop: '1px solid rgba(201,168,76,0.2)'` → `borderTop: '1px solid rgba(17,17,17,0.1)'`
- Button bg: `var(--gold)` → `var(--blue)`, button text color from dark green → `#ffffff`
- Button hover: `var(--gold-light)` → `var(--blue-light)`

- [ ] **Step 3: Remove all `fontStyle: 'italic'`**

Scan HowItWorks.tsx for any `fontStyle: 'italic'` — remove all occurrences. Plus Jakarta Sans italic lacks the drama of Cormorant italic; the design uses weight contrast instead.

- [ ] **Step 4: Update CTA row** (if present) to use blue button styling

- [ ] **Step 4: Check in browser** — Cream section with blue step numbers, dark text, clean editorial rows.

- [ ] **Step 5: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "feat: reskin HowItWorks to cream+blue palette"
```

---

## Task 6: WhyMagnolia — Reskin

**Files:**
- Modify: `components/WhyMagnolia.tsx`

Same approach: structure intact, token swap only.

- [ ] **Step 1: Change section background to dark**

```tsx
background: 'var(--bg-dark)',
```

- [ ] **Step 2: Swap tokens**

- `var(--gold)` → `var(--blue)` (accent borders, hover indicators, any highlights)
- `var(--text-warm)` → `var(--text-light)` (text on dark bg)
- Card/grid border lines: the current file uses `rgba(26,26,26,0.15)` and `rgba(26,26,26,0.1)` — these are dark-on-light borders from the old cream background. On the new dark bg they will be invisible. Replace with `rgba(248,244,238,0.07)` for light-on-dark separation.
- `var(--text-muted)` stays as-is (resolves to `rgba(248,244,238,0.45)` — correct for dark bg)
- `.eyebrow` auto-updates to blue

- [ ] **Step 3: Fix SVG icon colors**

All four SVG icons in WhyMagnolia.tsx have hardcoded `stroke="#C9A84C"` and `fill="#C9A84C"` hex values. These must be updated:
```tsx
// Change all SVG stroke/fill from:
stroke="#C9A84C" fill="#C9A84C"
// To:
stroke="#2B5BA8" fill="#2B5BA8"
```
Or set `fill="currentColor" stroke="currentColor"` on the SVG and add `color: 'var(--blue)'` to the wrapping element.

- [ ] **Step 4: Remove all `fontStyle: 'italic'`**

Scan WhyMagnolia.tsx for `fontStyle: 'italic'` on cell numbers, headings, or any text — remove all occurrences.

- [ ] **Step 5: Check in browser** — Dark 2×2 grid, blue hover left-border, cream text, blue SVG icons (not gold).

- [ ] **Step 6: Commit**

```bash
git add components/WhyMagnolia.tsx
git commit -m "feat: reskin WhyMagnolia to dark+blue palette, fix SVG icon colors"
```

---

## Task 7: Testimonials — Reskin

**Files:**
- Modify: `components/Testimonials.tsx`

- [ ] **Step 1: Change section background to cream**

```tsx
background: 'var(--bg-cream)',
```

- [ ] **Step 2: Swap tokens**

- Quote mark `&#8220;`: change color from `var(--gold)` → `var(--blue)`
- Dot nav active dot: `var(--gold)` → `var(--blue)`
- Active dot width animation stays the same
- Text: `var(--text-warm)` / `var(--text-muted)` → `var(--text-dark)` / `var(--text-dark-muted)`
- Divider lines (if any): `rgba(255,255,255,x)` → `rgba(17,17,17,0.08)`
- Prev/Next arrows: `var(--gold)` → `var(--blue)`
- `.eyebrow` auto-updates
- Also replace `var(--bg-alt)` (which is removed) → `var(--bg-cream)` on the section background

- [ ] **Step 3: Remove all `fontStyle: 'italic'`**

Scan Testimonials.tsx for `fontStyle: 'italic'` on blockquote text, headings, or customer names — remove all occurrences.

- [ ] **Step 4: Check in browser** — Cream section, blue quote mark, dark text, blue dot nav.

- [ ] **Step 5: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: reskin Testimonials to cream+blue palette"
```

---

## Task 8: FAQ — Reskin

**Files:**
- Modify: `components/FAQ.tsx`

- [ ] **Step 1: Change section background to dark**

FAQ currently has `background: 'var(--bg-cream)'`. The spec places FAQ on dark. Change to:
```tsx
background: 'var(--bg-dark)',
```

- [ ] **Step 2: Swap tokens for dark background**

- `var(--gold)` → `var(--blue)` (expand indicator, any accent)
- `var(--text-dark)` / `rgba(26,26,26,x)` text values → `var(--text-light)` / `var(--text-muted)` (on dark bg, text must be light)
- Hardcoded hover color `'#5A3A1A'` (old dark brown hover) → `rgba(43,91,168,0.08)` (subtle blue tint on dark)
- Divider/border lines: `rgba(26,26,26,0.15)` (dark-on-light, now invisible) → `rgba(248,244,238,0.07)` (light-on-dark)
- `.eyebrow` auto-updates

- [ ] **Step 3: Check in browser** — Dark accordion, blue expand indicator, cream text rows, light dividers.

- [ ] **Step 4: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: reskin FAQ to dark+blue palette"
```

---

## Task 9: CTASection — Create

**Files:**
- Create: `components/CTASection.tsx`

`CTASection` is a dark section wrapper that provides the heading context. `LeadForm` is embedded inside it (after LeadForm's own outer `<section>` wrapper is removed in Task 10).

**Important layout note:** The current LeadForm has a 2-column layout — left panel (logo, heading "Get Your Free Cash Offer Today", contact info) and right panel (the form). CTASection provides its own "Ready to Sell?" heading above. To avoid duplicate headings, Task 10 will **remove the left-panel copy block** from LeadForm entirely, leaving only the right-panel form card. CTASection's centered heading + the form card below creates the correct layout.

- [ ] **Step 1: Create CTASection.tsx**

```tsx
import LeadForm from './LeadForm'

export default function CTASection() {
  return (
    <section
      style={{
        background: 'var(--bg-dark)',
        paddingTop: 'var(--section-gap)',
      }}
      id="contact"
    >
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 80px)',
          textAlign: 'center',
          marginBottom: 'clamp(40px, 6vw, 72px)',
        }}
      >
        <span className="eyebrow">Free · No Obligation · No Pressure</span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: 'var(--text-light)',
          }}
        >
          Ready to{' '}
          <span style={{ color: 'var(--blue)' }}>Sell?</span>
        </h2>
      </div>
      <LeadForm />
    </section>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -20
```

Expected: No errors from CTASection or LeadForm.

- [ ] **Step 3: Commit**

```bash
git add components/CTASection.tsx
git commit -m "feat: create CTASection wrapper with blue heading + embedded LeadForm"
```

---

## Task 10: LeadForm — Reskin

**Files:**
- Modify: `components/LeadForm.tsx`

The form logic, API call, field structure, and success/error states are **untouched**. Only visual tokens change.

- [ ] **Step 1: Remove the outer `<section id="contact">` wrapper**

`CTASection` now provides the `id="contact"` and section background. `LeadForm` becomes a pure form component. Remove:
```tsx
<section id="contact" style={{ background: 'var(--bg-dark)', padding: '...' }}>
  ...
</section>
```

- [ ] **Step 2: Remove the left-panel copy block**

The existing LeadForm is a 2-column grid: left panel (Image, heading, contact info) + right panel (form). Remove the entire left column div — everything from `{/* Left: copy */}` through the closing `</div>` of the contact info block. Keep only the right panel (the form card div).

Change the outer grid container from `gridTemplateColumns: '1fr 1.3fr'` to a single centered column:
```tsx
style={{
  maxWidth: 640,
  margin: '0 auto',
  padding: 'clamp(0px, 4vw, 40px) clamp(24px, 6vw, 80px) var(--section-gap)',
}}
```
Remove the `className="contact-layout"` and its associated `@media` style since the 2-col layout is gone.

- [ ] **Step 2: Swap gold tokens → blue throughout**

Find and replace all occurrences:
- `var(--gold)` → `var(--blue)`
- `var(--gold-light)` → `var(--blue-light)`
- `var(--gold-border)` → `var(--blue-border)`
- `var(--gold-border-md)` → `var(--blue-border-md)`
- `rgba(201,168,76,0.25)` → `rgba(43,91,168,0.25)`
- `rgba(201,168,76,0.15)` → `rgba(43,91,168,0.15)`
- `rgba(201,168,76,0.6)` → `rgba(43,91,168,0.6)`
- `#0A1A0C` (old green used as button text color) → `#ffffff`

- [ ] **Step 3: Update font references**

- `var(--font-display)` (used in the success state h3) → remains `var(--font-display)` (now maps to Jakarta Sans — but remove `fontStyle: 'italic'` since Jakarta Sans italic is not dramatic)
- The success checkmark `◆` icon: change color from gold → blue

- [ ] **Step 4: Update select option background**

```tsx
<option key={s} value={s} style={{ background: '#111111' }}>
```
(was `#0A1A0C` forest green)

- [ ] **Step 5: Update the `handleFocus` / `handleBlur` border colors**

```tsx
const handleFocus = (e) => {
  e.currentTarget.style.borderColor = 'var(--blue)'
}
const handleBlur = (e) => {
  e.currentTarget.style.borderColor = 'rgba(43,91,168,0.25)'
}
```

- [ ] **Step 6: Update input base style**

```tsx
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(43,91,168,0.25)',
  borderRadius: 2,
  color: 'var(--text-light)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s',
}
```

- [ ] **Step 7: Check form in browser** — Fill in a field, focus should show blue border. Form card should have blue border accent. Submit button should be blue.

- [ ] **Step 8: Commit**

```bash
git add components/LeadForm.tsx
git commit -m "feat: reskin LeadForm gold→blue, remove section wrapper (now in CTASection)"
```

---

## Task 11: Footer — Rewrite

**Files:**
- Rewrite: `components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--bg-footer)',
        borderTop: '1px solid rgba(248,244,238,0.06)',
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'start',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: 'var(--text-light)',
              marginBottom: 12,
              letterSpacing: 0,
            }}
          >
            Magnolia
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 300,
            }}
          >
            We buy houses across the USA for cash — any condition, any situation, any timeline.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'flex-end' }} className="footer-links">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                marginBottom: 16,
              }}
            >
              Navigate
            </div>
            {['How It Works', 'Why Us', 'FAQ', 'Get Offer'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--text-subtle)',
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <a
              href="tel:+18880000000"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              (888) 000-0000
            </a>
            <a
              href="mailto:info@magnoliahomebuyers.com"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              info@magnoliahomebuyers.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: '32px auto 0',
          paddingTop: 24,
          borderTop: '1px solid rgba(248,244,238,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
        className="footer-bottom"
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--text-subtle)',
          }}
        >
          © {year} Magnolia Home Buyers LLC. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--text-subtle)',
          }}
        >
          We are not real estate agents · Cash offers only
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-links { justify-content: flex-start !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  )
}
```

- [ ] **Step 2: Check in browser** — Near-black footer, cream text, blue hover on links, dynamic year.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: rewrite Footer minimal near-black, cream+blue, dynamic year"
```

---

## Task 12: Final Build Verification

- [ ] **Step 1: Full production build**

```bash
cd C:/Users/Cal/magnolia-home-buyers && npm run build
```

Expected: ✓ Compiled successfully. Zero type errors. Zero missing imports.

- [ ] **Step 2: Visual check checklist**

Open `http://localhost:3000` and verify:
- [ ] Nav: transparent on load, blurs on scroll, blue "Get Offer" button
- [ ] Hero: dark bg, weight-contrast headline (light 300 → bold 800), "Fast. Cash." in blue, hero.jpg right panel visible on desktop, hidden on mobile
- [ ] How It Works: cream bg, blue step numbers, dark text
- [ ] Why Magnolia: dark bg, 2×2 grid, blue hover left-border
- [ ] Testimonials: cream bg, blue quote mark and dots, dark text
- [ ] FAQ: dark bg, blue expand indicator
- [ ] CTA/Contact: dark bg, "Ready to Sell?" with blue accent, form below
- [ ] Footer: near-black, cream muted text, blue hover on links
- [ ] Film grain visible subtly over all sections
- [ ] No gold/green anywhere on the page
- [ ] No Cormorant Garamond italic (all Plus Jakarta Sans)

- [ ] **Step 3: Mobile check** (devtools 375px)

- Hero collapses to text-only (image hidden)
- All sections stack to single column correctly
- Nav shows only "Get Offer" button

- [ ] **Step 4: Final commit + push**

```bash
git add -A
git commit -m "feat: Magnolia full revamp complete — cream+blue, Plus Jakarta Sans, editorial layout"
git push
```

---

## Notes

- The existing Resend API route at `app/api/contact/` is **not modified**. Form submission backend works as-is.
- `components/Logo.tsx` is not used by any remaining component — can be deleted in cleanup, but not blocking.
- The `magnolia.svg` in the LeadForm left panel is kept as-is (it's a neutral SVG, not green).
- If `hero.jpg` doesn't render (wrong dimensions, CORS, etc.) the `imgError` state hides the panel gracefully — the hero still works text-only.
