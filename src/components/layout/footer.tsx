import Link from 'next/link'
import { Sparkles, MessageCircle, Code, Briefcase, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl mb-4 tracking-tight">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-sm mb-6 max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.social.twitter} className="text-slate-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={SITE_CONFIG.social.github} className="text-slate-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">GitHub</span>
                <Code className="h-5 w-5" />
              </a>
              <a href="mailto:hello@rankflow.ai" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Directory</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tools" className="hover:text-blue-600 transition-colors">All AI Tools</Link></li>
              <li><Link href="/categories" className="hover:text-blue-600 transition-colors">Categories</Link></li>
              <li><Link href="/compare" className="hover:text-blue-600 transition-colors">Compare Tools</Link></li>
              <li><Link href="/deals" className="hover:text-blue-600 transition-colors">Lifetime Deals</Link></li>
              <li><Link href="/submit-tool" className="hover:text-blue-600 transition-colors">Submit a Tool</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/news" className="hover:text-blue-600 transition-colors">AI News</Link></li>
              <li><Link href="/workflows" className="hover:text-blue-600 transition-colors">Workflows</Link></li>
              <li><Link href="/newsletter" className="hover:text-blue-600 transition-colors">Newsletter</Link></li>
              <li><Link href="/api" className="hover:text-blue-600 transition-colors">API Access</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <span className="text-red-500">&hearts;</span>
            <span>for the future of work.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
