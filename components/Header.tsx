'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = clsx(
    'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
    scrolled
      ? 'bg-white/85 backdrop-blur-xl shadow-sm border-gray-100/60 dark:bg-gray-950/85 dark:border-gray-800/60'
      : 'bg-transparent'
  )

  return (
    <header className={headerClass} role="banner">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Logo + wordmark */}
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center gap-2.5">
          <Image
            src="/static/images/logo.webp"
            alt="DearPup"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-serif text-lg font-bold text-[--color-text] dark:text-white">
            DearPup
          </span>
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
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-[--color-accent-600] dark:text-gray-300 dark:hover:text-[--color-accent-400]"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <div className="mx-2 hidden h-4 w-px bg-gray-200 sm:block dark:bg-gray-700" />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
