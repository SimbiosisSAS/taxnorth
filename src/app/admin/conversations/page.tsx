import { Flashlight, ArrowLeft, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { ConversationsTable } from '@/components/admin/AdminTables'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const params = await searchParams
  if (params.key !== process.env.ADMIN_KEY) redirect('/')

  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, created_at, session_id, language, user_id')
    .order('created_at', { ascending: false })
    .limit(100)

  const conversationsWithData = await Promise.all(
    (conversations || []).map(async (conv) => {
      const { data: messages } = await supabase
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conv.id)
        .order('created_at', { ascending: true })
        .limit(1)
      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conv.id)
      return {
        ...conv,
        firstMessage: messages?.[0]?.content?.substring(0, 80) || 'No messages',
        messageCount: count || 0
      }
    })
  )

  return (
    <div className="min-h-screen bg-fog-gray">
      <nav className="bg-midnight-north px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/admin?key=${params.key}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth <span className="text-lantern-amber text-sm">Admin</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link
          href={`/admin?key=${params.key}`}
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="font-heading font-bold text-midnight-north text-2xl mb-8 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-lantern-amber" />
          All Conversations ({conversations?.length || 0})
        </h1>

        <div className="bg-white rounded-card p-6 overflow-x-auto">
          <ConversationsTable
            conversations={conversationsWithData}
            adminKey={params.key || ''}
          />
        </div>
      </div>
    </div>
  )
}