import { createClient } from "@supabase/supabase-js";

// ✅ Gunakan import.meta.env agar variabel environment dari Vite bisa terbaca
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🔒 Validasi agar tidak salah konfigurasi saat build
if (!supabaseUrl || !supabaseAnonKey) {
throw new Error(
"Error: Supabase URL dan Anon Key belum diatur di Environment Variables (.env atau Vercel)"
);
}

// 🚀 Inisialisasi koneksi Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
