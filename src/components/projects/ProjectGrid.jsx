import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

export default function ProjectGrid({ projects }) {


  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {projects.map((project, i) => (
        <motion.div
  key={project.id}
  initial={!isMobile ? { opacity: 0, y: 20 } : false}
  animate={!isMobile ? { opacity: 1, y: 0 } : undefined}
  transition={!isMobile ? { delay: i * 0.04, duration: 0.4 } : undefined}
>
          <Link
             to={`/${project.id}`}
  className={`block rounded-sm overflow-hidden bg-[#111214] border ${
    isMobile
      ? 'border-[#24a1db]/30'
      : 'group border-white/5 hover:border-[#24a1db]/30 transition-colors duration-300'
  }`}
          >
            <div className="relative h-52 overflow-hidden">
              <img
  src={project.image}
  alt={project.name}
  className={`w-full h-full object-cover ${
    isMobile
      ? 'scale-[1.05]'
      : 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
  }`}
/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-transparent" />
             <div
  className={`absolute inset-0 ${
    isMobile
      ? 'bg-[#24a1db]/8'
      : 'bg-[#24a1db]/0 group-hover:bg-[#24a1db]/8 transition-colors duration-500'
  }`}
/>
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-sm text-[10px] font-body font-bold text-white/60 border border-white/10">
                {project.year}
              </div>
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-body font-medium px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/60 rounded-sm border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                 <h3
  className={`font-heading font-bold text-base ${
    isMobile
      ? 'text-[#24a1db]'
      : 'text-white group-hover:text-[#24a1db] transition-colors duration-200'
  }`}
>
  {project.name}
</h3>
                  <p className="text-xs text-white/40 font-body mt-0.5">{project.category}</p>
                </div>
               <div
  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
    isMobile
      ? 'bg-[#24a1db] border-[#24a1db] text-black'
      : 'border border-white/10 text-white/30 group-hover:bg-[#24a1db] group-hover:border-[#24a1db] group-hover:text-black transition-all duration-200'
  }`}
>
  <ArrowUpRight className="w-3.5 h-3.5" />
</div>
              </div>
              <p className="text-xs text-white/40 font-body mt-3 leading-relaxed line-clamp-2">{project.desc}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}