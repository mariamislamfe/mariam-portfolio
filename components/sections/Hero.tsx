'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const titles = ['Mariam Islam', 'Web Developer', 'Researcher']

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Twinkling Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 3 + 1; // 1-4px
          return (
            <div
              key={i}
              className="twinkling-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s` // 3-7 seconds for smooth twinkling
              }}
            />
          );
        })}
      </div>

      <div className="max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-400 mb-4">Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text" key={titleIndex}>
              {titles[titleIndex]}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting innovative digital solutions from my creative workspace, transforming ideas into exceptional user experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#projects"
            className="px-10 py-4 bg-hotpink/20 border border-hotpink/50 rounded-lg font-semibold text-white hover:bg-hotpink/30 hover:border-hotpink transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-10 py-4 bg-white/5 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-6 justify-center"
        >
          <motion.a
            href="mailto:mariamislam.stem26@gmail.com"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-hotpink/20 border border-hotpink rounded-full flex items-center justify-center text-2xl hover:bg-hotpink/30 transition-all"
          >
            📧
          </motion.a>
          <motion.a
            href="https://drive.google.com/drive/folders/1aPh5sgH0o-1BoV0gsYcwHRY4_d4P9lRb?usp=sharing"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-hotpink/20 border border-hotpink rounded-full flex items-center justify-center text-2xl hover:bg-hotpink/30 transition-all"
          >
            💻
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className="w-8 h-8 text-hotpink"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
