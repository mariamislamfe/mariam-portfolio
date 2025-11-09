'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminDashboard from '@/mariam-portfolio/components/admin/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem('adminAuth', 'true')
        setIsAuthenticated(true)
      } else {
        setError('Invalid password!')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setPassword('')
  }

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border-2 border-hotpink p-8 rounded-2xl shadow-2xl shadow-hotpink/20 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hotpink mb-2">🔐 Admin Login</h1>
          <p className="text-gray-400">Enter password to access dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-hotpink/50 rounded-lg focus:outline-none focus:border-hotpink transition-colors text-white"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-hotpink text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-hotpink/50 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 hover:text-hotpink transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}
