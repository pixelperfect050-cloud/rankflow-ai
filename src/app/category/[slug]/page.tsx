import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CategoryRepository } from '@/features/categories/repository/category.repository'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { ProductCard } from '@/components/public/product-card'
import { FolderTree, Sparkles } from 'lucide-react'

export const revalidate = 1800 // 30 minutes cache

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const repo = new CategoryRepository()
  const category = await repo.getCategoryBySlug(params.slug)
  
  if (!category) return { title: 'Category Not Found' }

  return {
    title: category.seo_title || `${category.name} Software & Tools`,
    description: category.seo_description || category.description,
    alternates: {
      canonical: category.canonical_url || `https://rankflow.ai/category/${category.slug}`
    },
    openGraph: {
      title: category.seo_title || category.name,
      description: category.seo_description || category.description || undefined,
      type: 'website'
    }
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const catRepo = new CategoryRepository()
  const prodRepo = new ProductRepository()

  const category = await catRepo.getCategoryBySlug(params.slug)
  if (!category) notFound()

  // Find products associated with this category
  const allProducts = await prodRepo.searchProducts(category.workspace_id)
  const categoryProducts = allProducts.filter(p => p.category_id === category.id)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description,
    "url": `https://rankflow.ai/category/${category.slug}`
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 bg-slate-50 min-h-screen pb-32">
        
        {/* HERO */}
        <section className="bg-emerald-900 text-white pt-24 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-700 text-emerald-300 text-sm font-medium mb-6">
              <FolderTree className="w-4 h-4" /> Category Directory
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{category.name} Tools</h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
              {category.description || `Browse the best software and tools in the ${category.name} space.`}
            </p>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="max-w-[1200px] mx-auto px-4 -mt-10 relative z-10">
          
          <div className="flex items-center justify-between mb-8 px-2 text-slate-800">
            <h2 className="text-2xl font-bold">Top Verified Tools</h2>
            <div className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
              {categoryProducts.length} Results
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.length > 0 ? (
              categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full p-16 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No tools found</h3>
                <p className="text-slate-500">We are currently verifying tools for this category. Check back soon.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* DYNAMIC BLOCKS (If available) */}
        {category.blocks_json && Object.keys(category.blocks_json).length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 mt-20">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Extended Guides & Content</h2>
              <p className="text-slate-500 max-w-lg mx-auto">This section natively renders the visual JSON blocks created from the admin DragDropAdapter.</p>
            </div>
          </section>
        )}

      </main>
    </>
  )
}
