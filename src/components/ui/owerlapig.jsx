import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export default function igowerlap({
  onClose,
}) {
 
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


    </motion.div>
  );
}