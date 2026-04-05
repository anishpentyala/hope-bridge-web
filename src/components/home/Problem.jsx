import React from 'react';
import { motion } from 'framer-motion';

const statistics = [
  { number: "1 in 5", label: "Asian American teens report symptoms of depression" },
  { number: "50%", label: "less likely to seek mental health support than their peers" },
  { number: "71%", label: "feel pressure to succeed academically from family" },
];

export default function Problem() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              A silent struggle many face alone
            </h2>
            <div className="space-y-4">
              <p className="text-blue-100 leading-relaxed text-lg">
                Cultural expectations around success and emotional restraint create environments where asking for help feels impossible.
              </p>
              <p className="text-blue-200 leading-relaxed">
                Hope Bridge is building new pathways — support that speaks your language, understands your family, and meets you where you are.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-10">The reality we're addressing</h3>
            <div className="space-y-10">
              {statistics.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
                  className="flex items-start gap-6">
                  <span className="text-4xl lg:text-5xl font-black text-white leading-none flex-shrink-0 whitespace-nowrap">
                    {stat.number}
                  </span>
                  <div className="pt-1 border-t border-blue-600/50 flex-1">
                    <p className="text-blue-100 leading-relaxed pt-3">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-blue-400/70 italic mt-10">
              Sources: SAMHSA National Survey, AAPI Data, Mental Health America
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
