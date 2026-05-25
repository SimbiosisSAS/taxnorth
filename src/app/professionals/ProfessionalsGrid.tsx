'use client'

import { useState, useEffect } from 'react'
import { MapPin, Languages, Star, ChevronRight, Navigation, X } from 'lucide-react'
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
      async (position) => {
        const { latitude, longitude } = position.coords
        // Determine province from coordinates (bounding boxes)
        let detectedProvince = 'All Provinces'
        if (latitude >= 49 && latitude <= 60 && longitude >= -120 && longitude <= -110) {
          detectedProvince = 'Alberta'
        } else if (latitude >= 48.3 && latitude <= 60 && longitude >= -139 && longitude <= -114) {
          detectedProvince = 'British Columbia'
        } else if (latitude >= 49 && latitude <= 53 && longitude >= -102 && longitude <= -95) {
          detectedProvince = 'Manitoba'
        } else if (latitude >= 43.5 && latitude <= 56 && longitude >= -95 && longitude <= -74) {
          detectedProvince = 'Ontario'
        } else if (latitude >= 45 && latitude <= 62.6 && longitude >= -79.8 && longitude <= -57) {
          detectedProvince = 'Quebec'
        } else if (latitude >= 49 && latitude <= 55 && longitude >= -110 && longitude <= -101) {
          detectedProvince = 'Saskatchewan'
        }
        setProvince(detectedProvince)
        setLocationLabel(detectedProvince !== 'All Provinces' ? `Near you — ${detectedProvince}` : 'Location detected')
        setLocating(false)
      },
      () => {
        setLocating(false)
      }
    )
  }

  function clearLocation() {
    setProvince('All Provinces')
    setLocationLabel('')
  }

  return (
    <div>
      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {/* Province */}
        <select
          value={province}
          onChange={(e) => { setProvince(e.target.value); setLocationLabel('') }}
          className="border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink bg-white focus:border-lantern-amber outline-none"
        >
          {PROVINCES.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Language */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink bg-white focus:border-lantern-amber outline-none"
        >
          {LANGUAGES.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        {/* Closest to you */}
        {locationLabel ? (
          <div className="flex items-center gap-2 bg-lantern-amber/10 text-midnight-north text-sm font-medium px-4 py-2.5 rounded-button border border-lantern-amber/30">
            <Navigation className="w-4 h-4 text-lantern-amber" />
            {locationLabel}
            <button onClick={clearLocation}>
              <X className="w-3.5 h-3.5 text-deep-ink/40 hover:text-deep-ink transition-colors" />
            </button>
          </div>
        ) : (
          <button
            onClick={findClosest}
            disabled={locating}
            className="flex items-center gap-2 border border-fog-gray rounded-button px-4 py-2.5 text-sm text-deep-ink/70 bg-white hover:border-lantern-amber hover:text-midnight-north transition-colors disabled:opacity-50"
          >
            <Navigation className="w-4 h-4" />
            {locating ? 'Locating...' : 'Closest to you'}
          </button>
        )}

        {/* Results count */}
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
            className="text-lantern-amber font-medium text-sm hover:opacity-80 transition-opacity"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pro) => (
            <Link
              key={pro.id}
              href={`/professionals/${pro.slug || pro.id}`}
              className="bg-white border border-fog-gray rounded-card p-6 hover:border-lantern-amber hover:shadow-sm transition-all group"
            >
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

              {pro.bio && (
                <p className="text-deep-ink/60 text-sm leading-relaxed mb-4 line-clamp-2">
                  {pro.bio}
                </p>
              )}

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
  )
}