'use client'

import { useState } from 'react'
import { Flashlight, Shield, Lock, CheckCircle, ArrowLeft, Star, User } from 'lucide-react'
import Link from 'next/link'

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
  'Saskatchewan', 'Yukon'
]

const LANGUAGES = [
  'English', 'French', 'Spanish', 'Mandarin', 'Punjabi', 'Arabic', 'Romanian', 'Other'
]

const SITUATIONS = [
  'First time filing in Canada',
  'Self-employed or freelance income',
  'Multiple income sources',
  "Haven't filed in previous years",
  'Student or work permit holder',
  'Other'
]

interface ConnectClientProps {
  proSlug: string | null
  proName: string | null
  proFirm: string | null
}

export default function ConnectClient({ proSlug, proName, proFirm }: ConnectClientProps) {
  const isPreSelected = !!proSlug && !!proName

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    language: '',
    situation: [] as string[],
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [etransferConfirmed, setEtransferConfirmed] = useState(false)

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
    if (!form.email || !form.phone) return
    setLoading(true)
    try {
      const sessionId = localStorage.getItem('taxnorth_session') || ''
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sessionId,
          professionalSlug: proSlug || null,
          professionalName: proName || null,
        }),
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
      <div className="min-h-screen bg-warm-white px-6 py-12">
        <div className="max-w-md mx-auto">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-fog-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flashlight className="w-8 h-8 text-lantern-amber" />
            </div>
            <h2 className="font-heading font-bold text-midnight-north text-2xl mb-2">
              One last step — complete your payment.
            </h2>
            <p className="text-deep-ink/60 text-sm">
              Your information was saved. Complete the $19.99 payment to confirm your connection.
            </p>
          </div>

          {/* INTERAC OPTION */}
<div className="bg-white border-2 border-midnight-north rounded-card p-6 mb-4">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-heading font-semibold text-midnight-north">Interac e-Transfer</h3>
    <span className="bg-maple-green/10 text-maple-green text-xs font-semibold px-2 py-1 rounded-full">
      Available now
    </span>
  </div>

  {!etransferConfirmed ? (
    <>
      <div className="space-y-3 mb-4">
        <div className="bg-fog-gray rounded-button p-3">
          <p className="text-deep-ink/50 text-xs mb-1">Send to</p>
          <p className="font-semibold text-midnight-north text-sm">billing@asce.ca</p>
        </div>
        <div className="bg-fog-gray rounded-button p-3">
          <p className="text-deep-ink/50 text-xs mb-1">Amount</p>
          <p className="font-semibold text-midnight-north text-sm">$19.99 CAD</p>
        </div>
        <div className="bg-fog-gray rounded-button p-3">
          <p className="text-deep-ink/50 text-xs mb-1">Message / Memo</p>
          <p className="font-semibold text-midnight-north text-sm">
            {form.fullName || 'Your name'} — TaxNorth
          </p>
        </div>
      </div>
      <button
        onClick={() => setEtransferConfirmed(true)}
        className="w-full bg-midnight-north text-white font-semibold py-3 rounded-button hover:opacity-90 transition-opacity text-sm"
      >
        I've sent my e-Transfer ✓
      </button>
    </>
  ) : (
    <div className="text-center py-4">
      <div className="w-12 h-12 bg-maple-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
        <CheckCircle className="w-6 h-6 text-maple-green" />
      </div>
      <p className="font-heading font-semibold text-midnight-north mb-1">
        Payment confirmed.
      </p>
      <p className="text-deep-ink/60 text-sm">
        We'll verify your transfer and send a confirmation to <strong>{form.email}</strong> within 1 business hour. Your professional will reach out within 24 hours.
      </p>
    </div>
  )}
</div>

          {/* CARD OPTION */}
<a
  href="https://taxnorth.myhelcim.com/hosted/?token=5449fe12da0aa7f12c5574&amount=19.99&amountHash=2b8216946cd1838aae12f0958b4cb6a4148b4d9d8a3019d905d825cb785f7342"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-white border border-fog-gray rounded-card p-6 mb-4 hover:border-lantern-amber transition-colors"
