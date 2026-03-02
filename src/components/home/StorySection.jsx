import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb } from 'lucide-react';
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
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-100" />
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Share Your Story
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Read real stories, find community, connect with others who understand.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="200+" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Stories shared</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="100+" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Teens connected</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Lightbulb className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="100%" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Safe & secure</div>
            </div>
          </div>

          <Link to={createPageUrl('StoryProject')}>
            <a className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300">
              Explore Stories
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}