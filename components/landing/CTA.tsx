'use client'

import Image from 'next/image'

export default function CTA() {
  const appStoreUrl = 'https://apps.apple.com/app/dearpup'

  return (
    <section className="bg-[--color-bg] py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-3xl bg-[--color-text] dark:bg-gray-100">
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_auto]">
            {/* Copy */}
            <div className="p-10 lg:p-14">
              <div className="mb-2 flex items-center gap-2">
                <Image
                  src="/static/images/logo.webp"
                  alt="DearPup"
                  width={24}
                  height={24}
                  className="rounded-md"
                />
                <span className="text-sm font-semibold text-amber-400">DearPup</span>
              </div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-white">
                Your dog deserves
                <br />
                their best years.
              </h2>
              <p className="mt-4 max-w-md text-lg text-gray-400">
                Download free. Scan your dog's food today and start the daily loop that makes every
                year count.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg"
                >
                  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Free</span>
                  <span>·</span>
                  <span>No ads</span>
                  <span>·</span>
                  <span>Private</span>
                </div>
              </div>
            </div>

            {/* Decorative side — large number */}
            <div className="hidden items-center justify-center bg-white/5 p-14 lg:flex">
              <div className="text-center">
                <div className="font-serif text-[5rem] leading-none font-bold text-amber-400">
                  +2.3
                </div>
                <div className="mt-2 text-sm font-medium text-gray-400">avg. years added</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
