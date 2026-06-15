'use client'
import Image from 'next/image'
import type { Dictionary } from '@/types/dictionary'

interface HeroProps {
  lang?: string
  dict?: Dictionary
}

export default function Hero({ lang = 'en', dict }: HeroProps) {
  const isRTL = lang === 'ar'
  const waitlistUrl = 'https://chat.whatsapp.com/Ea023Ghn0PJ27Ijs6Fp?mode=wwt'

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[--color-bg] via-[#F6F3EC] to-[--color-surface] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,119,87,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(217,119,87,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
        <div
          className={`animate-fade-in grid items-center gap-10 lg:grid-cols-2 ${isRTL ? 'lg:flex-row-reverse' : ''}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className={`space-y-6 ${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}>
            <h1
              className={`text-[clamp(1.75rem,3.2vw,3rem)] leading-tight font-bold tracking-tight text-[--color-text] dark:text-white ${isRTL ? 'font-arabic' : ''}`}
            >
              {dict?.hero?.tagline || 'Learn your Deen, one swipe at a time'}
            </h1>

            <p
              className={`text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}
            >
              {dict?.hero?.subtitle ||
                'DeenUp turns the endless scroll into something that actually matters. Swipe through short, scholar-approved Islamic lessons, take quick quizzes, and build a daily streak — the fun, effortless way to grow your knowledge of Islam, a little every day.'}
            </p>

            <div className={`flex flex-col gap-4 pt-2 ${isRTL ? 'items-end' : 'items-start'}`}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waitlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-2xl bg-[var(--color-accent-500)] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[var(--color-accent-600)] ${isRTL ? 'font-arabic' : ''}`}
                >
                  {dict?.hero?.ctaPrimary || 'Join Waitlist'}
                </a>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border border-[--color-accent-200] bg-[--color-accent-100] px-4 py-2 text-sm font-semibold text-[--color-accent-700] dark:border-[--color-accent-800] dark:bg-[--color-accent-900] dark:text-[--color-accent-300] ${isRTL ? 'font-arabic' : ''}`}
                >
                  {dict?.cta?.badge || 'Coming Soon to iOS & Android'}
                </span>
              </div>
              <span
                className={`text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'font-arabic' : ''}`}
              >
                {dict?.hero?.appStatus || 'Join our WhatsApp community'}
              </span>
            </div>
          </div>

          <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl">
              <Image
                src="/static/images/app_hero.webp"
                alt="DeenUp app — a swipeable feed of bite-sized, scholar-approved Islamic lessons"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 90vw, 520px"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
    </section>
  )
}
