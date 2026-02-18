import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Supabase client initialization using environment variables for
 * secure communication with the database backend.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
