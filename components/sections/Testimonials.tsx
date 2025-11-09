'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { testimonialsService } from '@/lib/supabaseService'
import type { Testimonial } from '@/lib/supabase'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    const data = await testimonialsService.getAll()
    setTestimonials(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !feedback.trim()) return

    setIsSubmitting(true)

    try {
      // Save to Supabase
      const result = await testimonialsService.create({
        name: name.trim(),
        feedback: feedback.trim(),
      })

      if (result) {
        // Reset form
        setName('')
        setFeedback('')
        setShowForm(false)

        // Show form again after 3 seconds
        setTimeout(() => setShowForm(true), 3000)
      } else {
        alert('Failed to submit testimonial. Please check your database setup.')
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error)
      alert('Failed to submit testimonial. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="py-32 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            What People Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Share your experience working with me
          </p>
        </motion.div>

        {/* Feedback Form */}
        {showForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-8"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 bg-[#0e0e0e] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts about working with me..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0e0e0e] border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !feedback.trim()}
                className="w-full px-6 py-3 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-200 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 text-center py-12 bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-cyan-500/30 rounded-2xl"
            style={{
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.2)'
            }}
          >
            <svg className="w-16 h-16 text-cyan-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-xl text-white font-medium mb-2">Thank you for your feedback!</p>
            <p className="text-gray-400">Your testimonial has been submitted and is awaiting approval.</p>
          </motion.div>
        )}

        {/* Testimonials Horizontal Carousel - Full Width */}
        {testimonials.length > 0 && (
          <div className="relative overflow-hidden -mx-6 md:-mx-16 lg:-mx-24">
            <motion.div
              className="flex gap-6 px-6 md:px-16 lg:px-24"
              animate={{
                x: [0, -testimonials.length * 400]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: testimonials.length * 8,
                  ease: "linear"
                }
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[380px] bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-6"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 font-bold text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1">
                      {/* Name and Date */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-bold">{testimonial.name}</h3>
                        <span className="text-xs text-gray-500">{testimonial.date}</span>
                      </div>

                      {/* Feedback */}
                      <p className="text-gray-400 leading-relaxed line-clamp-4">
                        "{testimonial.feedback}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Empty State */}
        {testimonials.length === 0 && showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-gray-500 text-sm">
              Be the first to share your feedback!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
