'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Sentry / OpenTelemetry logging hook
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-slate-900 mb-4">500</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Internal Server Error</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        Something went wrong on our end. We've been notified and are looking into it.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-300 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
