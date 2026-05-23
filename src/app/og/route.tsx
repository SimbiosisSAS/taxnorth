import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#1A2744',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Lantern badge */}
        <div
          style={{
            width: '220px',
            height: '220px',
            backgroundColor: '#F4A332',
            borderRadius: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A2744"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 2 1.88 1.88"/>
            <path d="M14.12 3.88 16 2"/>
            <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>
            <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>
            <path d="M12 20v2"/>
            <path d="M10 22h4"/>
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '700',
            color: '#FFFFFF',
            letterSpacing: '-2px',
          }}
        >
          TaxNorth.ca
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            color: '#F4A332',
            letterSpacing: '-0.5px',
          }}
        >
          Taxes that finally click.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}