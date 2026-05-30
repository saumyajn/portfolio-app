import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiBox } from "react-icons/fi";

import turing from '../assets/turing.png';
import arcade from '../assets/arcade.png';
import arcade2 from '../assets/arcade2.png';
import lastland from '../assets/lastland.png'

// Added liveLink and githubLink to the data model!
const projects = [
  {
    title: "Turing Shell Protocol",
    subtitle: "Human or Bot?",
    description: "A real-time evaluation platform using Angular 20 Signals for reactive UI state and a Python microservice for NLP pattern processing.",
    tech: ["Angular 20", "Python", "WebSockets"],
    images: [turing], 
    color: "from-emerald-500/20 to-emerald-900/20",
    accent: "group-hover:border-emerald-500/50",
    liveLink: "https://humanorbot.vercel.app/", 
    githubLink: "https://github.com/saumyajn/humanorbot"
  },
  {
    title: "Arcade Stack",
    subtitle: "Real-Time Gaming",
    description: "A modular browser gaming platform engineered with sub-frame-latency game state management via custom React hooks.",
    tech: ["React", "TypeScript", "Canvas API"],
    images: [arcade, arcade2], 
    color: "from-blue-500/20 to-blue-900/20",
    accent: "group-hover:border-blue-500/50",
    liveLink: "https://arcade-stack.vercel.app",
    githubLink: "https://github.com/saumyajn/arcade-stack"
  },
  {
    title: "The Last Land",
    subtitle: "Interactive Experience",
    description: "An immersive digital environment focusing on heavy performance optimization and dynamic asset loading.",
    tech: ["Three.js", "WebGL", "React Fiber"],
    images: [lastland], 
    color: "from-purple-500/20 to-purple-900/20",
    accent: "group-hover:border-purple-500/50",
    liveLink: "https://the-last-land-analytics.vercel.app",
    githubLink: "https://github.com/saumyajn/the-last-land"
  },
  {
    title: "React Menu",
    subtitle: "Enterprise UI",
    description: "A highly accessible, zero-dependency contextual menu architecture built for complex dashboard environments.",
    tech: ["React", "Framer Motion", "a11y"],
    images: [], 
    color: "from-gray-500/20 to-gray-900/20",
    accent: "group-hover:border-gray-400/50",
   
    githubLink: "https://github.com/saumyajn/React-Menu-Store"
  }
];

// --- SMART BACKGROUND COMPONENT ---
const ProjectBackground = ({ images, color }: { images?: string[], color: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500); 
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 group-hover:opacity-70 transition-opacity duration-700`} />
        <FiBox className="text-white/5 w-64 h-64 rotate-12 scale-150 group-hover:rotate-0 transition-transform duration-1000 ease-out" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-60 group-hover:opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Project execution"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[10000ms] ease-out"
          />
        </div>
      ))}
    </div>
  );
};

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] w-full bg-transparent">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <div className="absolute top-12 left-12 md:top-24 md:left-24 z-20 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter drop-shadow-2xl">Passion Projects</h2>
            <p className="text-[var(--accent-emerald)] font-mono mt-2 tracking-widest uppercase text-sm drop-shadow-lg">Execution & Architecture</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-12 md:px-24 pt-24 z-10">
          
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`group relative h-[65vh] w-[85vw] md:w-[65vw] lg:w-[50vw] flex-shrink-0 rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl transition-colors duration-500 ${project.accent}`}
            >
              
              <ProjectBackground images={project.images} color={project.color} />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent opacity-90 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
                
                <div>
                  <p className="text-xs font-mono text-[var(--accent-emerald)] mb-3 tracking-widest uppercase">{project.subtitle}</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-8 drop-shadow-md">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pointer-events-auto">
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-xs font-mono text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* UPDATE: Converted to actual <a> tags with conditional rendering! */}
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-[var(--accent-emerald)] hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        View Live <FiArrowUpRight />
                      </a>
                    )}
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-white/30 text-white bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                        title="View Source on GitHub"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                  </div>
                  
                </div>

              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}