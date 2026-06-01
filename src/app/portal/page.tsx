'use client'
import { useState } from 'react'
import { Flashlight } from 'lucide-react'
import Link from 'next/link'

export default function PortalPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function requestLink() {
    if (!email) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/accountant/request-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    const data = await res.json()
    if (data.error) setError(data.error)
    else setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-midnight-north rounded-xl flex items-center justify-center">
              <Flashlight className="w-5 h-5 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north text-xl">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
          <h1 className="font-heading font-bold text-midnight-north text-3xl mb-2">
            Partner Portal
          </h1>
          <p className="text-deep-ink/60">
            Enter your registered email to access your dashboard.
          </p>
        </div>

        {sent ? (
          <div className="bg-maple-green/10 border border-maple-green/30 rounded-card p-6 text-center">
            <p className="font-heading font-semibold text-midnight-north mb-1">Check your email</p>
            <p className="text-deep-ink/60 text-sm">
              We sent a magic link to <strong>{email}</strong>. Click it to access your portal.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-fog-gray rounded-card p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-deep-ink font-medium text-sm mb-2">
                  Your registered email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && requestLink()}
                  placeholder="you@yourfirm.com"
                  className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={requestLink}
                disabled={loading || !email}
                className="w-full bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loading ? 'Sending...' : 'Send magic link →'}
              </button>
            </div>
            <p className="text-deep-ink/40 text-xs text-center mt-4">
              Not a partner yet?{' '}
              <Link href="/partners" className="text-lantern-amber hover:opacity-80">
                Join the directory
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}