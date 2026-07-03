'use client'

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
              fontSize: '20.6px',
              color: 'var(--text-light)',
              marginBottom: 12,
            }}
          >
            Magnolia
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16.12px',
              fontWeight: 300,
              color: 'var(--text-light)',
              lineHeight: 1.7,
              maxWidth: 300,
            }}
          >
            We buy houses across Louisiana for cash — any condition, any situation, any timeline.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'flex-end' }} className="footer-links">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.92px',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
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
                  fontSize: '16.6px',
                  fontWeight: 400,
                  color: 'var(--text-light)',
                  textDecoration: 'none',
                  marginBottom: 10,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-light)')}
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.92px',
                fontWeight: 700,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <a
              href="tel:+15046085802"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '16.6px',
                color: 'var(--text-light)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-light)')}
            >
              (504) 608-5802
            </a>
            <a
              href="mailto:david@magnoliahomebuyersusa.com"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '16.6px',
                color: 'var(--text-light)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-light)')}
            >
              david@magnoliahomebuyersusa.com
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
          textAlign: 'center',
        }}
        className="footer-bottom"
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14.52px',
            color: 'var(--text-light)',
          }}
        >
          © {year} Magnolia Home Buyers LLC. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-links { justify-content: flex-start !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}
