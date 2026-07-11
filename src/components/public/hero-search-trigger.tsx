'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { SearchModal } from '@/components/search-modal'

export function HeroSearchTrigger() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="w-full flex items-center h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-5 gap-4 hover:border-indigo-400/50 hover:bg-white/15 hover:shadow-[0_0_30px_-4px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer group"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-slate-400 shrink-0 group-hover:text-indigo-400 transition-colors" />
        <span className="flex-1 h-full flex items-center text-base text-slate-500 font-medium text-left">
          Search software, tools, categories...
        </span>
        <kbd className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-slate-400 text-xs font-semibold tracking-widest">
          ⌘K
        </kbd>
      </button>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
