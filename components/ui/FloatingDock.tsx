'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export interface FloatingDockItem {
  title: string
  icon: React.ReactNode
  href: string
}

export const FloatingDock = ({ items }: { items: FloatingDockItem[] }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 px-4 py-3 backdrop-blur-xl bg-[#1a1a1a]/90 border border-gray-800/50 rounded-full"
        style={{
          boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {items.map((item, index) => (
          <FloatingDockIcon key={index} item={item} />
        ))}
      </motion.div>
    </div>
  )
}

const FloatingDockIcon = ({ item }: { item: FloatingDockItem }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={item.href}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.2, y: -8 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors cursor-pointer"
      >
        {item.icon}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-[#1a1a1a] border border-gray-800 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
            }}
          >
            {item.title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-[#1a1a1a]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}
