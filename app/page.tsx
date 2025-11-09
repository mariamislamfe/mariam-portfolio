'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/mariam-portfolio/components/Navbar'
import Hero from '@/mariam-portfolio/components/sections/Hero'
import Projects from '@/mariam-portfolio/components/sections/Projects'
import Awards from '@/mariam-portfolio/components/sections/Awards'
import Publications from '@/mariam-portfolio/components/sections/Publications'
import Events from '@/mariam-portfolio/components/sections/Events'
import Certificates from '@/mariam-portfolio/components/sections/Certificates'
import Gallery from '@/mariam-portfolio/components/sections/Gallery'
import Contact from '@/mariam-portfolio/components/sections/Contact'

// Dynamically import 3D background with no SSR
const Background3D = dynamic(() => import('@/mariam-portfolio/components/Background3D'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-slate-950" />
})

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-slate-950" />}>
        <Background3D />
      </Suspense>

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <Projects />
        <Awards />
        <Publications />
        <Events />
        <Certificates />
        <Gallery />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-effect">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-400">
            &copy; 2025 Mariam. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
