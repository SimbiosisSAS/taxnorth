import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://taxnorth.ca',
    'X-Title': 'TaxNorth.ca',
  },
})

function chunkText(text: string, chunkSize = 400): string[] {
  const sentences = text.split(/\.\s+/).filter(s => s.trim())
  const chunks: string[] = []
  let current = ''
  for (const sentence of sentences) {
    if ((current + sentence).length > chunkSize && current) {
      chunks.push(current.trim())
      current = sentence
    } else {
      current += (current ? '. ' : '') + sentence
    }
  }
  if (current) chunks.push(current.trim())
  return chunks
}

async function loadDocument(text: string, source: string, category: string) {
  const chunks = chunkText(text)
  console.log(`Loading ${chunks.length} chunks from: ${source}`)
  for (const chunk of chunks) {
    const embeddingResponse = await openrouter.embeddings.create({
      model: 'openai/text-embedding-3-small',
      input: chunk,
    })
    const embedding = embeddingResponse.data[0].embedding
    const { error } = await supabase.from('knowledge_base').insert({
      content: chunk,
      embedding,
      source,
      category,
      metadata: { source_url: 'https://canada.ca' },
    })
    if (error) console.error('Insert error:', error)
    else process.stdout.write('.')
  }
  console.log(` Done: ${source}`)
}

async function main() {
  const docs = JSON.parse(
    readFileSync(join(process.cwd(), 'scripts/documents-update-2.json'), 'utf-8')
  )
  console.log(`Loading ${docs.length} documents...\n`)
  for (const doc of docs) {
    await loadDocument(doc.text, doc.source, doc.category)
  }
  console.log('\nDone.')
}

main().catch(console.error)