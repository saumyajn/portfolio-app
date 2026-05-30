import { useEffect, useRef } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface TransitionWarpProps {
  velocity: MotionValue<number>;
}

export default function TransitionWarp({ velocity }: TransitionWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpIntensity = useRef(0);

  // Listen to native scroll velocity
  useMotionValueEvent(velocity, "change", (latest) => {
    // Map raw velocity (usually 0 to ~1000+) to a 0-1 opacity/intensity scale.
    // Dividing by 200 means slow scrolling won't trigger it, only intentional swipes!
    const rawIntensity = Math.abs(latest) / 200; 
    warpIntensity.current = Math.min(Math.max(rawIntensity, 0), 1);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const STAR_COUNT = 600;
    // Core accent colors to match the timeline laser
    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#ffffff"]; 

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      pz: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    stars.forEach(s => s.pz = s.z);
    let animationFrameId: number;

    const render = () => {
      // Fade out previous frames
      ctx.fillStyle = `rgba(5, 5, 5, 0.3)`;
      ctx.fillRect(0, 0, w, h);

      const intensity = warpIntensity.current;
      
      // OPTIMIZATION: Only draw the warp streaks if you are actively transitioning!
      if (intensity > 0.01) {
          const cx = w / 2;
          const cy = h / 2;
          const fov = 400;

          stars.forEach(star => {
            star.pz = star.z; 

            // Speed directly scales with scroll intensity.
            star.z -= (2 + (intensity * 40));

            // Recycle stars that fly past the camera
            if (star.z <= 1) {
              star.z = 2000;
              star.pz = 2000;
              star.x = (Math.random() - 0.5) * 2000;
              star.y = (Math.random() - 0.5) * 2000;
            }

            const scale = fov / star.z;
            const x2d = star.x * scale + cx;
            const y2d = star.y * scale + cy;

            const pScale = fov / star.pz;
            const px2d = star.x * pScale + cx;
            const py2d = star.y * pScale + cy;

            ctx.beginPath();
            ctx.moveTo(px2d, py2d);
            ctx.lineTo(x2d, y2d);

            ctx.lineWidth = Math.max(0.5, scale * 3);
            ctx.strokeStyle = star.color;
            // Opacity is tied to distance AND the global scroll intensity
            ctx.globalAlpha = Math.min(1, scale * 1.5) * intensity;
            ctx.stroke();
          });
      } else {
         // Reset star trails when stationary so they don't stretch weirdly on the next scroll
         stars.forEach(star => star.pz = star.z);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none mix-blend-screen" 
    />
  );
}