import React, { useState } from 'react';
import { base44 } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    await base44.entities.NewsletterSubscriber.create({
      email,
      source: 'footer'
    });

    setIsSubscribed(true);
    toast.success('Thank you for subscribing!');
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Stay connected</h3>
              <p className="text-slate-400">
                Get updates on our programs, resources, and ways to help.
              </p>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-3 text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 w-full lg:w-80"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 flex-shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-400/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Hope Bridge</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Supporting Asian teens through academic pressure, cultural identity, 
              and mental health challenges.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-blue-400 transition-colors">
                  Support Sessions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-blue-400 transition-colors">
                  Workshops
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('partnerships')} className="hover:text-blue-400 transition-colors">
                  School Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-blue-400 transition-colors">
                  Resource Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="font-semibold mb-4">Organization</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('impact')} className="hover:text-blue-400 transition-colors">
                  Our Impact
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('donate')} className="hover:text-blue-400 transition-colors">
                  Support Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <button onClick={() => scrollToSection('get-involved')} className="hover:text-blue-400 transition-colors">
                  For Students
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('get-involved')} className="hover:text-blue-400 transition-colors">
                  For Parents
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('partnerships')} className="hover:text-blue-400 transition-colors">
                  For Schools
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('donate')} className="hover:text-blue-400 transition-colors">
                  Donate
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Hope Bridge. All rights reserved.
            </p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-300 transition-colors">501(c)(3) Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}