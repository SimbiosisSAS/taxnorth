'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X, ChevronRight, UserCheck, RotateCcw, Clock, DollarSign, Users } from 'lucide-react'

interface Professional {
  id: string
  name: string
  firm_name: string
  email: string
  province: string
  languages: string[]
}

interface Lead {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  province: string
  language: string
  situation: string[]
  notes: string
  status: string
  payment_status: string
  payment_amount: number
  payment_date: string
  professional_id: string
  professional_name: string
  assigned_at: string
  session_id: string
  conversation_id: string
  professional: Professional | null
}

const PAYMENT_COLORS: Record<string, string> = {
  pending: 'bg-fog-gray text-deep-ink/50',
  pending_etransfer: 'bg-lantern-amber/20 text-lantern-amber',
  completed: 'bg-maple-green/20 text-maple-green',
}

const PAYMENT_LABELS: Record<string, string> = {
  pending: 'Pending',
  pending_etransfer: 'e-Transfer sent',
  completed: 'Paid ✓',
}

export default function ClientLeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [selected, setSelected] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [assignProfId, setAssignProfId] = useState('')
  const [assignNotes, setAssignNotes] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    const [leadsRes, profRes] = await Promise.all([
      fetch('/api/admin/leads'),
      fetch('/api/admin/professionals'),
    ])
    const leadsData = await leadsRes.json()
    const profData = await profRes.json()
    setLeads(Array.isArray(leadsData) ? leadsData : [])
    setProfessionals(Array.isArray(profData) ? profData : [])
    if (selected) {
      const updated = leadsData.find((l: Lead) => l.id === selected.id)
      if (updated) setSelected(updated)
    }
    setLoading(false)
  }

  async function confirmPayment(leadId: string) {
    setActionLoading(true)
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, action: 'confirm_payment' }),
    })
    await loadData()
    setActionLoading(false)
  }

  async function assignProfessional(leadId: string) {
    if (!assignProfId) return
    setActionLoading(true)
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, action: 'assign', professionalId: assignProfId, notes: assignNotes }),
    })
    setAssignProfId('')
    setAssignNotes('')
    await loadData()
    setActionLoading(false)
  }

  async function returnToPool(leadId: string) {
    setActionLoading(true)
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, action: 'return', notes: 'Returned by admin' }),
    })
    await loadData()
    setActionLoading(false)
  }

  const filtered = leads.filter(l => {
    if (filter === 'all') return true
    if (filter === 'pending_etransfer') return l.payment_status === 'pending_etransfer'
    if (filter === 'unassigned') return l.payment_status === 'completed' && !l.professional_id
    if (filter === 'assigned') return !!l.professional_id
    return true
  })

  const stats = {
    total: leads.length,
    pending_etransfer: leads.filter(l => l.payment_status === 'pending_etransfer').length,
    paid: leads.filter(l => l.payment_status === 'completed').length,
    unassigned: leads.filter(l => l.payment_status === 'completed' && !l.professional_id).length,
  }

  const relevantPros = professionals.filter(p =>
    !selected?.province || p.province === selected.province ||
    p.province === 'All' || !p.province
  )

  return (
    <div className="min-h-screen bg-fog-gray">

      <div className="bg-midnight-north px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading font-bold text-white text-xl">Client Leads</h1>
          <p className="text-white/50 text-sm">Manage paid client connections and CPA assignments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Leads', value: stats.total, icon: <Users className="w-5 h-5" /> },
            { label: 'e-Transfer Pending', value: stats.pending_etransfer, icon: <Clock className="w-5 h-5" />, highlight: stats.pending_etransfer > 0 },
            { label: 'Paid', value: stats.paid, icon: <DollarSign className="w-5 h-5" /> },
            { label: 'Unassigned Paid', value: stats.unassigned, icon: <UserCheck className="w-5 h-5" />, highlight: stats.unassigned > 0 },
          ].map(s => (
            <div key={s.label} className={`bg-white rounded-card p-4 flex items-center gap-3 ${s.highlight ? 'border-2 border-lantern-amber' : ''}`}>
              <div className={`${s.highlight ? 'text-lantern-amber' : 'text-deep-ink/30'}`}>{s.icon}</div>
              <div>
                <p className={`font-heading font-bold text-2xl ${s.highlight ? 'text-lantern-amber' : 'text-midnight-north'}`}>{s.value}</p>
                <p className="text-deep-ink/50 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all', label: 'All' },
            { key: 'pending_etransfer', label: `⚡ e-Transfer pending (${stats.pending_etransfer})` },
            { key: 'unassigned', label: `Paid — unassigned (${stats.unassigned})` },
            { key: 'assigned', label: 'Assigned' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'bg-midnight-north text-white'
                  : 'bg-white text-deep-ink/60 hover:bg-fog-gray'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">

          {/* TABLE */}
          <div className="flex-1 bg-white rounded-card overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-deep-ink/40">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-deep-ink/40">No leads found.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-fog-gray text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Client</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Province</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Payment</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Assigned to</th>
                    <th className="px-4 py-3 text-xs font-semibold text-deep-ink/50">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelected(lead)}
                      className={`border-t border-fog-gray cursor-pointer hover:bg-fog-gray/50 transition-colors ${selected?.id === lead.id ? 'bg-lantern-amber/5' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-midnight-north text-sm">{lead.full_name || 'Unknown'}</p>
                        <p className="text-xs text-deep-ink/40">{lead.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-deep-ink/70">{lead.province || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${PAYMENT_COLORS[lead.payment_status] || PAYMENT_COLORS.pending}`}>
                          {PAYMENT_LABELS[lead.payment_status] || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-deep-ink/60">
                        {lead.professional_name || <span className="text-deep-ink/30 italic">Unassigned</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-deep-ink/40">
                        {new Date(lead.created_at).toLocaleDateString('en-CA')}
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
                  <h3 className="font-heading font-bold text-midnight-north">{selected.full_name || 'Unknown'}</h3>
                  <p className="text-deep-ink/50 text-xs">{selected.email}</p>
                </div>
                <button onClick={() => setSelected(null)}>
                  <X className="w-4 h-4 text-deep-ink/40 hover:text-deep-ink" />
                </button>
              </div>

              {/* CLIENT INFO */}
              <div className="space-y-1.5 mb-5 text-sm">
                {selected.phone && <p className="text-deep-ink/60"><span className="text-deep-ink/40">Phone:</span> {selected.phone}</p>}
                {selected.province && <p className="text-deep-ink/60"><span className="text-deep-ink/40">Province:</span> {selected.province}</p>}
                {selected.language && <p className="text-deep-ink/60"><span className="text-deep-ink/40">Language:</span> {selected.language}</p>}
                {selected.situation?.length > 0 && (
                  <div>
                    <p className="text-deep-ink/40 text-xs mb-1">Situation:</p>
                    <div className="flex flex-wrap gap-1">
                      {selected.situation.map(s => (
                        <span key={s} className="bg-fog-gray text-deep-ink text-xs px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selected.notes && (
                  <p className="text-deep-ink/60 text-xs bg-fog-gray rounded p-2">{selected.notes}</p>
                )}
              </div>

              {/* PAYMENT STATUS */}
              <div className={`rounded-button p-3 mb-4 ${
                selected.payment_status === 'completed'
                  ? 'bg-maple-green/10 border border-maple-green/30'
                  : selected.payment_status === 'pending_etransfer'
                  ? 'bg-lantern-amber/10 border border-lantern-amber/30'
                  : 'bg-fog-gray'
              }`}>
                <p className="text-xs font-semibold text-midnight-north mb-1">Payment Status</p>
                <p className="text-sm font-bold">
                  {PAYMENT_LABELS[selected.payment_status] || 'Pending'}
                </p>
                {selected.payment_status === 'pending_etransfer' && (
                  <button
                    onClick={() => confirmPayment(selected.id)}
                    disabled={actionLoading}
                    className="w-full mt-2 bg-maple-green text-white text-xs font-semibold py-2 rounded-button hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Confirm e-Transfer received
                  </button>
                )}
                {selected.payment_date && (
                  <p className="text-deep-ink/40 text-xs mt-1">
                    {new Date(selected.payment_date).toLocaleDateString('en-CA')}
                  </p>
                )}
              </div>

              {/* ASSIGN CPA */}
              {selected.payment_status === 'completed' && !selected.professional_id && (
                <div className="border border-fog-gray rounded-button p-3 mb-4">
                  <p className="text-xs font-semibold text-midnight-north mb-2">Assign to CPA</p>
                  <select
                    value={assignProfId}
                    onChange={e => setAssignProfId(e.target.value)}
                    className="w-full border border-fog-gray rounded-button px-3 py-2 text-xs outline-none focus:border-lantern-amber mb-2 bg-white"
                  >
                    <option value="">Select a professional...</option>
                    {relevantPros.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.firm_name} ({p.province})
                      </option>
                    ))}
                  </select>
                  <textarea
                    value={assignNotes}
                    onChange={e => setAssignNotes(e.target.value)}
                    placeholder="Notes for the CPA (optional)"
                    rows={2}
                    className="w-full border border-fog-gray rounded-button px-3 py-2 text-xs outline-none focus:border-lantern-amber resize-none mb-2"
                  />
                  <button
                    onClick={() => assignProfessional(selected.id)}
                    disabled={!assignProfId || actionLoading}
                    className="w-full bg-lantern-amber text-midnight-north text-xs font-semibold py-2 rounded-button hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Assign CPA → Send notification
                  </button>
                </div>
              )}

              {/* ASSIGNED INFO */}
              {selected.professional_id && (
                <div className="border border-maple-green/30 bg-maple-green/5 rounded-button p-3 mb-4">
                  <p className="text-xs font-semibold text-midnight-north mb-1">Assigned to</p>
                  <p className="text-sm font-bold text-midnight-north">{selected.professional_name}</p>
                  {selected.assigned_at && (
                    <p className="text-deep-ink/40 text-xs">
                      {new Date(selected.assigned_at).toLocaleDateString('en-CA')}
                    </p>
                  )}
                  <button
                    onClick={() => returnToPool(selected.id)}
                    disabled={actionLoading}
                    className="w-full mt-2 border border-fog-gray text-deep-ink/60 text-xs font-medium py-1.5 rounded-button hover:bg-fog-gray transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Return to pool
                  </button>
                </div>
              )}

              {/* CONVERSATION LINK */}
              {selected.conversation_id && (
                <a
                  href={`/admin/conversations/${selected.conversation_id}`}
                  className="block w-full text-center border border-fog-gray text-deep-ink/60 text-xs font-medium py-2 rounded-button hover:bg-fog-gray transition-colors"
                >
                  View full conversation →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}