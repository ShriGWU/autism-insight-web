// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vdwprrzdpzcyrrnibybf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkd3BycnpkcHpjeXJybmlieWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNjgxNTQsImV4cCI6MjA1OTY0NDE1NH0.xbgRz9t5GuYj0YInD11NSBiRN9sMz_VlDakFu7nLUtE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);