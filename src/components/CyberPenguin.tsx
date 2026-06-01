import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const css = `
   .penguin-container { font-family: 'Share Tech Mono', monospace; }
  .penguin-svg {
    width: 280px;
    animation: float 3.6s ease-in-out infinite;
    cursor: pointer;
    filter: drop-shadow(0 18px 36px rgba(0,0,0,0.15));
    position: relative;
    z-index: 20;
  }
  @media (max-width: 767px) {
    .penguin-container { transform-origin: center bottom; }
    .penguin-status { font-size: 9px; padding: 2px 8px; max-width: 150px; text-align: center; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-12px); }
  }
  .visor-glow { animation: visor-pulse 3s ease-in-out infinite; }
  @keyframes visor-pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.75; } }
  .eye-lid   { animation: eye-blink 5s ease-in-out infinite; }
  .eye-lid-r { animation: eye-blink 5s ease-in-out infinite; animation-delay:.06s; }
  @keyframes eye-blink { 0%,85%,100%{ transform: scaleY(0); } 89%,96%{ transform: scaleY(1); } }
  .hp-led   { animation: hp-led 2s ease-in-out infinite; }
  .hp-led-r { animation: hp-led 2s ease-in-out infinite; animation-delay:1s; }
  @keyframes hp-led { 0%,100%{ opacity:0.9; } 50%{ opacity:0.2; } }
  .chest-ring { animation: chest-ring 0.9s ease-out forwards; }
  @keyframes chest-ring { 0%{ r:6; opacity:0.9; } 100%{ r:20; opacity:0; } }
`;
const KEY_DURATIONS = Array.from({ length: 20 }, () => 0.5 + Math.random());

