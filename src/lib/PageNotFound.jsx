import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Home, Phone, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const location = useLocation();

  const suggestions = [
    { label: 'Home', page: 'Home', icon: Home },
    { label: 'Get Support', page: 'GetSupport', icon: Phone },
    { label: 'Find Resources', page: 'Resources', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-8xl font-bold text-blue-100 mb-2">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          If you need immediate help, call <a href="tel:988" className="text-blue-600 font-semibold">988</a>.
        </p>

        <div className="space-y-2 mb-8">
          {suggestions.map(s => (
            <Link key={s.page} to={createPageUrl(s.page)}>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <s.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700 text-sm">{s.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <Link to={createPageUrl('Home')}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 font-medium">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
