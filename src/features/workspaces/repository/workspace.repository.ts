import { createClient } from "@/lib/supabase/server";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export class WorkspaceRepository {
  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("workspace_members")
      .select(`
        workspace_id,
        workspaces (
          id,
          name,
          slug,
          created_at
        )
      `)
      .eq("user_id", userId)
      .is("workspaces.deleted_at", null);

    if (error) {
      console.error("WorkspaceRepository.getUserWorkspaces error:", error);
      throw error;
    }

    // Map through the join table result
    return data.map((d: any) => d.workspaces as Workspace);
  }

  async getWorkspaceBySlug(slug: string): Promise<Workspace | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("slug", slug)
      .is("deleted_at", null)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error("WorkspaceRepository.getWorkspaceBySlug error:", error);
      throw error;
    }

    return data as Workspace;
  }
}
