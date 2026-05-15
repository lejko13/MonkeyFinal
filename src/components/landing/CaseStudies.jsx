import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function CaseStudies({ caseStudyImages }) {
  const projects = [
    { name: 'Aardwark', category: 'E-commerce', image: caseStudyImages[0] },
    { name: 'Panorama Golf', category: 'Firemný web', image: caseStudyImages[1] },
    { name: 'SophistIT', category: 'IT & Security', image: caseStudyImages[2] },
    { name: 'NeoReal', category: 'Reality', image: caseStudyImages[3] },
    { name: 'PharmInfo', category: 'Healthcare', image: caseStudyImages[4] },
    { name: 'Hotel Pod Lipou', category: 'Hotelierstvo', image: caseStudyImages[5] },
  ];

  return (
    <section id="referencie" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary font-heading text-sm font-medium tracking-widest uppercase">Case Studies</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight">
            Vybrané <span className="text-primary">referencie</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg mt-4 max-w-xl">
            Pozrite sa na niektoré z našich najúspešnejších projektov, ktoré pomohli firmám rásť online.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{project.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}