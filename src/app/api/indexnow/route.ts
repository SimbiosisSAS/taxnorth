import { NextResponse } from 'next/server'

const KEY = 'a6aa755880445cb7ef23d6ae5d3ec754'
const HOST = 'www.taxnorth.ca'

const URLS = [
  'https://www.taxnorth.ca',
  'https://www.taxnorth.ca/chat',
  'https://www.taxnorth.ca/connect',
  'https://www.taxnorth.ca/professionals',
  'https://www.taxnorth.ca/partners',
  'https://www.taxnorth.ca/resources',
  'https://www.taxnorth.ca/resources/how-to-file-taxes-canada-newcomer',
  'https://www.taxnorth.ca/resources/what-is-a-t4-slip-canada',
  'https://www.taxnorth.ca/resources/gst-hst-credit-canada-newcomers',
  'https://www.taxnorth.ca/resources/tax-filing-deadline-canada',
  'https://www.taxnorth.ca/resources/international-student-taxes-canada',
  'https://www.taxnorth.ca/resources/work-permit-taxes-canada',
  'https://www.taxnorth.ca/resources/canada-child-benefit-newcomers',
]

export async function GET() {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: URLS,
      }),
    })

    return NextResponse.json({
      success: true,
      status: response.status,
      urls: URLS.length,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}