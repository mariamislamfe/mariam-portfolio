'use client'

import { useState, useEffect } from 'react'
import { eventsService, uploadImage } from '@//lib/supabaseService'
import type { Event } from '@//lib/supabase'

export default function EventsManager() {
  const [items, setItems] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Event>>({})

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    const data = await eventsService.getAll()
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
        await eventsService.update(editingId, formData)
      } else {
        await eventsService.create(formData)
      }
      await loadItems()
      setIsModalOpen(false)
      setFormData({})
      setEditingId(null)
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Failed to save event')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await eventsService.delete(id)
        await loadItems()
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('Failed to delete event')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📅 Events Management</h1>
        <button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({}) }} className="px-6 py-3 gradient-bg rounded-lg">+ Add New</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-primary-400 mb-2">{item.date}</p>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 mb-4">{item.description}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(item.id); setFormData(item); setIsModalOpen(true) }} className="px-4 py-2 bg-blue-600 rounded">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 bg-red-600 rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-8 rounded-xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add'} Event</h2>
            <div className="space-y-4">
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none" />
              <input placeholder="Date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none" />
              <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white h-32 focus:border-hotpink focus:outline-none" />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-hotpink file:text-white hover:file:bg-hotpink/80 cursor-pointer"
                />
                <p className="text-xs text-gray-400">Or paste image URL below</p>
                <input placeholder="Image URL" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none" />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="flex-1 py-3 gradient-bg rounded-lg">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 bg-slate-800 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
