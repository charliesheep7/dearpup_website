'use client'

import { useState } from 'react'
import { Sparkles, Flame, ShieldCheck, X } from 'lucide-react'
import type { Dictionary } from '@/types/dictionary'

interface FeaturesProps {
  lang?: string
  dict?: Dictionary
}

const features = [
  {
    id: 'feed',
    icon: Sparkles,
    title: 'A Feed Worth Scrolling',
    description:
      'Swap mindless doom-scrolling for a swipeable feed of short, beautiful Islamic lessons. Every swipe teaches you something real about your Deen.',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    fullDescription:
      "DeenUp reimagines the addictive short-form feed for good. Instead of losing hours to mindless content, you scroll through bite-sized Islamic lessons — verses, hadith, stories of the Prophets, daily duas, and practical guidance — each crafted to teach you something in under a minute. It's the same effortless scrolling you already love, redirected toward knowledge that brings you closer to Allah.",
  },
  {
    id: 'learn-through-play',
    icon: Flame,
    title: 'Learn Through Play',
    description:
      'Bite-sized lessons, daily streaks, levels, and quick quizzes turn growing your Deen into a daily habit you actually keep.',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    fullDescription:
      'Think Duolingo, but for Islamic knowledge. DeenUp breaks learning into small, playful steps — finish a lesson, take a quick quiz, and watch your streak grow. Earn levels as you progress, unlock new topics, and get gentle daily reminders that keep you coming back. Building real knowledge of your Deen finally feels rewarding instead of overwhelming.',
  },
  {
    id: 'scholar-approved',
    icon: ShieldCheck,
    title: 'Scholar-Approved, Always',
    description:
      'Every lesson is rooted in the Quran and authentic Sunnah and reviewed by qualified scholars — knowledge you can trust, not algorithm guesswork.',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    fullDescription:
      "On DeenUp, every piece of content is grounded in the Quran and authentic Hadith and checked by qualified scholars before it reaches your feed. We don't let algorithms invent rulings or opinions — we use technology only to make trustworthy, well-sourced knowledge easier to learn. Whether you're a new Muslim or have studied for years, you can be confident that what you're learning is sound.",
  },
]

export default function Features({ lang = 'en', dict }: FeaturesProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const openModal = (featureId: string) => {
    setSelectedFeature(featureId)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedFeature(null)
    document.body.style.overflow = 'unset'
  }

  const activeFeature = features.find((f) => f.id === selectedFeature)

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  return (
    <>
      <section id="features" className="bg-white py-20 sm:py-28 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2
              className={`mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {dict?.features?.heading || 'Grow your Deen, one swipe at a time'}
            </h2>
            <p
              className={`mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300 ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {dict?.features?.subtitle ||
                'Bite-sized, scholar-approved Islamic learning that turns spare minutes into real knowledge'}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.id}
                  className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50"
                >
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                      {dict?.hero?.comingSoon || 'Coming Soon'}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex items-start">
                    <div
                      className={`rounded-xl p-3 ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col">
                    <h3
                      className={`mb-3 text-xl font-bold text-gray-900 dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`mb-6 flex-1 leading-relaxed text-gray-600 dark:text-gray-400 ${lang === 'ar' ? 'font-arabic' : ''}`}
                    >
                      {feature.description}
                    </p>

                    {/* Learn More Button */}
                    <button
                      onClick={() => openModal(feature.id)}
                      className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent-500)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-accent-600)] hover:shadow-lg"
                    >
                      {dict?.features?.learnMore || 'Learn More'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedFeature && activeFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Icon */}
            <div className="mb-6 flex items-center gap-4">
              <div className={`rounded-xl p-3 ${activeFeature.iconBg}`}>
                <activeFeature.icon className={`h-8 w-8 ${activeFeature.iconColor}`} />
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                {dict?.hero?.comingSoon || 'Coming Soon'}
              </span>
            </div>

            {/* Content */}
            <h3
              className={`mb-4 text-2xl font-bold text-gray-900 dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {activeFeature.title}
            </h3>
            <p
              className={`mb-6 leading-relaxed text-gray-600 dark:text-gray-400 ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {activeFeature.fullDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg bg-[var(--color-accent-500)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-accent-600)] hover:shadow-lg"
              >
                Get Started
              </button>
              <button
                onClick={closeModal}
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
