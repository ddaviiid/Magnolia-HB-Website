'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const situations = [
  'Facing Foreclosure',
  'Going Through Divorce',
  'Inherited a Property',
  'Need to Relocate',
  'Home Needs Repairs',
  'Problem Tenants',
  'Behind on Payments',
  'Other',
]

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

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    situation: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--blue)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(43,91,168,0.25)'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to send. Please call us directly.')
    }
  }

  return (
    <div
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '0 clamp(24px, 6vw, 80px) var(--section-gap)',
      }}
    >
      {/* Form card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--blue-border)',
          backdropFilter: 'blur(16px)',
          borderRadius: 4,
          padding: 'clamp(28px, 4vw, 48px)',
        }}
      >
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(43,91,168,0.15)',
                border: '1px solid var(--blue-border-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '1.5rem',
                color: 'var(--blue)',
              }}
            >
              ◆
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '2rem',
                marginBottom: 12,
              }}
            >
              Request Received
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}
            >
              We&apos;ll be in touch within 24 hours with your cash offer. Thank you for choosing Magnolia.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-two-col">
              <Field label="Full Name *">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                  placeholder="John Smith"
                />
              </Field>
              <Field label="Phone Number *">
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                  placeholder="(555) 000-0000"
                />
              </Field>
            </div>

            <Field label="Email Address *">
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                placeholder="john@example.com"
              />
            </Field>

            <Field label="Property Address *">
              <input
                type="text"
                required
                value={form.address}
                onChange={set('address')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                placeholder="123 Main St, City, State ZIP"
              />
            </Field>

            <Field label="Your Situation">
              <select
                value={form.situation}
                onChange={set('situation')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
              >
                <option value="">Select a situation...</option>
                {situations.map((s) => (
                  <option key={s} value={s} style={{ background: '#111111' }}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message (Optional)">
              <textarea
                value={form.message}
                onChange={set('message')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                placeholder="Tell us anything else about your property or situation..."
              />
            </Field>

            {error && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: '#E87060',
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                height: 54,
                background: status === 'loading' ? 'rgba(43,91,168,0.6)' : 'var(--blue)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                borderRadius: 2,
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading') e.currentTarget.style.background = 'var(--blue-light)'
              }}
              onMouseLeave={(e) => {
                if (status !== 'loading') e.currentTarget.style.background = 'var(--blue)'
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Request My Cash Offer'}
            </button>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}
            >
              No obligation · No fees · Response within 24 hours
            </p>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
