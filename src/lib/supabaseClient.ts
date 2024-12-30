import { createClient } from '@supabase/supabase-js'

const ANON_KEY = import.meta.env.VITE_ANON_KEY as string
export const supabase = createClient('https://vqiuwzxrshsvdjbhtodk.supabase.co', `${ANON_KEY}`)
