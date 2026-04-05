import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CountUp from '../components/CountUp';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

// ── Data ────────────────────────────────────────────────────────────────────

const impactStats = [
  { value: '2 hrs', label: 'Typical volunteer/week' },
  { value: '$25', label: 'Funds one session' },
  { value: '5K+', label: 'Teens we aim to reach' },
];

const volunteerRoles = [
  {
    title: 'Peer Mentor',
    commitment: '2–3 hrs / week',
    description: 'Walk alongside a teen who needs guidance. Share your experiences and provide a steady, trusted presence.',
    skills: ['Empathy', 'Active listening', 'Shared cultural background'],
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    title: 'Workshop Facilitator',
    commitment: '4–6 hrs / month',
    description: 'Lead group workshops on topics like identity, stress, academic pressure, and family dynamics.',
    skills: ['Public speaking', 'Mental health interest', 'Teen experience'],
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    title: 'Community Outreach',
    commitment: '2–4 hrs / month',
    description: 'Help us reach more teens and families through tabling at events, school visits, and social media.',
    skills: ['Communication', 'Community ties', 'Social media savvy'],
    gradient: 'from-blue-600 to-blue-700',
  },
  {
    title: 'Event Support',
    commitment: 'As needed',
    description: 'Help run our community events, fundraisers, and awareness campaigns. Great for one-time or flexible involvement.',
    skills: ['Organization', 'Enthusiasm', 'Any background'],
    gradient: 'from-blue-600 to-blue-700',
  },
];

const donationTiers = [
  {
    amount: '$25',
    label: 'Supporter',
    impact: 'Covers one peer support session for a teen',
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    amount: '$50',
    label: 'Advocate',
    impact: 'Provides workshop materials for a full group',
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    featured: true,
  },
  {
    amount: '$100',
    label: 'Champion',
    impact: "Sponsors a teen's participation for a full month",
    color: 'border-blue-200 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
];

const shareMessages = [
  {
    platform: 'Instagram',
    text: '"Did you know 1 in 4 Asian teens struggle with mental health in silence? HopeBridge is changing that. Share to spread the word."',
    gradient: 'from-blue-600 to-blue-500',
  },
  {
    platform: 'LinkedIn',
    text: '"HopeBridge is a youth-founded nonprofit bringing culturally-informed mental health support to Asian teens in Seattle."',
    gradient: 'from-blue-600 to-blue-500',
  },
  {
    platform: 'Text a friend',
    text: "\"There's this nonprofit called HopeBridge doing really important work for Asian teen mental health, thought you'd want to know.\"",
    gradient: 'from-blue-600 to-blue-500',
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function GetInvolved() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Join us in building<br />
              <span className="text-blue-200">lasting change</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Whether you have time, resources, or a platform, every contribution
              helps Asian teens in our community feel seen and supported.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VOLUNTEER ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50" id="volunteer">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Give your time</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Even a few hours a month can change a teen's trajectory. Pick the role that fits your life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10">
            {volunteerRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
<div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base">{role.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium whitespace-nowrap ml-2 flex-shrink-0">
                      {role.commitment}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{role.description}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {role.skills.map((s) => (
                      <li key={s} className="text-xs text-gray-600">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl('Volunteer')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                Apply to Volunteer <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section className="py-16 px-6 lg:px-8 bg-white" id="donate">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Fund the mission</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              All our programs are 100% free for teens. Your donation makes that possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-10">
            {donationTiers.map((tier, i) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-lg border p-6 text-center ${tier.color} ${tier.featured ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow">Most Impactful</span>
                  </div>
                )}
                <div className="text-4xl font-black text-gray-900 mb-1">{tier.amount}</div>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${tier.badge}`}>{tier.label}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{tier.impact}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl('Donate')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                Make a Donation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPREAD THE WORD ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50" id="spread">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Amplify our message</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Sharing takes 30 seconds and can connect a struggling teen with the help they need.
              Copy a message below and paste it wherever feels right.
            </p>
          </motion.div>

          <div className="space-y-4">
            {shareMessages.map((msg, i) => (
              <motion.div
                key={msg.platform}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="py-5 border-t border-blue-200 flex items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{msg.platform}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
                </div>
                <button
                  onClick={() => handleCopy(msg.text.replace(/^"|"$/g, ''), i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    copiedIdx === i
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {copiedIdx === i ? 'Copied!' : 'Copy'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER ── */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50" id="partner">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Schools & organizations, let's collaborate
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                HopeBridge partners with schools, districts, mental health organizations,
                and community groups to bring culturally-informed programming directly
                where Asian teens already are.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'In-school workshops and presentations',
                  'Student referral pathways',
                  'Staff professional development on AAPI mental health',
                  'Co-branded mental health awareness campaigns',
                ].map((item) => (
                  <li key={item} className="text-sm text-gray-700">{item}</li>
                ))}
              </ul>
              <Link to={createPageUrl('Partnerships')}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                  Explore Partnerships <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Schools', desc: 'Bring HopeBridge programming to your students' },
                { label: 'Nonprofits', desc: 'Collaborate on joint programming and outreach' },
                { label: 'Therapists', desc: 'Refer clients and co-create mental health resources' },
                { label: 'Community Orgs', desc: 'Partner on events, campaigns, and awareness drives' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{item.label}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Every action creates ripples
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              One volunteer. One donor. One person sharing our story.
              That's how movements start, and that's how teens find hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Volunteer')}>
                <Button className="bg-white hover:bg-gray-50 text-blue-700 font-bold rounded-lg px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                  Volunteer With Us <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Donate')}>
                <Button className="bg-white hover:bg-gray-50 !text-blue-700 font-bold rounded-lg px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                  Donate Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
