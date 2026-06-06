import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiBox } from "react-icons/fi";

import turing from '../assets/turing.png';
import arcade from '../assets/arcade.png';
import arcade2 from '../assets/arcade2.png';
import lastland from '../assets/lastland.png'

const projects = [
    {
        title: "Turing Shell Protocol",
        subtitle: "Human or Bot?",
        description: "A real-time, cross-platform Turing Test application that challenges human perception. Built with a reactive frontend and a Python microservice for NLP pattern processing to seamlessly orchestrate 1v1 human-vs-AI matchmaking.",
        tech: ["Angular 20", "Node.js", "Python", "WebSockets"],
        images: [turing],
        color: "from-emerald-500/20 to-emerald-900/20",
        accent: "group-hover:border-emerald-500/50",
        liveLink: "https://humanorbot.vercel.app/",
        githubLink: "https://github.com/saumyajn/humanorbot",
        caseStudyHref: "#case-turing-test"
    },
    {
        title: "Arcade Stack",
        subtitle: "Real-Time Gaming",
        description: "A modular browser gaming platform engineered with sub-frame-latency game state management via custom React hooks, featuring integrated Python micro-games running natively in the browser via WebAssembly.",
        tech: ["React", "TypeScript", "Python", "Vite"],
        images: [arcade, arcade2],
        color: "from-blue-500/20 to-blue-900/20",
        accent: "group-hover:border-blue-500/50",
        liveLink: "https://arcade-stack.vercel.app",
        githubLink: "https://github.com/saumyajn/arcade-stack",
        caseStudyHref: "#case-arcade-stack"
    },
    {
        title: "The Last Land",
        subtitle: "Interactive Experience",
        description: "A high-performance React dashboard that automates data extraction from gaming screenshots using Google Cloud Vision OCR and OpenCV, transforming visual data into synchronized, color-coded analytics.",
        tech: ["React", "Python", "Google Cloud Vision API", "Firebase"],
        images: [lastland],
        color: "from-purple-500/20 to-purple-900/20",
        accent: "group-hover:border-purple-500/50",
        liveLink: "https://the-last-land-analytics.vercel.app",
        githubLink: "https://github.com/saumyajn/the-last-land",
        caseStudyHref: "#case-last-land"
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
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-60 group-hover:opacity-100" : "opacity-0"
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
                            // Main Box: Tall enough to comfortably hold the expanded accordion on mobile
                            className={`group relative h-[65vh] min-h-[500px] w-[85vw] md:w-[65vw] lg:w-[50vw] flex-shrink-0 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-2xl transition-colors duration-500 ${project.accent}`}
                        >

                            {/* THE PASSEPARTOUT FRAME EFFECT (Reduces Image Size Natively) */}
                            {/* Inset creates a physical border. Hovering expands it to 0. */}
                            <div className="absolute inset-4 md:inset-6 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:inset-0 group-hover:rounded-[2.5rem] z-0">
                                <ProjectBackground images={project.images} color={project.color} />
                            </div>

                            {/* Heavy base gradient to ensure text readability against the image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent opacity-90 group-hover:opacity-100 group-hover:via-[#0a0a0a]/95 transition-all duration-700 pointer-events-none z-0 rounded-[2.5rem]" />

                            {/* MAIN CONTENT WRAPPER */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col justify-end pointer-events-none z-10">
                                
                                <div className="pointer-events-auto">

                                    {/* 1. ALWAYS VISIBLE: Title, Tech Stack, Live Link */}
                                    <div className="flex flex-col gap-5 transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                                        
                                        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            
                                            {/* Tech Stack (Always visible now) */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-3 py-1.5 text-[10px] md:text-xs font-mono text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                                {project.caseStudyHref && (
                                                    <a
                                                        href={project.caseStudyHref}
                                                        className="flex items-center gap-2 px-5 py-3 bg-white/10 text-white rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors duration-300 border border-white/15"
                                                    >
                                                        Case Study <FiArrowUpRight />
                                                    </a>
                                                )}
                                                {project.liveLink && (
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-6 py-3.5 bg-white text-black rounded-full text-sm font-bold hover:bg-[var(--accent-emerald)] hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                    >
                                                        View Live <FiArrowUpRight />
                                                    </a>
                                                )}

                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="h-12 w-12 rounded-full border border-white/30 text-white bg-black/30 backdrop-blur-sm hover:bg-[var(--accent-emerald)] hover:border-transparent transition-all duration-300 flex items-center justify-center overflow-hidden"
                                                        title="View Source on GitHub"
                                                    >
                                                        <FiGithub size={20} className="shrink-0" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    {/* 2. HOVER REVEAL: Subtitle & Description */}
                                    <div className="grid grid-rows-[1fr] group-hover:grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                        <div className="overflow-hidden">
                                            
                                            <div className="pt-5 flex flex-col gap-3 translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                                
                                                <p className="text-xs font-mono text-[var(--accent-emerald)] tracking-widest uppercase">
                                                    {project.subtitle}
                                                </p>
                                                
                                                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg drop-shadow-md">
                                                    {project.description}
                                                </p>

                                            </div>

                                        </div>
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
