'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface PhilosophySectionProps {
  className?: string;
}

const philosophyItems = [
  {
    icon: 'LightBulbIcon' as const,
    title: 'Innovation Through Automation',
    description:
      'Transforming manual processes into intelligent, self-healing systems that anticipate problems before they occur.',
    marker: '01',
  },
  {
    icon: 'ShieldCheckIcon' as const,
    title: 'Reliability as Foundation',
    description:
      "Zero downtime isn't luck -- it's engineering. Every system I design prioritizes bulletproof reliability and graceful failure handling.",
    marker: '02',
  },
  {
    icon: 'ChartBarIcon' as const,
    title: 'Cost-Conscious Excellence',
    description:
      "Optimization isn't just about performance -- it's about delivering maximum value while minimizing resource waste and operational costs.",
    marker: '03',
  },
  {
    icon: 'UsersIcon' as const,
    title: 'Collaborative Leadership',
    description:
      'The best infrastructure solutions emerge from cross-functional collaboration, knowledge sharing, and empowering team growth.',
    marker: '04',
  },
];

const PhilosophySection = ({ className = '' }: PhilosophySectionProps) => {
  return (
    <section className={`py-20 lg:py-28 ${className}`} style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="font-mono text-sm mb-3" style={{ color: '#666' }}>
              $ cat philosophy.md
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                color: '#e0e0e0',
              }}
            >
              The DevOps Mindset
            </h2>
          </div>
        </ScrollReveal>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: '#222' }}>
          {philosophyItems.map((item, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.08}>
              <div className="p-6 sm:p-8 group" style={{ background: '#111' }}>
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="font-mono text-xs font-bold shrink-0 mt-1"
                    style={{ color: '#f59e0b' }}
                  >
                    {item.marker}
                  </span>
                  <div className="flex items-center gap-3">
                    <Icon
                      name={item.icon}
                      size={18}
                      className="shrink-0"
                      style={{ color: '#f59e0b' }}
                    />
                    <h3 className="font-mono text-base font-semibold" style={{ color: '#e0e0e0' }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="font-mono text-sm leading-relaxed pl-8" style={{ color: '#999' }}>
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Quote */}
        <ScrollReveal direction="up" delay={0.3}>
          <div
            className="mt-12 p-6 sm:p-8"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderLeft: '3px solid #f59e0b',
            }}
          >
            <p
              className="font-mono text-sm sm:text-base leading-relaxed"
              style={{ color: '#e0e0e0' }}
            >
              &quot;I don&apos;t just maintain infrastructure -- I revolutionize it. Every challenge
              is an opportunity to create something more elegant, more efficient, and more reliable
              than before.&quot;
            </p>
            <p className="font-mono text-xs mt-4" style={{ color: '#f59e0b' }}>
              -- Vishal Kushwah
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PhilosophySection;
