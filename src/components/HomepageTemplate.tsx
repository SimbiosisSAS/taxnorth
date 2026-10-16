import { Flashlight, Plane, GraduationCap, Star, MessageCircle, Lightbulb, Users, Check, AlertTriangle, TrendingDown, Sliders, Lock, Shield } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import LanguageSelector from '@/components/LanguageSelector'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import { HomepageTranslation } from '@/lib/homepageTranslations'

interface HomepageTemplateProps {
  t: HomepageTranslation
  locale: string
}

export default function HomepageTemplate({ t, locale }: HomepageTemplateProps) {

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "TaxNorth",
        "url": "https://www.taxnorth.ca",
        "description": "Free AI tax guide for newcomers to Canada",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Do newcomers to Canada need to file taxes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. As a newcomer to Canada, you generally need to file a tax return for the part of the year you were a Canadian resident. Even if you had no income, filing is important to access benefits like the GST/HST credit and Climate Action Incentive Payment." } },
          { "@type": "Question", "name": "What is the tax filing deadline in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "For most individuals in Canada, the tax filing deadline is April 30. If you or your spouse are self-employed, the deadline to file is June 15, but any taxes owing must be paid by April 30." } },
          { "@type": "Question", "name": "What is a T4 slip in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "A T4 slip is a Statement of Remuneration Paid issued by your employer. It shows your total employment income and the amounts deducted for income tax, CPP contributions, and EI premiums. You need your T4 to file your tax return." } }
        ]
      },
      {
        "@type": "Organization",
        "name": "TaxNorth",
        "url": "https://www.taxnorth.ca",
        "logo": "https://www.taxnorth.ca/og?v=2",
        "contactPoint": { "@type": "ContactPoint", "email": "hello@taxnorth.ca", "contactType": "customer service" }
      }
    ]
  }

  return (
    <div>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* NAVBAR */}
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
          <div className="hidden md:flex items-center gap-6 text-sm text-deep-ink/70">
            <Link href="/resources" className="hover:text-midnight-north transition-colors">{t.navResources}</Link>
            <Link href="/professionals" className="hover:text-midnight-north transition-colors">{t.navFindPro}</Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/chat"
              className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
            >
              {t.navStart}
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero-section" className="bg-midnight-north min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Flashlight className="w-8 h-8 text-lantern-amber" />
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-6xl mb-6 leading-tight">
            {t.heroH1}
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            {t.heroSub}
          </p>
          <Link
            href="/chat"
            className="inline-block bg-lantern-amber text-midnight-north font-semibold text-base px-8 py-4 rounded-button hover:opacity-90 transition-opacity mb-4"
          >
            {t.heroButton}
          </Link>
          <div className="flex items-center justify-center gap-5 mt-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Lock className="w-3 h-3" /> {t.heroBadge1}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Shield className="w-3 h-3" /> {t.heroBadge2}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <Check className="w-3 h-3" /> {t.heroBadge3}
            </span>
          </div>
        </div>
      </section>

      {/* SURPRISE SECTION */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
              {t.surpriseLabel}
            </p>
            <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-6 leading-tight">
              {t.surpriseH2}
            </h2>
            <p className="text-deep-ink text-lg leading-relaxed mb-6">
              {t.surpriseBody}
            </p>
            <Link href="/chat" className="text-lantern-amber font-semibold hover:opacity-80 transition-opacity">
              {t.surpriseCta}
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="bg-midnight-north rounded-card p-8 text-center">
              <p className="font-heading font-bold text-lantern-amber text-6xl mb-3">$500+</p>
              <p className="text-white text-sm leading-relaxed">
                {t.surpriseStat}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            {t.howH2}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: "01", icon: <MessageCircle className="w-7 h-7" />, title: t.howStep1Title, body: t.howStep1Body },
              { number: "02", icon: <Lightbulb className="w-7 h-7" />, title: t.howStep2Title, body: t.howStep2Body },
              { number: "03", icon: <Users className="w-7 h-7" />, title: t.howStep3Title, body: t.howStep3Body }
            ].map((step) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-heading font-bold text-lantern-amber text-3xl">{step.number}</span>
                  <div className="w-12 h-12 bg-lantern-amber/10 border border-lantern-amber/20 rounded-xl flex items-center justify-center text-lantern-amber">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-midnight-north text-xl mb-3">{step.title}</h3>
                <p className="text-deep-ink/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            {t.whoH2}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Plane className="w-6 h-6 text-lantern-amber" />, title: t.whoCard1Title, body: t.whoCard1Body },
              { icon: <GraduationCap className="w-6 h-6 text-lantern-amber" />, title: t.whoCard2Title, body: t.whoCard2Body },
              { icon: <Star className="w-6 h-6 text-lantern-amber" />, title: t.whoCard3Title, body: t.whoCard3Body }
            ].map((card) => (
              <div key={card.title} className="bg-fog-gray rounded-card p-8">
                <div className="w-12 h-12 bg-midnight-north rounded-xl flex items-center justify-center mb-4">{card.icon}</div>
                <h3 className="font-heading font-semibold text-midnight-north text-xl mb-2">{card.title}</h3>
                <p className="text-deep-ink/70 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
              {t.whyLabel}
            </p>
            <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl leading-tight">
              {t.whyH2}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { number: "01", icon: <AlertTriangle className="w-5 h-5" />, title: t.whyCard1Title, body: t.whyCard1Body },
              { number: "02", icon: <TrendingDown className="w-5 h-5" />, title: t.whyCard2Title, body: t.whyCard2Body },
              { number: "03", icon: <Sliders className="w-5 h-5" />, title: t.whyCard3Title, body: t.whyCard3Body }
            ].map((item) => (
              <div key={item.number} className="bg-white rounded-card p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-heading font-bold text-lantern-amber text-3xl">{item.number}</span>
                  <div className="w-10 h-10 bg-lantern-amber/10 border border-lantern-amber/20 rounded-xl flex items-center justify-center text-lantern-amber">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-midnight-north text-lg mb-3">{item.title}</h3>
                <p className="text-deep-ink/60 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-midnight-north rounded-card p-8 md:p-12">
            <div className="md:grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="font-heading font-bold text-white text-2xl mb-4">
                  {t.cpaH3Small}
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  {t.cpaBodySmall1}
                </p>
                <p className="text-white/70 leading-relaxed">
                  {t.cpaBodySmall2}
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <h3 className="font-heading font-bold text-white text-2xl mb-4">
                  {t.cpaH3Connect}
                </h3>
                <div className="space-y-3">
                  {[t.cpaCheck1, t.cpaCheck2, t.cpaCheck3, t.cpaCheck4].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-lantern-amber/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-lantern-amber" strokeWidth={3} />
                      </div>
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/connect"
                  className="inline-block mt-6 bg-lantern-amber text-midnight-north font-semibold text-sm px-6 py-3 rounded-button hover:opacity-90 transition-opacity"
                >
                  {t.cpaCta}
                </Link>
                <p className="text-white/40 text-xs mt-2">
                  {t.cpaCtaSub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-warm-white py-24 px-6 text-center border-t border-fog-gray">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-4">
            {t.finalH2}
          </h2>
          <p className="text-deep-ink/60 text-lg mb-8">
            {t.finalBody}
          </p>
          <Link
            href="/chat"
            className="inline-block bg-lantern-amber text-midnight-north font-semibold px-8 py-4 rounded-button hover:opacity-90 transition-opacity"
          >
            {t.finalButton}
          </Link>
          <p className="mt-4 text-deep-ink/40 text-sm">{t.finalSub}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-midnight-north border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                <Flashlight className="w-4 h-4 text-lantern-amber" />
              </div>
              <span className="font-heading font-bold text-white">
                TaxNorth<span className="text-xs">.ca</span>
              </span>
            </Link>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-white/60 text-sm">
              <Link href="/resources" className="hover:text-white transition-colors">{t.navResources}</Link>
              <Link href="/professionals" className="hover:text-white transition-colors">{t.navFindPro}</Link>
              <Link href="/partners" className="hover:text-white transition-colors">For Professionals</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/connect" className="hover:text-white transition-colors whitespace-nowrap">Connect with a Pro</Link>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </div>
      </footer>

      <StickyMobileCTA />
    </div>
  )
}