import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import Courses from '../components/sections/Courses';
import Benefits from '../components/sections/Benefits';
import Methodology from '../components/sections/Methodology';
import Stats from '../components/sections/Stats';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import BlogTeaser from '../components/sections/BlogTeaser';
import Faq from '../components/sections/Faq';
import Contact from '../components/sections/Contact';

export default function Home() {
  const location = useLocation();

  // Permite que otras páginas (ej. detalle de curso) naveguen a "/" y
  // continúen el scroll automático hacia la sección solicitada.
  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId) return;
    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Hero />
      <Courses />
      <Benefits />
      <Methodology />
      <Stats />
      <Gallery />
      <Testimonials />
      <BlogTeaser />
      <Faq />
      <Contact />
    </>
  );
}
