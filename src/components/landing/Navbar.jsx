import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../../lib/LangContext';
import { SUPPORTED_LANGS } from '../../lib/i18n';
import { getServices } from '../../lib/servicesData';

const LANG_LABELS = {
  SK: 'Slovenčina', EN: 'English', CZ: 'Čeština', DE: 'Deutsch', PL: 'Polski',
};

export default function Navbar() {
  const { lang, switchLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Derived from t — reacts to language changes
  const serviceLinks = getServices(t).map(s => ({
    label: s.title,
    href: `/sluzby/${s.id}`,
    tag: s.tags.slice(0, 3).join(' · '),
  }));

  const navLinks = [
    { label: t.nav.services, href: '#sluzby', hasDropdown: true },
    { label: t.nav.projects, href: '/projects', isRoute: true },
    { label: t.nav.team, href: '#tim' },
    { label: t.nav.contact, href: '#kontakt' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-[#0b0b0d]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]" ref={dropdownRef}>
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 z-10">
            <div className="w-8 h-8  rounded flex items-center justify-center">
              <img src="/logosvetle.png" alt="MonkeyMedia logo" className='w-6' />
            </div>
            <span className="font-heading font-black text-white text-lg tracking-tight">
              MONKEY<span className="text-[#24a1db]">MEDIA</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <button
                    onMouseEnter={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center gap-1 text-xs font-body font-medium tracking-widest text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a href={link.href} className="text-xs font-body font-medium tracking-widest text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 text-xs font-body tracking-widest"
              >
                <Globe className="w-3 h-3" />
                {lang}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-36 bg-[#111214] border border-white/10 rounded-sm overflow-hidden"
                  >
                    {SUPPORTED_LANGS.map((code) => (
                      <button
                        key={code}
                        onClick={() => { switchLang(code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-body tracking-wide transition-colors ${
                          lang === code ? 'text-[#24a1db] bg-[#24a1db]/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="font-bold mr-2">{code}</span>
                        {LANG_LABELS[code]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#kontakt">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-[#24a1db] hover:bg-[#1e8fc4] text-black font-heading font-bold text-xs tracking-widest transition-all duration-200 rounded-sm"
              >
                {t.nav.cta}
              </motion.button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white/80 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Services mega dropdown */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            onMouseLeave={() => setServicesOpen(false)}
            className="hidden lg:block absolute top-full left-0 right-0 bg-[#0e0f11]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="max-w-[1400px] mx-auto px-10 py-8">
              <div className="grid grid-cols-3 gap-4">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    onClick={() => setServicesOpen(false)}
                    className="group flex items-center justify-between p-4 rounded-sm hover:bg-white/5 border border-transparent hover:border-[#24a1db]/20 transition-all duration-200"
                  >
                    <div>
                      <div className="font-heading font-semibold text-white text-sm group-hover:text-[#24a1db] transition-colors">{service.label}</div>
                      <div className="text-xs text-white/30 mt-0.5 font-body">{service.tag}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#24a1db] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0b0b0d]/98 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block text-base font-heading font-semibold text-white/70 hover:text-white tracking-widest transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex gap-2">
                  {SUPPORTED_LANGS.map((code) => (
                    <button key={code} onClick={() => switchLang(code)}
                      className={`px-3 py-1.5 text-xs font-body font-bold rounded-sm border transition-all ${
                        lang === code ? 'border-[#24a1db] text-[#24a1db]' : 'border-white/10 text-white/40 hover:text-white/70'
                      }`}>
                      {code}
                    </button>
                  ))}
                </div>
                <a href="#kontakt" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm">
                    {t.nav.cta}
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}