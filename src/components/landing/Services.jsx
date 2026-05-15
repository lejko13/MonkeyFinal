import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../../lib/LangContext';
import { getServices } from '../../lib/servicesData';

export default function Services() {
  const { t } = useLang();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const services = getServices(t).map(s => ({ ...s, href: `/sluzby/${s.id}` }));

  return (
    <section id="sluzby" className="py-24 lg:py-32 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight"
            >
              <span className="text-white">{t.services.heading1}</span>
              <br />
              <span className="text-[#24a1db]">{t.services.heading2}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white/40 font-body max-w-xs leading-relaxed lg:text-right"
          >
            {t.services.subtext}
          </motion.p>
        </div>

        {/* Service list */}
        <div className="space-y-0 border-t border-white/8">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={service.href}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`group relative flex items-center justify-between py-6 px-6 border-b border-white/8 transition-all duration-300 cursor-pointer block ${
                  hoveredIndex === index ? 'bg-[#24a1db] -mx-2 px-8 rounded-sm' : 'hover:bg-white/3'
                }`}
              >
                <div className="flex items-center gap-6 lg:gap-10">
                  <span className={`text-xs font-body font-bold transition-colors duration-200 ${
                    hoveredIndex === index ? 'text-black/50' : 'text-white/20'
                  }`}>
                    {service.num}
                  </span>
                  <div>
                    <div className={`font-heading font-bold text-lg lg:text-2xl transition-colors duration-200 ${
                      hoveredIndex === index ? 'text-black' : 'text-white'
                    }`}>
                      {service.title}
                    </div>
                    <div className={`flex flex-wrap gap-1.5 mt-1.5 ${hoveredIndex === index ? '' : 'hidden lg:flex'}`}>
                      {service.tags.map(tag => (
                        <span
                          key={tag}
                          className={`text-[10px] font-body font-medium px-2 py-0.5 rounded-sm transition-colors duration-200 ${
                            hoveredIndex === index ? 'bg-black/15 text-black/70' : 'bg-white/5 text-white/30'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`hidden lg:block text-sm font-body transition-colors duration-200 ${
                    hoveredIndex === index ? 'text-black/60' : 'text-white/30'
                  }`}>
                    {service.tagline}
                  </span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                    hoveredIndex === index
                      ? 'bg-black/15 text-black'
                      : 'border border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}