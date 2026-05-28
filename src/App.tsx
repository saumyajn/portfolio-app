// src/App.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Aurora from './components/Aurora';
import CyberPenguin from './components/CyberPenguin';
import FluidCanvas from './components/FluidCanvas';

import Experience from './pages/Experience';
const Projects = () => <div className="h-screen w-full flex items-center justify-center text-white font-mono text-4xl">PROJECTS</div>;
const Contact = () => <div className="h-screen w-full flex items-center justify-center text-white font-mono text-4xl">CONTACT</div>;


// Global Navigation
const GlobalNav = () => (
  <nav className="fixed top-8 right-8 md:right-12 z-[100] flex gap-6 md:gap-6 font-mono text-sm tracking-widest text-[var(--text-secondary)] pointer-events-auto">
    {['HOME', 'SKILLS', 'CAREER', 'PROJECTS', 'CONTACT'].map((item) => (
      <a key={item} href={`#${item.toLowerCase()}`} className="group relative hover:text-white transition-colors">
        {item}
        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--accent-emerald)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </a>
    ))}
  </nav>
);

// Global Socials
const GlobalSocials = () => (
  <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-6 text-[var(--text-secondary)] pointer-events-auto">
    <a href="https://github.com/saumyajn" className="hover:text-[var(--accent-sapphire)] transition-colors"><FiGithub size={22} /></a>
    <a href="https://linkedin.com/in/saumyajn" className="hover:text-[var(--accent-sapphire)] transition-colors"><FiLinkedin size={22} /></a>
    <a href="mailto:saumyajn1994@gmail.com" className="hover:text-[var(--accent-sapphire)] transition-colors"><FiMail size={22} /></a>
    <div className="w-[1px] h-24 bg-gradient-to-b from-[var(--text-secondary)] to-transparent mt-2 opacity-30" />
  </div>
);

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // 0: Home | 1: About | 2: Skills | 3: Experience | 4: Projects | 5: Contact
  const [activeStage, setActiveStage] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  const isCoding = activeStage >= 1 && activeStage <= 4;

  // Responsive logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      setIsLocked(false); // Unlock scroll after boot
    }, 2500);
    return () => clearTimeout(timer);
  }, []);


  // Section logic
  const handleWheel = (e: React.WheelEvent) => {
    if (isLocked || isBooting) return;

    // Throttle the scroll to prevent rapid switching
    setIsLocked(true);
    setTimeout(() => setIsLocked(false), 800);

    if (e.deltaY > 0 && activeStage < 5) {
      setActiveStage(prev => prev + 1);
    } else if (e.deltaY < 0 && activeStage > 0) {
      setActiveStage(prev => prev - 1);
    }
  };

  const targetX = activeStage === 0 ? "0vw" : "-100vw";
  const targetY = activeStage <= 1 ? "0vh" : `-${(activeStage - 1) * 100}vh`;

  const robotX = activeStage === 0 ? "60vw" : "10vw";
  const robotY = activeStage === 0 ? "20vh" : activeStage === 1 ? (isMobile ? "70vh" : "25vh") : "-50vh";
  const robotScale = activeStage === 0 ? 1 : activeStage === 1 ? (isMobile ? 0.5 : 1) : 0;

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative" onWheel={handleWheel}>
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Aurora colorStops={["#3b82f6", "#10b981", "#8b5cf6"]} blend={0.6} speed={0.8} />
        <FluidCanvas />
      </div>

      <GlobalNav />
      <GlobalSocials />

      {!isBooting && (
        <motion.div
          style={{ x: robotX, y: robotY, scale: robotScale }}
          className="absolute top-0 left-0 z-20 pointer-events-none origin-bottom-left"
        >
          <CyberPenguin isCoding={isCoding} />
        </motion.div>
      )}

      <motion.div
        style={{ x: targetX, y: targetY }}
      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.9 }}
        className="flex w-[200vw] h-[500vh] relative z-30 pointer-events-none"
      >
        {/* COLUMN 1: Home Page (Left Side) */}
        <section className="w-screen h-screen flex-shrink-0 pointer-events-none">
          <Home isBooting={isBooting} />
        </section>

        {/* COLUMN 2: About Page (Top) & Skills Page (Bottom) */}
        <section className="w-screen h-[500vh] flex-shrink-0 flex flex-col pointer-events-none">
          <div className="h-screen w-full"><About /></div>
          <div className="h-screen w-full "><Skills /></div>
          <div className="h-screen w-full "><Experience /></div>
          <div className="h-screen w-full "><Projects /></div>
          <div className="h-screen w-full "><Contact /></div>
        </section>
      </motion.div>
    </div>
  );
}