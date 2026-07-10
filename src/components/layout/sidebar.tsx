'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ADMIN_NAV_ITEMS } from '@/lib/constants'
import { 
  LayoutDashboard, 
  FileText, 
  FolderTree, 
  Tags, 
  Image as ImageIcon,
  Wrench,
  Inbox,
  GitCompare,
  Link as LinkIcon,
  Tag,
  Wand2,
  Sparkles
} from 'lucide-react'

// Map icon strings to actual components since we store string names in constants
const ICON_MAP: Record<string, any> = {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Image: ImageIcon,
  Wrench,
  Inbox,
  GitCompare,
  Link: LinkIcon,
  Tag,
  Wand2,
  Sparkles
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 min-h-[calc(100vh-4rem)] hidden md:block">
      <div className="flex flex-col gap-6 py-6 px-4">
        {ADMIN_NAV_ITEMS.map((group, i) => (
          <div key={i}>
            <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {group.group}
            </h4>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = ICON_MAP[item.icon] || FileText
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
