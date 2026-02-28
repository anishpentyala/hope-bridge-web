import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Phone, MessageCircle, Globe, Heart, Users, Shield,
  ExternalLink, ChevronRight, AlertCircle, BookOpen,
  Headphones, Video, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

// ── Data ────────────────────────────────────────────────────────────
const crisisLines = [
  {
    name: '988 Suicide & Crisis Lifeline',
    action: 'Call or text 988',
    href: 'tel:988',
    sms: 'sms:988',
    description: 'Free, confidential support 24/7. Talk to a trained counselor.',
    tag: '24/7 • Free • Confidential',
    color: 'border-red-200 bg-red-50',
    iconColor: 'text-red-500',
    badgeColor: 'bg-red-100 text-red-700',
    icon: Phone,
  },
  {
    name: 'Crisis Text Line',
    action: 'Text HOME to 741741',
    href: 'sms:741741?body=HOME',
    description: 'Text with a trained counselor — no phone call needed. Great for teens.',
    tag: '24/7 • Text-based • Free',
    color: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-500',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: MessageCircle,
  },
  {
    name: 'Trevor Project (LGBTQ+ Youth)',
    action: 'Call 1-866-488-7386',
    href: 'tel:1-866-488-7386',
    description: 'Crisis intervention for LGBTQ+ young people under 25. Also text START to 678-678.',
    tag: '24/7 • LGBTQ+ focused',
    color: 'border-indigo-200 bg-indigo-50',
    iconColor: 'text-indigo-500',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    icon: Heart,
  },
  {
    name: 'SAMHSA National Helpline',
    action: 'Call 1-800-662-4357',
    href: 'tel:1-800-662-4357',
    description: 'Free, confidential treatment referrals for mental health and substance use.',
    tag: '24/7 • Free • Multilingual',
    color: 'border-emerald-200 bg-emerald-50',
    iconColor: 'text-emerald-500',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    icon: Phone,
  },
];

const asianSpecificResources = [
  {
    name: 'Asian Mental Health Collective',
    url: 'https://www.asianmhc.org',
    description: 'Therapist directory, community events, and resources specifically for Asian communities.',
    tags: ['Therapist Directory', 'Community', 'AAPI-specific'],
    icon: Users,
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Asian Counseling & Referral Service (Seattle)',
    url: 'https://acrs.org',
    description: 'Seattle-based organization offering mental health services to API communities in multiple languages.',
    tags: ['Seattle-Based', 'Multilingual', 'Counseling'],
    icon: Globe,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'National Asian American Pacific Islander Mental Health Association',
    url: 'https://naapimha.org',
    description: 'Advocacy, resources, and mental health information for AAPI communities nationwide.',
    tags: ['National', 'Advocacy', 'Resources'],
    icon: Shield,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    name: 'Asian Pacific Islander Family Support Network',
    url: 'https://apifamilysupport.org',
    description: 'Support and resources for API families navigating mental health challenges together.',
    tags: ['Family-focused', 'API', 'Support'],
    icon: Heart,
    color: 'from-emerald-500 to-teal-500',
  },
];

const onlineResources = [
  {
    name: 'Mind Matters (7 Cups)',
    url: 'https://7cups.com',
    description: 'Free online chat with trained listeners. Great for teens who prefer text.',
    format: 'Online Chat',
    icon: MessageCircle,
  },
  {
    name: 'Headspace for Teens',
    url: 'https://www.headspace.com',
    description: 'Guided meditation and mindfulness for managing stress and anxiety.',
    format: 'App',
    icon: Headphones,
  },
  {
    name: 'Teen Line',
    url: 'https://www.teenline.org',
    description: 'Teen-to-teen support. Talk to a fellow teen who understands.',
    format: 'Hotline + Chat',
    icon: Phone,
  },
  {
    name: 'ReachOut Youth Mental Health',
    url: 'https://au.reachout.com',
    description: 'Guides, stories, and tools for teens managing their mental health.',
    format: 'Online Guide',
    icon: BookOpen,
  },
  {
    name: 'OK2Talk',
    url: 'https://ok2talk.org',
    description: 'Community for teens to share stories and find hope. By NAMI.',
    format: 'Community',
    icon: Users,
  },
  {
    name: 'Mental Health America Screening',
    url: 'https://screening.mhanational.org',
    description: 'Free, confidential mental health screenings to understand what you might be feeling.',
    format: 'Self-Screening',
    icon: Shield,
  },
];

