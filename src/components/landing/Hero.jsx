import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '../../lib/LangContext';
import { useMediaQuery } from 'react-responsive';

export default function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { t } = useLang();
  const h = t.hero;
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      [
        {
          x: canvas.width * 0.7 + Math.sin(time) * 60,
          y: canvas.height * 0.4 + Math.cos(time * 0.7) * 40,
          r: 320,
          opacity: 0.08,
        },
        {
          x: canvas.width * 0.3 + Math.cos(time * 0.8) * 50,
          y: canvas.height * 0.7 + Math.sin(time * 0.6) * 30,
          r: 200,
          opacity: 0.05,
        },
      ].forEach((orb) => {
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r
        );

        grad.addColorStop(0, `rgba(36, 161, 219, ${orb.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile]);

  return (
    <section className="relative min-h-[800px] md:min-h-screen flex flex-col justify-center overflow-hidden bg-[#0b0b0d]">
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-32 pb-20">
        <div className="max-w-[900px]">
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 20 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.6, delay: 0.1 } : undefined}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-[#24a1db] ${!isMobile ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-body font-medium text-white/40 tracking-[0.2em] uppercase">
              {h.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={!isMobile ? { opacity: 0, y: 40 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={
              !isMobile
                ? { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
                : undefined
            }
            className="font-heading text-[clamp(52px,8vw,120px)] font-black leading-[0.95] tracking-[-0.04em] mb-8"
          >
            <span className="text-white">{h.h1a}</span>
            <br />
            <span className="text-white">{h.h1b}</span>
            <br />
            <span
              className="text-[#24a1db]"
              style={{
                textShadow: !isMobile
                  ? '0 0 60px rgba(36,161,219,0.4)'
                  : 'none',
              }}
            >
              {h.h1c}
            </span>
          </motion.h1>

          <motion.p
            initial={!isMobile ? { opacity: 0, y: 20 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.6, delay: 0.45 } : undefined}
            className="text-base text-white/50 font-body max-w-lg leading-relaxed mb-10"
          >
            {h.sub1}{' '}
            <span className="text-white/80 font-medium">{h.sub2}</span>{' '}
            {h.sub3}
          </motion.p>

          <motion.div
            initial={!isMobile ? { opacity: 0, y: 20 } : false}
            animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
            transition={!isMobile ? { duration: 0.6, delay: 0.55 } : undefined}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="#kontakt">
              <motion.button
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.03,
                        boxShadow: '0 0 40px rgba(36,161,219,0.35)',
                      }
                    : undefined
                }
                whileTap={!isMobile ? { scale: 0.97 } : undefined}
                className={`flex items-center gap-3 px-8 py-4 bg-[#24a1db] text-black font-heading font-black text-sm tracking-widest rounded-sm ${
                  !isMobile ? 'group transition-all duration-200' : ''
                }`}
              >
                {h.ctaPrimary}

                <ArrowRight
                  className={`w-4 h-4 ${
                    !isMobile
                      ? 'transition-transform group-hover:translate-x-1'
                      : ''
                  }`}
                />
              </motion.button>
            </a>

            <a href="#projekty">
              <motion.button
                whileHover={
                  !isMobile
                    ? {
                        scale: 1.02,
                        borderColor: 'rgba(255,255,255,0.3)',
                      }
                    : undefined
                }
                whileTap={!isMobile ? { scale: 0.98 } : undefined}
                className={`flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-heading font-bold text-sm tracking-widest rounded-sm ${
                  !isMobile
                    ? 'transition-all duration-200 hover:bg-white/5'
                    : ''
                }`}
              >
                {h.ctaSecondary}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={!isMobile ? { opacity: 0 } : false}
        animate={!isMobile ? { opacity: 1 } : undefined}
        transition={!isMobile ? { delay: 1.2 } : undefined}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-body tracking-[0.3em] text-white/20 uppercase">
          Scroll
        </span>

        {isMobile ? (
          <ChevronDown className="w-4 h-4 text-white/20" />
        ) : (
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-4 h-4 text-white/20" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}