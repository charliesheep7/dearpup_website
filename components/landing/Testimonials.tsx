'use client'

import clsx from 'clsx'
import { Sparkles, Flame, ChevronDown, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { Dictionary } from '@/types/dictionary'

interface TestimonialsProps {
  lang?: string
  dict?: Dictionary
}

const testimonials = [
  {
    category: 'Spiritual Growth',
    icon: Sparkles,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    name: 'Aisha M.',
    title: 'New Revert',
    quote:
      'As a revert, DeenUp taught me the basics one short lesson at a time. It never felt overwhelming.',
    fullStory:
      "When I embraced Islam I didn't know where to start, and most resources felt intimidating. DeenUp broke everything into small, swipeable lessons I could finish in a minute. Little by little I learned how to pray, the meaning of verses, and the stories of the Prophets. The quizzes helped it stick, and the daily streak kept me coming back. For the first time, learning my Deen felt doable.",
  },
  {
    category: 'Daily Habit',
    icon: Flame,
    iconColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    name: 'Omar K.',
    title: 'Working Professional',
    quote:
      'I traded doom-scrolling for DeenUp. Now my spare minutes actually grow my Deen — 60-day streak and counting.',
    fullStory:
      "I used to open TikTok the moment I had a free minute and lose an hour without noticing. Now I open DeenUp instead. The feed is just as easy to scroll, but every lesson teaches me something real. Building a streak made it addictive in the best way, and after two months I've learned more than I did in years. It completely changed my screen time.",
  },
  {
    category: 'Fun Learning',
    icon: ShieldCheck,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    name: 'Fatima S.',
    title: 'University Student',
    quote:
      "It's like Duolingo for Islam — the quizzes and levels make learning genuinely fun.",
    fullStory:
      "I always wanted to learn more about my religion but textbooks put me to sleep. DeenUp turned it into a game — short lessons, quick quizzes, levels to unlock, and a streak I don't want to break. Between classes I'll do a few lessons without even thinking of it as studying. I've learned so much and it never feels like a chore.",
  },
]

export default function Testimonials({ lang = 'en', dict }: TestimonialsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-b from-white to-[--color-bg] py-20 sm:py-28 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            className={`mb-4 text-3xl font-bold text-[--color-text] sm:text-4xl lg:text-5xl dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.testimonials?.heading || 'Stories from the Ummah'}
          </h2>
          <p
            className={`mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300 ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.testimonials?.subtitle ||
              'See how DeenUp is helping Muslims learn and grow every day'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const Icon = testimonial.icon
            const isExpanded = expandedIndex === index

            return (
              <div
                key={index}
                className={clsx(
                  'group relative rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl',
                  testimonial.borderColor,
                  testimonial.bgColor,
                  isExpanded && ['ring-2', 'shadow-2xl', 'ring-[--color-accent-500]']
                )}
              >
                {/* Icon and category badge */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${testimonial.bgColor} border ${testimonial.borderColor}`}
                  >
                    <Icon className={`h-5 w-5 ${testimonial.iconColor}`} />
                  </div>
                  <span
                    className={`text-sm font-semibold ${testimonial.iconColor} tracking-wide uppercase`}
                  >
                    {testimonial.category}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="mb-4">
                  <p className="leading-relaxed text-gray-700 italic dark:text-gray-200">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Expanded story */}
                {isExpanded && (
                  <div className="animate-fade-in mb-4 rounded-lg border border-gray-200 bg-white/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {testimonial.fullStory}
                    </p>
                  </div>
                )}

                {/* Author info */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div>
                    <p className="font-semibold text-[--color-text] dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>

                {/* Read more button */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[--color-accent-600] transition-all duration-200 hover:border-[--color-accent-300] hover:bg-[--color-surface] dark:border-gray-700 dark:bg-gray-800 dark:text-[--color-accent-400] dark:hover:border-[--color-accent-700] dark:hover:bg-gray-700 ${lang === 'ar' ? 'font-arabic' : ''}`}
                >
                  {isExpanded
                    ? dict?.testimonials?.showLess || 'Show less'
                    : dict?.testimonials?.readMore || 'Read full story'}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
