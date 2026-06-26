'use client'

import Image from 'next/image'

const APP_STORE_URL = 'https://apps.apple.com/app/dearpup'

export default function CTA() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="bg-spruce overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-32px_rgba(15,74,60,0.5)]">
          <div className="grid items-center gap-0 lg:grid-cols-[1fr_auto]">
            {/* Copy */}
            <div className="p-10 lg:p-14">
              <div className="mb-4 flex items-center gap-2.5">
                <Image
                  src="/static/images/logo.webp"
                  alt="DearPup"
                  width={26}
                  height={26}
                  className="rounded-md"
                />
                <span className="font-brush text-spruce-200 text-xl">DearPup</span>
              </div>
              <h2 className="text-display text-white">
                Your dog deserves
                <br />
                <span className="text-spruce-200">their best years.</span>
              </h2>
              <p className="text-spruce-200 mt-5 max-w-md text-lg">
                Download free. Scan his food, his poop, his face — and start the daily loop that
                makes every year count.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-paper text-spruce inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
                >
                  <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
                <div className="text-spruce-200 flex items-center gap-3 text-sm">
                  <span>Free</span>
                  <span className="text-white/30">·</span>
                  <span>No ads</span>
                  <span className="text-white/30">·</span>
                  <span>Private</span>
                </div>
              </div>
            </div>

            {/* Decorative side — large numeral */}
            <div className="hidden items-center justify-center border-l border-white/10 bg-white/5 p-14 lg:flex">
              <div className="text-center">
                <div className="font-mono text-[4.5rem] leading-none font-medium text-white">5</div>
                <div className="text-spruce-200 mt-3 text-sm font-medium tracking-wide uppercase">
                  pillars of a long life
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
