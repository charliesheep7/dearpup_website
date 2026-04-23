'use client'
import Image from 'next/image'
import type { Dictionary } from '@/types/dictionary'

interface HeroProps {
  lang?: string
  dict?: Dictionary
}

export default function Hero({ lang = 'en', dict }: HeroProps) {
  const isRTL = lang === 'ar'
  const appStoreUrl = 'https://apps.apple.com/tn/app/deen-back-daily-dua-dhikr/id6755876142'
  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.tahirapp.development&referrer=utm_source%3Dwebsite%26utm_medium%3Dorganic%26utm_campaign%3Dofficial_site%26utm_content%3Ddownload_button'

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
              {dict?.hero?.tagline || 'Overcome Your Nafs. Return to Allah.'}
            </h1>

            <p
              className={`text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300 ${isRTL ? 'font-arabic' : ''}`}
            >
              {dict?.hero?.subtitle ||
                "Deen Back helps Muslims break free from haram habits through Qur'an SOS, daily dhikr, and a faith-centered community."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-200 hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/images/apple-app-store-badge.svg"
                  alt="Download on the App Store"
                  style={{ width: 'auto', height: '72px' }}
                />
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform duration-200 hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/static/images/google-play-badge.png"
                  alt="Get it on Google Play"
                  style={{ width: 'auto', height: '105px' }}
                />
              </a>
            </div>
          </div>

          <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl">
              <Image
                src="/static/images/app_hero.webp"
                alt="Deen Back App – Overcome Your Nafs"
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
