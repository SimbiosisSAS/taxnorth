import { Flashlight, MessageCircle, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'My TaxNorth Account',
  description: 'Your tax conversation history and account details.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function MyTaxesPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('taxnorth_user_id')?.value

  if (!userId) {
    redirect('/chat')
  }

  const { data: user } = await supabase
    .from('users')
    .select('email, created_at')
    .eq('id', userId)
    .single()

  if (!user) redirect('/chat')

  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, created_at, session_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10)

  const conversationsWithMessages = await Promise.all(
    (conversations || []).map(async (conv) => {
      const { data: messages } = await supabase
        .from('messages')
        .select('content, role')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: true })
        .limit(1)
      return { ...conv, firstMessage: messages?.[0]?.content || 'Conversation' }
    })
  )

  return (
    <div className="min-h-screen bg-warm-white">
      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
          <span className="text-deep-ink/50 text-sm">{user.email}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-heading font-bold text-midnight-north text-3xl mb-2">
            Your TaxNorth account
          </h1>
          <p className="text-deep-ink/60">
            Your conversation history is saved here. Come back every tax season.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-midnight-north rounded-card p-6 text-center">
            <p className="font-heading font-bold text-lantern-amber text-4xl mb-1">
              {conversationsWithMessages.length}
            </p>
            <p className="text-white/60 text-sm">Conversations saved</p>
          </div>
          <div className="bg-fog-gray rounded-card p-6 text-center">
            <p className="font-heading font-bold text-midnight-north text-4xl mb-1">
              {new Date(user.created_at).getFullYear()}
            </p>
            <p className="text-deep-ink/50 text-sm">Member since</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-midnight-north text-xl">
              Your conversations
            </h2>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
            >
              New conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {conversationsWithMessages.length === 0 ? (
            <div className="bg-fog-gray rounded-card p-8 text-center">
              <MessageCircle className="w-8 h-8 text-deep-ink/30 mx-auto mb-3" />
              <p className="text-deep-ink/50 mb-4">No conversations yet.</p>
              <Link href="/chat" className="text-lantern-amber font-medium text-sm">
                Start your first conversation →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {conversationsWithMessages.map((conv) => (
                <Link
  key={conv.id}
  href={`/my-taxes/${conv.id}`}
  className="bg-white border border-fog-gray rounded-card p-5 flex items-center justify-between hover:border-lantern-amber transition-colors group"
>
  <div className="flex items-start gap-3 flex-1 min-w-0">
    <div className="w-8 h-8 bg-fog-gray rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
      <MessageCircle className="w-4 h-4 text-deep-ink/40" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-deep-ink font-medium text-sm truncate mb-1">
        {conv.firstMessage}
      </p>
      <div className="flex items-center gap-1 text-deep-ink/40 text-xs">
        <Clock className="w-3 h-3" />
        {new Date(conv.created_at).toLocaleDateString('en-CA', {
          year: 'numeric', month: 'long', day: 'numeric'
        })}
      </div>
    </div>
  </div>
  <ArrowRight className="w-4 h-4 text-lantern-amber opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
</Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-midnight-north rounded-card p-6 text-center">
          <p className="text-white font-heading font-semibold mb-1">
            Tax season reminder
          </p>
          <p className="text-white/60 text-sm">
            We'll email you at {user.email} before next tax season with updates specific to your situation.
          </p>
        </div>
      </div>
    </div>
  )
}