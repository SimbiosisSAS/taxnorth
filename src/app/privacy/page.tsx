import { Flashlight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — TaxNorth.ca',
  description: 'How TaxNorth.ca collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-deep-ink/50 text-sm mb-12">
          Effective Date: June 4, 2026
        </p>

        <div className="space-y-10 text-deep-ink leading-relaxed">

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              1. Who we are
            </h2>
            <p>
              TaxNorth.ca is a service of <strong>Ascendant Canada Ltd.</strong>, an Alberta corporation,
              operating under the trade name TaxNorth.ca. We provide AI-powered educational information
              about the Canadian tax system and connect users with independent licensed tax professionals
              across Canada. This Privacy Policy explains how we collect, use, and protect your personal
              information in accordance with the <strong>Personal Information Protection and Electronic
              Documents Act (PIPEDA)</strong> and applicable Canadian privacy laws. You can reach us at{' '}
              <a href="mailto:hello@taxnorth.ca" className="text-lantern-amber hover:opacity-80">
                hello@taxnorth.ca
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              2. Information we collect
            </h2>
            <p className="mb-4">We collect the following types of personal information:</p>

            <p className="font-medium text-midnight-north mb-1">Conversation data</p>
            <p className="mb-4">
              When you use the TaxNorth chat, your messages and AI-generated responses are stored to
              provide conversational continuity and improve the quality and relevance of the service.
            </p>

            <p className="font-medium text-midnight-north mb-1">Contact and profile information</p>
            <p className="mb-4">
              If you request a professional connection, we collect your name, email address, province
              or location, preferred language, and a description of your tax situation.
            </p>

            <p className="font-medium text-midnight-north mb-1">Payment information</p>
            <p className="mb-4">
              When you pay the $19.99 CAD connection fee, payment is processed securely by
              <strong> Helcim</strong>, our payment processor. TaxNorth.ca does not store your credit
              card number or full payment details. We only retain a record of the transaction for
              billing and service purposes.
            </p>

            <p className="font-medium text-midnight-north mb-1">Usage data</p>
            <p>
              We collect limited usage data such as pages visited, session duration, and general
              interaction patterns. This information is used in aggregated or anonymized form where
              possible to improve the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              3. How we use your information
            </h2>
            <p className="mb-3">We use your personal information to:</p>
            <p className="mb-2">— Provide AI-based educational responses about Canadian taxation</p>
            <p className="mb-2">— Operate and improve the Platform</p>
            <p className="mb-2">— Support multilingual service in 12 languages</p>
            <p className="mb-2">— Facilitate connections with independent licensed accountants</p>
            <p className="mb-2">— Process platform access and connection fee payments</p>
            <p className="mb-2">— Communicate with you about your service requests</p>
            <p>— Ensure security and prevent misuse of the Platform</p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              4. Consent
            </h2>
            <p className="mb-4">
              By using TaxNorth.ca, you consent to the collection, use, and processing of your
              personal information as described in this Privacy Policy.
            </p>
            <p className="mb-4">
              When you request a connection with a licensed professional, you explicitly consent to
              the sharing of your relevant contact and tax situation information with that independent
              third-party professional for the purpose of providing services.
            </p>
            <p>
              You may withdraw consent at any time, subject to legal or contractual restrictions,
              by contacting us at hello@taxnorth.ca. Withdrawal of consent may limit your ability
              to use certain features of the Platform.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibond text-midnight-north text-xl mb-3">
              5. Professional services marketplace
            </h2>
            <p className="mb-3">
              TaxNorth connects users with independent licensed accountants across Canadian provinces.
              When a connection is made:
            </p>
            <p className="mb-2">— Your contact information and tax situation summary are shared with the matched professional</p>
            <p className="mb-2">— Accountants are independent third-party professionals</p>
            <p className="mb-2">— TaxNorth.ca does not control or supervise these professionals</p>
            <p className="mb-2">— Any agreement for services is strictly between you and the professional</p>
            <p className="mt-3">
              TaxNorth.ca is not responsible for the quality, accuracy, or outcome of services
              provided by independent professionals.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              6. Third-party service providers
            </h2>
            <p className="mb-4">
              TaxNorth uses third-party service providers to operate and support the Platform,
              including services that process, store, or transmit data on our behalf. These include
              providers for:
            </p>
            <p className="mb-2">— <strong>AI processing:</strong> generating responses to user queries</p>
            <p className="mb-2">— <strong>Database hosting:</strong> storing conversation history and contact information, hosted in Canada</p>
            <p className="mb-2">— <strong>Email delivery:</strong> sending notifications and magic links</p>
            <p className="mb-2">— <strong>Payment processing:</strong> securely handling connection fee transactions (Helcim)</p>
            <p className="mb-2">— <strong>Analytics:</strong> measuring Platform usage in anonymized form</p>
            <p className="mt-3">
              All third-party providers are selected for their compliance with applicable privacy
              and security standards. We do not sell your personal information to any third party.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              7. Data retention
            </h2>
            <p className="mb-3">
              We retain personal information only for as long as necessary to provide the service,
              comply with legal obligations, resolve disputes, and improve Platform functionality.
              Typical retention periods:
            </p>
            <p className="mb-2">— <strong>Conversation data:</strong> up to 12 months after last interaction</p>
            <p className="mb-2">— <strong>Professional connection data:</strong> up to 24 months</p>
            <p className="mb-2">— <strong>Payment records:</strong> as required by Canadian tax law (typically 7 years)</p>
            <p className="mt-3">
              You may request deletion of your personal data at any time by contacting
              hello@taxnorth.ca, subject to our legal retention obligations.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              8. Multilingual service
            </h2>
            <p>
              TaxNorth provides services in 12 languages — English, French, Spanish, Mandarin,
              Arabic, Punjabi, Romanian, Ukrainian, Japanese, Korean, Dari, and Turkish — to improve
              accessibility for newcomers to Canada. Some AI-generated content may be translated
              automatically and may contain inaccuracies. Users should verify critical tax information
              with a licensed professional.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              9. Your rights
            </h2>
            <p className="mb-3">
              Under Canadian privacy law (PIPEDA), you have the right to:
            </p>
            <p className="mb-2">— Access the personal information we hold about you</p>
            <p className="mb-2">— Request correction of inaccurate data</p>
            <p className="mb-2">— Withdraw consent (subject to legal or contractual obligations)</p>
            <p className="mb-2">— Request deletion of your personal information</p>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@taxnorth.ca" className="text-lantern-amber hover:opacity-80">
                hello@taxnorth.ca
              </a>
              . We will respond to all valid requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              10. Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information, including encrypted data transmission, row-level security on our database,
              and secure storage of credentials. Payment data is handled entirely by our PCI-compliant
              payment processor and is never stored on TaxNorth servers. Despite our efforts, no
              system is completely secure — we encourage you to use strong passwords and contact us
              immediately if you suspect unauthorized access to your information.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              11. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The effective date at the top
              of this page indicates when it was last updated. We encourage you to review this page
              periodically. Continued use of TaxNorth.ca after changes constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-midnight-north text-xl mb-3">
              12. Contact
            </h2>
            <p>
              For any privacy-related questions, requests, or concerns, contact us at{' '}
              <a href="mailto:hello@taxnorth.ca" className="text-lantern-amber hover:opacity-80">
                hello@taxnorth.ca
              </a>
              <br />
              <span className="text-deep-ink/50 text-sm">
                Ascendant Canada Ltd. — Alberta, Canada
              </span>
            </p>
          </section>

        </div>
      </div>

      <footer className="border-t border-fog-gray py-8 px-6 text-center">
        <p className="text-deep-ink/40 text-sm">
          © 2026 Ascendant Canada Ltd. operating as TaxNorth.ca — Educational information only, not professional tax advice.
        </p>
      </footer>
    </div>
  )
}