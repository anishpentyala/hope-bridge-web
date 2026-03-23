import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar, MapPin, Image as ImageIcon, Users, Heart,
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

const programs = [
  {
    title: 'Workshops & Discussions',
    description: 'Interactive sessions on stress management, identity exploration, family communication, and building resilience, all through a culturally informed lens.',
    gradient: 'from-blue-600 to-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    tag: 'Monthly',
    tagColor: 'bg-blue-100 text-blue-700',
    highlights: ['Identity exploration', 'Stress management', 'Family communication'],
  },
  {
    title: 'Resource Hub',
    description: 'Access culturally relevant mental health resources, self-care tools, and connections to professional support whenever you need it.',
    gradient: 'from-sky-600 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    tag: 'Always Open',
    tagColor: 'bg-sky-100 text-sky-700',
    highlights: ['24/7 resource access', 'Professional referrals', 'Self-care toolkit'],
    link: 'Resources',
  },
];

// Previous events data
const pastEvents = [
  {
    title: 'Hope Bridge Launch Event',
    date: 'Spring 2025',
    location: 'Sammamish, WA',
    description: 'The founding launch of HopeBridge Community Services, bringing together teens, families, and community members to kick off our mission.',
  },
  {
    title: 'Community Awareness Workshop',
    date: 'Spring 2025',
    location: 'Sammamish, WA',
    description: 'An interactive workshop exploring identity, family expectations, and mental wellness through a culturally informed lens.',
  },
  {
    title: 'Story Sharing Night',
    date: 'Spring 2025',
    location: 'Sammamish, WA',
    description: 'Teens gathered to share experiences around family pressures, cultural identity, and academic stress in a safe, supportive environment.',
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      <PageBackground />
      {/* Static bg accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

<div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      {/* ── HERO ── */}
      <section className="pt-20 pb-20 px-6 lg:px-8 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Programs designed with{' '}
              <span className="text-blue-200">
                cultural understanding
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Created specifically for Asian American teens navigating the unique challenges
              of identity, family expectations, and mental wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMS GRID ── */}
      <section className="py-16 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${program.bg} rounded-2xl p-8 border ${program.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.gradient}`} />
                <div className="flex items-start justify-between mb-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${program.tagColor}`}>
                    {program.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{program.description}</p>
                <ul className="space-y-2 mb-4">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      {h}
                    </li>
                  ))}
                </ul>
                {program.link && (
                  <Link to={createPageUrl(program.link)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2">
                    View Resources <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAST PROGRAMS ── */}
      <section className="pt-24 pb-10 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              Past Programs
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A look back at the events and initiatives that have shaped our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CLUB DROP-INS ── */}
      <section className="pt-10 pb-20 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-300" />
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Community Outreach
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Club Drop-Ins
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                We hosted over <span className="text-blue-300 font-bold">5 interactive drop-in sessions</span> at Key Clubs and student organizations across <span className="text-blue-300 font-bold">5 Lake Washington high schools</span> — Eastlake, Issaquah, Redmond, Skyline, and through the Sammamish Community Club — reaching over <span className="text-blue-300 font-bold">150 students</span> directly. Each session brought HopeBridge into club meetings where we led discussions on our three core pillars: <span className="text-blue-300 font-semibold">cultural identity</span>, <span className="text-blue-300 font-semibold">academic pressure</span>, and <span className="text-blue-300 font-semibold">family disconnect</span>.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Students heard from teen peers who understand the challenges of growing up between two cultures, asked questions in a judgment-free space, and contributed to our Story Project. These drop-ins collected over <span className="text-white font-semibold">60 handwritten story submissions</span>, expanded HopeBridge from 1 school to a <span className="text-white font-semibold">5-school network</span> across the Lake Washington School District, and built lasting partnerships with Key Club chapters — connecting students with mental health resources designed specifically for Asian American teens.
              </p>
            </div>
          </motion.div>

          {/* Photo grid - 3x3 */}
          <div className="grid grid-cols-3 gap-3">
            {[
              '/images/community/dropin-01.jpg',
              '/images/community/dropin-02.jpg',
              '/images/community/dropin-03.jpg',
              '/images/community/dropin-07.jpg',
              '/images/community/dropin-04.jpg',
              '/images/community/dropin-08.jpg',
              '/images/community/dropin-09.jpg',
              '/images/community/dropin-11.jpg',
              '/images/community/dropin-06.jpg',
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300">
                  <img
                    src={src}
                    alt={`Club Drop-In session ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── MENTAL HEALTH AWARENESS BOOTHS ── */}
      <section className="pt-10 pb-20 px-6 lg:px-8 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-blue-300" />
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Community Events
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Mental Health Awareness Booths
            </h2>
            <div className="max-w-3xl">
              <p className="text-white/80 text-lg leading-relaxed">
                We set up <span className="text-blue-300 font-bold">2 Mental Health Awareness Booths</span> at Woodinville High School and at Skyline High School's Holiday Bazaar in December 2025, engaging over <span className="text-blue-300 font-bold">120 students</span> across both events. Each booth featured a community story wall that collected <span className="text-blue-300 font-bold">40+ handwritten stories</span>, a mental health survey completed by <span className="text-blue-300 font-bold">75 students</span>, and lollipop giveaways to spark conversations about the challenges facing Asian American teens.
              </p>
            </div>
          </motion.div>

          {/* Photo grid - 3x2 */}
          <div className="grid grid-cols-3 gap-3">
            {[
              '/images/community/booth-01.jpg',
              '/images/community/booth-02.jpg',
              '/images/community/booth-03.jpg',
              '/images/community/booth-04.jpg',
              '/images/community/booth-05.jpg',
              null,
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                {src ? (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300">
                    <img
                      src={src}
                      alt={`Mental Health Awareness Booth ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 bg-white/10 flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-white/30" />
                    <p className="text-xs text-white/40 font-medium">Photo Coming Soon</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PHOTO GALLERY ── */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Our Community in Action
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Snapshots from our workshops, story sharing sessions, and community events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: '/images/community/writing-workshop-1.jpg', alt: 'Student writing during a workshop activity' },
              { src: '/images/community/group-discussion.jpg', alt: 'Students collaborating during a group discussion' },
              { src: '/images/community/presentation-prompts.jpg', alt: 'Workshop presentation with writing prompts on screen' },
              { src: '/images/community/writing-workshop-2.jpg', alt: 'Student focused on a writing exercise' },
              { src: '/images/community/story-wall.jpg', alt: 'Student pinning written stories to a shared story wall' },
            ].map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Ready to Get Involved?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Join one of our programs or reach out to learn more about how we can support you.
            </p>
            <Link to={createPageUrl('GetSupport')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Get Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
