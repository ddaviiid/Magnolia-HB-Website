'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  // Tone of whatever section is currently scrolled behind the nav.
  // 'dark' = dark background → nav renders light text.
  // 'light' = light background → nav renders dark text.
  const [tone, setTone] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const navHeight = 76
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'))
    if (sections.length === 0) return

    let observer: IntersectionObserver | null = null

    // Create a thin observation band right at the bottom edge of the nav.
    // Whichever section is crossing that line is what's actually behind
    // the nav bar, so we adopt its declared tone. Rebuilt whenever the
    // viewport size changes (mobile browsers resize innerHeight when the
    // address bar collapses/expands, orientation changes, etc.) so the
    // band never goes stale.
    const buildObserver = () => {
      observer?.disconnect()
      const bottomMargin = Math.max(window.innerHeight - navHeight - 1, 0)
      observer = new IntersectionObserver(
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
      sections.forEach((section) => observer!.observe(section))
    }

    buildObserver()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(buildObserver, 150)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      clearTimeout(resizeTimer)
      observer?.disconnect()
    }
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
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        background: 'transparent',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid transparent',
        transition: 'color 0.25s ease',
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
        <a href="#how-it-works" className="nav-link">
          How It Works
        </a>
        <a href="#why-magnolia" className="nav-link">
          Why Us
        </a>
        <a href="#faq" className="nav-link">
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
        .nav-link {
          color: inherit;
          text-decoration: none;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .nav-link:hover {
          opacity: 0.65;
        }
        @media (max-width: 640px) {
          .nav-links a:not(:last-child) { display: none; }
        }
      `}</style>
    </nav>
  )
}
