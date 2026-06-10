'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flashlight } from 'lucide-react'

export default function AdminLogin() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid access key.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-midnight-north flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Flashlight className="w-6 h-6 text-lantern-amber" />
          </div>
          <h1 className="font-heading font-bold text-white text-xl">
            TaxNorth <span className="text-lantern-amber">Admin</span>
          </h1>
        </div>
        <div className="bg-white rounded-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-deep-ink font-medium text-sm mb-2">
                Access key
              </label>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Enter admin key"
                className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm outline-none focus:border-lantern-amber transition-colors"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !key}
              className="w-full bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              {loading ? 'Verifying...' : 'Access Admin →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}