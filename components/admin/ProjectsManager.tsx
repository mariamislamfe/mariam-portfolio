'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projectsService, uploadImage } from '@//lib/supabaseService'
import { compressImage } from '@//lib/imageCompression'
import type { Project } from '@//lib/supabase'

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const data = await projectsService.getAll()
    setProjects(data)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setLoading(true)
        const fileSizeKB = file.size / 1024
        if (fileSizeKB > 1000) {
          alert('Image is too large! Please use an image smaller than 1MB. The image will be compressed automatically.')
        }

        // Try to upload to Supabase Storage first
        const uploadedUrl = await uploadImage(file)
        if (uploadedUrl) {
          setFormData({ ...formData, image: uploadedUrl })
        } else {
          // Fallback to Base64 if upload fails
          const compressedImage = await compressImage(file, 400)
          setFormData({ ...formData, image: compressedImage })
        }
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Failed to process image. Please try another image.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      if (editingId) {
        await projectsService.update(editingId, formData)
      } else {
        await projectsService.create(formData)
      }
      await loadProjects()
      setIsModalOpen(false)
      setFormData({})
      setEditingId(null)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true)
        await projectsService.delete(id)
        await loadProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">💻 Projects Management</h1>
        <button
          onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({}) }}
          className="px-6 py-3 bg-hotpink text-white rounded-lg hover:shadow-lg hover:shadow-hotpink/50 transition-all"
          disabled={loading}
        >
          + Add New
        </button>
      </div>

      {loading && projects.length === 0 && (
        <div className="text-center py-12">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-hotpink/30 p-6 rounded-lg hover:border-hotpink transition-all"
          >
            {project.image && (
              <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            )}
            {project.featured && (
              <div className="mb-2">
                <span className="px-3 py-1 bg-hotpink/30 text-hotpink rounded-full text-xs font-bold border border-hotpink/50">
                  ⭐ Featured
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-hotpink/20 text-hotpink rounded text-xs border border-hotpink/30">
                  {tag}
                </span>
              ))}
            </div>
            {project.awards && project.awards.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-hotpink mb-2">Awards:</p>
                <div className="flex flex-wrap gap-2">
                  {project.awards.map((award, i) => (
                    <span key={i} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30">
                      🏆 {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(project)} className="flex-1 px-4 py-2 bg-hotpink text-white rounded hover:bg-hotpink/80 transition-all" disabled={loading}>Edit</button>
              <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all" disabled={loading}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-black border-2 border-hotpink p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-hotpink">{editingId ? 'Edit' : 'Add'} Project</h2>
            <div className="space-y-4">
              <input
                placeholder="Title"
                value={formData.title || ''}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white h-32 focus:border-hotpink focus:outline-none"
              />
              <input
                placeholder="Tags (comma separated)"
                value={formData.tags?.join(', ') || ''}
                onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
              />
              <input
                placeholder="Awards (comma separated)"
                value={formData.awards?.join(', ') || ''}
                onChange={e => setFormData({...formData, awards: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
                className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
              />
              <input
                placeholder="Link"
                value={formData.link || ''}
                onChange={e => setFormData({...formData, link: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
              />

              <div className="flex items-center space-x-3 p-4 bg-hotpink/10 border border-hotpink/30 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-5 h-5 rounded border-hotpink/50 bg-black text-hotpink focus:ring-hotpink focus:ring-2 cursor-pointer"
                />
                <label htmlFor="featured" className="text-white font-medium cursor-pointer">
                  ⭐ Mark as Featured (Show on homepage - max 3)
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-hotpink file:text-white hover:file:bg-hotpink/80 cursor-pointer disabled:opacity-50"
                />
                <p className="text-xs text-gray-400">Or paste image URL below</p>
                <input
                  placeholder="Image URL"
                  value={formData.image || ''}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="flex-1 py-3 bg-hotpink text-white rounded-lg hover:bg-hotpink/80 transition-all disabled:opacity-50" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-black border border-hotpink/50 text-white rounded-lg hover:bg-hotpink/10 transition-all" disabled={loading}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
