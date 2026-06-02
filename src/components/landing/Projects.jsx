import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../lib/projectsData';
import { useLang } from '../../lib/LangContext';
import { useMediaQuery } from 'react-responsive';

export default function Projects() {
  const { t } = useLang();
  const projects = getProjects(t);
  const FILTERS = t.projects.filters;
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isAll = activeFilter === FILTERS[0];

  const filtered = isAll
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

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
  }, [filtered]);

  useEffect(() => {
    setActiveFilter(FILTERS[0]);
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }

    updateScrollState();
  }, [activeFilter]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir * 380,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projekty" className="py-24 lg:py-32 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.h2
            initial={!isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
            viewport={!isMobile ? { once: true } : undefined}
            className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[1.2] tracking-tight"
          >
            <span className="text-white">{t.projects.heading1} </span>
            <span className="text-[#24a1db]">{t.projects.heading2}</span>
          </motion.h2>

          {!isMobile && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide ${
                activeFilter === f
                  ? 'bg-[#24a1db] text-black'
                  : isMobile
                    ? 'border border-white/10 text-white/40'
                    : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all duration-200'
              }`}
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
            cursor: isMobile ? 'auto' : 'grab',
          }}
          onMouseDown={(e) => {
            if (isMobile) return;

            const el = scrollRef.current;
            if (!el) return;

            el.style.cursor = 'grabbing';

            const startX = e.pageX - el.offsetLeft;
            const scrollLeft = el.scrollLeft;

            const onMove = (me) => {
              const x = me.pageX - el.offsetLeft;
              el.scrollLeft = scrollLeft - (x - startX);
            };

            const onUp = () => {
              el.style.cursor = 'grab';
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        >

          {filtered.length > 0 ? (
  filtered.map((project, i) => (
    <motion.div
      key={project.id + activeFilter}
      initial={!isMobile ? { opacity: 0 } : false}
      animate={!isMobile ? { opacity: 1 } : undefined}
      transition={!isMobile ? { delay: i * 0.04, duration: 0.4 } : undefined}
      className="flex-shrink-0 w-[300px] lg:w-[340px]"
    >
      <Link
        to={`/${project.id}`}
        draggable={false}
        className={`block rounded-sm overflow-hidden bg-[#111214] border ${
          isMobile
            ? 'border-[#24a1db]/30'
            : 'group border-white/5 hover:border-[#24a1db]/30 transition-colors duration-300'
        }`}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            draggable={false}
            className={`w-full h-full object-cover ${
              isMobile
                ? 'scale-[1.05]'
                : 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent" />

          <div
            className={`absolute inset-0 ${
              isMobile
                ? 'bg-[#24a1db]/8'
                : 'bg-[#24a1db]/0 group-hover:bg-[#24a1db]/8 transition-colors duration-500'
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
                className={`font-heading font-bold text-lg ${
                  isMobile
                    ? 'text-[#24a1db]'
                    : 'text-white group-hover:text-[#24a1db] transition-colors duration-200'
                }`}
              >
                {project.name}
              </h3>

              <p className="text-xs text-white/40 font-body mt-0.5">
                {project.category}
              </p>
            </div>

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isMobile
                  ? 'bg-[#24a1db] border-[#24a1db] text-black'
                  : 'border border-white/10 text-white/30 group-hover:bg-[#24a1db] group-hover:border-[#24a1db] group-hover:text-black transition-all duration-200'
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
  ))
) : (
   <div className="w-full py-20 flex items-center justify-center">
    <div className="text-center">
      <h3 className="font-heading font-bold text-lg lg:text-2xl text-white">
        Žiadne projekty
      </h3>

      <p className="mt-1.5 text-sm text-white/30 font-body">
        V tejto kategórii zatiaľ nie sú dostupné žiadne projekty.
      </p>
    </div>
  </div>
)}

        </div>
      </div>
    </section>
  );
}