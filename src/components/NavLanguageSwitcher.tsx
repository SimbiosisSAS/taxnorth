'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { languageNames, SupportedLanguage } from '@/lib/translations'

export default function NavLanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-deep-ink cursor-pointer hover:text-midnight-north transition-colors"
      >
        <span>{language.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-white rounded-card shadow-sm border border-fog-gray py-1 min-w-36 z-50">
          {(Object.keys(languageNames) as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-fog-gray transition-colors ${
                language === lang ? 'text-lantern-amber font-semibold' : 'text-deep-ink'
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}