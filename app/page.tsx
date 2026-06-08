import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import MediaTicker from '@/components/landing/MediaTicker'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import { genPageMetadata, buildLanguageAlternates } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'DeenUp — Learn Islam, One Swipe at a Time',
  description:
    'DeenUp turns doom-scrolling into learning — a fun, swipeable feed of bite-sized, scholar-approved Islamic knowledge. Build a daily habit and grow your Deen.',
  alternates: buildLanguageAlternates('/'),
})

export default async function Page() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <CTA />
      <MediaTicker />
      <Testimonials />
      <FAQ />
    </div>
  )
}
