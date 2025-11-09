'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectsManager from './ProjectsManager'
import AwardsManager from './AwardsManager'
import PublicationsManager from './PublicationsManager'
import EventsManager from './EventsManager'
import GalleryManager from './GalleryManager'
import CertificatesManager from './CertificatesManager'
import StorageManager from './StorageManager'

type Section = 'projects' | 'awards' | 'publications' | 'events' | 'gallery' | 'certificates' | 'storage'

interface Props {
  onLogout: () => void
}

const sections = [
  { id: 'projects' as Section, name: 'Projects', icon: '💻' },
  { id: 'awards' as Section, name: 'Awards', icon: '🏆' },
  { id: 'publications' as Section, name: 'Publications', icon: '📚' },
  { id: 'events' as Section, name: 'Events', icon: '📅' },
  { id: 'gallery' as Section, name: 'Gallery', icon: '🖼️' },
  { id: 'certificates' as Section, name: 'Certificates', icon: '🎓' },
  { id: 'storage' as Section, name: 'Storage', icon: '💾' },
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
      case 'events':
        return <EventsManager />
      case 'gallery':
        return <GalleryManager />
      case 'certificates':
        return <CertificatesManager />
      case 'storage':
        return <StorageManager />
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-hotpink/30 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-hotpink">👑 Admin Panel</h2>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-hotpink text-white'
                  : 'text-gray-400 hover:bg-hotpink/10 hover:text-hotpink'
              }`}
            >
              {section.icon} {section.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 space-y-2">
          <a
            href="/"
            className="block w-full px-4 py-3 bg-hotpink/10 hover:bg-hotpink/20 border border-hotpink/30 text-hotpink rounded-lg text-center transition-colors"
          >
            🏠 View Portfolio
          </a>
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-black">
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
