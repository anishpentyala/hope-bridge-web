import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Your story matters here
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-4">
              Over 200 teens have shared their stories on HopeBridge — about pressure from parents, feeling out of place, navigating identity between two cultures.
            </p>
            <p className="text-blue-100 leading-relaxed mb-10">
              Reading someone else's words and seeing yourself in them — that's what community looks like. You are not alone.
            </p>
            <Link to={createPageUrl('StoryProject')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Explore Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
              <img
                src="/images/community/community-brochures.jpg"
                alt="Students holding HopeBridge brochures on Asian teen mental health"
                loading="lazy"
                className="w-full h-[28rem] object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="border-l-2 border-white/40 pl-6">
                <p className="text-3xl font-black text-white mb-1">200+</p>
                <p className="text-blue-100">Stories shared by teens across King County</p>
              </div>
              <div className="border-l-2 border-white/30 pl-6">
                <p className="text-3xl font-black text-white mb-1">100+</p>
                <p className="text-blue-100">Teens connected through peer matching</p>
              </div>
              <div className="border-l-2 border-white/20 pl-6">
                <p className="text-3xl font-black text-white mb-1">100%</p>
                <p className="text-blue-100">Safe, anonymous, and always free</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
