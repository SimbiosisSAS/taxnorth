import { Flashlight, MapPin, Languages, Star, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Find a Tax Professional — TaxNorth.ca',
  description: 'Browse verified tax professionals in Canada who specialize in newcomers. Filter by province, language, and specialty.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const PROVINCES = [
  'All Provinces', 'Alberta', 'British Columbia', 'Manitoba',
  'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia',
  'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
]

const LANGUAGES = [
  'All Languages', 'English', 'French', 'Spanish',
  'Mandarin', 'Punjabi', 'Arabic'
]

async function getProfessionals() {
  const { data } = await supabase
    .from('professionals')
    .select('id, name, firm_name, province, city, languages, specialties, photo_url, bio, is_verified, subscription_tier, rating, review_count, slug')
    .eq('subscription_status', 'active')
    .order('is_verified', { ascending: false })
    .order('rating', { ascending: false })

  return data || []
}

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals()

  return (
    <div>
      {/* NAVBAR */}
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

      {/* HERO */}
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

      {/* PROMO BANNER */}
      <div className="bg-lantern-amber px-6 py-3 text-center">
        <p className="text-midnight-north font-semibold text-sm">
          🎉 Founding offer — first 100 clients this month connect for{' '}
          <span className="line-through opacity-60">$49.99</span>{' '}
          <strong>$19.99</strong>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {professionals.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-fog-gray rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flashlight className="w-8 h-8 text-deep-ink/30" />
            </div>
            <h2 className="font-heading font-bold text-midnight-north text-2xl mb-3">
              Professionals coming soon.
            </h2>
            <p className="text-deep-ink/60 mb-8 max-w-md mx-auto">
              We are onboarding our first professionals in Alberta.
              In the meantime, let TaxNorth match you directly.
            </p>
            <Link
              href="/connect"
              className="inline-block bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
            >
              Get matched by TaxNorth →
            </Link>
          </div>
        ) : (
          /* DIRECTORY GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((pro) => (
              <Link
                key={pro.id}
                href={`/professionals/${pro.slug || pro.id}`}
                className="bg-white border border-fog-gray rounded-card p-6 hover:border-lantern-amber hover:shadow-sm transition-all group"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-fog-gray rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {pro.photo_url ? (
                      <img src={pro.photo_url} alt={pro.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-heading font-bold text-midnight-north text-xl">
                        {pro.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading font-semibold text-midnight-north truncate">
                        {pro.name}
                      </h2>
                      {pro.is_verified && (
                        <Star className="w-4 h-4 text-lantern-amber fill-lantern-amber flex-shrink-0" />
                      )}
                    </div>
                    {pro.firm_name && (
                      <p className="text-deep-ink/50 text-xs truncate">{pro.firm_name}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-deep-ink/40" />
                      <span className="text-deep-ink/50 text-xs">
                        {pro.city ? `${pro.city}, ` : ''}{pro.province}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  <Languages className="w-3 h-3 text-deep-ink/40" />
                  {pro.languages.slice(0, 3).map((lang: string) => (
                    <span key={lang} className="text-xs bg-fog-gray text-deep-ink/70 px-2 py-0.5 rounded-full">
                      {lang}
                    </span>
                  ))}
                  {pro.languages.length > 3 && (
                    <span className="text-xs text-deep-ink/40">+{pro.languages.length - 3}</span>
                  )}
                </div>

                {/* Bio excerpt */}
                {pro.bio && (
                  <p className="text-deep-ink/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {pro.bio}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-fog-gray">
                  <div>
                    {pro.review_count > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-lantern-amber fill-lantern-amber" />
                        <span className="text-sm font-medium text-midnight-north">{pro.rating}</span>
                        <span className="text-xs text-deep-ink/40">({pro.review_count})</span>
                      </div>
                    ) : (
                      <span className="text-xs text-deep-ink/40">New to TaxNorth</span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-lantern-amber font-semibold text-sm group-hover:gap-2 transition-all">
                    Connect $19.99 <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}