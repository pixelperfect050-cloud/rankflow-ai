// Node.js specific module using 'sharp'
import sharp from 'sharp';

export interface ProcessedVariant {
  type: string;
  buffer: Buffer;
  mime: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Processes an image buffer into standard RankFlow DAM variants:
 * WebP, LQIP (Blur), Thumbnail (400w), and standard responsive sizes (800w, 1200w).
 */
export async function processImageVariants(originalBuffer: Buffer): Promise<ProcessedVariant[]> {
  const variants: ProcessedVariant[] = [];
  
  // Create a sharp instance
  const image = sharp(originalBuffer);
  const metadata = await image.metadata();
  const width = metadata.width || 0;

  // 1. WebP (Full size optimized)
  const webpBuffer = await image.webp({ quality: 80 }).toBuffer();
  const webpMetadata = await sharp(webpBuffer).metadata();
  variants.push({
    type: 'webp',
    buffer: webpBuffer,
    mime: 'image/webp',
    width: webpMetadata.width || 0,
    height: webpMetadata.height || 0,
    size: webpBuffer.length
  });

  // 2. Thumbnail (400w)
  const thumbBuffer = await image.resize({ width: 400 }).webp({ quality: 80 }).toBuffer();
  const thumbMetadata = await sharp(thumbBuffer).metadata();
  variants.push({
    type: 'thumbnail',
    buffer: thumbBuffer,
    mime: 'image/webp',
    width: thumbMetadata.width || 0,
    height: thumbMetadata.height || 0,
    size: thumbBuffer.length
  });

  // 3. LQIP (Blur Placeholder - super tiny)
  const lqipBuffer = await image.resize({ width: 20 }).blur(10).webp({ quality: 20 }).toBuffer();
  const lqipMetadata = await sharp(lqipBuffer).metadata();
  variants.push({
    type: 'lqip',
    buffer: lqipBuffer,
    mime: 'image/webp',
    width: lqipMetadata.width || 0,
    height: lqipMetadata.height || 0,
    size: lqipBuffer.length
  });

  // Generate responsive sizes if original is large enough
  if (width > 800) {
    const w800Buffer = await image.resize({ width: 800 }).webp({ quality: 80 }).toBuffer();
    variants.push({
      type: '800w',
      buffer: w800Buffer,
      mime: 'image/webp',
      width: 800,
      height: Math.round(800 * ((metadata.height || 1) / width)),
      size: w800Buffer.length
    });
  }

  if (width > 1200) {
    const w1200Buffer = await image.resize({ width: 1200 }).webp({ quality: 80 }).toBuffer();
    variants.push({
      type: '1200w',
      buffer: w1200Buffer,
      mime: 'image/webp',
      width: 1200,
      height: Math.round(1200 * ((metadata.height || 1) / width)),
      size: w1200Buffer.length
    });
  }

  return variants;
}
