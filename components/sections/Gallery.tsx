'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { galleryService } from '@//lib/supabaseService'
import type { GalleryItem } from '@//lib/supabase'
import Image from 'next/image'

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    const data = await galleryService.getAll()
    setGallery(data)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gallery.length])

  // Touch swipe support
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
      // Swipe left - next
      handleNext()
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right - previous
      handlePrevious()
    }
  }

  if (gallery.length === 0) {
    return (
      <section id="gallery" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-gray-500">Loading gallery...</div>
        </div>
      </section>
    )
  }

  const currentItem = gallery[currentIndex]

  return (
    <section id="gallery" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Gallery
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Moments captured through my journey
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Image Card */}
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 bg-gradient-to-br from-[#1a1a1a] to-[#151515]"
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                }}
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.caption}
                  fill
                  className="object-contain p-4"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none">
                  <p className="text-white text-xl font-semibold text-center">
                    {currentItem.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-full p-4 transition-all z-20 backdrop-blur-sm group"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
            }}
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 rounded-full p-4 transition-all z-20 backdrop-blur-sm group"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
            }}
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-cyan-400'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              {currentIndex + 1} / {gallery.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
