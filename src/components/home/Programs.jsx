import React from 'react';
import { motion } from 'framer-motion';

const programs = [
  {
    title: "Workshops & Discussions",
    description: "Interactive sessions on topics like managing academic stress, having difficult conversations with parents, and building emotional resilience."
  },
  {
    title: "School Partnerships",
    description: "We bring mental health awareness and support directly to schools through assemblies, counselor training, and student-led initiatives."
  },
  {
    title: "Resource Hub",
    description: "Curated resources for teens, parents, and educators, including guides on having mental health conversations across cultural contexts."
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wide uppercase">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
            Programs designed with <span className="text-blue-700">understanding</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Every initiative is built with cultural context in mind, because support 
            that doesn't understand your world can't truly help.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-8 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-8 h-0.5 bg-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}