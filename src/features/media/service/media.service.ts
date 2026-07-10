import crypto from 'crypto';
import { MediaRepository } from "../repository/media.repository";
import { SupabaseStorageAdapter } from "../storage/supabase.adapter";
import { IStorageAdapter } from "../storage/storage.adapter";

export class MediaService {
  private repository: MediaRepository;
  private storage: IStorageAdapter;

  constructor() {
    this.repository = new MediaRepository();
    // Dependency injection could go here, defaulting to Supabase
    this.storage = new SupabaseStorageAdapter();
  }

  /**
   * Fast upload pipeline: 
   * Hash -> Duplicate Check -> Upload Original -> Create Asset DB -> Create Job -> Return
   */
  async uploadMedia(
    workspaceId: string, 
    userId: string,
    fileBuffer: Buffer, 
    originalFilename: string, 
    mimeType: string,
    bucket: string = "uploads",
    folderPath: string = "/"
  ) {
    // 1. Calculate SHA-256 for duplicate detection
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const sha256 = hashSum.digest('hex');

    // Duplicate Check logic:
    // In a real app, query the repo for this SHA256. If exists, we could reject or just return existing.
    // For now, we continue uploading.

    // 2. Generate unique path
    const extension = originalFilename.split('.').pop() || '';
    const uniqueFilename = `${crypto.randomUUID()}.${extension}`;
    const storagePath = `${folderPath.replace(/^\//, '')}${uniqueFilename}`;

    // 3. Upload Original to Storage
    await this.storage.upload(bucket, storagePath, fileBuffer, mimeType);

    // 4. Create Asset in DB
    const asset = await this.repository.createAsset({
      workspace_id: workspaceId,
      filename: uniqueFilename,
      original_filename: originalFilename,
      mime_type: mimeType,
      extension: extension.toLowerCase(),
      size: fileBuffer.length,
      sha256,
      bucket,
      folder_path: folderPath,
      status: 'processing',
      visibility: 'public',
      created_by: userId
    });

    // 5. Create Background Job
    await this.repository.createJob(asset.id);

    // 6. Trigger Background Processing (Non-blocking)
    // We abstract this here. In production, this pushes to SQS/QStash or calls a webhook.
    this.triggerProcessingJob(asset.id, fileBuffer, mimeType, bucket, folderPath, uniqueFilename).catch(console.error);

    return asset;
  }

  /**
   * Internal mechanism to handle the heavy processing out-of-band.
   * This uses sharp (Node.js runtime required).
   */
  private async triggerProcessingJob(
    assetId: string, 
    originalBuffer: Buffer, 
    mimeType: string,
    bucket: string,
    folderPath: string,
    uniqueFilename: string
  ) {
    // Note: We dynamically import ImageProcessor here to avoid loading `sharp` 
    // into Edge runtime components by accident if this service is imported elsewhere.
    try {
      const { processImageVariants } = await import('./image-processor');
      
      const variants = await processImageVariants(originalBuffer);
      
      for (const variant of variants) {
        // Upload variant
        const variantPath = `${folderPath.replace(/^\//, '')}${variant.type}-${uniqueFilename}`;
        await this.storage.upload(bucket, variantPath, variant.buffer, variant.mime);

        // Save variant metadata to DB
        await this.repository.createVariant({
          media_asset_id: assetId,
          variant_type: variant.type as any,
          width: variant.width,
          height: variant.height,
          size: variant.size,
          path: variantPath,
        });
      }

      // Mark Job Completed
      // And update Asset status to published
      await this.repository.updateAsset(assetId, { status: 'published' });
      // In a real implementation we would also update the job status in media_jobs table
      
    } catch (error) {
      console.error(`Media Processing Failed for asset ${assetId}:`, error);
      await this.repository.updateAsset(assetId, { status: 'failed' });
    }
  }

  async softDeleteAsset(id: string, userId: string) {
    await this.repository.softDeleteAsset(id, userId);
  }
}
