import React from "react";
import { ProductRepository } from "@/features/products/repository/product.repository";
import Link from "next/link";
import { Plus, Search, Activity, ShieldCheck, Box } from "lucide-react";

export const metadata = {
  title: "Products Engine | RankFlow AI",
};

const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

export default async function ProductsDashboardPage() {
  const repo = new ProductRepository();
  const products = await repo.searchProducts(WORKSPACE_ID);

  return (
    <main className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Software Products</h1>
          <p className="text-slate-500 mt-1">
            Enterprise Intelligence Engine. Manage SaaS, extensions, and APIs.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by name or slug..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Identity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Intelligence</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <Box className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-base font-medium text-slate-900">No products found</p>
                  <p className="text-sm">Start building your software intelligence graph.</p>
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">/{product.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {product.company_name && <span className="px-2 py-1 bg-slate-100 rounded text-xs">{product.company_name}</span>}
                      {product.open_source && <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">OSS</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-emerald-600 font-medium">
                      <Activity className="w-4 h-4" />
                      {product.health_score || 0}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Edit & Builder
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
