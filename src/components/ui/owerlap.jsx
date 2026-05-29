import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export default function ProjectLightbox({
  projects,
  activeIndex,
  onClose,
  onNavigate,
}) {
  const image = projects[activeIndex];
  const total = projects.length;

  const prev = useCallback(() => {
    onNavigate((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onNavigate]);

  const next = useCallback(() => {
    onNavigate((activeIndex + 1) % total);
  }, [activeIndex, total, onNavigate]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 700px)",
  });

  return (
    <motion.div
      initial={isDesktop ? { opacity: 0 } : false}
      animate={isDesktop ? { opacity: 1 } : {}}
      exit={isDesktop ? { opacity: 0 } : undefined}
      transition={isDesktop ? { duration: 0.25 } : undefined}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
      background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >

<button
  onClick={onClose}
  className="absolute top-5 right-5 z-10"
>
  <div className="w-12 h-12 rounded-xl bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm cursor-pointer">
    <X className="w-4 h-4 text-[#24a1db]" />
  </div>
</button>

<div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
  <div className="h-12 px-5 rounded-xl bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center backdrop-blur-sm">
    <span className="text-[11px] font-body font-bold tracking-[0.2em] text-[#24a1db]">
      {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  </div>
</div>



 <motion.div
  key={activeIndex}
  initial={isDesktop ? { opacity: 0, scale: 0.96 } : false}
  animate={isDesktop ? { opacity: 1, scale: 1 } : {}}
  exit={isDesktop ? { opacity: 0, scale: 0.96 } : undefined}
  transition={isDesktop ? { duration: 0.3 } : undefined}
  className="relative w-full max-w-[80vw] mx-6 md:mx-16 flex items-center justify-center"
  onClick={(e) => e.stopPropagation()}
>
  <img
    src={image}
    alt=""
    className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
  />
</motion.div> 

<button
  onClick={(e) => {
    e.stopPropagation();
    prev();
  }}
  className={`absolute z-10 ${
    isDesktop
      ? "left-4 top-1/2 -translate-y-1/2"
      : "bottom-20 left-[38%] -translate-x-1/2"
  }`}
>
  <div className="w-12 h-12 rounded-xl bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm cursor-pointer">
    <ChevronLeft className="w-4 h-4 text-[#24a1db]" />
  </div>
</button>

<button
  onClick={(e) => {
    e.stopPropagation();
    next();
  }}
  className={`absolute z-10 ${
    isDesktop
      ? "right-4 top-1/2 -translate-y-1/2"
      : "bottom-20 right-[38%] translate-x-1/2"
  }`}
>
  <div className="w-12 h-12 rounded-xl bg-[#24a1db]/10 border border-[#24a1db]/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm cursor-pointer">
    <ChevronRight className="w-4 h-4 text-[#24a1db]" />
  </div>
</button>

   <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
 {isDesktop &&
  projects.map((_, i) => (
    <button
      key={i}
      onClick={(e) => {
        e.stopPropagation()
        onNavigate(i)
      }}
      className="cursor-pointer"
    >
      <div
        className={`
          h-3 rounded-xl border backdrop-blur-sm transition-all duration-300
          ${
            i === activeIndex
              ? "w-10 bg-[#24a1db]/15 border-[#24a1db]/30 glow-blue-sm"
              : "w-3 bg-[#24a1db]/10 border-[#24a1db]/20"
          }
        `}
      />
    </button>
  ))}
</div>
    </motion.div>
  );
}