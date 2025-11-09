'use client'

import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: '💻',
      description: 'Building responsive and interactive user interfaces',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      color: 'from-teal-500/20 to-emerald-500/20',
    },
    {
      title: 'Backend Development',
      icon: '⚙️',
      description: 'Creating robust server-side applications and APIs',
      skills: ['Node.js', 'Express', 'Supabase', 'RESTful APIs', 'Database Design'],
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Implementing intelligent solutions and data analysis',
      skills: ['Python', 'TensorFlow', 'Computer Vision', 'NLP', 'Data Analysis'],
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Mobile Development',
      icon: '📱',
      description: 'Cross-platform mobile application development',
      skills: ['React Native', 'Flutter', 'Mobile UI/UX', 'App Optimization'],
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: 'Tools & Platforms',
      icon: '🛠️',
      description: 'Development tools and version control',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      title: 'Soft Skills',
      icon: '🌟',
      description: 'Professional competencies and collaboration',
      skills: ['Problem Solving', 'Team Collaboration', 'Fast Learner', 'Communication', 'Time Management'],
      color: 'from-rose-500/20 to-pink-500/20',
    },
  ]

  return (
    <section id="skills" className="py-32 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <BentoGrid className="max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <BentoGridItem
              key={index}
              title={
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-xl font-bold text-white">{category.title}</span>
                </div>
              }
              description={
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-300 rounded-full text-xs font-mono hover:bg-teal-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              }
              header={
                <div className={`h-20 w-full rounded-xl bg-gradient-to-br ${category.color} opacity-50`} />
              }
              className={cn(
                index === 2 || index === 5 ? 'md:col-span-2' : '',
                'hover:border-teal-500/50 transition-all duration-300'
              )}
            />
          ))}
        </BentoGrid>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '60', label: 'WPM Typing Speed', icon: '⌨️' },
            { value: '10+', label: 'Technologies', icon: '💡' },
            { value: '15+', label: 'Projects Completed', icon: '🚀' },
            { value: '100%', label: 'Client Satisfaction', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-sm bg-slate-900/50 border border-slate-700/40 rounded-2xl p-6 text-center hover:border-teal-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-teal-400 mb-1 font-mono">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
