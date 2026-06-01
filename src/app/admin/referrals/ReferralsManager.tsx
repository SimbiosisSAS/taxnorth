'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, Copy, Check } from 'lucide-react'

const CATEGORIES = ['settlement', 'bank', 'rcic', 'school', 'community', 'other']

interface ReferralSource {
  id: string
  name: string
  code: string
  category: string
  contact_name: string
  contact_email: string
  is_active: boolean
  conversations: number
  leads: number
}

const empty = {
  name: '', code: '', category: 'settlement',
  contact_name: '', contact_email: '', is_active: true
}

export default function ReferralsManager({ sources, adminKey }: { sources: ReferralSource[], adminKey: string }) {
  const [data, setData] = useState(sources)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>(empty)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  function startAdd() { setForm(empty); setAdding(true); setEditing(null) }
  function startEdit(s: ReferralSource) { setForm({ ...s }); setEditing(s.id); setAdding(false) }
  function cancel() { setAdding(false); setEditing(null); setForm(empty) }

  async function save() {
    setSaving(true)
    if (editing) {
      await fetch('/api/admin/referrals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, id: editing, source: form })
      })
      setData(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s))
    } else {
      const res = await fetch('/api/admin/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, source: form })
      })
      const result = await res.json()
      setData(prev => [{ ...result.source, conversations: 0, leads: 0 }, ...prev])
    }
    cancel()
    setSaving(false)
  }

  async function deleteSrc(id: string) {
    if (!confirm('Delete this referral source?')) return
    await fetch('/api/admin/referrals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey, id })
    })
    setData(prev => prev.filter(s => s.id !== id))
  }

  async function copyUrl(code: string) {
    await navigator.clipboard.writeText(`https://www.taxnorth.ca/ref/${code}`)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const categoryColors: Record<string, string> = {
    settlement: '#2E7D5E', bank: '#1A2744', rcic: '#F4A332',
    school: '#2196F3', community: '#9C27B0', other: '#999'
  }

  const FormPanel = (
    <div className="bg-white rounded-card p-6 mb-6 border-2 border-lantern-amber">
      <h3 className="font-heading font-semibold text-midnight-north text-lg mb-5">
        {adding ? 'Add new partner' : 'Edit partner'}
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Partner name *</label>
          <input value={form.name || ''} onChange={e => setForm((p: any) => ({ ...p, name: e.target.value }))}
            placeholder="YMCA Newcomers Calgary"
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">URL code *</label>
          <div className="flex items-center gap-2">
            <span className="text-deep-ink/40 text-sm">taxnorth.ca/ref/</span>
            <input value={form.code || ''} onChange={e => setForm((p: any) => ({ ...p, code: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              placeholder="ymca-calgary"
              className="flex-1 border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Category</label>
          <select value={form.category || 'settlement'} onChange={e => setForm((p: any) => ({ ...p, category: e.target.value }))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber bg-white">
            {CATEGORIES.map(c => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Contact name</label>
          <input value={form.contact_name || ''} onChange={e => setForm((p: any) => ({ ...p, contact_name: e.target.value }))}
            placeholder="Jane Smith"
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Contact email</label>
          <input type="email" value={form.contact_email || ''} onChange={e => setForm((p: any) => ({ ...p, contact_email: e.target.value }))}
            placeholder="jane@organization.ca"
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_active !== false} onChange={e => setForm((p: any) => ({ ...p, is_active: e.target.checked }))} />
            <span className="text-sm text-deep-ink">Active</span>
          </label>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={save} disabled={saving || !form.name}
          className="flex items-center gap-1.5 bg-lantern-amber text-midnight-north font-semibold px-5 py-2.5 rounded-button hover:opacity-90 disabled:opacity-50">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : adding ? 'Add partner' : 'Save changes'}
        </button>
        <button onClick={cancel}
          className="flex items-center gap-1.5 border border-fog-gray text-deep-ink px-5 py-2.5 rounded-button hover:bg-fog-gray transition-colors">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div>
      {!adding && !editing && (
        <button onClick={startAdd}
          className="flex items-center gap-2 bg-midnight-north text-white font-semibold px-5 py-3 rounded-button hover:opacity-90 transition-opacity mb-6">
          <Plus className="w-4 h-4" /> Add new partner
        </button>
      )}

      {(adding || editing) && FormPanel}

      {data.length === 0 ? (
        <div className="bg-white rounded-card p-8 text-center">
          <p className="text-deep-ink/50 mb-2">No partners yet.</p>
          <p className="text-deep-ink/40 text-sm">Add your first distribution partner above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map(source => (
            <div key={source.id} className="bg-white rounded-card p-5 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-semibold text-midnight-north text-sm">{source.name}</span>
                    <span style={{
                      background: `${categoryColors[source.category] || '#999'}20`,
                      color: categoryColors[source.category] || '#999',
                      padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>{source.category}</span>
                    <span style={{
                      background: source.is_active ? '#2E7D5E20' : '#EEF1F7',
                      color: source.is_active ? '#2E7D5E' : '#999',
                      padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600
                    }}>{source.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-xs bg-fog-gray text-lantern-amber px-2 py-0.5 rounded">
                      taxnorth.ca/ref/{source.code}
                    </code>
                    <span className="text-deep-ink/40 text-xs">{source.conversations} chats · {source.leads} leads</span>
                    {source.contact_email && <span className="text-deep-ink/40 text-xs">{source.contact_email}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => copyUrl(source.code)}
                  className="flex items-center gap-1 border border-fog-gray text-deep-ink/60 text-xs px-2.5 py-1.5 rounded-button hover:bg-fog-gray transition-colors">
                  {copied === source.code ? <><Check className="w-3 h-3 text-maple-green" /> Copied</> : <><Copy className="w-3 h-3" /> Copy link</>}
                </button>
                <button onClick={() => startEdit(source)}
                  className="flex items-center gap-1 border border-fog-gray text-deep-ink/60 text-sm px-3 py-1.5 rounded-button hover:bg-fog-gray transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => deleteSrc(source.id)}
                  className="flex items-center gap-1 border border-red-200 text-red-500 text-sm px-3 py-1.5 rounded-button hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}