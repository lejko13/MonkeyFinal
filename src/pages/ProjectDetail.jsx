import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { getProjectById, getAdjacentProjects } from '../lib/projectsData';
import { useLang } from '../lib/LangContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const pd = t.projectDetail;
  const project = getProjectById(id, t);
  const { prev, next } = getAdjacentProjects(id, t);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-heading font-black text-white/10 mb-4">404</div>
          <h1 className="text-2xl font-heading font-bold text-white mb-4">Projekt nenájdený</h1>
          <Link to="/" className="text-[#24a1db] hover:text-white transition-colors font-body text-sm">← {pd.back}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link to="/#projekty" className="inline-flex items-center gap-2 text-xs font-body text-white/30 hover:text-white transition-colors tracking-widest">
            <ChevronLeft className="w-3.5 h-3.5" />
            {pd.back}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-body font-medium px-2.5 py-1 bg-white/5 text-white/40 rounded-sm border border-white/8 tracking-widest">
                  {tag}
                </span>
              ))}
              <span className="text-[10px] font-body font-medium px-2.5 py-1 bg-white/5 text-white/40 rounded-sm border border-white/8 tracking-widest">
                {project.year}
              </span>
            </div>

            <h1 className="font-heading font-black text-[clamp(48px,7vw,100px)] leading-[0.9] tracking-tight text-white mb-6">
              {project.name}
            </h1>

            <p className="text-white/50 font-body text-base leading-relaxed mb-6 max-w-lg">
              {project.desc}
            </p>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[#24a1db] hover:text-white transition-colors group"
            >
              <ExternalLink className="w-4 h-4" />
              {project.url.replace('https://', '').replace('http://', '')}
            </a>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/5 mt-8 lg:mt-0"
          >
            {[
              { label: pd.meta.client, value: project.client },
              { label: pd.meta.year, value: project.year },
              { label: pd.meta.duration, value: project.duration },
              { label: pd.meta.category, value: project.category },
            ].map(item => (
              <div key={item.label} className="bg-[#0e0f11] px-6 py-5">
                <div className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-2">{item.label}</div>
                <div className="font-heading font-semibold text-white text-sm">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24"
      >
        <div className="rounded-sm overflow-hidden aspect-video">
          <img src={project.gallery[0]} alt={project.name} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Challenge / Solution */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase mb-4">{pd.challenge}</div>
            <h2 className="font-heading font-black text-2xl text-white mb-5">{pd.challengeHeading}</h2>
            <p className="text-white/50 font-body leading-relaxed text-sm">{project.challenge}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase mb-4">{pd.solution}</div>
            <h2 className="font-heading font-black text-2xl text-white mb-5">{pd.solutionHeading}</h2>
            <p className="text-white/50 font-body leading-relaxed text-sm">{project.solution}</p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {project.gallery.slice(1).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-sm overflow-hidden aspect-video"
            >
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process & Results */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase mb-4">{pd.process}</div>
            <h2 className="font-heading font-black text-2xl text-white mb-5">{pd.processHeading}</h2>
            <div className="space-y-2">
              {project.process.split(' → ').map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-sm bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-body font-bold text-[#24a1db]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="text-sm font-body text-white/60">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-[10px] font-body tracking-[0.25em] text-[#24a1db] uppercase mb-4">{pd.results}</div>
            <h2 className="font-heading font-black text-2xl text-white mb-5">{pd.resultsHeading}</h2>
            <div className="space-y-3">
              {project.results.map((result, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#24a1db] flex-shrink-0" />
                  <span className="font-heading font-semibold text-white text-sm">{result}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Tech used */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid grid-cols-2 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/5">
          <div className="bg-[#0e0f11] p-8">
            <div className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{pd.servicesUsed}</div>
            <div className="flex flex-wrap gap-2">
              {project.services.map(s => (
                <span key={s} className="text-xs font-body font-medium px-3 py-1.5 bg-[#24a1db]/10 text-[#24a1db] rounded-sm border border-[#24a1db]/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-[#0e0f11] p-8">
            <div className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase mb-5">{pd.technologies}</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs font-body font-medium px-3 py-1.5 bg-white/5 text-white/50 rounded-sm border border-white/8">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="rounded-sm border border-white/5 bg-[#0e0f11] p-10 lg:p-16 text-center">
          <h2 className="font-heading font-black text-3xl lg:text-5xl text-white mb-4 tracking-tight">
            {pd.ctaHeading1} <span className="text-[#24a1db]">{pd.ctaHeading2}</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-md mx-auto mb-8">{pd.ctaSub}</p>
          <a href="/#kontakt">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(36,161,219,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm transition-all duration-200"
            >
              {pd.ctaBtn}
            </motion.button>
          </a>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto mb-24">
        <div className="grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/${prev.id}`}
              className="group flex flex-col gap-2 p-6 border border-white/5 rounded-sm bg-[#0e0f11] hover:border-[#24a1db]/20 transition-all"
            >
              <div className="flex items-center gap-2 text-[10px] font-body tracking-widest text-white/20 mb-2">
                <ArrowLeft className="w-3 h-3" /> {pd.prev}
              </div>
              <div className="font-heading font-bold text-white group-hover:text-[#24a1db] transition-colors">{prev.name}</div>
              <div className="text-xs text-white/30 font-body">{prev.category}</div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              to={`/${next.id}`}
              className="group flex flex-col gap-2 p-6 border border-white/5 rounded-sm bg-[#0e0f11] hover:border-[#24a1db]/20 transition-all text-right"
            >
              <div className="flex items-center justify-end gap-2 text-[10px] font-body tracking-widest text-white/20 mb-2">
                {pd.next} <ArrowRight className="w-3 h-3" />
              </div>
              <div className="font-heading font-bold text-white group-hover:text-[#24a1db] transition-colors">{next.name}</div>
              <div className="text-xs text-white/30 font-body">{next.category}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      <Footer />
    </div>
  );
}