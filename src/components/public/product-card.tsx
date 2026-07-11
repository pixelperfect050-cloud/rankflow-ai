import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const category = "AI Assistant";
  const pricingType = "Freemium";
  
  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/60 hover:border-indigo-200/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
    >
      <div className="p-6 flex flex-col h-full">
        
        {/* Logo + Health Score */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300">
            <span className="text-lg font-extrabold text-indigo-600 group-hover:text-white transition-colors">
              {product.name.charAt(0)}
            </span>
          </div>
          {product.health_score && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-700">{product.health_score}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-1.5">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate-500 font-medium line-clamp-1 mb-4">
          {product.tagline || product.description || 'Verified software product.'}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400">5.0</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider">
            {pricingType}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
            <span>View Product</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>

      </div>
    </Link>
  );
}
