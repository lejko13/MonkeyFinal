import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../lib/projectsData';
import { useLang } from '../../lib/LangContext';

export default function Projects() {
  const { t } = useLang();
  const projects = getProjects(t);
  const FILTERS = t.projects.filters;
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // FILTERS[0] is always "All/Všetko/etc" — index 0 = show all
  const isAll = activeFilter === FILTERS[0];
  const filtered = isAll
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

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

  // Reset filter to "All" when language changes (filter labels change)
  useEffect(() => {
    setActiveFilter(FILTERS[0]);
  }, [t]);

  // Reset scroll on filter change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    updateScrollState();
  }, [activeFilter]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
    }
  };

  return (
    <section id="projekty" className="py-24 lg:py-32 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight"
          >
            <span className="text-white">{t.projects.heading1} </span>
            <span className="text-[#24a1db]">{t.projects.heading2}</span>
          </motion.h2>
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
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-[#24a1db] text-black'
                  : 'border border-white/10 text-white/40 hover:text-white hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            cursor: 'grab',
          }}
          onMouseDown={(e) => {
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
          {filtered.map((project, i) => (
            <motion.div
              key={project.id + activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex-shrink-0 w-[300px] lg:w-[340px]"
            >
              <Link
                to={`/${project.id}`}
                className="group block rounded-sm overflow-hidden bg-[#111214] border border-white/5 hover:border-[#24a1db]/30 transition-colors duration-300"
                draggable={false}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent" />
                  {/* Blue overlay on hover */}
                  <div className="absolute inset-0 bg-[#24a1db]/0 group-hover:bg-[#24a1db]/8 transition-colors duration-500" />

                  {/* Year */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm text-[10px] font-body font-bold text-white/60 border border-white/10">
                    {project.year}
                  </div>
                  {/* Tags */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-body font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/60 rounded-sm border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg group-hover:text-[#24a1db] transition-colors duration-200">
                        {project.name}
                      </h3>
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
  );
}