'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface AntiGravityCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function AntiGravityCard({
  children,
  className = '',
  glowColor = 'rgba(0, 212, 255, 0.15)',
  tiltStrength = 8,
  onMouseEnter,
  onMouseLeave: onMouseLeaveProp,
}: AntiGravityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice || prefersReducedMotion) {
    return (
      <div
        className={`glass-card ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeaveProp}
      >
        {children}
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    rotateX.set((y - 0.5) * -tiltStrength);
    rotateY.set((x - 0.5) * tiltStrength);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    onMouseLeaveProp?.();
  };

  return (
    <motion.div
      ref={ref}
      className={`glass-card ${className}`}
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
