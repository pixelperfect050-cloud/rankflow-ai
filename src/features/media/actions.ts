"use server";

import { revalidatePath } from "next/cache";
import { MediaService } from "./service/media.service";
import { MediaRepository } from "./repository/media.repository";

const mediaService = new MediaService();
const mediaRepo = new MediaRepository();

/**
 * Server action to handle direct file uploads from the client.
 * In a Next.js Server Action, we receive FormData containing the File blob.
 */
export async function uploadMediaAction(workspaceId: string, formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");
    
    const folderPath = formData.get("folder_path") as string || "/";
    const bucket = formData.get("bucket") as string || "uploads";
    
    // Convert Web File to Buffer for processing/storage
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // User auth would happen here, hardcoded mock for MVP
    const userId = "mock-user-id";

    // Call service which immediately returns after writing to DB & triggering async job
    const asset = await mediaService.uploadMedia(
      workspaceId,
      userId,
      buffer,
      file.name,
      file.type,
      bucket,
      folderPath
    );

    revalidatePath("/admin/media");
    return { success: true, asset };
  } catch (error: any) {
    console.error("Upload failed:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMediaAction(assetId: string, userId: string) {
  try {
    await mediaService.softDeleteAsset(assetId, userId);
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getVariantsAction(assetId: string) {
  try {
    const variants = await mediaRepo.getVariants(assetId);
    return { success: true, variants };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
