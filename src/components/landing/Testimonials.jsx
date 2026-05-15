import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

export default function Testimonials() {
  const { t } = useLang();
  const tm = t.testimonials;
  const testimonials = t.testimonialsData || [];
  const [current, setCurrent] = useState(0);
  const VISIBLE = 3;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(testimonials.length - VISIBLE, c + 1));
  const visible = testimonials.slice(current, current + VISIBLE);

  return (
    <section className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight">
            <span className="text-white">{tm.heading1} </span>
            <span className="text-[#24a1db]">{tm.heading2}</span>
          </motion.h2>
          <div className="flex gap-2">
            <button onClick={prev} disabled={current === 0}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button onClick={next} disabled={current >= testimonials.length - VISIBLE}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {visible.map((item, i) => (
            <motion.div key={item.name + i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-[#0e0f11] border border-white/5 hover:border-[#24a1db]/20 rounded-sm p-7 flex flex-col gap-5 transition-all duration-300">
              <div className="flex gap-0.5">{Array(5).fill(0).map((_, j) => <span key={j} className="text-[#24a1db] text-sm">★</span>)}</div>
              <Quote className="w-7 h-7 text-[#24a1db]/20" />
              <p className="text-white/60 font-body text-sm leading-relaxed flex-1">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <div className="font-heading font-bold text-sm text-white">{item.name}</div>
                  <div className="text-xs text-[#24a1db] font-body">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}