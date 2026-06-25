'use client'

import {
  ScanLine,
  HeartPulse,
  LineChart,
  Footprints,
  Sparkles,
  Brain,
  Heart,
  Salad,
} from 'lucide-react'

const features = [
  {
    number: '01',
    icon: ScanLine,
    title: 'A camera that understands your dog',
    description:
      'Scan his food, his poop, even his face. Food gets an A–F grade with a Safe / Caution / Unsafe check, protein and fat macros, and a plain-English note — plus hard flags for toxic items. A poop scan logs a digestive signal and nudges you to a vet when it matters. Never a diagnosis.',
    detail: 'Food · Poop · Face — a logged signal, not a verdict',
    visual: (
      <div className="bg-paper ring-line flex items-center gap-3 rounded-2xl p-4 ring-1">
        <div className="bg-spruce-100 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
          <span className="font-display text-spruce text-2xl font-bold">A</span>
        </div>
        <div>
          <div className="text-ink text-sm font-semibold">Orijen Senior</div>
          <div className="text-vital flex items-center gap-1.5 text-xs">
            <span className="bg-vital h-1.5 w-1.5 rounded-full" />
            Safe · Excellent protein quality
          </div>
          <div className="mt-1.5 flex gap-1">
            {['38% protein', '15% fat'].map((m) => (
              <span
                key={m}
                className="bg-cream-2 text-ink-dim rounded-full px-1.5 py-0.5 font-mono text-[10px]"
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
    icon: HeartPulse,
    title: 'A daily routine that adds good years',
    description:
      "From your dog's breed, age, and weight, DearPup sets a baseline lifespan and builds a short daily loop across five science-backed pillars. A Health Score climbs as you show up — and the good years you can still reclaim come into view.",
    detail: 'Health Score 0–100 · climbs with care',
    visual: (
      <div className="bg-paper ring-line space-y-2 rounded-2xl p-4 ring-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-spruce font-mono text-3xl font-medium">+1.8</span>
          <span className="text-ink-dim text-sm">reclaimable years</span>
        </div>
        <div className="bg-cream-2 h-2 w-full overflow-hidden rounded-full">
          <div className="bg-spruce h-full w-[62%] rounded-full" />
        </div>
        <div className="text-ink-faint text-xs">Based on Bella's breed, age & current habits</div>
      </div>
    ),
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Watch the glow-up, week over week',
    description:
      'A daily photo journal and glow-up reel, streaks and badges, a consistency heatmap, plus weight and digestive trends — all in one calm place. Real proof that small habits are working.',
    detail: 'Journal · Streaks · Trends',
    visual: (
      <div className="bg-paper ring-line rounded-2xl p-4 ring-1">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-ink-dim text-xs font-semibold tracking-wide uppercase">
            14-day streak
          </span>
          <span className="bg-spruce-100 text-spruce rounded-full px-2 py-0.5 font-mono text-xs font-bold">
            14
          </span>
        </div>
        <div className="flex items-end gap-1">
          {[60, 80, 70, 90, 85, 95, 88, 92, 100, 95, 88, 96, 100, 98].map((h, i) => (
            <div
              key={i}
              className="bg-spruce/80 flex-1 rounded-sm"
              style={{ height: `${h * 0.36}px` }}
            />
          ))}
        </div>
      </div>
    ),
  },
]

// The five "pillars of a long life" — exactly as the app defines them.
const dailyLoop = [
  { icon: Footprints, label: 'Movement' },
  { icon: Salad, label: 'Nutrition' },
  { icon: Brain, label: 'Mind & play' },
  { icon: Sparkles, label: 'Grooming & dental' },
  { icon: Heart, label: 'Bond' },
]

export default function Features() {
  return (
    <section id="features" className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <span className="eyebrow">Features</span>
          <h2 className="text-display text-ink mt-4">
            Everything your dog
            <br />
            <span className="text-ink-faint">needs to thrive.</span>
          </h2>
          <p className="text-ink-dim mt-5 text-lg">
            Built for your specific dog — not a generic checklist.
          </p>
        </div>

        {/* Hairline-divided feature grid — monochrome spruce icons. */}
        <div className="ring-line grid grid-cols-1 overflow-hidden rounded-3xl ring-1 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.number}
                className={`bg-paper flex flex-col gap-6 p-7 lg:p-8 ${
                  i > 0 ? 'border-line md:border-l' : ''
                } ${i > 0 ? 'border-t md:border-t-0' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="bg-spruce-100 inline-flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="text-spruce h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-ink-faint font-mono text-sm">{feature.number}</span>
                </div>

                <div>
                  <h3 className="font-display text-ink text-lg font-bold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-ink-dim mt-3 text-sm leading-relaxed">{feature.description}</p>
                </div>

                <div className="mt-auto">{feature.visual}</div>

                <div className="text-spruce inline-flex items-center gap-2 text-xs font-semibold tracking-wide">
                  <span className="bg-spruce-200 h-1 w-4 rounded-full" />
                  {feature.detail}
                </div>
              </div>
            )
          })}
        </div>

        {/* Daily loop strip — lucide icons, single spruce tone, no emoji. */}
        <div className="bg-paper ring-line mt-6 flex flex-wrap items-center justify-center gap-3 rounded-3xl px-8 py-6 ring-1">
          <span className="text-ink-dim text-sm font-semibold">
            The five pillars of a long life:
          </span>
          {dailyLoop.map((item) => {
            const Icon = item.icon
            return (
              <span
                key={item.label}
                className="border-line bg-cream text-ink-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium"
              >
                <Icon className="text-spruce h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
