// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6366f1'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Typed.js for Hero Text
const typed = new Typed('.typed-text', {
    strings: ['Mariam', 'an AI Researcher', 'a Developer', 'an Innovator'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Data Management
const DataManager = {
    getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : this.getDefaultData(key);
    },

    getDefaultData(key) {
        const defaults = {
            projects: [
                {
                    id: 1,
                    title: 'AI Healthcare System',
                    description: 'Developed an AI-powered diagnostic system that assists doctors in early disease detection using deep learning.',
                    tags: ['AI', 'Healthcare', 'Deep Learning'],
                    link: '#'
                },
                {
                    id: 2,
                    title: 'Smart City Dashboard',
                    description: 'Created a comprehensive dashboard for monitoring and managing smart city infrastructure in real-time.',
                    tags: ['IoT', 'Dashboard', 'React'],
                    link: '#'
                },
                {
                    id: 3,
                    title: 'NLP Chatbot',
                    description: 'Built an intelligent chatbot using natural language processing to provide customer support 24/7.',
                    tags: ['NLP', 'Python', 'AI'],
                    link: '#'
                }
            ],
            awards: [
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
                }
            ],
            publications: [
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
                }
            ],
            events: [
                {
                    id: 1,
                    title: 'AI Summit 2024',
                    date: 'March 2024',
                    description: 'Keynote speaker at the annual AI Summit discussing future trends.',
                    image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=AI+Summit'
                },
                {
                    id: 2,
                    title: 'Tech Conference Dubai',
                    date: 'January 2024',
                    description: 'Presented research findings on AI applications in healthcare.',
                    image: 'https://via.placeholder.com/400x300/a855f7/ffffff?text=Tech+Conference'
                },
                {
                    id: 3,
                    title: 'Women in Tech Meetup',
                    date: 'December 2023',
                    description: 'Panel discussion on empowering women in technology fields.',
                    image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Women+in+Tech'
                }
            ],
            gallery: [
                {
                    id: 1,
                    image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Gallery+1',
                    caption: 'Project Demo Day'
                },
                {
                    id: 2,
                    image: 'https://via.placeholder.com/400x400/764ba2/ffffff?text=Gallery+2',
                    caption: 'Research Lab'
                },
                {
                    id: 3,
                    image: 'https://via.placeholder.com/400x400/f093fb/ffffff?text=Gallery+3',
                    caption: 'Award Ceremony'
                },
                {
                    id: 4,
                    image: 'https://via.placeholder.com/400x400/f5576c/ffffff?text=Gallery+4',
                    caption: 'Conference Presentation'
                },
                {
                    id: 5,
                    image: 'https://via.placeholder.com/400x400/4facfe/ffffff?text=Gallery+5',
                    caption: 'Team Collaboration'
                },
                {
                    id: 6,
                    image: 'https://via.placeholder.com/400x400/00f2fe/ffffff?text=Gallery+6',
                    caption: 'Innovation Workshop'
                }
            ]
        };
        return defaults[key] || [];
    }
};

// Load Projects
function loadProjects() {
    const projects = DataManager.getData('projects');
    const projectsGrid = document.getElementById('projectsGrid');

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-aos="fade-up">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">
                View Project <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// Load Awards
function loadAwards() {
    const awards = DataManager.getData('awards');
    const awardsTimeline = document.getElementById('awardsTimeline');

    awardsTimeline.innerHTML = awards.map(award => `
        <div class="timeline-item" data-aos="fade-up">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${award.date}</div>
                <h3>${award.title}</h3>
                <p>${award.description}</p>
            </div>
        </div>
    `).join('');
}

// Load Publications
function loadPublications() {
    const publications = DataManager.getData('publications');
    const publicationsList = document.getElementById('publicationsList');

    publicationsList.innerHTML = publications.map(pub => `
        <div class="publication-item" data-aos="fade-right">
            <h3>${pub.title}</h3>
            <div class="publication-meta">
                ${pub.authors} | ${pub.venue}
            </div>
            <a href="${pub.link}" class="publication-link">
                Read Paper <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `).join('');
}

// Load Events
function loadEvents() {
    const events = DataManager.getData('events');
    const eventsGrid = document.getElementById('eventsGrid');

    eventsGrid.innerHTML = events.map(event => `
        <div class="event-card" data-aos="zoom-in">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <div class="event-date">${event.date}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        </div>
    `).join('');
}

// Load Gallery
function loadGallery() {
    const gallery = DataManager.getData('gallery');
    const galleryGrid = document.getElementById('galleryGrid');

    galleryGrid.innerHTML = gallery.map(item => `
        <div class="gallery-item" data-aos="zoom-in" onclick="openLightbox('${item.image}')">
            <img src="${item.image}" alt="${item.caption}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');
}

// Lightbox Functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightbox.classList.add('active');
    lightboxImg.src = imageSrc;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Lightbox Event Listeners
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadAwards();
    loadPublications();
    loadEvents();
    loadGallery();
});
