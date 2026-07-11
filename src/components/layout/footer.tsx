import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-extrabold text-xl tracking-tight mb-4">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 pr-4 max-w-sm">
              The ultimate directory for finding, comparing, and mastering software tools to scale your business.
            </p>
            <div className="flex gap-4 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
            </div>
          </div>

          {/* Column 2: Directory */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-5">Directory</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/products" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">All Software</Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Comparisons</Link>
              </li>
              <li>
                <Link href="/submit-tool" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Submit Tool</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-5">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Blog & Guides</Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Collections</Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link href="/api-access" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">API Access</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-wider uppercase mb-5">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Powered by <span className="font-bold text-indigo-600">Funkariya</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
