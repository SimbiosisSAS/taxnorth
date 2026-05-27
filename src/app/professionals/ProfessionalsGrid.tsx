'use client'

import { useState } from 'react'
import { MapPin, Languages, Star, ChevronRight, Navigation, X, Lock } from 'lucide-react'
import Link from 'next/link'

const PROVINCES = [
  'All Provinces', 'Alberta', 'British Columbia', 'Manitoba',
  'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia',
  'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
]

const LANGUAGES = [
  'All Languages', 'English', 'French', 'Spanish',
  'Mandarin', 'Punjabi', 'Arabic', 'Romanian'
]

interface Professional {
  id: string
  name: string
  firm_name: string
  province: string
  city: string
  languages: string[]
  specialties: string[]
  photo_url: string
  bio: string
  is_verified: boolean
  rating: number
  review_count: number
  slug: string
}

export default function ProfessionalsGrid({ professionals }: { professionals: Professional[] }) {
  const [province, setProvince] = useState('All Provinces')
  const [language, setLanguage] = useState('All Languages')
  const [locating, setLocating] = useState(false)
  const [locationLabel, setLocationLabel] = useState('')

  const filtered = professionals.filter(pro => {
    const matchProvince = province === 'All Provinces' || pro.province === province
    const matchLanguage = language === 'All Languages' || pro.languages.includes(language)
    return matchProvince && matchLanguage
  })

  async function findClosest() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        let detectedProvince = 'All Provinces'
        if (latitude >= 49 && latitude <= 60 && longitude >= -120 && longitude <= -110) detectedProvince = 'Alberta'
        else if (latitude >= 43.5 && latitude <= 56 && longitude >= -95 && longitude <= -74) detectedProvince = 'Ontario'
        else if (latitude >= 49 && latitude <= 60 && longitude >= -139 && longitude <= -114) detectedProvince = 'British Columbia'
        else if (latitude >= 45 && latitude <= 62.6 && longitude >= -79.8 && longitude <= -57) detectedProvince = 'Quebec'
        setProvince(detectedProvince)
        setLocationLabel(detectedProvince !== 'All Provinces' ? `Near you — ${detectedProvince}` : 'Location detected')
        setLocating(false)
      },
      () => setLocating(false)
    )
  }

  return (
    <div>
      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <select
          value={province}
          onChange={(e) => { setProvince(e.target.value); setLocationLabel('') }}
          className="border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink bg-white focus:border-lantern-amber outline-none"
        >
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink bg-white focus:border-lantern-amber outline-none"
        >
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        {locationLabel ? (
          <div className="flex items-center gap-2 bg-lantern-amber/10 text-midnight-north text-sm font-medium px-4 py-2.5 rounded-button border border-lantern-amber/30">
            <Navigation className="w-4 h-4 text-lantern-amber" />
            {locationLabel}
            <button onClick={() => { setProvince('All Provinces'); setLocationLabel('') }}>
              <X className="w-3.5 h-3.5 text-deep-ink/40 hover:text-deep-ink" />
            </button>
          </div>
        ) : (
          <button
            onClick={findClosest}
            disabled={locating}
            className="flex items-center gap-2 border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink/70 bg-white hover:border-lantern-amber transition-colors disabled:opacity-50"
          >
            <Navigation className="w-4 h-4" />
            {locating ? 'Locating...' : 'Closest to you'}
          </button>
        )}

        <span className="text-deep-ink/40 text-sm ml-auto">
          {filtered.length} {filtered.length === 1 ? 'professional' : 'professionals'}
        </span>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-deep-ink/50 mb-4">No professionals found for this selection.</p>
          <button
            onClick={() => { setProvince('All Provinces'); setLanguage('All Languages'); setLocationLabel('') }}
            className="text-lantern-amber font-medium text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pro) => (
            <div key={pro.id} className="relative bg-white border border-fog-gray rounded-card overflow-hidden group">

              {/* BLURRED CONTENT */}
              <div className="p-6 filter blur-sm select-none pointer-events-none">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-fog-gray rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-heading font-bold text-midnight-north text-xl">
                      {pro.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading font-semibold text-midnight-north truncate">
                        {pro.name}
                      </h2>
                      {pro.is_verified && <Star className="w-4 h-4 text-lantern-amber fill-lantern-amber flex-shrink-0" />}
                    </div>
                    {pro.firm_name && <p className="text-deep-ink/50 text-xs truncate">{pro.firm_name}</p>}
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-deep-ink/40" />
                      <span className="text-deep-ink/50 text-xs">{pro.city ? `${pro.city}, ` : ''}{pro.province}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3 flex-wrap">
                  <Languages className="w-3 h-3 text-deep-ink/40" />
                  {pro.languages.slice(0, 3).map((lang: string) => (
                    <span key={lang} className="text-xs bg-fog-gray text-deep-ink/70 px-2 py-0.5 rounded-full">{lang}</span>
                  ))}
                </div>
                {pro.bio && (
                  <p className="text-deep-ink/60 text-sm leading-relaxed mb-4 line-clamp-2">{pro.bio}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-fog-gray">
                  <span className="text-xs text-deep-ink/40">Verified professional</span>
                  <span className="text-lantern-amber font-semibold text-sm">Connect $19.99</span>
                </div>
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="text-center px-6">
                  <div className="w-12 h-12 bg-midnight-north rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-lantern-amber" />
                  </div>
                  <p className="font-heading font-semibold text-midnight-north text-sm mb-1">
                    {pro.city ? `${pro.city}, ` : ''}{pro.province}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {pro.languages.slice(0, 3).map((lang: string) => (
                      <span key={lang} className="text-xs bg-fog-gray text-deep-ink/70 px-2 py-0.5 rounded-full">{lang}</span>
                    ))}
                  </div>
                  {pro.is_verified && (
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 text-lantern-amber fill-lantern-amber" />
                      <span className="text-lantern-amber text-xs font-semibold">TaxNorth Verified</span>
                    </div>
                  )}
                  <Link
                    href={`/connect?pro=${pro.slug || pro.id}&name=${encodeURIComponent(pro.name)}&firm=${encodeURIComponent(pro.firm_name || '')}`}
                    className="inline-flex items-center gap-1.5 bg-lantern-amber text-midnight-north font-semibold text-sm px-5 py-2.5 rounded-button hover:opacity-90 transition-opacity"
                  >
                    Connect $19.99 <ChevronRight className="w-4 h-4" />
                  </Link>
                  <p className="text-deep-ink/40 text-xs mt-2">Full profile revealed after payment</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}