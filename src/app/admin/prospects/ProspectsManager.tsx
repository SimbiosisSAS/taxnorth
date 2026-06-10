'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Phone, Mail, Globe, ChevronRight, X, Clock, MessageSquare, Video, Link2, Send, Sparkles } from 'lucide-react'

interface Activity {
  id: string
  type: string
  description: string
  activity_date: string
}

interface Prospect {
  id: string
  firm_name: string
  contact_name: string
  email: string
  phone: string
  province: string
  website: string
  source: string
  status: string
  notes: string
  last_contact_at: string
  created_at: string
  prospect_activities: Activity[]
}

const STATUS_COLORS: Record<string, string> = {
  prospect: 'bg-fog-gray text-deep-ink',
  contacted: 'bg-lantern-amber/20 text-lantern-amber',
  follow_up: 'bg-blue-100 text-blue-700',
  negotiating: 'bg-purple-100 text-purple-700',
  partner: 'bg-maple-green/20 text-maple-green',
  rejected: 'bg-red-100 text-red-500',
}

const ACTIVITY_ICONS: Record<string, React.ReactElement> = {
  email: <Mail className="w-4 h-4" />,
  vapi_call: <Phone className="w-4 h-4" />,
  human_call: <Phone className="w-4 h-4" />,
  meeting: <Video className="w-4 h-4" />,
  linkedin: <Link2 className="w-4 h-4" />,
  sms: <MessageSquare className="w-4 h-4" />,
  other: <Clock className="w-4 h-4" />,
}

const PROVINCES = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Quebec', 'Saskatchewan']

