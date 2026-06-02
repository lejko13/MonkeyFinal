import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLang } from '../../lib/LangContext';
import { useMediaQuery } from "react-responsive";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';

import { useNavigate } from "react-router-dom";



import 'swiper/css';
import 'swiper/css/navigation';

export default function Testimonials() {
  const navigate = useNavigate();

  const { t } = useLang();
  const tm = t.testimonials;
  const testimonials = t.testimonialsData || [];

  const swiperRef = useRef(null);


    const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <section className="py-24 lg:py-32 border-t border-white/5 bg-[#0b0b0d]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <motion.h2
  initial={!isMobile ? { opacity: 0, y: 20 } : false}
  whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
  viewport={!isMobile ? { once: true } : undefined}
  className="font-heading font-black text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight"
>
  <span className="text-white">{tm.heading1} </span>
  <span className="text-[#24a1db]">{tm.heading2}</span>
</motion.h2>

          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

     <Swiper
  modules={[Navigation, Mousewheel]}
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
  }}
  mousewheel={{
    forceToAxis: true,
    sensitivity: 1,
  }}
  initialSlide={2}
  slidesPerView={1}
  spaceBetween={20}
  speed={700}
  grabCursor={true}
  allowTouchMove={true}
  simulateTouch={true}
  centeredSlides={true}
  watchSlidesProgress={true}
  breakpoints={{
    768: {
      slidesPerView: 2,
      centeredSlides: false,
    },
    1200: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  }}
>
          {testimonials.map((item, i) => (
  <SwiperSlide key={item.name + i}>

    <motion.div
   
  className={`rounded-sm p-7 flex flex-col gap-5 transition-all duration-300 h-full border cursor-pointer ${
    isMobile
      ? 'bg-[#0e0f11] border-[#24a1db]/20'
      : 'bg-[#0e0f11] border-white/5 hover:border-[#24a1db]/20'
  }`}
>
  <div className="flex gap-0.5">
    {Array(5).fill(0).map((_, j) => (
      <span key={j} className="text-[#24a1db] text-sm">
        ★
      </span>
    ))}
  </div>

  <p className="text-white/60 font-body text-sm leading-relaxed flex-1">
    "{item.text}"
  </p>

  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
    <img
      src={item.avatar}
      alt={item.name}
      className="w-10 h-10 rounded-full object-cover border border-white/10"
    />

    <div>
      <div className="font-heading font-bold text-sm text-white">
        {item.name}
      </div>

      <div className="text-xs text-[#24a1db] font-body">
        {item.role}
      </div>
    </div>
  </div>
</motion.div>
  
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}