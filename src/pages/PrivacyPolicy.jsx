import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEOHead
        title="Privacy Policy"
        description="HopeBridge's privacy policy explains how we collect, use, and protect your personal information."
        path="/PrivacyPolicy"
        noIndex={true}
      />
      <section className="pt-16 pb-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last updated: February 2026</p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Who We Are</h2>
                <p>
                  HopeBridge Community Services ("HopeBridge," "we," "us," or "our") is a youth-led
                  organization focused on supporting the mental health and wellness of Asian American teens.
                  We are based in Sammamish, Washington and serve the greater King County area.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                <p>We collect the following information when you voluntarily provide it through our website:</p>
                <p className="mt-2">
                  <strong>Contact forms:</strong> Name, email address, school or organization name, message content, and the category you select (student, parent, school representative, etc.).
                </p>
                <p className="mt-2">
                  <strong>Story submissions:</strong> Name (or anonymous submission), story text, and any optional media you upload.
                </p>
                <p className="mt-2">
                  <strong>Volunteer applications:</strong> Name, email, age range, school, availability, areas of interest, and your reason for volunteering.
                </p>
                <p className="mt-2">
                  We do not collect sensitive health information, financial data (beyond what Stripe processes directly), or government identification numbers.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <p className="mt-2">
                  Respond to your inquiries and messages. Process volunteer applications. Share stories on our platform (only with your consent). Improve our programs and website. Send occasional updates about HopeBridge programs (you can opt out at any time).
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Protect Your Information</h2>
                <p>
                  We use Formspree (for form processing), Supabase (for data storage), and Vercel (for hosting).
                  Each of these services uses industry-standard encryption and security practices. We do not sell,
                  rent, or share your personal information with third parties for marketing purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Young Users</h2>
                <p>
                  HopeBridge is designed for teenagers and young people. We are committed to protecting the privacy
                  of young users. We do not knowingly collect information from children under 13 without parental consent.
                  If you are a parent or guardian and believe your child has provided us with personal information,
                  please contact us and we will promptly delete it.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h2>
                <p>
                  You have the right to request access to, correction of, or deletion of your personal information
                  at any time. You can opt out of any communications. To exercise these rights, contact us at the
                  email below.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
                <p>
                  Our website uses minimal cookies required for functionality (session management and form submission).
                  We do not use advertising cookies or tracking pixels.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify users of significant changes
                  by posting a notice on our website.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="flex items-center gap-2 mt-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a href="mailto:hopebridgecommunityservices@gmail.com" className="text-blue-600 hover:underline">
                    hopebridgecommunityservices@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
