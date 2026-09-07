'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface HeroSectionProps {
  className?: string;
}

const metrics = [
  { value: '55%', label: 'Cost Reduction' },
  { value: '40%', label: 'Faster Deploys' },
  { value: '100%', label: 'Uptime Record' },
];

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section
      className={`relative min-h-screen flex items-center pt-24 pb-16 ${className}`}
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <div className="space-y-8">
            <ScrollReveal direction="up">
              <div className="space-y-4">
                <p className="font-mono text-sm tracking-wider" style={{ color: '#666' }}>
                  $ whoami
                </p>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)' }}
                >
                  <span style={{ color: '#e0e0e0' }}>Vishal</span>{' '}
                  <span style={{ color: '#f59e0b' }}>Kushwah</span>
                </h1>

                <p className="font-mono text-base sm:text-lg" style={{ color: '#e0e0e0' }}>
                  {'>'} The Cloud Infrastructure Virtuoso
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <p
                className="font-mono text-sm sm:text-base leading-relaxed max-w-xl"
                style={{ color: '#999' }}
              >
                DevOps Engineer who doesn&apos;t just maintain systems -- I revolutionize them.
                Expertise at the intersection of cost optimization, zero-downtime reliability, and
                automation excellence.
              </p>
            </ScrollReveal>

            {/* Metrics Grid */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="grid grid-cols-3 max-w-lg" style={{ border: '1px solid #222' }}>
                {metrics.map((metric, i) => (
                  <div
                    key={metric.label}
                    className="p-4 sm:p-6 text-center"
                    style={{
                      borderRight: i < metrics.length - 1 ? '1px solid #222' : 'none',
                      background: '#111',
                    }}
                  >
                    <div
                      className="text-2xl sm:text-3xl font-bold font-mono"
                      style={{ color: '#f59e0b' }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="text-xs font-mono mt-1 uppercase tracking-wider"
                      style={{ color: '#666' }}
                    >
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#journey">
                  <motion.button
                    whileHover={{ y: -1 }}
                    className="px-6 py-3 font-mono text-sm font-semibold flex items-center gap-2"
                    style={{
                      background: '#f59e0b',
                      color: '#0a0a0a',
                      border: 'none',
                      borderRadius: '0',
                    }}
                  >
                    <Icon name="ArrowDownIcon" size={16} />
                    <span>Explore My Journey</span>
                  </motion.button>
                </Link>

                <motion.a
                  whileHover={{ y: -1 }}
                  href="https://hostile-ivory-nd1qhsn9.edgeone.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 font-mono text-sm font-semibold flex items-center gap-2"
                  style={{
                    background: 'transparent',
                    color: '#f59e0b',
                    border: '1px solid #f59e0b',
                    borderRadius: '0',
                  }}
                >
                  <Icon name="DocumentTextIcon" size={16} />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Monogram Block */}
          <ScrollReveal direction="up" delay={0.25}>
            <div className="hidden lg:block">
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{
                  background: '#111',
                  border: '1px solid #222',
                }}
              >
                <pre
                  className="font-mono text-xs leading-tight select-none"
                  style={{ color: '#f59e0b' }}
                  aria-hidden="true"
                >
                  {`
  ██╗   ██╗██╗  ██╗
  ██║   ██║██║ ██╔╝
  ██║   ██║█████╔╝
  ╚██╗ ██╔╝██╔═██╗
   ╚████╔╝ ██║  ██╗
    ╚═══╝  ╚═╝  ╚═╝
`}
                </pre>
              </div>
              <div
                className="mt-px p-3 font-mono text-xs"
                style={{
                  background: '#111',
                  border: '1px solid #222',
                  borderTop: 'none',
                  color: '#666',
                }}
              >
                <span style={{ color: '#22c55e' }}>STATUS</span>{' '}
                <span style={{ color: '#e0e0e0' }}>Available for new challenges</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
