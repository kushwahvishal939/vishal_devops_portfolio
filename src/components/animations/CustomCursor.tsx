'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-cursor-hover]')) {
        gsap.to(cursor, {
          scale: 2.5,
          backgroundColor: 'rgba(204, 255, 0, 0.4)', // Acid Green
          borderColor: '#CCFF00',
          duration: 0.3,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [data-cursor-hover]')) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: '#00F5FF', // Electric Cyan
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border-2 border-[#00F5FF] rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{ isolation: 'isolate' }}
    />
  );
}
