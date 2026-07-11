import Link from 'next/link'
import { TrendingUp, Zap, Sparkles, ShieldCheck, PenTool, BarChart, Code, Video, Globe, Palette, Layers, ArrowRight } from 'lucide-react'

// Mock Data
const MOCK_CATEGORIES = [
  { name: 'Marketing & SEO', slug: 'marketing-seo', icon: TrendingUp, count: 1245, gradient: 'from-indigo-500 to-indigo-600' },
  { name: 'Developer Tools', slug: 'developer-tools', icon: Code, count: 832, gradient: 'from-violet-500 to-violet-600' },
  { name: 'Design & Graphics', slug: 'design-graphics', icon: Palette, count: 654, gradient: 'from-rose-500 to-rose-600' },
  { name: 'Video & Animation', slug: 'video-animation', icon: Video, count: 421, gradient: 'from-cyan-500 to-cyan-600' },
  { name: 'Productivity', slug: 'productivity', icon: Zap, count: 532, gradient: 'from-amber-500 to-amber-600' },
  { name: 'Writing & Copy', slug: 'writing-copy', icon: PenTool, count: 398, gradient: 'from-emerald-500 to-emerald-600' },
  { name: 'Data & Analytics', slug: 'data-analytics', icon: BarChart, count: 275, gradient: 'from-blue-500 to-blue-600' },
  { name: 'Security & Privacy', slug: 'security-privacy', icon: ShieldCheck, count: 156, gradient: 'from-slate-500 to-slate-600' },
  { name: 'Translation', slug: 'translation', icon: Globe, count: 89, gradient: 'from-teal-500 to-teal-600' },
  { name: 'General AI', slug: 'general-ai', icon: Sparkles, count: 645, gradient: 'from-purple-500 to-purple-600' },
]

export default function CategoriesPage() {
  return (
    <main className="flex-1 bg-[#fafbfc] min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbfc] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 font-medium mb-6">
            <Layers className="w-4 h-4 text-indigo-400" /> Browse Categories
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">perfect tool</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Explore our comprehensive directory of AI and software tools organized by use case and industry.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="group relative p-6 rounded-2xl bg-white border border-slate-200/60 hover:border-indigo-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 group-hover:bg-white/20 text-indigo-500 group-hover:text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h2 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-white transition-colors">{cat.name}</h2>
                <p className="text-sm font-medium text-slate-500 group-hover:text-white/70 bg-slate-100 group-hover:bg-white/20 px-3 py-1 rounded-full transition-all">{cat.count} tools</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[200px] h-[200px] bg-cyan-500/15 rounded-full blur-[60px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg font-medium">
              We are constantly adding new tools to our directory. If you know a great tool that isn&apos;t listed, please submit it!
            </p>
            <Link 
              href="/submit-tool" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 group"
            >
              Submit a Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
