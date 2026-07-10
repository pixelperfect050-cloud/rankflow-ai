import { createClient } from "@/lib/supabase/server";
import { Article } from "@/types";

export class ArticleRepository {
  async getArticlesByWorkspace(workspaceId: string, limit = 20, offset = 0): Promise<Article[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as Article[];
  }

  async getArticleById(id: string): Promise<Article | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Article;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Article;
  }

  async softDeleteArticle(id: string, userId: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("articles")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id);

    if (error) throw error;
  }

  async restoreArticle(id: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("articles")
      .update({
        deleted_at: null,
        deleted_by: null,
      })
      .eq("id", id);

    if (error) throw error;
  }

  async createArticle(data: Partial<Article>): Promise<Article> {
    const supabase = await createClient();
    
    const { data: article, error } = await supabase
      .from("articles")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return article as Article;
  }

  async updateArticle(id: string, data: Partial<Article>): Promise<Article> {
    const supabase = await createClient();
    
    const { data: article, error } = await supabase
      .from("articles")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return article as Article;
  }

  async publishArticle(id: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("articles")
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;
  }
}
