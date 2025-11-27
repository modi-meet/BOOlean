import { createClient } from "@supabase/supabase-js";

export const createBrowserSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn("Supabase environment variables are missing. Returning a mock client.");
  }

  return createClient(url ?? "http://localhost", anonKey ?? "public-anon-key", {
    auth: {
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
};
