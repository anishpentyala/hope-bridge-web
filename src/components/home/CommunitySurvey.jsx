import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, TrendingUp, Users, Heart } from 'lucide-react';
import CountUp from '../CountUp';

export default function CommunitySurvey() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ClipboardList className="w-16 h-16 mx-auto mb-6 text-blue-100" />
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Share Your Voice
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Help shape mental health support for Asian American teens.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="200+" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Responses collected</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="5 min" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Average time to complete</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Heart className="w-6 h-6 mx-auto mb-2 text-blue-200" />
              <CountUp value="100%" className="text-2xl font-bold block" />
              <div className="text-xs text-blue-100">Anonymous & confidential</div>
            </div>
          </div>

          <a 
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=P2fUH5bfIUaGOKHYjEyF1z0k6dCGAoZDs6jElXg1mJlUM0YxQVlLUUlNUURZUlQ0VjlJV0NSNldCTi4u"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
          >
            Take our Community Survey
          </a>
        </motion.div>
      </div>
    </section>
  );
}