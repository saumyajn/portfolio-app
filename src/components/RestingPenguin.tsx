// src/components/RestingPenguin.tsx
import { useRef, useState, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import penguinImage from '../assets/penguin.png'; 

export default function RestingPenguin() {
  const { x, y } = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // The "Face" center is roughly 50% width and 35% height of the container
    const centerX = rect.left + rect.width * 0.5;
    const centerY = rect.top + rect.height * 0.35;

    const angle = Math.atan2(y - centerY, x - centerX);
    const distance = Math.min(5, Math.hypot(x - centerX, y - centerY) / 50);

    setPupilPos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  }, [x, y]);

  return (
    <div ref={containerRef} className="relative w-64 h-64">
      {/* 1. Base Layer: The Penguin */}
      <img src={penguinImage} className="w-full h-full object-contain" />

      {/* 2. Pupil Layer: A container centered over the eyes */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
      >
        {/* These two divs ARE the pupils. We position them relative to the center */}
        <div className="absolute flex gap-[4%] translate-y-[-70%]">
          <div className="w-[8px] h-[8px] bg-blue rounded-full" />
          <div className="w-[8px] h-[8px] bg-black rounded-full" />
        </div>
      </div>
    </div>
  );
}