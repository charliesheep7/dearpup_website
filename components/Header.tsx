'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'

const APP_STORE_URL = 'https://apps.apple.com/us/app/dearpup-daily-dog-care/id6783599461'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = clsx(
    'sticky top-0 z-50 w-full border-b transition-all duration-300',
    scrolled ? 'border-line/80 bg-cream/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
  )

  return (
    <header className={headerClass} role="banner">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
        {/* Logo + wordmark */}
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center gap-2.5">
          <Image
            src="/static/images/logo.webp"
            alt="DearPup"
            width={30}
            height={30}
            className="rounded-[9px]"
          />
          <span className="font-brush text-spruce text-2xl leading-none">DearPup</span>
        </Link>

        {/* Nav + actions */}
        <div className="flex items-center gap-1">
          <nav className="hidden items-center sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-ink-dim hover:text-spruce rounded-lg px-3.5 py-2 text-sm font-medium transition-colors"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-spruce hover:bg-spruce-700 ml-2 hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors sm:inline-flex"
          >
            Get the app
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
