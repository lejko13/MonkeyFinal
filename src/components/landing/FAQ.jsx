import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

export default function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  const faqs = t.faqItems || [];
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[360px_1fr] gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-tight">
              <span className="text-white">{f.heading1} </span>
              <span className="text-[#24a1db]">{f.heading2}</span>
            </h2>
            <p className="text-sm text-white/30 font-body mt-6 leading-relaxed">{f.subtext}</p>
            <a href="#kontakt" className="inline-flex items-center gap-2 mt-6 text-sm font-heading font-bold text-[#24a1db] hover:text-white transition-colors group">
              {f.contactLink}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <div className="space-y-0 border-t border-white/8">
            {faqs.map((faq, i) => (
              <motion.div key={faq.num} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="border-b border-white/8">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group">
                  <div className="flex items-center gap-5">
                    <span className="text-xs font-body font-bold text-white/20">{faq.num}</span>
                    <span className={`font-heading font-semibold text-base transition-colors ${openIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>{faq.question}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-sm border flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-200 ${openIndex === i ? 'border-[#24a1db] text-[#24a1db]' : 'border-white/10 text-white/30 group-hover:border-white/30'}`}>
                    {openIndex === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="pb-5 pl-9 text-sm text-white/40 font-body leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}