'use client'

import { useState } from 'react'
import { Network, Activity, Plus, FileText, Wrench, GitCommit, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RelationshipBuilder } from './relationship-builder'

export function KnowledgeGraphPanel({ entity }: any) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)

  const mockEntity = entity || { type: 'Tool', title: 'Runway Gen-2' }

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Score Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Network className="w-32 h-32 -mr-8 -mt-8" />
        </div>
        <h3 className="text-sm font-bold opacity-90 uppercase tracking-wider">Authority Score</h3>
        <div className="text-4xl font-black mt-1">94</div>
        <p className="text-xs opacity-80 mt-2">Top 5% in Knowledge Graph</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Network className="h-4 w-4 text-slate-400" /> Connected Entities
          </h3>
          <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => setIsBuilderOpen(true)}>
            <Plus className="h-3 w-3 mr-1" /> Connect
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ConnectionBadge icon={FileText} label="Articles" count={12} color="text-sky-500" bg="bg-sky-50" border="border-sky-200" />
          <ConnectionBadge icon={Wrench} label="Tools" count={4} color="text-indigo-500" bg="bg-indigo-50" border="border-indigo-200" />
          <ConnectionBadge icon={GitCommit} label="Workflows" count={3} color="text-fuchsia-500" bg="bg-fuchsia-50" border="border-fuchsia-200" />
          <ConnectionBadge icon={ArrowUpRight} label="Alternatives" count={8} color="text-amber-500" bg="bg-amber-50" border="border-amber-200" />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Activity Timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-400" /> Activity Timeline
        </h3>
        <div className="relative pl-4 border-l-2 border-slate-100 space-y-4 pb-4">
          <TimelineItem date="2 mins ago" action="Workflow Added" user="Jane S." />
          <TimelineItem date="Yesterday" action="Comparison Created" user="John D." />
          <TimelineItem date="Oct 12" action="Article Linked" user="John D." />
          <TimelineItem date="Oct 10" action="Pricing Updated" user="System" />
          <TimelineItem date="Oct 1" action="Created" user="Jane S." />
        </div>
      </div>

      {isBuilderOpen && (
        <RelationshipBuilder 
          isOpen={isBuilderOpen} 
          onClose={() => setIsBuilderOpen(false)} 
          sourceEntity={mockEntity} 
        />
      )}
    </div>
  )
}

function ConnectionBadge({ icon: Icon, label, count, color, bg, border }: any) {
  return (
    <div className={`p-2.5 rounded-lg border ${border} ${bg} flex flex-col items-start gap-1 cursor-pointer hover:shadow-sm transition-shadow`}>
      <div className="flex items-center justify-between w-full">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className={`text-sm font-bold ${color.replace('text-', 'text-opacity-80 text-')}`}>{count}</span>
      </div>
      <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">{label}</span>
    </div>
  )
}

function TimelineItem({ date, action, user }: any) {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-white" />
      <p className="text-xs font-semibold text-slate-900">{action}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[10px] text-slate-500">{date}</span>
        <span className="text-[10px] text-slate-400">•</span>
        <span className="text-[10px] text-slate-500">by {user}</span>
      </div>
    </div>
  )
}
