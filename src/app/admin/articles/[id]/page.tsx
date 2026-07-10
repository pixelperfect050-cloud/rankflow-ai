'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, Settings, History, CheckCircle2, Cloud, 
  ChevronRight, AlignLeft, BarChart2, ShieldAlert
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RichEditor } from '@/components/admin/editor/rich-editor'
import { SEOSidebar } from '@/components/admin/editor/seo-sidebar'

export default function ArticleEditorPage({ params }: { params: { id: string } }) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState('Just now')
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor')
  
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setLastSaved(new Date().toLocaleTimeString())
    }, 1000)
  }

  // Dummy Ctrl+S handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 bg-white">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center text-sm text-slate-500">
            <span>Articles</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-slate-900 font-medium truncate max-w-[200px]">Top 10 AI Video Generators</span>
          </div>
          
          <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-slate-50 rounded-full text-xs font-medium text-slate-500 border border-slate-200">
            {isSaving ? (
              <><Cloud className="h-3 w-3 animate-pulse" /> Saving...</>
            ) : (
              <><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Saved {lastSaved}</>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'editor' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'history' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              History
            </button>
          </div>
          <Button variant="outline" size="sm" className="ml-2">Preview</Button>
          <Button size="sm" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">Publish</Button>
        </div>
      </header>

      {/* Main 3-Panel Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Panel 1: Outline / Nav (Collapsible) */}
        <aside className="w-64 border-r border-slate-200 bg-slate-50 hidden lg:flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <AlignLeft className="h-4 w-4" /> Outline
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-2 text-sm">
              <li className="text-emerald-600 font-medium cursor-pointer">H1: Top 10 AI Video...</li>
              <li className="text-slate-600 hover:text-slate-900 cursor-pointer pl-4">H2: Introduction</li>
              <li className="text-slate-600 hover:text-slate-900 cursor-pointer pl-4">H2: Best Tools Overview</li>
              <li className="text-slate-600 hover:text-slate-900 cursor-pointer pl-8">H3: 1. Runway Gen-2</li>
              <li className="text-slate-600 hover:text-slate-900 cursor-pointer pl-8">H3: 2. Pika Labs</li>
              <li className="text-slate-600 hover:text-slate-900 cursor-pointer pl-4">H2: Conclusion</li>
            </ul>
          </div>
        </aside>

        {/* Panel 2: Editor */}
        <main className="flex-1 bg-white overflow-y-auto relative">
          {activeTab === 'editor' ? (
            <div className="max-w-3xl mx-auto py-12 px-8">
              <input 
                type="text" 
                defaultValue="Top 10 AI Video Generators in 2026"
                className="w-full text-5xl font-extrabold text-slate-900 outline-none placeholder:text-slate-300 mb-8"
                placeholder="Article Title..."
              />
              <RichEditor />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto py-12 px-8">
              {/* Dummy Diff Viewer */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2"><History className="h-6 w-6 text-slate-400" /> Version History</h2>
                <span className="text-sm text-slate-500">Showing changes from <strong className="text-slate-900">Version 12</strong> to <strong className="text-slate-900">Version 13</strong></span>
              </div>
              <div className="border border-slate-200 rounded-xl bg-slate-50 font-mono text-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-rose-50 text-rose-700 flex">
                  <span className="w-8 opacity-50 select-none">-</span>
                  <span>Removed legacy paragraph about older models.</span>
                </div>
                <div className="p-4 border-b border-slate-200 bg-emerald-50 text-emerald-700 flex">
                  <span className="w-8 opacity-50 select-none">+</span>
                  <span><strong>Added FAQ Block</strong> to address common generation questions.</span>
                </div>
                <div className="p-4 text-slate-600 flex bg-white">
                  <span className="w-8 opacity-50 select-none"> </span>
                  <span>Unchanged text block showing context for the diff.</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Panel 3: Inspector / SEO */}
        <aside className="w-80 border-l border-slate-200 bg-white hidden xl:flex flex-col">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <BarChart2 className="h-4 w-4" /> SEO & Inspector
          </div>
          <div className="flex-1 overflow-y-auto">
            <SEOSidebar />
          </div>
        </aside>
      </div>
    </div>
  )
}
