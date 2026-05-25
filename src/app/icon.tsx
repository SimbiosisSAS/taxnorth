import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: '#1A2744',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#F4A332',
            fontSize: 20,
            fontWeight: 800,
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  )
}