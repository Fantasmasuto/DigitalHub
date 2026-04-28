import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a minimal mock during build/prerender when env vars are unavailable
    const noop = () => ({ data: null, error: null });
    const noopQuery = () => ({
      select: () => ({ eq: () => ({ single: noop }), single: noop }),
      eq: () => ({ single: noop }),
      single: noop,
      ...noop(),
    });
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: noop,
        signInWithOAuth: noop,
        signUp: noop,
        signOut: noop,
        resetPasswordForEmail: noop,
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
      },
      from: () => noopQuery(),
    } as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(url, key);
}
