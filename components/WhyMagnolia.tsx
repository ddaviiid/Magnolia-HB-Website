'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const reasons = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L3 11V25H11V17H17V25H25V11L14 3Z" stroke="#2B5BA8" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'No Repairs Needed',
    body: 'Sell completely as-is. No cleaning, no staging, no fixing anything. We buy homes in every condition — even fire-damaged, flood-affected, or condemned.',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#2B5BA8" strokeWidth="1.5"/>
        <path d="M10 14L12.5 17L18 11" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Zero Agent Fees',
    body: 'No commissions, no closing costs taken from your payout, no hidden fees. The offer we make is the amount you walk away with.',
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="19" rx="2" stroke="#2B5BA8" strokeWidth="1.5"/>
        <line x1="3" y1="11" x2="25" y2="11" stroke="#2B5BA8" strokeWidth="1.5"/>
        <line x1="9" y1="3" x2="9" y2="9" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="3" x2="19" y2="9" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="8" y="16" width="5" height="4" rx="1" fill="#2B5BA8" opacity="0.5"/>
      </svg>
    ),
    title: 'Close in 7–14 Days',
    body: 'You choose your closing date. We have closed in as few as 7 days. If you need more time to make arrangements, we work around your schedule.',
  },
  {
    number: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 8V18C5 22 9 25 14 27C19 25 23 22 23 18V8L14 3Z" stroke="#2B5BA8" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 14L12.5 17L18 12" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Guaranteed Cash',
    body: 'Our offers are backed by real capital — not loans that can fall through. Once we make an offer, you can count on it.',
  },
]

function ReasonRow({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: Math.floor(index / 2) * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'clamp(28px, 4vw, 44px) clamp(24px, 3vw, 36px)',
        borderTop: '1px solid rgba(248,244,238,0.07)',
        borderLeft: `3px solid ${hovered ? 'var(--blue)' : 'transparent'}`,
        transition: 'border-color 0.25s, background 0.25s',
        background: hovered ? 'rgba(43,91,168,0.06)' : 'transparent',
        cursor: 'default',
      }}
    >
      {/* Number + Icon row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: 'var(--blue)',
            opacity: 0.7,
          }}
        >
          {reason.number}
        </span>
        <div style={{ opacity: hovered ? 1 : 0.7, transition: 'opacity 0.25s' }}>
          {reason.icon}
        </div>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'clamp(1.35rem, 2.2vw, 1.9rem)',
          color: hovered ? 'var(--blue-light)' : 'var(--text-light)',
          marginBottom: 12,
          lineHeight: 1.15,
          transition: 'color 0.25s',
        }}
      >
        {reason.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '0.95rem',
          lineHeight: 1.8,
          color: 'var(--text-muted)',
        }}
      >
        {reason.body}
      </p>
    </motion.div>
  )
}

export default function WhyMagnolia() {
  return (
    <section
      id="why-magnolia"
      style={{
        background: 'var(--bg-dark)',
        padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative magnolia watermark */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 400,
          height: 400,
          opacity: 0.06,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <Image
          src="/images/magnolia.svg"
          alt=""
          fill
          style={{ objectFit: 'contain', filter: 'invert(1)' }}
        />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] as const }}
          style={{ marginBottom: 'clamp(8px, 2vw, 16px)' }}
        >
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>Our Difference</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              color: 'var(--text-light)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              maxWidth: 640,
            }}
          >
            Why Sellers
            <br />
            Choose <span style={{ color: 'var(--blue)' }}>Magnolia</span>
          </h2>
        </motion.div>

        {/* Grid of reasons */}
        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 0,
            marginTop: 'clamp(32px, 5vw, 56px)',
          }}
        >
          {reasons.map((reason, i) => (
            <div
              key={reason.number}
              style={{
                borderRight: i % 2 === 0 ? '1px solid rgba(248,244,238,0.07)' : 'none',
              }}
              className={i >= 2 ? 'reason-bottom' : ''}
            >
              <ReasonRow reason={reason} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div style={{ borderTop: '1px solid rgba(248,244,238,0.07)', marginTop: 0 }} />
      </div>

      <style>{`
        .reason-bottom { border-top: 1px solid rgba(248,244,238,0.07); }
        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-grid > div { border-right: none !important; }
          .reason-bottom { border-top: none !important; }
        }
      `}</style>
    </section>
  )
}
