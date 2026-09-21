import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dnlpaaxmjurwgpcaoyxn.supabase.co";

const supabaseAnonKey = "sb_publishable_s9f4z3yDfInUmw3gjqianA_XIdWBS33";

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);