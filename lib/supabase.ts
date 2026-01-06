
import { createClient } from '@supabase/supabase-js';

// These should be set in your environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://mulxhopfbwojewtdizcc.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11bHhob3BmYndvamV3dGRpemNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MzM2NzEsImV4cCI6MjA4MzAwOTY3MX0.jlaExQ3zIoYIaayYPAfDWlv0nDwnfa2RfD1l_Ryd4qc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
