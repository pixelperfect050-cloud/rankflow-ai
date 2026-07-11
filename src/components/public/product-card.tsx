import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use a mock category/pricing if none exists to maintain the premium UI look
  const category = "AI Assistant";
  const pricingType = "Freemium";
  
  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-[20px] border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
    >
      <div className="p-6 flex flex-col h-full">
        
        {/* Top Header: Logo + Rating */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
            <span className="text-xl font-extrabold text-indigo-600">
              {product.name.charAt(0)}
            </span>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-6 flex-1">
          <h3 className="font-bold text-xl text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {product.tagline || product.description || 'Verified product in the software intelligence engine.'}
          </p>
        </div>

        {/* Meta: Category & Pricing */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold tracking-wide border border-slate-200">
            {category}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide border border-indigo-100">
            {pricingType}
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between w-full text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            <span>Open</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </Link>
  );
}
