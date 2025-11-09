'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { eventsService } from '@//lib/supabaseService'
import type { Event } from '@//lib/supabase'
import Image from 'next/image'
import SectionHeading from '../SectionHeading'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const data = await eventsService.getAll()
    setEvents(data)
  }

  return (
    <section id="events" className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Events & Conferences
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Speaking engagements and community appearances
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-2xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[#0e0e0e]/90 backdrop-blur-sm border border-gray-800 px-4 py-2 rounded-lg">
                  <span className="text-gray-400 text-sm font-medium">{event.date}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-400 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
