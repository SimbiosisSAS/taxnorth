import { Flashlight, Users, TrendingUp, CheckCircle, MapPin, Languages, ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PartnersPage() {
  return (
    <div className="min-w-mobile">

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
          <a
            href="mailto:partners@taxnorth.ca"
            className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
          >
            Become a Partner
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-midnight-north py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
            For Tax Professionals
          </p>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-6 leading-tight">
            Pre-qualified newcomer leads.<br />No marketing required.
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            TaxNorth educates newcomers to Canada about the tax system for free.
            When they need a professional, we connect them with you. You only pay
            for the leads you receive.
          </p>
          <a
            href="mailto:partners@taxnorth.ca"
            className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-8 py-4 rounded-button hover:opacity-90 transition-opacity text-base"
          >
            Get started today
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/40 text-sm mt-4">
            No monthly fees to start. Pay only per lead received.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-lantern-amber py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { number: "500K+", label: "Newcomers arrive in Canada each year" },
            { number: "73%", label: "Have never filed a Canadian tax return" },
            { number: "$0", label: "Marketing cost to you" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-1">
                {stat.number}
              </p>
              <p className="text-midnight-north/70 text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-4">
            How the partnership works.
          </h2>
          <p className="text-deep-ink/60 text-center text-lg mb-12">
            Simple, transparent, and built around your success.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Newcomer discovers TaxNorth",
                body: "Someone new to Canada finds TaxNorth.ca and starts chatting with our AI guide about their tax situation."
              },
              {
                step: "02",
                title: "Agent detects they need help",
                body: "When their situation requires a professional — self-employment, multiple income sources, unfiled returns — TaxNorth suggests connecting with an accountant."
              },
              {
                step: "03",
                title: "You receive the lead",
                body: "You get an immediate email with their name, contact info, province, language, and a summary of their tax situation. Pre-qualified and ready to connect."
              }
            ].map((item) => (
              <div key={item.step} className="bg-fog-gray rounded-card p-8">
                <p className="font-heading font-bold text-lantern-amber text-4xl mb-4">
                  {item.step}
                </p>
                <h3 className="font-heading font-semibold text-midnight-north text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-deep-ink/70 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TAXNORTH LEADS */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            Why TaxNorth leads are different.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "Already educated",
                body: "Our AI guide explains the basics before referring. Your client arrives knowing what a T4 is, why they need to file, and what to expect."
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "High intent",
                body: "They asked to be connected with a professional. This isn't a cold lead — it's someone who actively requested help and is ready to hire."
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "Situation pre-screened",
                body: "You receive a summary of their tax situation before you even reach out — self-employed, first-time filer, unfiled years, or other specifics."
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "Multilingual audience",
                body: "TaxNorth serves newcomers in any language. Your leads include clients from South Asia, Latin America, the Philippines, and beyond."
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "Growing market",
                body: "Canada welcomes over 500,000 newcomers each year. Every one of them needs to file taxes. The demand only grows."
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-maple-green" />,
                title: "No long-term commitment",
                body: "Start with a pay-per-lead arrangement. No monthly fees, no contracts. Pause or stop anytime."
              }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-card p-6 flex gap-4">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-heading font-semibold text-midnight-north mb-1">
                    {item.title}
                  </h3>
                  <p className="text-deep-ink/70 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-4">
            Simple pricing.
          </h2>
          <p className="text-deep-ink/60 text-center text-lg mb-12">
            Two ways to partner with TaxNorth.
          </p>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Pay per lead */}
            <div className="bg-fog-gray rounded-card p-8">
              <h3 className="font-heading font-bold text-midnight-north text-xl mb-2">
                Pay Per Lead
              </h3>
              <p className="font-heading font-bold text-lantern-amber text-4xl mb-1">
                $40
              </p>
              <p className="text-deep-ink/60 text-sm mb-6">CAD per qualified lead</p>
              <div className="space-y-3 mb-8">
                {[
                  "No monthly commitment",
                  "Full lead details on arrival",
                  "Pay only for leads received",
                  "Pause or stop anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-maple-green flex-shrink-0" />
                    <span className="text-deep-ink text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:partners@taxnorth.ca?subject=Pay Per Lead Partnership"
                className="block w-full text-center border-2 border-midnight-north text-midnight-north font-semibold py-3 rounded-button hover:bg-midnight-north hover:text-white transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Preferred Partner */}
            <div className="bg-midnight-north rounded-card p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lantern-amber text-midnight-north text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-2">
                Preferred Partner
              </h3>
              <p className="font-heading font-bold text-lantern-amber text-4xl mb-1">
                $300
              </p>
              <p className="text-white/60 text-sm mb-6">CAD per month</p>
              <div className="space-y-3 mb-8">
                {[
                  "All leads in your province",
                  "Listed as recommended partner",
                  "Priority placement in the agent",
                  "Monthly lead volume report",
                  "Dedicated partner support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lantern-amber flex-shrink-0" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:partners@taxnorth.ca?subject=Preferred Partner Inquiry"
                className="block w-full text-center bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button hover:opacity-90 transition-opacity"
              >
                Become preferred partner
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            Who we work with.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-lantern-amber" />,
                title: "Independent CPAs",
                body: "Solo practitioners and small firms looking to grow their newcomer client base without spending on marketing."
              },
              {
                icon: <MapPin className="w-6 h-6 text-lantern-amber" />,
                title: "Regional tax firms",
                body: "Firms with 2 to 15 accountants serving specific cities or provinces who want a steady, qualified pipeline."
              },
              {
                icon: <Languages className="w-6 h-6 text-lantern-amber" />,
                title: "Multilingual practices",
                body: "Professionals who serve immigrant communities in their native language and want more clients from their community."
              }
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-card p-8">
                <div className="w-12 h-12 bg-midnight-north rounded-xl flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading font-semibold text-midnight-north text-lg mb-2">
                  {card.title}
                </h3>
                <p className="text-deep-ink/70 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-midnight-north py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4">
            Ready to grow your practice?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Send us an email and we'll set up a 15-minute call to discuss
            how TaxNorth can work for your practice.
          </p>
          <a
            href="mailto:partners@taxnorth.ca?subject=Partnership Inquiry"
            className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-8 py-4 rounded-button hover:opacity-90 transition-opacity text-base"
          >
            <Mail className="w-4 h-4" />
            partners@taxnorth.ca
          </a>
          <p className="text-white/40 text-sm mt-4">
            We respond within one business day.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-midnight-north border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-white">
              TaxNorth<span className="text-xs">.ca</span>
            </span>
          </Link>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">For Users</Link>
            <Link href="/chat" className="hover:text-white transition-colors">Try the Agent</Link>
            <Link href="/connect" className="hover:text-white transition-colors">Find a Professional</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}