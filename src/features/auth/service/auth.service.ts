import { createClient } from "@/lib/supabase/server";

export class AuthService {
  async getUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      return { user: null, error };
    }
    
    return { user, error: null };
  }

  async signOut() {
    const supabase = await createClient();
    return await supabase.auth.signOut();
  }
}