export default function CyberPenguin({ isCoding = false }: { isCoding?: boolean }) {
    const [clicked, setClicked] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const status = clicked
        ? "INITIALIZING REACT..."
        : isCoding
            ? "COMPILING PYTHON"
            : "AWAITING INPUT";

    // Bypassing React State for pure GPU tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Calculate Eye Transforms
    const eyeX = useTransform([mouseX], ([x]) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const deltaX = (x as number) - centerX;
        return Math.max(-12, Math.min(12, deltaX * 0.03));
    });

    const eyeY = useTransform([mouseY], ([y]) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        const centerY = rect.top + rect.height * 0.4;
        const deltaY = (y as number) - centerY;
        return Math.max(-12, Math.min(12, deltaY * 0.03));
    });

    useEffect(() => {
        if (!clicked) return;
        const t = setTimeout(() => setClicked(false), 2200);
        return () => clearTimeout(t);
    }, [clicked]);

    return (
        <div ref={containerRef} className="penguin-container relative flex flex-col items-center justify-center pointer-events-auto">
            <style>{css}</style>

            {/* --- THE HOLOGRAPHIC DESK --- */}
            <AnimatePresence>
                {isCoding && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute bottom-[-20px] z-30 hidden md:flex flex-col items-center"
                    >
                        <div className="absolute bottom-24 flex gap-4 w-[400px] justify-center opacity-80 pointer-events-none">
                            <motion.div
                                animate={{ y: [0, -5, 0], opacity: [0.6, 0.9, 0.6] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-24 h-32 bg-[var(--accent-sapphire)]/10 border border-[var(--accent-sapphire)]/40 rounded-lg shadow-[0_0_15px_var(--accent-sapphire-glow)]"
                                style={{ transform: "perspective(400px) rotateY(25deg)" }}
                            />
                            <motion.div
                                animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="w-32 h-24 bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/40 rounded-lg shadow-[0_0_15px_var(--accent-emerald-glow)] mt-8"
                            />
                        </div>

                        <div
                            className="w-80 h-16 bg-black/60 backdrop-blur-md rounded-xl border-t border-[var(--accent-emerald)]/50 shadow-[0_-5px_25px_var(--accent-emerald-glow)] flex items-center justify-center"
                            style={{ transform: "perspective(500px) rotateX(45deg)" }}
                        >
                            <div className="w-[90%] h-[60%] border border-[var(--accent-emerald)]/20 grid grid-cols-6 gap-1 p-1">
                                {[...Array(18)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                                        transition={{ duration: KEY_DURATIONS[i], repeat: Infinity }}
                                        className="bg-[var(--accent-emerald)]/30 rounded-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- THE PENGUIN SVG --- */}
            <svg className="penguin-svg" viewBox="0 0 240 370" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setClicked(true)}>
                <defs>
                    <radialGradient id="bodyG" cx="32%" cy="22%" r="70%"><stop offset="0%" stopColor="#2A2A35" /><stop offset="55%" stopColor="#1E1E26" /><stop offset="100%" stopColor="#121218" /></radialGradient>
                    <radialGradient id="headG" cx="32%" cy="25%" r="68%"><stop offset="0%" stopColor="#323240" /><stop offset="55%" stopColor="#242430" /><stop offset="100%" stopColor="#181822" /></radialGradient>
                    <radialGradient id="bellyG" cx="40%" cy="28%" r="65%"><stop offset="0%" stopColor="#f8f8f8" /><stop offset="100%" stopColor="#d4d4d4" /></radialGradient>
                    <linearGradient id="visorG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
                    <radialGradient id="eyeG" cx="35%" cy="30%" r="65%"><stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#c0e0ff" /></radialGradient>
                    <radialGradient id="chestG" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" /></radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                <path d="M 54 150 Q 120 68 186 150" stroke="rgba(120,120,120,0.2)" strokeWidth="16" fill="none" strokeLinecap="round" />
                <path d="M 54 150 Q 120 68 186 150" stroke="#333" strokeWidth="10" fill="none" strokeLinecap="round" />

                <circle cx="50" cy="154" r="22" fill="#222" stroke="#444" strokeWidth="1" />
                <circle className="hp-led" cx="50" cy="154" r="4" fill="#10b981" filter="url(#glow)" />
                <circle cx="190" cy="154" r="22" fill="#222" stroke="#444" strokeWidth="1" />
                <circle className="hp-led-r" cx="190" cy="154" r="4" fill="#3b82f6" filter="url(#glow)" />

                <ellipse cx="120" cy="268" rx="78" ry="88" fill="url(#bodyG)" />
                <ellipse cx="120" cy="272" rx="48" ry="62" fill="url(#bellyG)" />

                <motion.g animate={{ rotate: isCoding ? [0, -25, 0] : 0 }} transition={isCoding ? { duration: 0.15, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 400, damping: 30 }} style={{ transformOrigin: "50px 218px" }}>
                    <ellipse cx="50" cy="264" rx="20" ry="46" fill="url(#bodyG)" transform="rotate(-10 50 264)" />
                </motion.g>

                <motion.g animate={{ rotate: isCoding ? [0, 25, 0] : 0 }} transition={isCoding ? { duration: 0.18, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 400, damping: 30 }} style={{ transformOrigin: "190px 218px" }}>
                    <ellipse cx="190" cy="264" rx="20" ry="46" fill="url(#bodyG)" transform="rotate(10 190 264)" />
                </motion.g>

                <rect x="100" y="278" width="40" height="22" rx="6" fill="#222" stroke="#444" strokeWidth="0.8" />
                <circle cx="120" cy="289" r="6" fill="url(#chestG)" filter="url(#glow)" opacity="0.9" />
                {clicked && <circle className="chest-ring" cx="120" cy="289" fill="none" stroke="#10b981" strokeWidth="1.5" />}

                <ellipse cx="120" cy="148" rx="76" ry="78" fill="url(#headG)" />
                <rect className="visor-glow" x="62" y="116" width="116" height="72" rx="26" fill="url(#visorG)" opacity="0.7" />
                <rect x="62" y="116" width="116" height="72" rx="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                {/* EYES WITH PURE MOTION VALUE TRACKING */}
                <motion.g style={{ x: eyeX, y: eyeY }}>
                    <ellipse cx="96" cy="151" rx="14" ry="18" fill="url(#eyeG)" />
                    <ellipse className="eye-lid" cx="96" cy="151" rx="14" ry="18" fill="url(#visorG)" style={{ transformOrigin: "96px 151px" }} />
                </motion.g>

                <motion.g style={{ x: eyeX, y: eyeY }}>
                    <ellipse cx="144" cy="151" rx="14" ry="18" fill="url(#eyeG)" />
                    <ellipse className="eye-lid eye-lid-r" cx="144" cy="151" rx="14" ry="18" fill="url(#visorG)" style={{ transformOrigin: "144px 151px" }} />
                </motion.g>

                <path d="M 110 193 Q 120 207 130 193 Q 120 199 110 193 Z" fill="#f0b040" />
            </svg>

            <div className="penguin-status mt-2 md:mt-4 text-[10px] md:text-[11px] tracking-widest text-[var(--accent-emerald)] uppercase flex items-center gap-2 drop-shadow-[0_0_5px_var(--accent-emerald-glow)] z-40 relative bg-black/50 px-3 md:px-4 py-1 rounded-full border border-[var(--accent-emerald)]/30">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
                {status}
            </div>
        </div>
    );
}
