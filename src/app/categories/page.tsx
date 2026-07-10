import Link from 'next/link'
import { TrendingUp, Zap, Sparkles, ShieldCheck, PenTool, BarChart, Code, Video, Globe, Palette } from 'lucide-react'

// Mock Data
const MOCK_CATEGORIES = [
  { name: 'Marketing & SEO', slug: 'marketing-seo', icon: TrendingUp, count: 1245 },
  { name: 'Developer Tools', slug: 'developer-tools', icon: Code, count: 832 },
  { name: 'Design & Graphics', slug: 'design-graphics', icon: Palette, count: 654 },
  { name: 'Video & Animation', slug: 'video-animation', icon: Video, count: 421 },
  { name: 'Productivity', slug: 'productivity', icon: Zap, count: 532 },
  { name: 'Writing & Copy', slug: 'writing-copy', icon: PenTool, count: 398 },
  { name: 'Data & Analytics', slug: 'data-analytics', icon: BarChart, count: 275 },
  { name: 'Security & Privacy', slug: 'security-privacy', icon: ShieldCheck, count: 156 },
  { name: 'Translation', slug: 'translation', icon: Globe, count: 89 },
  { name: 'General AI', slug: 'general-ai', icon: Sparkles, count: 645 },
]

export default function CategoriesPage() {
  return (
    <main className="flex-1 bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Browse by Category
          </h1>
          <p className="text-lg text-slate-600">
            Explore our comprehensive directory of AI and software tools organized by use case and industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/category/${cat.slug}`}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-500 flex items-center justify-center mb-4 transition-colors">
                <cat.icon className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{cat.name}</h2>
              <p className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{cat.count} tools</p>
            </Link>
          ))}
        </div>

        <div className="mt-20 bg-emerald-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-emerald-100 mb-8 max-w-xl mx-auto text-lg">
              We are constantly adding new tools to our directory. If you know a great tool that isn't listed, please submit it!
            </p>
            <Link href="/submit-tool" className="inline-block bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg">
              Submit a Tool
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
