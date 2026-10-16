'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    const hero = document.getElementById('hero-section')
    if (hero) observer.observe(hero)

    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6 pt-2 bg-gradient-to-t from-midnight-north/90 to-transparent">
      <Link
        href="/chat"
        className="block w-full bg-lantern-amber text-midnight-north font-semibold text-center py-4 rounded-button hover:opacity-90 transition-opacity"
      >
        Ask TaxNorth free →
      </Link>
    </div>
  )
}