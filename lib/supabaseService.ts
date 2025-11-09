import { supabase } from './supabase'
import type { Project, Award, Publication, Event, GalleryItem, Certificate } from './supabase'

// Generic fetch function
async function fetchData<T>(table: string): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching ${table}:`, error)
    return []
  }

  return data as T[]
}

// Generic insert function
async function insertData<T>(table: string, item: Partial<T>): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .insert([item])
    .select()
    .single()

  if (error) {
    console.error(`Error inserting into ${table}:`, error)
    throw error
  }

  return data as T
}

// Generic update function
async function updateData<T>(table: string, id: number, updates: Partial<T>): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating ${table}:`, error)
    throw error
  }

  return data as T
}

// Generic delete function
async function deleteData(table: string, id: number): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Error deleting from ${table}:`, error)
    return false
  }

  return true
}

// Upload image to Supabase Storage
export async function uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (uploadError) {
      console.error('Error uploading image:', uploadError)
      return null
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Error in uploadImage:', error)
    return null
  }
}

// Projects
export const projectsService = {
  getAll: () => fetchData<Project>('projects'),
  create: (project: Partial<Project>) => insertData<Project>('projects', project),
  update: (id: number, updates: Partial<Project>) => updateData<Project>('projects', id, updates),
  delete: (id: number) => deleteData('projects', id),
}

// Awards
export const awardsService = {
  getAll: () => fetchData<Award>('awards'),
  create: (award: Partial<Award>) => insertData<Award>('awards', award),
  update: (id: number, updates: Partial<Award>) => updateData<Award>('awards', id, updates),
  delete: (id: number) => deleteData('awards', id),
}

// Publications
export const publicationsService = {
  getAll: () => fetchData<Publication>('publications'),
  create: (publication: Partial<Publication>) => insertData<Publication>('publications', publication),
  update: (id: number, updates: Partial<Publication>) => updateData<Publication>('publications', id, updates),
  delete: (id: number) => deleteData('publications', id),
}

// Events
export const eventsService = {
  getAll: () => fetchData<Event>('events'),
  create: (event: Partial<Event>) => insertData<Event>('events', event),
  update: (id: number, updates: Partial<Event>) => updateData<Event>('events', id, updates),
  delete: (id: number) => deleteData('events', id),
}

// Gallery
export const galleryService = {
  getAll: () => fetchData<GalleryItem>('gallery'),
  create: (item: Partial<GalleryItem>) => insertData<GalleryItem>('gallery', item),
  update: (id: number, updates: Partial<GalleryItem>) => updateData<GalleryItem>('gallery', id, updates),
  delete: (id: number) => deleteData('gallery', id),
}

// Certificates (NEW!)
export const certificatesService = {
  getAll: () => fetchData<Certificate>('certificates'),
  create: (certificate: Partial<Certificate>) => insertData<Certificate>('certificates', certificate),
  update: (id: number, updates: Partial<Certificate>) => updateData<Certificate>('certificates', id, updates),
  delete: (id: number) => deleteData('certificates', id),
}
