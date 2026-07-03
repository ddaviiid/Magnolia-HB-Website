'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [hidden, setHidden] = useState(true)
  // Tone of whatever section is currently scrolled behind the nav.
  // 'dark' = dark background → nav renders light text.
  // 'light' = light background → nav renders dark text.
  const [tone, setTone] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const onScroll = () => {
      // Hidden at the very top / on load. Once scrolling starts, reveal
      // the nav and keep it fixed in place — no more hiding on scroll.
      if (window.scrollY > 0) {
        setHidden(false)
      } else {
        setHidden(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const navHeight = 76
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'))
    if (sections.length === 0) return

    // Create a thin observation band right at the bottom edge of the nav.
    // Whichever section is crossing that line is what's actually behind
    // the nav bar, so we adopt its declared tone.
    const bottomMargin = Math.max(window.innerHeight - navHeight - 1, 0)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const value = entry.target.getAttribute('data-nav-theme')
            if (value === 'dark' || value === 'light') {
              setTone(value)
            }
          }
        })
      },
      {
        rootMargin: `-${navHeight}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const textColor = tone === 'light' ? 'var(--text-dark)' : 'var(--text-light)'
  const mutedColor = tone === 'light' ? 'var(--text-dark-muted)' : 'var(--text-muted)'

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
        background: 'transparent',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid transparent',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.35s ease, color 0.25s ease',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: textColor,
          transition: 'color 0.25s ease',
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
          color: mutedColor,
          transition: 'color 0.25s ease',
        }}
      >
        <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = textColor)}
          onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}>
          How It Works
        </a>
        <a href="#why-magnolia" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = textColor)}
          onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}>
          Why Us
        </a>
        <a href="#faq" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = textColor)}
          onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}>
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
