import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, MessageCircle, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const programs = [
  {
    icon: Users,
    title: 'Support Sessions',
    description: 'Safe, facilitated sessions where Asian teens share experiences and find support from others who understand the cultural context.',
    gradient: 'from-blue-600 to-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    tag: 'Weekly',
    tagColor: 'bg-blue-100 text-blue-700',
    highlights: ['Trained peer mentors', 'Confidential & safe', 'Culturally informed'],
  },
  {
    icon: BookOpen,
    title: 'Workshops & Discussions',
    description: 'Interactive sessions on stress management, identity exploration, family communication, and building resilience — all through a culturally informed lens.',
    gradient: 'from-indigo-600 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    tag: 'Monthly',
    tagColor: 'bg-indigo-100 text-indigo-700',
    highlights: ['Identity exploration', 'Stress management', 'Family communication'],
  },
  {
    icon: MessageCircle,
    title: 'Resource Hub',
    description: 'Access culturally relevant mental health resources, self-care tools, and connections to professional support whenever you need it.',
    gradient: 'from-sky-600 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    tag: 'Always Open',
    tagColor: 'bg-sky-100 text-sky-700',
    highlights: ['24/7 resource access', 'Professional referrals', 'Self-care toolkit'],
  },
  {
    icon: Sparkles,
    title: 'Community Events',
    description: 'Connect with other Asian teens through creative workshops, wellness activities, and community-building events throughout the year.',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    tag: 'Seasonal',
    tagColor: 'bg-cyan-100 text-cyan-700',
    highlights: ['Creative workshops', 'Wellness activities', 'Community building'],
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Static bg accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-2xl" />
        <div className="absolute top-1/3 -right-10 w-64 h-64 bg-indigo-100/30 rounded-full blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="pt-16 pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              All Programs Are Free
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Programs designed with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                cultural understanding
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Created specifically for Asian American teens navigating the unique challenges
              of identity, family expectations, and mental wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMS GRID ── */}
      <section className="py-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${program.bg} rounded-2xl p-8 border ${program.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Top gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${program.tagColor}`}>
                    {program.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${program.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER STAT ROW ── */}
      <section className="py-14 px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-blue-200 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { stat: '4', label: 'Programs' },
              { stat: '100%', label: 'Free' },
              { stat: 'K-12', label: 'All Ages' },
              { stat: 'King Co.', label: 'Serving' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-black mb-1">{stat}</div>
                <div className="text-white/70 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Ready to Get <span className="text-shimmer">Involved?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Join one of our programs or reach out to learn more about how we can support you.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="glow-hover bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
