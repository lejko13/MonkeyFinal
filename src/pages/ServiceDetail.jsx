import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, Check, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { getServiceById } from '../lib/servicesData';
import { getProjects } from '../lib/projectsData';
import { useLang } from '../lib/LangContext';

import { useNavigate } from 'react-router-dom';

export default function ServiceDetail() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const navigate = useNavigate();
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
    seo: 'SEO',
    reklamy: null,
    'social-media': null,
  };

  const preselectedTag = serviceTagMap[id] || null;

  const initialFilter = preselectedTag
    ? FILTERS.find((f) => f === preselectedTag) || FILTERS[0]
    : FILTERS[0];

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isAll = activeFilter === FILTERS[0];

  const filteredProjects = isAll
    ? allProjects
    : allProjects.filter((p) => p.tags.includes(activeFilter));

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

  useEffect(() => {
    const newPreselected = serviceTagMap[id] || null;

    const newInitial = newPreselected
      ? FILTERS.find((f) => f === newPreselected) || FILTERS[0]
      : FILTERS[0];

    setActiveFilter(newInitial);
  }, [t, id]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * 380,
        behavior: isMobile ? 'auto' : 'smooth',
      });
    }
  };


  const handleKontaktClick = () => {
  if (location.pathname !== '/') {
    navigate('/');

    setTimeout(() => {
      document
        .getElementById('kontakt')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    document
      .getElementById('kontakt')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
};

  
  if (!service) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-heading font-black text-white/10 mb-4">
            404
          </div>

          <h1 className="text-2xl font-heading font-bold text-white mb-4">
            {sd.notFound}
          </h1>

          <Link
            to="/"
            className={`text-[#24a1db] font-body text-sm ${
              !isMobile ? 'hover:text-white transition-colors' : ''
            }`}
          >
            ← {sd.back}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto relative">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#24a1db]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={!isMobile ? { opacity: 0, x: -10 } : false}
          animate={!isMobile ? { opacity: 1, x: 0 } : undefined}
          className="mb-12"
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-body text-white/30 tracking-widest ${
              !isMobile ? 'hover:text-white transition-colors' : ''
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            {sd.back}
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <motion.div
            initial={!isMobile ? { opacity: 0 } : false}
            animate={!isMobile ? { opacity: 1 } : undefined}
            transition={!isMobile ? { delay: 0.1 } : undefined}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full bg-[#24a1db] ${
                !isMobile ? 'animate-pulse' : ''
              }`}
            />

            <span className="text-xs font-body tracking-[0.25em] text-[#24a1db] uppercase">
              {sd.serviceLabel} {service.num}
            </span>
          </motion.div>

          <motion.h1
            initial={!isMobile ? { opacity: 0, y: 30 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.7 } : undefined}
            className="font-heading font-black text-[clamp(44px,7vw,96px)] leading-[0.92] tracking-tight mb-6"
          >
            <span className="text-white">{service.title}</span>
          </motion.h1>

          <motion.p
            initial={!isMobile ? { opacity: 0, y: 20 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { delay: 0.25 } : undefined}
            className="text-lg text-white/50 font-body leading-relaxed mb-10 max-w-2xl"
          >
            {service.overview}
          </motion.p>

          <motion.div
            initial={!isMobile ? { opacity: 0 } : false}
            animate={!isMobile ? { opacity: 1 } : undefined}
            transition={!isMobile ? { delay: 0.4 } : undefined}
          >
            <motion.button
  onClick={handleKontaktClick}
  whileHover={
    !isMobile
      ? {
          scale: 1.03,
          boxShadow: '0 0 30px rgba(36,161,219,0.3)',
        }
      : undefined
  }
  whileTap={!isMobile ? { scale: 0.97 } : undefined}
  className={`flex items-center gap-3 px-8 py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm ${
    !isMobile ? 'group' : ''
  }`}
>
  {sd.ctaBtn}

  <ArrowRight
    className={`w-4 h-4 ${
      !isMobile
        ? 'group-hover:translate-x-1 transition-transform'
        : ''
    }`}
  />
</motion.button>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body font-medium px-3 py-1.5 bg-[#24a1db]/10 text-[#24a1db] rounded-sm border border-[#24a1db]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24 border-t border-white/5 pt-16">
        <div className="mb-10">
          <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">
            {sd.processBadge}
          </span>

          <h2 className="font-heading font-black text-3xl text-white mt-2 tracking-tight">
            {sd.processHeading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {(service.process || []).map((step, i) => (
            <motion.div
              key={step.step}
              initial={!isMobile ? { opacity: 0, y: 20 } : false}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: true } : undefined}
              transition={!isMobile ? { delay: i * 0.08 } : undefined}
              className={`bg-[#0e0f11] border border-white/5 rounded-sm p-6 ${
                !isMobile ? 'hover:border-[#24a1db]/20 transition-all' : ''
              }`}
            >
              <div className="text-4xl font-heading font-black text-[#24a1db]/15 mb-4">
                {step.step}
              </div>

              <h3 className="font-heading font-bold text-white text-sm mb-2">
                {step.title}
              </h3>

              <p className="text-xs font-body text-white/40 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">
              {sd.benefitsBadge}
            </span>

            <h2 className="font-heading font-black text-3xl text-white mt-2 mb-8 tracking-tight">
              {sd.benefitsHeading}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {(service.benefits || []).map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-sm bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#24a1db]" />
                  </div>

                  <span className="text-sm font-body text-white/60">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0e0f11] border border-white/5 rounded-sm p-8">
            <div className="text-5xl font-heading font-black text-[#24a1db]/10 mb-2">
              {service.num}
            </div>

            <h3 className="font-heading font-black text-2xl text-white mb-2">
              {service.heroTagline}
            </h3>

            <p className="text-white/40 font-body text-sm leading-relaxed mb-6">
              {service.tagline}
            </p>
<button
  onClick={handleKontaktClick}
  className={`w-full py-3 bg-[#24a1db] text-black font-heading font-black text-xs tracking-widest rounded-sm ${
    !isMobile ? 'hover:bg-[#1e8fc4] transition-colors' : ''
  }`}
>
  {sd.quoteBtn}
</button>
          </div>
        </div>
      </section>

      {service.faq && service.faq.length > 0 && (
        <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24 border-t border-white/5 pt-16">
          <span className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase">
            {sd.faqBadge}
          </span>

          <h2 className="font-heading font-black text-3xl text-white mt-2 mb-8 tracking-tight">
            {sd.faqHeading}
          </h2>

          <div className="space-y-0 border-t border-white/5 max-w-3xl">
            {service.faq.map((item, i) => (
              <div key={i} className="py-6 border-b border-white/5">
                <h3 className="font-heading font-semibold text-white text-base mb-2">
                  {item.q}
                </h3>

                <p className="text-sm font-body text-white/40 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-24 border-t border-white/5 bg-[#0b0b0d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <motion.h2
              initial={!isMobile ? { opacity: 0, y: 30 } : false}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: true } : undefined}
              className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight"
            >
              <span className="text-white">{t.projects.heading1} </span>
              <span className="text-[#24a1db]">{t.projects.heading2}</span>
            </motion.h2>

            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 disabled:opacity-20 disabled:cursor-not-allowed ${
                  !isMobile
                    ? 'hover:text-white hover:border-white/30 transition-all'
                    : ''
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 disabled:opacity-20 disabled:cursor-not-allowed ${
                  !isMobile
                    ? 'hover:text-white hover:border-white/30 transition-all'
                    : ''
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide ${
                  activeFilter === f
                    ? 'bg-[#24a1db] text-black'
                    : `border border-white/10 text-white/40 ${
                        !isMobile ? 'hover:text-white hover:border-white/30' : ''
                      }`
                } ${!isMobile ? 'transition-all duration-200' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              cursor: !isMobile ? 'grab' : 'auto',
            }}
            onMouseDown={
              !isMobile
                ? (e) => {
                    const el = scrollRef.current;
                    if (!el) return;

                    el.style.cursor = 'grabbing';

                    const startX = e.pageX - el.offsetLeft;
                    const scrollLeft = el.scrollLeft;

                    const onMove = (me) => {
                      el.scrollLeft =
                        scrollLeft - (me.pageX - el.offsetLeft - startX);
                    };

                    const onUp = () => {
                      el.style.cursor = 'grab';
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };

                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }
                : undefined
            }
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id + activeFilter}
                initial={!isMobile ? { opacity: 0 } : false}
                animate={!isMobile ? { opacity: 1 } : undefined}
                transition={
                  !isMobile
                    ? { delay: i * 0.04, duration: 0.4 }
                    : undefined
                }
                className="flex-shrink-0 w-[300px] lg:w-[340px]"
              >
                <Link
                  to={`/${project.id}`}
                  draggable={false}
                  className={`block rounded-sm overflow-hidden bg-[#111214] border border-white/5 ${
                    !isMobile
                      ? 'group hover:border-[#24a1db]/30 transition-colors duration-300'
                      : ''
                  }`}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      draggable={false}
                      className={`w-full h-full object-cover ${
                        !isMobile
                          ? 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
                          : ''
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent" />

                    <div
                      className={`absolute inset-0 bg-[#24a1db]/0 ${
                        !isMobile
                          ? 'group-hover:bg-[#24a1db]/8 transition-colors duration-500'
                          : ''
                      }`}
                    />

                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm text-[10px] font-body font-bold text-white/60 border border-white/10">
                      {project.year}
                    </div>

                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-body font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/60 rounded-sm border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`font-heading font-bold text-white text-lg ${
                            !isMobile
                              ? 'group-hover:text-[#24a1db] transition-colors duration-200'
                              : ''
                          }`}
                        >
                          {project.name}
                        </h3>

                        <p className="text-xs text-white/40 font-body mt-0.5">
                          {project.category}
                        </p>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 flex-shrink-0 ${
                          !isMobile
                            ? 'group-hover:bg-[#24a1db] group-hover:border-[#24a1db] group-hover:text-black transition-all duration-200'
                            : ''
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <p className="text-xs text-white/40 font-body mt-3 leading-relaxed">
                      {project.desc}
                    </p>
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