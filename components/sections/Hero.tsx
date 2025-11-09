'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [githubStats, setGithubStats] = useState({ repos: 0, followers: 0, commits: 0 })
  const [typingStats] = useState({ wpm: 60, accuracy: 98 })

  useEffect(() => {
    fetch('https://api.github.com/users/mariamislamfe')
      .then(res => res.json())
      .then(data => {
        setGithubStats({
          repos: data.public_repos || 0,
          followers: data.followers || 0,
          commits: 500 // Approximate - GitHub API doesn't provide total commits easily
        })
      })
      .catch(err => console.log(err))
  }, [])

  const keycapLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/mariamislamfe',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.916 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mariam-islam-8849652ba/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      label: 'Resume',
      href: 'https://drive.google.com/drive/folders/1aPh5sgH0o-1BoV0gsYcwHRY4_d4P9lRb?usp=sharing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      label: 'Email',
      href: 'mailto:mariamislam.stem26@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ]

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden py-20">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            Hi, I'm Mariam.
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mb-6 font-light leading-relaxed">
            A student researcher and innovator
          </p>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Working in the JavaScript ecosystem with a focus on AI, machine learning, and building innovative solutions to real-world problems.
          </p>
        </motion.div>

        {/* Keycap-style Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          {keycapLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -2, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </div>
              {/* Keycap bottom edge effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent rounded-b-xl" />
            </motion.a>
          ))}
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Typing Speed Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative group bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">TYPING</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{typingStats.wpm}</div>
              <div className="text-sm text-gray-400">WPM • {typingStats.accuracy}% accuracy</div>
            </div>
          </motion.div>

          {/* GitHub Stats Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative group bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.916 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="text-xs text-gray-500 font-medium">GITHUB</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{githubStats.repos}</div>
              <div className="text-sm text-gray-400">Repositories • {githubStats.followers} followers</div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative group bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">LOCATION</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">Cairo, Egypt</div>
              <div className="text-sm text-gray-400">Available for remote work</div>
            </div>
          </motion.div>

          {/* Availability Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative group bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">STATUS</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="text-2xl font-bold text-white">Available</div>
              </div>
              <div className="text-sm text-gray-400">Open for opportunities</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
