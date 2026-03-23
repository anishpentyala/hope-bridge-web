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
