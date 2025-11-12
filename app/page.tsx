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
import Testimonials from '@//components/sections/Testimonials'
import Companies from '@//components/sections/Companies'
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
        <Companies />
        <Events />
        <Certificates />
        <Testimonials />
        <Contact />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/30 backdrop-blur-sm bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent font-mono mb-2">
                &lt;MI /&gt;
              </h3>
              <p className="text-gray-400 text-sm">
                Crafting seamless web and mobile experiences
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {['Home', 'Projects', 'Publications', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-teal-400 transition-colors text-sm font-mono"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/mariamislamfe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-teal-500/50 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.916 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/mariam-islam-8849652ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-teal-500/50 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:mariamislam.stem26@gmail.com"
                  className="p-2 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-teal-500/50 transition-all"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-700/30 pt-6 text-center">
            <p className="text-gray-500 text-sm font-mono">
              &copy; 2025 Mariam Islam. Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
