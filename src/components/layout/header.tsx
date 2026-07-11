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

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAdmin) {
    return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <Sparkles className="h-6 w-6" />
            <span className="hidden sm:inline-block">RankFlow Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            View Site
          </Link>
          <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg border-slate-200 shadow-sm" 
          : "bg-white border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-extrabold text-2xl tracking-tight">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[15px] font-semibold transition-colors hover:text-indigo-600",
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? "text-indigo-600"
                      : "text-slate-600"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-500 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-slate-50"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href="/submit-tool" 
              className="text-[15px] font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              className="inline-flex h-11 items-center justify-center rounded-[14px] bg-indigo-600 px-6 py-2 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-6 shadow-xl absolute w-full left-0 top-20">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-bold transition-colors hover:text-indigo-600",
                  pathname === item.href
                    ? "text-indigo-600"
                    : "text-slate-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-slate-100 my-4" />
            <Link 
              href="/submit-tool" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Submit Tool
            </Link>
            <Link 
              href="/admin/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-indigo-600 px-4 py-2 text-lg font-bold text-white shadow-sm transition-colors hover:bg-indigo-700"
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
