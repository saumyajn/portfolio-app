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
      SPLAT_RADIUS: 0.02,
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

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas || !simulationRef.current) return;

  //   // The library usually attaches an internal 'splat' method to the simulation object
  //   // Or it exposes a global splat function. 
  //   // Try calling the internal method directly:
  //   try {
  //     // Common webgl-fluid method to add interaction manually
  //     simulationRef.current.splat(
  //       mousePos.x / window.innerWidth,
  //       1 - mousePos.y / window.innerHeight,
  //       0.05, // dx
  //       0.05, // dy
  //       [1, 0, 0] // color (R,G,B)
  //     );
  //   } catch (e) {
  //     // Fallback: Dispatch event to window if splat method isn't exposed
  //     window.dispatchEvent(new MouseEvent('mousemove', {
  //       clientX: mousePos.x,
  //       clientY: mousePos.y
  //     }));
  //   }
  // }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen block z-0"
      style={{ pointerEvents: "auto" }} 
    />
  );
}