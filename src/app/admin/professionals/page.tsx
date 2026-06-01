import { Flashlight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import ProfessionalsManager from './ProfessionalsManager'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const params = await searchParams
  if (params.key !== process.env.ADMIN_KEY) redirect('/')

  const { data: professionals } = await supabase
    .from('professionals')
    .select('*')
    .order('created_at', { ascending: false })

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

        <h1 className="font-heading font-bold text-midnight-north text-2xl mb-8">
          Professionals Directory ({professionals?.length || 0})
        </h1>

        <ProfessionalsManager
          professionals={professionals || []}
          adminKey={params.key || ''}
        />
      </div>
    </div>
  )
}