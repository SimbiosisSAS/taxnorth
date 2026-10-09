import { Flashlight, Users, MessageCircle, DollarSign, TrendingUp, Target } from 'lucide-react'
import Link from 'next/link'
import { supabaseAdmin as supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { UsersTable, LeadsTable } from '@/components/admin/AdminTables'
import { cookies } from 'next/headers'
import { verifyAdminCookieValue } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {

  const cookieStore = await cookies()
  const adminCookie = cookieStore.get('taxnorth_admin')?.value
  if (!(await verifyAdminCookieValue(adminCookie))) redirect('/admin/login')

  const [
    { count: totalUsers },
    { count: totalLeads },
    { count: totalConversations },
    { count: totalProspects },
    { data: users },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('conversations').select('*', { count: 'exact', head: true }),
    supabase.from('prospects').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('id, email, source, created_at, last_seen').order('created_at', { ascending: false }).limit(50),
    supabase.from('leads').select('id, full_name, email, phone, province, language, situation, status, created_at, professional_name').order('created_at', { ascending: false }).limit(50),
  ])

  const usersWithConversations = await Promise.all(
    (users || []).map(async (user) => {
      const { count } = await supabase.from('conversations').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
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
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">

          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-lantern-amber" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalUsers || 0}</p>
              <p className="text-deep-ink/50 text-xs">Users</p>
            </div>
          </div>

          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-maple-green" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalLeads || 0}</p>
              <p className="text-deep-ink/50 text-xs">Leads</p>
            </div>
          </div>

          <Link
            href="/admin/conversations"
            className="bg-white rounded-card p-5 flex items-center gap-3 hover:border-lantern-amber border-2 border-transparent transition-colors"
          >
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-lantern-amber" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalConversations || 0}</p>
              <p className="text-deep-ink/50 text-xs">Chats →</p>
            </div>
          </Link>

          <Link
            href="/admin/professionals"
            className="bg-white rounded-card p-5 flex items-center gap-3 hover:border-lantern-amber border-2 border-transparent transition-colors"
          >
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-maple-green" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">Pros</p>
              <p className="text-deep-ink/50 text-xs">Directory →</p>
            </div>
          </Link>

          <Link
            href="/admin/referrals"
            className="bg-white rounded-card p-5 flex items-center gap-3 hover:border-lantern-amber border-2 border-transparent transition-colors"
          >
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-lantern-amber" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">Refs</p>
              <p className="text-deep-ink/50 text-xs">Referrals →</p>
            </div>
          </Link>

          <Link
            href="/admin/prospects"
            className="bg-white rounded-card p-5 flex items-center gap-3 hover:border-lantern-amber border-2 border-transparent transition-colors"
          >
            <div className="w-10 h-10 bg-fog-gray rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-midnight-north" />
            </div>
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalProspects || 0}</p>
              <p className="text-deep-ink/50 text-xs">Prospects →</p>
            </div>
          </Link>

        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-card p-6 mb-8 overflow-x-auto">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-lantern-amber" />
            Registered Users ({totalUsers || 0})
          </h2>
          <UsersTable users={usersWithConversations} />
        </div>

        {/* LEADS TABLE */}
        <div className="bg-white rounded-card p-6 overflow-x-auto">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-maple-green" />
            Recent Leads ({totalLeads || 0})
          </h2>
          <LeadsTable leads={recentLeads || []} />
        </div>

      </div>
    </div>
  )
}