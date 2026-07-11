import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top wave decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 pr-4 max-w-sm">
              The ultimate directory for finding, comparing, and mastering software tools to scale your business.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <a key={social} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-xs font-bold">
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-5">Directory</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'All Software', href: '/products' },
                { label: 'Categories', href: '/categories' },
                { label: 'Comparisons', href: '/compare' },
                { label: 'Submit Tool', href: '/submit-tool' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-5">Resources</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Blog & Guides', href: '/blog' },
                { label: 'Collections', href: '/collections' },
                { label: 'Newsletter', href: '/newsletter' },
                { label: 'API Access', href: '/api-access' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-wider uppercase mb-5">Company</h3>
            <ul className="space-y-3.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Powered by <span className="font-bold text-indigo-400">Funkariya</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
