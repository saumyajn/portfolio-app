import { motion } from 'framer-motion';
import { FiBox, FiDatabase, FiCloud, FiLayout, FiTerminal, FiLayers, FiCheckCircle } from 'react-icons/fi';

const mainCores = [
  { name: "Angular", icon: <FiLayout />, color: "emerald", position: "col-start-1 row-start-1 md:translate-x-12 md:translate-y-8" },
  { name: "React", icon: <FiLayers />, color: "sapphire", position: "col-start-3 row-start-1 md:-translate-x-12 md:translate-y-8" },
  { name: "Node.js", icon: <FiBox />, color: "emerald", position: "col-start-1 row-start-2 md:translate-x-4" },
  { name: "AWS", icon: <FiCloud />, color: "emerald", position: "col-start-3 row-start-2 md:-translate-x-4" },
  { name: "Python", icon: <FiTerminal />, color: "sapphire", position: "col-start-1 row-start-3 md:translate-x-12 md:-translate-y-8" },
  { name: "System Design", icon: <FiDatabase />, color: "sapphire", position: "col-start-3 row-start-3 md:-translate-x-12 md:-translate-y-8" },
];

const row1 = ["TypeScript", "JavaScript", "HTML5", "CSS", "SCSS", "Tailwind CSS", "NgRx", "RxJS", "Redux", "Next.js", "Webpack", "Jest"];
const row2 = ["Java", "Spring MVC", "PostgreSQL", "NoSQL", "MongoDB", "Firebase", "Jenkins", "Docker", "Kubernetes", "CI/CD", "SonarQube", "Agile"];

// The Data Marquees
const DataMarquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
  <div className="flex w-full overflow-hidden py-2 opacity-60 hover:opacity-100 transition-opacity pointer-events-none z-20 relative">
    <motion.div
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      className="flex whitespace-nowrap gap-4 min-w-max px-2"
    >
      {[...items, ...items, ...items].map((item, i) => (
        <span 
          key={i} 
          className="pointer-events-auto text-[11px] md:text-sm font-mono text-white/60 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:border-[var(--accent-sapphire)]/50 transition-colors cursor-default"
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

// --- THE NEW HYPERSPEED MAGIC RINGS ---
const HyperspeedRings = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square flex items-center justify-center pointer-events-none z-0">
    
    {/* Base Ambient Glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-emerald)]/5 to-[var(--accent-sapphire)]/5 rounded-full blur-3xl opacity-50" />

    {/* Ring 1: The Outer Hyperspeed Boundary */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      className="absolute w-[90%] h-[90%] rounded-full border border-white/5"
      style={{ borderStyle: 'dashed', borderWidth: '2px' }}
    />

    {/* Ring 2: Counter-Rotating Sapphire Tracker */}
    <motion.div 
      animate={{ rotate: -360, scale: [1, 1.02, 1] }}
      transition={{ 
        rotate: { repeat: Infinity, duration: 40, ease: "linear" },
        scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
      }}
      className="absolute w-[70%] h-[70%] rounded-full border-t border-2 border-[var(--accent-sapphire)]/20"
    />

    {/* Ring 3: The Data Accelerator (Emerald Glow) */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      className="absolute w-[50%] h-[50%] rounded-full shadow-[0_0_40px_rgba(16,185,129,0.1)]"
    >
      <div className="w-full h-full rounded-full border border-[var(--accent-emerald)]/50 border-dashed" />
    </motion.div>

    {/* Ring 4: Inner Core Confinement (Fastest) */}
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      className="absolute w-[35%] h-[35%] rounded-full border-r-4 border-b-4 border-white/10"
    />
  </div>
);

export default function Skills() {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center py-40 relative overflow-hidden pointer-events-none">
      
      <div className="w-full text-center mt-8 z-20 relative">
        <h2 className="text-sm font-mono tracking-[0.3em] text-[var(--text-secondary)] opacity-70 uppercase">Skills.Architecture</h2>
      </div>

      {/* THE NEURAL CORE */}
      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center -mt-8  ">
        
        {/* NEW: The Magic Rings Background */}
        <HyperspeedRings />

        <div className="grid grid-cols-3 grid-rows-3 gap-4 md:gap-8 w-full px-4 relative z-10">
          
          {/* Central Power Source */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className="col-start-2 row-start-2 flex flex-col items-center justify-center z-20 pointer-events-auto relative"
          >
            {/* Darker background for the core to pop against the new rings */}
            <div className="relative flex flex-col items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-full border border-white/20 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_var(--accent-emerald-glow)]">
              <FiCheckCircle className="text-3xl md:text-4xl text-[var(--accent-emerald)] mb-1.5 animate-pulse" />
              <div className="text-center">
                <span className="block text-[9px] md:text-[10px] font-mono text-white/50 tracking-wider">CERTIFIED</span>
                <span className="block text-xs md:text-sm font-bold text-white leading-tight">AWS DVA-C02</span>
              </div>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-[-12px] border border-dashed border-white/30 rounded-full"
              />
            </div>
          </motion.div>

          {/* The 6 Core Processors */}
          {mainCores.map((core, i) => (
            <motion.div
              key={core.name}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 12, delay: 0.4 + (i * 0.1) }}
              viewport={{ once: false, amount: 0.5 }}
              className={`${core.position} relative flex flex-col items-center justify-center z-20`}
            >
              <motion.div 
                whileHover={{ scale: 1.1, translateY: -5 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: i * 0.5 }}
                // Added bg-black/60 so the rings pass cleanly *behind* the translucent cards
                className="pointer-events-auto group w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md cursor-crosshair hover:bg-black/80 hover:border-[var(--accent-sapphire)]/50 transition-colors shadow-xl"
              >
                <div className={`text-3xl md:text-4xl text-white/70 group-hover:text-[var(--accent-${core.color})] mb-2 transition-colors`}>
                  {core.icon}
                </div>
                <h3 className="text-xs md:text-sm font-bold text-white text-center px-2 leading-tight">{core.name}</h3>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_#10b981] transition-all" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STACKED Data Streams */}
      <div className="w-full flex flex-col gap-2 mt-5 mb-15 z-20 relative">
        <DataMarquee items={row1} />
        <DataMarquee items={row2} reverse />
      </div>

    </div>
  );
}