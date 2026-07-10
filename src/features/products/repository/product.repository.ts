import { createClient } from "@/lib/supabase/server";
import { Product, ProductIntelligenceScores, ProductPricing, ProductFeature } from "@/types";

export class ProductRepository {

  // ==========================================
  // CORE PRODUCT CRUD
  // ==========================================
  
  async createProduct(data: Partial<Product>): Promise<Product> {
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    // Auto-initialize intelligence scores for the new product
    await this.initializeScores(product.id);
    
    return product as Product;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("products")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return product as Product;
  }

  async getProductById(id: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Product;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Product;
  }

  async searchProducts(workspaceId: string, query?: string): Promise<Product[]> {
    const supabase = await createClient();
    let q = supabase
      .from("products")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (query) {
      q = q.or(`name.ilike.%${query}%,slug.ilike.%${query}%`);
    }

    const { data, error } = await q;
    if (error) throw error;
    return data as Product[];
  }

  async softDeleteProduct(id: string, userId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id);

    if (error) throw error;
  }

  // ==========================================
  // INTELLIGENCE SCORES
  // ==========================================
  
  private async initializeScores(productId: string): Promise<void> {
    const supabase = await createClient();
    await supabase.from("product_intelligence_scores").insert([{ product_id: productId }]);
  }

  async updateIntelligenceScores(productId: string, scores: Partial<ProductIntelligenceScores>): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("product_intelligence_scores")
      .update({ ...scores, last_calculated_at: new Date().toISOString() })
      .eq("product_id", productId);

    if (error) throw error;
  }
  
  async getIntelligenceScores(productId: string): Promise<ProductIntelligenceScores | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_intelligence_scores")
      .select("*")
      .eq("product_id", productId)
      .single();
      
    if (error) return null;
    return data as ProductIntelligenceScores;
  }

  // ==========================================
  // PRICING ENGINE
  // ==========================================

  async addPricingPlan(productId: string, plan: Partial<ProductPricing>): Promise<ProductPricing> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_pricing")
      .insert([{ ...plan, product_id: productId }])
      .select()
      .single();

    if (error) throw error;
    
    // Log history
    if (plan.price !== undefined) {
      await supabase.from("product_pricing_history").insert([{
        product_id: productId,
        plan_name: plan.plan_name,
        price: plan.price
      }]);
    }
    
    return data as ProductPricing;
  }
  
  async getPricingPlans(productId: string): Promise<ProductPricing[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product_pricing")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data as ProductPricing[];
  }
}
