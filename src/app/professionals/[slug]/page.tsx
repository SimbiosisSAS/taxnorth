import { Flashlight, MapPin, Languages, Star, Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProfessionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: pro } = await supabase
    .from('professionals')
    .select('id, name, firm_name, province, city, languages, specialties, photo_url, bio, is_verified, rating, review_count')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq('subscription_status', 'active')
    .single()

  if (!pro) notFound()

  return (
    <div className="min-h-screen bg-warm-white">
      {/* NAVBAR */}
      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        <Link
          href="/professionals"
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          All professionals
        </Link>

        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT — Profile card */}
          <div className="md:col-span-1">
            <div className="bg-white border border-fog-gray rounded-card p-6 sticky top-24">
              {/* Photo */}
              <div className="w-20 h-20 bg-fog-gray rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {pro.photo_url ? (
                  <img src={pro.photo_url} alt={pro.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-heading font-bold text-midnight-north text-3xl">
                    {pro.name.charAt(0)}
                  </span>
                )}
              </div>

              <h1 className="font-heading font-bold text-midnight-north text-xl text-center mb-1">
                {pro.name}
              </h1>

              {pro.is_verified && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-lantern-amber fill-lantern-amber" />
                  <span className="text-lantern-amber text-xs font-semibold">TaxNorth Verified</span>
                </div>
              )}

              {pro.firm_name && (
                <p className="text-deep-ink/50 text-sm text-center mb-3">{pro.firm_name}</p>
              )}

              <div className="flex items-center justify-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-deep-ink/40" />
                <span className="text-deep-ink/60 text-sm">
                  {pro.city ? `${pro.city}, ` : ''}{pro.province}
                </span>
              </div>

              {pro.review_count > 0 && (
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-lantern-amber fill-lantern-amber" />
                  <span className="font-medium text-midnight-north">{pro.rating}</span>
                  <span className="text-deep-ink/40 text-sm">({pro.review_count} reviews)</span>
                </div>
              )}

              {/* LOCKED CONTACT INFO */}
              <div className="bg-fog-gray rounded-button p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-deep-ink/40" />
                  <span className="text-deep-ink/50 text-xs font-medium uppercase tracking-wide">
                    Contact info
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-deep-ink/10 rounded-full w-3/4" />
                  <div className="h-3 bg-deep-ink/10 rounded-full w-1/2" />
                  <div className="h-3 bg-deep-ink/10 rounded-full w-2/3" />
                </div>
                <p className="text-deep-ink/40 text-xs mt-2 text-center">
                  Unlocked after connecting
                </p>
              </div>

              {/* CONNECT CTA */}
              <Link
                href={`/connect?professional=${pro.id}&name=${encodeURIComponent(pro.name)}`}
                className="w-full flex items-center justify-center bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button hover:opacity-90 transition-opacity"
              >
                Connect — $19.99
              </Link>

              <p className="text-deep-ink/40 text-xs text-center mt-2">
                Satisfaction guarantee — re-match if needed
              </p>
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="md:col-span-2 space-y-8">

            {/* Bio */}
            {pro.bio && (
              <div>
                <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">About</h2>
                <p className="text-deep-ink leading-relaxed">{pro.bio}</p>
              </div>
            )}

            {/* Languages */}
            <div>
              <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
                <Languages className="w-5 h-5 inline mr-2 text-lantern-amber" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {pro.languages.map((lang: string) => (
                  <span key={lang} className="bg-fog-gray text-deep-ink px-3 py-1.5 rounded-full text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Specialties */}
            {pro.specialties && pro.specialties.length > 0 && (
              <div>
                <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
                  Specialties
                </h2>
                <div className="space-y-2">
                  {pro.specialties.map((spec: string) => (
                    <div key={spec} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-maple-green" />
                      <span className="text-deep-ink text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantee box */}
            <div className="bg-midnight-north rounded-card p-6">
              <h3 className="font-heading font-semibold text-white mb-2">
                TaxNorth Satisfaction Guarantee
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Pay $19.99 to connect. If for any reason it does not work out,
                contact us at hello@taxnorth.ca and we will match you with a
                different professional at no additional charge.
              </p>
              <Link
                href={`/connect?professional=${pro.id}&name=${encodeURIComponent(pro.name)}`}
                className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity text-sm"
              >
                Connect with {pro.name.split(' ')[0]} — $19.99
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}