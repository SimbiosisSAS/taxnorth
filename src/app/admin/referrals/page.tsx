import { Flashlight, ArrowLeft, TrendingUp, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import ReferralsManager from './ReferralsManager'

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
    .order('created_at', { ascending: false })

  const sourcesWithStats = await Promise.all(
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

  const totalConversations = sourcesWithStats.reduce((a, s) => a + s.conversations, 0)
  const totalLeads = sourcesWithStats.reduce((a, s) => a + s.leads, 0)

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

      <div className="max-w-5xl mx-auto px-6 py-10">
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
            <p className="text-deep-ink/50 text-sm">Manage distribution partners and track their performance</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-lantern-amber" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalConversations}</p>
              <p className="text-deep-ink/50 text-xs">Total referral conversations</p>
            </div>
          </div>
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <Users className="w-5 h-5 text-maple-green" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">{totalLeads}</p>
              <p className="text-deep-ink/50 text-xs">Total referral leads</p>
            </div>
          </div>
          <div className="bg-white rounded-card p-5 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-lantern-amber" />
            <div>
              <p className="font-heading font-bold text-midnight-north text-2xl">
                {sourcesWithStats.filter(s => s.is_active).length}
              </p>
              <p className="text-deep-ink/50 text-xs">Active partners</p>
            </div>
          </div>
        </div>

        <ReferralsManager
          sources={sourcesWithStats}
          adminKey={params.key || ''}
        />
      </div>
    </div>
  )
}