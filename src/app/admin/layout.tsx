import { AdminSidebar } from '@/components/admin/sidebar'

export const metadata = {
  title: 'RankFlow Admin',
  description: 'AI-Powered CMS and Knowledge Graph Engine',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900 font-sans">
      <AdminSidebar />
      {/* 
        The main content area takes up the rest of the space.
        Inside specific pages (like the Article Editor), we will divide this area
        further into a Main Editor Panel and a Right Inspector Panel.
      */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
