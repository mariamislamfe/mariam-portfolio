'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { publicationsService } from '@//lib/supabaseService'
import type { Publication } from '@//lib/supabase'
import SectionHeading from '../SectionHeading'

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
    <section id="publications" className="py-20 px-4">
      <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
        <SectionHeading
          title="Publications"
          subtitle="Research contributions and academic work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative card-gradient p-6 rounded-2xl border-2 border-gray-200/20 dark:border-gray-700/30 hover:border-hotpink/60 transition-all duration-300 hover:shadow-2xl hover:shadow-hotpink/20 group overflow-hidden"
            >
              {/* Book/Document Icon */}
              <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-hotpink to-accent rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Publication Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-hotpink transition-colors leading-snug">
                {pub.title}
              </h3>

              {/* Authors */}
              <div className="flex items-start space-x-2 mb-2">
                <svg className="w-5 h-5 text-hotpink flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {pub.authors}
                </p>
              </div>

              {/* Venue */}
              <div className="flex items-start space-x-2 mb-4">
                <svg className="w-5 h-5 text-hotpink flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                  {pub.venue}
                </p>
              </div>

              {/* Read Paper Link */}
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-hotpink to-accent hover:from-accent hover:to-accent-dark text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-hotpink/50 transition-all transform hover:scale-105"
                >
                  <span>Read Paper</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-hotpink/10 to-transparent rounded-bl-full opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
