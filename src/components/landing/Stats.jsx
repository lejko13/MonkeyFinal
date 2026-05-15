import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

const clients = [
  'AARDWARK', 'PANORAMA\nGOLF', 'SOPHISTIT', 'NEOREAL', 'PHARMINFO', 'HOTEL POD\nLIPOU', 'BEGAM', 'VELTREK', 'MONO', 'AMG SECURITY'
];

export default function Stats() {
  const { t } = useLang();
  const s = t.stats;

  const stats = [
    { value: '150+', label: s.clients, sub: s.clientsSub },
    { value: '8+', label: s.years, sub: s.yearsSub },
    { value: '12', label: s.experts, sub: s.expertsSub },
    { value: '300+', label: s.projects, sub: s.projectsSub },
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden mb-24">
          {stats.map((stat, i) => (
            <motion.div key={stat.value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#0b0b0d] px-8 py-10 group hover:bg-[#0e0f11] transition-colors duration-300">
              <div className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-none tracking-tight text-white group-hover:text-[#24a1db] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="mt-4 text-sm font-body font-medium text-white/70">{stat.label}</div>
              <div className="text-sm font-body text-white/30">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-body tracking-[0.25em] text-white/20 uppercase">{s.workedWith}</span>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-marquee">
              {[...clients, ...clients].map((client, i) => (
                <div key={i} className="flex-shrink-0 text-white/20 hover:text-white/60 transition-colors duration-300 font-heading font-black text-sm tracking-widest whitespace-pre-line text-center">
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