import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'DearPup — Give Your Dog More Good Years',
  description:
    "DearPup is the daily care companion that turns small habits into a longer, healthier life for your dog. AI food scanner, personalized care plans, and lifespan tracking — built for your dog's breed, age, and lifestyle.",
})

export default async function Page() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <CTA />
      <Testimonials />
      <FAQ />
    </div>
  )
}
