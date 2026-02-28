import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Users, Megaphone, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import BackgroundElements from '@/components/BackgroundElements';

const ways = [
  {
    icon: Heart,
    title: "Volunteer",
    description: "Become a peer mentor, workshop facilitator, or help with community events. Your time and passion can make a real difference.",
    cta: "Learn More",
    gradient: "from-blue-600 to-blue-500"
  },
  {
    icon: DollarSign,
    title: "Donate",
    description: "Your financial support keeps all our programs free and accessible for teens who need them most.",
    cta: "Make a Donation",
    link: "Donate",
    gradient: "from-blue-600 to-blue-500"
  },
  {
    icon: Megaphone,
    title: "Spread the Word",
    description: "Share our mission with families, schools, and communities who could benefit from our services.",
    cta: "Share Our Mission",
    gradient: "from-blue-700 to-blue-600"
  },
  {
    icon: Users,
    title: "Partner With Us",
    description: "Schools, organizations, and mental health professionals—let's collaborate to expand our reach and impact.",
    cta: "Explore Partnerships",
    gradient: "from-blue-600 to-blue-500"
  }
];

export default function GetInvolved() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-white relative overflow-hidden">
      <BackgroundElements />
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
              Join us in creating{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                lasting change
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-800 leading-relaxed max-w-2xl mx-auto font-semibold">
              Whether you have time, resources, or a platform to share, there are many ways 
              to support Asian teen mental health in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {ways.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${way.gradient} flex items-center justify-center mb-6 shadow-sm`}>
                  <way.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {way.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {way.description}
                </p>
                <Link to={createPageUrl(way.link || 'Contact')}>
                  <Button 
                    variant="outline" 
                    className="border-blue-600/20 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    {way.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6">
              Your Support Creates Real Change
            </h2>
            <p className="text-white text-lg leading-relaxed mb-8">
              Every volunteer hour, every dollar donated, and every story shared helps us reach 
              more teens who are struggling in silence. Together, we're building a community where 
              mental health conversations are welcomed, not feared.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-full px-8 py-6 text-lg shadow-md">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}