import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'DearPup — Help Your Dog Live Healthier and Happier',
  description:
    "DearPup is a camera-first dog wellness app: scan your dog's food, poop, and face to turn everyday care into a simple routine, a photo journal, and a Health Score that climbs. Built around your dog's breed, age, and weight — with a daily loop across five science-backed pillars.",
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
