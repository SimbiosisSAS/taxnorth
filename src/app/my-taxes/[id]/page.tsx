import { Flashlight, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  const userId = cookieStore.get('taxnorth_user_id')?.value

  if (!userId) redirect('/chat')

  const { data: conversation } = await supabase
    .from('conversations')
    .select('id, created_at, user_id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (!conversation) redirect('/my-taxes')

  const { data: messages } = await supabase
    .from('messages')
    .select('role, content, created_at')
    .eq('conversation_id', id)
    .order('created_at', { ascending: true })

  return (
    <div className="min-h-screen bg-warm-white">
      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/my-taxes"
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to my account
        </Link>

        <h1 className="font-heading font-bold text-midnight-north text-2xl mb-2">
          Conversation
        </h1>
        <p className="text-deep-ink/50 text-sm mb-8">
          {new Date(conversation.created_at).toLocaleDateString('en-CA', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>

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
                  : 'bg-fog-gray text-deep-ink'
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-fog-gray rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-deep-ink/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
          >
            Continue in chat →
          </Link>
        </div>
      </div>
    </div>
  )
}