import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a client only if we have the credentials.
// This prevents the "supabaseUrl is required" error during the Next.js build phase.
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : new Proxy({}, {
      get: (target, prop) => {
        // If the code tries to use 'supabase' when env vars are missing, 
        // we throw a much more helpful error.
        throw new Error(
          `Supabase client used but NEXT_PUBLIC_SUPABASE_URL is missing. 
          If you are seeing this during build, ensure your Vercel Environment Variables are set. 
          Current URL: ${supabaseUrl}`
        );
      }
    }) as any;
