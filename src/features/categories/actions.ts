"use server";

import { revalidatePath } from "next/cache";
import { CategoryService } from "./service/category.service";
import { CategoryRepository } from "./repository/category.repository";
import { Category } from "@/types";

const categoryService = new CategoryService();
const categoryRepo = new CategoryRepository();

export async function createCategoryAction(workspaceId: string, data: any) {
  try {
    const category = await categoryService.createCategory(
      workspaceId,
      data.name,
      data.parent_id || null,
      data.category_type_id || null,
      data.visibility || 'public'
    );
    
    // We can also update other fields immediately if provided
    if (data.description || data.seo_title) {
       await categoryRepo.updateCategory(category.id, data);
    }
    
    revalidatePath("/admin/categories");
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategoryAction(id: string, data: Partial<Category>) {
  try {
    const category = await categoryRepo.updateCategory(id, data);
    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${id}`);
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function moveCategoryAction(workspaceId: string, categoryId: string, newParentId: string | null) {
  try {
    await categoryService.moveCategory(workspaceId, categoryId, newParentId);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategoryAction(categoryId: string, userId: string) {
  try {
    await categoryService.deleteCategory(categoryId, userId);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bulkReorderCategoriesAction(updates: { id: string; sort_order: number }[]) {
  try {
    await categoryRepo.bulkUpdateCategories(updates);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
