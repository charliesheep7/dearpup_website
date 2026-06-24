import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { slug as githubSlug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl

  // English blog routes - exclude Arabic posts
  const blogRoutes = allBlogs
    .filter((post) => !post.draft && (post.lang === 'en' || !post.lang))
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  // Arabic blog routes - only include posts that exist in Arabic
  const localizedBlogRoutes = allBlogs
    .filter((post) => !post.draft && post.lang === 'ar')
    .map((post) => ({
      url: `${siteUrl}/ar/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  // Include canonical URLs for both English and Arabic main routes
  // Both languages are canonical (independent content strategy)
  const today = new Date().toISOString().split('T')[0]
  const staticRoutes = ['', 'blog', 'about', 'privacy', 'terms', 'support']
  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today,
  }))

  // Add Arabic route equivalents (all are canonical)
  const arabicRoutes = staticRoutes.map((route) => ({
    url: `${siteUrl}/ar${route === '' ? '' : `/${route}`}`,
    lastModified: today,
  }))

  // Tag archive pages — keep the sitemap in sync with the indexable /tags/* routes.
  // English tags: English ContentLayer posts. Arabic tags: Arabic posts.
  const enTagSet = new Set<string>()
  allBlogs
    .filter((post) => !post.draft && (post.lang === 'en' || !post.lang))
    .forEach((post) => post.tags?.forEach((tag) => enTagSet.add(githubSlug(tag))))

  const arTagSet = new Set<string>()
  allBlogs
    .filter((post) => !post.draft && post.lang === 'ar')
    .forEach((post) => post.tags?.forEach((tag) => arTagSet.add(githubSlug(tag))))

  const tagRoutes = [...enTagSet].map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: today,
  }))
  const arabicTagRoutes = [...arTagSet].map((tag) => ({
    url: `${siteUrl}/ar/tags/${tag}`,
    lastModified: today,
  }))

  return [
    ...routes,
    ...arabicRoutes,
    ...blogRoutes,
    ...localizedBlogRoutes,
    ...tagRoutes,
    ...arabicTagRoutes,
  ]
}
