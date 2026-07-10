import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/lib/supabase/types'

/**
 * Admin Supabase client using the service-role key.
 *
 * ⚠️  This client **bypasses Row-Level Security** — never expose it to
 * the browser or pass it to client components.
 *
 * Use cases:
 *   - Cron jobs / scheduled tasks
 *   - Bulk data operations
 *   - Admin mutations (e.g. updating user roles)
 *   - Seeding or migrating data
 *
 * Usage:
 *   import { createAdminClient } from '@/lib/supabase/admin'
 *   const supabaseAdmin = createAdminClient()
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
        'Ensure both environment variables are set.',
    )
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      // We don't need to persist sessions for the admin client
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
