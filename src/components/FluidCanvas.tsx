import { useEffect, useRef } from "react";
// @ts-expect-error: webgl-fluid has no TypeScript declarations
import fluid from "webgl-fluid";

export default function FluidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize the simulation
    fluid(canvas, {
      IMMEDIATE: true,
      TRIGGER: "hover",
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 2.5,
      VELOCITY_DISSIPATION: 1.5,
      PRESSURE: 1,
      PRESSURE_ITERATIONS: 20,
      CURL: 10,
      SPLAT_RADIUS: 0.05,
      SPLAT_FORCE: 1000,
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      TRANSPARENT: true,
      BLOOM: true,
      BLOOM_ITERATIONS: 10,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.4,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
    });

  }, []);

  // ==========================================
  // 2. THE GLOBAL EVENT FORWARDER (The Fix)
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const forwardMouse = (e: MouseEvent) => {
      // If the mouse is already interacting directly with the canvas, do nothing
      if (e.target === canvas) return;
      
      // Clone the mouse coordinates from the Window and synthetically fire them at the Canvas.
      // This punches straight through any DOM layers or z-indexes blocking the background!
      const simulatedEvent = new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: false,
        cancelable: false
      });
      
      canvas.dispatchEvent(simulatedEvent);
    };

    // Listen at the highest possible level (the window)
    window.addEventListener('mousemove', forwardMouse);

    return () => {
      window.removeEventListener('mousemove', forwardMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen block z-0"
      style={{ pointerEvents: "auto" }} 
    />
  );
}