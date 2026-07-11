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
      className="group block bg-white rounded-[20px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-200 overflow-hidden relative flex flex-col h-full"
    >
      <div className="p-6 flex flex-col h-full">
        
        {/* Top Header: Logo */}
        <div className="mb-4">
          <div className="w-14 h-14 rounded-[16px] bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
            <span className="text-2xl font-black text-indigo-600">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-2">
          <h3 className="font-bold text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Tagline */}
        <div className="mb-3">
          <p className="text-sm text-slate-500 font-medium line-clamp-1">
            {product.tagline || product.description || 'Verified software product.'}
          </p>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6 mt-1">
          <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-indigo-50 text-indigo-700 text-[11px] font-bold tracking-widest uppercase">
            {pricingType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-[12px] bg-slate-100 text-slate-600 text-[11px] font-bold tracking-widest uppercase border border-slate-200/50">
            {category}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-center gap-2 w-full h-12 bg-slate-50 text-slate-700 font-bold text-sm rounded-[14px] group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-500/25 border border-slate-200 group-hover:border-indigo-600">
            <span>View Product</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </Link>
  );
}
