'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Sparkles, Menu, X, ChevronDown, User, Search } from 'lucide-react'
import { SearchModal } from '@/components/search-modal'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isAdmin = pathname?.startsWith('/admin')

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // If in admin area, we might want a different header, but let's keep it unified or minimal
  if (isAdmin) {
    return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
            <Sparkles className="h-6 w-6" />
            <span className="hidden sm:inline-block">RankFlow Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            View Site
          </Link>
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
              <Sparkles className="h-6 w-6" />
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-400",
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? "text-emerald-400"
                      : "text-slate-300"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href="/submit-tool" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex h-9 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900 px-4 py-4 pb-6">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-emerald-400",
                  pathname === item.href
                    ? "text-emerald-400"
                    : "text-slate-300"
                )}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            <Link 
              href="/submit-tool" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow transition-colors hover:bg-emerald-600"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
