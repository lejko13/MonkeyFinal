import React from 'react';
import { Instagram, Linkedin, Globe } from 'lucide-react';
import { useLang } from '../../lib/LangContext';
import { getServices } from '../../lib/servicesData';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const serviceLinks = getServices(t);

  return (
    <footer className="border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#24a1db] rounded flex items-center justify-center">
                <span className="font-heading font-black text-black text-xs">M</span>
              </div>
              <span className="font-heading font-black text-white text-base tracking-tight">
                MONKEY<span className="text-[#24a1db]">MEDIA</span>
              </span>
            </div>
            <p className="text-xs text-white/30 font-body leading-relaxed mb-5">{f.tagline}</p>
            <a href="mailto:info@monkeymedia.sk" className="text-xs text-white/30 hover:text-[#24a1db] font-body transition-colors flex items-center gap-2">
              ✉ info@monkeymedia.sk
            </a>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all">
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{f.servicesHeading}</h4>
            <ul className="space-y-3">
              {serviceLinks.map(s => (
                <li key={s.id}>
                  <Link to={`/sluzby/${s.id}`} className="text-xs text-white/40 hover:text-[#24a1db] font-body transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{f.agencyHeading}</h4>
            <ul className="space-y-3">
              {f.agencyLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-white/40 hover:text-[#24a1db] font-body transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{f.bookingHeading}</h4>
            <p className="text-xs text-white/30 font-body leading-relaxed mb-5">{f.bookingText}</p>
            <a href="#kontakt">
              <button className="w-full py-3 bg-[#24a1db] hover:bg-[#1e8fc4] text-black font-heading font-black text-[10px] tracking-widest rounded-sm transition-all duration-200">
                {f.bookingCta}
              </button>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/15 font-body">{f.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-white/15 hover:text-[#24a1db] font-body transition-colors">GDPR</a>
            <a href="#" className="text-[11px] text-white/15 hover:text-[#24a1db] font-body transition-colors">{f.privacy || 'Privacy'}</a>
          </div>
        </div>

        <div className="mt-8 overflow-hidden">
          <div className="font-heading font-black text-white/[0.03] select-none leading-none" style={{ fontSize: 'clamp(60px, 12vw, 180px)', letterSpacing: '-0.04em' }}>
            MONKEYMEDIA
          </div>
        </div>
      </div>
    </footer>
  );
}