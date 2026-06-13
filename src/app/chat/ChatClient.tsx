'use client'

import { useState, useRef, useEffect } from 'react'
import { Flashlight, Send, Plus, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useLanguage } from '@/context/LanguageContext'
import { translations, languageNames, SupportedLanguage } from '@/lib/translations'
import { trackEvent, trackMetaStandard } from '@/lib/analytics'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const RTL_LANGUAGES: SupportedLanguage[] = ['ar', 'fa']

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default function ChatClient() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const isRTL = RTL_LANGUAGES.includes(language)
  const textDir = isRTL ? 'rtl' : 'ltr'

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('taxnorth_session')
      if (existing && uuidRegex.test(existing)) return existing
      const newId = generateSessionId()
      localStorage.setItem('taxnorth_session', newId)
      return newId
    }
    return generateSessionId()
  })
  const [showReferral, setShowReferral] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [captureEmail, setCaptureEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [savingEmail, setSavingEmail] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length >= 6) setShowReferral(true)
    if (messages.length === 4 && !emailSaved) setShowEmailCapture(true)
  }, [messages, emailSaved])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return
    const userMessage: Message = { role: 'user', content }

    if (messages.length === 0) {
      trackEvent('chat_started', { language })
    }

    const userMessageCount = messages.filter(m => m.role === 'user').length
    if (userMessageCount === 2) {
      trackEvent('chat_engaged', { language, message_count: 3 })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId, language }),
      })
      if (!response.ok) throw new Error('Failed')
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        assistantMessage += chunk
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantMessage }
          return updated
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleConnectClick() {
    trackEvent('connect_clicked', { language, message_count: messages.length })
    trackMetaStandard('InitiateCheckout', { value: 19.99, currency: 'CAD' })
  }

  async function saveEmail() {
    if (!captureEmail || savingEmail) return
    setSavingEmail(true)
    try {
      await fetch('/api/auth/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: captureEmail, sessionId }),
      })
      setEmailSaved(true)
      setShowEmailCapture(false)
      trackEvent('email_captured', { language })
    } catch (e) {
      console.error(e)
    } finally {
      setSavingEmail(false)
    }
  }

  return (
    <div className="flex h-screen bg-warm-white">

      {/* SIDEBAR */}
      <div className="hidden md:flex flex-col w-72 bg-midnight-north p-4">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Flashlight className="w-4 h-4 text-lantern-amber" />
          </div>
          <span className="font-heading font-bold text-white">
            TaxNorth<span className="text-xs">.ca</span>
          </span>
        </Link>
        <button className="w-full border border-white/20 text-white text-sm font-medium py-2 px-4 rounded-button hover:bg-white/10 transition-colors flex items-center gap-2 mb-6">
          <Plus className="w-4 h-4" />
          {t.newConversation}
        </button>
        <div className="flex-1">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Recent</p>
          <div className="space-y-1">
            {["Filing taxes as a newcomer", "What is a T4 slip?", "GST/HST credit eligibility"].map((item) => (
              <div key={item} className="text-white/60 text-sm py-2 px-3 rounded-lg hover:bg-white/10 cursor-pointer truncate">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-lantern-amber/20 text-lantern-amber text-xs font-medium px-3 py-1.5 rounded-full hover:bg-lantern-amber/30 transition-colors"
          >
            {language.toUpperCase()}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showLangMenu && (
            <div className="absolute bottom-8 left-0 bg-white rounded-card shadow-sm border border-fog-gray py-1 min-w-36 z-10">
              {(Object.keys(languageNames) as SupportedLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setShowLangMenu(false) }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-fog-gray transition-colors ${language === lang ? 'text-lantern-amber font-semibold' : 'text-deep-ink'}`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-fog-gray bg-white">
          <span className="text-deep-ink/50 text-sm hidden md:block">{t.disclaimer}</span>
          <div className="flex items-center gap-3 ml-auto">
            <div className="relative md:hidden">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 text-xs font-medium text-deep-ink/60 px-2 py-1 rounded border border-fog-gray"
              >
                {language.toUpperCase()} <ChevronDown className="w-3 h-3" />
              </button>
              {showLangMenu && (
                <div className="absolute top-8 right-0 bg-white rounded-card shadow-sm border border-fog-gray py-1 min-w-36 z-10">
                  {(Object.keys(languageNames) as SupportedLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setShowLangMenu(false) }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-fog-gray transition-colors ${language === lang ? 'text-lantern-amber font-semibold' : 'text-deep-ink'}`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/connect"
              onClick={handleConnectClick}
              className="text-maple-green border border-maple-green text-xs font-semibold px-4 py-2.5 rounded-button hover:bg-maple-green hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              {t.connectPro}
            </Link>
          </div>
        </div>

        {/* REFERRAL BANNER */}
        {showReferral && (
          <div className="flex items-center justify-between px-6 py-3 bg-maple-green/10 border-l-4 border-maple-green">
            <p className="text-deep-ink text-sm font-medium" dir={textDir}>{t.referralText}</p>
            <div className="flex items-center gap-3">
              <Link
                href="/connect"
                onClick={handleConnectClick}
                className="bg-maple-green text-white text-xs font-semibold px-3 py-1.5 rounded-button hover:opacity-90 transition-opacity"
              >
                {t.referralButton}
              </Link>
              <button onClick={() => setShowReferral(false)}>
                <X className="w-4 h-4 text-deep-ink/40 hover:text-deep-ink transition-colors" />
              </button>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto">

            {/* WELCOME STATE */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-96 text-center" dir={textDir}>
                <div className="w-16 h-16 bg-midnight-north rounded-2xl flex items-center justify-center mb-4">
                  <Flashlight className="w-8 h-8 text-lantern-amber" />
                </div>
                <h2 className="font-heading font-bold text-midnight-north text-2xl mb-2">
                  {t.welcome}
                </h2>
                <p className="text-deep-ink/60 mb-8">{t.welcomeSub}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {t.suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="bg-fog-gray text-deep-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-fog-gray/70 transition-colors"
                      dir={textDir}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES LIST */}
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-midnight-north rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Flashlight className="w-4 h-4 text-lantern-amber" />
                    </div>
                  )}
                  <div
                    dir={textDir}
                    className={`max-w-lg px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-midnight-north text-white rounded-chat rounded-br-sm'
                        : 'bg-fog-gray text-deep-ink rounded-chat rounded-tl-sm'
                    }`}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                    {message.role === 'assistant' && message.content === '' && (
                      <span className="inline-block w-2 h-4 bg-deep-ink/40 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Mobile sticky CTA */}
        <div className="md:hidden px-6 py-2 bg-white border-t border-fog-gray">
          <Link
            href="/connect"
            onClick={handleConnectClick}
            className="w-full flex items-center justify-center gap-2 bg-maple-green text-white font-semibold py-3 rounded-button text-sm hover:opacity-90 transition-opacity"
          >
            Connect with a licensed tax professional →
          </Link>
        </div>

        {/* EMAIL CAPTURE */}
        {showEmailCapture && !emailSaved && (
          <div className="px-6 py-3 bg-midnight-north/5 border-t border-fog-gray">
            <div className="max-w-2xl mx-auto">
              <p className="text-deep-ink font-medium text-sm mb-2">
                💾 Save this conversation and get a reminder next tax season?
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={captureEmail}
                  onChange={(e) => setCaptureEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEmail()}
                  placeholder="your@email.com"
                  className="flex-1 border border-fog-gray rounded-button px-3 py-2 text-sm text-deep-ink outline-none focus:border-lantern-amber transition-colors placeholder:text-deep-ink/40"
                />
                <button
                  onClick={saveEmail}
                  disabled={savingEmail || !captureEmail}
                  className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  {savingEmail ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setShowEmailCapture(false)}
                  className="text-deep-ink/40 text-sm px-2 hover:text-deep-ink transition-colors"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INPUT */}
        <div className="border-t border-fog-gray bg-white px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 border border-fog-gray rounded-button px-4 py-2.5 focus-within:border-lantern-amber transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder={t.placeholder}
                dir={textDir}
                className={`flex-1 bg-transparent text-deep-ink text-sm outline-none placeholder:text-deep-ink/40 ${isRTL ? 'text-right' : 'text-left'}`}
                disabled={isLoading}
              />
              <span className="text-xs font-medium text-deep-ink/40 bg-fog-gray px-2 py-0.5 rounded-full">
                {language.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 bg-lantern-amber rounded-button flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Send className="w-4 h-4 text-midnight-north" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}