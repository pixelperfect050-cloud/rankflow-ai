"use server";

import { revalidatePath } from "next/cache";
import { ProductService } from "./service/product.service";
import { ProductRepository } from "./repository/product.repository";
import { Product, ProductPricing } from "@/types";

const productService = new ProductService();
const productRepo = new ProductRepository();

export async function createProductAction(workspaceId: string, data: Partial<Product>) {
  try {
    const product = await productService.createProductAndAnalyze(workspaceId, data);
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProductAction(id: string, data: Partial<Product>) {
  try {
    const product = await productRepo.updateProduct(id, data);
    await productService.calculateIntelligenceScore(id);
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProductAction(id: string, userId: string) {
  try {
    await productRepo.softDeleteProduct(id, userId);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addPricingPlanAction(productId: string, data: Partial<ProductPricing>) {
  try {
    const plan = await productRepo.addPricingPlan(productId, data);
    await productService.calculateIntelligenceScore(productId);
    revalidatePath(`/admin/products/${productId}`);
    return { success: true, plan };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
