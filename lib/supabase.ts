import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL) {
  throw new Error('Missing env var NEXT_PUBLIC_SUPABASE_URL')
}
if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing env var NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
}

// Browser-safe client. Publishable key (sb_publishable_...) is meant to be public;
// the real security boundary is RLS policies on the Supabase side.
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
)

// Admin client — server-only. Uses the secret key (sb_secret_...) which bypasses RLS.
// NEVER import this from a Client Component, route accessible to the browser, or
// anything that ships to the client bundle.
export function createAdminClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient() must not be called in the browser')
  }
  const secretKey = process.env.SUPABASE_SECRET_KEY
  if (!secretKey) {
    throw new Error('Missing env var SUPABASE_SECRET_KEY')
  }
  return createClient(SUPABASE_URL!, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
