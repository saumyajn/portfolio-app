import { useState, useEffect } from 'react';

export const useMousePosition = () => {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            requestAnimationFrame(() => {
                setMousePosition({ x: ev.clientX, y: ev.clientY });
            });
        };
        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);
    return mousePosition;
}