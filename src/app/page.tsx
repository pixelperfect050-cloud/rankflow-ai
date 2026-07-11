import Link from 'next/link'
import { Search, ArrowRight, Zap, Bot, PenTool, BarChart3, Mail, Layers, Star, Sparkles } from 'lucide-react'
import { ProductCard } from '@/components/public/product-card'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { Product } from '@/types'

export const revalidate = 900

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

  const hasProducts = trendingProducts.length >= 6;
  const displayProducts = hasProducts ? trendingProducts : [
    { id: '1', name: 'ChatGPT', slug: 'chatgpt', tagline: 'Advanced AI language model.', health_score: 98, open_source: false },
    { id: '2', name: 'Claude', slug: 'claude', tagline: 'Next-generation AI assistant.', health_score: 95, open_source: false },
    { id: '3', name: 'Cursor', slug: 'cursor', tagline: 'The AI-first Code Editor.', health_score: 97, open_source: false },
    { id: '4', name: 'Notion', slug: 'notion', tagline: 'The all-in-one workspace.', health_score: 92, open_source: false },
    { id: '5', name: 'Figma', slug: 'figma', tagline: 'Collaborative interface design.', health_score: 99, open_source: false },
    { id: '6', name: 'Zapier', slug: 'zapier', tagline: 'Automate across 5000+ apps.', health_score: 94, open_source: false },
  ] as unknown as Product[];

  return (
    <main className="flex-1 w-full overflow-hidden">
      
      {/* ═══════════════════════════════════════════ */}
      {/* 1. HERO */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative bg-[#FAFAFC] pt-32 pb-28 md:pt-44 md:pb-36 overflow-hidden">
        
        {/* Soft ambient glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-indigo-100/60 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Discover software<br className="hidden sm:block"/> that actually{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">helps you grow.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Search 15,000+ verified products, comparisons and guides.
          </p>

          {/* Search */}
          <div className="max-w-[560px] mx-auto mb-8">
            <div className="flex items-center h-14 bg-white border border-slate-200 rounded-2xl shadow-sm px-4 gap-3 focus-within:border-indigo-400 focus-within:shadow-md transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search software..."
                className="flex-1 h-full bg-transparent outline-none text-base text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold tracking-widest">⌘K</kbd>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mr-1">Popular:</span>
            {['ChatGPT', 'Claude', 'Cursor', 'Notion', 'Zapier'].map(tag => (
              <Link key={tag} href={`/product/${tag.toLowerCase()}`} className="px-3 py-1.5 bg-white rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors border border-slate-200/80">
                {tag}
              </Link>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-2.5">
            <div className="flex gap-0.5 text-amber-400">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm font-semibold text-slate-500">Trusted by 10,000+ professionals</span>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 2. STATS BAR */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-slate-100">
            {[
              { value: '15k+', label: 'Products' },
              { value: '5k+', label: 'Reviews' },
              { value: '800+', label: 'Comparisons' },
              { value: '300+', label: 'Categories' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2">
                <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 3. FEATURED PICKS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#FAFAFC] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Featured Picks</h2>
              <p className="text-slate-500 text-base font-medium mt-1">The most popular and highly rated tools right now.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 4. TOP CATEGORIES */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Top Categories</h2>
            <p className="text-slate-500 text-base font-medium mt-1">Browse software by industry and use-case.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Bot, name: 'AI Tools', count: '250 Tools', color: 'bg-indigo-50 text-indigo-600' },
              { icon: PenTool, name: 'Design', count: '180 Tools', color: 'bg-rose-50 text-rose-600' },
              { icon: BarChart3, name: 'Marketing', count: '320 Tools', color: 'bg-amber-50 text-amber-600' },
              { icon: Layers, name: 'Productivity', count: '410 Tools', color: 'bg-emerald-50 text-emerald-600' },
            ].map((cat, i) => (
              <Link key={i} href="/categories" className="group flex flex-col items-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all duration-200">
                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{cat.name}</h3>
                <p className="text-sm font-medium text-slate-400 mt-0.5">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 5. POPULAR COMPARISONS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#FAFAFC] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Popular Comparisons</h2>
            <p className="text-slate-500 text-base font-medium mt-1">See head-to-head data on pricing, features, and user reviews.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { p1: 'ChatGPT', p2: 'Claude', slug: 'chatgpt-vs-claude' },
              { p1: 'Notion', p2: 'ClickUp', slug: 'notion-vs-clickup' },
              { p1: 'Figma', p2: 'Penpot', slug: 'figma-vs-penpot' },
            ].map((comp, i) => (
              <Link key={i} href={`/compare/${comp.slug}`} className="group bg-white rounded-2xl border border-slate-200/60 p-8 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 text-center">
                <div className="flex items-center justify-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm">{comp.p1[0]}</div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">vs</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-700 text-sm">{comp.p2[0]}</div>
                </div>
                <div className="font-bold text-slate-900 text-lg mb-1">{comp.p1} vs {comp.p2}</div>
                <p className="text-sm text-slate-400 font-medium mb-5">Pricing · Features · Reviews</p>
                <div className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-semibold group-hover:gap-2.5 transition-all">
                  Compare <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 6. CURATED COLLECTIONS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Curated Collections</h2>
            <p className="text-slate-500 text-base font-medium mt-1">Hand-picked software lists for specific needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Best AI Tools', desc: '50+ tools', gradient: 'from-indigo-600 to-violet-700' },
              { name: 'Best HR Software', desc: '35+ tools', gradient: 'from-rose-600 to-pink-700' },
              { name: 'Marketing Tools', desc: '60+ tools', gradient: 'from-amber-600 to-orange-700' },
              { name: 'Resume Builders', desc: '20+ tools', gradient: 'from-emerald-600 to-teal-700' },
            ].map((collection, i) => (
              <Link key={i} href="/collections" className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${collection.gradient} p-8 flex flex-col justify-end min-h-[200px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-white/70 mb-1">{collection.desc}</p>
                  <h3 className="text-xl font-black text-white mb-3">{collection.name}</h3>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 7. NEWSLETTER */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#FAFAFC] py-28">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 mb-8">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Stay ahead.</h2>
          <p className="text-base text-slate-500 font-medium mb-10 leading-relaxed">
            Weekly software updates, deals, and insights directly to your inbox. No spam, ever.
          </p>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm focus-within:border-indigo-400 focus-within:shadow-md transition-all">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-12 px-4 bg-transparent outline-none text-base font-medium placeholder:text-slate-400 text-slate-900 min-w-0"
              required
            />
            <button className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm transition-colors whitespace-nowrap shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
    </main>
  )
}
