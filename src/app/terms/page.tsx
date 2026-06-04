import { Flashlight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms and Conditions — TaxNorth.ca',
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
          Terms and Conditions
        </h1>
        <p className="text-deep-ink/50 text-sm mb-12">
          Effective Date: June 4, 2026
        </p>

        <div className="space-y-10 text-deep-ink leading-relaxed">

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              1. Overview
            </h2>
            <p className="mb-3">
              TaxNorth.ca ("the Platform", "we", "us") is a digital platform based in Canada that provides:
            </p>
            <p className="mb-2">— AI-powered educational information about Canadian taxation</p>
            <p className="mb-2">— Tax-related informational content in 12 languages</p>
            <p className="mb-2">— A connection service to independent licensed accounting professionals across Canadian provinces</p>
            <p className="mt-3">
              The Platform is not affiliated with the Canada Revenue Agency or any government body.
              By using TaxNorth.ca, you agree to these Terms and Conditions. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              2. Educational Content — AI Service
            </h2>
            <p className="mb-3">
              The AI chatbot provides general informational content only. It does not constitute professional tax advice,
              legal advice, or financial advice. Specifically, the AI:
            </p>
            <p className="mb-2">— Does not provide professional tax advice</p>
            <p className="mb-2">— Does not prepare or file tax returns</p>
            <p className="mb-2">— Does not guarantee accuracy or completeness of responses</p>
            <p className="mb-2">— Is intended for educational purposes only</p>
            <p className="mt-3">
              AI systems can make mistakes, misinterpret questions, or provide information that is incomplete or
              outdated. Tax laws change frequently — always verify current rules with the Canada Revenue Agency
              at canada.ca. Users are responsible for verifying all information with qualified professionals
              before making any tax or financial decisions.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              3. Professional Services Marketplace
            </h2>
            <p className="mb-3">
              TaxNorth.ca connects users with independent, licensed accountants ("Professionals") located
              across Canadian provinces. Important:
            </p>
            <p className="mb-2">— Professionals are independent third parties</p>
            <p className="mb-2">— TaxNorth.ca does not employ, supervise, or control these professionals</p>
            <p className="mb-2">— Any tax advice or services are provided solely by the Professional</p>
            <p className="mb-2">— Any agreement for services is strictly between the user and the Professional</p>
            <p className="mt-3">
              TaxNorth.ca acts as a referral and connection service only. We do not endorse, warrant, or
              guarantee the services of any referred professional and are not responsible for the quality,
              accuracy, or outcome of any professional services provided.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              4. Connection Fee
            </h2>
            <p className="mb-3">
              Users may be charged a <strong>CAD $19.99 connection fee</strong> to access the professional
              matching service. This fee covers:
            </p>
            <p className="mb-2">— Platform access and matching services</p>
            <p className="mb-2">— Referral to a licensed professional in your province</p>
            <p className="mb-2">— Multilingual support access</p>
            <p className="mt-3 mb-3">This fee does <strong>not</strong> include:</p>
            <p className="mb-2">— Tax preparation or tax filing services</p>
            <p className="mb-2">— Professional advisory services</p>
            <p className="mb-2">— Any services provided directly by the accountant</p>
            <p className="mt-3">
              All fees are charged in Canadian dollars. Payment is processed securely through our
              payment provider. Fees are non-refundable once the professional connection has been made.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              5. Multilingual Service
            </h2>
            <p>
              The Platform provides content and support in 12 languages — English, French, Spanish, Mandarin,
              Arabic, Punjabi, Romanian, Ukrainian, Japanese, Korean, Dari, and Turkish — to improve
              accessibility for newcomers in Canada. Some translations may be AI-generated and may contain
              inaccuracies. Users should verify critical tax information in their preferred language with a
              licensed professional.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              6. Acceptable Use
            </h2>
            <p className="mb-3">You agree to use TaxNorth.ca only for lawful purposes. You must not:</p>
            <p className="mb-2">— Use TaxNorth.ca to provide tax advice to third parties</p>
            <p className="mb-2">— Attempt to reverse-engineer, copy, or reproduce the TaxNorth system</p>
            <p className="mb-2">— Submit false or misleading information through any form</p>
            <p className="mb-2">— Use the service in any way that could harm TaxNorth.ca or other users</p>
            <p className="mt-3">
              You agree to provide accurate information, verify tax information independently,
              and use the Platform responsibly and lawfully.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              7. Third-Party Services
            </h2>
            <p>
              TaxNorth.ca uses third-party services to operate, including AI processing, database hosting,
              email delivery, and payment processing. We are not responsible for the actions, advice, or
              quality of services provided by independent accountants or other third parties. Disputes
              between users and professionals are to be resolved directly between those parties.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              8. Limitation of Liability
            </h2>
            <p className="mb-3">
              To the maximum extent permitted by applicable Canadian law, TaxNorth.ca shall not be liable for:
            </p>
            <p className="mb-2">— Decisions made based on AI-generated content</p>
            <p className="mb-2">— Actions taken by independent professionals</p>
            <p className="mb-2">— Tax penalties, interest charges, or missed filing deadlines</p>
            <p className="mb-2">— Any direct, indirect, incidental, or consequential damages</p>
            <p className="mt-3">
              We do not guarantee tax outcomes or financial results. Your use of TaxNorth.ca is
              entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              9. Intellectual Property
            </h2>
            <p>
              All content, design, and code on TaxNorth.ca is owned by TaxNorth and protected by applicable
              intellectual property laws. You may not reproduce, distribute, or create derivative works from
              any part of TaxNorth without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms and Conditions at any time. The effective date at the top of this
              page indicates when the terms were last updated. Continued use of TaxNorth.ca after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              11. Governing Law
            </h2>
            <p>
              These Terms and Conditions are governed by the laws of the Province of Alberta and the
              federal laws of Canada applicable therein. Any disputes shall be resolved in the courts
              of Alberta.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              12. Contact
            </h2>
            <p>
              For any questions about these Terms and Conditions, contact us at{' '}
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