export default function ProspectsManager() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [selected, setSelected] = useState<Prospect | null>(null)
  const [showAddProspect, setShowAddProspect] = useState(false)
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  // Email agent states
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailTemplate, setEmailTemplate] = useState<'cold' | 'followup' | 'final'>('cold')
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const [newProspect, setNewProspect] = useState({
    firm_name: '', contact_name: '', email: '',
    phone: '', province: 'Alberta', website: '', source: '', notes: ''
  })

  const [newActivity, setNewActivity] = useState({
    type: 'email', description: ''
  })

  useEffect(() => { loadProspects() }, [])

  async function loadProspects() {
    setLoading(true)
    const res = await fetch('/api/admin/prospects')
    const data = await res.json()
    setProspects(data)
    if (selected) {
      const updated = data.find((p: Prospect) => p.id === selected.id)
      if (updated) setSelected(updated)
    }
    setLoading(false)
  }

  async function addProspect() {
    if (!newProspect.firm_name) return
    await fetch('/api/admin/prospects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProspect)
    })
    setNewProspect({ firm_name: '', contact_name: '', email: '', phone: '', province: 'Alberta', website: '', source: '', notes: '' })
    setShowAddProspect(false)
    loadProspects()
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/prospects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    loadProspects()
  }

  async function addActivity() {
    if (!newActivity.description || !selected) return
    await fetch('/api/admin/prospects/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newActivity, prospect_id: selected.id })
    })
    setNewActivity({ type: 'email', description: '' })
    setShowAddActivity(false)
    loadProspects()
  }

  async function generateEmail(type: 'cold' | 'followup' | 'final') {
    if (!selected) return
    setEmailTemplate(type)
    setEmailLoading(true)
    setEmailSent(false)
    setGeneratedEmail(null)
    setShowEmailModal(true)
    try {
      const res = await fetch('/api/admin/prospects/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId: selected.id, templateType: type, send: false }),
      })
      const data = await res.json()
      setGeneratedEmail(data)
    } catch {
      setShowEmailModal(false)
    } finally {
      setEmailLoading(false)
    }
  }

  async function sendEmail() {
    if (!selected || !generatedEmail) return
    setEmailSending(true)
    await fetch('/api/admin/prospects/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prospectId: selected.id,
        templateType: emailTemplate,
        send: true,
      }),
    })
    setEmailSending(false)
    setEmailSent(true)
    setTimeout(() => {
      setShowEmailModal(false)
      setGeneratedEmail(null)
      setEmailSent(false)
      loadProspects()
    }, 1500)
  }

  const filtered = filterStatus === 'all'
    ? prospects
    : prospects.filter(p => p.status === filterStatus)

  const stats = {
    total: prospects.length,
    contacted: prospects.filter(p => ['contacted', 'follow_up', 'negotiating'].includes(p.status)).length,
    partners: prospects.filter(p => p.status === 'partner').length,
    follow_up: prospects.filter(p => p.status === 'follow_up').length,
  }

  const templateLabels = {
    cold: { label: 'Cold Email', color: 'bg-midnight-north hover:opacity-80' },
    followup: { label: 'Follow-up', color: 'bg-lantern-amber text-midnight-north hover:opacity-80' },
    final: { label: 'Final', color: 'bg-deep-ink/50 hover:opacity-80' },
  }

  return (
    <div className="min-h-screen bg-fog-gray">

      {/* HEADER */}
      <div className="bg-midnight-north px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-white text-xl">Partner Prospects</h1>
            <p className="text-white/50 text-sm">Track your accountant outreach pipeline</p>
          </div>
          <button
            onClick={() => setShowAddProspect(true)}
            className="flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Add Prospect
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Prospects', value: stats.total },
            { label: 'In Pipeline', value: stats.contacted },
            { label: 'Follow Up Needed', value: stats.follow_up },
            { label: 'Became Partners', value: stats.partners },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-card p-4">
              <p className="font-heading font-bold text-midnight-north text-2xl">{s.value}</p>
              <p className="text-deep-ink/50 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['all', 'prospect', 'contacted', 'follow_up', 'negotiating', 'partner', 'rejected'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterStatus === s ? 'bg-midnight-north text-white' : 'bg-white text-deep-ink/60 hover:bg-fog-gray'
              }`}
            >
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex gap-6">

          {/* TABLE */}
          <div className="flex-1 bg-white rounded-card overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-deep-ink/40">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-deep-ink/40">No prospects yet. Add your first one.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-fog-gray text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Firm</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Contact</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Province</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Activities</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Last Contact</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(prospect => (
                    <tr
                      key={prospect.id}
                      onClick={() => setSelected(prospect)}
                      className={`border-t border-fog-gray cursor-pointer hover:bg-fog-gray/50 transition-colors ${
                        selected?.id === prospect.id ? 'bg-lantern-amber/5' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-midnight-north text-sm">{prospect.firm_name}</p>
                        {prospect.website && <p className="text-xs text-deep-ink/40">{prospect.website}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-deep-ink">{prospect.contact_name || '—'}</p>
                        <p className="text-xs text-deep-ink/40">{prospect.email || ''}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-deep-ink/70">{prospect.province}</td>
                      <td className="px-4 py-3">
                        <select
                          value={prospect.status}
                          onChange={e => { e.stopPropagation(); updateStatus(prospect.id, e.target.value) }}
                          onClick={e => e.stopPropagation()}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[prospect.status]}`}
                        >
                          {Object.keys(STATUS_COLORS).map(s => (
                            <option key={s} value={s}>{s.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-deep-ink/60">
                        {prospect.prospect_activities?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-xs text-deep-ink/40">
                        {prospect.last_contact_at
                          ? new Date(prospect.last_contact_at).toLocaleDateString('en-CA')
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <ChevronRight className="w-4 h-4 text-deep-ink/30" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* SIDE PANEL */}
          {selected && (
            <div className="w-80 bg-white rounded-card p-5 flex-shrink-0 max-h-screen overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-midnight-north">{selected.firm_name}</h3>
                  <p className="text-deep-ink/50 text-xs">{selected.province}</p>
                </div>
                <button onClick={() => setSelected(null)}>
                  <X className="w-4 h-4 text-deep-ink/40 hover:text-deep-ink" />
                </button>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                {selected.contact_name && (
                  <p className="text-deep-ink"><span className="text-deep-ink/40">Contact:</span> {selected.contact_name}</p>
                )}
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-1.5 text-lantern-amber hover:opacity-80">
                    <Mail className="w-3.5 h-3.5" /> {selected.email}
                  </a>
                )}
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-1.5 text-deep-ink/60 hover:text-deep-ink">
                    <Phone className="w-3.5 h-3.5" /> {selected.phone}
                  </a>
                )}
                {selected.website && (
                  <a href={selected.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-deep-ink/60 hover:text-deep-ink">
                    <Globe className="w-3.5 h-3.5" /> {selected.website}
                  </a>
                )}
                {selected.notes && (
                  <p className="text-deep-ink/60 text-xs bg-fog-gray rounded p-2">{selected.notes}</p>
                )}
              </div>

              {/* LOG ACTIVITY */}
              <button
                onClick={() => setShowAddActivity(true)}
                className="w-full flex items-center justify-center gap-2 bg-midnight-north text-white text-sm font-medium py-2 rounded-button hover:opacity-90 transition-opacity mb-3"
              >
                <Plus className="w-4 h-4" /> Log Activity
              </button>

              {/* AI EMAIL BUTTONS */}
              <div className="border border-fog-gray rounded-button p-3 mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-lantern-amber" />
                  <p className="text-xs font-semibold text-midnight-north">AI Email Agent</p>
                </div>
                {!selected.email ? (
                  <p className="text-deep-ink/40 text-xs">Add an email address to use the AI agent.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-1.5">
                    {(Object.keys(templateLabels) as Array<'cold' | 'followup' | 'final'>).map(type => (
                      <button
                        key={type}
                        onClick={() => generateEmail(type)}
                        className={`${templateLabels[type].color} text-white text-xs font-medium py-1.5 rounded transition-opacity`}
                      >
                        {templateLabels[type].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTIVITY TIMELINE */}
              <h4 className="font-heading font-semibold text-midnight-north text-sm mb-3">Activity Timeline</h4>
              {(selected.prospect_activities?.length || 0) === 0 ? (
                <p className="text-deep-ink/40 text-xs">No activities yet.</p>
              ) : (
                <div className="space-y-3">
                  {[...(selected.prospect_activities || [])]
                    .sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime())
                    .map(activity => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="w-7 h-7 bg-fog-gray rounded-full flex items-center justify-center flex-shrink-0 text-deep-ink/60">
                          {ACTIVITY_ICONS[activity.type] || <Clock className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-midnight-north capitalize">
                            {activity.type.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-deep-ink/60">{activity.description}</p>
                          <p className="text-xs text-deep-ink/30">
                            {new Date(activity.activity_date).toLocaleDateString('en-CA')}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL — ADD PROSPECT */}
      {showAddProspect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-card p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-midnight-north">Add Prospect</h3>
              <button onClick={() => setShowAddProspect(false)}>
                <X className="w-5 h-5 text-deep-ink/40" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Firm name *', key: 'firm_name', placeholder: 'Accounting firm name' },
                { label: 'Contact person', key: 'contact_name', placeholder: 'Name of person you contact' },
                { label: 'Email', key: 'email', placeholder: 'contact@firm.com' },
                { label: 'Phone', key: 'phone', placeholder: '+1 (403) 555-0000' },
                { label: 'Website', key: 'website', placeholder: 'https://firm.ca' },
                { label: 'How you found them', key: 'source', placeholder: 'Google, LinkedIn, referral...' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-deep-ink font-medium text-xs mb-1">{field.label}</label>
                  <input
                    value={(newProspect as Record<string, string>)[field.key]}
                    onChange={e => setNewProspect(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber"
                  />
                </div>
              ))}
              <div>
                <label className="block text-deep-ink font-medium text-xs mb-1">Province</label>
                <select
                  value={newProspect.province}
                  onChange={e => setNewProspect(prev => ({ ...prev, province: e.target.value }))}
                  className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber"
                >
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-deep-ink font-medium text-xs mb-1">Notes</label>
                <textarea
                  value={newProspect.notes}
                  onChange={e => setNewProspect(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any relevant notes..."
                  rows={2}
                  className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber resize-none"
                />
              </div>
            </div>
            <button
              onClick={addProspect}
              disabled={!newProspect.firm_name}
              className="w-full bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button mt-4 hover:opacity-90 disabled:opacity-40"
            >
              Add Prospect
            </button>
          </div>
        </div>
      )}

      {/* MODAL — ADD ACTIVITY */}
      {showAddActivity && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-card p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-midnight-north">Log Activity</h3>
              <button onClick={() => setShowAddActivity(false)}>
                <X className="w-5 h-5 text-deep-ink/40" />
              </button>
            </div>
            <p className="text-deep-ink/50 text-xs mb-4">{selected.firm_name}</p>
            <div className="space-y-3">
              <div>
                <label className="block text-deep-ink font-medium text-xs mb-1">Type</label>
                <select
                  value={newActivity.type}
                  onChange={e => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber"
                >
                  <option value="email">Email</option>
                  <option value="human_call">Human Call</option>
                  <option value="vapi_call">VAPI Call (AI)</option>
                  <option value="meeting">Meeting</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="sms">SMS</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-deep-ink font-medium text-xs mb-1">Description</label>
                <textarea
                  value={newActivity.description}
                  onChange={e => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What happened? What was the outcome?"
                  rows={3}
                  className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber resize-none"
                />
              </div>
            </div>
            <button
              onClick={addActivity}
              disabled={!newActivity.description}
              className="w-full bg-midnight-north text-white font-semibold py-3 rounded-button mt-4 hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Log Activity
            </button>
          </div>
        </div>
      )}

      {/* MODAL — AI EMAIL PREVIEW */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-card p-6 w-full max-w-xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lantern-amber" />
                <div>
                  <h3 className="font-heading font-bold text-midnight-north">
                    {emailTemplate === 'cold' ? 'Cold Email' : emailTemplate === 'followup' ? 'Follow-up Email' : 'Final Email'}
                  </h3>
                  <p className="text-deep-ink/50 text-xs">{selected?.firm_name}</p>
                </div>
              </div>
              <button onClick={() => { setShowEmailModal(false); setGeneratedEmail(null); setEmailSent(false) }}>
                <X className="w-5 h-5 text-deep-ink/40" />
              </button>
            </div>

            {emailLoading && (
              <div className="py-12 text-center">
                <div className="w-8 h-8 border-2 border-lantern-amber border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-deep-ink/50 text-sm">Generating personalized email...</p>
              </div>
            )}

            {emailSent && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-maple-green/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-maple-green" />
                </div>
                <p className="font-heading font-semibold text-midnight-north">Email sent successfully.</p>
                <p className="text-deep-ink/50 text-sm mt-1">Activity logged automatically.</p>
              </div>
            )}

            {!emailLoading && !emailSent && generatedEmail && (
              <>
                <div className="mb-4">
                  <label className="block text-deep-ink font-medium text-xs mb-1">Subject</label>
                  <input
                    value={generatedEmail.subject}
                    onChange={e => setGeneratedEmail(prev => prev ? { ...prev, subject: e.target.value } : null)}
                    className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber"
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-deep-ink font-medium text-xs mb-1">Body</label>
                  <textarea
                    value={generatedEmail.body}
                    onChange={e => setGeneratedEmail(prev => prev ? { ...prev, body: e.target.value } : null)}
                    rows={10}
                    className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber resize-none"
                  />
                </div>
                <p className="text-deep-ink/40 text-xs mb-3">
                  Sending to: <strong>{selected?.email}</strong> · From: partners@taxnorth.ca
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => generateEmail(emailTemplate)}
                    className="flex-1 border border-fog-gray text-deep-ink text-sm font-medium py-2.5 rounded-button hover:bg-fog-gray transition-colors"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={sendEmail}
                    disabled={emailSending}
                    className="flex-1 bg-lantern-amber text-midnight-north font-semibold py-2.5 rounded-button hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {emailSending ? 'Sending...' : 'Send Email →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}