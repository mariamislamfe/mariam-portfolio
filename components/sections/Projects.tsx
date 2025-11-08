'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { projectsService } from '@/lib/supabaseService'
import type { Project } from '@/lib/supabase'
import Image from 'next/image'
import SectionHeading from '../SectionHeading'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [otherProjects, setOtherProjects] = useState<Project[]>([])
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const data = await projectsService.getAll()
    setProjects(data)

    // Separate featured and other projects
    const featured = data.filter((p: Project) => p.featured).slice(0, 3)
    const others = data.filter((p: Project) => !p.featured)
    setFeaturedProjects(featured)
    setOtherProjects(others)
  }

  const displayedProjects = showAll ? [...featuredProjects, ...otherProjects] : featuredProjects

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Showcasing my latest work and innovations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Project Image with overlay on hover */}
              {project.image && (
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Title overlay - always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white group-hover:text-hotpink transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Hover overlay with description and details */}
                  <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-hotpink mb-4">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-hotpink/20 border border-hotpink/40 text-hotpink rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Awards */}
                    {project.awards && project.awards.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-400 text-sm font-semibold">
                          {project.awards.length} Award{project.awards.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    {/* View text in hot pink */}
                    <div className="mt-auto">
                      <span className="text-hotpink font-semibold text-lg flex items-center gap-2">
                        View
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-hotpink font-semibold text-lg hover:text-accent transition-colors duration-300"
            >
              {showAll ? 'Show Less' : 'View More'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
