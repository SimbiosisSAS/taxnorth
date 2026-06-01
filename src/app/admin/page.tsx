import { Flashlight, Users, MessageCircle, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const params = await searchParams
  const key = params.key

  if (key !== process.env.ADMIN_KEY) {
    redirect('/')
  }

  // Stats
  const [
    { count: totalUsers },
    { count: totalLeads },
    { count: totalConversations },
    { data: users },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('conversations').select('*', { count: 'exact', head: true }),
    supabase.from('users')
      .select('id, email, source, created_at, last_seen')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase.from('leads')
      .select('full_name, email, phone, province, language, situation, status, created_at, professional_name')
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  // Conversations per user
  const usersWithConversations = await Promise.all(
    (users || []).map(async (user) => {
      const { count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      return { ...user, conversations: count || 0 }
    })
  )

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Admin</span>
            </span>
          </Link>
          <span className="text-white/40 text-xs">Internal use only</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { icon: <Users className="w-6 h-6 text-lantern-amber" />, label: 'Registered users', value: totalUsers || 0 },
            { icon: <DollarSign className="w-6 h-6 text-maple-green" />, label: 'Total leads', value: totalLeads || 0 },
            { icon: <MessageCircle className="w-6 h-6 text-lantern-amber" />, label: 'Conversations', value: totalConversations || 0 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-fog-gray rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="font-heading font-bold text-midnight-north text-3xl">{stat.value}</p>
                <p className="text-deep-ink/50 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-card p-6 mb-8">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-lantern-amber" />
            Registered Users ({totalUsers || 0})
          </h2>
          <div className="overflow-x-auto">
            <table style="width:100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color:#1A2744; color:white;">
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Email</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Source</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Conversations</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Registered</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {usersWithConversations.map((user, i) => (
                  <tr key={user.id} style={{backgroundColor: i % 2 === 0 ? '#FAF8F5' : 'white'}}>
                    <td style="padding:10px 12px; font-size:13px; color:#1A2744; font-weight:600;">{user.email}</td>
                    <td style="padding:10px 12px; font-size:13px;">
                      <span style={{
                        background: user.source === 'chat' ? '#EEF1F7' : '#2E7D5E20',
                        color: user.source === 'chat' ? '#1A2744' : '#2E7D5E',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {user.source}
                      </span>
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#1A2744;">{user.conversations}</td>
                    <td style="padding:10px 12px; font-size:12px; color:#666;">
                      {new Date(user.created_at).toLocaleDateString('en-CA')}
                    </td>
                    <td style="padding:10px 12px; font-size:12px; color:#666;">
                      {new Date(user.last_seen).toLocaleDateString('en-CA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="bg-white rounded-card p-6">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-maple-green" />
            Recent Leads ({totalLeads || 0})
          </h2>
          <div className="overflow-x-auto">
            <table style="width:100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color:#1A2744; color:white;">
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Name</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Email</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Phone</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Province</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Professional</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Status</th>
                  <th style="text-align:left; padding:10px 12px; font-size:13px;">Date</th>
                </tr>
              </thead>
              <tbody>
                {(recentLeads || []).map((lead, i) => (
                  <tr key={i} style={{backgroundColor: i % 2 === 0 ? '#FAF8F5' : 'white'}}>
                    <td style="padding:10px 12px; font-size:13px; color:#1A2744; font-weight:600;">{lead.full_name || '—'}</td>
                    <td style="padding:10px 12px; font-size:13px;">
                      <a href={`mailto:${lead.email}`} style="color:#F4A332;">{lead.email}</a>
                    </td>
                    <td style="padding:10px 12px; font-size:13px;">
                      <a href={`tel:${lead.phone}`} style="color:#F4A332;">{lead.phone || '—'}</a>
                    </td>
                    <td style="padding:10px 12px; font-size:13px; color:#666;">{lead.province || '—'}</td>
                    <td style="padding:10px 12px; font-size:13px; color:#666;">{lead.professional_name || 'TaxNorth match'}</td>
                    <td style="padding:10px 12px; font-size:13px;">
                      <span style={{
                        background: lead.status === 'new' ? '#F4A33220' : '#2E7D5E20',
                        color: lead.status === 'new' ? '#F4A332' : '#2E7D5E',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style="padding:10px 12px; font-size:12px; color:#666;">
                      {new Date(lead.created_at).toLocaleDateString('en-CA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}