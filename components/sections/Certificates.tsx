'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { certificatesService } from '@//lib/supabaseService'
import type { Certificate } from '@//lib/supabase'
import Image from 'next/image'
import SectionHeading from '../SectionHeading'

const ITEMS_PER_PAGE = 6

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([])
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadCertificates()
  }, [])

  useEffect(() => {
    filterCertificates()
  }, [certificates, selectedType, selectedCategory])

  const loadCertificates = async () => {
    const data = await certificatesService.getAll()
    setCertificates(data)
  }

  const filterCertificates = () => {
    let filtered = [...certificates]

    if (selectedType !== 'all') {
      filtered = filtered.filter(cert => cert.type === selectedType)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(cert => cert.category === selectedCategory)
    }

    setFilteredCertificates(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Get unique types and categories for filters
  const types = ['all', ...Array.from(new Set(certificates.map(c => c.type).filter(Boolean)))]
  const categories = ['all', ...Array.from(new Set(certificates.map(c => c.category).filter(Boolean)))]

  // Pagination
  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const displayedCertificates = filteredCertificates.slice(startIndex, endIndex)

  if (certificates.length === 0) {
    return (
      <section id="certificates" className="py-20 px-4">
        <div className="text-center">
          <SectionHeading
            title="Certificates"
            subtitle="Loading certificates..."
          />
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="certificates" className="py-20 px-4">
        <div className="w-full mx-auto px-4 md:px-8 lg:px-16">
          <SectionHeading
            title="Certificates"
            subtitle="Professional certifications and achievements"
          />

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Type Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Filter by Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-hotpink focus:outline-none transition-colors"
              >
                <option value="all">All Types</option>
                {types.filter(t => t !== 'all').map(type => (
                  <option key={type} value={type}>
                    {type?.charAt(0).toUpperCase() + type?.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-hotpink focus:outline-none transition-colors"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {displayedCertificates.length} of {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative cursor-pointer"
              >
                <div className="relative backdrop-blur-sm border-2 rounded-2xl overflow-hidden hover:border-hotpink/60 hover:shadow-2xl transition-all duration-500 bg-white/5 dark:bg-black/10 border-gray-200/10 dark:border-gray-700/20 shadow-lg h-full flex flex-col">
                  {/* Certificate Image - Larger */}
                  <div className="relative w-full h-72 bg-transparent flex-shrink-0">
                    {cert.image && (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className={`${cert.image_fit === 'contain' ? 'object-contain p-3' : 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
                      />
                    )}

                    {/* Type Badge */}
                    {cert.type && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg backdrop-blur-xl border shadow-md bg-hotpink/90 border-hotpink">
                        <span className="text-xs font-bold text-white">{cert.type}</span>
                      </div>
                    )}

                    {/* Date Badge */}
                    {cert.date && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm">
                        <svg className="w-3 h-3 text-hotpink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-white">{cert.date}</span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Info - Compact */}
                  <div className="p-4 flex flex-col flex-1 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-base font-bold text-white group-hover:text-hotpink transition-colors mb-2 line-clamp-1">
                      {cert.title}
                    </h3>

                    {cert.issuer && (
                      <p className="font-semibold mb-2 text-xs text-hotpink">
                        {cert.issuer}
                      </p>
                    )}

                    {cert.category && (
                      <div className="mb-2">
                        <span className="px-2 py-1 bg-hotpink/20 border border-hotpink/40 text-hotpink rounded-full text-xs font-medium">
                          {cert.category}
                        </span>
                      </div>
                    )}

                    {/* View Details Link */}
                    <div className="mt-auto flex items-center gap-2 text-xs font-semibold text-hotpink group-hover:text-accent transition-colors">
                      <span>View Details</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-hotpink/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-hotpink disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-hotpink text-white'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-hotpink'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-hotpink disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certificate Detail Modal/Dialog - Rectangle landscape orientation */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/95 dark:bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-4 -right-4 z-10 bg-hotpink hover:bg-accent-dark text-white rounded-full p-3 shadow-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border-4 border-hotpink shadow-2xl shadow-hotpink/30">
              <div className="flex flex-col md:flex-row">
                {/* Certificate Image - Left side, landscape rectangle */}
                {selectedCert.image && (
                  <div className="relative w-full md:w-2/3 h-64 md:h-[500px] bg-white dark:bg-gray-900">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                )}

                {/* Certificate Details - Right side */}
                <div className="w-full md:w-1/3 p-6 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedCert.title}
                  </h2>
                  {selectedCert.issuer && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-hotpink mb-1">Issued by:</p>
                      <p className="text-base text-gray-700 dark:text-gray-300">{selectedCert.issuer}</p>
                    </div>
                  )}
                  {selectedCert.date && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-hotpink mb-1">Date:</p>
                      <p className="text-base text-gray-600 dark:text-gray-400">{selectedCert.date}</p>
                    </div>
                  )}
                  {selectedCert.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedCert.description}
                      </p>
                    </div>
                  )}
                  {selectedCert.credential_url && (
                    <a
                      href={selectedCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-hotpink to-accent hover:from-accent hover:to-accent-dark text-white rounded-xl font-semibold shadow-lg hover:shadow-hotpink/50 transition-all text-sm"
                    >
                      <span>View Credential</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}