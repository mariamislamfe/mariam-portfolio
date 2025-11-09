'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@//components/Navbar'
import Hero from '@//components/sections/Hero'
import Projects from '@//components/sections/Projects'
import Awards from '@//components/sections/Awards'
import Publications from '@//components/sections/Publications'
import Events from '@//components/sections/Events'
import Certificates from '@//components/sections/Certificates'
import Gallery from '@//components/sections/Gallery'
import Contact from '@//components/sections/Contact'

// Dynamically import 3D background with no SSR
const Background3D = dynamic(() => import('@//components/Background3D'), {
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
