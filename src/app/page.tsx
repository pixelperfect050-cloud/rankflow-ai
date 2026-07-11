import Link from 'next/link'
import { Search, ArrowRight, Zap, Bot, PenTool, BarChart3, Mail, Layers, Star, Sparkles, TrendingUp, Shield, Globe } from 'lucide-react'
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
      {/* HERO */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafbfc] to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The Future of Software Discovery</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] mb-8 text-balance animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover software<br className="hidden sm:block" /> that actually{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient">
              helps you grow.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Search 15,000+ verified products, comparisons and guides.
          </p>

          {/* Search */}
          <div className="max-w-[600px] mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center h-16 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-5 gap-4 focus-within:border-indigo-400/50 focus-within:bg-white/15 focus-within:shadow-[0_0_30px_-4px_rgba(99,102,241,0.3)] transition-all duration-300">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search software, tools, categories..."
                className="flex-1 h-full bg-transparent outline-none text-base text-white placeholder:text-slate-500 font-medium"
              />
              <kbd className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-slate-400 text-xs font-semibold tracking-widest">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mr-1">Popular:</span>
            {['ChatGPT', 'Claude', 'Cursor', 'Notion', 'Zapier'].map(tag => (
              <Link key={tag} href={`/product/${tag.toLowerCase()}`} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-200">
                {tag}
              </Link>
            ))}
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {['bg-indigo-500','bg-cyan-500','bg-violet-500','bg-amber-500','bg-emerald-500'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white`}>
                    {['A','M','S','J','K'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-300">Trusted by 10,000+ professionals</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 text-amber-400">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="text-sm font-semibold text-slate-400">4.9/5 rating</span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* STATS BAR */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative bg-white border-b border-slate-100 py-16 -mt-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-100">
            {[
              { value: '15k+', label: 'Products', icon: Globe },
              { value: '5k+', label: 'Reviews', icon: Star },
              { value: '800+', label: 'Comparisons', icon: TrendingUp },
              { value: '300+', label: 'Categories', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center py-3 group cursor-default">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURED PICKS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#fafbfc] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3.5 h-3.5" /> Featured
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Featured Picks</h2>
              <p className="text-slate-500 text-base font-medium mt-2">The most popular and highly rated tools right now.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm text-indigo-600 font-bold hover:text-indigo-700 transition-colors group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TOP CATEGORIES */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-28 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5" /> Categories
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Top Categories</h2>
            <p className="text-slate-500 text-base font-medium mt-2">Browse software by industry and use-case.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Bot, name: 'AI Tools', count: '250 Tools', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
              { icon: PenTool, name: 'Design', count: '180 Tools', color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', text: 'text-rose-600' },
              { icon: BarChart3, name: 'Marketing', count: '320 Tools', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
              { icon: Layers, name: 'Productivity', count: '410 Tools', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
            ].map((cat, i) => (
              <Link key={i} href="/categories" className="group relative overflow-hidden flex flex-col items-center text-center p-8 bg-slate-50 rounded-2xl border border-slate-200/60 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.text} flex items-center justify-center mb-5 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-300`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-white transition-colors">{cat.name}</h3>
                  <p className="text-sm font-medium text-slate-400 mt-1 group-hover:text-white/70 transition-colors">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* POPULAR COMPARISONS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#fafbfc] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-bold uppercase tracking-widest mb-4">
              <TrendingUp className="w-3.5 h-3.5" /> Comparisons
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Popular Comparisons</h2>
            <p className="text-slate-500 text-base font-medium mt-2">See head-to-head data on pricing, features, and user reviews.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { p1: 'ChatGPT', p2: 'Claude', slug: 'chatgpt-vs-claude' },
              { p1: 'Notion', p2: 'ClickUp', slug: 'notion-vs-clickup' },
              { p1: 'Figma', p2: 'Penpot', slug: 'figma-vs-penpot' },
            ].map((comp, i) => (
              <Link key={i} href={`/compare/${comp.slug}`} className="group bg-white rounded-2xl border border-slate-200/60 p-8 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">{comp.p1[0]}</div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">VS</span>
                    <div className="w-8 h-px bg-slate-200 mt-1" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">{comp.p2[0]}</div>
                </div>
                <div className="font-bold text-slate-900 text-lg mb-1">{comp.p1} vs {comp.p2}</div>
                <p className="text-sm text-slate-400 font-medium mb-6">Pricing · Features · Reviews</p>
                <div className="inline-flex items-center gap-2 text-sm text-indigo-600 font-bold group-hover:gap-3 transition-all">
                  Compare <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CURATED COLLECTIONS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-white py-28 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Collections
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Curated Collections</h2>
            <p className="text-slate-500 text-base font-medium mt-2">Hand-picked software lists for specific needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'Best AI Tools', desc: '50+ tools', gradient: 'from-indigo-600 via-indigo-500 to-violet-600' },
              { name: 'Best HR Software', desc: '35+ tools', gradient: 'from-rose-600 via-rose-500 to-pink-600' },
              { name: 'Marketing Tools', desc: '60+ tools', gradient: 'from-amber-500 via-orange-500 to-amber-600' },
              { name: 'Resume Builders', desc: '20+ tools', gradient: 'from-emerald-600 via-emerald-500 to-teal-600' },
            ].map((collection, i) => (
              <Link key={i} href="/collections" className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${collection.gradient} p-8 flex flex-col justify-end min-h-[220px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full" />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                
                <div className="relative z-10">
                  <p className="text-sm font-bold text-white/60 mb-1.5">{collection.desc}</p>
                  <h3 className="text-xl font-extrabold text-white mb-4">{collection.name}</h3>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-white/80 group-hover:text-white group-hover:gap-3 transition-all duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* NEWSLETTER */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-[#fafbfc] py-32">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <Mail className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">Stay ahead.</h2>
          <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
            Weekly software updates, deals, and insights directly to your inbox. No spam, ever.
          </p>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-lg focus-within:border-indigo-400 focus-within:shadow-xl focus-within:shadow-indigo-500/10 transition-all duration-300">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-13 px-5 bg-transparent outline-none text-base font-medium placeholder:text-slate-400 text-slate-900 min-w-0"
              required
            />
            <button className="h-13 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 whitespace-nowrap shrink-0">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-medium">Join 5,000+ subscribers. Unsubscribe anytime.</p>
        </div>
      </section>
      
    </main>
  )
}
