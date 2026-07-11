'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react'

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
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl shadow-red-500/25 animate-float">
            <AlertTriangle className="w-9 h-9 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="relative mb-4">
          <div className="text-[100px] md:text-[140px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-100 leading-none select-none">
            500
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed mx-auto">
          We&apos;ve been notified and are looking into it. Please try again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-600 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
