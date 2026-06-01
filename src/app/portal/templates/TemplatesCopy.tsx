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
            {lang.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {templates.map(template => {
          const content = template.versions[activeLang] || template.versions['en']
          const copyId = `${template.id}-${activeLang}`
          return (
            <div key={template.id} className="bg-white rounded-card border border-fog-gray overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-fog-gray bg-fog-gray/30">
                <h3 className="font-heading font-semibold text-midnight-north text-sm">
                  {template.title}
                </h3>
                <button
                  onClick={() => copy(content, copyId)}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-button transition-colors bg-lantern-amber text-midnight-north hover:opacity-90"
                >
                  {copied === copyId
                    ? <><Check className="w-3.5 h-3.5" /> Copied!</>
                    : <><Copy className="w-3.5 h-3.5" /> Copy</>
                  }
                </button>
              </div>
              <pre className="p-5 text-sm text-deep-ink leading-relaxed whitespace-pre-wrap font-sans">
                {content}
              </pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}