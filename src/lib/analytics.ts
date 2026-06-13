// Utility para disparar eventos en GA4 y Meta Pixel simultáneamente

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('trackCustom', eventName, params)
  }
}

// Eventos estándar de Meta (para optimización de conversiones)
export function trackMetaStandard(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (window.fbq) {
    window.fbq('track', eventName, params)
  }
}