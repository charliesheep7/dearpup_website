'use client'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import type { Dictionary } from '@/types/dictionary'

interface FAQProps {
  lang?: string
  dict?: Dictionary
}

const faqs = [
  {
    question: 'What exactly is DeenUp?',
    answer:
      "DeenUp is a learning app for Islamic knowledge — think Duolingo for your Deen, or a halal alternative to endless TikTok scrolling. Instead of doom-scrolling, you swipe through short, scholar-approved lessons, take quick quizzes, and build a daily learning streak. It's designed to make growing your Islamic knowledge fun, simple, and consistent.",
  },
  {
    question: 'How is the content kept Islamically accurate?',
    answer:
      "Every lesson on DeenUp is rooted in the Quran and authentic Sunnah and reviewed by qualified scholars before it goes live. We don't use AI or algorithms to generate religious rulings — technology only helps us organize and deliver trustworthy knowledge. You can always see the sources behind what you learn.",
  },
  {
    question: 'Is DeenUp good for new Muslims and reverts?',
    answer:
      'Absolutely. DeenUp meets you wherever you are. Bite-sized lessons start from the fundamentals and build up gradually, so new Muslims and reverts can learn the basics at their own pace — without judgment and without feeling overwhelmed. Lifelong Muslims will find plenty to deepen their knowledge too.',
  },
  {
    question: 'How is this different from just scrolling social media?',
    answer:
      "DeenUp gives you the same easy, swipeable experience you're used to — but every swipe leaves you with beneficial knowledge instead of wasted time. There's no doom-scrolling, no harmful content, and no algorithm pulling you toward distraction. It's screen time that actually grows your Deen.",
  },
  {
    question: 'What languages does DeenUp support?',
    answer:
      'DeenUp currently supports English and Arabic, with the interface automatically switching to a right-to-left (RTL) layout for Arabic. More languages may be added as the community grows.',
  },
]

export default function FAQ({ lang = 'en', dict }: FAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const faqItems = dict?.faq?.items || faqs

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
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
            <span
              className={`text-sm font-semibold text-[--color-accent-700] dark:text-[--color-accent-300] ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {dict?.faq?.badge || 'FAQ'}
            </span>
          </div>
          <h2
            className={`mb-4 text-3xl font-bold text-[--color-text] sm:text-4xl lg:text-5xl dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.faq?.heading || 'Frequently asked questions'}
          </h2>
          <p
            className={`text-lg text-gray-600 dark:text-gray-300 ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.faq?.subtitle || 'Everything you need to know about DeenUp'}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => {
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
                  <span
                    className={`pr-4 text-lg font-semibold text-[--color-text] dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
                  >
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
                    <p
                      className={`leading-relaxed text-gray-600 dark:text-gray-300 ${lang === 'ar' ? 'font-arabic' : ''}`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional help */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-[--color-surface] to-[--color-bg] p-8 text-center dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
          <p
            className={`mb-4 text-lg text-black dark:text-white ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.faq?.stillHaveQuestions || 'Still have questions?'}
          </p>
          <a
            href="https://chat.whatsapp.com/Ea023Ghn0PJ27Iji2Ms6Fp?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent-500)] px-10 py-4 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[var(--color-accent-600)] ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {dict?.faq?.contactSupport || 'Join Waitlist'}
          </a>
        </div>
      </div>
    </section>
  )
}
