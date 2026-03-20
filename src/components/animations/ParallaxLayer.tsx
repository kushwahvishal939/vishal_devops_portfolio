'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.1 = slow/far, 0.8 = fast/near
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={`will-change-transform ${className}`} style={{ y }}>
      {children}
    </motion.div>
  );
}
