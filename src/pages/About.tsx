import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiMapPin, FiAward, FiCode, FiClock } from 'react-icons/fi';

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full h-full flex items-center pointer-events-none">
      
      {/* LEFT SIDE: Empty space reserved for the Global Cyber Penguin (Desktop only) */}
      <div className="hidden md:flex md:w-[40%] h-full" />

      {/* RIGHT SIDE: Content */}
      {/* Mobile Fixes: Added pl-[80px] to clear socials, internal scrolling, and adjusted padding */}
      <div className="w-full md:w-[60%] h-full flex flex-col justify-center items-start pl-[80px] pr-6 sm:pl-[100px] sm:pr-10 md:pl-0 md:pr-[10vw] z-40 pointer-events-auto overflow-y-auto overflow-x-hidden pt-24 sm:pt-0 pb-12 md:py-0">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full max-w-3xl my-2"
        >
          {/* 1. Main Headline */}
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 md:mb-6 leading-tight tracking-tight">
            Frontend engineer with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-sapphire)] drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">6+ years</span> cutting load times, eliminating defects, and scaling Angular/Node.js systems to enterprise level.
          </motion.h2>

          {/* 2. Sub-headline / Callout */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10 inline-flex items-center gap-2 md:gap-3 px-4 py-2 rounded-full bg-[var(--accent-sapphire)]/10 border border-[var(--accent-sapphire)]/30 text-[var(--accent-sapphire)] font-mono text-xs sm:text-sm shadow-[0_0_15px_var(--accent-sapphire-glow)] backdrop-blur-md w-fit">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--accent-sapphire)] animate-pulse flex-shrink-0" />
            <span className="whitespace-normal sm:whitespace-nowrap">Not just shipping features — setting the standard</span>
          </motion.div>

          {/* 3. Bio Paragraphs */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 border-l-2 border-[var(--accent-emerald)]/40 pl-4 md:pl-6 bg-gradient-to-r from-[var(--accent-emerald)]/5 to-transparent py-2">
            <p>
              I'm a <strong className="text-white font-semibold">Lead Frontend Engineer</strong> based in New Jersey with 6+ years building enterprise-scale web platforms. At Virtusa (client: PNC Bank), I architect Angular component libraries used as the foundational UI framework across all PNC Bank web applications.
            </p>
            <p>
              I hold an MS in Computer Science from NJIT and am an AWS Certified Developer (Associate). When I'm not optimising performance budgets, I'm painting, gaming, or obsessing over clean architecture.
            </p>
          </motion.div>

          {/* 4. Badges Grid */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 md:gap-3 font-mono text-[10px] sm:text-xs md:text-sm">
             <Badge icon={<FiCode />} text="Angular Expert" />
             <Badge icon={<FiClock />} text="6+ Years" />
             <Badge icon={<FiAward />} text="AWS Certified DVA-C02" />
            
             <Badge icon={<FiMapPin />} text="NJ, USA" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Badge Component (Scaled for mobile)
const Badge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 bg-white/5 border border-white/10 rounded-lg hover:border-[var(--accent-emerald)]/50 hover:bg-[var(--accent-emerald)]/10 hover:shadow-[0_0_10px_var(--accent-emerald-glow)] transition-all duration-300 cursor-default group">
    <span className="text-[var(--text-secondary)] group-hover:text-[var(--accent-emerald)] transition-colors">{icon}</span>
    <span className="text-white/80 group-hover:text-white transition-colors tracking-wide">{text}</span>
  </div>
);