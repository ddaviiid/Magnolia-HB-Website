import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://magnoliahomebuyers.com'),
  title: 'Louisiana Cash Home Buyers | Sell Your House Fast | Magnolia Home Buyers',
  description:
    "Get a fair cash offer in 24 hours from Louisiana's trusted home buyers. Sell your house as-is in New Orleans, Baton Rouge, Shreveport, Lafayette, and statewide. No fees, no repairs, close in as few as 7 days.",
  keywords:
    'sell my house fast Louisiana, cash home buyers Louisiana, we buy houses New Orleans, we buy houses Baton Rouge, sell house as-is Louisiana, cash offer Louisiana, Louisiana home buyers',
  openGraph: {
    title: 'Louisiana Cash Home Buyers | Cash Offers in 24 Hours',
    description:
      'Sell your Louisiana home fast for cash. No repairs, no fees, any condition, statewide.',
    type: 'website',
    url: 'https://magnoliahomebuyers.com',
    images: [
      {
        url: '/images/hero-neighborhood.jpg',
        width: 1200,
        height: 630,
        alt: 'Magnolia Home Buyers — Louisiana cash home buyers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Louisiana Cash Home Buyers | Magnolia Home Buyers',
    description: 'Get a fair cash offer in 24 hours. Sell your Louisiana home as-is.',
    images: ['/images/hero-neighborhood.jpg'],
  },
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Magnolia Home Buyers LLC',
  url: 'https://magnoliahomebuyers.com',
  telephone: '+1-504-608-5802',
  email: 'info@magnoliahomebuyers.com',
  areaServed: {
    '@type': 'State',
    name: 'Louisiana',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'LA',
    addressCountry: 'US',
  },
  description:
    'Magnolia Home Buyers purchases houses for cash across Louisiana, offering fast, as-is home sales with no fees or repairs required.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
