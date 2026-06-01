'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react'

const PROVINCES = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan']
const ALL_LANGUAGES = ['English', 'French', 'Spanish', 'Mandarin', 'Punjabi', 'Arabic', 'Romanian', 'Ukrainian', 'Japanese', 'Korean', 'Dari', 'Turkish']
const ALL_SPECIALTIES = ['Personal tax filing', 'Newcomers', 'First-time filers', 'Self-employed', 'Work permit holders', 'International students', 'Business income', 'Rental income', 'Capital gains', 'Foreign income']

interface Professional {
  id: string
  name: string
  firm_name: string
  province: string
  city: string
  languages: string[]
  specialties: string[]
  email: string
  phone: string
  website: string
  bio: string
  is_verified: boolean
  subscription_tier: string
  subscription_status: string
  slug: string
}

const emptyPro: Partial<Professional> = {
  name: '', firm_name: '', province: 'Alberta', city: '',
  languages: ['English'], specialties: [],
  email: '', phone: '', website: '', bio: '',
  is_verified: false, subscription_tier: 'basic',
  subscription_status: 'active', slug: ''
}

export default function ProfessionalsManager({ professionals, adminKey }: { professionals: Professional[], adminKey: string }) {
  const [data, setData] = useState(professionals)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<Partial<Professional>>(emptyPro)
  const [saving, setSaving] = useState(false)

  function startAdd() {
    setForm(emptyPro)
    setAdding(true)
    setEditing(null)
  }

  function startEdit(pro: Professional) {
    setForm({ ...pro })
    setEditing(pro.id)
    setAdding(false)
  }

  function cancel() {
    setAdding(false)
    setEditing(null)
    setForm(emptyPro)
  }

  function toggleLang(lang: string) {
    setForm(prev => ({
      ...prev,
      languages: prev.languages?.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...(prev.languages || []), lang]
    }))
  }

  function toggleSpecialty(s: string) {
    setForm(prev => ({
      ...prev,
      specialties: prev.specialties?.includes(s)
        ? prev.specialties.filter(x => x !== s)
        : [...(prev.specialties || []), s]
    }))
  }

  async function save() {
    setSaving(true)
    const slug = form.slug || `${form.name?.toLowerCase().replace(/\s+/g, '-')}-${form.city?.toLowerCase()}`
    const payload = { ...form, slug }

    const res = await fetch('/api/admin/professionals', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey, id: editing, professional: payload })
    })
    const result = await res.json()

    if (editing) {
      setData(prev => prev.map(p => p.id === editing ? { ...p, ...payload } : p))
    } else {
      setData(prev => [result.professional, ...prev])
    }

    cancel()
    setSaving(false)
  }

  async function deletePro(id: string) {
    if (!confirm('Delete this professional?')) return
    await fetch('/api/admin/professionals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey, id })
    })
    setData(prev => prev.filter(p => p.id !== id))
  }

  const FormPanel = (
    <div className="bg-white rounded-card p-6 mb-6 border-2 border-lantern-amber">
      <h3 className="font-heading font-semibold text-midnight-north text-lg mb-6">
        {adding ? 'Add new professional' : 'Edit professional'}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Full name *</label>
          <input value={form.name || ''} onChange={e => setForm(p => ({...p, name: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Firm name</label>
          <input value={form.firm_name || ''} onChange={e => setForm(p => ({...p, firm_name: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Province *</label>
          <select value={form.province || ''} onChange={e => setForm(p => ({...p, province: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber bg-white">
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">City *</label>
          <input value={form.city || ''} onChange={e => setForm(p => ({...p, city: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Email *</label>
          <input type="email" value={form.email || ''} onChange={e => setForm(p => ({...p, email: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Phone</label>
          <input value={form.phone || ''} onChange={e => setForm(p => ({...p, phone: e.target.value}))}
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Website</label>
          <input value={form.website || ''} onChange={e => setForm(p => ({...p, website: e.target.value}))}
            placeholder="https://"
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div>
          <label className="block text-sm font-medium text-deep-ink mb-1">Slug (URL)</label>
          <input value={form.slug || ''} onChange={e => setForm(p => ({...p, slug: e.target.value}))}
            placeholder="auto-generated if empty"
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-ink mb-2">Languages</label>
          <div className="flex flex-wrap gap-2">
            {ALL_LANGUAGES.map(lang => (
              <button key={lang} type="button" onClick={() => toggleLang(lang)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  form.languages?.includes(lang)
                    ? 'bg-midnight-north text-white'
                    : 'bg-fog-gray text-deep-ink/60 hover:bg-fog-gray/70'
                }`}>
                {lang}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-ink mb-2">Specialties</label>
          <div className="flex flex-wrap gap-2">
            {ALL_SPECIALTIES.map(s => (
              <button key={s} type="button" onClick={() => toggleSpecialty(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  form.specialties?.includes(s)
                    ? 'bg-lantern-amber text-midnight-north'
                    : 'bg-fog-gray text-deep-ink/60 hover:bg-fog-gray/70'
                }`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-deep-ink mb-1">Bio</label>
          <textarea value={form.bio || ''} onChange={e => setForm(p => ({...p, bio: e.target.value}))}
            rows={3} placeholder="Professional biography..."
            className="w-full border border-fog-gray rounded-button px-3 py-2 text-sm outline-none focus:border-lantern-amber resize-none" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_verified || false} onChange={e => setForm(p => ({...p, is_verified: e.target.checked}))} />
            <span className="text-sm text-deep-ink">Verified</span>
          </label>
          <select value={form.subscription_tier || 'basic'} onChange={e => setForm(p => ({...p, subscription_tier: e.target.value}))}
            className="border border-fog-gray rounded-button px-3 py-1.5 text-sm outline-none focus:border-lantern-amber bg-white">
            <option value="basic">Basic ($29)</option>
            <option value="verified">Verified ($99)</option>
            <option value="enterprise">Enterprise ($299)</option>
          </select>
          <select value={form.subscription_status || 'active'} onChange={e => setForm(p => ({...p, subscription_status: e.target.value}))}
            className="border border-fog-gray rounded-button px-3 py-1.5 text-sm outline-none focus:border-lantern-amber bg-white">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="trial">Trial</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={save} disabled={saving}
          className="flex items-center gap-1.5 bg-lantern-amber text-midnight-north font-semibold px-5 py-2.5 rounded-button hover:opacity-90 disabled:opacity-50">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : adding ? 'Add professional' : 'Save changes'}
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
          <Plus className="w-4 h-4" /> Add new professional
        </button>
      )}

      {(adding || editing) && FormPanel}

      <div className="space-y-3">
        {data.map(pro => (
          <div key={pro.id} className={`bg-white rounded-card p-5 flex items-center justify-between ${editing === pro.id ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-midnight-north rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{pro.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-semibold text-midnight-north text-sm">{pro.name}</span>
                  {pro.is_verified && <Star className="w-3.5 h-3.5 text-lantern-amber fill-lantern-amber" />}
                  <span style={{
                    background: pro.subscription_status === 'active' ? '#2E7D5E20' : '#EEF1F7',
                    color: pro.subscription_status === 'active' ? '#2E7D5E' : '#999',
                    padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600
                  }}>{pro.subscription_status}</span>
                  <span style={{ background: '#F4A33220', color: '#F4A332', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                    {pro.subscription_tier}
                  </span>
                </div>
                <p className="text-deep-ink/50 text-xs">{pro.firm_name} · {pro.city}, {pro.province} · {pro.email}</p>
                <p className="text-deep-ink/40 text-xs">{pro.languages?.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => startEdit(pro)}
                className="flex items-center gap-1 border border-fog-gray text-deep-ink/60 text-sm px-3 py-1.5 rounded-button hover:bg-fog-gray transition-colors">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => deletePro(pro.id)}
                className="flex items-center gap-1 border border-red-200 text-red-500 text-sm px-3 py-1.5 rounded-button hover:bg-red-50 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}