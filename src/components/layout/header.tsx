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
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Sparkles className="h-6 w-6" />
            <span className="hidden sm:inline-block">RankFlow Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            View Site
          </Link>
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-600",
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? "text-blue-600"
                      : "text-slate-600"
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
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href="/submit-tool" 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 pb-6 shadow-lg absolute w-full left-0 top-16">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-blue-600",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-slate-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-slate-200 my-2" />
            <Link 
              href="/submit-tool" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-base font-medium text-white shadow transition-colors hover:bg-blue-700"
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
