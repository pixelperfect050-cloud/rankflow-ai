import Link from 'next/link'
import { Search, ArrowRight, Zap, Bot, PenTool, BarChart3, Mail, MonitorPlay, Layers, Star } from 'lucide-react'
import { ProductCard } from '@/components/public/product-card'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { Product } from '@/types'

export const revalidate = 900 // 15 minutes cache

export default async function HomePage() {
  let trendingProducts: Product[] = [];
  
  try {
    const repo = new ProductRepository()
    const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";
    const allProducts = await repo.searchProducts(WORKSPACE_ID);
    trendingProducts = allProducts.slice(0, 6);
  } catch (e) {
    console.error('Homepage data fetch failed:', e);
  }

  // Fallback to "Featured Picks" (Mock data) if DB is empty
  const hasProducts = trendingProducts.length >= 6;
  const displayProducts = hasProducts ? trendingProducts : [
    { id: '1', name: 'ChatGPT', slug: 'chatgpt', tagline: 'Advanced AI language model by OpenAI.', health_score: 98, open_source: false },
    { id: '2', name: 'Claude', slug: 'claude', tagline: 'Next-generation AI assistant by Anthropic.', health_score: 95, open_source: false },
    { id: '3', name: 'Cursor', slug: 'cursor', tagline: 'The AI-first Code Editor.', health_score: 97, open_source: false },
    { id: '4', name: 'Notion', slug: 'notion', tagline: 'The all-in-one workspace for your notes and tasks.', health_score: 92, open_source: false },
    { id: '5', name: 'Figma', slug: 'figma', tagline: 'The collaborative interface design tool.', health_score: 99, open_source: false },
    { id: '6', name: 'Zapier', slug: 'zapier', tagline: 'Automate your work across 5000+ apps.', health_score: 94, open_source: false },
  ] as unknown as Product[];

  return (
    <main className="flex-1 w-full bg-slate-50">
      
      {/* 1. HERO SECTION (With Glass Effect) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white opacity-80 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Discover software <br className="hidden md:block"/> 
            that actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">helps you grow.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium">
            Search 15,000+ verified tools, comparisons and workflows.
          </p>

          {/* Unified Premium Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[20px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center w-full h-16 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[16px] shadow-lg focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all overflow-hidden">
              <Search className="absolute left-5 w-6 h-6 text-indigo-500" />
              <input 
                type="text" 
                placeholder="Search software, categories..."
                className="w-full h-full pl-14 pr-24 bg-transparent outline-none text-lg text-slate-900 placeholder:text-slate-400"
              />
              <div className="absolute right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold tracking-widest uppercase">
                Ctrl K
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-500">
            <span>Popular:</span>
            {['ChatGPT', 'Cursor', 'Claude', 'Notion', 'Zapier'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">15,000+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Products</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">5,000+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Reviews</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">800+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Comparisons</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">300+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PICKS (TRENDING) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Featured Picks</h2>
            <p className="text-slate-500 mt-3 text-lg font-medium">The most popular and highly rated tools this week.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. TOP CATEGORIES */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Top Categories</h2>
            <p className="text-slate-500 mt-3 text-lg font-medium">Browse software by industry and use-case.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Bot, name: 'AI Assistants', count: '250 Tools', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: PenTool, name: 'Design', count: '180 Tools', color: 'text-cyan-600', bg: 'bg-cyan-50' },
              { icon: BarChart3, name: 'Marketing', count: '320 Tools', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Layers, name: 'Productivity', count: '410 Tools', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((cat, i) => (
              <Link key={i} href="/categories" className="group p-6 bg-white rounded-[20px] border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${cat.bg}`}>
                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{cat.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{cat.count}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR COMPARISONS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Popular Comparisons</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Don't guess. See head-to-head data on pricing, features, and user reviews before you buy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, p1: 'ChatGPT', p2: 'Claude', slug: 'chatgpt-vs-claude' },
              { id: 2, p1: 'Notion', p2: 'ClickUp', slug: 'notion-vs-clickup' },
              { id: 3, p1: 'Figma', p2: 'Penpot', slug: 'figma-vs-penpot' },
            ].map((comp) => (
              <Link key={comp.id} href={`/compare/${comp.slug}`} className="group flex flex-col items-center justify-center p-10 bg-white rounded-[20px] border border-slate-200 shadow-sm hover:border-indigo-600 hover:shadow-md transition-all text-center">
                <div className="flex items-center justify-center gap-6 text-2xl font-extrabold text-slate-900 mb-6">
                  <span className="group-hover:text-indigo-600 transition-colors">{comp.p1}</span>
                  <span className="text-sm px-3 py-1 bg-slate-100 text-slate-500 rounded-full border border-slate-200">VS</span>
                  <span className="group-hover:text-indigo-600 transition-colors">{comp.p2}</span>
                </div>
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 font-bold text-indigo-600">
                  Compare Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COLLECTIONS */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Curated Collections</h2>
            <p className="text-slate-500 mt-3 text-lg font-medium">Hand-picked software lists for specific needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Best AI Tools 2026',
              'Best HR Software',
              'Best Marketing Tools',
              'Best Resume Builders'
            ].map((collection, i) => (
              <Link key={i} href="/collections" className="group relative overflow-hidden rounded-[20px] bg-slate-900 aspect-[4/3] flex items-end p-6 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-40 transition-opacity z-0 mix-blend-overlay"></div>
                <div className="relative z-20 w-full">
                  <h3 className="text-xl font-bold text-white mb-2">{collection}</h3>
                  <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    View collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-white border border-slate-200 shadow-sm mb-8 text-indigo-600">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Stay ahead.</h2>
          <p className="text-xl text-slate-500 font-medium mb-12">Weekly software updates, deals, and insights directly to your inbox. No spam, ever.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              className="flex-1 h-14 px-6 rounded-[16px] border border-slate-200 text-lg outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
              required
            />
            <button className="h-14 px-8 rounded-[14px] bg-slate-900 hover:bg-indigo-600 text-white font-bold text-lg shadow-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
    </main>
  )
}
