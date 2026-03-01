import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Eye, Users, Mail } from 'lucide-react';
import PageBackground from '../components/PageBackground';

// kept for backward compat — replaced by PageBackground
function PageBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-2xl" />
      <div className="absolute top-1/2 -right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '38px 38px' }}
      />
    </div>
  );
}

const teamMembers = [
  { name: 'Anish Pentyala',   role: 'Web Development Lead',      email: 'Anish.n.pentyala@gmail.com',      initials: 'AP', color: 'from-blue-500 to-blue-700' },
  { name: 'Rishi Ravikumar',  role: 'Planning Department Lead',   email: 'rishirkumar@outlook.com',                              initials: 'RR', color: 'from-indigo-500 to-blue-600', image: '/images/team/rishi.jpg' },
  { name: 'Arjun Kuchi',      role: 'Field Work Lead',            email: 'stingingnettle1024@gmail.com',    initials: 'AK', color: 'from-blue-600 to-cyan-500', image: '/images/team/arjun.jpg' },
  { name: 'Samvid Prabhu',    role: 'Research Department Lead',   email: 'samvid.s.prabhu@gmail.com',                              initials: 'SP', color: 'from-sky-500 to-blue-600' },
  { name: 'Arnav Malhotra',   role: 'Socials Department Lead',    email: 'reacharnavmalhotra@gmail.com',    initials: 'AM', color: 'from-blue-500 to-indigo-600' },
  { name: 'Ishaan Kejriwal',  role: 'Event Organization Lead',    email: 'ishaankej@outlook.com',           initials: 'IK', color: 'from-indigo-600 to-blue-500', image: '/images/team/ishaan.jpg' },
];

const values = [
  { icon: Target, title: 'Our Mission', desc: 'Culturally informed mental health support for Asian American teens.', bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { icon: Eye,    title: 'Our Vision',  desc: 'Asian American teens thriving emotionally, with mental health conversations fully normalized.', bg: 'bg-indigo-50', border: 'border-indigo-200', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { icon: Heart,  title: 'Our Values',  desc: 'Cultural sensitivity, peer support, accessibility, and actively breaking stigma.', bg: 'bg-sky-50', border: 'border-sky-200', iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 relative overflow-hidden">
      <PageBackground />
      <PageBg />

      {/* ── HERO ── */}
      <section className="pt-16 pb-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                HopeBridge
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Mental health support built by Asian teens, for Asian teens — because we've lived it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="gradient-border p-10 shadow-xl">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Too many Asian American teens suffer in silence — caught between cultural expectations,
                  academic pressure, and personal struggles no one seems to understand.
                </p>
                <p className="text-lg">
                  Six teens from Sammamish, WA decided that needed to change. We created HopeBridge —
                  a space where teens find support that <em>actually gets it.</em>
                </p>
                <p className="text-base text-gray-500">
                  Founded at Eastlake High School, our programs are free, culturally informed, and
                  built on the understanding that mental wellness is a right, not a privilege.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop"
                  alt="HopeBridge Community"
                  className="rounded-2xl shadow-2xl border border-blue-100 w-full"
                  loading="lazy"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 glass-card px-5 py-3 rounded-xl shadow-lg border border-white/60">
                  <div className="text-2xl font-black text-blue-600">2024</div>
                  <div className="text-xs text-gray-600 font-medium">Founded in Sammamish, WA</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="py-16 px-6 lg:px-8 bg-white/80 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              What Drives <span className="text-shimmer">Us</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Our mission, vision, and the values we hold at the core of everything we do.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc, bg, border, iconBg, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glow-hover ${bg} rounded-2xl p-8 border ${border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Meet the <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Six Asian teens from Sammamish, WA who decided to build the support system they wished they'd had.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="group glass-card glow-hover rounded-2xl p-6 text-center border border-blue-100/60 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {member.image ?
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full max-w-[260px] aspect-[4/5] object-cover rounded-xl mx-auto mb-5 shadow-lg border border-blue-100" /> :

                /* Avatar with initials */
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-black text-xl">{member.initials}</span>
                  </div>

                }
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mt-1">{member.role}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
