'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { certificatesService, uploadImage } from '@/lib/supabaseService'
import { compressImage } from '@/lib/imageCompression'
import type { Certificate } from '@/lib/supabase'

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Certificate>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    const data = await certificatesService.getAll()
    setCertificates(data)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        setLoading(true)
        const fileSizeKB = file.size / 1024
        if (fileSizeKB > 1000) {
          alert('Image is too large! Please use an image smaller than 1MB.')
        }

        const uploadedUrl = await uploadImage(file)
        if (uploadedUrl) {
          setFormData({ ...formData, image: uploadedUrl })
        } else {
          const compressedImage = await compressImage(file, 400)
          setFormData({ ...formData, image: compressedImage })
        }
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Failed to process image.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      if (editingId) {
        await certificatesService.update(editingId, formData)
      } else {
        await certificatesService.create(formData)
      }
      await loadCertificates()
      setIsModalOpen(false)
      setFormData({})
      setEditingId(null)
    } catch (error) {
      console.error('Error saving certificate:', error)
      alert('Failed to save certificate.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        setLoading(true)
        await certificatesService.delete(id)
        await loadCertificates()
      } catch (error) {
        console.error('Error deleting certificate:', error)
        alert('Failed to delete certificate.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = (cert: Certificate) => {
    setEditingId(cert.id)
    setFormData(cert)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">🎓 Certificates Management</h1>
        <button
          onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({}) }}
          className="px-6 py-3 bg-hotpink text-white rounded-lg hover:shadow-lg hover:shadow-hotpink/50 transition-all"
          disabled={loading}
        >
          + Add New
        </button>
      </div>

      {loading && certificates.length === 0 && (
        <div className="text-center py-12">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading certificates...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-hotpink/30 p-4 rounded-lg hover:border-hotpink transition-all"
          >
            {cert.image && (
              <img src={cert.image} alt={cert.title} className="w-full aspect-[3/4] object-cover rounded-lg mb-3" />
            )}
            <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">{cert.title}</h3>
            {cert.type && (
              <div className="mb-2">
                <span className="px-2 py-1 bg-hotpink/20 text-hotpink rounded text-xs border border-hotpink/30">
                  {cert.type}
                </span>
              </div>
            )}
            {cert.category && (
              <p className="text-xs text-gray-400 mb-3">{cert.category}</p>
            )}
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cert)} className="flex-1 px-3 py-2 bg-hotpink text-white text-sm rounded hover:bg-hotpink/80 transition-all" disabled={loading}>Edit</button>
              <button onClick={() => handleDelete(cert.id)} className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-all" disabled={loading}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-black border-2 border-hotpink p-8 rounded-xl max-w-lg w-full my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-hotpink">{editingId ? 'Edit' : 'Add'} Certificate</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Certificate Title *</label>
                <input
                  placeholder="e.g., AWS Solutions Architect"
                  value={formData.title || ''}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Issuer</label>
                <input
                  placeholder="e.g., Amazon Web Services"
                  value={formData.issuer || ''}
                  onChange={e => setFormData({...formData, issuer: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Date</label>
                <input
                  type="text"
                  placeholder="e.g., Jan 2024"
                  value={formData.date || ''}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Type *</label>
                <select
                  value={formData.type || ''}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                >
                  <option value="">Select Type</option>
                  <option value="course">Course</option>
                  <option value="competition">Competition</option>
                  <option value="certification">Certification</option>
                  <option value="workshop">Workshop</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Category *</label>
                <input
                  placeholder="e.g., AI, Web Development, Data Science"
                  value={formData.category || ''}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  placeholder="Brief description of the certificate"
                  value={formData.description || ''}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white h-24 focus:border-hotpink focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Credential URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.credential_url || ''}
                  onChange={e => setFormData({...formData, credential_url: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg text-white focus:border-hotpink focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Certificate Image *</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Image Display Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image_fit"
                      value="cover"
                      checked={formData.image_fit === 'cover' || !formData.image_fit}
                      onChange={e => setFormData({...formData, image_fit: e.target.value as 'cover' | 'contain'})}
                      className="w-4 h-4 text-hotpink bg-black border-hotpink/50 focus:ring-hotpink"
                    />
                    <span className="text-white text-sm">
                      Crop (Fill Frame)
                      <span className="block text-xs text-gray-400">للشهادات العريضة</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="image_fit"
                      value="contain"
                      checked={formData.image_fit === 'contain'}
                      onChange={e => setFormData({...formData, image_fit: e.target.value as 'cover' | 'contain'})}
                      className="w-4 h-4 text-hotpink bg-black border-hotpink/50 focus:ring-hotpink"
                    />
                    <span className="text-white text-sm">
                      Full Image (No Crop)
                      <span className="block text-xs text-gray-400">للشهادات بالمساحة الكاملة</span>
                    </span>
                  </label>
                </div>
              </div>

              {formData.image && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Crop Mode:</p>
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-700">
                        <img src={formData.image} alt="Preview Cover" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Full Image Mode:</p>
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
                        <img src={formData.image} alt="Preview Contain" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={handleSave} className="flex-1 py-3 bg-hotpink text-white rounded-lg hover:bg-hotpink/80 transition-all disabled:opacity-50" disabled={loading || !formData.title || !formData.image || !formData.type || !formData.category}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => { setIsModalOpen(false); setFormData({}); setEditingId(null) }} className="px-6 py-3 bg-black border border-hotpink/50 text-white rounded-lg hover:bg-hotpink/10 transition-all" disabled={loading}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
