import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Services from '../components/landing/Services';
import Projects from '../components/landing/Projects';
import Process from '../components/landing/Process';
import Testimonials from '../components/landing/Testimonials';
import Team from '../components/landing/Team';
import FAQ from '../components/landing/FAQ';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] font-body overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Projects />
      <Process />
      <Testimonials />
      <Team />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}