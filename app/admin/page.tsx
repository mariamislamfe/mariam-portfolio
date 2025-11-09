'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminDashboard from '@//components/admin/AdminDashboard'

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
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-gray-800/50 p-8 rounded-2xl max-w-md w-full"
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)'
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">🔐 Admin Login</h1>
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
              className="w-full px-4 py-3 bg-[#0e0e0e] border border-gray-800 rounded-lg focus:outline-none focus:border-cyan-500/50 transition-colors text-white"
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
            className="w-full bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-cyan-300 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.1)'
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}
