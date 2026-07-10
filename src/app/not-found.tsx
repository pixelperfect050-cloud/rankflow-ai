import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
