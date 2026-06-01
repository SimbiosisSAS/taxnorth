import { Flashlight, ArrowLeft, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

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

  const thStyle = { textAlign: 'left' as const, padding: '10px 12px', fontSize: '13px', color: 'white', backgroundColor: '#1A2744' }
  const tdStyle = { padding: '10px 12px', fontSize: '13px' }

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

        <div className="bg-white rounded-card overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>First message</th>
                <th style={thStyle}>Messages</th>
                <th style={thStyle}>Language</th>
                <th style={thStyle}>Has account</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>View</th>
              </tr>
            </thead>
            <tbody>
              {conversationsWithData.map((conv, i) => (
                <tr key={conv.id} style={{ backgroundColor: i % 2 === 0 ? '#FAF8F5' : 'white' }}>
                  <td style={{ ...tdStyle, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#1A2744' }}>
                    {conv.firstMessage}
                  </td>
                  <td style={{ ...tdStyle, color: '#1A2744', fontWeight: 600 }}>{conv.messageCount}</td>
                  <td style={{ ...tdStyle, color: '#666' }}>{conv.language || 'en'}</td>
                  <td style={tdStyle}>
                    <span style={{
                      background: conv.user_id ? '#2E7D5E20' : '#EEF1F7',
                      color: conv.user_id ? '#2E7D5E' : '#999',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600
                    }}>
                      {conv.user_id ? 'Yes' : 'Anonymous'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#666', fontSize: '12px' }}>
                    {new Date(conv.created_at).toLocaleDateString('en-CA')}
                  </td>
                  <td style={tdStyle}>
                    <Link
                      href={`/admin/conversations/${conv.id}?key=${params.key}`}
                      style={{ color: '#F4A332', fontSize: '13px', fontWeight: 600 }}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}