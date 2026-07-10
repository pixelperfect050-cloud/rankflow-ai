import { ProductRepository } from "../repository/product.repository";
import { Product } from "@/types";

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  /**
   * Evaluates the product data completeness and updates the intelligence scores.
   * Algorithm Weights:
   * - Content (20)
   * - SEO (20)
   * - Media (15)
   * - Pricing (10)
   * - Verification (5)
   * - AI Readiness (10)
   * - Graph (20)
   */
  async calculateIntelligenceScore(productId: string): Promise<void> {
    const product = await this.repository.getProductById(productId);
    if (!product) throw new Error("Product not found");

    let completeness = 0;
    
    // Content metrics (20 max)
    if (product.description && product.description.length > 50) completeness += 10;
    if (product.website_url) completeness += 5;
    if (product.blocks_json && Object.keys(product.blocks_json).length > 0) completeness += 5;

    // Media metrics (15 max)
    if (product.logo_id) completeness += 5;
    if (product.featured_image_id) completeness += 10;

    // AI Readiness (10 max)
    if (product.embedding_id) completeness += 10;

    // SEO metrics (20 max)
    if (product.tagline) completeness += 10;
    if (product.slug && product.slug.length > 3) completeness += 10;

    // Pricing (10 max)
    const pricing = await this.repository.getPricingPlans(productId);
    if (pricing && pricing.length > 0) completeness += 10;

    // Final calculations
    const finalScore = Math.min(completeness, 100);

    // Save back to DB
    await this.repository.updateIntelligenceScores(productId, {
      completeness_score: finalScore,
      overall_score: finalScore, // simplified for MVP
    });
  }

  async createProductAndAnalyze(workspaceId: string, data: Partial<Product>) {
    const product = await this.repository.createProduct({
      ...data,
      workspace_id: workspaceId
    });

    // Run background calculation
    await this.calculateIntelligenceScore(product.id);
    return product;
  }
}
