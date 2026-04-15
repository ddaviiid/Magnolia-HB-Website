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
  title: 'Magnolia Home Buyers | We Buy Houses Fast for Cash',
  description:
    'Get a fair cash offer in 24 hours. Sell your home as-is, any condition, anywhere in the USA. No fees, no repairs, close in as few as 7 days.',
  keywords:
    'cash home buyers, sell house fast, we buy houses, cash offer, sell as-is, no repairs, any condition',
  openGraph: {
    title: 'Magnolia Home Buyers | Cash Offers in 24 Hours',
    description:
      'Sell your home fast for cash. No repairs, no fees, any condition, nationwide.',
    type: 'website',
    url: 'https://magnoliahomebuyers.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
