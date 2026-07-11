'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Sparkles, Menu, X, User, Search } from 'lucide-react'
import { SearchModal } from '@/components/search-modal'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAdmin = pathname?.startsWith('/admin')

  // Pages that have a dark hero section
  const hasDarkHero = ['/', '/blog', '/compare'].includes(pathname || '') ||
    pathname?.startsWith('/product/') ||
    pathname?.startsWith('/blog/')

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (isAdmin) {
    return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 font-extrabold text-xl tracking-tight">
            <Sparkles className="h-6 w-6" />
            <span className="hidden sm:inline-block">RankFlow Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            View Site
          </Link>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white border border-indigo-100 shadow-sm">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
    )
  }

  // Determine text colors based on scroll state and hero type
  const showLightText = hasDarkHero && !scrolled

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                <Sparkles className="h-4.5 w-4.5 text-white" />
              </div>
              <span className={cn("transition-colors duration-300", showLightText ? "text-white" : "text-slate-900")}>{SITE_CONFIG.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-[14px] font-semibold transition-all duration-200",
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? showLightText
                        ? "text-white bg-white/15"
                        : "text-indigo-600 bg-indigo-50"
                      : showLightText
                        ? "text-slate-300 hover:text-white hover:bg-white/10"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              className={cn(
                "transition-colors p-2.5 rounded-xl",
                showLightText
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href="/submit-tool" 
              className={cn(
                "px-4 py-2.5 text-[14px] font-semibold rounded-xl transition-all",
                showLightText
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 text-[14px] font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-600"
            >
              Login
            </Link>
          </div>

          {/* Mobile: search + menu buttons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={cn(
                "p-2 rounded-xl transition-colors",
                showLightText
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "p-2 rounded-xl transition-colors",
                showLightText
                  ? "text-slate-300 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with slide-down animation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-2xl px-4 py-6 shadow-2xl absolute w-full left-0 top-[72px] animate-slide-down">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-bold transition-all",
                  pathname === item.href
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-3" />
            <Link 
              href="/submit-tool" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all"
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
