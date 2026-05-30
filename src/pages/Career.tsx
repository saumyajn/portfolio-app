import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import LaserFlow from '../components/LaserFlow';

const timelineData = [
  {
    id: "lead-swe",
    role: "Lead Software Engineer",
    company: "Virtusa (Client: PNC Bank)",
    year: "2024 — Present",
    description: "Architecting enterprise-grade Angular schematic libraries driving UI standardization bank-wide. Leading distributed teams and overseeing the integration of robust CI/CD pipelines to ensure predictable, defect-free deployments.",
    tech: ["Angular 18", "Micro-Frontends", "CI/CD", "Jenkins", "Docker"]
  },
  {
    id: "aws",
    role: "AWS Certified Developer",
    company: "Amazon Web Services",
    year: "2024",
    description: "Achieved the DVA-C02 Associate Certification, validating advanced expertise in developing, deploying, and debugging highly scalable, secure, and distributed cloud-based applications.",
    tech: ["AWS", "DynamoDB", "S3", "API Gateway", "IAM"]
  },
  {
    id: "sr-swe",
    role: "Sr Software Engineer",
    company: "Virtusa (Client: PNC Bank)",
    year: "2022 — 2024",
    description: "Engineered high-performance Server-Side Rendering (SSR) workflows using Next.js and TypeScript, significantly improving API response metrics. Served as the primary technical liaison, translating business requirements into scalable architectures.",
    tech: ["Next.js", "TypeScript", "SSR", "Node.js", "RxJS"]
  },
  {
    id: "angular-dev",
    role: "Angular Developer",
    company: "Virtusa (Client: PNC Bank)",
    year: "2020 — 2022",
    description: "Developed and maintained highly responsive, user-facing web applications. Implemented rigorous automated testing strategies using Jest and Karma, reducing production defect rates by 30%.",
    tech: ["Angular", "Jest", "Karma", "Redux", "SCSS"]
  },
  {
    id: "njit",
    role: "Master of Science",
    company: "New Jersey Institute of Technology",
    year: "2018 — 2020",
    description: "Completed an intensive Computer Science curriculum focused on software engineering, algorithm design, and distributed systems architecture, laying the foundation for high-performance system design.",
    tech: ["Distributed Systems", "Algorithms", "Software Architecture"]
  },
  {
    id: "mindstrength",
    role: "Full Stack Developer",
    company: "Mind Strength Inc",
    year: "2017 — 2018",
    description: "Optimized RESTful APIs and implemented client-side data caching, cutting average page load times by 25%. Built robust automated regression testing coverage with Jasmine and Selenium to eliminate late-stage bugs.",
    tech: ["Node.js", "Angular", "REST APIs", "Jasmine", "Selenium"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll relative to the section entering/leaving the viewport
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start center", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 50, 
    damping: 15, 
    mass: 0.2, 
    restDelta: 0.001 
  });

  const laserProgress = useTransform(smoothProgress, [0, 1], [0, 1]);
  const tipPosition = useTransform(smoothProgress, (val) => `${val * 100}%`);
 const atmosphericGlow = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return (
   
    <div ref={containerRef} className="w-full min-h-screen relative font-sans pointer-events-auto selection:bg-[var(--accent-amethyst)] selection:text-white pb-[30vh]">
      
      {/* ATMOSPHERIC WEBGL BACKGROUND */}

     <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        
        <motion.div 
          // 2. sticky top-0 keeps the canvas in the camera view 
          className="sticky top-0 w-full h-screen"
          style={{ 
            opacity: atmosphericGlow,
            // 4. THE MAGIC BULLET: Feather the bottom edge of the canvas to transparent!
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
          }}
        >
          <LaserFlow 
            color="#8b5cf6" 
            fogIntensity={0.6}
            wispIntensity={5.0}
            wispSpeed={20.0}
            horizontalBeamOffset={0.5} 
          />
        </motion.div>

      </div>
      
      <div className="relative z-10 w-full h-full">
        <div className="max-w-7xl mx-auto px-6 pt-32 relative">
          
          <div className="w-full text-center pb-24 shrink-0 z-20 relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Career</h2>
            <p className="text-sm font-mono text-[var(--accent-amethyst)] mt-2 uppercase tracking-widest">Execution Timeline</p>
          </div>

          {/* THE GLOWING AMETHYST LASER SPINE */}
          <div className="absolute top-20 bottom-0 left-[24px] md:left-1/2 md:-translate-x-1/2 w-[1px] bg-white/5 z-0 flex justify-center mt-32">
            
            <motion.div 
              className="absolute top-0 w-[4px] bg-[#8b5cf6] origin-top z-10"
              style={{ 
                height: '100%',
                scaleY: laserProgress,
                boxShadow: '0 0 100px 4px rgba(139,92,246,0.5), 0 0 20px 5px rgba(139,92,246,0.3)'
              }}
            />

            <motion.div 
              className="absolute w-3 h-7 bg-white rounded-full z-20 blur-[2px]"
              style={{ 
                top: tipPosition,
                translateY: '-50%',
                boxShadow: '0 0 15px 5px #8b5cf6, 0 0 30px 10px rgba(139,92,246,0.8)'
              }}
            />
          </div>

          {/* THE DATA ROWS */}
          <div className="flex flex-col gap-12 md:gap-24 pb-40 relative z-20">
            {timelineData.map((node) => {
              return (
                <motion.div 
                  key={node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  viewport={{ root: containerRef, once: false, margin: "-100px" }} 
                  className="flex flex-col md:flex-row w-full group cursor-default"
                >
                  
                  {/* METADATA HEMISPHERE */}
                  <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-start md:justify-between pr-0 md:pr-16 pl-16 md:pl-0 relative">
                    <div className="absolute md:right-[-4px] left-[-24px] md:left-auto top-2.5 w-2 h-2 rounded-full bg-white/10 transition-all duration-500 group-hover:bg-[#8b5cf6] group-hover:shadow-[0_0_15px_#8b5cf6] group-hover:scale-150 z-30" />

                    <div className="flex flex-col max-w-[280px] text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-1 leading-tight group-hover:text-[var(--accent-amethyst)] transition-colors duration-300">
                        {node.role}
                      </h3>
                      <p className="text-white/40 text-sm md:text-base font-mono uppercase tracking-wider">
                        {node.company}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <span 
                        className="text-3xl md:text-4xl font-extrabold tracking-tighter transition-all duration-500 text-transparent group-hover:text-white/90 drop-shadow-lg"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                      >
                        {node.year}
                      </span>
                    </div>
                  </div>

                  {/* EXECUTION HEMISPHERE */}
                  <div className="w-full md:w-1/2 md:pl-16 pl-16 pt-6 md:pt-1 flex flex-col">
                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[480px]">
                      {node.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6 max-w-[480px]">
                      {node.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[10px] md:text-xs uppercase tracking-widest font-mono text-[#8b5cf6]/70 border border-[#8b5cf6]/20 rounded-full bg-[#8b5cf6]/5 hover:bg-[#8b5cf6]/20 hover:text-white hover:border-[#8b5cf6] transition-all duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}