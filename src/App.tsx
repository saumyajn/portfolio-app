// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useVelocity, useSpring } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Career from './pages/Career';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Aurora from './components/Aurora';
import CyberPenguin from './components/CyberPenguin';
import FluidCanvas from './components/FluidCanvas';
// import TransitionWarp from './components/CyberGrid';

const Projects = () => <div className="h-screen w-full flex items-center justify-center text-white font-mono text-4xl border-t border-white/5">PROJECTS</div>;
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
    const timer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const introRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, scrollY } = useScroll();// Global scroll
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"]
  });
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 50, stiffness: 400 });


  const horizontalSlide = useTransform(introProgress, [0, 1], ["0%", "-50%"]);
  const homeParallax = useTransform(introProgress, [0, 1], ["0vw", "30vw"]);
  const aboutParallax = useTransform(introProgress, [0, 1], ["20vw", "0vw"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  console.log(isMobile)
  const robotX = useTransform(introProgress, [0, 1], ["60vw", "10vw"]);
  const robotY = useTransform(introProgress, [0, 1], ["20vh", isMobile ? "70vh" : "25vh"]);
  const robotScale = useTransform(introProgress, [0, 1], [1, isMobile ? 0.5 : 1]);

  useMotionValueEvent(introProgress, "change", (latest) => {
    setIsCoding(latest > 0.3);
  });

  useEffect(() => {
    document.body.style.overflow = isBooting ? 'hidden' : 'auto';
  }, [isBooting]);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      {/* We apply a completely transparent layout. The background is strictly handled by the fixed div below. */}
      <div className="w-full relative min-h-screen text-white bg-transparent pointer-events-none">

        <div className="fixed top=0 left-0 w-screen h-screen z-0  pointer-events-auto overflow-hidden bg-[#050505]">

          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115] via-[#08090c] to-[#030303] z-0 pointer-events-none" />
          {/* <TransitionWarp velocity={smoothVelocity} /> */}

          {/* UNIFIED GLOBAL LIGHTING: This ensures every page shares the exact same ambient tint! */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-transparent via-[#10b981]/5 to-[#3b82f6]/10" />

          {/* Aurora - Scaled up and shifted down so it covers the center/bottom of the screen! */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 w-full h-[130%] z-10 pointer-events-none mix-blend-screen opacity-80 scale-150"
          >
            <Aurora colorStops={["#3b82f6","#6732e3", "#8b5cf6"]} blend={0.6} speed={0.8} />
          </motion.div>

          {/* FluidCanvas */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto mix-blend-screen opacity-100">
            <FluidCanvas />
          </div>

        </div>

        <GlobalNav />
        <GlobalSocials />

        {/* SECTION 1: The Intro Morph (Home -> About) */}
        <div ref={introRef} className="h-[200vh] relative w-full z-10">
          <div className="sticky top-0 h-screen w-full overflow-hidden">

            {!isBooting && (
              <motion.div
                style={{ x: robotX, y: robotY, scale: robotScale }}
                className="absolute top-0 left-0 z-20 pointer-events-none origin-bottom-left"
              >
                <div className="pointer-events-auto w-fit h-fit">
                  <CyberPenguin isCoding={isCoding} />
                </div>
              </motion.div>
            )}

            {/* The physical sliding track */}
            <motion.div
              style={{ x: horizontalSlide }}
              className="flex w-[calc(200vw+2px)] h-full"
            >
              <div className="w-screen h-full flex-shrink-0 relative overflow-hidden">
                <motion.div style={{ x: homeParallax }} className="w-full h-full">
                  <Home isBooting={isBooting} />
                </motion.div>
              </div>
              <div className="w-screen h-full flex-shrink-0 relative overflow-hidden -ml-[1px]">
                <motion.div style={{ x: aboutParallax }} className="w-full h-full">
                  <About />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 2: The Rest of the Stack */}
        {/* Notice how there are NO background colors here. They will perfectly inherit the Aurora background. */}
        <div className="w-full flex flex-col relative z-20">
          {/* If Skills has a hardcoded bg-color inside its file, remove it! */}
          <div className="w-full h-screen"><Skills /></div>
          <div className="w-full"><Career /></div>
          <div className="w-full"><Projects /></div>
          <div className="w-full h-screen"><Contact /></div>
        </div>

      </div>
    </ReactLenis>
  );
}