import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Heart, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function PastPrograms() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Past Programs
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A look back at the events and initiatives that have shaped our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CLUB DROP-INS ── */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-300" />
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">Community Outreach</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">Club Drop-Ins</h2>
            <div className="max-w-3xl">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                We hosted over <span className="text-blue-300 font-bold">5 interactive drop-in sessions</span> at Key Clubs and student organizations across <span className="text-blue-300 font-bold">5 Lake Washington high schools</span> — Eastlake, Issaquah, Redmond, Skyline, and through the Sammamish Community Club — reaching over <span className="text-blue-300 font-bold">150 students</span> directly. Each session brought HopeBridge into club meetings where we led discussions on our three core pillars: <span className="text-blue-300 font-semibold">cultural identity</span>, <span className="text-blue-300 font-semibold">academic pressure</span>, and <span className="text-blue-300 font-semibold">family disconnect</span>.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Students heard from teen peers who understand the challenges of growing up between two cultures, asked questions in a judgment-free space, and contributed to our Story Project. These drop-ins collected over <span className="text-white font-semibold">60 handwritten story submissions</span>, expanded HopeBridge from 1 school to a <span className="text-white font-semibold">5-school network</span> across the Lake Washington School District, and built lasting partnerships with Key Club chapters — connecting students with mental health resources designed specifically for Asian American teens.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {['/images/community/dropin-01.jpg','/images/community/dropin-02.jpg','/images/community/dropin-03.jpg','/images/community/dropin-07.jpg','/images/community/dropin-04.jpg','/images/community/dropin-08.jpg','/images/community/dropin-09.jpg','/images/community/dropin-11.jpg','/images/community/dropin-06.jpg'].map((src, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300">
                  <img src={src} alt={`Club Drop-In session ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTAL HEALTH AWARENESS BOOTHS ── */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-blue-300" />
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">Community Events</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">Mental Health Awareness Booths</h2>
            <div className="max-w-3xl">
              <p className="text-white/80 text-lg leading-relaxed">
                We set up <span className="text-blue-300 font-bold">2 Mental Health Awareness Booths</span> at Woodinville High School and at Skyline High School's Holiday Bazaar in December 2025, engaging over <span className="text-blue-300 font-bold">120 students</span> across both events. Each booth featured a community story wall that collected <span className="text-blue-300 font-bold">40+ handwritten stories</span>, a mental health survey completed by <span className="text-blue-300 font-bold">75 students</span>, and lollipop giveaways to spark conversations about the challenges facing Asian American teens.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {['/images/community/booth-01.jpg','/images/community/booth-02.jpg','/images/community/booth-03.jpg','/images/community/booth-04.jpg','/images/community/booth-05.jpg',null].map((src, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }}>
                {src ? (
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300">
                    <img src={src} alt={`Mental Health Awareness Booth ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
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

      {/* ── CTA ── */}
      <section className="py-20 px-6 lg:px-8 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Want to see what we're doing now?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">Check out our current programs and find ways to get involved.</p>
            <Link to={createPageUrl('Programs')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Current Programs <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
