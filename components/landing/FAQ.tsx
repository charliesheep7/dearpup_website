'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'What is DearPup?',
    answer:
      "DearPup is a camera-first dog wellness app. Point your camera at your dog — his food, his poop, even his face — and it turns everyday care into a simple routine, a daily photo journal, and a single Health Score that climbs as you show up. It's built around your dog's breed, age, and weight, and supports multiple dogs.",
  },
  {
    question: 'How does the food scanner work?',
    answer:
      "Scan a food's barcode or snap the label and DearPup grades it A through F, flags it Safe, Caution, or Unsafe, breaks down protein and fat, and adds a plain-English note — including hard flags for toxic items like chocolate, grapes, and xylitol. It never diagnoses; when a vet check is warranted, it says so.",
  },
  {
    question: 'What do the poop and face scans do?',
    answer:
      'A poop scan logs a digestive signal and points you to a vet when something looks worth checking — it never gives a false all-clear. The face scan is part of your daily photo journal and glow-up reel. Every health-adjacent scan is a logged signal to share with your vet, not a diagnosis — DearPup is not a substitute for professional veterinary care.',
  },
  {
    question: 'How is the care plan personalized to my dog?',
    answer:
      "From your dog's breed, age, sex, and weight, DearPup sets a baseline lifespan and builds a daily routine across five science-backed pillars — Movement, Nutrition, Mind & play, Grooming & dental, and Bond. Each pillar is backed by real, citable longevity research, and shows the good years you could still reclaim with better habits.",
  },
  {
    question: 'Can I add more than one dog?',
    answer:
      'Yes. You can add multiple dogs and each gets their own profile, care plan, and health data completely separate from the others. Switch between dogs from the profile screen.',
  },
  {
    question: "Is my dog's data private?",
    answer:
      "Completely. Your dog's data lives on your device first, synced privately to your account. We have no ads, no third-party data sharing, and no selling your information. Local-first, privacy-first.",
  },
  {
    question: 'Is DearPup free?',
    answer:
      "DearPup is free to download with core features available at no cost. Scan your first foods, start your daily loop, and track your dog's health score — all free. Premium features unlock the full lifespan model, unlimited scans, and advanced analytics.",
  },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="bg-cream py-24 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="text-display text-ink mt-4">Frequently asked questions</h2>
        </div>

        <div className="bg-paper ring-line overflow-hidden rounded-3xl ring-1">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div key={index} className={index > 0 ? 'border-line border-t' : ''}>
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isExpanded}
                >
                  <span className="font-display text-ink text-base font-semibold">
                    {faq.question}
                  </span>
                  <Plus
                    className={`text-spruce h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-45' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>

                {isExpanded && (
                  <div className="animate-fade-in px-6 pb-5">
                    <p className="text-ink-dim leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="border-line bg-paper mt-10 rounded-3xl border p-8 text-center">
          <p className="font-display text-ink text-lg font-semibold">Still have questions?</p>
          <p className="text-ink-dim mt-2">
            Reach us at{' '}
            <a href="mailto:hello@dearpup.app" className="text-spruce font-medium hover:underline">
              hello@dearpup.app
            </a>
          </p>
          <a
            href="https://apps.apple.com/app/dearpup"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-spruce text-paper hover:bg-spruce-700 mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200"
          >
            Download DearPup free
          </a>
        </div>
      </div>
    </section>
  )
}
