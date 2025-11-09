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
    <section id="events" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Events & Conferences"
          subtitle="Speaking engagements and appearances"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group card-gradient rounded-2xl overflow-hidden border-2 border-gray-200/20 dark:border-gray-700/30 hover:border-hotpink/60 transition-all duration-300 hover:shadow-2xl hover:shadow-hotpink/20"
            >
              {/* Event Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-hotpink to-accent px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white text-sm font-bold">{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-hotpink transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Type Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center space-x-1 px-3 py-1 bg-hotpink/10 border border-hotpink/30 text-hotpink rounded-full text-xs font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Conference</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
