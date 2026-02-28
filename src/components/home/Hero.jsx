import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users, Shield } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* CSS-only animated gradient mesh background */}
      <style>{`
        @keyframes hero-drift1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(60px, -40px, 0) scale(1.08); }
          66% { transform: translate3d(-30px, 30px, 0) scale(0.94); }
        }
        @keyframes hero-drift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-70px, 50px, 0) scale(1.1); }
          66% { transform: translate3d(40px, -20px, 0) scale(0.96); }
        }
        @keyframes hero-drift3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(45px, 35px, 0) scale(1.06); }
        }
        @keyframes hero-drift4 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          40% { transform: translate3d(-50px, -30px, 0) scale(1.04); }
          80% { transform: translate3d(30px, 20px, 0) scale(0.97); }
        }
        .hero-blob { will-change: transform; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @keyframes underline-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .hero-underline::after {
          content: '';
          display: block;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6, #60A5FA);
          border-radius: 2px;
          transform-origin: left;
          animation: underline-grow 1s ease-out 1.2s both;
        }
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.25); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        .badge-pulse { animation: badge-pulse 3s ease-in-out infinite; }
        @keyframes float-trust {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .trust-float:nth-child(1) { animation: float-trust 3.5s ease-in-out infinite; }
        .trust-float:nth-child(2) { animation: float-trust 3.5s ease-in-out 0.6s infinite; }
        .trust-float:nth-child(3) { animation: float-trust 3.5s ease-in-out 1.2s infinite; }
        @keyframes dot-fade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>

      {/* Animated gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" style={{ animation: 'hero-drift1 22s ease-in-out infinite' }} />
        <div className="hero-blob absolute top-1/3 -right-20 w-[420px] h-[420px] bg-indigo-200/25 rounded-full blur-3xl" style={{ animation: 'hero-drift2 28s ease-in-out infinite' }} />
        <div className="hero-blob absolute -bottom-20 left-1/4 w-[480px] h-[480px] bg-blue-100/35 rounded-full blur-3xl" style={{ animation: 'hero-drift3 25s ease-in-out infinite' }} />
        <div className="hero-blob absolute top-10 right-1/3 w-[300px] h-[300px] bg-slate-200/25 rounded-full blur-3xl" style={{ animation: 'hero-drift4 30s ease-in-out infinite' }} />

        {/* Dot grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">

        {/* Main heading — shimmer on HopeBridge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-shimmer text-7xl sm:text-8xl lg:text-9xl font-black leading-none pb-3 mb-2 tracking-tight">
            HopeBridge
          </h1>
        </motion.div>

        {/* Subheading with animated underline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="inline-block text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-gray-900 leading-tight hero-underline">
            Building Bridges to&nbsp;
            <span className="text-blue-600">Brighter Futures</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A safe space for Asian teens to share experiences, find support, and connect
          with others who understand the unique challenges of navigating identity,
          family expectations, and mental health.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="glow-hover group relative bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            Get Support
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
          </Button>

          <Button
            onClick={() => scrollToSection('mission')}
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 hover:border-blue-400 bg-white/80 text-gray-800 hover:bg-blue-50 rounded-full px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {[
            { icon: Heart, label: 'Peer-Led Support', color: 'text-rose-500', bg: 'bg-rose-50' },
            { icon: Users, label: 'Community-Driven', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Shield, label: 'Safe & Confidential', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map(({ icon: Icon, label, color, bg }, i) => (
            <div
              key={label}
              className={`trust-float glass-card flex items-center gap-2.5 px-5 py-2.5 rounded-full shadow-sm border border-white/60`}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </span>
              <span className="text-sm font-semibold text-gray-700">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
