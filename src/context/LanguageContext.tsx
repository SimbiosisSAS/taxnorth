'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SupportedLanguage } from '@/lib/translations'

interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en')

  useEffect(() => {
    const saved = localStorage.getItem('taxnorth_language') as SupportedLanguage
    if (saved) setLanguageState(saved)
  }, [])

  function setLanguage(lang: SupportedLanguage) {
    setLanguageState(lang)
    localStorage.setItem('taxnorth_language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}