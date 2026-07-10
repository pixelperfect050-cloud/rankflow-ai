import React from "react";
import { notFound } from "next/navigation";
import { CategoryRepository } from "@/features/categories/repository/category.repository";
import { CategoryEditorClient } from "../category-editor-client";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const repo = new CategoryRepository();
  const category = await repo.getCategoryById(params.id);

  if (!category) {
    notFound();
  }

  return (
    <main className="p-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <CategoryEditorClient initialData={category} />
    </main>
  );
}
