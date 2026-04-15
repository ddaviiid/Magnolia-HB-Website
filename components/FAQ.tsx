'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'How do you determine your cash offer price?',
    a: 'We consider the property\'s location, condition, size, and recent comparable sales in the area. We aim to make a fair offer that works for both parties — not the lowest possible number. Our goal is a win-win outcome.',
  },
  {
    q: 'Do I need to make repairs before selling?',
    a: 'Absolutely not. We buy homes in any condition — damaged, outdated, cluttered, or move-in ready. You don\'t need to repair, clean, or stage anything. Sell it exactly as it is.',
  },
  {
    q: 'Are there any fees or commissions?',
    a: 'None. Zero. We don\'t charge agent commissions, closing costs, or hidden fees. The offer price we present is the amount you receive at closing.',
  },
  {
    q: 'How quickly can we close?',
    a: 'We can typically close in as few as 7 days. However, we work around your timeline — if you need more time to move or make arrangements, we accommodate that too.',
  },
  {
    q: 'What types of properties do you buy?',
    a: 'We buy single-family homes, condos, townhouses, multi-family properties, land, and commercial buildings. Occupied or vacant, any age, any condition.',
  },
  {
    q: 'Is the cash offer binding or can it change?',
    a: 'We do a thorough assessment before making an offer, so we stand behind our number. In rare cases where a property inspection reveals something significantly different from what was described, we may adjust — but we\'ll always communicate transparently.',
  },
  {
    q: 'What if my home has liens or back taxes?',
    a: 'We can often work with properties that have liens, back taxes, or other encumbrances. Our team has experience navigating these situations. Tell us your full situation and we\'ll explore solutions.',
  },
  {
    q: 'Do you buy homes in my state?',
    a: 'Yes — we operate nationwide across all 50 states. Whether you\'re in Louisiana, Texas, Florida, California, or anywhere in between, we can help.',
  },
]

function FAQItem({ faq, isOpen, onToggle, isLast, index }: {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -24, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
      style={{
        borderTop: '1px solid rgba(248,244,238,0.07)',
        borderBottom: isLast ? '1px solid rgba(248,244,238,0.07)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: 'clamp(16px, 2.5vw, 24px) 0',
          background: hovered ? 'rgba(43,91,168,0.08)' : 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: isOpen ? 'var(--blue)' : 'var(--text-light)',
            transition: 'color 0.2s',
            lineHeight: 1.2,
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            color: 'var(--blue)',
            fontSize: '1.2rem',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" as const }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.95rem',
                lineHeight: 1.8,
                color: 'var(--text-muted)',
                paddingBottom: 'clamp(16px, 2.5vw, 24px)',
                maxWidth: 700,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      style={{
        background: 'var(--bg-dark)',
        padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] as const }}
          style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>Questions</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              color: 'var(--text-light)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
            }}
          >
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ items */}
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.q}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            isLast={i === faqs.length - 1}
          />
        ))}

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}
          >
            Have a question we didn&apos;t answer?
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              background: 'var(--blue)',
              padding: '13px 32px',
              borderRadius: 2,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--blue-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--blue)')}
          >
            Ask Us Anything
          </a>
        </div>
      </div>
    </section>
  )
}
