'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { languageNames, SupportedLanguage } from '@/lib/translations'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-deep-ink/70 hover:text-midnight-north transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium uppercase">{language}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-fog-gray rounded-xl shadow-lg z-50 py-2 max-h-72 overflow-y-auto">
          {(Object.entries(languageNames) as [SupportedLanguage, string][]).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-fog-gray transition-colors ${
                language === code ? 'text-midnight-north font-semibold' : 'text-deep-ink/70'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}