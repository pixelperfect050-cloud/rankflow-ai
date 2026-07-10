import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";

export class CategoryRepository {
  async getCategoriesByWorkspace(workspaceId: string): Promise<Category[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Category[];
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Category;
  }

  async getDescendantsByPath(workspaceId: string, parentPath: string): Promise<Category[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .ilike("path", `${parentPath}%`); // prefix match

    if (error) throw error;
    return data as Category[];
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    const supabase = await createClient();
    
    const { data: category, error } = await supabase
      .from("categories")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return category as Category;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const supabase = await createClient();
    
    const { data: category, error } = await supabase
      .from("categories")
      .update({ ...data })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return category as Category;
  }

  async softDeleteCategory(id: string, userId: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("categories")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id);

    if (error) throw error;
  }

  async hasActiveChildren(id: string): Promise<boolean> {
    const supabase = await createClient();
    
    const { count, error } = await supabase
      .from("categories")
      .select("*", { count: 'exact', head: true })
      .eq("parent_id", id)
      .is("deleted_at", null);

    if (error) throw error;
    return (count || 0) > 0;
  }

  async hasActiveArticles(id: string): Promise<boolean> {
    const supabase = await createClient();
    
    const { count, error } = await supabase
      .from("articles")
      .select("*", { count: 'exact', head: true })
      .eq("category_id", id)
      .is("deleted_at", null);

    if (error) throw error;
    return (count || 0) > 0;
  }

  async hasActiveTools(id: string): Promise<boolean> {
    const supabase = await createClient();
    
    const { count, error } = await supabase
      .from("tools")
      .select("*", { count: 'exact', head: true })
      .eq("category_id", id)
      .is("deleted_at", null);

    if (error) throw error;
    return (count || 0) > 0;
  }

  async bulkUpdateCategories(updates: Partial<Category>[]): Promise<void> {
    const supabase = await createClient();
    
    // Fallback to loop for partial updates
    for (const update of updates) {
      if (!update.id) continue;
      const { error } = await supabase
        .from("categories")
        .update(update)
        .eq("id", update.id);
        
      if (error) throw error;
    }
  }
}
