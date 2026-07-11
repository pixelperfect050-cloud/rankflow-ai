import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Sparkles, Tag, TrendingUp } from 'lucide-react'

export const revalidate = 3600

const BLOG_POSTS = [
  {
    slug: 'best-ai-tools-2026',
    title: '50+ Best AI Tools in 2026: The Ultimate Guide',
    excerpt: 'Discover the most powerful AI tools that are transforming how we work, create, and build. From writing assistants to code generators, here are the top picks.',
    category: 'Roundup',
    readTime: '12 min read',
    date: 'Jul 8, 2026',
    featured: true,
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    slug: 'chatgpt-vs-claude-complete-guide',
    title: 'ChatGPT vs Claude: The Complete Comparison Guide (2026)',
    excerpt: 'We tested both AI assistants head-to-head across 15 different tasks. Here are the results, and which one you should actually use.',
    category: 'Comparisons',
    readTime: '10 min read',
    date: 'Jul 5, 2026',
    featured: true,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'ai-tools-for-productivity',
    title: '10 AI Tools That Will 10x Your Productivity in 2026',
    excerpt: 'Stop wasting time on repetitive tasks. These AI-powered tools will automate your workflow and save you 20+ hours per week.',
    category: 'Productivity',
    readTime: '8 min read',
    date: 'Jul 2, 2026',
    featured: true,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'best-free-ai-tools',
    title: '25 Best Free AI Tools You Should Be Using Right Now',
    excerpt: 'You don\'t need to spend a fortune to access powerful AI. Here are the best free AI tools available today, from writing to design to coding.',
    category: 'Roundup',
    readTime: '9 min read',
    date: 'Jun 28, 2026',
    featured: false,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    slug: 'ai-tools-for-marketing',
    title: 'How to Use AI for Marketing: 15 Tools That Actually Work',
    excerpt: 'AI is revolutionizing digital marketing. Learn which tools top marketers use for content creation, SEO, social media, and analytics.',
    category: 'Marketing',
    readTime: '11 min read',
    date: 'Jun 25, 2026',
    featured: false,
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    slug: 'best-ai-coding-tools',
    title: 'Best AI Coding Tools: Cursor vs GitHub Copilot vs Windsurf',
    excerpt: 'AI-powered code editors are changing how developers write software. We compare the top three options to help you choose the best one.',
    category: 'Development',
    readTime: '10 min read',
    date: 'Jun 22, 2026',
    featured: false,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    slug: 'ai-for-small-business',
    title: 'AI for Small Business: A Complete Beginner\'s Guide',
    excerpt: 'Small businesses can now compete with enterprises using AI. Here\'s how to leverage AI tools for customer service, marketing, and operations.',
    category: 'Guide',
    readTime: '8 min read',
    date: 'Jun 18, 2026',
    featured: false,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    slug: 'ai-content-creation-tools',
    title: 'Best AI Content Creation Tools for Bloggers and Creators',
    excerpt: 'Content creation just got easier. These AI tools help you write blog posts, social media captions, video scripts, and more in minutes.',
    category: 'Content',
    readTime: '7 min read',
    date: 'Jun 15, 2026',
    featured: false,
    gradient: 'from-amber-500 to-yellow-600',
  },
]

export default function BlogListingPage() {
  const featured = BLOG_POSTS.filter(p => p.featured)
  const rest = BLOG_POSTS.filter(p => !p.featured)

  return (
    <main className="flex-1 bg-[#fafbfc] min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbfc] to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80 font-medium mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Blog & Guides
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Resources</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Expert guides, tool comparisons, and productivity tips to help you work smarter with AI.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-3xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="relative text-center px-6">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h2 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-bold group-hover:gap-2.5 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">All Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-5 p-6 bg-white rounded-2xl border border-slate-200/60 hover:border-indigo-200/60 hover:shadow-lg transition-all duration-300">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${post.gradient} flex items-center justify-center shrink-0`}>
                <Tag className="w-8 h-8 text-white/80" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 uppercase tracking-wider">{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-slate-500 font-medium line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}
