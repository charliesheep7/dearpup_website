import Image from 'next/image'
import Link from './Link'

const APP_STORE_URL = 'https://apps.apple.com/app/dearpup'

const footerLinks = [
  { href: '/blog', title: 'Blog' },
  { href: '/support', title: 'Support' },
  { href: '/privacy', title: 'Privacy' },
  { href: '/terms', title: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="border-line bg-cream border-t">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/static/images/logo.webp"
                alt="DearPup"
                width={30}
                height={30}
                className="rounded-[9px]"
              />
              <span className="font-brush text-spruce text-2xl leading-none">DearPup</span>
            </Link>
            <p className="text-ink-dim mt-4 text-sm leading-relaxed">
              The daily care companion that turns small habits into a longer, healthier life for
              your dog.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-spruce hover:bg-spruce-700 mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download
            </a>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow">Links</span>
            {footerLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-ink-2 hover:text-spruce text-sm font-medium transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-line text-ink-faint mt-12 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DearPup. All rights reserved.</span>
          <span>Give your dog more good years.</span>
        </div>
      </div>
    </footer>
  )
}
