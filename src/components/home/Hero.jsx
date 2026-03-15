import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Hero() {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-blob absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" style={{ animation: 'hero-drift1 22s ease-in-out infinite' }} />
        <div className="hero-blob absolute top-1/3 -right-20 w-[420px] h-[420px] bg-blue-300/20 rounded-full blur-3xl" style={{ animation: 'hero-drift2 28s ease-in-out infinite' }} />
        <div className="hero-blob absolute -bottom-20 left-1/4 w-[480px] h-[480px] bg-blue-100/35 rounded-full blur-3xl" style={{ animation: 'hero-drift3 25s ease-in-out infinite' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <h1 className="text-shimmer text-5xl sm:text-7xl lg:text-9xl font-black leading-tight pb-4 mb-2 tracking-tight">
            HopeBridge
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }} className="mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 leading-tight">
            Building Bridges to&nbsp;
            <span className="text-blue-600">Brighter Futures</span>
          </h2>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          A safe space for Asian teens to share experiences, find support, and connect with others who understand the unique challenges of navigating identity, family expectations, and mental health.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button onClick={() => navigate(createPageUrl('GetSupport'))} size="lg"
            className="group relative bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            Get Support
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
          </Button>
          <Button onClick={() => scrollToSection('mission')} size="lg" variant="outline"
            className="border-2 border-gray-300 hover:border-blue-400 bg-white/80 text-gray-800 hover:bg-blue-50 rounded-full px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105">
            Learn More
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
