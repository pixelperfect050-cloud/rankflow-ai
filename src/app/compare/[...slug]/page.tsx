import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { ArrowRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react'

export const revalidate = 3600 // 1 hour cache

interface PageProps {
  params: {
    slug: string[]
  }
}

// Parses URL like /compare/chatgpt-vs-claude
function parseCompareSlugs(slugPath: string[]): { slugA: string; slugB: string } | null {
  if (!slugPath || slugPath.length === 0) return null;
  const fullSlug = slugPath.join('/');
  const parts = fullSlug.split('-vs-');
  if (parts.length !== 2) return null;
  return { slugA: parts[0], slugB: parts[1] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const parsed = parseCompareSlugs(params.slug);
  if (!parsed) return { title: 'Invalid Comparison' };

  const repo = new ProductRepository()
  const pA = await repo.getProductBySlug(parsed.slugA);
  const pB = await repo.getProductBySlug(parsed.slugB);

  if (!pA || !pB) return { title: 'Comparison Not Found' }

  return {
    title: `${pA.name} vs ${pB.name}: Which is better in ${new Date().getFullYear()}?`,
    description: `A detailed, head-to-head comparison between ${pA.name} and ${pB.name}. Compare pricing, features, user reviews, and alternatives.`,
    alternates: {
      canonical: `https://rankflow.ai/compare/${parsed.slugA}-vs-${parsed.slugB}`
    }
  }
}

export default async function ComparePage({ params }: PageProps) {
  const parsed = parseCompareSlugs(params.slug);
  if (!parsed) notFound();

  const repo = new ProductRepository()
  const pA = await repo.getProductBySlug(parsed.slugA);
  const pB = await repo.getProductBySlug(parsed.slugB);

  if (!pA || !pB) notFound();

  const pricingA = await repo.getPricingPlans(pA.id);
  const pricingB = await repo.getPricingPlans(pB.id);

  // JSON-LD for ItemList / Comparison
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${pA.name} vs ${pB.name}`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": pA.name,
          "url": `https://rankflow.ai/product/${pA.slug}`
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "SoftwareApplication",
          "name": pB.name,
          "url": `https://rankflow.ai/product/${pB.slug}`
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 bg-slate-50 min-h-screen pb-32">
        
        {/* HERO */}
        <section className="bg-slate-900 text-white pt-20 pb-20 px-4">
          <div className="max-w-[1200px] mx-auto text-center">
             <nav className="flex justify-center items-center space-x-2 text-sm text-slate-400 mb-12 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-emerald-400">{pA.name} vs {pB.name}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
              {pA.name} <span className="text-slate-500 font-normal">vs</span> {pB.name}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A complete head-to-head comparison of features, pricing, and performance for {new Date().getFullYear()}.
            </p>
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section className="max-w-[1200px] mx-auto px-4 -mt-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* PRODUCT A */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8 text-center border-b border-slate-100 bg-slate-50">
                <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-sm border border-slate-200">
                  {pA.name.charAt(0)}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{pA.name}</h2>
                <p className="text-slate-500 mb-6 h-12">{pA.tagline}</p>
                <Link href={`/product/${pA.slug}`} className="inline-block w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                  View Full Profile
                </Link>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Starting Price</div>
                  <div className="text-2xl font-bold text-slate-900">{pricingA?.[0] ? `$${pricingA[0].price}/${pricingA[0].billing_cycle}` : 'Free Tier'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Platforms</div>
                  <div className="text-lg font-medium text-slate-700">{pA.platforms?.join(', ') || 'Web'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">API Available</div>
                  <div className="text-lg font-medium text-slate-700">{pA.api_available ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

            {/* PRODUCT B */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-8 text-center border-b border-slate-100 bg-slate-50">
                <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-sm border border-slate-200">
                  {pB.name.charAt(0)}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{pB.name}</h2>
                <p className="text-slate-500 mb-6 h-12">{pB.tagline}</p>
                <Link href={`/product/${pB.slug}`} className="inline-block w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  View Full Profile
                </Link>
              </div>
              <div className="p-8 space-y-6">
                 <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Starting Price</div>
                  <div className="text-2xl font-bold text-slate-900">{pricingB?.[0] ? `$${pricingB[0].price}/${pricingB[0].billing_cycle}` : 'Free Tier'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Platforms</div>
                  <div className="text-lg font-medium text-slate-700">{pB.platforms?.join(', ') || 'Web'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">API Available</div>
                  <div className="text-lg font-medium text-slate-700">{pB.api_available ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  )
}
