import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Phone, Mail, ExternalLink } from 'lucide-react';

// ── Crisis Banner ──────────────────────────────────────────────────
function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-blue-900 text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative z-[60]">
      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="font-medium">
        Need help now? Call or text <a href="tel:988" className="underline font-bold hover:text-blue-200 transition-colors">988</a> (Suicide & Crisis Lifeline) or text <a href="sms:741741" className="underline font-bold hover:text-blue-200 transition-colors">HOME to 741741</a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-blue-800 rounded transition-colors"
        aria-label="Dismiss crisis banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Crisis resources strip */}
      <div className="bg-blue-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-white text-sm">
          <Heart className="w-4 h-4 text-red-300 flex-shrink-0" />
          <span className="font-medium text-center">
            If you or someone you know is in crisis, call <a href="tel:988" className="underline font-bold">988</a> or text <a href="sms:741741" className="underline font-bold">HOME to 741741</a>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png"
                alt="HopeBridge"
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-bold text-white">HopeBridge</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Youth-led nonprofit creating culturally informed mental health support for Asian American teens.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={createPageUrl('StoryProject')} className="hover:text-white transition-colors">Story Project</Link></li>
              <li><Link to={createPageUrl('Resources')} className="hover:text-white transition-colors">Find Support</Link></li>
              <li><Link to={createPageUrl('Schools')} className="hover:text-white transition-colors">School Partnerships</Link></li>
              <li><Link to={createPageUrl('Programs')} className="hover:text-white transition-colors">All Programs</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={createPageUrl('Volunteer')} className="hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to={createPageUrl('Donate')} className="hover:text-white transition-colors">Donate</Link></li>
              <li><Link to={createPageUrl('GetInvolved')} className="hover:text-white transition-colors">Partner With Us</Link></li>
              <li><Link to={createPageUrl('Contact')} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:hopebridgecommunityservices@gmail.com" className="hover:text-white transition-colors break-all">
                  hopebridgecommunityservices@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <a href="tel:425-610-7760" className="hover:text-white transition-colors">425-610-7760</a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">Sammamish, WA &middot; Serving King County</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} HopeBridge Community Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('PrivacyPolicy')} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link to={createPageUrl('GetSupport')} className="hover:text-gray-300 transition-colors">Crisis Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Layout ────────────────────────────────────────────────────
export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 20;
        setIsScrolled((prevIsScrolled) => (
          prevIsScrolled === nextIsScrolled ? prevIsScrolled : nextIsScrolled
        ));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentPageName]);

  const navLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'About', page: 'About' },
    { label: 'Mission', page: 'Mission' },
    { label: 'Programs', page: 'Programs' },
    { label: 'Get Involved', page: 'GetInvolved' },
    { label: 'Contact', page: 'Contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        :root {
          --color-primary: #1E3A5F;
          --color-primary-light: #3B82F6;
          --color-surface: #F8FAFC;
          --color-text: #334155;
          --color-text-light: #64748B;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--color-surface);
          color: var(--color-text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        ::selection {
          background-color: #3B82F6;
          color: #FFFFFF;
        }
      `}</style>

      {/* Crisis Banner — always visible at top */}
      <CrisisBanner />

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 md:backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white/90 md:bg-white/80 md:backdrop-blur-sm'
        }`}
        style={{ top: 'var(--crisis-banner-offset, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              to={createPageUrl('Home')}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696d852fbbda0ee653ff4e65/2ef794ee6_ChatGPTImageJan16202611_46_44PM.png"
                alt="HopeBridge"
                className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Hope<span className="text-blue-600">Bridge</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentPageName === link.page;
                return (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={createPageUrl('GetSupport')}>
                <Button
                  variant="outline"
                  className="rounded-lg text-sm font-medium border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                >
                  Get Support
                </Button>
              </Link>
              <Link to={createPageUrl('Donate')}>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  Donate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPageName === link.page;
                  return (
                    <Link
                      key={link.page}
                      to={createPageUrl(link.page)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 space-y-2">
                  <Link to={createPageUrl('GetSupport')} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg font-medium border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Get Support
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Donate')} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm">
                      <Heart className="w-4 h-4 mr-1.5" />
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
