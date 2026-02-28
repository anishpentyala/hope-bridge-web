import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Users, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function GetSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-sky-50 to-cyan-50">
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              You're Not Alone
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
              Get the support you{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                deserve
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Whether you're a teen looking for support, a parent seeking resources, or a school wanting 
              to partner with us, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">For Teens</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Join peer support groups, access mental health resources, and connect with others who understand what you're going through.
              </p>
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full">
                  Join a Support Group
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">For Parents</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Learn how to support your teen, access family resources, and connect with other parents navigating similar challenges.
              </p>
              <Link to={createPageUrl('Contact')}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full">
                  Get Parent Resources
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border-2 border-[#5B4E77]/20"
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Need Immediate Support?</h3>
            <p className="text-slate-600 mb-6">
              If you or someone you know is in crisis, please reach out to these resources immediately:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5B4E77]" />
                <div>
                  <div className="font-semibold text-slate-900">National Suicide Prevention Lifeline</div>
                  <a href="tel:988" className="text-blue-600 hover:underline">988</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#5B4E77]" />
                <div>
                  <div className="font-semibold text-slate-900">Crisis Text Line</div>
                  <div className="text-slate-600">Text HOME to <span className="text-[#5B4E77] font-medium">741741</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Questions? We're Here to Help
          </h3>
          <p className="text-slate-600 mb-6">
            Reach out to learn more about our programs and how we can support you.
          </p>
          <Link to={createPageUrl('Contact')}>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full px-8">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}