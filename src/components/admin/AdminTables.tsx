'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

const thStyle = { textAlign: 'left' as const, padding: '10px 12px', fontSize: '13px', color: 'white', backgroundColor: '#1A2744' }
const tdStyle = { padding: '10px 12px', fontSize: '13px' }

interface User {
  id: string
  email: string
  source: string
  conversations: number
  created_at: string
  last_seen: string
}

interface Lead {
  id: string
  full_name: string
  email: string
  phone: string
  province: string
  professional_name: string
  status: string
  created_at: string
}

interface Conversation {
  id: string
  firstMessage: string
  messageCount: number
  language: string
  user_id: string | null
  created_at: string
}

export function UsersTable({ users }: { users: User[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [data, setData] = useState(users)
  const [loading, setLoading] = useState(false)

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(prev => prev.length === data.length ? [] : data.map(u => u.id))
  }

  async function deleteSelected() {
    if (!selected.length) return
    if (!confirm(`Delete ${selected.length} user(s)?`)) return
    setLoading(true)
    const res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'users', ids: selected })
    })
    if (res.ok) {
      setData(prev => prev.filter(u => !selected.includes(u.id)))
      setSelected([])
    } else {
      alert('Delete failed. Please refresh and try again.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {selected.length > 0 && (
        <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <button
            onClick={deleteSelected}
            disabled={loading}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th style={thStyle} className="w-10">
                <input type="checkbox" onChange={toggleAll} checked={selected.length === data.length && data.length > 0} />
              </th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Source</th>
              <th style={thStyle}>Conversations</th>
              <th style={thStyle}>Registered</th>
              <th style={thStyle}>Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td style={tdStyle}>
                  <input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggle(user.id)} />
                </td>
                <td style={tdStyle} className="font-medium">{user.email}</td>
                <td style={tdStyle}>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] uppercase tracking-wider text-slate-600">
                    {user.source}
                  </span>
                </td>
                <td style={tdStyle}>{user.conversations}</td>
                <td style={tdStyle}>{new Date(user.created_at).toLocaleDateString('en-CA')}</td>
                <td style={tdStyle}>{new Date(user.last_seen).toLocaleDateString('en-CA')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [data, setData] = useState(leads)
  const [loading, setLoading] = useState(false)

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(prev => prev.length === data.length ? [] : data.map(l => l.id))
  }

  async function deleteSelected() {
    if (!selected.length) return
    if (!confirm(`Delete ${selected.length} lead(s)?`)) return
    setLoading(true)
    const res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'leads', ids: selected })
    })
    if (res.ok) {
      setData(prev => prev.filter(l => !selected.includes(l.id)))
      setSelected([])
    } else {
      alert('Delete failed. Please refresh and try again.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {selected.length > 0 && (
        <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <button
            onClick={deleteSelected}
            disabled={loading}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th style={thStyle} className="w-10">
                <input type="checkbox" onChange={toggleAll} checked={selected.length === data.length && data.length > 0} />
              </th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Province</th>
              <th style={thStyle}>Professional</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td style={tdStyle}>
                  <input type="checkbox" checked={selected.includes(lead.id)} onChange={() => toggle(lead.id)} />
                </td>
                <td style={tdStyle} className="font-medium">{lead.full_name || '—'}</td>
                <td style={tdStyle}>{lead.email}</td>
                <td style={tdStyle}>{lead.phone || '—'}</td>
                <td style={tdStyle}>{lead.province || '—'}</td>
                <td style={tdStyle}>{lead.professional_name || 'TaxNorth match'}</td>
                <td style={tdStyle}>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] font-medium uppercase">
                    {lead.status}
                  </span>
                </td>
                <td style={tdStyle}>{new Date(lead.created_at).toLocaleDateString('en-CA')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ConversationsTable({ conversations }: { conversations: Conversation[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [data, setData] = useState(conversations)
  const [loading, setLoading] = useState(false)

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(prev => prev.length === data.length ? [] : data.map(c => c.id))
  }

  async function deleteSelected() {
    if (!selected.length) return
    if (!confirm(`Delete ${selected.length} conversation(s)?`)) return
    setLoading(true)
    const res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'conversations', ids: selected })
    })
    if (res.ok) {
      setData(prev => prev.filter(c => !selected.includes(c.id)))
      setSelected([])
    } else {
      alert('Delete failed. Please refresh and try again.')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {selected.length > 0 && (
        <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <button
            onClick={deleteSelected}
            disabled={loading}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th style={thStyle} className="w-10">
                <input type="checkbox" onChange={toggleAll} checked={selected.length === data.length && data.length > 0} />
              </th>
              <th style={thStyle}>First message</th>
              <th style={thStyle}>Messages</th>
              <th style={thStyle}>Language</th>
              <th style={thStyle}>Has account</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((conv) => (
              <tr key={conv.id} className="hover:bg-slate-50">
                <td style={tdStyle}>
                  <input type="checkbox" checked={selected.includes(conv.id)} onChange={() => toggle(conv.id)} />
                </td>
                <td style={tdStyle} className="max-w-xs truncate italic text-slate-500">
                  "{conv.firstMessage}"
                </td>
                <td style={tdStyle}>{conv.messageCount}</td>
                <td style={tdStyle}>{conv.language || 'en'}</td>
                <td style={tdStyle}>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${conv.user_id ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {conv.user_id ? 'Yes' : 'Anonymous'}
                  </span>
                </td>
                <td style={tdStyle}>{new Date(conv.created_at).toLocaleDateString('en-CA')}</td>
                <td style={tdStyle}>
                  <a href={`/admin/chat/${conv.id}`} className="text-blue-600 hover:underline">
                    View →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}