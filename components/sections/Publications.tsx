'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { publicationsService } from '@/lib/supabaseService'
import type { Publication } from '@/lib/supabase'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([])

  useEffect(() => {
    loadPublications()
  }, [])

  async function loadPublications() {
    const data = await publicationsService.getAll()
    setPublications(data)
  }

  return (
    <section id="publications" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Publications
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Research contributions and academic work in AI and software engineering
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {publications.map((pub, index) => (
            <AnimatedCard key={pub.id} delay={index * 0.1}>
              {/* Icon */}
              <div className="mb-6 inline-flex p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {pub.title}
              </h3>

              {/* Authors */}
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pub.authors}
                </p>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-3 mb-6">
                <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-400 text-sm italic">
                  {pub.venue}
                </p>
              </div>

              {/* Read Paper Link */}
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-medium text-sm transition-colors group"
                >
                  <span>Read Publication</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
