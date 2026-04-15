'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Tell Us About Your Home',
    body: 'Call, text, or fill out our quick form. Share your property address and situation — takes less than 5 minutes. No obligation whatsoever.',
  },
  {
    number: '02',
    title: 'Get Your Cash Offer',
    body: "We assess your property and present a fair, no-obligation cash offer within 24 hours. No lowballing, no surprise deductions — just a straightforward number.",
  },
  {
    number: '03',
    title: 'Close On Your Timeline',
    body: 'You pick the closing date. We handle all the paperwork. You get paid. Done in as few as 7 days — or whenever works for you.',
  },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] as const }}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: 'clamp(24px, 4vw, 56px)',
        padding: 'clamp(32px, 5vw, 56px) 0',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        alignItems: 'start',
      }}
      className="step-row"
    >
      {/* Number */}
      <div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(3.5rem, 6vw, 6rem)',
            color: 'var(--blue)',
            lineHeight: 1,
            display: 'block',
            opacity: 0.55,
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            color: 'var(--text-dark)',
            lineHeight: 1.1,
            marginBottom: 'clamp(12px, 2vw, 20px)',
            letterSpacing: '-0.01em',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.8,
            color: 'var(--text-dark-muted)',
            maxWidth: 600,
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: 'var(--bg-cream)',
        padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] as const }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(8px, 2vw, 16px)',
            flexWrap: 'wrap',
            gap: 20,
          }}
          className="hiw-header"
        >
          <div>
            <span className="eyebrow">Simple Process</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
              }}
            >
              Three Steps to
              <br />
              <span style={{ color: 'var(--blue)' }}>Your Cash Offer</span>
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: 'var(--blue)',
              padding: '13px 28px',
              borderRadius: 2,
              whiteSpace: 'nowrap',
              transition: 'background 0.2s',
              display: 'inline-block',
              alignSelf: 'flex-start',
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--blue)')}
          >
            Start Today
          </a>
        </motion.div>

        {/* Steps */}
        <div style={{ marginTop: 'clamp(32px, 5vw, 56px)' }}>
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.08)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .step-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .hiw-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}
