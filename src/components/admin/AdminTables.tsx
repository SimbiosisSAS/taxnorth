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
    await fetch('/api/admin/delete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ table: 'users', ids: selected })
})
    setData(prev => prev.filter(u => !selected.includes(u.id)))
    setSelected([])
    setLoading(false)
  }

  return (
    <div>
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 border border-red-200 rounded-button">
          <span className="text-red-600 text-sm font-medium">{selected.length} selected</span>
          <button
            onClick={deleteSelected}
            disabled={loading}
            className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-button hover:opacity-90 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 40 }}>
              <input type="checkbox" onChange={toggleAll} checked={selected.length === data.length && data.length > 0} />
            </th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Source</th>
            <th style={thStyle}>Conversations</th>
            <th style={thStyle}>Registered</th>
            <th style={thStyle}>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, i) => (
            <tr key={user.id} style={{ backgroundColor: selected.includes(user.id) ? '#FEF2F2' : i % 2 === 0 ? '#FAF8F5' : 'white' }}>
              <td style={tdStyle}>
                <input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggle(user.id)} />
              </td>
              <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{user.email}</td>
              <td style={tdStyle}>
                <span style={{ background: '#EEF1F7', color: '#1A2744', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {user.source}
                </span>
              </td>
              <td style={{ ...tdStyle, color: '#1A2744' }}>{user.conversations}</td>
              <td style={{ ...tdStyle, color: '#666', fontSize: '12px' }}>{new Date(user.created_at).toLocaleDateString('en-CA')}</td>
              <td style={{ ...tdStyle, color: '#666', fontSize: '12px' }}>{new Date(user.last_seen).toLocaleDateString('en-CA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey, table: 'leads', ids: selected })
    })
    setData(prev => prev.filter(l => !selected.includes(l.id)))
    setSelected([])
    setLoading(false)
  }

  return (
    <div>
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 border border-red-200 rounded-button">
          <span className="text-red-600 text-sm font-medium">{selected.length} selected</span>
          <button
            onClick={deleteSelected}
            disabled={loading}
            className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-button hover:opacity-90 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 40 }}>
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
        <tbody>
          {data.map((lead, i) => (
            <tr key={lead.id} style={{ backgroundColor: selected.includes(lead.id) ? '#FEF2F2' : i % 2 === 0 ? '#FAF8F5' : 'white' }}>
              <td style={tdStyle}>
                <input type="checkbox" checked={selected.includes(lead.id)} onChange={() => toggle(lead.id)} />
              </td>
              <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{lead.full_name || '—'}</td>
              <td style={tdStyle}><a href={`mailto:${lead.email}`} style={{ color: '#F4A332' }}>{lead.email}</a></td>
              <td style={tdStyle}><a href={`tel:${lead.phone}`} style={{ color: '#F4A332' }}>{lead.phone || '—'}</a></td>
              <td style={{ ...tdStyle, color: '#666' }}>{lead.province || '—'}</td>
              <td style={{ ...tdStyle, color: '#666' }}>{lead.professional_name || 'TaxNorth match'}</td>
              <td style={tdStyle}>
                <span style={{ background: '#F4A33220', color: '#F4A332', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {lead.status}
                </span>
              </td>
              <td style={{ ...tdStyle, color: '#666', fontSize: '12px' }}>{new Date(lead.created_at).toLocaleDateString('en-CA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
interface Conversation {
  id: string
  firstMessage: string
  messageCount: number
  language: string
  user_id: string | null
  created_at: string
}

export function ConversationsTable({ leads }: { leads: Lead[] }) {
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
    await fetch('/api/admin/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: adminKey, table: 'conversations', ids: selected })
    })
    setData(prev => prev.filter(c => !selected.includes(c.id)))
    setSelected([])
    setLoading(false)
  }

  return (
    <div>
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 border border-red-200 rounded-button">
          <span className="text-red-600 text-sm font-medium">{selected.length} selected</span>
          <button onClick={deleteSelected} disabled={loading}
            className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-button hover:opacity-90 disabled:opacity-50">
            <Trash2 className="w-3.5 h-3.5" />
            {loading ? 'Deleting...' : 'Delete selected'}
          </button>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: 40 }}>
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
        <tbody>
          {data.map((conv, i) => (
            <tr key={conv.id} style={{ backgroundColor: selected.includes(conv.id) ? '#FEF2F2' : i % 2 === 0 ? '#FAF8F5' : 'white' }}>
              <td style={tdStyle}>
                <input type="checkbox" checked={selected.includes(conv.id)} onChange={() => toggle(conv.id)} />
              </td>
              <td style={{ ...tdStyle, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1A2744' }}>
                {conv.firstMessage}
              </td>
              <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{conv.messageCount}</td>
              <td style={{ ...tdStyle, color: '#666' }}>{conv.language || 'en'}</td>
              <td style={tdStyle}>
                <span style={{ background: conv.user_id ? '#2E7D5E20' : '#EEF1F7', color: conv.user_id ? '#2E7D5E' : '#999', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                  {conv.user_id ? 'Yes' : 'Anonymous'}
                </span>
              </td>
              <td style={{ ...tdStyle, color: '#666', fontSize: '12px' }}>{new Date(conv.created_at).toLocaleDateString('en-CA')}</td>
              <td style={tdStyle}>
                <a href={`/admin/conversations/${conv.id}?key=${adminKey}`} style={{ color: '#F4A332', fontSize: '13px', fontWeight: 600 }}>
                  View →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}