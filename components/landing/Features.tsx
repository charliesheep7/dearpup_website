'use client'

const features = [
  {
    number: '01',
    title: 'Scan any dog food in seconds',
    description:
      'Point your camera at any kibble bag, wet food can, or treat label. DearPup grades it A through F — with a safety rating, macro breakdown, and a plain-English vet note. No more guessing.',
    detail: 'Safe · Caution · Unsafe ratings',
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    visual: (
      <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950">
          <span className="font-serif text-2xl font-bold text-emerald-600">A</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">Orijen Senior</div>
          <div className="text-xs text-emerald-600">Safe · Excellent protein quality</div>
          <div className="mt-1 flex gap-1">
            {['38% protein', '15% fat'].map((m) => (
              <span
                key={m}
                className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'A care plan built around your dog',
    description:
      "After a quick lifestyle quiz, DearPup calculates your dog's estimated lifespan — then shows you how many years better care could add back. Your daily loop covers movement, play, training, dental, and nutrition.",
    detail: 'Personalized to breed, age & lifestyle',
    accent: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    visual: (
      <div className="space-y-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-3xl font-bold text-[--color-accent-600]">+1.8</span>
          <span className="text-sm text-gray-500">recoverable years</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-amber-400 to-amber-500" />
        </div>
        <div className="text-xs text-gray-400">Based on Bella's breed, age & current habits</div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Track the habits that add years',
    description:
      'A live Health Score, 14-day care chart, lifespan reclaim tracker, nutrition grid, and streak counter — all in one place. Clear data, no shame.',
    detail: 'Health Score · Streaks · Lifespan',
    accent: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    visual: (
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500">14-day streak</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            🔥 14
          </span>
        </div>
        <div className="flex items-end gap-1">
          {[60, 80, 70, 90, 85, 95, 88, 92, 100, 95, 88, 96, 100, 98].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-amber-400/80 dark:bg-amber-500/60"
              style={{ height: `${h * 0.36}px` }}
            />
          ))}
        </div>
      </div>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-20 max-w-xl">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[--color-accent-600] uppercase">
            Features
          </p>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-tight text-gray-900 dark:text-white">
            Everything your dog needs to thrive
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Built for your specific dog — not a generic checklist.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature) => (
            <div
              key={feature.number}
              className={`grid items-center gap-8 rounded-3xl p-8 lg:grid-cols-2 lg:p-10 ${feature.bg}`}
            >
              <div className="space-y-4">
                <div className={`font-serif text-4xl font-bold opacity-25 ${feature.accent}`}>
                  {feature.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 lg:text-2xl dark:text-white">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
                <div
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${feature.accent}`}
                >
                  <span className="h-1 w-4 rounded-full bg-current opacity-40" />
                  {feature.detail}
                </div>
              </div>
              <div>{feature.visual}</div>
            </div>
          ))}
        </div>

        {/* Daily loop strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-[--color-bg] px-8 py-6 dark:border-gray-800 dark:bg-gray-900">
          <span className="text-sm font-semibold text-gray-500">Your daily 5-minute loop:</span>
          {[
            { emoji: '🐾', label: 'Movement' },
            { emoji: '🎾', label: 'Play' },
            { emoji: '🧠', label: 'Training' },
            { emoji: '🦷', label: 'Dental' },
            { emoji: '🥗', label: 'Nutrition' },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {item.emoji} {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
