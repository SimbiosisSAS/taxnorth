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
}import { supabaseAdmin } from './supabase'
import { openrouter } from './openrouter'

const SOURCE_LABELS: Record<string, string> = {
  'newcomers-guide': 'CRA — Newcomers to Canada Guide (canada.ca)',
  't4-explained': 'CRA — Understanding Your T4 Slip (canada.ca)',
  'filing-deadlines': 'CRA — Filing Deadlines (canada.ca)',
  'gst-hst-credit': 'CRA — GST/HST Credit (canada.ca)',
  'how-to-file': 'CRA — How to File Your Return (canada.ca)',
  'residency-status': 'CRA — Residency Status (canada.ca)',
  'rrsp-basics': 'CRA — RRSP Guide (canada.ca)',
  'tfsa-basics': 'CRA — TFSA Guide (canada.ca)',
  'canada-child-benefit': 'CRA — Canada Child Benefit (canada.ca)',
  'social-insurance-number': 'Service Canada — SIN (canada.ca)',
  'self-employment-taxes': 'CRA — Self-Employment Income (canada.ca)',
  'student-taxes': 'CRA — Students and Income Tax (canada.ca)',
  'my-cra-account': 'CRA — My Account Guide (canada.ca)',
  'medical-expenses': 'CRA — Medical Expense Credit (canada.ca)',
  'moving-expenses': 'CRA — Moving Expenses (canada.ca)',
  'rental-income': 'CRA — Rental Income (canada.ca)',
  'capital-gains': 'CRA — Capital Gains (canada.ca)',
  'employment-insurance': 'CRA — Employment Insurance (canada.ca)',
  'cpp-contributions': 'CRA — CPP Contributions (canada.ca)',
  'provincial-taxes': 'CRA — Provincial Taxes (canada.ca)',
  'ontario-trillium-benefit': 'CRA — Ontario Trillium Benefit (canada.ca)',
  'foreign-income': 'CRA — Foreign Income (canada.ca)',
  'direct-deposit-setup': 'CRA — Direct Deposit (canada.ca)',
  'owing-money-cra': 'CRA — Balance Owing (canada.ca)',
  'work-from-home': 'CRA — Work From Home Expenses (canada.ca)',
  'first-time-home-buyer': 'CRA — First-Time Home Buyer (canada.ca)',
  'notice-of-assessment': 'CRA — Notice of Assessment (canada.ca)',
  'tax-brackets-canada': 'CRA — Tax Rates and Brackets (canada.ca)',
  'unfiled-returns': 'CRA — Voluntary Disclosures Program (canada.ca)',
  'groceries-essentials-benefit-2026': 'CRA — Groceries and Essentials Benefit (canada.ca)',
  'hrblock-canada-services-2026': 'General Tax Information',
  'hrblock-canada-newcomers-2026': 'General Tax Information',
  'turbotax-canada-services-2026': 'General Tax Information',
  'tax-software-vs-professional-2026': 'General Tax Information',
}

export interface RAGResult {
  context: string
  sources: string[]
}

export async function getRelevantContext(
  userMessage: string
): Promise<RAGResult> {
  try {
    const embeddingResponse = await openrouter.embeddings.create({
      model: 'openai/text-embedding-3-small',
      input: userMessage,
    })

    const queryEmbedding = embeddingResponse.data[0].embedding

    const { data: results, error } = await supabaseAdmin.rpc(
      'search_knowledge_base',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 4,
      }
    )

    if (error || !results || results.length === 0) {
      return { context: '', sources: [] }
    }

    // Obtener fuentes únicas (excluir competidores de las citas)
    const uniqueSources = [...new Set(
      results
        .map((r: { source: string }) => r.source)
        .filter((s: string) => !s.includes('hrblock') && !s.includes('turbotax') && !s.includes('software-vs'))
    )]

    const sourceLabels = uniqueSources
      .map((s: string) => SOURCE_LABELS[s] || s)
      .filter(Boolean)

    const context = results
      .map((r: { source: string; content: string }) =>
        `Source: ${r.source}\n${r.content}`)
      .join('\n\n---\n\n')

    return { context, sources: sourceLabels }

  } catch (error) {
    console.error('RAG error:', error)
    return { context: '', sources: [] }
  }
}