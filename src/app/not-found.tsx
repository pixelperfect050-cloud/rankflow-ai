import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative text-[120px] md:text-[160px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-100 leading-none select-none">
          404
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Page Not Found</h1>
      <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed">
        We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-600 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  )
}
