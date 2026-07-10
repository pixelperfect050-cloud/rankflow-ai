import Link from 'next/link'
import { 
  FileText, Wrench, FolderTree, AlertCircle, 
  Link2, Eye, TrendingUp, CheckCircle2, XCircle, Plus,
  BarChart3, Settings, ShieldAlert
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your platform's content and health.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50">
            <Plus className="h-4 w-4" /> New Category
          </Button>
          <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50">
            <Plus className="h-4 w-4" /> New Tool
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="h-4 w-4" /> New Article
          </Button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Draft Articles" value="12" icon={FileText} color="text-amber-500" bgColor="bg-amber-100" />
        <MetricCard title="Published Articles" value="48" icon={CheckCircle2} color="text-emerald-500" bgColor="bg-emerald-100" />
        <MetricCard title="Review Queue" value="5" icon={Eye} color="text-sky-500" bgColor="bg-sky-100" />
        <MetricCard title="Total Tools" value="156" icon={Wrench} color="text-indigo-500" bgColor="bg-indigo-100" />
        
        <MetricCard title="Categories" value="24" icon={FolderTree} color="text-slate-500" bgColor="bg-slate-100" />
        <MetricCard title="SEO Issues" value="3" icon={AlertCircle} color="text-rose-500" bgColor="bg-rose-100" trend="-2 this week" />
        <MetricCard title="Broken Affiliate Links" value="0" icon={Link2} color="text-emerald-500" bgColor="bg-emerald-100" />
        <MetricCard title="Monthly Views" value="24.5k" icon={TrendingUp} color="text-blue-500" bgColor="bg-blue-100" trend="+12% vs last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3 width) - Health Score & Traffic */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Website Health Score Panel */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-100">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-emerald-500" />
                Website Health Score
              </h3>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-8">
                {/* Score Circle */}
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-500 bg-emerald-50">
                  <span className="text-4xl font-bold text-emerald-600">96</span>
                  <span className="absolute bottom-2 text-xs font-semibold text-emerald-600">%</span>
                </div>
                
                {/* Breakdown */}
                <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-8">
                  <HealthItem label="SEO Health" score="92/100" status="good" />
                  <HealthItem label="Performance" score="95/100" status="good" />
                  <HealthItem label="Broken Links" score="0" status="perfect" />
                  <HealthItem label="Duplicate Content" score="0" status="perfect" />
                  <HealthItem label="Missing Meta" score="2 pages" status="warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Overview */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                Traffic Overview
              </h3>
              <div className="flex gap-2">
                <Badge variant="outline">Today</Badge>
                <Badge variant="secondary">Week</Badge>
                <Badge variant="outline">Month</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 h-64 flex items-center justify-center bg-slate-50/50 rounded-b-lg border-t border-slate-100">
              {/* Placeholder for actual chart */}
              <p className="text-slate-400 text-sm font-medium">Chart visualization will render here.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width) - Recent Activity & Tasks */}
        <div className="space-y-8">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b border-slate-100">
              <h3 className="text-lg font-semibold">Needs Attention</h3>
            </CardHeader>
            <CardContent className="pt-4 px-0">
              <ul className="divide-y divide-slate-100">
                <ActionItem title="Review pending tool submission" subtitle="Jasper AI Alternative" time="2h ago" type="review" />
                <ActionItem title="Fix missing meta descriptions" subtitle="2 Articles affected" time="5h ago" type="seo" />
                <ActionItem title="Schedule weekend posts" subtitle="Queue is empty" time="1d ago" type="content" />
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

// Helper Components

function MetricCard({ title, value, icon: Icon, color, bgColor, trend }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
          {trend && (
            <p className="text-xs font-medium text-emerald-600 mt-2">{trend}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function HealthItem({ label, score, status }: { label: string, score: string, status: 'good' | 'warning' | 'error' | 'perfect' }) {
  const colors = {
    perfect: 'text-emerald-500',
    good: 'text-emerald-600',
    warning: 'text-amber-500',
    error: 'text-rose-500'
  }
  const icons = {
    perfect: CheckCircle2,
    good: CheckCircle2,
    warning: AlertCircle,
    error: XCircle
  }
  const Icon = icons[status]
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-bold text-slate-900">{score}</span>
        <Icon className={`h-4 w-4 ${colors[status]}`} />
      </div>
    </div>
  )
}

function ActionItem({ title, subtitle, time, type }: any) {
  return (
    <li className="px-6 py-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <span className="text-xs font-medium text-slate-400">{time}</span>
    </li>
  )
}

function Badge({ children, variant }: any) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-md cursor-pointer ${variant === 'secondary' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 border border-slate-200'}`}>
      {children}
    </span>
  )
}
