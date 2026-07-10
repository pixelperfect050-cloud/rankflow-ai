'use client'

import { CheckCircle2, AlertCircle, Search, Link2, ExternalLink, Image as ImageIcon, Video, Type } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function SEOSidebar() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Live Scores */}
      <div className="grid grid-cols-2 gap-4">
        <ScoreCard title="SEO Score" score={92} />
        <ScoreCard title="Readability" score={89} />
      </div>

      <hr className="border-slate-100" />

      {/* Link Metrics */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">Links</h3>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-slate-600"><Link2 className="w-4 h-4 text-emerald-500" /> Internal</span>
          <span className="font-bold text-slate-900">12</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-slate-600"><ExternalLink className="w-4 h-4 text-sky-500" /> External</span>
          <span className="font-bold text-slate-900">5</span>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Missing Elements / Suggestions */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">Content Checklist</h3>
        <ul className="space-y-3">
          <ChecklistItem label="Focus Keyword Used" status="pass" icon={Search} />
          <ChecklistItem label="H1 & H2 Headings" status="pass" icon={Type} />
          <ChecklistItem label="Images with Alt Text" status="pass" icon={ImageIcon} />
          <ChecklistItem label="YouTube Video Embed" status="missing" icon={Video} />
          <ChecklistItem label="FAQ Schema" status="missing" icon={Type} />
        </ul>
      </div>

      <hr className="border-slate-100" />

      {/* Metadata Form */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">Metadata (Google Preview)</h3>
        <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-1">
          <p className="text-xs text-slate-500 truncate">https://rankflow.ai/blog/top-10-ai-video-generators</p>
          <h4 className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Top 10 AI Video Generators in 2026 - RankFlow</h4>
          <p className="text-xs text-slate-600 line-clamp-2">Discover the best artificial intelligence video generators that can turn text into high-quality videos instantly. Compare features, pricing, and pros & cons.</p>
        </div>
        <Button variant="outline" className="w-full text-xs">Edit Metadata</Button>
      </div>

    </div>
  )
}

function ScoreCard({ title, score }: { title: string, score: number }) {
  const color = score >= 90 ? 'text-emerald-500 border-emerald-500' : 
                score >= 70 ? 'text-amber-500 border-amber-500' : 'text-rose-500 border-rose-500'
  const bg = score >= 90 ? 'bg-emerald-50' : 
             score >= 70 ? 'bg-amber-50' : 'bg-rose-50'
             
  return (
    <Card className="border-slate-200 shadow-none">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 ${color} ${bg} mb-2`}>
          <span className={`text-xl font-bold ${color.replace('border', 'text')}`}>{score}</span>
        </div>
        <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{title}</h4>
      </CardContent>
    </Card>
  )
}

function ChecklistItem({ label, status, icon: Icon }: any) {
  return (
    <li className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${status === 'pass' ? 'text-emerald-500' : 'text-slate-400'}`} />
        <span className={`text-sm ${status === 'pass' ? 'text-slate-700' : 'text-slate-500'}`}>{label}</span>
      </div>
      {status === 'pass' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      ) : (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Add Internal Links</Badge>
      )}
    </li>
  )
}
