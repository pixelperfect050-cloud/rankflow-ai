'use client'

import { useState } from 'react'
import { Search, Link as LinkIcon, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RelationshipBuilder({ isOpen, onClose, sourceEntity }: any) {
  const [step, setStep] = useState<1 | 2>(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEntity, setSelectedEntity] = useState<any>(null)

  // Dummy results
  const results = [
    { id: 1, type: 'Article', title: 'Top 10 AI Video Generators in 2026' },
    { id: 2, type: 'Workflow', title: 'How to create a viral video' },
    { id: 3, type: 'Tool', title: 'Pika Labs' },
    { id: 4, type: 'Category', title: 'Video Generation' }
  ]

  const relationTypes = [
    'related', 'alternative', 'comparison', 'integrates_with', 'recommended', 'belongs_to'
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-emerald-500" /> Connect to {sourceEntity?.title || 'Entity'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search articles, tools, workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                  autoFocus
                />
              </div>

              <div className="space-y-2 mt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search Results</p>
                {results.map(res => (
                  <div 
                    key={res.id} 
                    onClick={() => { setSelectedEntity(res); setStep(2); }}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{res.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{res.type}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-center">
                  <div className="text-xs text-slate-500">{sourceEntity?.type || 'Current'}</div>
                  <div className="font-semibold text-sm max-w-[120px] truncate">{sourceEntity?.title || 'Current Item'}</div>
                </div>
                <div className="w-12 h-px bg-slate-300 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 border-t border-r border-slate-400 rotate-45" />
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-500">{selectedEntity.type}</div>
                  <div className="font-semibold text-sm max-w-[120px] truncate">{selectedEntity.title}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Relationship Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {relationTypes.map(type => (
                    <button 
                      key={type}
                      className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 capitalize text-left font-medium text-slate-700 transition-colors"
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Connection</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}
