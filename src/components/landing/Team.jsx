import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Globe } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

const TEAM_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
];

export default function Team() {
  const { t } = useLang();
  const tm = t.team;
  const members = t.teamMembers || [];

  return (
    <section id="tim" className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight">
            <span className="text-white">{tm.heading1} </span>
            <span className="text-[#24a1db]">{tm.heading2}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-sm text-white/30 font-body max-w-xs lg:text-right">
            {tm.subtext}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-sm bg-[#0e0f11] border border-white/5 hover:border-[#24a1db]/30 transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={TEAM_AVATARS[i]} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f11] via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at bottom, rgba(36,161,219,0.15) 0%, transparent 60%)' }} />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-white text-base">{member.name}</h3>
                <div className="text-[#24a1db] text-xs font-body font-medium mt-0.5">{member.role}</div>
                <p className="text-white/40 text-xs font-body mt-3 leading-relaxed">{member.bio}</p>
                <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                  <button className="text-white/20 hover:text-[#24a1db] transition-colors"><Linkedin className="w-4 h-4" /></button>
                  <button className="text-white/20 hover:text-[#24a1db] transition-colors"><Globe className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}