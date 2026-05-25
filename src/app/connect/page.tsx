export const metadata = {
  title: 'Connect with a Canadian Tax Professional — TaxNorth.ca',
  description: 'Get matched with a licensed tax accountant in Canada who specializes in helping newcomers. Free to connect. Available across all provinces.',
}

'use client'

import { useState } from 'react'
import { Flashlight, Shield, Lock, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
  'Saskatchewan', 'Yukon'
]

const LANGUAGES = [
  'English', 'French', 'Spanish', 'Mandarin', 'Punjabi', 'Arabic', 'Other'
]

const SITUATIONS = [
  'First time filing in Canada',
  'Self-employed or freelance income',
  'Multiple income sources',
  "Haven't filed in previous years",
  'Student or work permit holder',
  'Other'
]

export default function ConnectPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    province: '',
    language: '',
    situation: [] as string[],
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSituation(item: string) {
    setForm(prev => ({
      ...prev,
      situation: prev.situation.includes(item)
        ? prev.situation.filter(s => s !== item)
        : [...prev.situation, item]
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email) return
    setLoading(true)

    try {
      const sessionId = localStorage.getItem('taxnorth_session') || ''
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sessionId }),
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-maple-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-maple-green" />
          </div>
          <h2 className="font-heading font-bold text-midnight-north text-2xl mb-3">
            You're connected.
          </h2>
          <p className="text-deep-ink/70 mb-8">
            A licensed tax professional will reach out to you shortly.
            In the meantime, keep exploring with TaxNorth.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
          >
            Back to chat
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-white">

      {/* NAVBAR */}
      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-3.5 h-3.5 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-xs">.ca</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* BACK LINK */}
        <Link
          href="/chat"
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to chat
        </Link>

        {/* HEADER */}
        <h1 className="font-heading font-bold text-midnight-north text-3xl mb-3">
          Let's find you the right tax professional.
        </h1>
        <p className="text-deep-ink/70 text-lg mb-10">
          Tell us about your situation. We'll match you with a licensed
          accountant in your province.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Full name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Your full name"
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Email <span className="text-lantern-amber">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              required
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40"
            />
          </div>

          {/* Province */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Province or territory
            </label>
            <select
              value={form.province}
              onChange={e => setForm(prev => ({ ...prev, province: e.target.value }))}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors bg-white"
            >
              <option value="">Select your province</option>
              {PROVINCES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Preferred language
            </label>
            <select
              value={form.language}
              onChange={e => setForm(prev => ({ ...prev, language: e.target.value }))}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors bg-white"
            >
              <option value="">Select a language</option>
              {LANGUAGES.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Situation */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-3">
              Your situation <span className="text-deep-ink/40 font-normal">(select all that apply)</span>
            </label>
            <div className="space-y-2">
              {SITUATIONS.map(item => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-button border border-fog-gray cursor-pointer hover:border-lantern-amber transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={form.situation.includes(item)}
                    onChange={() => handleSituation(item)}
                    className="w-4 h-4 accent-lantern-amber"
                  />
                  <span className="text-sm text-deep-ink">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Additional details <span className="text-deep-ink/40 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Anything else we should know about your situation?"
              rows={4}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40 resize-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading || !form.email}
            className="w-full bg-lantern-amber text-midnight-north font-semibold py-4 rounded-button hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {loading ? 'Connecting...' : 'Connect me with a professional →'}
          </button>

          {/* TRUST SIGNALS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Your data is never sold" },
              { icon: <Lock className="w-4 h-4" />, text: "Shared only with your matched professional" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "Free to connect" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-deep-ink/50 text-xs">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>

        </form>
      </div>
    </div>
  )
}