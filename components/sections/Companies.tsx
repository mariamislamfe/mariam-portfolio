'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { companiesService } from '@/lib/supabaseService'
import type { Company } from '@/lib/supabase'

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    loadCompanies()
  }, [])

  useEffect(() => {
    // Check if companies overflow the container
    const checkOverflow = () => {
      // Each company card is ~192px (w-48) + 48px gap = ~240px per item
      const cardWidth = 240
      const containerWidth = window.innerWidth
      const totalWidth = companies.length * cardWidth

      setShouldScroll(totalWidth > containerWidth)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [companies])

  const loadCompanies = async () => {
    const data = await companiesService.getAll()
    setCompanies(data)
  }

  // Always show section, even if empty (for now during development)

  return (
    <section id="companies" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Collaborations & Partners
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Organizations and teams I've worked with
          </p>
        </motion.div>

        {/* Companies Container */}
        {companies.length > 0 ? (
          shouldScroll ? (
            // Scrolling Marquee - Full Width (when overflow)
            <div className="relative -mx-6 md:-mx-16 lg:-mx-24">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0e0e0e] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0e0e0e] to-transparent z-10 pointer-events-none" />

              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-12 items-center px-6 md:px-16 lg:px-24"
                  animate={{
                    x: [0, -100 * companies.length]
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 10,
                      ease: "linear"
                    }
                  }}
                >
                  {/* Duplicate for seamless loop */}
                  {[...companies, ...companies].map((company, index) => (
                    <motion.div
                      key={`${company.id}-${index}`}
                      className="flex-shrink-0 group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-48 h-32 relative flex items-center justify-center transition-all duration-300">
                        {/* Company Logo */}
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={192}
                            height={128}
                            className="object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="text-5xl mb-1 opacity-50">🏢</div>
                            <p className="text-xs text-gray-500 font-mono">{company.name}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          ) : (
            // Static Grid (when no overflow)
            <div className="flex flex-wrap items-center justify-center gap-12">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-48 h-32 relative flex items-center justify-center transition-all duration-300">
                    {/* Company Logo */}
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={192}
                        height={128}
                        className="object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-5xl mb-1 opacity-50">🏢</div>
                        <p className="text-xs text-gray-500 font-mono">{company.name}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No companies added yet. Add companies from the admin panel.</p>
          </div>
        )}

        {/* Optional: Add call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            Interested in collaboration?{' '}
            <a href="#contact" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
              Let's connect
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
