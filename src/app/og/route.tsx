import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#F4A332',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px 100px',
        }}
      >
        {/* Top — Brand name */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1A2744',
            letterSpacing: '-0.5px',
          }}
        >
          TaxNorth.ca
        </div>

        {/* Center — Headline */}
        <div
          style={{
            fontSize: '88px',
            fontWeight: '700',
            color: '#1A2744',
            lineHeight: '1.05',
            letterSpacing: '-3px',
            maxWidth: '900px',
          }}
        >
          Taxes that finally click.
        </div>

        {/* Bottom — Tagline */}
        <div
          style={{
            fontSize: '30px',
            color: 'rgba(26,39,68,0.70)',
            letterSpacing: '-0.3px',
          }}
        >
          Free AI tax guide for newcomers to Canada
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}