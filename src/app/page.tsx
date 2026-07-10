import Link from 'next/link'
import { Search, ArrowRight, Zap, Play, ShieldCheck, Activity } from 'lucide-react'
import { ProductCard } from '@/components/public/product-card'
import { ProductRepository } from '@/features/products/repository/product.repository'

// Constants for caching
export const revalidate = 900 // 15 minutes cache

export default async function HomePage() {
  const repo = new ProductRepository()
  
  // Fetch real data (Using workspace ID 0 for global public data, or whatever the default is)
  // Since we don't have multi-tenant public yet, we'll fetch across the board or use a default workspace
  const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";
  const allProducts = await repo.searchProducts(WORKSPACE_ID);
  
  // Simulate "Trending", "Latest" by slicing or sorting (in reality, SQL would sort this)
  const trendingProducts = allProducts.slice(0, 3);
  const latestProducts = allProducts.slice(0, 6);

  return (
    <main className="flex-1 w-full bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white opacity-70"></div>
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 md:py-32 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-8">
            <Zap className="w-4 h-4" />
            The Software Intelligence Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Discover the best software <br className="hidden md:block"/> 
            for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">workflow.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of professionals finding, comparing, and mastering the exact tools they need to scale their businesses.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, categories, or comparisons..."
                className="w-full h-14 pl-12 pr-4 bg-white border-2 border-slate-200 rounded-xl text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all outline-none text-lg"
              />
            </div>
            <button className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRENDING PRODUCTS */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Software</h2>
            <p className="text-slate-500 mt-2 text-lg">The most popular tools this week.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">No products published yet.</p>
          </div>
        )}
      </section>

      {/* 3. POPULAR COMPARISONS */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Popular Comparisons</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Don't guess. See head-to-head data on pricing, features, and user reviews before you buy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Comparisons - will be dynamic later */}
            {[
              { id: 1, p1: 'ChatGPT', p2: 'Claude', slug: 'chatgpt-vs-claude' },
              { id: 2, p1: 'Notion', p2: 'ClickUp', slug: 'notion-vs-clickup' },
              { id: 3, p1: 'Figma', p2: 'Penpot', slug: 'figma-vs-penpot' },
            ].map((comp) => (
              <Link key={comp.id} href={`/compare/${comp.slug}`} className="group relative p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors">
                <div className="flex items-center justify-between text-xl font-bold mb-4">
                  <span>{comp.p1}</span>
                  <span className="text-slate-500 text-sm px-2 bg-slate-900 rounded-full">VS</span>
                  <span>{comp.p2}</span>
                </div>
                <div className="text-emerald-400 text-sm font-medium flex items-center gap-2 mt-6">
                  Read comparison <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY ADDED */}
      <section className="py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Recently Added</h2>
          <p className="text-slate-500 mt-2 text-lg">New entries in the intelligence engine.</p>
        </div>

        {latestProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-slate-500">No products published yet.</p>
          </div>
        )}
      </section>

      {/* 5. CTA */}
      <section className="py-24 bg-emerald-600 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to find your next tool?</h2>
          <p className="text-emerald-100 text-lg mb-10">Search our database of strictly verified software products and start building better today.</p>
          <button className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl">
            Explore All Categories
          </button>
        </div>
      </section>
      
    </main>
  )
}
