'use client'

import { useState, useEffect } from 'react'
import { testimonialsService } from '@/lib/supabaseService'
import type { Testimonial } from '@/lib/supabase'

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    const data = await testimonialsService.getAllForAdmin()
    setTestimonials(data)
  }

  const handleApprove = async (id: number) => {
    try {
      await testimonialsService.approve(id)
      await loadTestimonials()
    } catch (error) {
      console.error('Error approving testimonial:', error)
      alert('Failed to approve testimonial')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const success = await testimonialsService.delete(id)
      if (success) {
        await loadTestimonials()
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial')
    }
  }

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'approved') return t.approved === true
    if (filter === 'pending') return t.approved === false
    return true
  })

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Manage Testimonials</h1>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === 'all'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              All ({testimonials.length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === 'approved'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              Approved ({testimonials.filter(t => t.approved).length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filter === 'pending'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              Pending ({testimonials.filter(t => !t.approved).length})
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`border rounded-2xl p-6 ${
                testimonial.approved
                  ? 'bg-[#1a1a1a] border-gray-800'
                  : 'bg-yellow-500/5 border-yellow-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 font-bold text-lg">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                      {testimonial.approved ? (
                        <span className="px-2 py-1 bg-green-500/20 border border-green-500/40 text-green-300 rounded-md text-xs">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 rounded-md text-xs">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!testimonial.approved && (
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="px-4 py-2 bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 text-green-300 rounded-lg text-sm"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 text-red-300 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No testimonials found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
