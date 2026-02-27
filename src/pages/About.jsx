import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-gray-50 relative overflow-hidden">
      <AnimatedBackground variant="blue" />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Hope Bridge
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-900 leading-relaxed max-w-2xl mx-auto font-bold">
              Mental health support that understands the Asian American teen experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-blue-200">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-900 leading-relaxed">
                <p className="font-semibold text-lg">
                  Too many Asian American teens suffer in silence, caught between cultural expectations and personal struggles.
                </p>
                <p className="font-semibold text-lg">
                  We created Hope Bridge — a space where teens find support that gets it.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}>
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop" 
                alt="Hope Bridge Community"
                className="rounded-2xl shadow-xl border border-blue-200"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-blue-600 mb-4">Our Mission</h3>
              <p className="text-gray-900 leading-relaxed font-semibold text-base">
                Culturally informed mental health support for Asian American teens.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-blue-600 mb-4">Our Vision</h3>
              <p className="text-gray-900 leading-relaxed font-semibold text-base">
                Asian American teens thriving emotionally with normalized mental health conversations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all">

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-blue-600 mb-4">Our Values</h3>
              <p className="text-gray-900 leading-relaxed font-semibold text-base">
                Cultural sensitivity, peer support, accessibility, breaking stigma.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <Users className="w-12 h-12 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white mb-6">
              Our Team
            </h2>
            <p className="text-white text-xl leading-relaxed font-bold">
              Founded by six asian teens: Samvid, Ishaan, Rishi, Arjun, Anish, and Arnav.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">

            <h2 className="text-3xl sm:text-4xl font-black text-blue-700 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto font-semibold">
              Get to know the student leaders and mentors who help make Hope Bridge a welcoming space for every teen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
            { name: 'Rishi Ravikumar', role: 'Planning Department Lead' },
            { name: 'Anish Pentyala', role: 'Web Development Lead' },
            { name: 'Arjun Kuchi', role: 'Field Work Lead' },
            { name: 'Samvid Prabhu', role: 'Research Department Lead' },
            { name: 'Arnav Malhotra', role: 'Socials Department Lead' },
            { name: 'Ishaan Kejriwal', role: 'Event Organization Lead' }].map((member, index) =>
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md text-center">

                <div className="w-12 h-12 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-700 font-semibold mt-1">{member.role}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>);

}
