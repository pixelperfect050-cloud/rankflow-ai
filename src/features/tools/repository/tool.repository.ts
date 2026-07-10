import { createClient } from "@/lib/supabase/server";

export interface Tool {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  tagline: string;
  status: string;
  pricing_type: string;
  views_count: number;
  created_at: string;
}

export class ToolRepository {
  async getToolsByWorkspace(workspaceId: string, limit = 20, offset = 0): Promise<Tool[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("workspace_id", workspaceId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as Tool[];
  }

  async getToolById(id: string): Promise<Tool | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data as Tool;
  }
}
