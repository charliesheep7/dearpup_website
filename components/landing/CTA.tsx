'use client'

export default function CTA() {
  const appStoreUrl = 'https://apps.apple.com/app/dearpup'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[--color-bg] via-[--color-surface] to-[--color-accent-50] py-20 sm:py-28 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[--color-accent-400] mix-blend-multiply blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[--color-accent-300] mix-blend-multiply blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 text-5xl">🐶</div>

        <h2 className="mb-6 text-4xl leading-tight font-bold text-[--color-text] sm:text-5xl dark:text-white">
          Your dog deserves their best years
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Download DearPup free. Scan your dog's food today and start the daily loop that makes
          every year count.
        </p>

        <div className="flex flex-col items-center gap-4">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-[--color-text] px-10 py-5 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-90 dark:bg-white dark:text-[--color-text]"
          >
            <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on App Store
          </a>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Free · No subscription required to start
          </span>
        </div>

        <div className="mx-auto mt-14 grid max-w-sm grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-xl font-bold text-[--color-accent-600]">Free</div>
            <div className="mt-1 text-xs text-gray-500">to download</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[--color-accent-600]">No ads</div>
            <div className="mt-1 text-xs text-gray-500">ever</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[--color-accent-600]">Private</div>
            <div className="mt-1 text-xs text-gray-500">your data</div>
          </div>
        </div>
      </div>
    </section>
  )
}
