import { supabaseAdmin } from './supabase'
import { openrouter } from './openrouter'

export async function getRelevantContext(
  userMessage: string
): Promise<string> {
  try {
    // Generar embedding del mensaje del usuario
    const embeddingResponse = await openrouter.embeddings.create({
      model: 'openai/text-embedding-3-small',
      input: userMessage,
    })

    const queryEmbedding = embeddingResponse.data[0].embedding

    // Buscar chunks relevantes en Supabase
    const { data: results, error } = await supabaseAdmin.rpc(
      'search_knowledge_base',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 4,
      }
    )

    if (error || !results || results.length === 0) return ''

    // Formatear el contexto para el prompt
    const context = results
      .map((r: { source: string; content: string }) => 
        `Source: ${r.source}\n${r.content}`)
      .join('\n\n---\n\n')

    return context

  } catch (error) {
    console.error('RAG error:', error)
    return ''
  }
}