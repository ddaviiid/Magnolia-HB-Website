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
        height: 76,
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
          fontSize: '1.25rem',
          color: 'var(--text-light)',
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
          fontSize: '0.92rem',
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
            padding: '9px 22px',
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
