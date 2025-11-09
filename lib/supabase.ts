import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  awards?: string[]
  link?: string
  image?: string
  featured?: boolean
  created_at?: string
}

export interface Award {
  id: number
  title: string
  date: string
  description: string
  created_at?: string
}

export interface Publication {
  id: number
  title: string
  authors: string
  venue: string
  link?: string
  created_at?: string
}

export interface Event {
  id: number
  title: string
  date: string
  description: string
  image: string
  created_at?: string
}

export interface GalleryItem {
  id: number
  image: string
  caption: string
  created_at?: string
}

export interface Certificate {
  id: number
  title: string
  issuer?: string
  date?: string
  description?: string
  image?: string
  credential_url?: string
  image_fit?: 'cover' | 'contain'
  type?: string // e.g., 'course', 'competition', 'certification'
  category?: string // e.g., 'AI', 'Web Development', 'Data Science'
  created_at?: string
}

export interface Company {
  id: number
  name: string
  logo?: string
  website?: string
  description?: string
  order?: number
  created_at?: string
}

export interface Testimonial {
  id: number
  name: string
  feedback: string
  date: string
  approved?: boolean
  created_at?: string
}
