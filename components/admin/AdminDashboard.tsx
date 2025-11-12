'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectsManager from './ProjectsManager'
import AwardsManager from './AwardsManager'
import PublicationsManager from './PublicationsManager'
import GalleryManager from './GalleryManager'
import CertificatesManager from './CertificatesManager'
import StorageManager from './StorageManager'
import Link from 'next/link'

type Section = 'projects' | 'awards' | 'publications' | 'gallery' | 'certificates' | 'storage' | 'companies' | 'testimonials'

interface Props {
  onLogout: () => void
}

const sections = [
  { id: 'projects' as Section, name: 'Projects', icon: '💻' },
  { id: 'awards' as Section, name: 'Awards', icon: '🏆' },
  { id: 'publications' as Section, name: 'Publications', icon: '📚' },
  { id: 'gallery' as Section, name: 'Gallery', icon: '🖼️' },
  { id: 'certificates' as Section, name: 'Certificates', icon: '🎓' },
  { id: 'storage' as Section, name: 'Storage', icon: '💾' },
]

const externalSections = [
  { path: '/admin/companies', name: 'Companies', icon: '🏢' },
  { path: '/admin/testimonials', name: 'Testimonials', icon: '💬' },
]

export default function AdminDashboard({ onLogout }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('projects')

  const renderSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsManager />
      case 'awards':
        return <AwardsManager />
      case 'publications':
        return <PublicationsManager />
      case 'gallery':
        return <GalleryManager />
      case 'certificates':
        return <CertificatesManager />
      case 'storage':
        return <StorageManager />
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0e0e0e] border-r border-gray-800 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-400">👑 Admin Panel</h2>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400'
              }`}
            >
              {section.icon} {section.name}
            </button>
          ))}

          {/* External Sections */}
          <div className="pt-4 mt-4 border-t border-gray-800">
            {externalSections.map((section) => (
              <Link
                key={section.path}
                href={section.path}
                className="block w-full text-left px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                {section.icon} {section.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-auto pt-8 space-y-2">
          <a
            href="/"
            className="block w-full px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-center transition-colors"
          >
            🏠 View Portfolio
          </a>
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 rounded-lg transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#0e0e0e]">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </main>
    </div>
  )
}
