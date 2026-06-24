'use client'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What is DearPup?',
    answer:
      "DearPup is a daily care companion for dog owners. It combines an AI-powered food scanner, a personalized care plan based on your dog's breed and age, and a habit tracker that shows you the real impact of small daily habits on your dog's lifespan and health score.",
  },
  {
    question: 'How does the food scanner work?',
    answer:
      "Point your phone's camera at any dog food label — kibble, wet food, treats. DearPup's AI reads the ingredients and nutrition info, then gives an A through F grade, a safety rating (Safe, Caution, or Unsafe), a macro breakdown, and a plain-English explanation of what's good or concerning. No guesswork.",
  },
  {
    question: 'How is the care plan personalized to my dog?',
    answer:
      "After you enter your dog's breed, age, sex, and weight — and complete a short lifestyle quiz — DearPup calculates their baseline lifespan and builds a daily care loop specific to their needs. Different breeds have different baselines, and the quiz captures real habits that affect the math.",
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

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
    <section className="bg-white py-20 sm:py-28 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[--color-accent-200] bg-[--color-accent-100] px-4 py-2 dark:border-[--color-accent-800] dark:bg-[--color-accent-900]">
            <HelpCircle className="h-4 w-4 text-[--color-accent-600] dark:text-[--color-accent-400]" />
            <span className="text-sm font-semibold text-[--color-accent-700] dark:text-[--color-accent-300]">
              FAQ
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[--color-text] sm:text-4xl lg:text-5xl dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about DearPup
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div
                key={index}
                className={`rounded-xl border-2 transition-all duration-300 ${
                  isExpanded
                    ? 'border-[--color-accent-300] bg-[--color-surface] shadow-lg dark:border-[--color-accent-700] dark:bg-gray-800'
                    : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="pr-4 text-lg font-semibold text-[--color-text] dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 text-[--color-accent-600] transition-transform duration-300 dark:text-[--color-accent-400] ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="animate-fade-in px-6 pb-5">
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-[--color-surface] to-[--color-bg] p-8 text-center dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
          <p className="mb-2 text-lg font-semibold text-[--color-text] dark:text-white">
            Still have questions?
          </p>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Reach us at{' '}
            <a
              href="mailto:hello@dearpup.app"
              className="text-[--color-accent-600] hover:underline"
            >
              hello@dearpup.app
            </a>
          </p>
          <a
            href="https://apps.apple.com/app/dearpup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent-500)] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[var(--color-accent-600)]"
          >
            Download DearPup Free
          </a>
        </div>
      </div>
    </section>
  )
}
