import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const normalizePath = (path?: string) => {
  if (!path || path === '/') {
    return '/'
  }
  return path.startsWith('/') ? path : `/${path}`
}

interface LanguageAlternatesOptions {
  includeArabic?: boolean
  includeEnglish?: boolean
  xDefault?: 'en' | 'ar' | string
  englishPath?: string
  arabicPath?: string
  canonical?: string
  currentLanguage?: 'en' | 'ar'
}

export function buildLanguageAlternates(
  path: string,
  { canonical, englishPath }: LanguageAlternatesOptions = {}
): Metadata['alternates'] {
  // DearPup publishes in English only, so there are no language alternates to
  // declare: Google ignores hreflang that is not reciprocal, and a lone
  // self-reference says nothing. What every page does need is an absolute
  // self-canonical, which is what this now returns. Callers still pass the
  // old language options; they are accepted and ignored.
  const normalized = normalizePath(canonical ?? englishPath ?? path)
  return { canonical: `${siteMetadata.siteUrl}${normalized}` }
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  // Let buildLanguageAlternates handle x-default logic based on currentLanguage
  // Don't automatically add x-default here to avoid conflicts
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.headerTitle}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.headerTitle}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
