import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'child' | 'parent'

export interface ChildProfile {
  id: string
  name: string
  age: number
  interests: string
  xp: number
  skills: {
    communication: number
    problemSolving: number
    leadership: number
  }
}