import { Flashlight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { resources } from '@/lib/resources'

export const metadata = {
  title: 'Canadian Tax Guides for Newcomers and Students | TaxNorth',
  description: 'Learn how to file taxes in Canada for the first time. Clear guides on getting your Notice of Assessment, Canada Child Benefit and CRA account setup.',
}

export default function ResourcesPage() {
  return (
    <div>
      <nav className="sticky top-0 z-50 bg-warm-white border-b border-fog-gray">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north text-lg">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
          <Link
            href="/chat"
            className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
          >
            Ask TaxNorth
          </Link>
        </div>
      </nav>

      <section className="bg-midnight-north py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
            Free Tax Guides
          </p>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6">
  Canadian Tax Guides for First-Time Filers
</h1>
          <p className="text-white/70 text-lg">
  Need answers fast? Skip the reading and ask our free AI tax assistant your specific questions in any language. Or explore our step-by-step guides below to learn everything from filing your first return to getting your Canada Child Benefit.
</p>
        </div>
      </section>

      <section className="bg-warm-white py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="bg-white border border-fog-gray rounded-card p-6 hover:border-lantern-amber hover:shadow-sm transition-all group"
            >
              <h2 className="font-heading font-semibold text-midnight-north text-lg mb-2 group-hover:text-lantern-amber transition-colors">
                {resource.title}
              </h2>
              <p className="text-deep-ink/60 text-sm leading-relaxed mb-4">
                {resource.description}
              </p>
              <span className="inline-flex items-center gap-1 text-lantern-amber font-medium text-sm">
                Read guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-midnight-north py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-white text-2xl mb-4">
  Still have questions about your taxes?
</h2>
<p className="text-white/70 mb-6">
  Everyone's situation is different. If you can't find what you're looking for, ask our free, multilingual AI tax assistant right now. No account or payment required.
</p>
<Link
  href="/chat"
  className="inline-block bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
>
  Ask the AI Assistant
</Link>
        </div>
      </section>
    </div>
  )
}