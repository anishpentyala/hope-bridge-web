import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, BookOpen, Sparkles, Target, Compass, Home as HomeIcon, ArrowRight, Shield, Globe, MessageCircle } from 'lucide-react';
import MentalHealthChart from '@/components/mission/MentalHealthChart';
// AnimatedBackground removed — page already has rich visual sections; the blobs were causing GPU lag

// Animated counter component
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
    if (isNaN(num)) { setCount(target); return; }
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="counter-glow">
      {prefix}{typeof count === 'number' ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

export default function Mission() {
  const coreGoals = [
    {
      icon: Compass,
      title: 'Embracing Cultural Identity',
      description: 'Helping Asian teens navigate the beautiful complexity of their bicultural identity.',
      details: [
        'Peer-led discussions exploring identity and belonging',
        'Cultural heritage appreciation alongside modern values',
        'Support for teens feeling caught between two worlds',
        'Celebrating the strength in multicultural experiences'
      ],
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Navigating Academic Pressures',
      description: "Addressing the intense academic expectations many Asian teens face while maintaining mental wellness.",
      details: [
        'Healthy approaches to academic achievement',
        'Redefining success beyond test scores and grades',
        'Managing family expectations around education',
        'Building resilience without burning out'
      ],
      color: 'from-indigo-500 to-blue-600',
      iconBg: 'bg-indigo-500'
    },
    {
      icon: HomeIcon,
      title: 'Healing Family Disconnect',
      description: "Bridging generational and cultural gaps between Asian teens and their families.",
      details: [
        'Parent education on teen mental health',
        'Facilitating conversations across generations',
        'Honoring family values while expressing needs',
        'Resources in multiple languages for families'
      ],
      color: 'from-violet-500 to-blue-600',
      iconBg: 'bg-violet-500'
    }
  ];

  const howWeWork = [
    {
      icon: Heart,
      title: 'Safe Spaces',
      description: 'Judgment-free environments where Asian teens can share openly, without fear of shame or misunderstanding.',
      stat: '100%',
      statLabel: 'Anonymous'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Bringing together teens who share similar cultural backgrounds and challenges, fostering healing through connection.',
      stat: '50+',
      statLabel: 'Peer Mentors'
    },
    {
      icon: Sparkles,
      title: 'Breaking Stigma',
      description: 'Through storytelling and awareness campaigns, we normalize mental health conversations in Asian communities.',
      stat: '25',
      statLabel: 'School Partners'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 relative overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative pt-16 pb-24 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 wave-divider">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold mb-8">
              <Target className="w-4 h-4" />
              Our Mission
            </motion.span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Supporting Asian teen{' '}
              <span className="relative">
                <span className="relative z-10 text-blue-200">mental health</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-2 left-0 w-full h-3 bg-blue-400/30 rounded-full origin-left"
                />
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Creating a world where every Asian American teen feels empowered to prioritize their mental health — without shame, stigma, or silence.
            </p>
          </motion.div>
        </div>

        {/* Animated stat counters */}
        <div className="relative z-10 max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '1', suffix: ' in 3', label: 'Asian teens struggle' },
              { number: '50', suffix: '%', label: 'Less likely to seek help' },
              { number: '5000', suffix: '+', label: 'Teens to reach by 2027' },
              { number: '8', suffix: '%', label: 'Currently get help' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="glass-card rounded-2xl p-5 text-center group hover:bg-white/25 transition-all duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-white counter-glow">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-white/70 mt-1.5 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── with glassmorphism */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gradient-border p-10 lg:p-14 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission Statement</h2>
            </div>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                HopeBridge exists to create a world where every Asian American teen feels empowered to
                prioritize their mental health without shame, stigma, or silence.
              </p>
              <p>
                We recognize that Asian American teens face unique challenges at the intersection of cultural
                expectations, academic pressures, and identity formation. Too often, these struggles are faced
                in isolation, with limited culturally-informed support available.
              </p>
              <p>
                Through peer-led support groups, culturally aware programming, and community education, we're
                building bridges — between teens and resources, between generations in families, and between
                traditional values and modern mental health understanding.
              </p>
              <p className="font-medium text-gray-900 text-xl border-l-4 border-blue-500 pl-6 py-2">
                We believe that mental wellness is not a luxury, but a fundamental right.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DATA VISUALIZATION ── */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50/80">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">The Data Tells the Story</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Understanding the mental health landscape for Asian American youth</p>
          </motion.div>
          <MentalHealthChart />
        </div>
      </section>

      {/* ── THREE CORE GOALS ── with gradient cards */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Three Interconnected <span className="text-shimmer">Goals</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our work focuses on these essential pillars of Asian teen mental wellness
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative">
                {/* Gradient top accent */}
                <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${goal.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="bg-white rounded-2xl p-8 shadow-md border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-xl ${goal.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <goal.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {goal.description}
                  </p>
                  <ul className="space-y-2.5">
                    {goal.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                        <ArrowRight className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── with stat cards */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How We Make It <span className="text-blue-300">Happen</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Three pillars that drive everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {howWeWork.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group">
                <div className="glass-card rounded-2xl p-8 h-full hover:bg-white/15 transition-all duration-300 glow-hover">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white counter-glow">{item.stat}</div>
                      <div className="text-xs text-gray-400">{item.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ── big impact stats */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why This Work <span className="text-shimmer">Matters</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '2.5x', label: 'Higher depression rates in Asian American teens', icon: Shield, color: 'from-red-500 to-orange-500' },
              { stat: '30%', label: 'Have seriously considered suicide', icon: MessageCircle, color: 'from-blue-500 to-indigo-500' },
              { stat: '92%', label: 'Never receive professional mental health support', icon: Globe, color: 'from-violet-500 to-purple-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group">
                <div className="relative bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 text-center overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-5xl font-black text-gray-900 mb-3 counter-glow">{item.stat}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Whether you're a teen who needs support, a parent seeking resources, or someone who wants to help — there's a place for you at HopeBridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/GetSupport" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-hover">
                Get Support <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/Donate" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Heart className="w-5 h-5" /> Donate
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
