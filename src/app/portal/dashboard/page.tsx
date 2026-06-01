import { Flashlight, Users, CheckCircle, Clock, XCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import PortalCRM from './PortalCRM'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function PortalDashboard() {
  const cookieStore = await cookies()
  const proId = cookieStore.get('taxnorth_pro_id')?.value
  if (!proId) redirect('/portal')

  const { data: professional } = await supabase
    .from('professionals')
    .select('name, firm_name, email, province, languages, portal_tier')
    .eq('id', proId)
    .single()

  if (!professional) redirect('/portal')

  const { data: leads } = await supabase
    .from('leads')
    .select('id, full_name, email, phone, province, language, situation, notes, created_at, professional_name')
    .eq('professional_name', professional.name)
    .order('created_at', { ascending: false })

  const { data: notes } = await supabase
    .from('accountant_notes')
    .select('lead_id, status, note')
    .eq('professional_email', professional.email)

  const notesMap = Object.fromEntries((notes || []).map(n => [n.lead_id, n]))

  const leadsWithStatus = (leads || []).map(lead => ({
    ...lead,
    status: notesMap[lead.id]?.status || 'new',
    note: notesMap[lead.id]?.note || ''
  }))

  const stats = {
    total: leadsWithStatus.length,
    new: leadsWithStatus.filter(l => l.status === 'new').length,
    contacted: leadsWithStatus.filter(l => l.status === 'contacted').length,
    completed: leadsWithStatus.filter(l => l.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Partner</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal/templates" className="text-white/60 text-sm hover:text-white transition-colors">
              Templates
            </Link>
            <span className="text-white/50 text-sm">{professional.email}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-midnight-north text-2xl mb-1">
            {professional.name}
          </h1>
          <p className="text-deep-ink/50">{professional.firm_name} · {professional.province}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total clients', value: stats.total, icon: <Users className="w-5 h-5 text-lantern-amber" />, color: 'bg-white' },
            { label: 'New', value: stats.new, icon: <Clock className="w-5 h-5 text-lantern-amber" />, color: 'bg-lantern-amber/10' },
            { label: 'Contacted', value: stats.contacted, icon: <Phone className="w-5 h-5 text-midnight-north" />, color: 'bg-fog-gray' },
            { label: 'Completed', value: stats.completed, icon: <CheckCircle className="w-5 h-5 text-maple-green" />, color: 'bg-maple-green/10' },
          ].map(stat => (
            <div key={stat.label} className={`${stat.color} rounded-card p-5 flex items-center gap-3`}>
              {stat.icon}
              <div>
                <p className="font-heading font-bold text-midnight-north text-2xl">{stat.value}</p>
                <p className="text-deep-ink/50 text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CRM */}
        <div className="bg-white rounded-card p-6">
          <h2 className="font-heading font-semibold text-midnight-north text-lg mb-6">
            Your TaxNorth clients
          </h2>
          <PortalCRM leads={leadsWithStatus} />
        </div>
      </div>
    </div>
  )
}