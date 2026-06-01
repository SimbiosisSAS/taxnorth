'use client'

import { useState } from 'react'
import { Phone, Mail, ChevronDown, Save } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: '#F4A332' },
  { value: 'contacted', label: 'Contacted', color: '#1A2744' },
  { value: 'in_progress', label: 'In progress', color: '#2196F3' },
  { value: 'completed', label: 'Completed', color: '#2E7D5E' },
  { value: 'lost', label: 'Lost', color: '#999' },
]

interface Lead {
  id: string
  full_name: string
  email: string
  phone: string
  province: string
  language: string
  situation: string[]
  notes: string
  created_at: string
  status: string
  note: string
}

export default function PortalCRM({ leads }: { leads: Lead[] }) {
  const [data, setData] = useState(leads)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  async function updateLead(leadId: string, status: string, note: string) {
    setSaving(leadId)
    await fetch('/api/accountant/update-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status, note })
    })
    setData(prev => prev.map(l => l.id === leadId ? { ...l, status, note } : l))
    setSaving(null)
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-deep-ink/50 mb-2">No clients yet.</p>
        <p className="text-deep-ink/40 text-sm">TaxNorth will notify you when a client connects with you.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((lead) => {
        const statusInfo = STATUS_OPTIONS.find(s => s.value === lead.status) || STATUS_OPTIONS[0]
        const isOpen = expanded === lead.id

        return (
          <div key={lead.id} className="border border-fog-gray rounded-card overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-fog-gray/50 transition-colors"
              onClick={() => setExpanded(isOpen ? null : lead.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-midnight-north rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {lead.full_name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-midnight-north text-sm">{lead.full_name || 'Unknown'}</p>
                  <p className="text-deep-ink/40 text-xs">{lead.province} · {lead.language} · {new Date(lead.created_at).toLocaleDateString('en-CA')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{
                  background: `${statusInfo.color}20`,
                  color: statusInfo.color,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {statusInfo.label}
                </span>
                <ChevronDown className={`w-4 h-4 text-deep-ink/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-fog-gray p-4 bg-fog-gray/30">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Client info */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-midnight-north text-sm">Client details</h4>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-deep-ink/40" />
                      <a href={`mailto:${lead.email}`} className="text-lantern-amber text-sm">{lead.email}</a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-deep-ink/40" />
                        <a href={`tel:${lead.phone}`} className="text-lantern-amber text-sm">{lead.phone}</a>
                      </div>
                    )}
                    {lead.situation && lead.situation.length > 0 && (
                      <div>
                        <p className="text-deep-ink/50 text-xs mb-1">Situation</p>
                        <div className="flex flex-wrap gap-1">
                          {lead.situation.map((s: string) => (
                            <span key={s} className="bg-white text-deep-ink text-xs px-2 py-0.5 rounded border border-fog-gray">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {lead.notes && (
                      <div>
                        <p className="text-deep-ink/50 text-xs mb-1">Client notes</p>
                        <p className="text-deep-ink text-sm bg-white p-2 rounded border border-fog-gray">{lead.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* CRM actions */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-midnight-north text-sm">Update status</h4>
                    <select
                      value={lead.status}
                      onChange={e => setData(prev => prev.map(l => l.id === lead.id ? { ...l, status: e.target.value } : l))}
                      className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm text-deep-ink outline-none focus:border-lantern-amber bg-white"
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <textarea
                      value={lead.note}
                      onChange={e => setData(prev => prev.map(l => l.id === lead.id ? { ...l, note: e.target.value } : l))}
                      placeholder="Add a private note about this client..."
                      rows={3}
                      className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm text-deep-ink outline-none focus:border-lantern-amber resize-none bg-white placeholder:text-deep-ink/40"
                    />
                    <button
                      onClick={() => updateLead(lead.id, lead.status, lead.note)}
                      disabled={saving === lead.id}
                      className="flex items-center gap-1.5 bg-midnight-north text-white text-sm font-semibold px-4 py-2 rounded-button hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saving === lead.id ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}