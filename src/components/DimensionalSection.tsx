import { useRef} from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DimensionalSection({ children, className = "" }: { children: ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Track when the top of the NEXT section hits the bottom of the viewport
    offset: ["end end", "end start"]
  });

  // As the user scrolls past this section, it scales down to 90% and fades to 30% opacity
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale, opacity, filter, transformOrigin: "top center" }}
      className={`w-full relative ${className}`}
    >
      {children}
    </motion.div>
  );
}