'use client'

import { ThemeProvider } from 'next-themes'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  // White mode only — DearPup's canvas is warm paper, no dark variant.
  return (
    <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
