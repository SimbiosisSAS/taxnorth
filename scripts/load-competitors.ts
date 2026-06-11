import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

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

const documents = [
  {
    source: 'hrblock-canada-services-2026',
    category: 'filing_basics',
    text: 'H&R Block Canada — Complete Service Guide 2026. H&R Block Canada is an independent tax preparation company not affiliated with TaxNorth. This information is for educational purposes only. H&R Block offers four online software tiers for the 2025 tax year filed in 2026. Free tier at $0 covers simple returns with T4 employment income, basic student returns, and senior returns. Deluxe tier at $29.99 adds charitable donations, medical expenses, tuition credits, and RRSP contributions. Premier tier at $49.99 covers stocks, investments, capital gains, foreign income, and rental income. Self-Employed tier at $69.99 covers business income, T2125 business statement, capital gains, and self-employment expenses. Beyond DIY software, H&R Block offers Expert Review where a tax professional reviews your completed DIY return over the phone before filing. In-office preparation with a tax professional typically starts at approximately $99 for simple returns. H&R Block has over 900 office locations across Canada. All online software is NETFILE certified by the CRA for the 2025 tax year. H&R Block offers a 25 percent discount for first-time filers in Canada when filing with a Tax Expert. H&R Block is a private company and is not affiliated with the Canada Revenue Agency. For newcomers with complex situations, a licensed independent CPA through TaxNorth may provide more personalized service.'
  },
  {
    source: 'hrblock-canada-newcomers-2026',
    category: 'newcomers',
    text: 'H&R Block Canada Newcomer Services 2026. H&R Block Canada offers specific services for newcomers to Canada. Their tax professionals can handle part-year resident returns, which is the situation most newcomers face in their first year — only reporting income earned after their arrival date in Canada. H&R Block offers a 25 percent newcomer discount when filing with a Tax Expert in 2026. One advantage H&R Block professionals have for newcomers is that they can file returns without the newcomer needing a CRA My Account. H&R Block software supports arrival date entry for pro-rating credits like the GST/HST credit and the new Canada Groceries and Essentials Benefit. Their software is available in English and French only. For newcomers who prefer support in other languages — Spanish, Mandarin, Punjabi, Arabic, Romanian, Ukrainian, Japanese, Korean, Dari, or Turkish — or who have complex situations like self-employment, multiple income sources, or unfiled previous years, a licensed CPA through TaxNorth who matches by language and province provides better service. TaxNorth is not affiliated with H&R Block.'
  },
  {
    source: 'turbotax-canada-services-2026',
    category: 'filing_basics',
    text: 'TurboTax Canada — Complete Service Guide 2026. TurboTax Canada is an online tax software platform owned by Intuit. TaxNorth has no affiliation with TurboTax Canada. This information is for educational purposes only. TurboTax offers three service levels for the 2025 tax year. Do It Yourself ranges from $0 for simple returns to $50 for Premier which includes capital gains and foreign income. Expert Assist provides unlimited help from a TurboTax tax expert via one-way video or chat — new users can access this for $60 with a switching promotion. Full Service has a TurboTax-employed professional prepare and file the entire return, typically starting around $150 to $200. TurboTax has integrated Intuit Assist, a generative AI tool that answers tax questions in natural language. TurboTax has a dedicated newcomer section and handles foreign income including Form T1135 for foreign property over $100,000 CAD. TurboTax offers a $20 rate for users aged 25 and younger. TurboTax is a digital-only platform with no physical offices in Canada. All software is NETFILE certified. TurboTax is available in English and French only. For newcomers who prefer service in 12 languages or want a personalized CPA matched to their province and situation, TaxNorth partner professionals provide a different type of service.'
  },
  {
    source: 'tax-software-vs-professional-2026',
    category: 'filing_basics',
    text: 'Tax Software vs Licensed CPA — Which Should Newcomers Use in 2026. TaxNorth is not affiliated with any tax software company. For newcomers deciding how to file Canadian taxes, here is a practical comparison. Tax software like the options certified at canada.ca/netfile-software works well for newcomers with simple situations — one or two T4 slips, no business income, no foreign assets over $100,000, and basic first-year filing needs. Free tiers of most software work only for very simple returns. Most newcomers will need at minimum a paid tier to access features like medical expenses, RRSP deductions, or tuition credits. Most commercial tax software is available in English and French only. The key advantage of a licensed CPA over software is personalized guidance in your language — a professional who understands your specific situation and can identify credits and deductions the software may miss. For newcomers with self-employment income, multiple income sources, unfiled returns from previous years, or who prefer support in Spanish, Mandarin, Punjabi, Arabic, Romanian, Ukrainian, Japanese, Korean, Dari, or Turkish, a licensed CPA matched by TaxNorth is the recommended path. TaxNorth connects newcomers to licensed CPAs in their province for a $19.99 connection fee.'
  }
]

async function main() {
  console.log(`Loading ${documents.length} competitor knowledge documents...\n`)
  for (const doc of documents) {
    await loadDocument(doc.text, doc.source, doc.category)
  }
  console.log('\nDone. Your 109 existing documents were not touched.')
}

main().catch(console.error)