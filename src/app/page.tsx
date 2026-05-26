import { Flashlight, Plane, GraduationCap, Star, MessageCircle, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {

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
          { "@type": "Question", "name": "What is a T4 slip in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "A T4 slip is a Statement of Remuneration Paid issued by your employer. It shows your total employment income and the amounts deducted for income tax, CPP contributions, and EI premiums. You need your T4 to file your tax return." } },
          { "@type": "Question", "name": "What is the GST/HST credit for newcomers?", "acceptedAnswer": { "@type": "Answer", "text": "The GST/HST credit is a tax-free quarterly payment from the Canadian government to help people with low and modest incomes offset the sales tax they pay. Newcomers may be eligible in their first year. You receive it automatically by filing your tax return." } },
          { "@type": "Question", "name": "How do international students file taxes in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "International students who live in Canada for more than 183 days are generally considered Canadian residents for tax purposes and should file a tax return. You can claim the tuition tax credit using your T2202 form from your school. Even with low income, filing helps you access GST/HST credits." } }
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
      <script
        type="application/ld+json"
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
  <Link href="/resources" className="hover:text-midnight-north transition-colors">Resources</Link>
  <Link href="/professionals" className="hover:text-midnight-north transition-colors">Find a Pro</Link>
</div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="bg-lantern-amber text-midnight-north font-semibold text-sm px-4 py-2 rounded-button hover:opacity-90 transition-opacity"
            >
              Start for free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-midnight-north min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Flashlight className="w-8 h-8 text-lantern-amber" />
          </div>
          <h1 className="font-heading font-bold text-white text-4xl md:text-6xl mb-6 leading-tight">
            Taxes that finally click.
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Your AI guide to Canadian taxes — in any language, for every newcomer.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-lantern-amber text-midnight-north font-semibold text-base px-8 py-4 rounded-button hover:opacity-90 transition-opacity mb-4"
          >
            Ask your first question →
          </Link>
          <p className="text-white/50 text-sm mt-3">
            Free to use. No account required.
          </p>
        </div>
      </section>

      {/* SURPRISE SECTION */}
      <section className="bg-warm-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p className="text-lantern-amber font-semibold text-sm uppercase tracking-widest mb-4">
              Most newcomers don't know this
            </p>
            <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl mb-6 leading-tight">
              The Canadian government wants to give you money.
            </h2>
            <p className="text-deep-ink text-lg leading-relaxed mb-6">
              Most newcomers assume filing taxes means paying taxes. The opposite
              is often true. GST/HST credits, Canada Workers Benefit, Climate
              Action Incentive — these benefits are designed for people like you.
              They don't come to you automatically. They're triggered by a single
              tax return. Every year you don't file, you're not avoiding taxes.
              You're declining free money.
            </p>
            <Link href="/chat" className="text-lantern-amber font-semibold hover:opacity-80 transition-opacity">
              Find out what you're owed →
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="bg-midnight-north rounded-card p-8 text-center">
              <p className="font-heading font-bold text-lantern-amber text-6xl mb-3">$500+</p>
              <p className="text-white text-sm leading-relaxed">
                Average annual benefits unclaimed by newcomers who don't file
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-fog-gray py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl text-center mb-12">
            Simple from the first question.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: "01", icon: <MessageCircle className="w-5 h-5 text-midnight-north" />, title: "Ask anything", body: "Describe your situation in any language. No tax knowledge required." },
              { number: "02", icon: <Lightbulb className="w-5 h-5 text-midnight-north" />, title: "Get clarity", body: "TaxNorth explains what applies to you — simply, without jargon, at your pace." },
              { number: "03", icon: <Users className="w-5 h-5 text-midnight-north" />, title: "Connect when ready", body: "When your situation needs a professional, we make the introduction." }
            ].map((step) => (
              <div key={step.number} className="bg-white rounded-card p-8 shadow-sm">
                <p className="font-heading font-bold text-lantern-amber text-4xl mb-4">{step.number}</p>
                <div className="w-10 h-10 bg-fog-gray rounded-lg flex items-center justify-center mb-4">{step.icon}</div>
                <h3 className="font-heading font-semibold text-midnight-north text-xl mb-2">{step.title}</h3>
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
            Built for everyone who's new to this.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Plane className="w-6 h-6 text-lantern-amber" />, title: "New to Canada", body: "Permanent residents and immigrants navigating their first tax season in a new country." },
              { icon: <GraduationCap className="w-6 h-6 text-lantern-amber" />, title: "Studying or Working", body: "International students and work permit holders unsure of their obligations." },
              { icon: <Star className="w-6 h-6 text-lantern-amber" />, title: "First-time filer", body: "Young adults filing alone for the first time without parental guidance." }
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
        Why it matters who does your taxes
      </p>
      <h2 className="font-heading font-bold text-midnight-north text-3xl md:text-4xl leading-tight">
        You probably know someone who learned this the hard way.
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {[
        {
          number: "01",
          title: "The CRA letter nobody expected",
          body: "A friend followed their accountant's advice. A year later, a CRA audit. Back taxes, penalties, and stress that could have been avoided. Bad tax advice doesn't show up immediately — it shows up when it's too late."
        },
        {
          number: "02",
          title: "The free option that costs more",
          body: "University and community programs mean well. But the person filing your return is still learning. You're not their client — you're their practice case. Your real situation, your real money, their learning curve."
        },
        {
          number: "03",
          title: "Tax software weren't built for you",
          body: "Same questions for everyone, hundreds of returns a day — and no room to ask yours."
        }
      ].map((item) => (
        <div key={item.number} className="bg-white rounded-card p-8 shadow-sm">
          <p className="font-heading font-bold text-lantern-amber text-3xl mb-4">{item.number}</p>
          <h3 className="font-heading font-semibold text-midnight-north text-lg mb-3">{item.title}</h3>
          <p className="text-deep-ink/60 leading-relaxed text-sm">{item.body}</p>
        </div>
      ))}
    </div>

    <div className="bg-midnight-north rounded-card p-8 md:p-12">
      <div className="md:grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h3 className="font-heading font-bold text-white text-2xl mb-4">
            Small firms. Big expertise.
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            The best tax professionals for newcomers are often small firms led by experienced entrepreneurs. They built their practice to serve a specific community — and they show up for every client personally.
          </p>
          <p className="text-white/70 leading-relaxed">
            They offer quality service at a fair price, and because their reputation depends on results, they go further than any standardized process ever could.
          </p>
        </div>
        <div className="mt-8 md:mt-0">
          <h3 className="font-heading font-bold text-white text-2xl mb-4">
            TaxNorth verifies who we work with.
          </h3>
          <div className="space-y-3">
            {[
              "We know their background and years of experience",
              "We verify they specialize in newcomer situations",
              "We confirm they offer fair, transparent pricing",
              "We stand behind every connection we make"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-lantern-amber/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-lantern-amber rounded-full" />
                </div>
                <span className="text-white/70 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FINAL CTA */}
      <section className="bg-midnight-north py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4">
            Your taxes. Finally yours.
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Start a conversation. No account. No commitment. Just clarity.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-lantern-amber text-midnight-north font-semibold px-8 py-4 rounded-button hover:opacity-90 transition-opacity"
          >
            Start the conversation →
          </Link>
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
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <Link href="/professionals" className="hover:text-white transition-colors">Find a Pro</Link>
              <Link href="/partners" className="hover:text-white transition-colors">For Professionals</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/connect" className="hover:text-white transition-colors whitespace-nowrap">Connect with a Pro</Link>
            </div>
          </div>
          <p className="text-white/40 text-xs text-center leading-relaxed">
            TaxNorth provides educational information only and does not constitute
            professional tax advice. For advice specific to your situation,
            consult a licensed tax professional in Canada.
          </p>
        </div>
      </footer>

    </div>
  )
}