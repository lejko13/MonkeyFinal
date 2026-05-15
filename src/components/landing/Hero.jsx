import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '../../lib/LangContext';

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face',
];

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      [
        { x: canvas.width * 0.7 + Math.sin(time) * 60, y: canvas.height * 0.4 + Math.cos(time * 0.7) * 40, r: 320, opacity: 0.08 },
        { x: canvas.width * 0.3 + Math.cos(time * 0.8) * 50, y: canvas.height * 0.7 + Math.sin(time * 0.6) * 30, r: 200, opacity: 0.05 },
      ].forEach(orb => {
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(36, 161, 219, ${orb.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0b0b0d]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-20">
        <div className="max-w-[900px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#24a1db] animate-pulse" />
            <span className="text-xs font-body font-medium text-white/40 tracking-[0.2em] uppercase">{h.badge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[clamp(52px,8vw,120px)] font-black leading-[0.95] tracking-[-0.04em] mb-8">
            <span className="text-white">{h.h1a}</span>
            <br />
            <span className="text-white">{h.h1b}</span>
            <br />
            <span className="text-[#24a1db]" style={{ textShadow: '0 0 60px rgba(36,161,219,0.4)' }}>{h.h1c}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base text-white/50 font-body max-w-lg leading-relaxed mb-10">
            {h.sub1}{' '}
            <span className="text-white/80 font-medium">{h.sub2}</span>
            {' '}{h.sub3}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="flex flex-col sm:flex-row gap-3">
            <a href="#kontakt">
              <motion.button whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(36,161,219,0.35)' }} whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm transition-all duration-200">
                {h.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </a>
            <a href="#projekty">
              <motion.button whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-heading font-bold text-sm tracking-widest rounded-sm hover:bg-white/5 transition-all duration-200">
                {h.ctaSecondary}
              </motion.button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.75 }} className="flex items-center gap-4 mt-12">
            <div className="flex -space-x-2">
              {AVATARS.map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#0b0b0d] object-cover" />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">{Array(5).fill(0).map((_, i) => <span key={i} className="text-[#24a1db] text-sm">★</span>)}</div>
              <div className="text-xs text-white/40 font-body">
                <span className="text-white font-medium">150+</span> {h.socialProof}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-body tracking-[0.3em] text-white/20 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}