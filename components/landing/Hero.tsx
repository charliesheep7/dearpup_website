'use client'

export default function Hero() {
  const appStoreUrl = 'https://apps.apple.com/app/dearpup'

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[--color-bg] via-[#FFFBF0] to-[--color-surface] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.07),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(245,158,11,0.04),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
        <div className="animate-fade-in grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-7 text-left lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-[--color-accent-200] bg-[--color-accent-100] px-4 py-1.5 dark:border-[--color-accent-800] dark:bg-[--color-accent-900]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[--color-accent-500]" />
              <span className="text-sm font-semibold text-[--color-accent-700] dark:text-[--color-accent-300]">
                Available on iOS
              </span>
            </div>

            <h1 className="text-[clamp(1.9rem,3.5vw,3.25rem)] leading-tight font-bold tracking-tight text-[--color-text] dark:text-white">
              Give your dog more good years
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
              DearPup turns small daily habits into a longer, healthier life — powered by AI and
              built around your dog's specific breed, age, and lifestyle. Not generic advice.
            </p>

            <div className="flex flex-col items-start gap-4 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-[--color-text] px-7 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:opacity-90 dark:bg-white dark:text-[--color-text]"
                >
                  <svg className="h-6 w-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-[--color-accent-200] bg-[--color-accent-100] px-4 py-2 text-sm font-semibold text-[--color-accent-700] dark:border-[--color-accent-800] dark:bg-[--color-accent-900] dark:text-[--color-accent-300]">
                  Free Download
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Scan your dog's food today. See what's really in it.
              </span>
            </div>

            <div className="flex items-center gap-8 border-t border-gray-100 pt-2 dark:border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-[--color-accent-600]">A–F</div>
                <div className="mt-1 text-xs text-gray-500">Food Grades</div>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[--color-accent-600]">+2.3 yrs</div>
                <div className="mt-1 text-xs text-gray-500">Avg. Lifespan Gain</div>
              </div>
              <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[--color-accent-600]">5 min</div>
                <div className="mt-1 text-xs text-gray-500">Daily Loop</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:order-2">
            <div className="relative flex aspect-[9/16] w-full max-w-sm items-center justify-center overflow-hidden rounded-[2.5rem] border-4 border-white bg-gradient-to-br from-[--color-accent-100] to-[--color-accent-200] shadow-2xl dark:border-gray-800 dark:from-[--color-accent-900] dark:to-[--color-accent-800]">
              <div className="space-y-5 p-10 text-center">
                <div className="text-7xl">🐾</div>
                <div className="text-xl font-bold text-[--color-accent-800] dark:text-[--color-accent-200]">
                  DearPup
                </div>
                <div className="text-sm leading-relaxed text-[--color-accent-700] dark:text-[--color-accent-300]">
                  Your dog's health,
                  <br />
                  in your pocket.
                </div>
                <div className="mt-4 rounded-xl bg-white p-3 text-left shadow-md dark:bg-gray-900">
                  <div className="mb-1 text-xs font-semibold text-gray-500">Today's Food Scan</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">A</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                        Royal Canin Adult
                      </div>
                      <div className="text-xs text-green-600">Safe · High quality protein</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
    </section>
  )
}
