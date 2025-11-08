'use client'

import { useState, useEffect } from 'react'
import { awardsService } from '@/lib/supabaseService'
import type { Award } from '@/lib/supabase'

export default function AwardsManager() {
  const [items, setItems] = useState<Award[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Award>>({})

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    const data = await awardsService.getAll()
    setItems(data)
  }

  const handleSave = async () => {
    try {
      if (editingId) {
        await awardsService.update(editingId, formData)
      } else {
        await awardsService.create(formData)
      }
      await loadItems()
      setIsModalOpen(false)
      setFormData({})
      setEditingId(null)
    } catch (error) {
      console.error('Error saving award:', error)
      alert('Failed to save award')
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await awardsService.delete(id)
        await loadItems()
      } catch (error) {
        console.error('Error deleting award:', error)
        alert('Failed to delete award')
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🏆 Awards Management</h1>
        <button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({}) }} className="px-6 py-3 gradient-bg rounded-lg">+ Add New</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-primary-400">{item.date}</p>
                <p className="text-slate-400 mt-2">{item.description}</p>
              </div>
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
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit' : 'Add'} Award</h2>
            <div className="space-y-4">
              <input placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-slate-800 rounded-lg" />
              <input placeholder="Date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-slate-800 rounded-lg" />
              <textarea placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-slate-800 rounded-lg h-32" />
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
