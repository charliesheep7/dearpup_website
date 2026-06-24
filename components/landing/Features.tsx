'use client'

import { Camera, Heart, TrendingUp } from 'lucide-react'

const features = [
  {
    id: 'food-scanner',
    icon: Camera,
    title: 'Scan Any Dog Food in Seconds',
    description:
      'Point your camera at any kibble bag, wet food can, or treat label. Our AI grades it A through F — with a safety rating, macro breakdown, and a plain-English vet note.',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    detail: 'Safe · Caution · Unsafe ratings',
    emoji: '📷',
  },
  {
    id: 'care-plan',
    icon: Heart,
    title: 'A Care Plan Built for Your Dog',
    description:
      "After a quick lifestyle quiz, DearPup calculates your dog's current estimated lifespan — then shows you how many years better care could add back. Your daily loop covers movement, play, training, dental, and nutrition.",
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
    iconColor: 'text-rose-600 dark:text-rose-400',
    detail: 'Personalized to breed, age & lifestyle',
    emoji: '🐾',
  },
  {
    id: 'progress',
    icon: TrendingUp,
    title: 'Track the Habits That Add Years',
    description:
      'A live Health Score, 14-day care chart, lifespan reclaim tracker, nutrition grid, and streak counter — all on one beautiful screen. Clear data, no shame.',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    detail: 'Health Score · Streaks · Lifespan',
    emoji: '📈',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Everything your dog needs to thrive
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl dark:text-gray-300">
            Built around your dog's specific breed, age, and lifestyle — not generic
            one-size-fits-all advice
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.id}
                className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50"
              >
                <div className="mb-6 flex items-start">
                  <div
                    className={`rounded-xl p-3 ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mb-5 flex-1 leading-relaxed text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    <span>{feature.emoji}</span>
                    <span>{feature.detail}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Daily loop callout */}
        <div className="mt-16 rounded-2xl border border-[--color-accent-200] bg-gradient-to-br from-[--color-accent-50] to-[--color-accent-100] p-8 sm:p-10 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-bold text-[--color-text] dark:text-white">
              Your daily 5-minute loop
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check off each one. Watch the ring fill. Come back tomorrow.
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { emoji: '🐾', label: 'Movement' },
              { emoji: '🎾', label: 'Play' },
              { emoji: '🧠', label: 'Training' },
              { emoji: '🦷', label: 'Dental' },
              { emoji: '🥗', label: 'Nutrition' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-[--color-accent-200] bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
