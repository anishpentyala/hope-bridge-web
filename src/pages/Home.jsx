import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '../components/CountUp';
import Hero from '@/components/home/Hero';
import Mission from '@/components/home/Mission';
import Problem from '@/components/home/Problem';
import CommunitySurvey from '@/components/home/CommunitySurvey';
import Impact from '@/components/home/Impact';
import Contact from '@/components/home/Contact';
import StorySection from '@/components/home/StorySection.jsx';
import BackgroundElements from '@/components/BackgroundElements';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <BackgroundElements />
      <Hero />
      <Mission />
      {/* Gradient bridge: white → dark blue */}
      <div className="h-20 bg-gradient-to-b from-white to-blue-700 -mb-px" aria-hidden="true" />
      <Problem />
      <StorySection />
      <section id="vision" className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-white font-bold text-base tracking-wide uppercase bg-blue-500/30 px-4 py-2 rounded-full">
              Looking Ahead
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
              Our Vision
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-10 lg:p-14 shadow-2xl border border-blue-200">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  Where we're headed
                </h3>
                <p className="text-gray-800 font-semibold text-lg">
                  Our commitment to the community
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { target: "5,000+", label: "Teens supported by 2027" },
                  { target: "25", label: "School partnerships" },
                  { target: "100%", label: "Free programs" }
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <CountUp value={goal.target} className="text-5xl lg:text-6xl font-black text-blue-600 mb-3 block" />
                    <p className="text-gray-900 font-bold text-base">
                      {goal.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CommunitySurvey />
      <Contact />
    </div>
  );
}