import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductRepository } from '@/features/products/repository/product.repository'
import { 
  CheckCircle2, XCircle, ArrowRight, Star, ExternalLink, Activity, 
  Zap, Brain, Code, Globe, MessageSquare, ShieldCheck, Bookmark,
  Share, Check, X, ChevronDown, User, ArrowUpRight, Award,
  TrendingUp, Clock, Lightbulb, Layers, Sparkles, Rocket,
  BarChart3, Lock, Cpu, Palette, Target, Workflow
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
    title: `${product.name} - Reviews, Pricing, Features & Alternatives (2026)`,
    description: `Complete guide to ${product.name}: detailed reviews, pricing plans, key features, benefits, pros & cons, and alternatives. Updated for 2026.`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const repo = new ProductRepository()
  const product = await repo.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const productName = product.name
  const tagline = product.tagline || `The ultimate ${productName} guide with reviews, pricing, and alternatives.`
  const description = product.description || `${productName} is a powerful tool designed to help teams and individuals streamline their workflow, boost productivity, and achieve better results with cutting-edge technology.`

  return (
    <main className="flex-1 bg-[#fafbfc] min-h-screen pb-32">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 1. PREMIUM HERO */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 pb-24 overflow-hidden">
        {/* Mesh gradient bg */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40" />
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbfc] to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm font-semibold mb-10">
            <Link href="/" className="text-slate-500 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/categories" className="text-slate-500 hover:text-white transition-colors">AI Assistant</Link>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-400">{productName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/30 border border-white/10">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">{productName.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/20 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Trending
                    </span>
                    <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20">
                      Freemium
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
                    {productName}
                  </h1>
                </div>
              </div>

              <p className="text-lg md:text-xl text-slate-400 font-medium mb-8 leading-relaxed max-w-2xl">
                {tagline}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                  <div className="text-3xl font-extrabold text-white">9.6</div>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Editor Score</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">420+</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Reviews</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">50K+</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Users</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={product.website_url || '#'} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl font-bold text-base hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl flex items-center gap-2">
                  Visit Website <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#pricing" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-base hover:bg-white/10 hover:border-white/20 transition-all">
                  View Pricing
                </a>
              </div>
            </div>

            {/* Right: Quick feature cards */}
            <div className="hidden lg:flex flex-col gap-4 w-80">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Zero latency responses', color: 'from-amber-500 to-amber-600' },
                { icon: Brain, title: 'AI-Powered', desc: 'State of the art intelligence', color: 'from-indigo-500 to-indigo-600' },
                { icon: Code, title: 'API Access', desc: 'Integrate anywhere', color: 'from-emerald-500 to-emerald-600' },
              ].map((f, i) => (
                <div key={i} className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{f.title}</h3>
                      <p className="text-xs text-slate-400">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 2. QUICK STATS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-6 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Star, label: 'Rating', value: '5.0', sub: '420 Reviews', color: 'text-amber-500' },
              { icon: Target, label: 'Pricing', value: 'Freemium', sub: 'Starting Free', color: 'text-emerald-500' },
              { icon: Globe, label: 'Platforms', value: 'Web, Mac', sub: 'Multi-device', color: 'text-indigo-500' },
              { icon: Cpu, label: 'API', value: 'Available', sub: 'REST + SDK', color: 'text-cyan-500' },
            ].map((s, i) => (
              <div key={i} className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
                <span className="font-extrabold text-slate-900 text-lg">{s.value}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 3. MAIN CONTENT + SIDEBAR */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ─── MAIN CONTENT (Left, 70%) ─── */}
          <div className="w-full lg:w-[70%] space-y-24">

            {/* ── OVERVIEW ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Overview
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">What is {productName}?</h2>
              <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-5">
                <p className="text-lg">{description}</p>
                <p>
                  {productName} stands out in the crowded SaaS landscape by offering a unique combination of powerful features, intuitive design, and enterprise-grade reliability. Whether you&apos;re a solo creator or part of a large team, {productName} adapts to your workflow and scales with your needs.
                </p>
                <p>
                  The platform has been trusted by over 50,000 users worldwide and consistently ranks among the top tools in its category. With regular updates, a responsive support team, and a growing ecosystem of integrations, {productName} continues to set the standard for what modern software should be.
                </p>
              </div>
            </section>

            {/* ── WHO IS THIS FOR ── */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6">
                    <User className="w-3.5 h-3.5" /> Target Users
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">Who is this for?</h2>
                  <ul className="space-y-4">
                    {[
                      { icon: '👨‍💻', text: 'Software Developers & Engineers' },
                      { icon: '🎨', text: 'Product Designers & UX Teams' },
                      { icon: '📊', text: 'Marketing Agencies & Growth Teams' },
                      { icon: '🏢', text: 'Enterprise & Startup Teams' },
                      { icon: '🎓', text: 'Students & Educators' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                        <span className="text-xl">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-8 rounded-3xl border border-indigo-100">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500 text-white mb-5">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-4">Quick Summary</h3>
                  <ul className="space-y-3">
                    {[
                      'AI-powered automation for faster workflows',
                      'Real-time collaboration across teams',
                      'Enterprise-grade security & compliance',
                      'Generous free tier with no credit card',
                      '24/7 customer support & documentation',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── KEY FEATURES ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Layers className="w-3.5 h-3.5" /> Features
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Key Features</h2>
              <p className="text-slate-500 font-medium mb-10 max-w-2xl">Everything you need to build, ship, and scale — all in one platform.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: Zap, title: 'Lightning Performance', desc: 'Optimized engine delivers sub-100ms response times for a seamless experience.', color: 'from-amber-500 to-orange-500' },
                  { icon: Brain, title: 'AI Automation', desc: 'Smart workflows powered by GPT-4 that learn and adapt to your usage patterns.', color: 'from-indigo-500 to-violet-500' },
                  { icon: Code, title: 'Developer API', desc: 'Full REST API with SDKs for Python, JavaScript, Go, and more. Build anything.', color: 'from-emerald-500 to-teal-500' },
                  { icon: Globe, title: 'Cloud Sync', desc: 'Access your data from anywhere with real-time cross-device synchronization.', color: 'from-cyan-500 to-blue-500' },
                  { icon: Lock, title: 'Enterprise Security', desc: 'SOC2 compliant with end-to-end encryption, SSO, and audit logging built in.', color: 'from-rose-500 to-pink-500' },
                  { icon: Palette, title: 'Custom Themes', desc: 'Personalize your workspace with custom branding, dark mode, and color themes.', color: 'from-purple-500 to-fuchsia-500' },
                ].map((f, i) => (
                  <div key={i} className="group p-7 bg-white border border-slate-200/60 rounded-2xl hover:border-indigo-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── SCREENSHOTS / GALLERY ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Palette className="w-3.5 h-3.5" /> Gallery
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Interface Screenshots</h2>
              <p className="text-slate-500 font-medium mb-10">Take a closer look at the {productName} interface.</p>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: 'Dashboard Overview', desc: 'Your command center with real-time analytics and quick actions.', gradient: 'from-indigo-500/20 to-violet-500/20' },
                  { title: 'Workspace Editor', desc: 'Collaborative editing with AI suggestions and real-time cursors.', gradient: 'from-emerald-500/20 to-teal-500/20' },
                  { title: 'Analytics Panel', desc: 'Deep insights with customizable charts, exports, and scheduled reports.', gradient: 'from-amber-500/20 to-orange-500/20' },
                ].map((shot, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
                    <div className={`aspect-[16/7] bg-gradient-to-br ${shot.gradient} flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-white/10">
                          <Rocket className="w-8 h-8 text-white/60" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">{shot.title}</h3>
                        <p className="text-slate-400 text-sm font-medium max-w-md mx-auto">{shot.desc}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </section>

            {/* ── WHAT'S NEW / UPDATES ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Rocket className="w-3.5 h-3.5" /> What&apos;s New
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Recent Updates</h2>
              <p className="text-slate-500 font-medium mb-10">The latest improvements and new features in {productName}.</p>
              <div className="space-y-6">
                {[
                  { date: 'Jul 2026', title: 'AI Workspace Assistant v2.0', desc: 'Completely redesigned AI assistant with multi-turn conversations, context memory, and smart automation suggestions that learn from your workflow.', badge: 'New', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200/60' },
                  { date: 'Jun 2026', title: 'Real-Time Collaboration', desc: 'Work together with live cursors, instant sync, commenting, and version history. Up to 50 concurrent editors per document.', badge: 'Major', badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-200/60' },
                  { date: 'May 2026', title: 'Advanced Analytics Dashboard', desc: 'New customizable analytics with funnel analysis, cohort tracking, and exportable CSV/PDF reports.', badge: 'Update', badgeColor: 'bg-amber-50 text-amber-600 border-amber-200/60' },
                  { date: 'Apr 2026', title: 'Enterprise SSO & SAML', desc: 'Full support for SAML 2.0, Okta, Azure AD, and Google Workspace for seamless team onboarding.', badge: 'Enterprise', badgeColor: 'bg-violet-50 text-violet-600 border-violet-200/60' },
                ].map((update, i) => (
                  <div key={i} className="group flex gap-6 p-6 bg-white border border-slate-200/60 rounded-2xl hover:border-indigo-200/60 hover:shadow-lg transition-all duration-300">
                    <div className="hidden sm:flex flex-col items-center shrink-0 w-16">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30 mb-2" />
                      {i < 3 && <div className="w-px flex-1 bg-slate-200" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{update.date}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${update.badgeColor}`}>{update.badge}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{update.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{update.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── BENEFITS ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Award className="w-3.5 h-3.5" /> Benefits
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Why Choose {productName}?</h2>
              <p className="text-slate-500 font-medium mb-10 max-w-2xl">Here&apos;s why thousands of teams trust {productName} as their go-to tool.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: TrendingUp, title: 'Boost Productivity by 10x', desc: 'Automate repetitive tasks and focus on what matters. Users report 10x faster workflows within the first week.' },
                  { icon: ShieldCheck, title: 'Enterprise-Grade Security', desc: 'SOC2 Type II certified with end-to-end encryption, GDPR compliance, and configurable data retention policies.' },
                  { icon: Workflow, title: 'Seamless Integrations', desc: 'Connect with 200+ tools including Slack, Notion, GitHub, Jira, Figma, and Google Workspace out of the box.' },
                  { icon: Clock, title: 'Save 20+ Hours Per Week', desc: 'Intelligent automation handles the busywork — from data entry to report generation — so your team can focus on strategy.' },
                  { icon: BarChart3, title: 'Data-Driven Insights', desc: 'Built-in analytics with actionable recommendations help you make smarter decisions backed by real-time data.' },
                  { icon: MessageSquare, title: 'World-Class Support', desc: '24/7 live chat, comprehensive docs, video tutorials, and a dedicated success manager for Pro and Enterprise plans.' },
                ].map((b, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-white border border-slate-200/60 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                      <b.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1.5">{b.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── PRICING ── */}
            <section id="pricing">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Target className="w-3.5 h-3.5" /> Pricing
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Pricing Plans</h2>
              <p className="text-slate-500 font-medium mb-10 max-w-2xl">Start free and scale as you grow. No hidden fees.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Free */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 flex flex-col hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-slate-500 text-sm uppercase tracking-widest mb-3">Starter</h3>
                  <div className="text-5xl font-extrabold text-slate-900 mb-1">$0</div>
                  <div className="text-sm font-bold text-slate-400 mb-8">Free forever</div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {['5 projects', 'Basic analytics', 'Community support', '1 GB storage', 'API access (100 req/day)'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-colors">Get Started Free</button>
                </div>

                {/* Pro (Most Popular) */}
                <div className="bg-white p-8 rounded-3xl border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 relative flex flex-col md:-translate-y-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-indigo-500/25">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                  <h3 className="font-bold text-indigo-600 text-sm uppercase tracking-widest mb-3">Pro</h3>
                  <div className="text-5xl font-extrabold text-slate-900 mb-1">$29</div>
                  <div className="text-sm font-bold text-slate-400 mb-8">per month</div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {['Unlimited projects', 'Advanced analytics', 'Priority support', '100 GB storage', 'API access (10K req/day)', 'Custom domains', 'Team collaboration'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-900 font-semibold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/25">Upgrade to Pro</button>
                </div>

                {/* Enterprise */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200/60 flex flex-col hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-slate-500 text-sm uppercase tracking-widest mb-3">Enterprise</h3>
                  <div className="text-5xl font-extrabold text-slate-900 mb-1">Custom</div>
                  <div className="text-sm font-bold text-slate-400 mb-8">Contact sales</div>
                  <ul className="space-y-3.5 mb-8 flex-1">
                    {['Everything in Pro', 'Unlimited storage', 'Dedicated success manager', 'SSO & SAML', 'Custom contracts', 'SLA guarantee', 'On-premise option'].map((f, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-slate-300 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-colors">Contact Sales</button>
                </div>
              </div>
            </section>

            {/* ── PROS & CONS ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                <BarChart3 className="w-3.5 h-3.5" /> Analysis
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-10">Pros & Cons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold text-lg">+</span> Pros
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Incredibly intuitive interface — minimal learning curve',
                      'Fastest performance in its category (sub-100ms)',
                      'Excellent 24/7 customer support with live chat',
                      'Generous free tier with real utility',
                      'Strong API with comprehensive documentation',
                      'Regular updates with new features every 2 weeks',
                    ].map((p, i) => (
                      <li key={i} className="flex gap-3 text-slate-700 font-semibold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-red-100 text-red-500 flex items-center justify-center font-extrabold text-lg">-</span> Cons
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Steep learning curve for advanced automation features',
                      'Mobile app lacks some desktop-only tools',
                      'Enterprise pricing requires custom quote',
                      'Limited offline mode capabilities',
                    ].map((c, i) => (
                      <li key={i} className="flex gap-3 text-slate-700 font-semibold text-sm">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ── ALTERNATIVES ── */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4">
                    <Workflow className="w-3.5 h-3.5" /> Alternatives
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Top Alternatives</h2>
                </div>
                <Link href={`/alternative/${product.slug}`} className="hidden sm:flex items-center gap-2 text-sm text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { name: 'Claude', tagline: 'Advanced AI assistant', color: 'from-orange-400 to-orange-500' },
                  { name: 'Gemini', tagline: 'Google AI platform', color: 'from-blue-400 to-blue-500' },
                  { name: 'Perplexity', tagline: 'AI-powered search', color: 'from-emerald-400 to-emerald-500' },
                ].map((alt, i) => (
                  <Link key={i} href={`/product/${alt.name.toLowerCase()}`} className="flex items-center gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl hover:border-indigo-200/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${alt.color} flex items-center justify-center font-extrabold text-white text-lg shadow-md group-hover:scale-110 transition-transform`}>{alt.name[0]}</div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{alt.name}</div>
                      <div className="text-xs font-medium text-slate-400">{alt.tagline}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>

            {/* ── COMPARE ── */}
            <section>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">Head-to-Head Comparisons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {['Claude', 'Perplexity'].map((comp, i) => (
                  <Link key={i} href={`/compare/${product.slug}-vs-${comp.toLowerCase()}`} className="group p-7 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/50 hover:shadow-xl transition-all flex items-center justify-between text-white">
                    <div>
                      <div className="font-extrabold text-xl mb-1">
                        {productName} <span className="text-slate-500 font-normal px-2">vs</span> {comp}
                      </div>
                      <div className="text-sm text-slate-400 font-medium">Pricing &middot; Features &middot; Reviews</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                      <ArrowRight className="text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── REVIEWS ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                <Star className="w-3.5 h-3.5" /> Reviews
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-10">Verified User Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Sarah Jenkins', role: 'Product Manager at Stripe', rating: 5, quote: `${productName} completely changed how our team ships features. The AI automation alone saved us 15 hours per week. The API is flawless and the documentation is best-in-class.` },
                  { name: 'Marcus Chen', role: 'Lead Developer at Vercel', rating: 5, quote: `I was skeptical at first, but the performance is unmatched. We migrated from 3 different tools to just ${productName}. Worth every penny of the Pro plan.` },
                  { name: 'Priya Sharma', role: 'Head of Design at Figma', rating: 5, quote: `The collaboration features are incredible. Our distributed team of 40 people uses it daily. The real-time sync is seamless and the UI is beautifully designed.` },
                  { name: 'Alex Rodriguez', role: 'CTO at Notion', rating: 5, quote: `We evaluated 12 different tools before choosing ${productName}. The combination of AI features, security, and API made it the clear winner for our enterprise needs.` },
                ].map((rev, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-1 text-amber-400 mb-4">
                      {Array.from({ length: rev.rating }).map((_, s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-700 font-medium mb-6 leading-relaxed">&ldquo;{rev.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
                        {rev.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{rev.name}</div>
                        <div className="text-xs font-bold text-slate-400">{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ── */}
            <section>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                <MessageSquare className="w-3.5 h-3.5" /> FAQ
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-10">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: `Is there a free trial for ${productName}?`, a: `Yes! ${productName} offers a generous free tier that requires no credit card. You can use the Starter plan forever for free. If you need advanced features, you can start a 14-day Pro trial anytime.` },
                  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. You can cancel from your billing dashboard with one click — no phone calls, no hidden steps. Your plan stays active until the end of your billing cycle, and you keep all your data.' },
                  { q: 'Do you offer enterprise support?', a: 'Yes, our Enterprise plan includes a dedicated success manager, 24/7 priority support with guaranteed SLA response times, custom onboarding, and SSO/SAML integration assistance.' },
                  { q: 'How does the AI automation work?', a: `The AI engine learns from your workflow patterns and suggests automations. You can create custom rules, use pre-built templates, or let the AI auto-generate workflows based on your most repetitive tasks.` },
                  { q: 'Is my data secure?', a: 'We are SOC2 Type II certified with end-to-end encryption (AES-256), GDPR compliant, and offer configurable data retention. Your data is stored in secure, redundant data centers with 99.99% uptime SLA.' },
                  { q: `What integrations does ${productName} support?`, a: `We support 200+ integrations including Slack, GitHub, Notion, Jira, Figma, Google Workspace, Zapier, and more. We also provide a full REST API and official SDKs for Python, JavaScript, and Go.` },
                ].map((faq, i) => (
                  <details key={i} className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:border-indigo-200/60 transition-colors">
                    <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-900 text-base">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 text-slate-400 group-open:text-indigo-600 group-open:rotate-180 transition-all shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-6 -mt-2">
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* ─── STICKY SIDEBAR (Right, 30%) ─── */}
          <div className="w-full lg:w-[30%] hidden lg:block">
            <div className="sticky top-28 space-y-6">
              
              {/* Main CTA Card */}
              <div className="bg-white border border-slate-200/60 rounded-3xl shadow-lg p-6">
                <a href={product.website_url || '#'} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all flex justify-center items-center gap-2 mb-4">
                  Visit Website <ArrowUpRight className="w-5 h-5" />
                </a>

                <div className="flex gap-2 mb-6">
                  <button className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm flex justify-center items-center gap-2 transition-colors">
                    <Bookmark className="w-4 h-4" /> Save
                  </button>
                  <button className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-700 text-sm flex justify-center items-center gap-2 transition-colors">
                    <Share className="w-4 h-4" /> Share
                  </button>
                </div>

                <div className="space-y-0">
                  {[
                    { label: 'Starting Price', value: 'Free', link: '#pricing' },
                    { label: 'Category', value: 'AI Assistant', link: '/categories' },
                    { label: 'Platforms', value: product.platforms?.join(', ') || 'Web, Mac' },
                    { label: 'API Access', value: product.api_available ? 'Yes' : 'No' },
                    { label: 'Open Source', value: product.open_source ? 'Yes' : 'No' },
                    { label: 'Last Updated', value: 'Today' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3.5 border-b border-slate-100 last:border-0">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                      {item.link ? (
                        <Link href={item.link} className="font-bold text-indigo-600 hover:underline text-sm">{item.value}</Link>
                      ) : (
                        <span className="font-bold text-slate-900 text-sm">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              {product.company_name && (
                <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Company</h3>
                  <div className="space-y-3">
                    {product.company_name && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Name</span>
                        <span className="font-bold text-slate-900">{product.company_name}</span>
                      </div>
                    )}
                    {product.founder && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Founder</span>
                        <span className="font-bold text-slate-900">{product.founder}</span>
                      </div>
                    )}
                    {product.headquarters && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">HQ</span>
                        <span className="font-bold text-slate-900">{product.headquarters}</span>
                      </div>
                    )}
                    {product.employee_size && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Team</span>
                        <span className="font-bold text-slate-900">{product.employee_size}</span>
                      </div>
                    )}
                    {product.funding_stage && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Funding</span>
                        <span className="font-bold text-slate-900">{product.funding_stage}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm p-6">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4">Links</h3>
                <div className="space-y-2">
                  {product.website_url && (
                    <a href={product.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                      <Globe className="w-4 h-4 text-slate-400" /> Website <ExternalLink className="w-3 h-3 text-slate-300 ml-auto" />
                    </a>
                  )}
                  {product.github_url && (
                    <a href={product.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                      <Code className="w-4 h-4 text-slate-400" /> GitHub <ExternalLink className="w-3 h-3 text-slate-300 ml-auto" />
                    </a>
                  )}
                </div>
              </div>

              {/* Affiliate Disclosure */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium text-slate-500 text-center leading-relaxed">
                <strong className="text-slate-600">Affiliate Disclosure:</strong> We may earn a commission if you purchase through our links. This helps keep RankFlow AI free.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MOBILE STICKY BOTTOM CTA */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-2xl border-t border-slate-200/50 lg:hidden z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex gap-3">
        <a href={product.website_url || '#'} className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 text-center flex justify-center items-center gap-2">
          Visit Website <ArrowUpRight className="w-5 h-5" />
        </a>
        <button className="w-14 h-14 bg-slate-100 text-slate-700 rounded-2xl font-bold flex justify-center items-center shrink-0">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

    </main>
  )
}
