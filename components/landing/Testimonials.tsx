'use client'

import clsx from 'clsx'
import { Camera, Heart, TrendingUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    category: 'Food Safety',
    icon: Camera,
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    name: 'Jessica T.',
    title: 'Golden Retriever mom',
    quote:
      "I scanned Buddy's food and got a D grade. I had no idea. Switched brands the same week — he has so much more energy now.",
    fullStory:
      "I honestly thought I was buying good food because it looked premium. DearPup scanned it in seconds and showed me the ingredient breakdown — the first three were corn fillers. The vet note explained it clearly without any judgment. I switched to a brand that got an A, and within a month Buddy's coat was shinier and he was way more playful. I wish I'd had this years ago.",
  },
  {
    category: 'Longevity',
    icon: TrendingUp,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    name: 'Marcus R.',
    title: 'Labrador owner',
    quote:
      "Seeing '1.8 recoverable years' on the lifespan screen was the wake-up call I needed. Now I actually do the daily loop.",
    fullStory:
      "My Lab Max is 7, and when the app showed me he had a below-average health score and that better habits could reclaim nearly 2 years of his life, I just... sat with that for a minute. It wasn't guilt-trippy, it was honest data. The daily loop only takes 5 minutes and I do it while drinking my morning coffee. His vet last month said his vitals looked better than a year ago.",
  },
  {
    category: 'Daily Habits',
    icon: Heart,
    iconColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    borderColor: 'border-rose-200 dark:border-rose-800',
    name: 'Priya K.',
    title: 'Multi-dog household',
    quote:
      'Two dogs, two separate care plans — both perfectly tailored. The streak feature keeps me actually consistent.',
    fullStory:
      'I have a senior Beagle and a young Husky — completely different needs. DearPup built them each their own daily loop and the reminders are separate. The 14-day chart made me realize I was consistent Mon-Fri but dropping the ball on weekends. Small awareness, big change. 45-day streak now and both dogs are doing great.',
  },
]

export default function Testimonials() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-b from-white to-[--color-bg] py-20 sm:py-28 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[--color-text] sm:text-4xl lg:text-5xl dark:text-white">
            Stories from dog owners
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
            Real results from real people who decided to do more than just keep their dog alive
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

                <blockquote className="mb-4">
                  <p className="leading-relaxed text-gray-700 italic dark:text-gray-200">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {isExpanded && (
                  <div className="animate-fade-in mb-4 rounded-lg border border-gray-200 bg-white/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {testimonial.fullStory}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div>
                    <p className="font-semibold text-[--color-text] dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[--color-accent-600] transition-all duration-200 hover:border-[--color-accent-300] hover:bg-[--color-surface] dark:border-gray-700 dark:bg-gray-800 dark:text-[--color-accent-400] dark:hover:border-[--color-accent-700] dark:hover:bg-gray-700"
                >
                  {isExpanded ? 'Show less' : 'Read full story'}
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
