'use client'

import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  dark?: boolean
  size?: number
}

export default function Logo({ dark = false, size = 32 }: LogoProps) {
  return (
    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <Image
        src="/images/magnolia.svg"
        alt="Magnolia blossom"
        width={size}
        height={size}
        style={{ flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: size * 0.72,
            color: dark ? 'var(--text-dark)' : 'var(--text-light)',
          }}
        >
          Magnolia
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: size * 0.275,
            letterSpacing: '0.24em',
            color: dark ? 'var(--text-dark-muted)' : 'var(--text-warm)',
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          Home Buyers
        </span>
      </div>
    </Link>
  )
}
