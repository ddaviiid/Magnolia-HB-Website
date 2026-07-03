'use client'

import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const heroHeight = window.innerHeight

      setScrolled(currentY > 40)

      if (currentY < heroHeight) {
        // Still within the hero section — always show the nav
        setHidden(false)
      } else {
        const delta = currentY - lastScrollY.current
        if (delta > 5) {
          // Scrolling down past the hero — hide the nav
          setHidden(true)
        } else if (delta < -5) {
          // Scrolling up — reveal the nav
          setHidden(false)
        }
      }

      lastScrollY.current = currentY
    }

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
        background: scrolled ? 'rgba(17,17,17,0.92)' : 'rgba(10,10,10,0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(248,244,238,0.06)' : '1px solid transparent',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s, transform 0.35s ease',
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
