import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { name: 'GitHub', href: '#', icon: GitHubIcon },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top wave decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 pr-4 max-w-sm">
              The ultimate directory for finding, comparing, and mastering software tools to scale your business.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(social => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  aria-label={`Follow us on ${social.name}`}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all"
                >
                  <social.icon className="w-4 h-4" />
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
