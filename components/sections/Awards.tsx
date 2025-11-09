'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { awardsService } from '@//lib/supabaseService'
import type { Award } from '@//lib/supabase'
import SectionHeading from '../SectionHeading'

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([])

  useEffect(() => {
    loadAwards()
  }, [])

  async function loadAwards() {
    const data = await awardsService.getAll()
    setAwards(data)
  }

  return (
    <section id="awards" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Awards & Recognition
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Celebrating achievements and milestones
          </p>
        </motion.div>

        {/* Timeline Layout - Alternating Left and Right */}
        <div className="relative">
          {/* Center Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-teal-500 to-cyan-600 transform -translate-x-1/2" />

          {/* Awards Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {awards.map((award, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot - centered */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 border-4 border-[#0e0e0e] shadow-xl z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: [1, 1.4, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      className="absolute inset-0 rounded-full bg-cyan-500/30 blur-md"
                    />
                  </div>

                  {/* Award Card - takes up half width on desktop */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, x: isLeft ? 5 : -5 }}
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-6 rounded-2xl border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden"
                      style={{
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      {/* Mobile Timeline Dot */}
                      <div className="md:hidden absolute -left-4 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 border-3 border-[#0e0e0e] shadow-lg" />

                      {/* Date Badge */}
                      <div className="inline-block mb-3 px-4 py-1.5 bg-[#0e0e0e]/90 backdrop-blur-sm border border-gray-800 rounded-lg">
                        <span className="text-gray-400 text-sm font-medium">{award.date}</span>
                      </div>

                      {/* Award Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {award.title}
                      </h3>

                      {/* Award Description */}
                      <p className="text-gray-400 leading-relaxed">
                        {award.description}
                      </p>

                      {/* Decorative Trophy Icon */}
                      <div className={`absolute top-6 ${isLeft ? 'right-6' : 'left-6 md:right-6'} opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none`}>
                        <svg className="w-20 h-20 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-cyan-600 ml-3" />
        </div>
      </div>
    </section>
  )
}
