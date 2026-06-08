import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../../lib/LangContext';
import { getServices } from '../../lib/servicesData';
import { useMediaQuery } from 'react-responsive';

export default function Services() {
  const { t } = useLang();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const services = getServices(t).map((s) => ({ ...s, href: `/sluzby/${s.id}` }));

  const isMobile = useMediaQuery({ maxWidth: 768 });

  console.log(services);
  
  return (
    <section id="sluzby" className="py-24 lg:py-32 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.h2
              initial={!isMobile ? { opacity: 0, y: 30 } : false}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: true } : undefined}
              className="font-heading font-black text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-tight"
            >
              <span className="text-white">{t.services.heading1}</span>
              <br />
              <span className="text-[#24a1db]">{t.services.heading2}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={!isMobile ? { opacity: 0 } : false}
            whileInView={!isMobile ? { opacity: 1 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
            transition={!isMobile ? { delay: 0.2 } : undefined}
            className="text-sm text-white/40 font-body max-w-xs leading-relaxed lg:text-right"
          >
            {t.services.subtext}
          </motion.p>
        </div>

        <div className="space-y-0 border-t border-white/8">
          {services.map((service, index) => {
            const isHovered = !isMobile && hoveredIndex === index;

            return (
              <motion.div
                key={service.num}
                initial={!isMobile ? { opacity: 0 } : false}
                whileInView={!isMobile ? { opacity: 1 } : undefined}
                viewport={!isMobile ? { once: true } : undefined}
                transition={!isMobile ? { delay: index * 0.05 } : undefined}
              >
                <Link
                  to={service.href}
                  onMouseEnter={() => {
                    if (!isMobile) setHoveredIndex(index);
                  }}
                  className={`relative flex items-center justify-between py-6 px-6 border-b border-white/8 cursor-pointer block ${
                    !isMobile ? 'group transition-all duration-300' : ''
                  } ${isHovered ? 'bg-[#24a1db] -mx-2 px-8 rounded-sm' : ''}`}
                >
                  <div className="flex items-center gap-6 lg:gap-10">
                    <span
                      className={`text-xs font-body font-bold ${
                        !isMobile ? 'transition-colors duration-200' : ''
                      } ${isHovered ? 'text-black/50' : 'text-white/20'}`}
                    >
                      {service.num}
                    </span>

                    <div>
                      <div
                        className={`font-heading font-bold text-lg lg:text-2xl ${
                          !isMobile ? 'transition-colors duration-200' : ''
                        } ${isHovered ? 'text-black' : 'text-white'}`}
                      >
                        {service.title}
                      </div>

                      <div
                        className={`flex flex-wrap gap-1.5 mt-1.5 ${
                          isHovered ? '' : 'hidden lg:flex'
                        }`}
                      >
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-[10px] font-body font-medium px-2 py-0.5 rounded-sm ${
                              !isMobile ? 'transition-colors duration-200' : ''
                            } ${
                              isHovered
                                ? 'bg-black/15 text-black/70'
                                : 'bg-white/5 text-white/30'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span
                      className={`hidden lg:block text-sm font-body ${
                        !isMobile ? 'transition-colors duration-200' : ''
                      } ${isHovered ? 'text-black/60' : 'text-white/30'}`}
                    >
                      {service.tagline}
                    </span>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        !isMobile ? 'transition-all duration-200' : ''
                      } ${
                        isHovered
                          ? 'bg-black/15 text-black'
                          : 'border border-white/10 text-white/40'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}