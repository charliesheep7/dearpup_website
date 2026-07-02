'use client'

import Image from 'next/image'

const APP_STORE_URL = 'https://apps.apple.com/us/app/dearpup-daily-dog-care/id6783599461'

export default function Hero() {
  return (
    <section className="bg-cream relative overflow-hidden">
      {/* One soft spruce wash — no rainbow blobs. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_-10%,rgba(15,74,60,0.07),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 lg:px-8 lg:pt-28 lg:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="animate-fade-in inline-flex items-center gap-2.5">
              <span className="bg-spruce-200 h-px w-7" />
              <span className="eyebrow">Daily care companion · iOS</span>
            </div>

            <h1
              className="text-hero animate-fade-in animation-delay-100 text-ink mt-6"
              style={{ opacity: 0 }}
            >
              Help your dog live
              <br />
              <span className="text-spruce">healthier and happier.</span>
            </h1>

            <p
              className="animate-fade-in animation-delay-200 text-ink-2 mt-6 max-w-lg text-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              Point your camera at his food, his poop, even his face. DearPup turns what you already
              do every day into a care routine, a photo journal, and a Health Score that climbs as
              you show up.
            </p>

            <div
              className="animate-fade-in animation-delay-300 mt-9 flex flex-col gap-4"
              style={{ opacity: 0 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-spruce hover:bg-spruce-700 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200"
                >
                  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
                <a
                  href="#features"
                  className="border-line text-ink-2 hover:border-spruce-200 hover:text-spruce inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-colors duration-200"
                >
                  See how it works
                </a>
              </div>
              <span className="text-ink-faint text-xs tracking-wide">
                Free to download · No ads · Private by design
              </span>
            </div>

            {/* Stats — JetBrains mono, single spruce tone. */}
            <div className="border-line mt-10 flex items-center gap-7 border-t pt-7">
              {[
                { value: 'A–F', label: 'Food grades' },
                { value: '0–100', label: 'Health Score' },
                { value: '5', label: 'Care pillars' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-7">
                  {i > 0 && <span className="bg-line h-8 w-px" />}
                  <div>
                    <div className="text-spruce font-mono text-xl font-medium">{stat.value}</div>
                    <div className="text-ink-dim mt-1 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating app UI cards — staggered stack, one spruce accent. */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-fade-in animation-delay-200 relative w-full max-w-sm pt-10">
              {/* Card 3 — Daily loop, peeking top-right */}
              <div className="bg-paper ring-line absolute top-0 right-0 z-20 w-44 rounded-2xl p-4 shadow-[0_18px_40px_-18px_rgba(15,74,60,0.3)] ring-1 lg:-right-6">
                <div className="text-ink-dim mb-2.5 text-xs font-semibold tracking-wide uppercase">
                  Today's Loop
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Movement', done: true },
                    { label: 'Nutrition', done: true },
                    { label: 'Mind & play', done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] ${
                          item.done ? 'bg-spruce text-white' : 'border-line border'
                        }`}
                      >
                        {item.done ? '✓' : ''}
                      </div>
                      <span
                        className={`text-xs ${item.done ? 'text-ink-faint line-through' : 'text-ink-2 font-medium'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 1 — Food scan result (main) */}
              <div className="bg-paper ring-line relative z-10 mr-auto w-[88%] rounded-3xl p-5 shadow-[0_24px_60px_-20px_rgba(15,74,60,0.25)] ring-1">
                <div className="mb-4 flex items-center gap-2">
                  <Image
                    src="/static/images/logo.webp"
                    alt="DearPup"
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <span className="text-ink-dim text-xs font-semibold tracking-wide uppercase">
                    Food Scanner
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-spruce-100 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl">
                    <span className="font-display text-spruce text-3xl font-bold">A</span>
                  </div>
                  <div>
                    <div className="text-ink font-semibold">Royal Canin Adult</div>
                    <div className="text-vital mt-0.5 flex items-center gap-1.5 text-sm">
                      <span className="bg-vital h-1.5 w-1.5 rounded-full" />
                      Safe · High-quality protein
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {['Protein 26%', 'Fat 16%', 'Fiber 3%'].map((m) => (
                        <span
                          key={m}
                          className="bg-cream-2 text-ink-dim rounded-full px-2 py-0.5 font-mono text-[10px]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 — Health score, flows below food card, offset right (spruce) */}
              <div className="bg-spruce relative z-20 -mt-6 ml-auto w-[72%] rounded-3xl p-5 text-white shadow-[0_24px_60px_-20px_rgba(15,74,60,0.5)]">
                <div className="text-spruce-200 mb-1 text-xs font-semibold tracking-wide uppercase">
                  Health Score
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="font-mono text-4xl font-medium">84</span>
                  <span className="text-spruce-200 mb-1 text-sm">/ 100</span>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="bg-vital h-full w-[84%] rounded-full" />
                </div>
                <div className="text-spruce-200 mt-2 text-xs">↑ 6 pts this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="via-line absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />
    </section>
  )
}
