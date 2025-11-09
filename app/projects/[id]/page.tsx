'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { projectsService } from '@/mariam-portfolio/lib/supabaseService'
import type { Project } from '@/mariam-portfolio/lib/supabase'

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProject()
  }, [params.id])

  async function loadProject() {
    try {
      const allProjects = await projectsService.getAll()
      const foundProject = allProjects.find(p => p.id.toString() === params.id)
      setProject(foundProject || null)
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push('/#projects')}
            className="px-6 py-3 bg-hotpink hover:bg-accent-dark text-white rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/#projects')}
          className="mb-8 flex items-center space-x-2 text-hotpink hover:text-accent-dark transition-colors group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Projects</span>
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-accent to-pink-600 bg-clip-text text-transparent">
            {project.title}
          </h1>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-hotpink/10 border border-hotpink/30 text-hotpink rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Project Image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        )}

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
            {project.description}
          </p>
        </motion.div>

        {/* Awards Section */}
        {project.awards && project.awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Awards & Recognition</h2>
            <div className="grid gap-4">
              {project.awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-6 card-gradient rounded-xl border border-hotpink/20 hover:border-hotpink/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-hotpink flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-900 dark:text-white text-lg font-medium">{award}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Link */}
        {project.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-hotpink to-accent hover:from-accent hover:to-accent-dark text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-hotpink/50 transition-all transform hover:scale-105"
            >
              <span>View Live Project</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  )
}
