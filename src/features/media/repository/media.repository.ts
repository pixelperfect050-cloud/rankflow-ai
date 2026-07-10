import { createClient } from "@/lib/supabase/server";
import { MediaAsset, MediaVariant, MediaVersion, MediaUsage, MediaJob } from "@/types";

// NOTE: Since these types might not all be defined perfectly in types/index.ts yet,
// we will use Partial generic updates.

export class MediaRepository {
  
  // ==========================================
  // ASSETS
  // ==========================================
  
  async createAsset(data: Partial<MediaAsset>): Promise<MediaAsset> {
    const supabase = await createClient();
    const { data: asset, error } = await supabase
      .from("media_assets")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return asset as MediaAsset;
  }

  async updateAsset(id: string, data: Partial<MediaAsset>): Promise<MediaAsset> {
    const supabase = await createClient();
    const { data: asset, error } = await supabase
      .from("media_assets")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return asset as MediaAsset;
  }

  async getAssetById(id: string): Promise<MediaAsset | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as MediaAsset;
  }

  async searchAssets(workspaceId: string, query?: string, folder?: string): Promise<MediaAsset[]> {
    const supabase = await createClient();
    let q = supabase
      .from("media_assets")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (folder) {
      q = q.eq("folder_path", folder);
    }
    
    if (query) {
      // Basic search on filename, alt_text, or caption
      q = q.or(`filename.ilike.%${query}%,alt_text.ilike.%${query}%,caption.ilike.%${query}%`);
    }

    const { data, error } = await q;
    if (error) throw error;
    return data as MediaAsset[];
  }

  async softDeleteAsset(id: string, userId: string): Promise<void> {
    const usage = await this.getUsage(id);
    if (usage.length > 0) {
      throw new Error(`Cannot delete asset. It is actively used in ${usage.length} places.`);
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("media_assets")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId,
      })
      .eq("id", id);

    if (error) throw error;
  }

  // ==========================================
  // VARIANTS
  // ==========================================
  
  async createVariant(data: Partial<MediaVariant>): Promise<MediaVariant> {
    const supabase = await createClient();
    const { data: variant, error } = await supabase
      .from("media_variants")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return variant as MediaVariant;
  }

  async getVariants(mediaAssetId: string): Promise<MediaVariant[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_variants")
      .select("*")
      .eq("media_asset_id", mediaAssetId);

    if (error) throw error;
    return data as MediaVariant[];
  }

  // ==========================================
  // VERSIONS
  // ==========================================
  
  async createVersion(data: any): Promise<any> {
    const supabase = await createClient();
    const { data: version, error } = await supabase
      .from("media_versions")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return version;
  }

  // ==========================================
  // USAGE
  // ==========================================
  
  async getUsage(mediaAssetId: string): Promise<MediaUsage[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_usage")
      .select("*")
      .eq("media_asset_id", mediaAssetId);

    if (error) throw error;
    return data as MediaUsage[];
  }

  // ==========================================
  // JOBS
  // ==========================================
  
  async createJob(mediaAssetId: string): Promise<MediaJob> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("media_jobs")
      .insert([{ media_asset_id: mediaAssetId, status: 'processing' }])
      .select()
      .single();

    if (error) throw error;
    return data as MediaJob;
  }

  async updateJob(jobId: string, status: string, errorLog?: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("media_jobs")
      .update({ 
        status, 
        error_log: errorLog || null, 
        completed_at: status === 'completed' ? new Date().toISOString() : null 
      })
      .eq("id", jobId);

    if (error) throw error;
  }
}
