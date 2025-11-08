'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { awardsService } from '@/lib/supabaseService'
import type { Award } from '@/lib/supabase'
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
    <section id="awards" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Awards & Recognition"
          subtitle="Celebrating achievements and milestones"
        />

        {/* Timeline Layout - Alternating Left and Right */}
        <div className="relative">
          {/* Center Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-hotpink via-accent to-pink-600 transform -translate-x-1/2" />

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
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-hotpink to-accent border-4 border-white dark:border-black shadow-xl z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: [1, 1.4, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      className="absolute inset-0 rounded-full bg-hotpink/30 blur-md"
                    />
                  </div>

                  {/* Award Card - takes up half width on desktop */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, x: isLeft ? 5 : -5 }}
                      className="card-gradient p-6 rounded-2xl border-2 border-gray-200/20 dark:border-gray-700/30 hover:border-hotpink/60 transition-all duration-300 hover:shadow-2xl hover:shadow-hotpink/20 group relative overflow-hidden"
                    >
                      {/* Mobile Timeline Dot */}
                      <div className="md:hidden absolute -left-4 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-hotpink to-accent border-3 border-white dark:border-black shadow-lg" />

                      {/* Date Badge */}
                      <div className="inline-block mb-3 px-4 py-1.5 bg-gradient-to-r from-hotpink to-accent rounded-full shadow-md">
                        <span className="text-white text-sm font-bold">{award.date}</span>
                      </div>

                      {/* Award Title */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-hotpink transition-colors">
                        {award.title}
                      </h3>

                      {/* Award Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {award.description}
                      </p>

                      {/* Decorative Trophy Icon */}
                      <div className={`absolute top-6 ${isLeft ? 'right-6' : 'left-6 md:right-6'} opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none`}>
                        <svg className="w-20 h-20 text-hotpink" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-hotpink/0 via-accent/0 to-pink-600/0 group-hover:from-hotpink/5 group-hover:via-accent/5 group-hover:to-pink-600/5 transition-all duration-500 rounded-2xl pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-hotpink via-accent to-pink-600 ml-3" />
        </div>
      </div>
    </section>
  )
}
