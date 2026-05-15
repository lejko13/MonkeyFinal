import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ArrowRight, Check, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { getServiceById } from '../lib/servicesData';
import { getProjects } from '../lib/projectsData';
import { useLang } from '../lib/LangContext';

export default function ServiceDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const sd = t.serviceDetail;
  const service = getServiceById(id, t);
  const allProjects = getProjects(t);

  const FILTERS = t.projects.filters;
  const serviceTagMap = {
    'web-dizajn': 'Web',
    'brand-identita': 'Branding',
    'video-reklamy': null,
    'seo': 'SEO',
    'reklamy': null,
    'social-media': null,
  };
  const preselectedTag = serviceTagMap[id] || null;
  const initialFilter = preselectedTag
    ? (FILTERS.find(f => f === preselectedTag) || FILTERS[0])
    : FILTERS[0];

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isAll = activeFilter === FILTERS[0];
  const filteredProjects = isAll
    ? allProjects
    : allProjects.filter(p => p.tags.includes(activeFilter));

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [filteredProjects]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    updateScrollState();
  }, [activeFilter]);

  // Reset filter when language changes (filter label changes)
  useEffect(() => {
    const newPreselected = serviceTagMap[id] || null;
    const newInitial = newPreselected
      ? (FILTERS.find(f => f === newPreselected) || FILTERS[0])
      : FILTERS[0];
    setActiveFilter(newInitial);
  }, [t]);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-heading font-black text-white/10 mb-4">404</div>
          <h1 className="text-2xl font-heading font-bold text-white mb-4">{sd.notFound}</h1>
          <Link to="/" className="text-[#24a1db] hover:text-white transition-colors font-body text-sm">← {sd.back}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto relative">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#24a1db]/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link to="/#sluzby" className="inline-flex items-center gap-2 text-xs font-body text-white/30 hover:text-white transition-colors tracking-widest">
            <ChevronLeft className="w-3.5 h-3.5" />
            {sd.back}
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#24a1db] animate-pulse" />
            <span className="text-xs font-body tracking-[0.25em] text-[#24a1db] uppercase">{sd.serviceLabel} {service.num}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-heading font-black text-[clamp(44px,7vw,96px)] leading-[0.92] tracking-tight mb-6">
            <span className="text-white">{service.title}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg text-white/50 font-body leading-relaxed mb-10 max-w-2xl">
            {service.overview}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <a href="/#kontakt">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(36,161,219,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm"
              >
                {sd.ctaBtn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tags */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="flex flex-wrap gap-2">
          {service.tags.map(tag => (
            <span key={tag} className="text-xs font-body font-medium px-3 py-1.5 bg-[#24a1db]/10 text-[#24a1db] rounded-sm border border-[#24a1db]/20">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24 border-t border-white/5 pt-16">
        <div className="mb-10">
          <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">{sd.processBadge}</span>
          <h2 className="font-heading font-black text-3xl text-white mt-2 tracking-tight">{sd.processHeading}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {(service.process || []).map((step, i) => (
            <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-[#0e0f11] border border-white/5 rounded-sm p-6 hover:border-[#24a1db]/20 transition-all">
              <div className="text-4xl font-heading font-black text-[#24a1db]/15 mb-4">{step.step}</div>
              <h3 className="font-heading font-bold text-white text-sm mb-2">{step.title}</h3>
              <p className="text-xs font-body text-white/40 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">{sd.benefitsBadge}</span>
            <h2 className="font-heading font-black text-3xl text-white mt-2 mb-8 tracking-tight">{sd.benefitsHeading}</h2>
            <div className="grid grid-cols-2 gap-3">
              {(service.benefits || []).map(benefit => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-sm bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#24a1db]" />
                  </div>
                  <span className="text-sm font-body text-white/60">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0e0f11] border border-white/5 rounded-sm p-8">
            <div className="text-5xl font-heading font-black text-[#24a1db]/10 mb-2">{service.num}</div>
            <h3 className="font-heading font-black text-2xl text-white mb-2">{service.heroTagline}</h3>
            <p className="text-white/40 font-body text-sm leading-relaxed mb-6">{service.tagline}</p>
            <a href="/#kontakt">
              <button className="w-full py-3 bg-[#24a1db] text-black font-heading font-black text-xs tracking-widest rounded-sm hover:bg-[#1e8fc4] transition-colors">
                {sd.quoteBtn}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24 border-t border-white/5 pt-16">
          <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">{sd.faqBadge}</span>
          <h2 className="font-heading font-black text-3xl text-white mt-2 mb-8 tracking-tight">{sd.faqHeading}</h2>
          <div className="space-y-0 border-t border-white/5 max-w-3xl">
            {service.faq.map((item, i) => (
              <div key={i} className="py-6 border-b border-white/5">
                <h3 className="font-heading font-semibold text-white text-base mb-2">{item.q}</h3>
                <p className="text-sm font-body text-white/40 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects section — same UI as homepage */}
      <section className="py-24 border-t border-white/5 bg-[#0b0b0d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight">
              <span className="text-white">{t.projects.heading1} </span>
              <span className="text-[#24a1db]">{t.projects.heading2}</span>
            </motion.h2>
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll(1)} disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-200 ${
                  activeFilter === f ? 'bg-[#24a1db] text-black' : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30'
                }`}>
                {f}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab' }}
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              el.style.cursor = 'grabbing';
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              const onMove = (me) => { el.scrollLeft = scrollLeft - (me.pageX - el.offsetLeft - startX); };
              const onUp = () => { el.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}
          >
            {filteredProjects.map((project, i) => (
              <motion.div key={project.id + activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex-shrink-0 w-[300px] lg:w-[340px]">
                <Link to={`/${project.id}`} className="group block rounded-sm overflow-hidden bg-[#111214] border border-white/5 hover:border-[#24a1db]/30 transition-colors duration-300" draggable={false}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[#24a1db]/0 group-hover:bg-[#24a1db]/8 transition-colors duration-500" />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm text-[10px] font-body font-bold text-white/60 border border-white/10">{project.year}</div>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-body font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/60 rounded-sm border border-white/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-white text-lg group-hover:text-[#24a1db] transition-colors duration-200">{project.name}</h3>
                        <p className="text-xs text-white/40 font-body mt-0.5">{project.category}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-[#24a1db] group-hover:border-[#24a1db] group-hover:text-black transition-all duration-200 flex-shrink-0">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-white/40 font-body mt-3 leading-relaxed">{project.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}