import { Suspense } from 'react'
import ConnectClient from './ConnectClient'

export const metadata = {
  title: 'Connect with a Canadian Tax Professional — TaxNorth.ca',
  description: 'Get matched with a licensed tax accountant in Canada who specializes in helping newcomers. Free to connect. Available across all provinces.',
}

export default function ConnectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lantern-amber border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConnectClient />
    </Suspense>
  )
}