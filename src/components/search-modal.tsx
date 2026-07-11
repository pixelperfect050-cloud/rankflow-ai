'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, Zap, Folder, Command } from 'lucide-react'

export function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-md p-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-5 py-5 border-b border-slate-100">
          <Search className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
          <input 
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, articles, categories..."
            className="flex-1 bg-transparent text-lg text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length > 0 ? (
            <div className="py-4 px-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Tools</h3>
                <button onClick={() => { router.push('/tool/rankflow-writer'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/25">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">RankFlow Writer</div>
                    <div className="text-xs text-slate-500">Marketing & SEO</div>
                  </div>
                </button>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Articles</h3>
                <button onClick={() => { router.push('/blog/best-ai-writers-seo'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/25">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">10 Best AI Writers for SEO in 2024</div>
                    <div className="text-xs text-slate-500">Comparisons &middot; 8 min read</div>
                  </div>
                </button>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Categories</h3>
                <button onClick={() => { router.push('/categories'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/25">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Marketing & SEO</div>
                    <div className="text-xs text-slate-500">Category</div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Command className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-600 font-semibold text-base">Type to start searching...</p>
              <p className="text-slate-400 text-sm mt-1.5">Try searching for &quot;SEO&quot;, &quot;Video&quot;, or &quot;Jasper&quot;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-sans font-semibold text-[10px] shadow-sm">↑</kbd> <kbd className="bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-sans font-semibold text-[10px] shadow-sm">↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-sans font-semibold text-[10px] shadow-sm">↵</kbd> select</span>
          </div>
          <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded-md px-1.5 py-0.5 font-sans font-semibold text-[10px] shadow-sm">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
