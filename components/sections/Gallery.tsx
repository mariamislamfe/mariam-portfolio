'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { galleryService } from '@/lib/supabaseService'
import type { GalleryItem } from '@/lib/supabase'
import Image from 'next/image'
import SectionHeading from '../SectionHeading'

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    const data = await galleryService.getAll()
    setGallery(data)
  }

  const displayedGallery = showAll ? gallery : gallery.slice(0, 9)

  return (
    <>
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Gallery"
            subtitle="Moments captured through my journey"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedItem(item)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border-2 border-gray-200/20 dark:border-gray-700/30 hover:border-hotpink/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-hotpink/20"
              >
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Caption - always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-bold text-lg drop-shadow-lg">{item.caption}</p>
                </div>

                {/* View icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-hotpink p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {gallery.length > 9 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-4 bg-hotpink/20 border-2 border-hotpink/50 rounded-xl font-semibold text-gray-900 dark:text-white hover:bg-hotpink hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                {showAll ? 'Show Less' : `View More (${gallery.length - 9} more)`}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox with Details */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-4 -right-4 z-10 bg-hotpink hover:bg-accent-dark text-white rounded-full p-3 shadow-2xl transition-all transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = gallery.findIndex(item => item.id === selectedItem.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1
                setSelectedItem(gallery[prevIndex])
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-hotpink/90 hover:bg-hotpink text-white rounded-full p-3 shadow-2xl transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = gallery.findIndex(item => item.id === selectedItem.id)
                const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0
                setSelectedItem(gallery[nextIndex])
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-hotpink/90 hover:bg-hotpink text-white rounded-full p-3 shadow-2xl transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border-4 border-hotpink shadow-2xl shadow-hotpink/30 bg-black mb-4">
              <Image
                src={selectedItem.image}
                alt={selectedItem.caption}
                fill
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedItem.caption}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
