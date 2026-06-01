'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' },
]

interface Template {
  id: string
  title: string
  versions: Record<string, string>
}

export default function TemplatesCopy({ templates }: { templates: Template[] }) {
  const [activeLang, setActiveLang] = useState('en')
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      {/* Language selector */}
      <div className="flex gap-2 mb-6">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              activeLang === lang.code
                ? 'bg-midnight-north text-white'
                : 'bg-white border border-fog-gray text-deep-ink/60 hover:border-midnight-north'
            }`}
          >
            {lang.