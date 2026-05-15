import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import ProjectGrid from '../components/projects/ProjectGrid';
import { getProjects } from '../lib/projectsData';
import { useLang } from '../lib/LangContext';

export default function ProjectsPage() {
  const { t } = useLang();
  const pp = t.projectsPage;
  const projects = getProjects(t);
  const FILTERS = t.projects.filters;
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  // Reset filter when language changes (filter labels change)
  useEffect(() => {
    setActiveFilter(FILTERS[0]);
  }, [t]);

  const isAll = activeFilter === FILTERS[0];
  const filtered = isAll ? projects : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-[#0b0b0d] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-[1400px] mx-auto relative">
        {/* Ambient glow */}
        <div className="absolute top-20 right-1/3 w-[500px] h-[400px] bg-[#24a1db]/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#24a1db] animate-pulse" />
            <span className="text-xs font-body tracking-[0.25em] text-[#24a1db] uppercase">{pp.badge}</span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-black text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.03em] mb-8">
            <span className="text-white">{pp.heading1} </span>
            <span className="text-[#24a1db]">{pp.heading2}</span>
          </h1>

          {/* Subtext + stats row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p className="text-white/40 font-body text-base max-w-lg leading-relaxed">{pp.subtext}</p>
            <div className="flex gap-8 lg:gap-12 flex-shrink-0">
              <div>
                <div className="font-heading font-black text-2xl text-white">{projects.length}+</div>
                <div className="text-xs font-body text-white/30 mt-0.5">{pp.statProjects || 'Projects'}</div>
              </div>
              <div>
                <div className="font-heading font-black text-2xl text-white">8+</div>
                <div className="text-xs font-body text-white/30 mt-0.5">{pp.statYears || 'Years'}</div>
              </div>
              <div>
                <div className="font-heading font-black text-2xl text-white">150+</div>
                <div className="text-xs font-body text-white/30 mt-0.5">{pp.statClients || 'Clients'}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Filters + Grid */}
      <section className="py-16 px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
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
          <span className="ml-auto text-xs font-body text-white/20 self-center">
            {filtered.length} {pp.resultsLabel || 'results'}
          </span>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectGrid projects={filtered} />
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-white/10 font-heading font-black text-6xl mb-4">∅</div>
            <p className="text-white/30 font-body text-sm">{pp.emptyState || 'No projects found'}</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}