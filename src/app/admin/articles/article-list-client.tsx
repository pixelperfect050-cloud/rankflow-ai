'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plus, Search, Filter, MoreHorizontal, ChevronDown, 
  Trash2, Send, FolderInput, CheckCircle2, Clock, 
  FileEdit, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ArticleListClient({ initialArticles }: { initialArticles: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const articles = initialArticles;

  const toggleSelectAll = () => {
    if (selectedIds.length === articles.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(articles.map(a => a.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Articles</h1>
          <p className="text-slate-500 mt-1">Manage your blog content, drafts, and scheduled posts.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="h-4 w-4" /> New Article
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          
          {/* Filters */}
          <Button variant="outline" className="gap-2 text-slate-600 bg-white">
            <Filter className="h-4 w-4" /> Filters <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        {/* Bulk Actions (Visible when items selected) */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
            <span className="text-sm font-medium text-slate-600 mr-2">{selectedIds.length} selected</span>
            <Button variant="outline" size="sm" className="gap-2 text-slate-600">
              <Send className="h-4 w-4" /> Publish
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-slate-600">
              <FolderInput className="h-4 w-4" /> Move
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={selectedIds.length === articles.length && articles.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="bg-slate-50 p-4 rounded-full">
                        <FileEdit className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="text-lg font-medium text-slate-900">No articles found</p>
                      <p className="text-sm">Get started by creating your first article.</p>
                      <Link href="/admin/articles/new">
                        <Button variant="outline" className="mt-2">Create First Article</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        checked={selectedIds.includes(article.id)}
                        onChange={() => toggleSelect(article.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/articles/${article.id}`} className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                        {article.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={article.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-600">Category</td>
                    <td className="px-6 py-4 text-slate-600">Author</td>
                    <td className="px-6 py-4 text-slate-600">{new Date(article.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-600">
          <div>Showing {articles.length} results</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    review: 'bg-amber-100 text-amber-700 border-amber-200',
    scheduled: 'bg-sky-100 text-sky-700 border-sky-200',
  }
  const icons = {
    published: CheckCircle2,
    draft: FileEdit,
    review: AlertCircle,
    scheduled: Clock,
  }
  
  const Icon = icons[status as keyof typeof icons] || FileEdit
  const style = styles[status as keyof typeof styles] || styles.draft

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${style}`}>
      <Icon className="h-3 w-3" />
      <span className="capitalize">{status}</span>
    </span>
  )
}
