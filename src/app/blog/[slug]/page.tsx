import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArticleRepository } from '@/features/articles/repository/article.repository'
import { Calendar, Clock, Share2, ChevronRight, MessageCircle, Link as LinkIcon, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const revalidate = 3600 // 1 hour cache

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const repo = new ArticleRepository()
  const article = await repo.getArticleBySlug(params.slug)
  
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    alternates: {
      canonical: `https://rankflow.ai/blog/${article.slug}`
    },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || undefined,
      type: 'article',
      publishedTime: article.published_at || undefined,
      authors: [article.author_id || "RankFlow Team"]
    }
  }
}

export default async function SingleBlogPage({ params }: PageProps) {
  const repo = new ArticleRepository()
  const article = await repo.getArticleBySlug(params.slug)
  
  if (!article) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.published_at,
    "author": [{
        "@type": "Person",
        "name": article.author_id || "RankFlow Team"
    }]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 bg-white relative">
        <div className="reading-progress w-[0%]" />

        <article className="pb-16">
          {/* Header */}
          <header className="pt-12 pb-10 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link href="/" className="hover:text-slate-900">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/blog" className="hover:text-slate-900">Blog</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-slate-900 font-medium truncate">{article.title}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-t border-slate-200">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="hidden sm:flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Published {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Draft'}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-12">
             <div className="article-content max-w-3xl prose prose-slate prose-emerald">
               {/* 
                 For a real system, you'd use a markdown/HTML parser here. 
                 Since content is HTML from the editor, we use dangerouslySetInnerHTML safely.
               */}
               <div dangerouslySetInnerHTML={{ __html: article.content_html || '<p>No content provided.</p>' }} />
             </div>
          </div>
        </article>
      </main>
    </>
  )
}
