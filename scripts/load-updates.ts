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

const updates = [
  {
    source: 'tax-brackets-canada',
    category: 'filing_basics',
    text: 'Canadian Federal Income Tax Rates and Brackets 2025 and 2026. Canada uses a progressive tax system where each bracket applies only to income within that range. For 2025, the lowest federal rate was reduced to 14.5% — the first reduction since 2016 when it was 15%. The 2025 federal brackets are: 14.5% on the first $57,375; 20.5% on $57,376 to $114,750; 26% on $114,751 to $177,882; 29% on $177,883 to $253,414; 33% on income over $253,414. For 2026, the lowest rate was further reduced to 14%. The 2026 federal brackets are: 14% on the first $58,523; 20.5% on $58,524 to $117,045; 26% on $117,046 to $181,440; 29% on $181,441 to $258,482; 33% on income over $258,482. The Basic Personal Amount — the income you can earn before paying any federal tax — is $16,129 for 2025 and $16,452 for 2026. Everyone receives this credit regardless of income. Newcomers who arrive mid-year receive the full Basic Personal Amount — it is not prorated based on time in Canada. You also pay provincial income tax on top of federal tax. Most newcomers in their first year earn low to modest income and pay only the lowest marginal rate.'
  },
  {
    source: 'rrsp-basics',
    category: 'filing_basics',
    text: 'RRSP — Registered Retirement Savings Plan 2025 and 2026. An RRSP is a savings account registered with the Canadian government that lets you save for retirement while reducing your taxes today. Contributions are tax-deductible — they reduce your taxable income in the year you contribute. The RRSP contribution limit for 2025 is $32,490. The RRSP contribution limit for 2026 is $33,810. Your personal limit is 18% of your previous year earned income, up to the annual maximum. As a newcomer, your RRSP room is based only on Canadian earned income from the previous year — in your first year you likely have little or no room. Unused RRSP room carries forward indefinitely with no expiry. The RRSP contribution deadline for a tax year is 60 days into the following year — usually March 1. You can contribute to your RRSP until December 31 of the year you turn 71. Withdrawals from your RRSP are added to your income and taxed in the year of withdrawal. The Home Buyers Plan allows you to withdraw up to $35,000 from your RRSP tax-free to buy your first home, repayable over 15 years starting the second year after withdrawal.'
  },
  {
    source: 'tfsa-basics',
    category: 'filing_basics',
    text: 'TFSA — Tax-Free Savings Account 2025 and 2026. A TFSA is a registered account where your investments grow completely tax-free and withdrawals are never taxed — unlike an RRSP where withdrawals are taxed as income. The TFSA annual contribution limit is $7,000 for 2025 and $7,000 for 2026. The limit stayed at $7,000 for three consecutive years (2024, 2025, 2026) because inflation did not reach the threshold required to increase it to $7,500. As a newcomer, you begin accumulating TFSA contribution room only from the year you turn 18 AND become a Canadian resident — whichever is later. You cannot use TFSA room from years before you became a resident. Unused TFSA room carries forward every year. Withdrawals from a TFSA restore that room on January 1 of the following year. The cumulative TFSA lifetime contribution room for someone who has been a Canadian resident since age 18 from 2009 is $102,000 as of 2026. A TFSA is highly recommended for newcomers as a first savings vehicle because it is flexible — withdrawals are tax-free at any time for any reason.'
  },
  {
    source: 'canada-child-benefit',
    category: 'credits_benefits',
    text: 'Canada Child Benefit — 2025-2026 and 2026-2027 Amounts. The Canada Child Benefit is a tax-free monthly payment for families raising children under 18. For the benefit year July 2025 to June 2026, the maximum CCB is $7,997 per year ($666.41 per month) for each child under age 6, and $6,748 per year ($562.33 per month) for each child aged 6 to 17. For the benefit year July 2026 to June 2027, amounts increase to $8,157 per year for children under 6 and $6,883 per year for children 6 to 17. Benefits are reduced based on family net income — families with higher incomes receive less. Both parents must have filed their tax returns to receive the CCB. As a newcomer, you can apply for the CCB once you have lived in Canada for 18 months with a valid permit in the 19th month, or once you become a citizen or permanent resident. Work permit holders are eligible. Apply using Form RC66 or through CRA My Account. The CRA may ask for proof of immigration status. Payments arrive on the 20th of each month by direct deposit or cheque. The Child Disability Benefit of up to $3,322 per year (2025-2026) is an additional amount for children with severe and prolonged disabilities.'
  },
  {
    source: 'cpp-contributions',
    category: 'employment',
    text: 'Canada Pension Plan — CPP Contributions 2025. The Canada Pension Plan is a mandatory pension program for workers in Canada outside Quebec (Quebec has the QPP). CPP contributions are deducted automatically from your pay if you are between 18 and 70 and earning employment income above the basic exemption of $3,500 annually. For 2025, the employee CPP contribution rate is 5.95% applied to earnings between $3,500 and the Year Maximum Pensionable Earnings (YMPE) of $71,300. The maximum base CPP contribution for an employee in 2025 is approximately $4,034. Employers match the employee contribution dollar for dollar. CPP2: A second tier of CPP contributions applies to earnings between $71,300 and $79,400 in 2025 at a rate of 4% for both employee and employer. Self-employed individuals pay both the employee and employer portions — approximately 11.9% of net self-employment earnings up to the YMPE. Your CPP contributions build toward a future monthly retirement pension. You can start receiving CPP as early as age 60 with a reduced amount, or as late as age 70 with an enhanced amount. As a newcomer, your Canadian CPP contributions count toward your future pension. If your home country has a social security agreement with Canada, contributions may be combined to meet eligibility requirements.'
  },
  {
    source: 'canada-workers-benefit',
    category: 'credits_benefits',
    text: 'Canada Workers Benefit — 2025 and 2026 Amounts. The Canada Workers Benefit is a refundable tax credit for low-income workers in Canada. Refundable means you can receive it even if you owe no income tax. For 2025, the maximum basic CWB is $1,633 for single individuals and $2,813 for families. The benefit phases out when adjusted net income exceeds $26,855 for singles and $33,015 for families. A disability supplement of up to $781 is available for eligible individuals. The CRA issues advance payments of the CWB automatically — one-third of your estimated benefit is paid quarterly in July, October, and January without any application required. To qualify you must be 19 or older (or have a spouse or dependant), be a Canadian resident, have earned income from employment or self-employment, and have net investment income below $3,800. Full-time students enrolled for more than 13 weeks cannot claim it. As a newcomer working in Canada earning modest wages, this benefit can put significant money back in your pocket. It is claimed automatically when you file your tax return — no separate application needed. Work permit holders who qualify as Canadian residents are eligible.'
  },
  {
    source: 'part-year-resident',
    category: 'newcomers',
    text: 'Part-Year Residents — Tax Rules for Newcomers Who Arrived Mid-Year. If you became a Canadian resident during the tax year, you are a part-year resident. You report only the income you earned after your arrival date in Canada on your Canadian tax return. Income earned in your home country before arriving is generally not taxed in Canada for that period. On your T1 General tax return, you enter your date of entry to Canada — the CRA uses this to calculate your entitlements. Important: The Basic Personal Amount ($16,129 for 2025) is NOT prorated — you receive the full credit regardless of when you arrived. The Canada Groceries and Essentials Benefit, Canada Workers Benefit, and Canada Child Benefit are all available from the date you arrived, once you file your return. Your RRSP contribution room in your first year is based on 18% of your Canadian earned income only — foreign income before arrival does not create RRSP room. Your TFSA contribution room starts accumulating only from the year you are both 18 AND a Canadian resident — you cannot use room from before you became a resident. If you owned property or investments abroad before arriving, you are deemed to have acquired them at fair market value on your arrival date — this is your cost base for future Canadian capital gains calculations.'
  },
  {
    source: 'canadian-dental-care-plan',
    category: 'credits_benefits',
    text: 'Canadian Dental Care Plan — CDCP for Newcomers Without Private Insurance. The Canadian Dental Care Plan provides dental coverage for Canadian residents who do not have access to private dental insurance and whose adjusted family net income is under $90,000. The plan covers preventive and basic dental services including exams, cleanings, X-rays, fillings, extractions, and some restorative work. Coverage levels depend on income: full coverage below $70,000 annual family net income, partial coverage (co-payments apply) between $70,000 and $90,000, no coverage above $90,000. To be eligible you must be a Canadian resident, have filed your previous year tax return, not have access to private dental insurance through an employer or other plan, and have adjusted family net income under $90,000. Eligible groups include Canadian citizens, permanent residents, and protected persons. Work permit holders and international students may be eligible depending on the length and type of their status. Apply through Service Canada online at canada.ca/dental or by phone. The plan is administered by Sun Life Financial on behalf of the Government of Canada. As a newcomer without employer dental benefits this plan can cover significant dental costs.'
  },
  {
    source: 'voluntary-disclosures',
    category: 'filing_basics',
    text: 'Voluntary Disclosures Program — For Newcomers With Unfiled Returns. If you have not filed Canadian tax returns for one or more previous years, or have unreported income, the CRA Voluntary Disclosures Program (VDP) allows you to correct your tax affairs before the CRA contacts you. If you qualify, the CRA may waive or reduce penalties and may reduce interest. To qualify the disclosure must be voluntary (the CRA has not already contacted you about the issue), complete (you disclose everything), involve a potential penalty, and generally be more than one year overdue. Two tracks exist: the General Program for most situations where penalties are waived and partial interest relief is granted, and the Limited Program for cases involving intentional non-compliance where only partial penalty relief is available. Newcomers who did not know they were required to file Canadian tax returns are good candidates for the VDP. To file catch-up returns request copies of your T4 slips and other income slips from CRA My Account or by calling 1-800-959-8281. You can generally go back up to 10 years to file late returns and potentially receive refunds for taxes overpaid. Even under the VDP interest still applies but penalties may be waived entirely under the General Program.'
  },
  {
    source: 'tax-treaties-newcomers',
    category: 'newcomers',
    text: 'Tax Treaties and Foreign Income for Newcomers to Canada. Canada has income tax treaties with over 90 countries designed to prevent the same income from being taxed by two countries. As a Canadian resident, you must report worldwide income — but treaties determine how much tax you actually owe. Common newcomer scenarios: Foreign pension income must be reported on your Canadian return. Under many treaties a portion is exempt. US Social Security benefits received by Canadian residents are 85% exempt from Canadian tax under the Canada-US treaty. UK state pension and Australian superannuation have specific treaty provisions — verify with a tax professional. Foreign wages earned before becoming a Canadian resident are not taxed in Canada for that period. Dividends, interest, and royalties from foreign sources may have reduced withholding tax rates under treaties. To claim treaty benefits use Schedule T on your return or Form T2209 for foreign tax credits. Form T1135 Foreign Income Verification Statement must be filed if you held foreign property with total adjusted cost base over $100,000 Canadian at any time during the year — this includes foreign bank accounts, stocks, and real estate not used as a personal residence. Penalties for not filing T1135 are serious: $25 per day to a minimum of $2,500 plus potential gross negligence penalties. If your home country has no treaty with Canada you can still claim a foreign tax credit to avoid double taxation.'
  }
]

async function main() {
  console.log(`Loading ${updates.length} updated documents...\n`)
  for (const doc of updates) {
    await loadDocument(doc.text, doc.source, doc.category)
  }
  console.log('\nAll updates loaded successfully.')
}

main().catch(console.error)

