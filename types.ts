
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  height: number | null;
  weight: number | null;
  age: number | null;
  updated_at: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface HealthRecord {
  id: number;
  user_id: string;
  created_at: string;
  heart_rate: number;
  temperature: number;
  stress_level: number;
}
