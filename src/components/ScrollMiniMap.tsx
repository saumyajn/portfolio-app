import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollMinimap() {
  const { scrollYProgress } = useScroll();
  
  // Add physics to the tracker so it glides
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 30, 
    stiffness: 200, 
    restDelta: 0.001 
  });

  // Map progress to height percentage
  const indicatorHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 h-[30vh] md:h-[40vh] w-[2px] z-[100] flex flex-col items-center pointer-events-none mix-blend-screen hidden sm:flex">
      
      {/* Background Track */}
      <div className="absolute top-0 bottom-0 w-full bg-white/10 rounded-full" />
      
      {/* The Active Glowing Fill */}
      <motion.div 
        className="absolute top-0 w-full bg-gradient-to-b from-[var(--accent-sapphire)] to-[var(--accent-emerald)] rounded-full origin-top"
        style={{ height: indicatorHeight }}
      >
        {/* The Glowing Leading Dot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_3px_var(--accent-emerald-glow)]" />
      </motion.div>

      {/* Optional: Tiny markers for sections */}
      <div className="absolute top-[25%] w-4 h-[1px] bg-white/20 right-0" />
      <div className="absolute top-[50%] w-4 h-[1px] bg-white/20 right-0" />
      <div className="absolute top-[80%] w-4 h-[1px] bg-white/20 right-0" />

    </div>
  );
}