"use client";

import { useState } from "react";
import { Category } from "@/types";
import { DragDropAdapter } from "@/components/admin/dnd-adapter";
import { GripVertical, Edit, Trash2, FolderTree, Activity } from "lucide-react";
import Link from "next/link";
import { bulkReorderCategoriesAction, deleteCategoryAction } from "@/features/categories/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CategoryListClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleReorder = async (reordered: Category[]) => {
    // Optimistic UI update
    setCategories(reordered);

    // Create updates payload
    const updates = reordered.map((cat, index) => ({
      id: cat.id,
      sort_order: index,
    }));

    setIsSaving(true);
    try {
      const res = await bulkReorderCategoriesAction(updates);
      if (res.success) {
        toast.success("Category order saved");
      } else {
        toast.error(res.error || "Failed to save order");
        setCategories(initialCategories); // Revert on failure
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    // Hardcoded user id for MVP since auth is bypassed in mock
    const res = await deleteCategoryAction(id, "mock-user-id");
    if (res.success) {
      toast.success("Category deleted");
      setCategories(categories.filter(c => c.id !== id));
    } else {
      toast.error(res.error || "Cannot delete category (It may contain active content)");
    }
  };

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200 border-dashed">
        <FolderTree className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-1">No categories yet</h3>
        <p className="text-slate-500 mb-6 text-center max-w-sm">
          Categories organize your content and act as SEO-optimized landing pages.
        </p>
        <Link 
          href="/admin/categories/new"
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Create your first category
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Category Tree</h3>
        {isSaving && <span className="text-xs text-emerald-600 animate-pulse font-medium">Saving order...</span>}
      </div>
      
      <div className="p-2">
        <DragDropAdapter
          items={categories}
          keyExtractor={(c) => c.id}
          onReorder={handleReorder}
          renderItem={(category, dragHandleProps) => (
            <div 
              className="flex items-center justify-between p-3 mb-1 bg-white border border-slate-200 rounded-lg group hover:border-emerald-200 transition-colors"
              style={{ marginLeft: `${category.depth * 24}px` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  {...dragHandleProps} 
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{category.name}</span>
                    {category.status !== 'published' && (
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-700 font-bold">
                        {category.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="font-mono">{category.path}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-500" /> Health: {category.health_score || 0}/100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/admin/categories/${category.id}`}
                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
