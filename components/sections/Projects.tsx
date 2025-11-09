'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { projectsService } from '@/lib/supabaseService'
import type { Project } from '@/lib/supabase'
import Image from 'next/image'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

export default function Projects() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [otherProjects, setOtherProjects] = useState<Project[]>([])
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const data = await projectsService.getAll()
    const featured = data.filter((p: Project) => p.featured).slice(0, 3)
    const others = data.filter((p: Project) => !p.featured)
    setFeaturedProjects(featured)
    setOtherProjects(others)
  }

  const displayedProjects = showAll ? [...featuredProjects, ...otherProjects] : featuredProjects

  return (
    <section id="projects" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 relative">
      {/* Background gradient matching Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Milestones in the learning journey
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl">
            Each project marks a step forward, showcasing my growth and journey as a developer. Explore how I've tackled challenges and built solutions along the way.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div
                className="aspect-square cursor-pointer group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-0 transition-all duration-500 hover:border-cyan-500/30 flex flex-col"
                onClick={() => router.push(`/projects/${project.id}`)}
                style={{
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Year Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                  <span className="px-2 sm:px-3 py-1 bg-[#0e0e0e]/90 backdrop-blur-sm border border-gray-800 rounded-lg text-xs text-gray-400 font-medium">
                    2024
                  </span>
                </div>

                {project.image && (
                  <div className="relative flex-1 rounded-t-2xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />
                  </div>
                )}

                <div className="p-4 sm:p-6 relative z-10 bg-[#0e0e0e] flex flex-col justify-end">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-end mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-transparent border border-gray-800 rounded-full hover:border-cyan-500/50 transition-all duration-300 text-sm text-gray-300 hover:text-white flex items-center gap-2 group"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <span>{showAll ? 'Show Less' : 'View all projects'}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
