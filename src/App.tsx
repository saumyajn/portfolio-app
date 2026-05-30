// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Career from './pages/Career';
import Projects from './pages/Projects';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Aurora from './components/Aurora';
import CyberPenguin from './components/CyberPenguin';
import FluidCanvas from './components/FluidCanvas';

const Contact = () => <div className="h-screen w-full flex items-center justify-center text-white font-mono text-4xl border-t border-white/5">CONTACT</div>;

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
  const [isCoding, setIsCoding] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Hard-lock the scroll at the DOM level
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsBooting(false);
      // Hard-unlock the scroll exactly after 2.5 seconds
      document.body.style.overflow = '';
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const introRef = useRef<HTMLDivElement>(null);

  // Global scroll
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"]
  });


  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const robotX = useTransform(introProgress, [0, 1], ["60vw", "10vw"]);
  const robotY = useTransform(introProgress, [0, 1], ["20vh", isMobile ? "70vh" : "25vh"]);
  const robotScale = useTransform(introProgress, [0, 1], [1, isMobile ? 0.5 : 1]);


  useMotionValueEvent(introProgress, "change", (latest) => {
    setIsCoding(latest > 0.4);
  });

  useEffect(() => {
    document.body.style.overflow = isBooting ? 'hidden' : 'auto';
  }, [isBooting]);

  return (
    <ReactLenis root options={{ lerp: 0.06, smoothWheel: true }}>

      <div className="w-full relative min-h-screen text-white bg-transparent pointer-events-none">
        <div className="fixed top-0 left-0 w-screen h-screen z-0  pointer-events-auto overflow-hidden bg-[#050505]">

          <div className="fixed inset-0 z-0 bg-[#030303] pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />
          </div>

          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 w-full h-[130%] z-10 pointer-events-none mix-blend-screen opacity-80 scale-150"
          >
            <Aurora colorStops={["#3b82f6", "#6732e3", "#8b5cf6"]} blend={0.6} speed={0.8} />
          </motion.div>

          {/* FluidCanvas */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto mix-blend-screen opacity-100">
            <FluidCanvas />
          </div>

        </div>

        <GlobalNav />
        <GlobalSocials />

        {/* SECTION 1: The Intro Morph (Home -> About) */}
        <div ref={introRef} className="w-full relative z-10 pointer-events-auto flex flex-col">
          <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
            <div className="sticky top-0 w-full h-screen overflow-hidden">

              {!isBooting && (
                <motion.div
                  style={{ x: robotX, y: robotY, scale: robotScale }}
                  className="absolute top-0 left-0 z-50 pointer-events-none origin-bottom-left"
                >
                  <div className="pointer-events-auto w-fit h-fit drop-shadow-2xl">
                    <CyberPenguin isCoding={isCoding} />
                  </div>
                </motion.div>
              )}

            </div>
          </div>
          <div className="w-full h-screen relative flex items-center"><Home isBooting={isBooting} /></div>
          <div className="w-full h-screen relative flex items-center"><About /></div>
        </div>
        <div className="w-full flex flex-col relative z-20 pointer-events-auto">
          <div className="w-full min-h-screen "><Skills /></div>
          <div className="w-full"><Career /></div>

          {/* The Flagship Horizontal Carousel */}
          <div className="w-full"><Projects /></div>

          <div className="w-full"><Contact /></div>
        </div>
      </div>
    </ReactLenis >
  );
}