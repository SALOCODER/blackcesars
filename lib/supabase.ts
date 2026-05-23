import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy getters — validamos env vars dentro de cada funcion, no a nivel de
// modulo, para que `next build` no falle si Vercel todavia no las tiene seteadas.

function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url) throw new Error('Missing env var NEXT_PUBLIC_SUPABASE_URL')
  if (!publishableKey) throw new Error('Missing env var NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
  return { url, publishableKey }
}

let cachedBrowserClient: SupabaseClient | null = null

// Browser-safe client. Publishable key (sb_publishable_...) is meant to be public;
// the real security boundary is RLS policies on the Supabase side.
export function getSupabaseClient(): SupabaseClient {
  if (cachedBrowserClient) return cachedBrowserClient
  const { url, publishableKey } = getPublicEnv()
  cachedBrowserClient = createClient(url, publishableKey)
  return cachedBrowserClient
}

// Admin client — server-only. Uses the secret key (sb_secret_...) which bypasses RLS.
// NEVER import this from a Client Component, route accessible to the browser, or
// anything that ships to the client bundle.
export function createAdminClient(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('createAdminClient() must not be called in the browser')
  }
  const { url } = getPublicEnv()
  const secretKey = process.env.SUPABASE_SECRET_KEY
  if (!secretKey) {
    throw new Error('Missing env var SUPABASE_SECRET_KEY')
  }
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
