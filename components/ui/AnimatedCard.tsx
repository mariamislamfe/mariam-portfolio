'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