>
  <div className="flex items-center justify-between mb-3">
    <h3 className="font-heading font-semibold text-midnight-north">Credit / Debit Card</h3>
    <span className="bg-maple-green/10 text-maple-green text-xs font-semibold px-2 py-1 rounded-full">
      Available now
    </span>
  </div>
  <p className="text-deep-ink/50 text-sm mb-3">
    Pay securely with Visa, Mastercard, or debit card via Helcim.
  </p>
  <span className="inline-flex items-center gap-1 text-lantern-amber font-semibold text-sm">
    Pay $19.99 with card →
  </span>
</a>

<div className="text-center">
  <p className="text-deep-ink/40 text-xs mb-4">
    Not satisfied? Email hello@taxnorth.ca — we'll re-match you at no extra charge.
  </p>
  <Link
    href="/chat"
    className="text-lantern-amber font-medium text-sm hover:opacity-80 transition-opacity"
  >
    Back to TaxNorth
  </Link>
</div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-white">

      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-3.5 h-3.5 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="bg-lantern-amber px-6 py-2.5 text-center">
        <p className="text-midnight-north font-semibold text-sm">
          Founding offer — first 100 clients this month:{' '}
          <span className="line-through opacity-60">$49.99</span>{' '}
          <strong>$19.99</strong>
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        <Link
          href={isPreSelected ? '/professionals' : '/chat'}
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          {isPreSelected ? 'Back to directory' : 'Back to chat'}
        </Link>

        {isPreSelected ? (
          <div>
            <h1 className="font-heading font-bold text-midnight-north text-3xl mb-3">
              Connect with {proName}.
            </h1>
            <p className="text-deep-ink/70 text-lg mb-6">
              Fill out the form below. {proName?.split(' ')[0]} will receive your details
              and reach out with a special TaxNorth rate.
            </p>
            <div className="bg-fog-gray rounded-card p-4 flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-midnight-north rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-heading font-bold text-white text-lg">
                  {proName?.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-midnight-north">{proName}</span>
                  <Star className="w-4 h-4 text-lantern-amber fill-lantern-amber" />
                </div>
                {proFirm && <p className="text-deep-ink/50 text-sm">{proFirm}</p>}
              </div>
              <div className="ml-auto text-right">
                <p className="font-heading font-bold text-lantern-amber text-xl">$19.99</p>
                <p className="text-deep-ink/40 text-xs">connection fee</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-deep-ink/40" />
              </div>
              <span className="text-deep-ink/50 text-sm font-medium">TaxNorth will choose for you</span>
            </div>
            <h1 className="font-heading font-bold text-midnight-north text-3xl mb-3">
              Let's find you the right tax professional.
            </h1>
            <p className="text-deep-ink/70 text-lg">
              Tell us about your situation. We'll match you with the best licensed
              accountant for your province, language, and needs.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="font-heading font-bold text-lantern-amber text-2xl">$19.99</span>
              <span className="text-deep-ink/50 text-sm">connection fee — includes re-match guarantee</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">Full name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Your full name"
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40"
            />
          </div>

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

          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Phone number <span className="text-lantern-amber">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 (403) 000-0000"
              required
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40"
            />
          </div>

          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">Province or territory</label>
            <select
              value={form.province}
              onChange={e => setForm(prev => ({ ...prev, province: e.target.value }))}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors bg-white"
            >
              <option value="">Select your province</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">Preferred language</label>
            <select
              value={form.language}
              onChange={e => setForm(prev => ({ ...prev, language: e.target.value }))}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors bg-white"
            >
              <option value="">Select a language</option>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

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

          <div>
            <label className="block text-deep-ink font-medium text-sm mb-2">
              Additional details <span className="text-deep-ink/40 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Anything else we should know?"
              rows={4}
              className="w-full border border-fog-gray rounded-button px-4 py-3 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40 resize-none"
            />
          </div>

          <div className="bg-fog-gray rounded-card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-midnight-north text-sm">Connection fee</p>
              <p className="text-deep-ink/50 text-xs">Includes re-match guarantee</p>
            </div>
            <div className="text-right">
              <p className="text-deep-ink/40 text-xs line-through">$49.99</p>
              <p className="font-heading font-bold text-lantern-amber text-xl">$19.99 CAD</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.email || !form.phone}
            className="w-full bg-lantern-amber text-midnight-north font-semibold py-4 rounded-button hover:opacity-90 transition-opacity disabled:opacity-40 text-base"
          >
            {loading ? 'Processing...' : 'Connect for $19.99 →'}
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "Your data is never sold" },
              { icon: <Lock className="w-4 h-4" />, text: "Secure connection" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "Re-match guarantee" },
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