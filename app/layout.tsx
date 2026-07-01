import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import {
  Bricolage_Grotesque,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Fasthand,
  Noto_Sans_Arabic,
} from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import RTLHandler from '@/components/RTLHandler'

// Display — Bricolage Grotesque (matches the DearPup app's headline family).
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-bricolage',
})

// Body + UI — Plus Jakarta Sans (the app's body/UI family).
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
})

// Every metric / number — JetBrains Mono (the app's numeral family).
const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

// Brand wordmark only — Fasthand (the app's brush-script "DearPup" mark).
const fasthand = Fasthand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fasthand',
})

const noto_sans_arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export async function generateStaticParams() {
  return [{ lang: 'en' }]
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains_mono.variable} ${fasthand.variable} ${noto_sans_arabic.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const path = window.location.pathname;
              const isArabic = path.startsWith('/ar/') || path === '/ar';
              if (isArabic) {
                document.documentElement.setAttribute('lang', 'ar');
                document.documentElement.setAttribute('dir', 'rtl');
              }
            })();
          `,
        }}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${basePath}/static/favicons/android-chrome-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={`${basePath}/static/favicons/android-chrome-512x512.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#0f4a3c"
      />
      <meta name="msapplication-TileColor" content="#0f4a3c" />
      <meta name="theme-color" content="#f4f2eb" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DearPup',
            url: 'https://www.dearpup.app',
            logo: 'https://www.dearpup.app/static/favicons/android-chrome-512x512.png',
            slogan: 'Help your dog live healthier and happier',
            description:
              "DearPup is a camera-first dog wellness app: scan your dog's food, poop, and face to turn everyday care into a routine, a photo journal, and a Health Score that climbs.",
          }),
        }}
      />
      <body className="bg-cream text-ink font-sans antialiased ltr:pl-[calc(100vw-100%)] rtl:pr-[calc(100vw-100%)]">
        <RTLHandler />
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </SearchProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
