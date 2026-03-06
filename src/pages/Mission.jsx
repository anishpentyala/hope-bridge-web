import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, BookOpen, Compass, Home as HomeIcon, ArrowRight } from 'lucide-react';
import PageBackground from '../components/PageBackground';
// AnimatedBackground removed, page already has rich visual sections; the blobs were causing GPU lag

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
      color: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 relative overflow-hidden">
      <PageBackground />

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
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
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
              Creating a world where every Asian American teen feels empowered to prioritize their mental health, without shame, stigma, or silence.
            </p>
          </motion.div>
        </div>

        {/* Animated stat counters */}
        <div className="relative z-10 max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
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
                className="bg-white/15 border border-white/25 rounded-2xl p-5 text-center group hover:bg-white/25 transition-all duration-300">
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
            className="bg-white rounded-3xl p-10 lg:p-14 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission Statement</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                We strive to raise awareness about the mental health challenges Asian American teens face, particularly those connected to cultural identity and the pressures that come with balancing expectations at home and in school.
              </p>
              <p>
                Through community storytelling, outreach, and partnerships, we aim to create spaces where teens feel comfortable sharing their experiences while encouraging stronger understanding between teens and their families.
              </p>
            </div>
          </motion.div>
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
              Three Interconnected <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Goals</span>
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
              Whether you're a teen who needs support, a parent seeking resources, or someone who wants to help, there's a place for you at HopeBridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/GetSupport" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
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
