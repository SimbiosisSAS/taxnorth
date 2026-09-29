import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaxNorth | Links',
  description: 'Free AI tax guidance for newcomers in Canada. Available in 6 languages.',
}

const links = [
  {
    title: 'Chat with TaxNorth AI',
    description: 'Free tax guidance in your language. No account needed.',
    href: 'https://taxnorth.ca/chat',
    emoji: '🔦',
    primary: true,
    external: false,
  },
  {
    title: 'Connect with a CPA',
    description: 'Get matched with a certified accountant for $19.99',
    href: 'https://taxnorth.ca/connect',
    emoji: '🤝',
    primary: false,
    external: false,
  },
  {
    title: 'Free Tax Resources',
    description: 'Guides for newcomers in Canada',
    href: 'https://taxnorth.ca/resources',
    emoji: '📚',
    primary: false,
    external: false,
  },
  {
  title: 'Register your business in Canada',
  description: 'Fast, simple incorporation from $49 with Ownr',
  href: 'https://partners.ownr.co/f842lqsbq1c1',
  emoji: '🏢',
  primary: false,
  external: true,
},
  {
    title: 'Grow your business on TikTok',
    description: 'Start advertising and reach your first customers',
    href: 'https://getstartedtiktok.partnerlinks.io/mzx9t0lqgqx0',
    emoji: '📱',
    primary: false,
    external: true,
  },
]

export default function LinksPage() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#1A2744',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* Branding */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: '#F4A332',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          margin: '0 auto 20px',
        }}>
          🔦
        </div>
        <h1 style={{
          color: '#F4A332',
          fontSize: '32px',
          fontWeight: '700',
          margin: '0 0 8px',
          letterSpacing: '-0.5px',
        }}>
          TaxNorth.ca
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '17px',
          margin: '0 0 6px',
        }}>
          Taxes that finally click.
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '14px',
          margin: 0,
        }}>
          Free AI guidance · English · Français · Español · 中文 · ਪੰਜਾਬੀ · العربية
        </p>
      </div>

      {/* Link Buttons */}
      <div style={{
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.external ? '_blank' : '_self'}
            rel={link.external ? 'noopener noreferrer' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '22px 26px',
              backgroundColor: link.primary ? '#F4A332' : 'rgba(255,255,255,0.07)',
              border: `2px solid ${link.primary ? '#F4A332' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '18px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '30px' }}>{link.emoji}</span>
            <div>
              <div style={{
                color: link.primary ? '#1A2744' : '#FAF8F5',
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                {link.title}
              </div>
              <div style={{
                color: link.primary ? 'rgba(26,39,68,0.65)' : 'rgba(255,255,255,0.45)',
                fontSize: '14px',
              }}>
                {link.description}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '13px',
        marginTop: '48px',
        textAlign: 'center',
      }}>
        © 2026 TaxNorth.ca · Alberta, Canada
      </p>

    </main>
  )
}