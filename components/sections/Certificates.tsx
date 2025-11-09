'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { certificatesService } from '@/lib/supabaseService'
import type { Certificate } from '@/lib/supabase'
import Image from 'next/image'

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    const data = await certificatesService.getAll()
    setCertificates(data)
  }

  // Filter options
  const filterOptions = ['All', 'Frontend', 'Full-Stack', 'Design', 'Competition']

  // Get filtered certificates
  const filteredCertificates = selectedFilter === 'All'
    ? certificates
    : certificates.filter(cert =>
        cert.category?.toLowerCase() === selectedFilter.toLowerCase() ||
        cert.type?.toLowerCase() === selectedFilter.toLowerCase()
      )

  // Show only 6 certificates initially
  const displayedCertificates = showAll ? filteredCertificates : filteredCertificates.slice(0, 6)

  // Mobile carousel handlers
  const handleMobilePrevious = () => {
    setCurrentMobileIndex((prev) => (prev === 0 ? displayedCertificates.length - 1 : prev - 1))
  }

  const handleMobileNext = () => {
    setCurrentMobileIndex((prev) => (prev === displayedCertificates.length - 1 ? 0 : prev + 1))
  }

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleMobileNext()
    }
    if (touchStart - touchEnd < -75) {
      handleMobilePrevious()
    }
  }

  if (certificates.length === 0) {
    return (
      <section id="certificates" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-500">Loading certificates...</div>
        </div>
      </section>
    )
  }

  const currentMobileCert = displayedCertificates[currentMobileIndex]

  return (
    <>
      <section id="certificates" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Professional Certifications
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Continuous learning and skill development through industry-recognized certifications
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {filterOptions.map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => {
                  setSelectedFilter(filter)
                  setCurrentMobileIndex(0)
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-[#1a1a1a] text-gray-400 border border-gray-800 hover:border-cyan-500/30 hover:text-cyan-400'
                }`}
                style={{
                  boxShadow: selectedFilter === filter
                    ? '0 0 20px rgba(6, 182, 212, 0.2)'
                    : '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-500">
              Showing {filteredCertificates.length} {filteredCertificates.length === 1 ? 'certificate' : 'certificates'}
            </p>
          </motion.div>

          {/* Mobile Carousel (visible only on mobile) */}
          <div className="md:hidden">
            {displayedCertificates.length > 0 && (
              <div className="relative max-w-md mx-auto">
                {/* Certificate Card */}
                <div
                  className="relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentMobileIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedCert(currentMobileCert)}
                      className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-500/30"
                      style={{
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                      {/* Certificate Image - Full Size */}
                      {currentMobileCert?.image && (
                        <div className="relative w-full h-80 bg-[#0e0e0e]/50">
                          <Image
                            src={currentMobileCert.image}
                            alt={currentMobileCert.title}
                            fill
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Date Badge */}
                          {currentMobileCert.date && (
                            <div className="absolute top-3 right-3 px-3 py-1 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-800 rounded-lg">
                              <span className="text-xs text-gray-400">{currentMobileCert.date}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Card Content - Minimal Info */}
                      <div className="p-5 relative z-10 bg-gradient-to-t from-[#0e0e0e] to-transparent">
                        {/* Title */}
                        <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                          {currentMobileCert?.title}
                        </h3>

                        {/* Issuer */}
                        {currentMobileCert?.issuer && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                            {currentMobileCert.issuer}
                          </p>
                        )}

                        {/* Tags/Skills */}
                        {(currentMobileCert?.category || currentMobileCert?.type) && (
                          <div className="flex flex-wrap gap-2">
                            {currentMobileCert.category && (
                              <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-md text-xs">
                                {currentMobileCert.category}
                              </span>
                            )}
                            {currentMobileCert.type && currentMobileCert.type !== currentMobileCert.category && (
                              <span className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-md text-xs">
                                {currentMobileCert.type}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handleMobilePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-full p-3 transition-all z-20 backdrop-blur-sm"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleMobileNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-full p-3 transition-all z-20 backdrop-blur-sm"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                  {displayedCertificates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMobileIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentMobileIndex
                          ? 'w-8 h-2 bg-cyan-400'
                          : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="text-center mt-3">
                  <p className="text-gray-500 text-sm">
                    {currentMobileIndex + 1} / {displayedCertificates.length}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Grid - 3x3 Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-500/30"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                {/* Certificate Image - Full Size */}
                {cert.image && (
                  <div className="relative w-full h-80 bg-[#0e0e0e]/50">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Date Badge */}
                    {cert.date && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-800 rounded-lg">
                        <span className="text-xs text-gray-400">{cert.date}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content - Minimal Info */}
                <div className="p-5 relative z-10 bg-gradient-to-t from-[#0e0e0e] to-transparent">
                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  {cert.issuer && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                      {cert.issuer}
                    </p>
                  )}

                  {/* Tags/Skills */}
                  {(cert.category || cert.type) && (
                    <div className="flex flex-wrap gap-2">
                      {cert.category && (
                        <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-md text-xs">
                          {cert.category}
                        </span>
                      )}
                      {cert.type && cert.type !== cert.category && (
                        <span className="px-2 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-md text-xs">
                          {cert.type}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          {filteredCertificates.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={() => {
                  setShowAll(!showAll)
                  setCurrentMobileIndex(0)
                }}
                className="px-8 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-all duration-300 text-sm text-gray-300 hover:text-white"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
                }}
              >
                {showAll ? 'Show Less' : 'View More Certificates'}
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-500 mb-2">No certificates found</div>
              <button
                onClick={() => setSelectedFilter('All')}
                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-4 -right-4 z-10 bg-[#1a1a1a] hover:bg-cyan-500/20 border border-gray-800 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 rounded-full p-3 shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Certificate Image - Left side */}
                {selectedCert.image && (
                  <div className="relative w-full md:w-2/3 h-64 md:h-[500px] bg-[#0e0e0e]">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                )}

                {/* Certificate Details - Right side */}
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {selectedCert.title}
                  </h2>

                  {selectedCert.issuer && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Issued by</p>
                      <p className="text-base text-gray-300">{selectedCert.issuer}</p>
                    </div>
                  )}

                  {selectedCert.date && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-base text-gray-300">{selectedCert.date}</p>
                    </div>
                  )}

                  {selectedCert.description && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {selectedCert.description}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {(selectedCert.category || selectedCert.type) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedCert.category && (
                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-md text-xs">
                          {selectedCert.category}
                        </span>
                      )}
                      {selectedCert.type && (
                        <span className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-gray-400 rounded-md text-xs">
                          {selectedCert.type}
                        </span>
                      )}
                    </div>
                  )}

                  {selectedCert.credential_url && (
                    <a
                      href={selectedCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 hover:text-cyan-200 rounded-xl font-medium shadow-lg transition-all text-sm"
                      style={{
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
                      }}
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
