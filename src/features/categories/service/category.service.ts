import { CategoryRepository } from "../repository/category.repository";
import { Category } from "@/types";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  /**
   * Automatically generate a unique slug based on the title.
   * If collision, append -2, -3, etc.
   */
  async generateUniqueSlug(workspaceId: string, baseName: string): Promise<string> {
    const baseSlug = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;

    // A simpler collision detection would be to query if the slug exists.
    // Given the repository methods we currently have, we'll need to fetch all categories 
    // and check locally, or add a getCategoryBySlug method to the repo.
    const categories = await this.categoryRepository.getCategoriesByWorkspace(workspaceId);
    
    while (categories.some(c => c.slug === slug)) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    return slug;
  }

  /**
   * Create a new category, automatically calculating its depth and path.
   */
  async createCategory(
    workspaceId: string,
    name: string,
    parentId: string | null,
    categoryId: string | null,
    visibility: 'public' | 'private' | 'hidden' | 'system' = 'public'
  ): Promise<Category> {
    const slug = await this.generateUniqueSlug(workspaceId, name);
    let depth = 0;
    let path = `/${slug}/`;

    if (parentId) {
      const parent = await this.categoryRepository.getCategoryById(parentId);
      if (!parent) throw new Error("Parent category not found.");
      depth = parent.depth + 1;
      path = `${parent.path}${slug}/`;
    }

    return await this.categoryRepository.createCategory({
      workspace_id: workspaceId,
      name,
      slug,
      parent_id: parentId,
      category_type_id: categoryId, // Mapped to the specific category type
      depth,
      path,
      visibility,
      status: 'published',
      sort_order: 0,
    });
  }

  /**
   * Move a category to a new parent.
   * This is a complex operation:
   * 1. Prevent circular dependencies (new parent cannot be a descendant of this category).
   * 2. Update the category's parent_id, depth, and path.
   * 3. Recursively update the depth and path of ALL descendants.
   */
  async moveCategory(workspaceId: string, categoryId: string, newParentId: string | null): Promise<void> {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    if (!category) throw new Error("Category not found");

    let newDepth = 0;
    let newPath = `/${category.slug}/`;

    if (newParentId) {
      if (newParentId === categoryId) throw new Error("Category cannot be its own parent.");
      
      const newParent = await this.categoryRepository.getCategoryById(newParentId);
      if (!newParent) throw new Error("New parent not found");

      // Circular check: if newParent's path includes current category's slug/ID
      // e.g. newParent.path = /software/ai/chatbots/ and we are moving /software/ai/ to /chatbots/
      if (newParent.path?.includes(`/${category.slug}/`)) {
        throw new Error("Circular dependency detected. Cannot move a category into its own descendant.");
      }

      newDepth = newParent.depth + 1;
      newPath = `${newParent.path}${category.slug}/`;
    }

    const depthDifference = newDepth - category.depth;
    const oldPath = category.path || `/${category.slug}/`;

    // 1. Update the category itself
    await this.categoryRepository.updateCategory(categoryId, {
      parent_id: newParentId,
      depth: newDepth,
      path: newPath
    });

    // 2. Fetch all descendants using the old path prefix
    const descendants = await this.categoryRepository.getDescendantsByPath(workspaceId, oldPath);
    
    // 3. Bulk update descendants
    const updates = descendants
      .filter(d => d.id !== categoryId) // exclude self, already updated
      .map(descendant => {
        // Replace the oldPath prefix with the newPath prefix
        const updatedPath = descendant.path?.replace(oldPath, newPath) || newPath;
        return {
          id: descendant.id,
          depth: descendant.depth + depthDifference,
          path: updatedPath
        };
      });

    if (updates.length > 0) {
      await this.categoryRepository.bulkUpdateCategories(updates);
    }
  }

  /**
   * Soft Delete enforcing the Prevent Deletion rule.
   */
  async deleteCategory(categoryId: string, userId: string): Promise<void> {
    const hasChildren = await this.categoryRepository.hasActiveChildren(categoryId);
    if (hasChildren) throw new Error("Cannot delete category. It contains active child categories. Please move or delete them first.");

    const hasArticles = await this.categoryRepository.hasActiveArticles(categoryId);
    if (hasArticles) throw new Error("Cannot delete category. It contains active articles. Please move or delete them first.");

    const hasTools = await this.categoryRepository.hasActiveTools(categoryId);
    if (hasTools) throw new Error("Cannot delete category. It contains active tools. Please move or delete them first.");

    await this.categoryRepository.softDeleteCategory(categoryId, userId);
  }
}
