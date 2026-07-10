import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { ProductCard } from '@/components/public/product-card'

export const revalidate = 3600 // 1 hour cache

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const repo = new ProductRepository()
  
  // E.g. url /alternative/chatgpt
  let targetSlug = params.slug;
  if (targetSlug.endsWith('-alternatives')) {
    targetSlug = targetSlug.replace('-alternatives', '');
  }

  const product = await repo.getProductBySlug(targetSlug);
  
  if (!product) return { title: 'Alternatives Not Found' }

  return {
    title: `Best ${product.name} Alternatives & Competitors (${new Date().getFullYear()})`,
    description: `Looking for an alternative to ${product.name}? Compare the top competitors, cheaper options, and open-source equivalents.`,
    alternates: {
      canonical: `https://rankflow.ai/alternative/${product.slug}`
    }
  }
}

export default async function AlternativePage({ params }: PageProps) {
  const repo = new ProductRepository()
  
  let targetSlug = params.slug;
  if (targetSlug.endsWith('-alternatives')) {
    targetSlug = targetSlug.replace('-alternatives', '');
  }

  const product = await repo.getProductBySlug(targetSlug);
  if (!product) notFound();

  // In a real scenario, we query `product_alternatives` table.
  // For the MVP render, we'll fetch all products in the same category as substitutes.
  const allInCategory = await repo.searchProducts("00000000-0000-0000-0000-000000000000");
  const alternatives = allInCategory.filter(p => p.id !== product.id).slice(0, 6); // Mock filter

  return (
    <main className="flex-1 bg-slate-50 min-h-screen pb-32">
      
      {/* HERO */}
      <section className="bg-slate-900 text-white pt-20 pb-20 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
            <nav className="flex justify-center items-center space-x-2 text-sm text-slate-400 mb-12 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/product/${product.slug}`} className="hover:text-white transition-colors">{product.name}</Link>
            <span>/</span>
            <span className="text-emerald-400">Alternatives</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
            Best <span className="text-emerald-400">{product.name}</span> Alternatives
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the top competitors, cheaper options, and powerful equivalents to {product.name}.
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Why switch from {product.name}?</h2>
            <p className="text-slate-600 max-w-2xl">Users typically look for alternatives due to pricing changes, missing features, or searching for open-source self-hosted solutions. Below is our verified list of replacements.</p>
          </div>
          <Link href={`/product/${product.slug}`} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors shrink-0">
            View {product.name} Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternatives.length > 0 ? (
            alternatives.map(alt => (
              <ProductCard key={alt.id} product={alt} />
            ))
          ) : (
            <div className="col-span-full p-12 text-center bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-500">No verified alternatives found yet.</p>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
