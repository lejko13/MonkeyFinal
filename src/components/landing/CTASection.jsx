import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Instagram, CheckCircle } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

export default function CTASection() {
  const { t } = useLang();
  const c = t.contact;
  const f = c.form;
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="kontakt" className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[420px_1fr] gap-16 lg:gap-20 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[0.92] tracking-tight mb-6">
              <span className="text-white">{c.heading1}</span>
              <br />
              <span className="text-[#24a1db]">{c.heading2}</span>
            </h2>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-10 max-w-sm">{c.subtext}</p>

            <div className="space-y-4">
              <a href="mailto:info@monkeymedia.sk" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/30 group-hover:border-[#24a1db] group-hover:text-[#24a1db] transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase">EMAIL</div>
                  <div className="text-sm font-heading font-semibold text-white/70 group-hover:text-white transition-colors">info@monkeymedia.sk</div>
                </div>
              </a>
              <a href="https://instagram.com/monkeymedia" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/30 group-hover:border-[#24a1db] group-hover:text-[#24a1db] transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-body tracking-[0.2em] text-white/20 uppercase">INSTAGRAM</div>
                  <div className="text-sm font-heading font-semibold text-white/70 group-hover:text-white transition-colors">@monkeymedia</div>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2 mt-10">
              <div className="w-2 h-2 rounded-full bg-[#24a1db] animate-pulse" />
              <span className="text-xs font-body text-white/30">{c.responseTime}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="bg-[#0e0f11] border border-white/5 rounded-sm p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle className="w-12 h-12 text-[#24a1db]" />
                <h3 className="font-heading font-black text-2xl text-white">{f.successTitle}</h3>
                <p className="text-white/40 font-body text-sm max-w-xs">{f.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-body tracking-[0.15em] text-white/30 uppercase block mb-2">{f.name}</label>
                    <input type="text" placeholder={f.namePlaceholder} required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#24a1db] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-body tracking-[0.15em] text-white/30 uppercase block mb-2">{f.company}</label>
                    <input type="text" placeholder={f.companyPlaceholder} value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#24a1db] transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-body tracking-[0.15em] text-white/30 uppercase block mb-2">{f.email}</label>
                    <input type="email" placeholder={f.emailPlaceholder} required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#24a1db] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-body tracking-[0.15em] text-white/30 uppercase block mb-2">{f.phone}</label>
                    <input type="tel" placeholder={f.phonePlaceholder} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#24a1db] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-body tracking-[0.15em] text-white/30 uppercase block mb-2">{f.message}</label>
                  <textarea rows={4} placeholder={f.messagePlaceholder} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm font-body text-white placeholder-white/20 focus:outline-none focus:border-[#24a1db] transition-colors resize-none" />
                </div>
                <p className="text-[11px] text-white/20 font-body">
                  {f.gdpr}{' '}
                  <a href="#" className="text-[#24a1db] hover:underline">{f.gdprLink}</a>.
                </p>
                <motion.button whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(36,161,219,0.3)' }} whileTap={{ scale: 0.99 }} type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#24a1db] hover:bg-[#1e8fc4] text-black font-heading font-black text-sm tracking-widest rounded-sm transition-all duration-200">
                  {f.submit}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}