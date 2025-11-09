'use client'

import { useState, useEffect } from 'react'
import { galleryService, uploadImage } from '@//lib/supabaseService'
import type { GalleryItem } from '@//lib/supabase'

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<GalleryItem>>({})

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    const data = await galleryService.getAll()
    setItems(data)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const imageUrl = await uploadImage(file)
        if (imageUrl) {
          setFormData({ ...formData, image: imageUrl })
        } else {
          alert('Failed to upload image')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image. Please try again.')
      }
    }
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        await galleryService.update(editingId, formData)
      } else {
        await galleryService.create(formData)
      }
      await loadItems()
      setIsModalOpen(false)
      setFormData({})
      setEditingId(null)
    } catch (error) {
      console.error('Error saving gallery item:', error)
      alert('Failed to save gallery item')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await galleryService.delete(id)
        await loadItems()
      } catch (error) {
        console.error('Error deleting gallery item:', error)
        alert('Failed to delete gallery item')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">🖼️ Gallery Management</h1>
        <button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({}) }} className="px-6 py-3 bg-hotpink text-white rounded-lg hover:shadow-lg hover:shadow-hotpink/50 transition-all">+ Add New</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-black border border-hotpink/30 rounded-lg overflow-hidden hover:border-hotpink transition-all">
            <img src={item.image} alt={item.caption} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm mb-2 text-white">{item.caption}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(item.id); setFormData(item); setIsModalOpen(true) }} className="flex-1 px-3 py-1 bg-hotpink text-white rounded text-sm hover:bg-hotpink/80 transition-all">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-black border-2 border-hotpink p-8 rounded-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6 text-hotpink">{editingId ? 'Edit' : 'Add'} Gallery Item</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-hotpink file:text-white hover:file:bg-hotpink/80 cursor-pointer"
                />
                <p className="text-xs text-gray-400">Or paste image URL below</p>
                <input placeholder="Image URL" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none" />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-full h-60 object-cover rounded-lg mt-2" />
                )}
              </div>
              <input placeholder="Caption" value={formData.caption || ''} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none" />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="flex-1 py-3 bg-hotpink text-white rounded-lg hover:bg-hotpink/80 transition-all">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-black border border-hotpink/50 text-white rounded-lg hover:bg-hotpink/10 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
