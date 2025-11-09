'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`text-center mb-20 relative ${className}`}
    >
      {/* Floating animated shapes in background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-16 h-16 border-2 border-hotpink/20 rounded-lg"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-1/4 w-12 h-12 bg-gradient-to-br from-hotpink/10 to-accent/10 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-5 right-1/3 w-8 h-8 border-2 border-accent/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
      </div>

      {/* Main title with animated gradient */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative inline-block"
      >
        {/* Decorative corners */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-hotpink"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-accent"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-accent"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-hotpink"
        />

        <h2 className="text-4xl md:text-5xl font-bold px-8 py-4 relative">
          <motion.span
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-hotpink via-accent to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            {title}
          </motion.span>
        </h2>
      </motion.div>

      {/* Animated decorative lines */}
      <div className="relative mt-6 mb-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-0.5 w-32 bg-gradient-to-r from-transparent via-hotpink to-transparent mx-auto"
        />
        <div className="flex justify-center gap-2 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-hotpink to-accent"
            />
          ))}
        </div>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto relative"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Bottom floating shapes */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-20 -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-0 w-3 h-3 bg-hotpink/30 rounded-full"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-0 w-4 h-4 bg-accent/30 rounded-full"
        />
      </div>
    </motion.div>
  )
}
