import { supabase } from './services/supabaseClient';

export async function testConnection() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) console.error('❌ Supabase error:', error);
  else console.log('✅ Supabase connected:', data);
}
