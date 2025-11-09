'use client'

import { useState, useEffect } from 'react'
import { companiesService, uploadImage } from '@/lib/supabaseService'
import type { Company } from '@/lib/supabase'
import Image from 'next/image'

export default function CompaniesAdmin() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [orderNum, setOrderNum] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    const data = await companiesService.getAll()
    setCompanies(data)
  }

  const resetForm = () => {
    setName('')
    setWebsite('')
    setDescription('')
    setLogo(null)
    setLogoPreview('')
    setOrderNum(0)
    setIsAddingNew(false)
    setEditingId(null)
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)

    try {
      let logoUrl = logoPreview

      // Upload logo if a new file was selected
      if (logo) {
        const uploadedUrl = await uploadImage(logo, 'company-logos')
        if (uploadedUrl) {
          logoUrl = uploadedUrl
        }
      }

      const companyData = {
        name: name.trim(),
        website: website.trim() || undefined,
        description: description.trim() || undefined,
        logo: logoUrl || undefined,
        order: orderNum
      }

      if (editingId) {
        await companiesService.update(editingId, companyData)
      } else {
        await companiesService.create(companyData)
      }

      await loadCompanies()
      resetForm()
    } catch (error) {
      console.error('Error saving company:', error)
      alert('Failed to save company')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (company: Company) => {
    setEditingId(company.id)
    setName(company.name)
    setWebsite(company.website || '')
    setDescription(company.description || '')
    setLogoPreview(company.logo || '')
    setOrderNum(company.order || 0)
    setIsAddingNew(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this company?')) return

    const success = await companiesService.delete(id)
    if (success) {
      await loadCompanies()
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Companies</h1>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-lg"
          >
            {isAddingNew ? 'Cancel' : 'Add New Company'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {isAddingNew && (
          <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Company' : 'Add New Company'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-[#0e0e0e] border border-gray-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0e0e0e] border border-gray-800 rounded-lg text-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-[#0e0e0e] border border-gray-800 rounded-lg text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Logo</label>
                <input
                  type="file"
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="w-full px-4 py-2 bg-[#0e0e0e] border border-gray-800 rounded-lg text-white"
                />
                {logoPreview && (
                  <div className="mt-2 relative w-32 h-20 bg-white/10 rounded-lg overflow-hidden">
                    <Image src={logoPreview} alt="Logo preview" fill className="object-contain p-2" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Display Order</label>
                <input
                  type="number"
                  value={orderNum || 0}
                  onChange={(e) => setOrderNum(e.target.value ? parseInt(e.target.value) : 0)}
                  className="w-full px-4 py-2 bg-[#0e0e0e] border border-gray-800 rounded-lg text-white"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update Company' : 'Add Company'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Companies List */}
        <div className="grid grid-cols-1 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 flex items-center gap-4"
            >
              {company.logo && (
                <div className="relative w-24 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={company.logo} alt={company.name} fill className="object-contain p-2" />
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{company.name}</h3>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">
                    {company.website}
                  </a>
                )}
                {company.description && (
                  <p className="text-sm text-gray-400 mt-1">{company.description}</p>
                )}
                {company.order !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">Order: {company.order}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(company)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(company.id)}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 text-red-300 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {companies.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No companies yet. Click "Add New Company" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
