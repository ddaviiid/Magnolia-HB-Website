'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

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
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0, 0, 1] as const },
  }),
}

export default function Hero() {
  const [imgError, setImgError] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-dark)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 76,
      }}
    >
      {/* Full-bleed background image with parallax */}
      {!imgError && (
        <motion.div
          style={{
            position: 'absolute',
            top: -60,
            bottom: -60,
            left: 0,
            right: 0,
            y: bgY,
          }}
        >
          <Image
            src="/images/hero-neighborhood.jpg"
            alt="Drone aerial view of a sunny suburban neighborhood with houses and pools"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
            onError={() => setImgError(true)}
          />
        </motion.div>
      )}

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.52)',
        }}
      />

      {/* Gradient: darken bottom for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(17,17,17,0.85) 100%)',
        }}
      />

      {/* Copy */}
      <div
        style={{
          padding: 'clamp(48px, 8vw, 120px) clamp(24px, 5vw, 80px)',
          position: 'relative',
          zIndex: 2,
          maxWidth: 780,
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
            fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
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

      <style>{`
        @media (max-width: 768px) {
          .hero-stats { gap: 20px !important; }
        }
      `}</style>
    </section>
  )
}
