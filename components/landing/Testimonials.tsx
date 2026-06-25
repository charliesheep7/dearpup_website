'use client'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    category: 'Food Safety',
    name: 'Jessica T.',
    title: 'Golden Retriever mom',
    quote:
      "I scanned Buddy's food and got a D grade. I had no idea. Switched brands the same week — he has so much more energy now.",
    fullStory:
      "I honestly thought I was buying good food because it looked premium. DearPup scanned it in seconds and showed me the ingredient breakdown — the first three were corn fillers. The vet note explained it clearly without any judgment. I switched to a brand that got an A, and within a month Buddy's coat was shinier and he was way more playful. I wish I'd had this years ago.",
  },
  {
    category: 'Longevity',
    name: 'Marcus R.',
    title: 'Labrador owner',
    quote:
      "Seeing '1.8 reclaimable years' on the lifespan screen was the wake-up call I needed. Now I actually do the daily loop.",
    fullStory:
      "My Lab Max is 7, and when the app showed me he had a below-average health score and that better habits could reclaim nearly 2 years of his life, I just... sat with that for a minute. It wasn't guilt-trippy, it was honest data. The daily loop only takes 5 minutes and I do it while drinking my morning coffee. His vet last month said his vitals looked better than a year ago.",
  },
  {
    category: 'Photo Journal',
    name: 'Priya K.',
    title: 'Multi-dog household',
    quote:
      'Two dogs, two separate routines — and the glow-up reel side by side is genuinely my favorite part of the app.',
    fullStory:
      'I have a senior Beagle and a young Husky — completely different needs, and DearPup gives them each their own routine, reminders, and photo journal. Scrolling the glow-up reel from three months ago to now, you can actually see the difference. The consistency heatmap caught that I was great Mon–Fri but dropping off on weekends. 45-day streak now and both dogs are thriving.',
  },
]

export default function Testimonials() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="bg-paper py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 max-w-xl">
          <span className="eyebrow">Stories</span>
          <h2 className="text-display text-ink mt-4">
            From dog owners
            <br />
            <span className="text-ink-faint">who decided to do more.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={index}
                className={clsx(
                  'bg-cream flex flex-col rounded-3xl p-7 ring-1 transition-all duration-300',
                  isExpanded ? 'ring-spruce-200' : 'ring-line'
                )}
              >
                <span className="eyebrow">{testimonial.category}</span>

                <blockquote className="mt-4 flex-1">
                  <p className="font-display text-ink text-lg leading-snug">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                {isExpanded && (
                  <p className="animate-fade-in border-line text-ink-dim mt-4 border-t pt-4 text-sm leading-relaxed">
                    {testimonial.fullStory}
                  </p>
                )}

                <div className="border-line mt-6 flex items-center justify-between border-t pt-5">
                  <div>
                    <p className="text-ink text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-ink-dim text-xs">{testimonial.title}</p>
                  </div>
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="text-spruce hover:text-spruce-700 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Less' : 'Read more'}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
