// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence,  } from 'framer-motion';

import '../index.css';

// import CodingSidekick from '@/components/CodingSidekick';

const ScrambleText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayedText(
                text.split("").map((_, index) => {
                    if (index < iteration) return text[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 50);
        return () => clearInterval(interval);
    }, [text]);
    return <span>{displayedText}</span>;
};

export default function Home({ isBooting, }: { isBooting: boolean }) {
    const text = "SAUMYA JAIN.";
  
    return (
        <main className="relative w-full h-screen overflow-hidden text-[var(--text-primary)] ">


            {/* PHASE 1: BOOT SEQUENCE */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                        <motion.h1
                            layoutId="name"
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter flex items-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
                        >
                            <ScrambleText text={text} />
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-[var(--accent-sapphire)] ml-2 drop-shadow-[0_0_10px_var(--accent-sapphire-glow)]">_</motion.span>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 2: UNLOCKED SPLIT-SCREEN */}
            {!isBooting && (
                // Removed max-w-7xl mx-auto so the layout ties strictly to the window edges
                <div className="relative z-40 flex w-full h-full pointer-events-none">

                    {/* LEFT SIDE: Identity */}
                    {/* Added items-start and explicit pixel padding to guarantee clearance of the social icons */}
                    <div className="w-full md:w-[60%] h-full flex flex-col justify-center pl-[100px] md:pl-[140px] lg:pl-[160px]">
                        <motion.h1
                            layoutId="name"
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
                        >
                            SAUMYA JAIN.
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mt-4 flex flex-col items-start pointer-events-auto"
                        >
                            <h2 className="text-xl md:text-2xl lg:text-3xl text-[var(--accent-sapphire)] font-semibold tracking-wide drop-shadow-[0_0_10px_var(--accent-sapphire-glow)]">
                               Lead Frontend Engineer <br/> Angular & React Specialist <br/> AWS Certified
                            </h2>

                            <div className="mt-10 flex flex-col items-start gap-4">
                                <span className="text-[var(--text-secondary)] font-mono text-sm tracking-widest uppercase">
                                    [ Initialize Connection ]
                                </span>
                                <a href="mailto:saumyajn1994@gmail.com" className="group relative px-8 py-4 rounded-full border border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--bg-main)]/40 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-[0_0_15px_var(--accent-emerald-glow)] hover:shadow-[0_0_25px_var(--accent-emerald-glow)]">
                                    <span className="relative z-10 font-mono text-base tracking-wide group-hover:text-[var(--bg-main)] transition-colors duration-300 ">saumyajn1994@gmail.com</span>
                                    <div className="absolute inset-0 bg-[var(--accent-emerald)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: The Penguin */}
                    <div className="hidden md:flex md:w-[40%] h-full relative items-end justify-center">
                        <motion.div
                            className="origin-bottom pb-0 pointer-events-auto"
                            initial={{ y: "100%", opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1.8 }}
                            transition={{ type: "spring", damping: 15, stiffness: 50, delay: 0.4 }}
                        >
                            {/* <RestingPenguin /> */}
                            {/* <CodingSidekick isCoding={isCoding} /> */}
                        </motion.div>
                    </div>

                </div>
            )}
        </main>
    );
}