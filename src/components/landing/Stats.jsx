import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../lib/LangContext';
import { useMediaQuery } from 'react-responsive';

const clients = [
  'CVIC SAM',
  'KKFOL',
  'NASA KAVA BISTRO',
  'LENI HONCAROVA',
  'D FITNESS KEZMAROK',
  'FORMACASA',
  'POPRAD DESIGN',
  'BOOKING APP',
  'PIXELATE STUDIO',
  'DONUTERIA',
  'BURGERYS',
  'VODO EXPERT',
  'SOTTO CASTAGNO',
  'TIMOTHY SIMON'
];

export default function Stats() {
  const { t } = useLang();
  const s = t.stats;

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const stats = [
    { value: '34+', label: s.clients, sub: s.clientsSub },
    { value: '3+', label: s.years, sub: s.yearsSub },
    { value: '2', label: s.experts, sub: s.expertsSub },
    { value: '89+', label: s.projects, sub: s.projectsSub },
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px border border-white/5 rounded-sm overflow-hidden mb-24 bg-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={!isMobile ? { opacity: 0, y: 20 } : false}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: true } : undefined}
              transition={!isMobile ? { duration: 0.6, delay: i * 0.1 } : undefined}
              className={`bg-[#0b0b0d] px-8 py-10 ${
                !isMobile
                  ? 'group transition-colors duration-300 hover:bg-[#0e0f11]'
                  : ''
              }`}
            >
              <div
                className={`font-heading font-black text-[clamp(40px,5vw,72px)] leading-none tracking-tight ${
                  !isMobile
                    ? 'text-white transition-colors duration-300 group-hover:text-[#24a1db]'
                    : 'text-white'
                }`}
              >
                {stat.value}
              </div>

              <div className="mt-4 text-sm font-body font-medium text-white/70">
                {stat.label}
              </div>

              <div className="text-sm font-body text-white/30">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-body tracking-[0.25em] text-white/20 uppercase">
              {s.workedWith}
            </span>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-marquee">
  {[...clients, ...clients].map((client, i) => (
    <div
      key={i}
      className={`flex-shrink-0 font-heading font-black text-sm tracking-widest whitespace-pre-line text-center ${
        !isMobile
          ? 'text-white/20 transition-colors duration-300 hover:text-white/60'
          : 'text-white/20'
      }`}
    >
      {client}
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </section>
  );
}