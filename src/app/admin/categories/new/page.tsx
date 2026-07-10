import React from "react";
import { CategoryEditorClient } from "../category-editor-client";

export default function NewCategoryPage() {
  return (
    <main className="p-6 bg-slate-50 min-h-[calc(100vh-64px)]">
      <CategoryEditorClient />
    </main>
  );
}
