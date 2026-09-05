import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { buildLanguageAlternates } from 'app/seo'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}
const DEFAULT_AUTHOR_SLUG = siteMetadata.authorSlug || 'mathias-yussif'

const resolveAuthorDetails = (authorSlugs?: string[]) => {
  const slugs = authorSlugs && authorSlugs.length > 0 ? authorSlugs : [DEFAULT_AUTHOR_SLUG]

  const resolvedAuthors = slugs
    .map((author) => allAuthors.find((p) => p.slug === author))
    .filter((author): author is Authors => Boolean(author))
    .map((author) => coreContent(author))

  if (resolvedAuthors.length > 0) {
    return resolvedAuthors
  }

  const fallbackAuthor = allAuthors.find((p) => p.slug === DEFAULT_AUTHOR_SLUG)
  return fallbackAuthor ? [coreContent(fallbackAuthor as Authors)] : []
}

const buildJsonLdAuthors = (authorDetails: ReturnType<typeof resolveAuthorDetails>) => {
  return authorDetails.map((author) => {
    const sameAs = [
      author.linkedin,
      author.twitter,
      author.github,
      author.bluesky,
      ...(author.seoProfiles || []),
    ].filter(Boolean)

    return {
      '@type': 'Person',
      name: author.name,
      // Google reads @type plus url/sameAs to work out which person this is.
      // The bio page is the stable anchor; sameAs carries the off-site profiles.
      url: `${siteMetadata.siteUrl}/about`,
      jobTitle: author.occupation || undefined,
      worksFor: author.company
        ? {
            '@type': 'Organization',
            name: author.company,
          }
        : undefined,
      image: author.avatar ? `${siteMetadata.siteUrl}${author.avatar}` : undefined,
      sameAs: sameAs.length > 0 ? Array.from(new Set(sameAs)) : undefined,
    }
  })
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const post = allBlogs.find((p) => p.slug === slug && (p.lang === 'en' || !p.lang))

  if (!post) return

  const authorDetails = resolveAuthorDetails(post.authors)

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })
  // Add the keywords if available (SEObot posts have metaKeywords)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keywords = (post as any).metaKeywords

  return {
    title: post.title,
    description: post.summary,
    keywords: keywords || undefined,
    // Always an explicit self-canonical. This used to be `undefined` whenever
    // no translation existed — which is every post — and an explicit undefined
    // here overrides the root layout's `canonical: './'` rather than inheriting
    // it, so no post shipped with a canonical at all.
    alternates: buildLanguageAlternates(`/blog/${post.slug}`),
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  // Generate params for English posts only
  const englishBlogs = allBlogs.filter((p) => p.lang === 'en' || !p.lang)
  return englishBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const filteredBlogs = allBlogs.filter((post) => post.lang === 'en' || !post.lang)
  const post = allBlogs.find((p) => p.slug === slug && (p.lang === 'en' || !p.lang)) as
    | Blog
    | undefined

  if (!post) {
    return notFound()
  }

  const allPosts = allCoreContent(sortPosts(filteredBlogs))
  const postIndex = allPosts.findIndex((p) => p.slug === slug)
  const prev = postIndex !== -1 ? allPosts[postIndex + 1] : null
  const next = postIndex !== -1 ? allPosts[postIndex - 1] : null

  const authorDetails = resolveAuthorDetails(post.authors)

  const mainContent = coreContent(post)

  const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`
  const jsonLd = post.structuredData || {}
  jsonLd['author'] = buildJsonLdAuthors(authorDetails)
  jsonLd['publisher'] = {
    '@type': 'Organization',
    // Was 'DeenUp' — copied from the template this site was forked from, so every
    // post credited the wrong brand as publisher.
    name: 'DearPup',
    logo: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}/static/favicons/android-chrome-512x512.png`,
    },
  }
  jsonLd['mainEntityOfPage'] = { '@type': 'WebPage', '@id': postUrl }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteMetadata.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteMetadata.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
