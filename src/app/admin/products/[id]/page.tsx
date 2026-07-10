import React from "react";
import { ProductRepository } from "@/features/products/repository/product.repository";
import { notFound } from "next/navigation";
import { ShieldCheck, Database, FileText, Blocks, History } from "lucide-react";

export default async function ProductEditorPage({ params }: { params: { id: string } }) {
  const repo = new ProductRepository();
  const product = await repo.getProductById(params.id);

  if (!product) {
    notFound();
  }

  const scores = await repo.getIntelligenceScores(product.id);
  const pricing = await repo.getPricingPlans(product.id);

  return (
    <main className="p-6 max-w-[1600px] mx-auto pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{product.name}</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Intelligence Editor
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
              Score: {scores?.overall_score || 0}%
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column - Core Data */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
              <Database className="w-5 h-5 text-emerald-600" />
              Core Identity
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Company</label>
                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-sm">{product.company_name || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Website</label>
                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-sm text-blue-600">{product.website_url || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">JSONB CONFIG (Arrays)</label>
                <div className="p-2 bg-slate-50 rounded border border-slate-200 text-xs font-mono text-slate-600 overflow-hidden">
                  Languages: {product.languages.length}<br/>
                  Platforms: {product.platforms.length}<br/>
                  Browsers: {product.browser_support.length}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Intelligence Metrics
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Completeness</span>
                <span className="font-medium">{scores?.completeness_score || 0}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Trust Signals</span>
                <span className="font-medium">{scores?.trust_score || 0}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">SEO Score</span>
                <span className="font-medium">{scores?.seo_score || 0}/100</span>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="font-semibold text-slate-900">Overall Rating</span>
                <span className="font-bold text-emerald-600 text-lg">{scores?.overall_score || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Builders & Relational Data */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Landing Page Builder */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Blocks className="w-5 h-5 text-indigo-600" />
                Dynamic Page Builder
              </div>
              <p className="text-sm text-slate-500 mt-1">Drag and drop sections to construct the mini-website.</p>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-center bg-slate-50 border-2 border-dashed border-slate-200 m-5 rounded-lg min-h-[300px]">
              <Blocks className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">DragDropAdapter Integration</h3>
              <p className="text-slate-500 mt-1 max-w-sm text-sm">
                Same abstraction used in Categories. Add blocks like "Pricing Matrix", "Features Grid", "Alternatives", and "Videos".
              </p>
            </div>
          </div>

          {/* Pricing Engine Hub */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <History className="w-5 h-5 text-amber-600" />
                  Pricing Engine & History
                </div>
              </div>
              <button className="text-sm px-3 py-1.5 bg-white border border-slate-200 rounded shadow-sm font-medium hover:bg-slate-50">Add Plan</button>
            </div>
            <div className="p-5">
              {pricing.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No pricing tiers defined yet.</p>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {pricing.map(plan => (
                    <div key={plan.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="font-semibold text-slate-900">{plan.plan_name}</div>
                      <div className="text-2xl font-bold mt-2">
                        {plan.price ? `${plan.currency === 'USD' ? '$' : ''}${plan.price}` : 'Custom'}
                        <span className="text-xs text-slate-500 font-normal ml-1">/{plan.billing_cycle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
