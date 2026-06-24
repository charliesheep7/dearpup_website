import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import CTA from '@/components/landing/CTA'
import MediaTicker from '@/components/landing/MediaTicker'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import { buildLanguageAlternates, genPageMetadata } from 'app/seo'

export function generateStaticParams() {
  return [{ lang: 'ar' }]
}

export default function LangHome() {
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

export const metadata = genPageMetadata({
  title: 'ديّن أب — تعلّم دينك مع كل تمريرة',
  description:
    'يحوّل ديّن أب التصفح بلا فائدة إلى تعلّم — موجز قصير وممتع من المعرفة الإسلامية الموثوقة المعتمدة من العلماء. ابنِ عادة يومية ونمِّ دينك.',
  alternates: buildLanguageAlternates('/', { currentLanguage: 'ar' }),
})
