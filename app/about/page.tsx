import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us | Magnolia Home Buyers',
  description:
    'Learn about Magnolia Home Buyers — who we are, why we started, and our commitment to helping homeowners sell fast with dignity.',
}

export default function AboutPage() {
  const values = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#2B5BA8" strokeWidth="1.5"/>
          <path d="M11 16L14.5 20L21 13" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Transparency',
      body: 'No hidden fees, no last-minute surprises. The offer we make is the amount you receive. Every step of the process is clear and honest.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#2B5BA8" strokeWidth="1.5"/>
          <path d="M16 10V16L20 18" stroke="#2B5BA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Speed',
      body: 'We understand that when you need to sell, time matters. We move as fast as you need us to — sometimes closing in as few as 7 days.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L4 10V22C4 27 10 30 16 32C22 30 28 27 28 22V10L16 4Z" stroke="#2B5BA8" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Respect',
      body: 'Every homeowner we work with is treated with dignity and compassion. We listen first and never pressure you into a decision.',
    },
  ]

  return (
    <main style={{ background: 'var(--bg-dark)', paddingTop: 72 }}>
      {/* Hero */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(64px, 8vw, 96px)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            opacity: 0.04,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/images/magnolia.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">Our Story</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 7vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            We Buy Homes,
            <br />
            <span style={{ color: 'var(--blue)' }}>We Help People</span>
          </h1>

          <div
            style={{
              width: 48,
              height: 1,
              background: 'var(--blue)',
              margin: '32px auto',
              opacity: 0.6,
            }}
          />
        </div>
      </section>

      {/* Story section */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '0 clamp(24px, 6vw, 80px) var(--section-gap)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
          className="about-story-grid"
        >
          {/* Photo */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: 2,
              overflow: 'hidden',
              background: 'var(--bg-card)',
            }}
          >
            <Image
              src="/images/david.jpg"
              alt="David Machado, founder of Magnolia Home Buyers"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 2,
                pointerEvents: 'none',
              }}
            />
            {/* Name tag */}
            <div
              style={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                background: 'rgba(10,26,12,0.88)',
                backdropFilter: 'blur(8px)',
                padding: '16px 20px',
                borderRadius: 2,
                borderLeft: '2px solid var(--blue)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  color: 'var(--text-warm)',
                  marginBottom: 2,
                }}
              >
                David Machado
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--blue)',
                }}
              >
                Founder, Magnolia Home Buyers LLC
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="eyebrow">Our Founder</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                lineHeight: 1.05,
                marginBottom: 28,
                letterSpacing: '-0.01em',
              }}
            >
              Built on the belief that selling a home should never be a burden.
            </h2>

            {[
              "David Machado founded Magnolia Home Buyers after watching family members struggle through the traditional real estate process during one of the hardest periods of their lives. Long listing times, endless showings, repair demands, and deals falling through at the last minute — it didn't have to be this way.",
              "Magnolia was built to be different. We offer homeowners a dignified, straightforward path forward — a fair cash offer, a simple process, and a team that genuinely cares about the outcome. We don't just buy houses. We help families move on.",
              "Today, Magnolia operates nationwide, having helped hundreds of homeowners sell their properties quickly and on their own terms. Every transaction is handled with the same care and respect David believed every seller deserved from day one.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '1rem',
                  lineHeight: 1.85,
                  color: 'var(--text-muted)',
                  marginBottom: 20,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission pull-quote — cream */}
      <section
        style={{
          background: 'var(--bg-cream)',
          padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span className="eyebrow" style={{ color: 'var(--blue)' }}>Our Mission</span>
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              color: 'var(--text-dark)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: 24,
            }}
          >
            &ldquo;We believe every homeowner deserves a dignified, honest exit — on their terms.&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '0.85rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--blue)',
            }}
          >
            — David Machado, Founder
          </p>
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: 'var(--section-gap) clamp(24px, 6vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <span className="eyebrow">What We Stand For</span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
              }}
            >
              Our Values
            </h2>
          </div>

          <div
            className="values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'var(--bg-card)',
                  padding: 'clamp(28px, 4vw, 44px)',
                  borderTop: '2px solid var(--gold-border)',
                  borderRadius: 2,
                }}
              >
                <div style={{ marginBottom: 20 }}>{v.icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                    marginBottom: 12,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    color: 'var(--text-muted)',
                  }}
                >
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: 'clamp(64px, 8vw, 96px) clamp(24px, 6vw, 80px)',
          textAlign: 'center',
          borderTop: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Ready to see what your home is worth?
        </h2>
        <a href="/#contact" className="about-cta-btn">
          Get Your Free Cash Offer
        </a>
      </section>

      <style>{`
        .about-cta-btn {
          display: inline-block;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--bg-dark);
          background: var(--blue);
          padding: 16px 44px;
          border-radius: 2px;
          transition: background 0.2s;
          text-decoration: none;
        }
        .about-cta-btn:hover { background: var(--gold-light); }
        @media (max-width: 768px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
