import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import CountUp from '../CountUp';

export default function StorySection() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Share Your Story
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Read real stories, find community, connect with others who understand.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <CountUp value="200+" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100 mt-1">Stories shared</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <CountUp value="100+" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100 mt-1">Teens connected</div>
            </div>
            <div className="bg-white/10 rounded-xl p-5 border border-white/20">
              <CountUp value="100%" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100 mt-1">Safe & secure</div>
            </div>
          </div>

          <Link to={createPageUrl('StoryProject')}>
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold text-base hover:bg-blue-50 transition-colors duration-200 shadow-md">
              Explore Stories
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}