'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
// useRef kept for interval; visibility now handled by whileInView
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "We inherited my grandmother's house and had no idea what to do. Magnolia gave us a fair offer within 24 hours and we closed in 10 days. They handled everything — we didn't have to lift a finger.",
    name: 'Sarah M.',
    location: 'Memphis, TN',
    situation: 'Inherited Property · Closed in 10 Days',
  },
  {
    quote: "Our home had significant water damage from a burst pipe. No traditional buyer would touch it. Magnolia made us a cash offer as-is, no repairs required. We walked away with more than we expected.",
    name: 'James & Cora T.',
    location: 'Houston, TX',
    situation: 'Damaged Home · Closed in 8 Days',
  },
  {
    quote: "Going through a divorce is hard enough. The last thing I wanted was to deal with showings, agents, and negotiations. Magnolia made the whole process painless. One offer, one close, done.",
    name: 'Patricia W.',
    location: 'Atlanta, GA',
    situation: 'Divorce Sale · Closed in 12 Days',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next])

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 6000)
  }

  const t = testimonials[current]

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--bg-cream)',
        padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blue quote mark */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(40px, 6vw, 80px)',
          left: 'clamp(24px, 6vw, 80px)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(12rem, 22vw, 24rem)',
          color: 'var(--blue)',
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
        aria-hidden
      >
        &#8220;
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] as const }}
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <span className="eyebrow">Real Stories</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
            }}
          >
            What Our Sellers Say
          </h2>
        </motion.div>

        {/* Quote */}
        <div style={{ position: 'relative', minHeight: 'clamp(200px, 25vw, 280px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.35rem, 2.8vw, 2.2rem)',
                  lineHeight: 1.55,
                  color: 'var(--text-dark)',
                  letterSpacing: '-0.005em',
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Attribution + Controls row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'clamp(28px, 4vw, 44px)',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {/* Attribution */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current + '-attr'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: 'var(--blue)',
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: 'var(--blue)',
                  }}
                >
                  {t.name}, {t.location}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dark-muted)',
                  paddingLeft: 44,
                }}
              >
                {t.situation}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { go(i); resetInterval() }}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? 'var(--blue)' : 'rgba(43,91,168,0.28)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'width 0.35s ease, background 0.35s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 8 }}>
              {([{ fn: () => { prev(); resetInterval() }, label: '←' },
                { fn: () => { next(); resetInterval() }, label: '→' }] as const).map(({ fn, label }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label === '←' ? 'Previous testimonial' : 'Next testimonial'}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    border: '1px solid rgba(43,91,168,0.3)',
                    background: 'transparent',
                    color: 'var(--blue)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(43,91,168,0.1)'
                    e.currentTarget.style.borderColor = 'rgba(43,91,168,0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(43,91,168,0.3)'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
