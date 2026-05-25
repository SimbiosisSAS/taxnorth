import { Flashlight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — TaxNorth.ca',
  description: 'Terms and conditions for using TaxNorth.ca, the AI-powered tax guide for newcomers to Canada.',
}

export default function TermsPage() {
  return (
    <div>
      <nav className="border-b border-fog-gray bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-midnight-north rounded-lg flex items-center justify-center">
              <Flashlight className="w-4 h-4 text-lantern-amber" />
            </div>
            <span className="font-heading font-bold text-midnight-north">
              TaxNorth<span className="text-sm">.ca</span>
            </span>
          </Link>
          <Link href="/chat" className="text-lantern-amber font-semibold text-sm hover:opacity-80 transition-opacity">
            Back to TaxNorth
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-heading font-bold text-midnight-north text-4xl mb-2">
          Terms of Service
        </h1>
        <p className="text-deep-ink/50 text-sm mb-12">Last updated: May 25, 2026</p>

        <div className="space-y-10 text-deep-ink leading-relaxed">

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              1. About TaxNorth
            </h2>
            <p>
              TaxNorth.ca provides AI-powered educational information about the Canadian tax system for newcomers to Canada. By using TaxNorth, you agree to these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              2. Educational purpose only — not professional tax advice
            </h2>
            <p className="mb-4">
              TaxNorth provides general educational information about Canadian taxes. The information provided by TaxNorth, including all AI-generated responses, does not constitute professional tax advice, legal advice, or financial advice.
            </p>
            <p className="mb-4">
              TaxNorth is not a licensed tax preparer, accountant, or legal professional. The AI system may make errors, may not reflect the most current tax laws, and cannot account for the specific circumstances of your individual situation.
            </p>
            <p>
              You should always verify important tax information with the Canada Revenue Agency at canada.ca and consult a licensed tax professional for advice specific to your situation before making tax-related decisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              3. Professional referrals
            </h2>
            <p>
              When TaxNorth connects you with a tax professional through the /connect page, TaxNorth acts as a referral service only. TaxNorth does not endorse, warrant, or guarantee the services of any referred professional. The relationship formed is solely between you and the tax professional. TaxNorth is not responsible for the quality, accuracy, or outcome of any professional services provided.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              4. Acceptable use
            </h2>
            <p className="mb-4">You agree to use TaxNorth only for lawful purposes and in a manner consistent with these Terms. You must not:</p>
            <p className="mb-2">— Use TaxNorth to provide tax advice to third parties</p>
            <p className="mb-2">— Attempt to reverse-engineer, copy, or reproduce the TaxNorth system</p>
            <p className="mb-2">— Submit false or misleading information through any form</p>
            <p>— Use the service in any way that could harm TaxNorth or other users</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              5. AI limitations
            </h2>
            <p>
              TaxNorth uses artificial intelligence to generate responses. AI systems can make mistakes, misinterpret questions, or provide information that is incomplete or outdated. TaxNorth makes no warranty, express or implied, regarding the accuracy, completeness, or timeliness of any information provided by the AI system. Tax laws change frequently — always verify current rules with the CRA.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              6. Limitation of liability
            </h2>
            <p>
              To the maximum extent permitted by applicable Canadian law, TaxNorth shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service or reliance on any information provided, including but not limited to tax penalties, interest charges, or missed filing deadlines. Your use of TaxNorth is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              7. Intellectual property
            </h2>
            <p>
              All content, design, and code on TaxNorth.ca is owned by TaxNorth and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of TaxNorth without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              8. Changes to these terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. The date at the top of this page indicates when the terms were last updated. Continued use of TaxNorth after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              9. Governing law
            </h2>
            <p>
              These Terms of Service are governed by the laws of the Province of Alberta and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Alberta.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              10. Contact
            </h2>
            <p>
              Questions about these terms? Contact us at{' '}
              <a href="mailto:hello@taxnorth.ca" className="text-lantern-amber hover:opacity-80 transition-opacity">
                hello@taxnorth.ca
              </a>
            </p>
          </section>

        </div>
      </div>

      <footer className="border-t border-fog-gray py-8 px-6 text-center">
        <p className="text-deep-ink/40 text-sm">
          © 2026 TaxNorth.ca — Educational information only, not professional tax advice.
        </p>
      </footer>
    </div>
  )
}