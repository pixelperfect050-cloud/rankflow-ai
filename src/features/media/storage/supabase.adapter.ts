import { createClient } from "@/lib/supabase/server";
import { IStorageAdapter } from "./storage.adapter";

export class SupabaseStorageAdapter implements IStorageAdapter {
  async upload(bucket: string, path: string, file: Buffer, contentType: string): Promise<string> {
    const supabase = await createClient();
    
    // In production, we might want to handle chunked uploads or specific upsert logic
    const { error } = await supabase
      .storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: true,
      });

    if (error) {
      throw new Error(`Supabase Storage Upload Error: ${error.message}`);
    }

    return this.getPublicUrl(bucket, path);
  }

  async delete(bucket: string, path: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Supabase Storage Delete Error: ${error.message}`);
    }
  }

  getPublicUrl(bucket: string, path: string): string {
    // In server components, we don't have access to the async createClient 
    // synchronously for getPublicUrl. So we build the URL manually from NEXT_PUBLIC_SUPABASE_URL.
    // However, Supabase actually requires URL construction or async fetch.
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
    
    return `${baseUrl}/storage/v1/object/public/${bucket}/${path}`;
  }

  async getSignedUrl(bucket: string, path: string, expiresInSeconds: number = 3600): Promise<string> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, expiresInSeconds);

    if (error || !data) {
      throw new Error(`Supabase Storage Signed URL Error: ${error?.message}`);
    }

    return data.signedUrl;
  }
}
