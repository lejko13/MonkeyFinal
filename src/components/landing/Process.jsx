import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

export default function Process() {
  const { t } = useLang();
  const p = t.process;
  const steps = t.processSteps || [];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="proces" className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <span className="text-xs font-body font-medium tracking-[0.25em] text-[#24a1db] uppercase">{p.badge}</span>
          <h2 className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight mt-4">
            <span className="text-white">{p.heading1}</span>
            <br />
            <span className="text-[#24a1db]">{p.heading2}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-0 border-t border-white/5">
            {steps.map((step, i) => (
              <motion.button key={step.num} onClick={() => setActiveStep(i)}
                className={`w-full text-left flex items-center gap-6 py-6 border-b border-white/5 group transition-all duration-200 ${activeStep === i ? 'pl-4 border-l-2 border-l-[#24a1db]' : 'pl-0'}`}>
                <span className={`text-xs font-body font-bold transition-colors ${activeStep === i ? 'text-[#24a1db]' : 'text-white/20'}`}>{step.num}</span>
                <div className="flex-1">
                  <div className={`font-heading font-bold text-lg transition-colors ${activeStep === i ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>{step.title}</div>
                  <div className={`text-xs font-body mt-0.5 transition-colors ${activeStep === i ? 'text-[#24a1db]' : 'text-white/25'}`}>{step.duration}</div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-all ${activeStep === i ? 'text-[#24a1db] translate-x-1' : 'text-white/20 group-hover:text-white/40'}`} />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {steps[activeStep] && (
              <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="bg-[#0e0f11] border border-white/5 rounded-sm p-8 lg:p-10">
                <div className="text-6xl font-heading font-black text-[#24a1db]/10 mb-2">{steps[activeStep].num}</div>
                <h3 className="font-heading font-black text-2xl text-white mb-4">{steps[activeStep].title}</h3>
                <p className="text-white/50 font-body leading-relaxed text-sm mb-8">{steps[activeStep].desc}</p>
                <div>
                  <div className="text-xs font-body tracking-widest text-white/20 uppercase mb-4">{p.outputs}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {steps[activeStep].outputs.map(output => (
                      <div key={output} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#24a1db]" />
                        <span className="text-sm font-body text-white/60">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <a href="#kontakt">
                    <motion.button whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 text-sm font-heading font-bold text-[#24a1db] hover:text-white transition-colors group">
                      {p.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}