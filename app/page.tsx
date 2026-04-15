import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhyMagnolia from '@/components/WhyMagnolia'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <WhyMagnolia />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
  )
}
