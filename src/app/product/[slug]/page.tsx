import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { CheckCircle2, XCircle, ArrowRight, Star, ExternalLink, Activity, PlayCircle } from 'lucide-react'
import { Product } from '@/types'

export const revalidate = 3600 // 1 hour cache as requested

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const repo = new ProductRepository()
  const product = await repo.getProductBySlug(params.slug)
  
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} Reviews, Pricing, and Alternatives`,
    description: product.tagline || product.description || `Discover if ${product.name} is the right tool for your workflow.`,
    alternates: {
      canonical: `https://rankflow.ai/product/${product.slug}`
    },
    openGraph: {
      title: `${product.name} - RankFlow AI`,
      description: product.tagline || undefined,
      type: 'website'
    }
  }
}

export default async function ProductPage({ params }: PageProps) {
  const repo = new ProductRepository()
  const product = await repo.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Fetch related data
  const pricingPlans = await repo.getPricingPlans(product.id)
  const scores = await repo.getIntelligenceScores(product.id)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "operatingSystem": product.platforms?.join(', ') || "Web",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": pricingPlans?.[0]?.currency || "USD",
      "lowPrice": pricingPlans?.[0]?.price || "0"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 bg-slate-50 min-h-screen pb-32">
        
        {/* 1. HERO */}
        <section className="bg-slate-900 text-white pt-20 pb-16 px-4">
          <div className="max-w-[1000px] mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center space-x-2 text-sm text-slate-400 mb-8 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-emerald-400">{product.name}</span>
            </nav>

            <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center text-4xl font-bold text-slate-300">
              {product.name.charAt(0)}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{product.name}</h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
              {product.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {product.website_url && (
                <a href={product.website_url} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold flex items-center gap-2 transition-colors">
                  Visit Website <ExternalLink className="w-5 h-5" />
                </a>
              )}
              <Link href={`/compare/${product.slug}`} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors">
                Compare Options
              </Link>
            </div>
          </div>
        </section>

        {/* 2. QUICK FACTS (Per user request) */}
        <section className="max-w-[1000px] mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Health Score</span>
              <div className="flex items-center gap-1 mt-1 text-emerald-600 font-bold text-xl">
                <Activity className="w-5 h-5" /> {scores?.overall_score || 85}%
              </div>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Starting Price</span>
              <span className="mt-1 font-bold text-xl text-slate-900">
                {pricingPlans?.[0] ? `$${pricingPlans[0].price}/${pricingPlans[0].billing_cycle}` : 'Free Tier'}
              </span>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">API Available</span>
              <span className="mt-1 font-bold text-lg text-slate-900">{product.api_available ? 'Yes' : 'No'}</span>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Platforms</span>
              <span className="mt-1 font-medium text-slate-900">{product.platforms?.slice(0, 2).join(', ') || 'Web'}</span>
            </div>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-4 mt-16 space-y-24">
          
          {/* 3. DESCRIPTION & ABOUT */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About {product.name}</h2>
            <div className="prose prose-slate max-w-none prose-lg text-slate-600">
              <p>{product.description || `Read our comprehensive overview of ${product.name} to see if it meets your needs.`}</p>
            </div>
          </section>

          {/* 4. PRICING MATRIX */}
          <section id="pricing">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Pricing Plans</h2>
            {pricingPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map(plan => (
                  <div key={plan.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <h3 className="font-bold text-xl text-slate-900 mb-2">{plan.plan_name}</h3>
                    <div className="text-4xl font-extrabold text-slate-900 mb-1">
                      {plan.price ? `$${plan.price}` : 'Custom'}
                    </div>
                    <div className="text-sm text-slate-500 mb-6 uppercase tracking-wider font-medium">/{plan.billing_cycle || 'month'}</div>
                    <ul className="space-y-4 mb-8 flex-1">
                      {(plan.features_json as any[])?.map((feature: any, i) => (
                        <li key={i} className="flex gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{feature.name || feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-500">
                Pricing information is currently being verified.
              </div>
            )}
          </section>

          {/* 5. ALTERNATIVES (Real Links) */}
          <section id="alternatives">
             <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Top Alternatives to {product.name}</h2>
              <Link href={`/alternative/${product.slug}`} className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link href={`/alternative/${product.slug}`} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 transition-all flex items-center justify-between group">
                 <div className="font-bold text-lg text-slate-900">See full alternative list for {product.name}</div>
                 <ArrowRight className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
               </Link>
            </div>
          </section>

          {/* 6. COMPARISONS (Real Links) */}
          <section id="comparisons">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Popular Comparisons</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link href={`/compare/${product.slug}-vs-chatgpt`} className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm hover:border-emerald-500 transition-all flex items-center justify-between group text-white">
                 <div className="font-bold text-lg">
                   {product.name} <span className="text-slate-500 font-normal px-2">VS</span> ChatGPT
                 </div>
                 <ArrowRight className="text-emerald-500 group-hover:translate-x-1 transition-all" />
               </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
