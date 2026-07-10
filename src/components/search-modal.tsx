'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, FileText, Zap, Folder, Command } from 'lucide-react'

export function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-900/50 backdrop-blur-sm p-4">
      {/* Click outside to close overlay */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input 
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, articles, categories..."
            className="flex-1 bg-transparent text-lg text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length > 0 ? (
            <div className="py-4 px-2 space-y-6">
              {/* Tools Results */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Tools</h3>
                <button onClick={() => { router.push('/tool/rankflow-writer'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors">
                  <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">RankFlow Writer</div>
                    <div className="text-xs text-slate-500">Marketing & SEO</div>
                  </div>
                </button>
              </div>

              {/* Articles Results */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Articles</h3>
                <button onClick={() => { router.push('/blog/best-ai-writers-seo'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors">
                  <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">10 Best AI Writers for SEO in 2024</div>
                    <div className="text-xs text-slate-500">Comparisons • 8 min read</div>
                  </div>
                </button>
              </div>

              {/* Categories Results */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Categories</h3>
                <button onClick={() => { router.push('/categories'); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-left transition-colors">
                  <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Folder className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">Marketing & SEO</div>
                    <div className="text-xs text-slate-500">Category</div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Command className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Type to start searching...</p>
              <p className="text-slate-400 text-sm mt-1">Try searching for "SEO", "Video", or "Jasper"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans font-medium text-[10px]">↑</kbd> <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans font-medium text-[10px]">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans font-medium text-[10px]">↵</kbd> to select</span>
          </div>
          <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans font-medium text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}
