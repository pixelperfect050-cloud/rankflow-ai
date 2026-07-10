import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CategoryRepository } from "@/features/categories/repository/category.repository";
import { CategoryListClient } from "./category-list-client";

// Hardcoded workspace for MVP until Auth is integrated
const WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

export default async function CategoriesPage() {
  const repo = new CategoryRepository();
  const categories = await repo.getCategoriesByWorkspace(WORKSPACE_ID);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-slate-500 mt-1">
            Manage your taxonomy, programmatic SEO landing pages, and Knowledge Graph hierarchies.
          </p>
        </div>
        
        <Link 
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <CategoryListClient initialCategories={categories} />
    </main>
  );
}
