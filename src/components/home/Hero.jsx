import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Subtle decorative accents — CSS only for performance */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-400/25 rounded-full blur-3xl" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-blue-500 text-blue-600 text-base font-bold shadow-lg">
              Supporting Asian Teen Mental Health
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-blue-500 leading-[1.05] mb-6 tracking-tight">
            HopeBridge
          </h1>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-8">
            Building Bridges to Brighter Futures!
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            A safe space for Asian teens to share experiences, find support, and connect 
            with others who understand the unique challenges of navigating identity, 
            family expectations, and mental health.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Button 
              onClick={() => scrollToSection('contact')} 
              size="lg" 
              className="group bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Get Support
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              onClick={() => scrollToSection('mission')} 
              size="lg" 
              variant="outline" 
              className="border-2 border-gray-900 hover:border-gray-700 bg-white text-gray-900 hover:bg-gray-50 rounded-full px-10 py-7 text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}