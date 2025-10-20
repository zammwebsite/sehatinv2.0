import { createClient } from '@supabase/supabase-js';

// Switched to process.env to access environment variables, which is the correct method for this environment.
// This resolves the "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')" error that occurs
// when `import.meta.env` is not available or populated at runtime.
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);