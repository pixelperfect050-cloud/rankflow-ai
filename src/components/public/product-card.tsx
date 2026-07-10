import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, Star, ExternalLink, Activity } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            {/* Logo placeholder - Replace with actual image rendering later */}
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <span className="text-lg font-bold text-slate-400">
                {product.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {product.company_name || 'Verified Product'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">{product.health_score || 85}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px] mb-6">
          {product.tagline || product.description || 'No description available.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex gap-2">
            {product.platforms?.slice(0, 2).map(p => (
              <span key={p} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-100 text-slate-600 rounded">
                {p}
              </span>
            ))}
            {product.open_source && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-blue-50 text-blue-600 rounded">
                OSS
              </span>
            )}
          </div>
          <span className="text-emerald-600 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
            View <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
