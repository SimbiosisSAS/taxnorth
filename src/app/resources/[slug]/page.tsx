import { Flashlight, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { resources, getResource } from '@/lib/resources'
import { notFound } from 'next/navigation'
import LanguageSelector from '@/components/LanguageSelector'
import type { Resource } from '@/lib/resources'

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return {}
  return {
    title: resource.metaTitle,
    description: resource.description,
  }
}

function isQuestion(heading: string): boolean {
  const questionWords = ['what', 'how', 'why', 'can', 'do', 'is', 'are', 'will', 'should', 'when', 'where', 'which']
  const lower = heading.toLowerCase()
  return heading.includes('?') || questionWords.some(word => lower.startsWith(word))
}

const TOPIC_CLUSTERS: Record<string, string[]> = {
  filing: [
    'how-to-file-taxes-canada-newcomer',
    'tax-filing-deadline-canada',
    'what-is-a-t4-slip-canada',
    'cra-account-setup-newcomer',
    'notice-of-assessment-canada',
    'reading-your-notice-of-assessment-canada',
    'what-to-do-if-you-owe-taxes-canada',
    'foreign-income-reporting-canada-newcomer',
  ],
  benefits: [
    'gst-hst-credit-canada-newcomers',
    'canada-groceries-essentials-benefit-newcomers-2026',
    'canada-workers-benefit-newcomers',
    'canada-child-benefit-newcomers',
    'employment-insurance-newcomer-canada',
    'disability-tax-credit-canada',
  ],
  newcomer: [
    'refugee-claimant-taxes-canada',
    'social-insurance-number-newcomer-canada',
    'cra-account-setup-newcomer',
    'international-student-taxes-canada',
    'work-permit-taxes-canada',
    'provincial-tax-differences-canada',
    'moving-expenses-tax-deduction-canada',
  ],
  credits: [
    'medical-expense-tax-credit-canada',
    'disability-tax-credit-canada',
    'childcare-expenses-tax-deduction-canada',
    'first-home-buyer-tax-credit-canada',
    'moving-expenses-tax-deduction-canada',
    'canada-workers-benefit-newcomers',
  ],
  savings: [
    'rrsp-for-newcomers-canada',
    'best-tfsa-rrsp-accounts-newcomers-canada',
    'best-bank-accounts-newcomers-canada',
    'build-credit-canada-newcomer',
    'first-home-buyer-tax-credit-canada',
  ],
  selfemployed: [
    'register-business-canada-newcomer',
    'best-accounting-software-self-employed-newcomers',
    'what-to-do-if-you-owe-taxes-canada',
    'tax-filing-deadline-canada',
  ],
}

function getRelatedResources(currentSlug: string): Resource[] {
  const currentCluster = Object.values(TOPIC_CLUSTERS).find(slugs =>
    slugs.includes(currentSlug)
  )

  if (currentCluster) {
    const related = currentCluster
      .filter(s => s !== currentSlug)
      .map(s => resources.find(r => r.slug === s))
      .filter(Boolean) as Resource[]
    return related.slice(0, 3)
  }

  return resources.filter(r => r.slug !== currentSlug).slice(0, 3)
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const relatedResources = getRelatedResources(slug)

  const faqSections = resource!.sections.filter(s => isQuestion(s.heading))

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": resource!.title,
        "description": resource!.intro,
        "url": `https://www.taxnorth.ca/resources/${slug}`,
        "publisher": {
          "@type": "Organization",
          "name": "TaxNorth",
          "url": "https://www.taxnorth.ca",
          "logo": "https://www.taxnorth.ca/og?v=2"
        },
        "inLanguage": "en-CA",
        "about": {
          "@type": "Thing",
          "name": "Canadian taxes for newcomers"
        }
      },
      ...(faqSections.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqSections.map(section => ({
          "@type": "Question",
          "name": section.heading.endsWith('?') ? section.heading : `${section.heading}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": section.content
          }
        }))
      }] : [])
    ]
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/chat"
              className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
            >
              Ask TaxNorth
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-lantern-amber font-medium text-sm mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          All resources
        </Link>

        <h1 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-6 leading-tight">
          {resource!.title}
        </h1>

        <p className="text-deep-ink/70 text-lg leading-relaxed mb-10 pb-10 border-b border-fog-gray">
          {resource!.intro}
        </p>

        <div className="space-y-8">
          {resource!.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
                {section.heading}
              </h2>
              <p className="text-deep-ink leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {resource!.affiliates && resource!.affiliates.length > 0 && (
          <div className="mt-12 pt-10 border-t border-fog-gray">
            <h3 className="font-heading font-semibold text-midnight-north text-lg mb-4">
              Recommended products
            </h3>
            <div className="grid gap-3 mb-4">
              {resource!.affiliates.map((product) => (
                <a
                  key={product.name}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between p-4 bg-fog-gray rounded-card hover:bg-fog-gray/70 transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-heading font-semibold text-midnight-north text-sm">
                        {product.name}
                      </span>
                      {product.badge && (
                        <span className="bg-lantern-amber/20 text-lantern-amber text-xs font-medium px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-deep-ink/60 text-sm">{product.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-lantern-amber flex-shrink-0 ml-4" />
                </a>
              ))}
            </div>
            <p className="text-deep-ink/30 text-xs">
              * TaxNorth may receive a commission if you open an account through these links, at no cost to you. We only recommend products we believe are genuinely useful for newcomers.
            </p>
          </div>
        )}

        <div className="mt-12 bg-midnight-north rounded-card p-8 text-center">
          <div className="w-10 h-10 bg-lantern-amber/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Flashlight className="w-5 h-5 text-lantern-amber" />
          </div>
          <p className="text-white font-heading font-semibold text-lg mb-2">
            {resource!.cta}
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity mt-4"
          >
            Ask TaxNorth free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {relatedResources.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading font-semibold text-midnight-north text-lg mb-6">
              Related guides for newcomers
            </h3>
            <div className="space-y-3">
              {relatedResources.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="flex items-center justify-between p-4 bg-fog-gray rounded-button hover:bg-fog-gray/70 transition-colors group"
                >
                  <span className="text-deep-ink font-medium text-sm group-hover:text-midnight-north">
                    {r.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-lantern-amber flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}