const audienceTabs = ['I'm a Teen', 'I'm a Parent', 'I'm an Educator'];

const audienceContent = {
  "I'm a Teen": {
    heading: "You deserve support — and you're brave for looking.",
    body: "It can feel really hard to ask for help, especially when you're worried about what your family might think. But reaching out is a sign of strength, not weakness. HopeBridge's peer support groups are a safe, judgment-free space to talk with other teens who truly get it.",
    resources: [
      "Our peer support circles meet weekly — all anonymous, all free",
      "Connect with a peer mentor who shares your cultural background",
      "Access our story library to know you're not alone",
      "Use any crisis line above anytime — no one needs to know",
    ],
    cta: 'Join a Peer Circle',
    ctaLink: 'Contact',
    color: 'blue',
  },
  "I'm a Parent": {
    heading: "Supporting your teen starts with understanding.",
    body: "Asian families often don't talk openly about mental health — and that's not your fault. It's a cultural pattern we can gently change together. Learning to open these conversations without judgment can transform your relationship with your teen.",
    resources: [
      "Attend our parent education workshops (coming spring 2026)",
      "Download our guide: 'Starting the Mental Health Conversation'",
      "Connect with other parents navigating similar challenges",
      "Find AAPI-culturally aware family therapists in Seattle",
    ],
    cta: 'Contact Us for Parent Resources',
    ctaLink: 'Contact',
    color: 'indigo',
  },
  "I'm an Educator": {
    heading: "Teachers and counselors can be the bridge.",
    body: "School staff often notice signs of struggle before families do. HopeBridge partners with schools to bring culturally informed mental health programming into classrooms and counseling offices across King County.",
    resources: [
      "Bring HopeBridge programming to your school",
      "Access educator guides on Asian teen mental health",
      "Refer students to our peer support groups",
      "Partner with us for a school mental health day",
    ],
    cta: 'Explore School Partnerships',
    ctaLink: 'Schools',
    color: 'sky',
  },
};

// ── Component ────────────────────────────────────────────────────────
export default function GetSupport() {
  const [activeTab, setActiveTab] = useState("I'm a Teen");
  const content = audienceContent[activeTab];

  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700', check: 'text-blue-500' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700', check: 'text-indigo-500' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-200', badge: 'bg-sky-100 text-sky-700', btn: 'bg-sky-600 hover:bg-sky-700', check: 'text-sky-500' },
  };
  const c = colorMap[content.color];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">

      {/* ── HERO ── */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-medium mb-6">
              <Heart className="w-4 h-4 text-red-300" />
              You're Not Alone
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Get the support<br />
              <span className="text-blue-200">you deserve</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Whether you're in crisis right now, looking for ongoing support, or
              trying to help someone you care about — this page is your starting point.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CRISIS FIRST ── */}
      <section className="py-10 px-6 lg:px-8 bg-red-50 border-y border-red-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <h2 className="text-lg font-bold text-red-900">If you're in crisis right now — reach out immediately</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crisisLines.map((line, i) => (
              <motion.div
                key={line.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl border p-5 ${line.color}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm`}>
                  <line.icon className={`w-5 h-5 ${line.iconColor}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1">{line.name}</h3>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">{line.description}</p>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${line.badgeColor}`}>
                  {line.tag}
                </span>
                <div className="mt-1">
                  <a
                    href={line.href}
                    className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 hover:underline"
                  >
                    {line.action} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO ARE YOU? ── */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Where do you need support?</h2>
            <p className="text-gray-600">We'll show you resources tailored for you.</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {audienceTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border ${c.border} ${c.bg} p-8 lg:p-10`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{content.heading}</h3>
            <p className="text-gray-600 leading-relaxed mb-7">{content.body}</p>
            <ul className="space-y-3 mb-8">
              {content.resources.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.check}`} />
                  <span className="text-gray-700 text-sm">{r}</span>
                </li>
              ))}
            </ul>
            <Link to={createPageUrl(content.ctaLink)}>
              <Button className={`${c.btn} text-white rounded-full px-8 font-semibold`}>
                {content.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── ASIAN-SPECIFIC RESOURCES ── */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-4">
              Culturally-Informed
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Resources for Asian &amp; AAPI Communities
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              These organizations understand the unique cultural challenges Asian American teens face.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {asianSpecificResources.map((res, i) => (
              <motion.a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${res.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <res.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors">{res.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{res.description}</p>
                <div className="flex flex-wrap gap-1">
                  {res.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-3 font-semibold">
                  Visit <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONLINE RESOURCES ── */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Online &amp; Self-Help Resources
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Tools, apps, and communities you can access anytime — no appointment needed.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {onlineResources.map((res, i) => (
              <motion.a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <res.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{res.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{res.format}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{res.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOPEBRIDGE CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Connect with HopeBridge
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Our peer support groups are run by Asian teens, for Asian teens.
              Join us for a free, anonymous session — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-white hover:bg-gray-50 text-blue-700 font-bold rounded-full px-8 py-6 text-base shadow-xl hover:shadow-2xl transition-all duration-300">
                  Join a Support Group <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('Programs')}>
                <Button variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300">
                  See All Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
