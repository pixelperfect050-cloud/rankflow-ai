import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { 
  CheckCircle2, XCircle, ArrowRight, Star, ExternalLink, Activity, 
  Zap, Brain, Code, Globe, MessageSquare, ShieldCheck, Bookmark,
  Share, Check, X, ChevronDown, User, ArrowUpRight
} from 'lucide-react'
import { Product } from '@/types'

export const revalidate = 3600

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const repo = new ProductRepository()
  const product = await repo.getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} Reviews, Pricing, and Alternatives`,
    description: product.tagline || product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const repo = new ProductRepository()
  const product = await repo.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="flex-1 bg-slate-50 min-h-screen pb-32">
      
      {/* 1. SPLIT HERO */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-400 font-bold mb-10 uppercase tracking-widest">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-indigo-600 transition-colors">AI Assistant</Link>
            <span>/</span>
            <span className="text-indigo-600">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Product Info */}
            <div>
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 bg-slate-50 rounded-[24px] border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <span className="text-4xl font-black text-indigo-600">{product.name.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100 flex items-center gap-1">
                      Trending
                    </span>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
                      Freemium
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200">
                      API
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed max-w-lg">
                {product.tagline || 'The ultimate tool to scale your workflow and boost productivity effortlessly.'}
              </p>

              <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
                  <div className="text-3xl font-black text-slate-900">9.6</div>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Editor's Score</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-slate-900">420+</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">User Reviews</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href={product.website_url || '#'} className="px-8 py-4 bg-indigo-600 text-white rounded-[16px] font-bold text-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2">
                  Visit Website <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#pricing" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-[16px] font-bold text-lg hover:bg-slate-50 transition-colors">
                  View Pricing
                </a>
              </div>
            </div>

            {/* Right: Feature Preview Cards (No fake laptop) */}
            <div className="hidden lg:flex flex-col gap-4 pl-12">
              <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-[24px] hover:shadow-md hover:border-indigo-200 transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-[16px] flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Lightning Fast</h3>
                    <p className="text-sm font-medium text-slate-500">Zero latency responses.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-[24px] hover:shadow-md hover:border-indigo-200 transition-all transform hover:-translate-y-1 ml-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-[16px] flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">GPT-4 Powered</h3>
                    <p className="text-sm font-medium text-slate-500">State of the art intelligence.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-[24px] hover:shadow-md hover:border-indigo-200 transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-[16px] flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">API Available</h3>
                    <p className="text-sm font-medium text-slate-500">Integrate anywhere easily.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LAYOUT: MAIN CONTENT + STICKY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Left, 70%) */}
          <div className="w-full lg:w-[70%] space-y-24">
            
            {/* Quick Stats Mini Cards */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col items-center text-center">
                <span className="text-2xl mb-1">⭐</span>
                <span className="font-black text-slate-900 text-lg">5.0</span>
                <span className="text-xs font-bold text-slate-500 uppercase">420 Reviews</span>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col items-center text-center">
                <span className="text-2xl mb-1">💲</span>
                <span className="font-black text-slate-900 text-lg">Freemium</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Pricing</span>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🌍</span>
                <span className="font-black text-slate-900 text-lg">Web, Mac</span>
                <span className="text-xs font-bold text-slate-500 uppercase">Platforms</span>
              </div>
              <div className="p-5 bg-white border border-slate-200 rounded-[20px] shadow-sm flex flex-col items-center text-center">
                <span className="text-2xl mb-1">🧩</span>
                <span className="font-black text-slate-900 text-lg">Yes</span>
                <span className="text-xs font-bold text-slate-500 uppercase">API Access</span>
              </div>
            </section>

            {/* Overview & Who is this for */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6">Overview</h2>
                <div className="prose prose-slate prose-lg font-medium text-slate-600 leading-relaxed">
                  <p>{product.description || `Read our comprehensive overview of ${product.name}. This tool is designed to help you streamline operations, improve efficiency, and build faster with cutting-edge technology.`}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6">Who is this for?</h3>
                <ul className="space-y-4">
                  {['Students & Educators', 'Product Designers', 'Software Developers', 'Marketing Agencies', 'Enterprise Teams'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Features Grid */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: 'Ultra Fast', desc: 'Optimized for speed.' },
                  { icon: Brain, title: 'AI Automation', desc: 'Smart workflows.' },
                  { icon: Code, title: 'API Access', desc: 'Developer friendly.' },
                  { icon: Globe, title: 'Cloud Sync', desc: 'Access anywhere.' },
                  { icon: MessageSquare, title: 'Live Support', desc: '24/7 assistance.' },
                  { icon: ShieldCheck, title: 'Enterprise Security', desc: 'SOC2 compliant.' }
                ].map((f, i) => (
                  <div key={i} className="p-6 bg-white border border-slate-200 rounded-[20px]">
                    <f.icon className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-sm font-medium text-slate-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Placeholder */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Interface Gallery</h2>
              <div className="aspect-[16/9] bg-slate-900 rounded-[24px] flex items-center justify-center text-slate-600 border border-slate-800 shadow-xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                <span className="font-bold text-lg relative z-10 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" /> Screenshot Gallery Placeholder
                </span>
              </div>
            </section>

            {/* Pricing (Stripe Style) */}
            <section id="pricing">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Pricing Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Starter */}
                <div className="bg-white p-8 rounded-[24px] border border-slate-200 flex flex-col">
                  <h3 className="font-black text-xl text-slate-900 mb-2">Starter</h3>
                  <div className="text-4xl font-black text-slate-900 mb-1">$0</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Forever Free</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Basic features', '1 User', 'Community Support'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-[14px] transition-colors">Start Free</button>
                </div>

                {/* Pro (Most Popular) */}
                <div className="bg-white p-8 rounded-[24px] border-2 border-indigo-500 shadow-xl relative flex flex-col transform md:-translate-y-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                  <h3 className="font-black text-xl text-indigo-600 mb-2">Pro</h3>
                  <div className="text-4xl font-black text-slate-900 mb-1">$29</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Per month</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Everything in Starter', 'Unlimited Projects', 'Priority Support', 'Advanced Analytics', 'Custom Domains'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-900 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[14px] transition-colors shadow-md">Upgrade to Pro</button>
                </div>

                {/* Enterprise */}
                <div className="bg-white p-8 rounded-[24px] border border-slate-200 flex flex-col">
                  <h3 className="font-black text-xl text-slate-900 mb-2">Enterprise</h3>
                  <div className="text-4xl font-black text-slate-900 mb-1">Custom</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Contact Sales</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Everything in Pro', 'Dedicated Success Manager', 'SSO & SAML', 'Custom Contracts'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-[14px] transition-colors">Contact Us</button>
                </div>

              </div>
            </section>

            {/* Pros & Cons */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[24px] border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">👍</span> Pros
                </h3>
                <ul className="space-y-4">
                  {['Incredibly intuitive interface', 'Fastest performance in its class', 'Excellent customer support', 'Generous free tier'].map((p, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 rounded-[24px] border border-red-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center">👎</span> Cons
                </h3>
                <ul className="space-y-4">
                  {['Steep learning curve for advanced features', 'Mobile app lacks some desktop tools', 'Enterprise pricing is opaque'].map((c, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 font-medium">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Alternatives (Mini Cards) */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900">Alternatives</h2>
                <Link href={`/alternative/${product.slug}`} className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Claude', 'Gemini', 'Perplexity'].map((alt, i) => (
                  <Link key={i} href={`/product/${alt.toLowerCase()}`} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-[16px] hover:border-indigo-400 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 bg-slate-50 rounded-[12px] flex items-center justify-center font-black text-slate-900 group-hover:text-indigo-600">{alt[0]}</div>
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600">{alt}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase">View Product</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Compare (VS Cards) */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Compare</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Claude', 'Perplexity'].map((comp, i) => (
                  <Link key={i} href={`/compare/${product.slug}-vs-${comp.toLowerCase()}`} className="p-6 bg-slate-900 border border-slate-800 rounded-[20px] shadow-sm hover:border-indigo-500 transition-all flex items-center justify-between group text-white">
                    <div className="font-black text-lg">
                      {product.name} <span className="text-slate-500 font-normal px-2">VS</span> {comp}
                    </div>
                    <ArrowRight className="text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Verified Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Sarah Jenkins', role: 'Product Manager', quote: 'This tool completely changed how our team ships features. The API is flawless.' },
                  { name: 'Marcus Chen', role: 'Lead Developer', quote: 'I was skeptical at first, but the performance is unmatched. Worth every penny of the Pro plan.' }
                ].map((rev, i) => (
                  <div key={i} className="bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm">
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-700 font-medium mb-6">"{rev.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                        {rev.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{rev.name}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'Is there a free trial available?', a: 'Yes, there is a generous forever-free tier available that requires no credit card.' },
                  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel from your billing dashboard with one click.' },
                  { q: 'Do you offer enterprise support?', a: 'Yes, our Enterprise plan includes a dedicated success manager and 24/7 priority support.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-6 hover:border-indigo-200 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900">{faq.q}</h4>
                      <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Sidebar (30%) */}
          <div className="w-full lg:w-[30%] hidden lg:block">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-[24px] shadow-lg p-6">
              
              <a href={product.website_url || '#'} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[16px] shadow-md transition-colors flex justify-center items-center gap-2 mb-4">
                Visit Website <ArrowUpRight className="w-5 h-5" />
              </a>

              <div className="flex gap-2 mb-8">
                <button className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[14px] font-bold text-slate-700 text-sm flex justify-center items-center gap-2 transition-colors">
                  <Bookmark className="w-4 h-4" /> Save
                </button>
                <button className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[14px] font-bold text-slate-700 text-sm flex justify-center items-center gap-2 transition-colors">
                  <Share className="w-4 h-4" /> Share
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase">Starting Price</span>
                  <span className="font-black text-slate-900">Free</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase">Category</span>
                  <Link href="/categories" className="font-bold text-indigo-600 hover:underline">AI Assistant</Link>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase">Platforms</span>
                  <span className="font-bold text-slate-900">Web, Mac, iOS</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-bold text-slate-400 uppercase">Last Updated</span>
                  <span className="font-bold text-slate-900">Today</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-[16px] border border-slate-100 text-xs font-medium text-slate-500 text-center">
                <strong>Affiliate Disclosure:</strong> We may earn a commission if you purchase through our links. This helps keep RankFlow AI free.
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 lg:hidden z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex gap-2">
        <a href={product.website_url || '#'} className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-[16px] shadow-md text-center flex justify-center items-center gap-2">
          Visit Website <ArrowUpRight className="w-5 h-5" />
        </a>
        <button className="w-14 h-14 bg-slate-100 text-slate-700 rounded-[16px] font-bold flex justify-center items-center shrink-0">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

    </main>
  )
}
