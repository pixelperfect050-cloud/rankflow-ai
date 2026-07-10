"use client";

import { useState } from "react";
import { Category } from "@/types";
import { DragDropAdapter } from "@/components/admin/dnd-adapter";
import { GripVertical, Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createCategoryAction, updateCategoryAction } from "@/features/categories/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryEditorProps {
  initialData?: Category;
}

const BLOCK_TYPES = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'description', label: 'Rich Description' },
  { id: 'featured_tools', label: 'Featured Tools' },
  { id: 'featured_articles', label: 'Featured Articles' },
  { id: 'sub_categories', label: 'Sub Categories' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'cta', label: 'Call to Action' }
];

export function CategoryEditorClient({ initialData }: CategoryEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // Basic Form State
  const [name, setName] = useState(initialData?.name || "");
  const [parentId, setParentId] = useState(initialData?.parent_id || "");
  const [visibility, setVisibility] = useState(initialData?.visibility || "public");
  
  // SEO State
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
  const [seoDesc, setSeoDesc] = useState(initialData?.seo_description || "");
  
  // Blocks State
  const [blocks, setBlocks] = useState<any[]>(
    (initialData?.blocks_json as any[]) || []
  );

  const handleAddBlock = (type: string) => {
    setBlocks([...blocks, { id: crypto.randomUUID(), type, data: {} }]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const handleSave = async () => {
    if (!name) return toast.error("Category name is required");
    setIsSaving(true);
    
    const payload = {
      name,
      parent_id: parentId || null,
      visibility,
      seo_title: seoTitle,
      seo_description: seoDesc,
      blocks_json: blocks
    };

    try {
      if (initialData?.id) {
        const res = await updateCategoryAction(initialData.id, payload);
        if (res.success) toast.success("Category updated successfully");
        else toast.error(res.error);
      } else {
        const res = await createCategoryAction("00000000-0000-0000-0000-000000000000", payload);
        if (res.success) {
          toast.success("Category created!");
          router.push("/admin/categories");
        } else {
          toast.error(res.error);
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories" className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            {initialData ? "Edit Category" : "New Category"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Category"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          {/* General Info */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">General</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="e.g. AI Chatbots"
              />
            </div>
          </div>

          {/* Landing Page Builder */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Landing Page Blocks</h2>
              <div className="flex gap-2">
                <select 
                  className="text-sm border border-slate-300 rounded-lg p-1.5 outline-none"
                  onChange={(e) => {
                    if(e.target.value) {
                      handleAddBlock(e.target.value);
                      e.target.value = "";
                    }
                  }}
                >
                  <option value="">+ Add Block</option>
                  {BLOCK_TYPES.map(bt => <option key={bt.id} value={bt.id}>{bt.label}</option>)}
                </select>
              </div>
            </div>

            {blocks.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                No blocks added yet. Select a block from the dropdown to build this landing page.
              </div>
            ) : (
              <DragDropAdapter
                items={blocks}
                keyExtractor={(b) => b.id}
                onReorder={setBlocks}
                droppableId="blocks-list"
                renderItem={(block, dragHandleProps) => (
                  <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mb-2 group">
                    <div {...dragHandleProps} className="p-1.5 mt-1 text-slate-400 hover:text-slate-600 rounded cursor-grab">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 mb-2 capitalize">{block.type.replace('_', ' ')}</h4>
                      <div className="text-xs text-slate-500 bg-white p-2 rounded border border-slate-100">
                        {/* Placeholder for block-specific editor controls */}
                        [Block Configuration for {block.type}]
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveBlock(block.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Settings */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-medium text-slate-800">Settings</h3>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Parent Category ID</label>
              <input
                type="text"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-emerald-500"
                placeholder="UUID or leave blank"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-emerald-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-medium text-slate-800">SEO Metadata</h3>
            
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-emerald-500"
                placeholder="Optimal title for search"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Meta Description</label>
              <textarea
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                rows={3}
                className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-emerald-500 resize-none"
                placeholder="Brief description for search results"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
