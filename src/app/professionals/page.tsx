import { Flashlight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import ProfessionalsGrid from './ProfessionalsGrid'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Find a Tax Professional — TaxNorth.ca',
  description: 'Browse verified tax professionals in Canada who specialize in newcomers. Filter by province, language, and location.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getProfessionals() {
  const { data } = await supabase
    .from('professionals')
    .select('id, name, firm_name, province, city, languages, specialties, photo_url, bio, is_verified, rating, review_count, slug')
    .eq('subscription_status', 'active')
    .order('is_verified', { ascending: false })
    .order('rating', { ascending: false })
  return data || []
}

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals()

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-warm-white border-b border-fog-gray">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north text-lg">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
          <Link
            href="/chat"
            className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
          >
            Ask TaxNorth free
          </Link>
        </div>
      </nav>

      <section className="bg-midnight-north py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4">
            Find your tax professional.
          </h1>
          <p className="text-white/70 text-lg">
            Browse verified professionals who specialize in newcomers to Canada.
            Filter by province and language. Connect for $19.99.
          </p>
        </div>
      </section>

      <div className="bg-lantern-amber px-6 py-3 text-center">
        <p className="text-midnight-north font-semibold text-sm">
          Founding offer — first 100 clients this month connect for{' '}
          <span className="line-through opacity-60">$49.99</span>{' '}
          <strong>$19.99</strong>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <ProfessionalsGrid professionals={professionals} />
      </div>
    </div>
  )
}