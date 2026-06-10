import { Flashlight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-midnight-north flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">

        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Flashlight className="w-10 h-10 text-lantern-amber" />
        </div>

        <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-3">
          404
        </p>

        <h1 className="font-heading font-bold text-white text-3xl mb-4">
          This page doesn't exist.
        </h1>

        <p className="text-white/60 text-lg mb-10">
          But your Canadian tax questions do — and we have answers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/chat"
            className="w-full sm:w-auto bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
          >
            Ask TaxNorth →
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto border border-white/20 text-white font-medium px-6 py-3 rounded-button hover:bg-white/10 transition-colors"
          >
            Go home
          </Link>
        </div>

      </div>
    </div>
  )
}