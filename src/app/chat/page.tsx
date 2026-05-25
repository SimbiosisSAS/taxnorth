export const metadata = {
  title: 'Free Tax Help for Newcomers to Canada — TaxNorth.ca',
  description: 'Ask any Canadian tax question in your language. Get instant answers about T4 slips, GST/HST credits, filing deadlines, and more. Free AI tax guide for newcomers.',
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Flashlight, Send, Plus, X } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  "Do I need to file taxes in Canada?",
  "What is a T4 form?",
  "Am I eligible for any tax credits?"
]

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => generateSessionId())
  const [showReferral, setShowReferral] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length >= 6) setShowReferral(true)
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId }),
      })

      if (!response.ok) throw new Error('Failed to send message')

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
          updated[updated.length - 1] = {
            role: 'assistant',
            content: assistantMessage
          }
          return updated
        })
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
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
          New conversation
        </button>
        <div className="flex-1">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3">
            Recent
          </p>
          <div className="space-y-1">
            {["Filing taxes as a newcomer", "What is a T4 slip?", "GST/HST credit eligibility"].map((item) => (
              <div key={item} className="text-white/60 text-sm py-2 px-3 rounded-lg hover:bg-white/10 cursor-pointer truncate">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <span className="inline-flex items-center gap-1 bg-lantern-amber/20 text-lantern-amber text-xs font-medium px-2 py-1 rounded-full">
            EN
          </span>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-fog-gray bg-white">
          <span className="text-deep-ink/50 text-sm">
            Educational guidance only — not professional tax advice
          </span>
          <Link
            href="/connect"
            className="text-maple-green border border-maple-green text-xs font-semibold px-3 py-1.5 rounded-button hover:bg-maple-green hover:text-white transition-colors"
          >
            Connect with a Pro
          </Link>
        </div>

        {/* REFERRAL BANNER */}
        {showReferral && (
          <div className="flex items-center justify-between px-6 py-3 bg-maple-green/10 border-l-4 border-maple-green">
            <p className="text-deep-ink text-sm font-medium">
              Need a licensed tax professional? We can connect you.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/connect"
                className="bg-maple-green text-white text-xs font-semibold px-3 py-1.5 rounded-button hover:opacity-90 transition-opacity"
              >
                Connect me →
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
              <div className="flex flex-col items-center justify-center min-h-96 text-center">
                <div className="w-16 h-16 bg-midnight-north rounded-2xl flex items-center justify-center mb-4">
                  <Flashlight className="w-8 h-8 text-lantern-amber" />
                </div>
                <h2 className="font-heading font-bold text-midnight-north text-2xl mb-2">
                  Hi, I'm TaxNorth.
                </h2>
                <p className="text-deep-ink/60 mb-8">
                  Ask me anything about Canadian taxes — in any language.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="bg-fog-gray text-deep-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-fog-gray/70 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE BUBBLES */}
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
                  <div className={`max-w-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-midnight-north text-white rounded-chat rounded-br-sm'
                      : 'bg-fog-gray text-deep-ink rounded-chat rounded-tl-sm'
                  }`}>
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

        {/* INPUT */}
        <div className="border-t border-fog-gray bg-white px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 border border-fog-gray rounded-button px-4 py-2.5 focus-within:border-lantern-amber transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder="Ask your tax question..."
                className="flex-1 bg-transparent text-deep-ink text-sm outline-none placeholder:text-deep-ink/40"
                disabled={isLoading}
              />
              <span className="text-xs font-medium text-deep-ink/40 bg-fog-gray px-2 py-0.5 rounded-full">
                EN
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