# 🎨 Portfolio Website with Supabase

A modern, responsive portfolio website built with **Next.js 16**, **Supabase**, **Three.js**, and **Framer Motion**.

## ✨ Features

- 🎯 **Modern Design** - Clean, minimalist design with hot pink accents
- 🌟 **Twinkling Stars** - Beautiful animated background
- 🎨 **3D Elements** - Smooth 3D particle effects using Three.js
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js 16 and Turbopack
- 🗄️ **Supabase Database** - Cloud database instead of localStorage
- 🖼️ **Image Upload** - Upload images to Supabase Storage
- 🔐 **Admin Dashboard** - Manage all content from one place

## 📦 Sections

- **Hero** - Landing page with animated text and twinkling stars
- **Projects** - Showcase your work with hover effects
- **Awards** - Display your achievements
- **Publications** - List your research papers
- **Events** - Share speaking engagements and conferences
- **Certificates** - 🆕 Display your professional certifications
- **Gallery** - Photo gallery with lightbox
- **Contact** - Get in touch form

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

Quick summary:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and API Key
4. Paste them in `.env.local`
5. Run the SQL schema in Supabase SQL Editor

### 3. Configure Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  hotpink: '#ff1493',  // Change this to your preferred color
}
```

### Hero Content

Edit `components/sections/Hero.tsx`:

```typescript
const titles = ['Your Name', 'Your Title', 'Your Role']
```

### Admin Password

Edit `app/admin/page.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-password'  // Default: mariam123
```

## 📁 Project Structure

```
Portfolio/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard
│   ├── globals.css          # Global styles
│   └── page.tsx             # Main homepage
├── components/
│   ├── admin/               # Admin components
│   │   ├── ProjectsManager.tsx
│   │   ├── AwardsManager.tsx
│   │   ├── CertificatesManager.tsx  # NEW!
│   │   └── ...
│   ├── sections/            # Portfolio sections
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx  # NEW!
│   │   └── ...
│   ├── Background3D.tsx     # 3D particles
│   └── Navbar.tsx
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── supabaseService.ts   # Database operations
│   └── imageCompression.ts  # Image optimization
├── .env.local               # Environment variables
├── supabase-schema.sql      # Database schema
└── SUPABASE_SETUP.md        # Detailed setup guide
```

## 🎯 Admin Dashboard

Access at `/admin` with password (default: `mariam123`)

**Features:**
- ✅ Projects Management
- ✅ Awards Management
- ✅ Publications Management
- ✅ Events Management
- ✅ Gallery Management
- ✅ **Certificates Management** (NEW!)
- ✅ Storage Management

## 🖼️ Image Handling

- **Supabase Storage** - Primary method for images
- **Base64 Fallback** - If Supabase Storage is not configured
- **Auto Compression** - Images compressed to max 400KB
- **Max Size** - 1MB recommended

## 🗄️ Database Tables

- `projects` - Portfolio projects
- `awards` - Awards and achievements
- `publications` - Research papers
- `events` - Speaking events
- `gallery` - Photo gallery
- `certificates` - Professional certifications (NEW!)

## 🔧 Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Supabase** - Backend as a service
- **Tailwind CSS** - Utility-first CSS
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **React Three Fiber** - React renderer for Three.js

## 📝 License

MIT

## 👤 Author

**Mariam Islam**

---

Made with ❤️ using Next.js and Supabase
