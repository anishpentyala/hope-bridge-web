import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Phone, Mail, Instagram, ChevronDown } from 'lucide-react';

// ── Crisis Banner ──────────────────────────────────────────────────
function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-blue-900 text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative z-[60]">
      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="font-medium">
        Need help now? Call or text{' '}
        <a href="tel:988" className="underline font-bold hover:text-blue-200 transition-colors">988</a>
        {' '}(Suicide & Crisis Lifeline) or text{' '}
        <a href="sms:741741" className="underline font-bold hover:text-blue-200 transition-colors">HOME to 741741</a>
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
            If you or someone you know is in crisis, call{' '}
            <a href="tel:988" className="underline font-bold">988</a>
            {' '}or text{' '}
            <a href="sms:741741" className="underline font-bold">HOME to 741741</a>
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
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Youth-led nonprofit creating culturally informed mental health support for Asian American teens in Sammamish, WA.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/hopebridgecommunityservices/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@hopebridgecommunity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-600 flex items-center justify-center transition-colors duration-200"
              >
                {/* TikTok SVG (not in lucide) */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/175JyM5Wym/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
              >
                {/* Facebook SVG (not in lucide) */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={createPageUrl('StoryProject')} className="hover:text-white transition-colors">Story Project</Link></li>
              <li><Link to={createPageUrl('Resources')} className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to={createPageUrl('Partnerships')} className="hover:text-white transition-colors">School Partnerships</Link></li>
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
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <a href="mailto:hopebridgecommunityservices@gmail.com" className="hover:text-white transition-colors text-xs leading-snug">
                  hopebridgecommunityservices@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <a href="tel:425-610-7760" className="hover:text-white transition-colors">425-610-7760</a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">Sammamish, WA &middot; Serving King County</p>

            {/* Trust badges */}
            <div className="mt-5 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                501(c)(3) Pending
              </div>
              <div className="block">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-400">
                  <Heart className="w-3 h-3 text-red-400 flex-shrink-0" />
                  Youth-Founded &amp; Led
                </div>
              </div>
            </div>
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled));
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
    { label: 'Story Project', page: 'StoryProject' },
    {
      label: 'Programs', page: 'Programs',
      dropdown: [
        { label: 'All Programs', page: 'Programs' },
        { label: 'Resources', page: 'Resources' },
      ]
    },
    {
      label: 'Get Involved', page: 'GetInvolved',
      dropdown: [
        { label: 'Overview', page: 'GetInvolved' },
        { label: 'Volunteer', page: 'Volunteer' },
        { label: 'Partnerships', page: 'Partnerships' },
        { label: 'Donate', page: 'Donate' },
      ]
    },
    { label: 'Contact', page: 'Contact' },
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

        html { scroll-behavior: smooth; }

        body {
          background-color: var(--color-surface);
          color: var(--color-text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Fredoka', 'Inter', sans-serif;
        }

        .text-shimmer {
          background: linear-gradient(90deg, #2563EB, #60A5FA, #2563EB);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          50%  { background-position: 200% center; }
          100% { background-position: 0% center; }
        }

        .glass-card {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
        }

        .glow-hover { transition: box-shadow 0.3s ease; }
        .glow-hover:hover {
          box-shadow: 0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.15);
        }

        .gradient-border {
          position: relative;
          background: white;
          border-radius: 1.5rem;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: calc(1.5rem + 2px);
          background: linear-gradient(135deg, #3B82F6, #60A5FA, #93C5FD, #3B82F6);
          background-size: 300% 300%;
          animation: grad-rot 6s ease infinite;
          z-index: -1;
        }
        @keyframes grad-rot {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .counter-glow { text-shadow: 0 0 40px rgba(59,130,246,0.3); }

        /* ── Reusable page background blobs ── */
        @keyframes page-blob1 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          40% { transform: translate3d(50px,-40px,0) scale(1.08); }
          70% { transform: translate3d(-30px,20px,0) scale(0.95); }
        }
        @keyframes page-blob2 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          35% { transform: translate3d(-60px,35px,0) scale(1.1); }
          70% { transform: translate3d(25px,-20px,0) scale(0.96); }
        }
        @keyframes page-blob3 {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(40px,30px,0) scale(1.07); }
        }
        .page-blob { will-change: transform; backface-visibility: hidden; }

        /* ── Card polish ── */
        .card-rich {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(219,234,254,0.8);
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
        }
        .card-rich:hover {
          box-shadow: 0 12px 40px rgba(59,130,246,0.12), 0 2px 8px rgba(0,0,0,0.04);
          transform: translateY(-2px);
          border-color: rgba(147,197,253,0.9);
        }

        /* ── Section gradient helpers ── */
        .section-warm {
          background: linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #faf5ff 100%);
        }
        .section-cool {
          background: linear-gradient(135deg, #f0f9ff 0%, #eff6ff 100%);
        }

        ::selection {
          background-color: #3B82F6;
          color: #FFFFFF;
        }
      `}</style>

      {/* ── Sticky top bar: crisis banner + navbar as one unit ── */}
      <div className="sticky top-0 z-50 flex flex-col">
        <CrisisBanner />

        <header
          className={`transition-colors duration-300 ${
            isScrolled
              ? 'bg-blue-50/95 backdrop-blur-md shadow-sm border-b border-blue-100'
              : 'bg-blue-50/90'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
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
                  const isActive = currentPageName === link.page ||
                    (link.dropdown && link.dropdown.some(d => d.page === currentPageName));
                  if (link.dropdown) {
                    return (
                      <div
                        key={link.page}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.page)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <Link
                          to={createPageUrl(link.page)}
                          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 font-semibold'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.page ? 'rotate-180' : ''}`} />
                        </Link>
                        {openDropdown === link.page && (
                          <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 pt-3 pb-1.5 z-50">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.page}
                                to={createPageUrl(item.page)}
                                onClick={() => setOpenDropdown(null)}
                                className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                                  currentPageName === item.page
                                    ? 'text-blue-700 font-semibold bg-blue-50'
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
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
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg px-5 transition-all duration-200">
                    Get Support
                  </Button>
                </Link>
                <Link to={createPageUrl('Donate')}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 shadow-sm hover:shadow-md transition-all duration-200">
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
                className="lg:hidden bg-blue-50 border-t border-blue-100 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
                  {navLinks.map((link) => {
                    const isActive = currentPageName === link.page ||
                      (link.dropdown && link.dropdown.some(d => d.page === currentPageName));
                    if (link.dropdown) {
                      const isExpanded = openMobileDropdown === link.page;
                      return (
                        <div key={link.page}>
                          <div className="flex items-center">
                            <Link
                              to={createPageUrl(link.page)}
                              onClick={() => { setIsMobileMenuOpen(false); setOpenMobileDropdown(null); }}
                              className={`flex-1 px-4 py-3 rounded-l-lg font-medium transition-colors duration-200 ${
                                isActive
                                  ? 'bg-blue-100 text-blue-700 font-semibold'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={() => setOpenMobileDropdown(isExpanded ? null : link.page)}
                              className={`px-3 py-3 rounded-r-lg font-medium transition-colors duration-200 ${
                                isActive
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                              aria-label="Expand submenu"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          {isExpanded && (
                            <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.page}
                                  to={createPageUrl(item.page)}
                                  onClick={() => { setIsMobileMenuOpen(false); setOpenMobileDropdown(null); }}
                                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    currentPageName === item.page
                                      ? 'text-blue-700 bg-blue-50 font-semibold'
                                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={link.page}
                        to={createPageUrl(link.page)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="pt-3 space-y-2">
                    <Link to={createPageUrl('GetSupport')} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg">
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
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
