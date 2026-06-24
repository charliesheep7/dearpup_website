'use client'

import Image from 'next/image'

export default function Hero() {
  const appStoreUrl = 'https://apps.apple.com/app/dearpup'

  return (
    <section className="relative overflow-hidden bg-[--color-bg]">
      {/* Subtle warm glow — one, not three */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_60%_-10%,rgba(251,191,36,0.12),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-10 lg:pt-32 lg:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="max-w-xl space-y-8">
            <p className="text-sm font-semibold tracking-widest text-[--color-accent-600] uppercase">
              Available on iOS
            </p>

            <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[1.1] tracking-tight text-[--color-text] dark:text-white">
              Give your dog
              <br />
              <em className="text-[--color-accent-600] not-italic">more good years.</em>
            </h1>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              DearPup turns small daily habits into a longer, healthier life — built around your
              dog's breed, age, and lifestyle. Not generic advice.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[--color-text] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg dark:bg-white dark:text-[--color-text]"
              >
                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on App Store
              </a>
              <span className="text-sm text-gray-400 dark:text-gray-500">Free to download</span>
            </div>

            {/* Stats — minimal, left-aligned */}
            <div className="flex items-center gap-8 border-t border-gray-100 pt-6 dark:border-gray-800">
              <div>
                <div className="font-serif text-2xl text-[--color-accent-600]">A–F</div>
                <div className="mt-0.5 text-xs text-gray-400">Food grades</div>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
              <div>
                <div className="font-serif text-2xl text-[--color-accent-600]">+2.3 yrs</div>
                <div className="mt-0.5 text-xs text-gray-400">Avg. lifespan gain</div>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
              <div>
                <div className="font-serif text-2xl text-[--color-accent-600]">5 min</div>
                <div className="mt-0.5 text-xs text-gray-400">Daily loop</div>
              </div>
            </div>
          </div>

          {/* Right: floating app UI cards */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Card 1 — Food scan result */}
              <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
                <div className="mb-3 flex items-center gap-2">
                  <Image
                    src="/static/images/logo.webp"
                    alt="DearPup"
                    width={28}
                    height={28}
                    className="rounded-lg"
                  />
                  <span className="text-xs font-semibold text-gray-500">Food Scanner</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950">
                    <span className="font-serif text-3xl font-bold text-emerald-600">A</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Royal Canin Adult
                    </div>
                    <div className="mt-0.5 text-sm text-emerald-600">
                      Safe · High quality protein
                    </div>
                    <div className="mt-1.5 flex gap-1.5">
                      {['Protein 26%', 'Fat 16%', 'Fiber 3%'].map((m) => (
                        <span
                          key={m}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Health score, offset down-right */}
              <div className="absolute -right-4 -bottom-10 w-52 rounded-2xl bg-[--color-accent-500] p-4 text-white shadow-xl lg:-right-8">
                <div className="mb-1 text-xs font-semibold opacity-80">Health Score</div>
                <div className="flex items-end gap-2">
                  <span className="font-serif text-4xl font-bold">84</span>
                  <span className="mb-1 text-sm opacity-70">/ 100</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/30">
                  <div className="h-full w-[84%] rounded-full bg-white" />
                </div>
                <div className="mt-2 text-xs opacity-70">↑ 6 pts this week</div>
              </div>

              {/* Card 3 — Daily loop, offset top-right */}
              <div className="absolute -top-8 -right-4 w-44 rounded-2xl bg-white p-3.5 shadow-lg ring-1 ring-black/5 lg:-right-8 dark:bg-gray-900 dark:ring-white/10">
                <div className="mb-2 text-xs font-semibold text-gray-500">Today's Loop</div>
                <div className="space-y-1.5">
                  {[
                    { emoji: '🐾', label: 'Movement', done: true },
                    { emoji: '🎾', label: 'Play', done: true },
                    { emoji: '🧠', label: 'Training', done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] ${item.done ? 'bg-emerald-500 text-white' : 'border border-gray-200 dark:border-gray-700'}`}
                      >
                        {item.done ? '✓' : ''}
                      </div>
                      <span
                        className={`text-xs ${item.done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {item.emoji} {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
    </section>
  )
}
