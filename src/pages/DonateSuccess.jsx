import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '../utils';

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const amount = searchParams.get('amount');

  useEffect(() => {
    setShowConfetti(true);
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#2563eb', '#3b82f6', '#60a5fa', '#bfdbfe', '#ffffff'],
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-300/50"
        >
          <CheckCircle2 className="w-14 h-14 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Thank you for your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              generosity
            </span>
          </h1>

          {amount && (
            <p className="text-2xl font-bold text-blue-600 mb-4">
              ${amount} donated
            </p>
          )}

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Your contribution directly supports Asian American teens in King County, helping them find community, resources, and hope.
          </p>

          <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6 mb-10 text-left space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">What happens next</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A receipt has been sent to your email by Stripe. Your donation goes directly toward HopeBridge programs, workshops, and outreach across King County schools.
                </p>
              </div>
            </div>
            <div className="border-t border-blue-50 pt-4">
              <p className="text-xs text-gray-400 italic">
                HopeBridge is not yet a 501(c)(3) nonprofit. Donations are not tax-deductible at this time.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Home')}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg">
                Back to Home <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl('GetInvolved')}>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-blue-200 text-blue-700 hover:bg-blue-50">
                Get Involved
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
