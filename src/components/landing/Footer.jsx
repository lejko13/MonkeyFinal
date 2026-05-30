import React from 'react';
import { Instagram, Linkedin, Globe,Mail } from 'lucide-react';
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
            
              <span className="font-heading font-black text-white text-base tracking-tight">
                LEO<span className="text-[#24a1db]"> FUDALY</span>
              </span>
            </div>
            <p className="text-xs text-white/30 font-body leading-relaxed mb-5">{f.tagline}</p>
            <a href="mailto:Leo.fudaly@gmail.com" className="text-xs text-white/30 hover:text-[#24a1db] font-body transition-colors flex items-center gap-2">
    Leo.fudaly@gmail.com
            </a>
            <div className="flex gap-3 mt-5">
              <a
  href="https://www.instagram.com/leofudaly/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all"
>
  <Instagram className="w-3.5 h-3.5" />
</a>

<a
  href="https://leofudaly.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all"
>
  <Globe className="w-3.5 h-3.5" />
</a>

<a
  href="mailto:leo.fudaly@gmail.com"
  className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-white/30 hover:text-[#24a1db] hover:border-[#24a1db] transition-all"
>
  <Mail className="w-3.5 h-3.5" />
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
            {/* <h4 className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{f.agencyHeading}</h4>
            <ul className="space-y-3">
              {f.agencyLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-white/40 hover:text-[#24a1db] font-body transition-colors">{link.label}</a>
                </li>
              ))}
            </ul> */}
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

       
        
      </div>
    </footer>
  );
}