import Link from 'next/link'
import { Search, ArrowRight, Zap, Bot, PenTool, BarChart3, Mail, MonitorPlay, Layers, Star, CheckCircle2 } from 'lucide-react'
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
    <main className="flex-1 w-full bg-slate-50 overflow-hidden">
      
      {/* 1. MINIMAL LINEAR HERO SECTION */}
      <section className="relative bg-white border-b border-slate-200 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        
        {/* Soft subtle glow (Not overpowering) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center w-full">
          
          <h1 className="text-[56px] md:text-[80px] font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Discover software <br className="hidden md:block"/>
            that actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">helps you grow.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
            Search 15,000+ verified products, comparisons and guides.
          </p>

          {/* Minimal Spotlight Search */}
          <div className="relative group w-full max-w-[650px] mx-auto mb-10">
            <div className="relative flex items-center w-full h-[72px] bg-white border-2 border-slate-200 rounded-[24px] shadow-sm focus-within:shadow-lg focus-within:border-indigo-500 transition-all overflow-hidden">
              <Search className="absolute left-6 w-7 h-7 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search software..."
                className="w-full h-full pl-16 pr-28 bg-transparent outline-none text-xl text-slate-900 placeholder:text-slate-400 font-medium"
              />
              <div className="absolute right-4 flex items-center gap-1.5 px-3 py-2 rounded-[14px] bg-slate-100 border border-slate-200 text-slate-500 text-sm font-bold tracking-widest">
                Ctrl K
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mr-2">Popular</span>
            {['ChatGPT', 'Claude', 'Cursor', 'Notion', 'Zapier'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-slate-100 rounded-[14px] text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors border border-slate-200/60">
                {tag}
              </span>
            ))}
          </div>

          {/* Trust Social Proof */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-base font-bold text-slate-600">Trusted by 10,000+ professionals</span>
          </div>

        </div>
      </section>

      {/* 2. STATS SECTION (Cards) */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15k+', label: 'Products' },
              { value: '5k+', label: 'Reviews' },
              { value: '800+', label: 'Comparisons' },
              { value: '300+', label: 'Categories' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-[24px] p-8 text-center border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">{stat.value}</div>
                <div className="text-sm md:text-base font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PICKS */}
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Featured Picks</h2>
            <p className="text-slate-500 text-lg font-medium">The most popular and highly rated tools right now.</p>
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Top Categories</h2>
            <p className="text-slate-500 text-lg font-medium">Browse software by industry and use-case.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Bot, name: 'AI Tools', count: '250 Tools' },
              { icon: PenTool, name: 'Design', count: '180 Tools' },
              { icon: BarChart3, name: 'Marketing', count: '320 Tools' },
              { icon: Layers, name: 'Productivity', count: '410 Tools' },
            ].map((cat, i) => (
              <Link key={i} href="/categories" className="group p-6 bg-slate-50 rounded-[20px] border border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[16px] bg-white flex items-center justify-center border border-slate-200 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <cat.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-sm font-bold text-slate-500 mb-6">{cat.count}</p>
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors text-slate-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR COMPARISONS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900">Popular Comparisons</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">See head-to-head data on pricing, features, and user reviews before you buy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, p1: 'ChatGPT', p2: 'Claude', slug: 'chatgpt-vs-claude' },
              { id: 2, p1: 'Notion', p2: 'ClickUp', slug: 'notion-vs-clickup' },
              { id: 3, p1: 'Figma', p2: 'Penpot', slug: 'figma-vs-penpot' },
            ].map((comp) => (
              <Link key={comp.id} href={`/compare/${comp.slug}`} className="group flex flex-col items-center justify-center p-10 bg-white rounded-[20px] border border-slate-200 shadow-sm hover:border-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center">
                <div className="flex items-center justify-center gap-6 text-2xl font-black text-slate-900 mb-6">
                  <span className="group-hover:text-indigo-600 transition-colors">{comp.p1}</span>
                  <span className="text-sm px-3 py-1 bg-slate-50 text-slate-400 rounded-[12px] border border-slate-100 font-bold">VS</span>
                  <span className="group-hover:text-indigo-600 transition-colors">{comp.p2}</span>
                </div>
                <div className="flex gap-1 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 w-full h-12 bg-slate-50 text-slate-700 font-bold rounded-[14px] group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  Compare <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Curated Collections</h2>
            <p className="text-slate-500 text-lg font-medium">Hand-picked software lists for specific needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Best AI Tools',
              'Best HR Software',
              'Marketing Tools',
              'Resume Builders'
            ].map((collection, i) => (
              <Link key={i} href="/collections" className="group relative overflow-hidden rounded-[20px] bg-slate-900 aspect-square flex items-end p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-40 transition-opacity z-0 mix-blend-overlay"></div>
                <div className="relative z-20 w-full">
                  <h3 className="text-2xl font-black text-white mb-3 leading-tight">{collection}</h3>
                  <div className="text-sm font-bold text-slate-300 flex items-center gap-2">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-white border border-slate-200 shadow-sm mb-10 text-indigo-600">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-[56px] font-black text-slate-900 tracking-tight mb-6">Stay ahead.</h2>
          <p className="text-xl text-slate-500 font-medium mb-12">Weekly software updates, deals, and insights directly to your inbox. No spam, ever.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 h-16 px-6 rounded-[16px] border border-slate-200 text-lg font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm placeholder:text-slate-400"
              required
            />
            <button className="h-16 px-10 rounded-[16px] bg-slate-900 hover:bg-indigo-600 text-white font-bold text-lg shadow-md transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
    </main>
  )
}
