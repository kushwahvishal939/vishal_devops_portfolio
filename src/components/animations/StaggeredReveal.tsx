'use client';

import { motion, Variants } from 'framer-motion';

interface StaggeredRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function StaggeredReveal({ text, className = '', delay = 0 }: StaggeredRevealProps) {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-2 pb-2">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
