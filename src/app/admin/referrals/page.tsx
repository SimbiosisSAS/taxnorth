import { Flashlight, ArrowLeft, TrendingUp, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const params = await searchParams
  if (params.key !== process.env.ADMIN_KEY) redirect('/')

  const { data: sources } = await supabase
    .from('referral_sources')
    .select('*')
    .order('created_at', { ascending: true })

  const referralStats = await Promise.all(
    (sources || []).map(async (source) => {
      const { count: conversations } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('referral_code', source.code)

      const { count: leads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('referral_code', source.code)

      return { ...source, conversations: conversations || 0, leads: leads || 0 }
    })
  )

  const thStyle = { textAlign: 'left' as const, padding: '10px 14px', fontSize: '13px', color: 'white', backgroundColor: '#1A2744' }
  const tdStyle = { padding: '10px 14px', fontSize: '13px' }

  const categoryColors: Record<string, string> = {
    settlement: '#2E7D5E',
    bank: '#1A2744',
    rcic: '#F4A332',
    school: '#2196F3',
    community: '#9C27B0',
    other: '#999'
  }

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/admin?key=${params.key}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Admin</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link href={`/admin?key=${params.key}`}
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-midnight-north text-2xl mb-1 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-lantern-amber" />
              Partner Referrals
            </h1>
            <p className="text-deep-ink/50 text-sm">Track which partners are sending traffic and leads</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-lantern-amber" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">
                {referralStats.reduce((a, s) => a + s.conversations, 0)}
              </p>
              <p className="text-deep-ink/50 text-xs">Total referral conversations</p>
            </div>
          </div>
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <Users className="w-5 h-5 text-maple-green" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">
                {referralStats.reduce((a, s) => a + s.leads, 0)}
              </p>
              <p className="text-deep-ink/50 text-xs">Total referral leads</p>
            </div>
          </div>
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-lantern-amber" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">
                {sources?.filter(s => s.is_active).length || 0}
              </p>
              <p className="text-deep-ink/50 text-xs">Active partners</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card overflow-x-auto">
          <div className="p-6 border-b border-fog-gray">
            <h2 className="font-heading font-semibold text-midnight-north">Referral Links & Performance</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Partner</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Referral URL</th>
                <th style={thStyle}>Conversations</th>
                <th style={thStyle}>Leads</th>
                <th style={thStyle}>Conversion</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {referralStats.map((source, i) => {
                const conversion = source.conversations > 0
                  ? Math.round((source.leads / source.conversations) * 100)
                  : 0
                return (
                  <tr key={source.id} style={{ backgroundColor: i % 2 === 0 ? '#FAF8F5' : 'white' }}>
                    <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>
                      {source.name}
                      {source.contact_name && (
                        <p style={{ color: '#999', fontSize: '11px', fontWeight: 400 }}>{source.contact_name}</p>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        background: `${categoryColors[source.category] || '#999'}20`,
                        color: categoryColors[source.category] || '#999',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                        textTransform: 'capitalize'
                      }}>
                        {source.category}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <code style={{ fontSize: '12px', color: '#F4A332', backgroundColor: '#F4A33210', padding: '2px 6px', borderRadius: '4px' }}>
                        taxnorth.ca/ref/{source.code}
                      </code>
                    </td>
                    <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{source.conversations}</td>
                    <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{source.leads}</td>
                    <td style={{ ...tdStyle, color: conversion > 10 ? '#2E7D5E' : '#666', fontWeight: 600 }}>
                      {conversion}%
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        background: source.is_active ? '#2E7D5E20' : '#EEF1F7',
                        color: source.is_active ? '#2E7D5E' : '#999',
                        padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600
                      }}>
                        {source.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}