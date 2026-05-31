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

  const laserProgress = useTransform(smoothProgress, [0, 0.8], ["0%", "100%"]);
  const tipPosition = useTransform(smoothProgress, [0, 0.8], ["0%", "100%"]);
  
  const atmosphericGlow = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="w-full min-h-screen relative font-sans pointer-events-auto selection:bg-[var(--accent-amethyst)] selection:text-white pb-[30vh]">

      <div className="relative z-10 w-full h-full">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 pt-32 relative">

          {/* HEADER */}
          <div className="w-full text-center pb-20 shrink-0 z-20 relative">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Career</h2>
            <p className="text-sm font-mono text-[var(--accent-amethyst)] mt-2 uppercase tracking-widest">Execution Timeline</p>
          </div>

          <div className="relative w-full">

            {/* ATMOSPHERIC WEBGL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen md:block">
              <motion.div
                className="sticky top-[10vh] w-full h-[75vh]"
                style={{
                  opacity: atmosphericGlow,
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
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


            <div className="absolute top-0 bottom-0 left-[76px] md:left-1/2 -translate-x-1/2 w-10 flex justify-center z-0 pointer-events-none">

              {/* The passive background track */}
              <div className="w-[2px] h-full bg-white/10 absolute top-0" />

              {/* The active laser beam */}
              <motion.div
                className="absolute top-0 w-[4px] md:w-[4px] bg-[#8b5cf6] origin-top z-10"
                style={{
                  height: '100%',
                  scaleY: laserProgress,
                  boxShadow: '0 0 100px 4px rgba(139,92,246,0.5), 0 0 20px 5px rgba(139,92,246,0.3)'
                }}
              />

              {/* The laser tip */}
              <motion.div
                className="absolute w-3 h-6 md:w-4 md:h-8 bg-white rounded-full z-20 blur-[2px]"
                style={{
                  top: tipPosition,
                  translateY: '-50%',
                  boxShadow: '0 0 15px 5px #8b5cf6, 0 0 30px 10px rgba(139,92,246,0.8)'
                }}
              />
            </div>

            {/* THE DATA ROWS */}
            <div className="flex flex-col gap-12 md:gap-24 relative w-full z-20">
              {timelineData.map((node) => {
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    viewport={{ root: containerRef, once: false, margin: "-100px" }}
                    className="flex flex-col md:flex-row w-full relative group py-2 md:py-0"
                  >

                    {/* THE PERFECTLY ALIGNED DOT */}
                    {/* This dot uses the exact same coordinate (left-[76px] and md:left-1/2) as the spine container! */}
                    <div className="absolute left-[76px] md:left-1/2 -translate-x-1/2 top-4 md:top-2 w-3 h-3 rounded-full bg-[#111] border-2 border-white/20 transition-all duration-500 group-hover:bg-[#8b5cf6] group-hover:border-transparent group-hover:shadow-[0_0_15px_#8b5cf6] group-hover:scale-150 z-30" />

                    {/* METADATA HEMISPHERE */}
                    {/* On mobile: Padded to 104px to clear the spine. On Desktop: right-aligned left of center */}
                    <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-start md:justify-between pl-[104px] md:pl-0 pr-6 md:pr-16 text-left md:text-right">

                      <div className="md:order-2 mb-1 md:mb-0">
                        <span
                          className="text-lg md:text-4xl font-extrabold tracking-tighter transition-all duration-500 text-white/50 group-hover:text-white drop-shadow-lg"
                        >
                          {node.year}
                        </span>
                      </div>

                      <div className="flex flex-col md:order-1 max-w-[280px]  text-left">
                        <h3 className="text-xl md:text-3xl font-bold text-white tracking-wide mb-1 leading-tight group-hover:text-[var(--accent-amethyst)] transition-colors duration-300">
                          {node.role}
                        </h3>
                        <p className="text-[#8b5cf6] text-xs md:text-sm font-mono uppercase tracking-wider mb-2 md:mb-0">
                          {node.company}
                        </p>
                      </div>

                    </div>

                    {/* EXECUTION HEMISPHERE */}
                    {/* On mobile: Remains padded at 104px. On Desktop: left-aligned right of center */}
                    <div className="w-full md:w-1/2 pl-[104px] md:pl-16 pr-6 md:pr-0 pt-2 md:pt-0 flex flex-col text-left">
                      <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[480px]">
                        {node.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4 max-w-[480px]">
                        {node.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-[9px] md:text-xs uppercase tracking-widest font-mono text-[#8b5cf6]/70 border border-[#8b5cf6]/20 rounded-full bg-[#8b5cf6]/5 group-hover:bg-[#8b5cf6]/20 group-hover:text-white group-hover:border-[#8b5cf6]/50 transition-all duration-300"
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
          {/* END OF BOUNDARY */}

        </div>
      </div>
    </div>
  );
}