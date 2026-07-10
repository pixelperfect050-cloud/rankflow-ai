'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, FileText, Wrench, Image as ImageIcon, 
  FolderTree, Tags, Play, DollarSign, Bookmark, Settings, Sparkles,
  LogOut, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Tools', href: '/admin/tools', icon: Wrench },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Tags', href: '/admin/tags', icon: Tags },
  { name: 'Workflows', href: '/admin/workflows', icon: Play },
  { name: 'Deals', href: '/admin/deals', icon: DollarSign },
  { name: 'Collections', href: '/admin/collections', icon: Bookmark },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-50">
      {/* Brand */}
      <div className="flex h-14 items-center border-b border-slate-200 px-6">
        <Link href="/admin" className="flex items-center gap-2 text-slate-900 font-bold">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <span>RankFlow AI</span>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-slate-200 text-slate-900" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-emerald-600" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-900">John Doe</p>
            <p className="truncate text-xs text-slate-500">Admin</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
