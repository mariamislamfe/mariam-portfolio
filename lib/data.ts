export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  awards?: string[]
  link?: string
  image?: string
}

export interface Award {
  id: number
  title: string
  date: string
  description: string
}

export interface Publication {
  id: number
  title: string
  authors: string
  venue: string
  link?: string
}

export interface Event {
  id: number
  title: string
  date: string
  description: string
  image: string
}

export interface GalleryItem {
  id: number
  image: string
  caption: string
}

export const getStorageData = <T>(key: string, defaultData: T[]): T[] => {
  if (typeof window === 'undefined') return defaultData

  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultData
  } catch {
    return defaultData
  }
}

export const setStorageData = <T>(key: string, data: T[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! Please use smaller images or delete some data. Images should be under 500KB.')
        // Try to clear old data
        const keys = Object.keys(localStorage)
        if (keys.length > 0) {
          console.error('LocalStorage is full. Consider clearing old data.')
        }
      }
      throw e
    }
  }
}

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'AI Healthcare System',
    description: 'Developed an AI-powered diagnostic system that assists doctors in early disease detection using deep learning.',
    tags: ['AI', 'Healthcare', 'Deep Learning', 'Python'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
  },
  {
    id: 2,
    title: 'Smart City Dashboard',
    description: 'Created a comprehensive dashboard for monitoring and managing smart city infrastructure in real-time.',
    tags: ['IoT', 'Dashboard', 'React', 'TypeScript'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800'
  },
  {
    id: 3,
    title: 'NLP Chatbot',
    description: 'Built an intelligent chatbot using natural language processing to provide customer support 24/7.',
    tags: ['NLP', 'Python', 'AI', 'TensorFlow'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800'
  },
]

export const defaultAwards: Award[] = [
  {
    id: 1,
    title: 'Best AI Research Paper',
    date: '2024',
    description: 'Awarded for outstanding research in artificial intelligence and machine learning applications.'
  },
  {
    id: 2,
    title: 'Innovation Award',
    date: '2023',
    description: 'Recognized for innovative solutions in healthcare technology.'
  },
  {
    id: 3,
    title: 'Top Developer Award',
    date: '2023',
    description: 'Excellence in software development and engineering practices.'
  },
]

export const defaultPublications: Publication[] = [
  {
    id: 1,
    title: 'Deep Learning Approaches for Medical Image Analysis',
    authors: 'Mariam et al.',
    venue: 'IEEE Conference on AI in Medicine, 2024',
    link: '#'
  },
  {
    id: 2,
    title: 'Novel Methods in Natural Language Processing',
    authors: 'Mariam, Smith J.',
    venue: 'ACL Conference, 2023',
    link: '#'
  },
]

export const defaultEvents: Event[] = [
  {
    id: 1,
    title: 'AI Summit 2024',
    date: 'March 2024',
    description: 'Keynote speaker at the annual AI Summit discussing future trends.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },
  {
    id: 2,
    title: 'Tech Conference Dubai',
    date: 'January 2024',
    description: 'Presented research findings on AI applications in healthcare.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800'
  },
  {
    id: 3,
    title: 'Women in Tech Meetup',
    date: 'December 2023',
    description: 'Panel discussion on empowering women in technology fields.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
  },
]

export const defaultGallery: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600',
    caption: 'Project Demo Day'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
    caption: 'Research Lab'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
    caption: 'Award Ceremony'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
    caption: 'Conference Presentation'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600',
    caption: 'Team Collaboration'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1531537571171-a707bf2683da?w=600',
    caption: 'Innovation Workshop'
  },
]
