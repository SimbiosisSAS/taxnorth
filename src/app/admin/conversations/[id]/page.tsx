import { Flashlight, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import ReactMarkdown from 'react-markdown'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content, created_at')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  const { data: conversation } = await supabase
    .from('conversations')
    .select('created_at, language, session_id')
    .eq('id', id)
    .single()

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/admin/conversations" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Admin</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link
          href="/admin/conversations"
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to conversations
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-midnight-north text-2xl mb-1">
              Conversation
            </h1>
            <p className="text-deep-ink/50 text-sm">
              {conversation?.created_at ? new Date(conversation.created_at).toLocaleString('en-CA') : ''} · {messages?.length || 0} messages · Language: {conversation?.language || 'en'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {(messages || []).map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-midnight-north rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Flashlight className="w-4 h-4 text-lantern-amber" />
                </div>
              )}
              <div className={`max-w-lg px-4 py-3 text-sm leading-relaxed rounded-card ${
                msg.role === 'user'
                  ? 'bg-midnight-north text-white'
                  : 'bg-white text-deep-ink shadow-sm'
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                <p className="text-xs opacity-40 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString('en-CA')}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-fog-gray rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-deep-ink/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}