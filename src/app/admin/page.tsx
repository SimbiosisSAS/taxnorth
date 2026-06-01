import { Flashlight, Users, MessageCircle, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { UsersTable, LeadsTable } from '@/components/admin/AdminTables'

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
  if (key !== process.env.ADMIN_KEY) redirect('/')

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
        <div className="grid grid-cols-4 gap-6 mb-10">
  <div className="bg-white rounded-card p-6 flex items-center gap-4">
    <div className="w-12 h-12 bg-fog-gray rounded-xl flex items-center justify-center">
      <Users className="w-6 h-6 text-lantern-amber" />
    </div>
    <div>
      <p className="font-heading font-bold text-midnight-north text-3xl">{totalUsers || 0}</p>
      <p className="text-deep-ink/50 text-sm">Registered users</p>
    </div>
  </div>
  <div className="bg-white rounded-card p-6 flex items-center gap-4">
    <div className="w-12 h-12 bg-fog-gray rounded-xl flex items-center justify-center">
      <DollarSign className="w-6 h-6 text-maple-green" />
    </div>
    <div>
      <p className="font-heading font-bold text-midnight-north text-3xl">{totalLeads || 0}</p>
      <p className="text-deep-ink/50 text-sm">Total leads</p>
    </div>
  </div>
  <Link
    href={`/admin/conversations?key=${key}`}
    className="bg-white rounded-card p-6 flex items-center gap-4 hover:border-lantern-amber border-2 border-transparent transition-colors"
  >
    <div className="w-12 h-12 bg-fog-gray rounded-xl flex items-center justify-center">
      <MessageCircle className="w-6 h-6 text-lantern-amber" />
    </div>
    <div>
      <p className="font-heading font-bold text-midnight-north text-3xl">{totalConversations || 0}</p>
      <p className="text-deep-ink/50 text-sm">Conversations →</p>
    </div>
  </Link>
  <Link
    href={`/admin/professionals?key=${key}`}
    className="bg-white rounded-card p-6 flex items-center gap-4 hover:border-lantern-amber border-2 border-transparent transition-colors"
  >
    <div className="w-12 h-12 bg-fog-gray rounded-xl flex items-center justify-center">
      <Users className="w-6 h-6 text-maple-green" />
    </div>
    <div>
      <p className="font-heading font-bold text-midnight-north text-3xl">Pros →</p>
      <p className="text-deep-ink/50 text-sm">Manage directory</p>
    </div>
  </Link>
</div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-card p-6 mb-8 overflow-x-auto">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-lantern-amber" />
            Registered Users ({totalUsers || 0})
          </h2>
          <UsersTable users={usersWithConversations} adminKey={key || ''} />
        </div>

        {/* LEADS TABLE */}
        <div className="bg-white rounded-card p-6 overflow-x-auto">
          <h2 className="font-heading font-bold text-midnight-north text-xl mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-maple-green" />
            Recent Leads ({totalLeads || 0})
          </h2>
          <LeadsTable leads={recentLeads || []} adminKey={key || ''} />
        </div>

      </div>
    </div>
  )
}