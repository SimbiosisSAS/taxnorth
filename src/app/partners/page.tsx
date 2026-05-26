import { Flashlight, Users, MapPin, Languages, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Join TaxNorth — Tax Professional Directory | TaxNorth.ca',
  description: 'List your practice on TaxNorth.ca and receive pre-qualified newcomer clients matched by province, language, and specialty.',
}

const HELCIM_MONTHLY = 'https://subscriptions.helcim.com/subscribe/f7z5gxyqylvg0sq09shzlahqe7ot4'
const HELCIM_ANNUAL_MONTHLY = 'https://subscriptions.helcim.com/subscribe/favedrob2savk535dxncthk4a5ixi'
const HELCIM_ANNUAL_UPFRONT = 'https://taxnorth.myhelcim.com/hosted/?token=9f85bbec4ecd86596dc101&amount=50.00&amountHash=a99210875f112a6e8ab130a4a4fb700a903c05dfe49bc3c4ec22ce3827cb20be'

export default function PartnersPage() {
  return (
    <div>

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
          <a href={HELCIM_MONTHLY} target="_blank" rel="noopener noreferrer"
            className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity">
            Join the directory
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-midnight-north py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
            For Tax Professionals
          </p>
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-4 leading-tight">
            Your next clients are already<br />looking for you.
          </h1>
          <p className="text-lantern-amber/80 text-sm font-medium mb-6">
            Founding Member Rate — price locked forever for early subscribers.
          </p>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            TaxNorth educates people about Canadian taxes for free — newcomers, first-time filers,
self-employed workers, and more. When they need a professional, we match them to you
by province, language, and specialty. You focus on the work. We handle the rest.
          </p>
          <a href={HELCIM_MONTHLY} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-lantern-amber text-midnight-north font-semibold px-8 py-4 rounded-button hover:opacity-90 transition-opacity text-base">
            Join for $29/month <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/40 text-sm mt-4">
            After payment we contact you to set up your profile. No long-term commitment required.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-lantern-amber py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { number: "500K+", label: "Newcomers arrive in Canada each year" },
            { number: "12", label: "Languages supported by TaxNorth" },
            { number: "$0", label: "Per-client cost to you" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-1">{stat.number}</p>
              <p className="text-midnight-north/70 text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-4">
            How it works.
          </h2>
          <p className="text-deep-ink/60 text-center text-lg mb-12">Simple. Transparent. Built around your growth.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Subscribe", body: "Choose your plan and complete payment. We contact you within 24 hours to set up your profile." },
              { step: "02", title: "Get listed", body: "Your profile appears in the TaxNorth directory, matched to clients by province, language, and specialty." },
              { step: "03", title: "Client connects", body: "A newcomer pays $19.99 to connect with you. You receive their full details — name, email, phone, and situation." },
              { step: "04", title: "You reach out", body: "Contact the client within 24 hours with your TaxNorth rate. They are pre-educated and ready to hire." },
            ].map((item) => (
              <div key={item.step} className="bg-fog-gray rounded-card p-6">
                <p className="font-heading font-bold text-lantern-amber text-3xl mb-3">{item.step}</p>
                <h3 className="font-heading font-semibold text-midnight-north text-base mb-2">{item.title}</h3>
                <p className="text-deep-ink/60 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-2">
            Simple pricing.
          </h2>
          <p className="text-lantern-amber font-semibold text-sm text-center mb-3">
            Founding Member Rate — join now and lock in this price forever.
          </p>
          <p className="text-deep-ink/60 text-center text-lg mb-12">
            No per-client fees. No commissions. Just a flat directory listing.
          </p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Monthly */}
            <div className="bg-white rounded-card p-8">
              <h3 className="font-heading font-bold text-midnight-north text-xl mb-1">Monthly</h3>
              <p className="text-deep-ink/50 text-sm mb-4">Cancel anytime</p>
              <p className="font-heading font-bold text-lantern-amber text-5xl mb-1">$29</p>
              <p className="text-deep-ink/60 text-sm mb-6">CAD / month</p>
              <div className="space-y-2 mb-8">
                {[
                  "Profile in the TaxNorth directory",
                  "Matched by province and language",
                  "Receive full client details",
                  "No per-client fees",
                  "Cancel anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-maple-green flex-shrink-0" />
                    <span className="text-deep-ink text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a href={HELCIM_MONTHLY} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center border-2 border-midnight-north text-midnight-north font-semibold py-3 rounded-button hover:bg-midnight-north hover:text-white transition-colors">
                Get started
              </a>
            </div>

            {/* Annual Monthly */}
            <div className="bg-midnight-north rounded-card p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lantern-amber text-midnight-north text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                SAVE 35%
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-1">Annual</h3>
              <p className="text-white/50 text-sm mb-4">Billed monthly · 12-month plan</p>
              <p className="font-heading font-bold text-lantern-amber text-5xl mb-1">$19</p>
              <p className="text-white/60 text-sm mb-6">CAD / month</p>
              <div className="space-y-2 mb-6">
                {[
                  "Everything in Monthly",
                  "35% savings vs monthly",
                  "Priority placement in results",
                  "TaxNorth Verified badge",
                  "Monthly performance report",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lantern-amber flex-shrink-0" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-lantern-amber/10 border border-lantern-amber/30 rounded-button p-3 mb-4 text-center">
                <p className="text-lantern-amber text-xs font-semibold">
                  ✓ Money-back guarantee if no clients in 12 months
                </p>
              </div>
              <a href={HELCIM_ANNUAL_MONTHLY} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center bg-lantern-amber text-midnight-north font-semibold py-3 rounded-button hover:opacity-90 transition-opacity">
                Get started
              </a>
            </div>

            {/* Annual Upfront */}
            <div className="bg-white rounded-card p-8 relative border-2 border-lantern-amber">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maple-green text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                BEST VALUE
              </div>
              <h3 className="font-heading font-bold text-midnight-north text-xl mb-1">Annual Upfront</h3>
              <p className="text-deep-ink/50 text-sm mb-4">Pay once · Full year included</p>
              <p className="font-heading font-bold text-lantern-amber text-5xl mb-1">$149</p>
              <p className="text-deep-ink/60 text-sm mb-6">CAD / year — less than $12.50/month</p>
              <div className="space-y-2 mb-6">
                {[
                  "Everything in Annual plan",
                  "Lowest price available",
                  "One payment, no renewals",
                  "Priority placement in results",
                  "TaxNorth Verified badge",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-maple-green flex-shrink-0" />
                    <span className="text-deep-ink text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-maple-green/10 border border-maple-green/30 rounded-button p-3 mb-4 text-center">
                <p className="text-maple-green text-xs font-semibold">
                  ✓ Money-back guarantee if no clients in 12 months
                </p>
              </div>
              <a href={HELCIM_ANNUAL_UPFRONT} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center bg-maple-green text-white font-semibold py-3 rounded-button hover:opacity-90 transition-opacity">
                Get the best deal
              </a>
            </div>

          </div>

          {/* GUARANTEE BANNER */}
          <div className="bg-midnight-north rounded-card p-6 mt-8 flex items-start gap-4">
            <div className="w-10 h-10 bg-lantern-amber/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Star className="w-5 h-5 text-lantern-amber" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-white mb-1">
                Annual plan guarantee — zero risk.
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                If TaxNorth does not send you at least one new client during your 12-month subscription,
                we refund your full payment at the end of the year. No questions asked.
                Applies to Annual ($19/mo) and Annual Upfront ($149/yr) plans.
              </p>
            </div>
          </div>

          <p className="text-deep-ink/40 text-xs text-center mt-6">
            After payment we contact you within 24 hours to gather your profile information and get you listed.
          </p>
        </div>
      </section>

      {/* TERMS */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            Partnership conditions.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Respond within 24 hours", body: "When a client is matched to you, reach out within 24 hours. Fast response builds trust and improves your conversion rate." },
              { title: "Offer a TaxNorth rate", body: "Clients connected through TaxNorth expect fair, transparent pricing. Offering a special rate builds loyalty and repeat referrals." },
              { title: "Keep your profile current", body: "Your languages, specialties, and availability must reflect your actual practice. Outdated profiles lead to poor matches." },
              { title: "Quality standards apply", body: "TaxNorth reserves the right to remove any professional from the directory following repeated client complaints or verified misconduct." },
              { title: "Billing terms", body: "Monthly plans are charged on the 1st of each month. Annual monthly plans are billed monthly over 12 months. Annual upfront plans have no refund after the first 30 days." },
              { title: "Cancellation", body: "Monthly plans can be cancelled with 30 days notice. Annual monthly plans run for 12 months with no early cancellation. Annual upfront plans are non-refundable after 30 days." },
              { title: "Annual plan money-back guarantee", body: "If TaxNorth does not connect you with at least one new client during your 12-month subscription, we refund your full payment at the end of the year. Applies to Annual ($19/mo) and Annual Upfront ($149/yr) plans only." },
            ].map((item) => (
              <div key={item.title} className="bg-fog-gray rounded-card p-6">
                <h3 className="font-heading font-semibold text-midnight-north mb-2">{item.title}</h3>
                <p className="text-deep-ink/70 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
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
              { icon: <Users className="w-6 h-6 text-lantern-amber" />, title: "Independent CPAs", body: "Solo practitioners and small firms looking to grow their newcomer client base without spending on marketing." },
              { icon: <MapPin className="w-6 h-6 text-lantern-amber" />, title: "Regional tax firms", body: "Firms serving specific cities or provinces who want a steady pipeline of qualified newcomer clients." },
              { icon: <Languages className="w-6 h-6 text-lantern-amber" />, title: "Multilingual practices", body: "Professionals who serve immigrant communities in their language — and want more clients from that community." }
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-card p-8">
                <div className="w-12 h-12 bg-midnight-north rounded-xl flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-heading font-semibold text-midnight-north text-lg mb-2">{card.title}</h3>
                <p className="text-deep-ink/70 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-midnight-north py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-2">
            Ready to grow your practice?
          </h2>
          <p className="text-lantern-amber/80 text-sm font-medium mb-4">
            Founding Member Rate — lock in your price today.
          </p>
          <p className="text-white/70 text-lg mb-8">
            Choose your plan and get listed. We contact you within 24 hours to set up your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={HELCIM_MONTHLY} target="_blank" rel="noopener noreferrer"
              className="border border-white/30 text-white font-semibold px-6 py-3 rounded-button hover:bg-white/10 transition-colors">
              Monthly — $29/mo
            </a>
            <a href={HELCIM_ANNUAL_MONTHLY} target="_blank" rel="noopener noreferrer"
              className="border border-lantern-amber text-lantern-amber font-semibold px-6 py-3 rounded-button hover:bg-lantern-amber hover:text-midnight-north transition-colors">
              Annual — $19/mo
            </a>
            <a href={HELCIM_ANNUAL_UPFRONT} target="_blank" rel="noopener noreferrer"
              className="bg-lantern-amber text-midnight-north font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity">
              Best value — $149/yr
            </a>
          </div>
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
            <Link href="/professionals" className="hover:text-white transition-colors">Find a Professional</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}