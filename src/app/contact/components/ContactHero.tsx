'use client';

import React from 'react';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface ContactHeroProps {
  className?: string;
}

const ContactHero = ({ className = '' }: ContactHeroProps) => {
  return (
    <section className={`relative py-20 lg:py-28 overflow-hidden ${className}`}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center font-mono">
          {/* Status badge */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#222] bg-[#111] mb-8">
              <span className="w-2 h-2 bg-[#22c55e] animate-pulse" />
              <span className="text-[#22c55e] text-xs tracking-wider uppercase">
                status: available
              </span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-[#e0e0e0] tracking-tight">
              Let&apos;s Build Something
              <span className="block text-[#f59e0b]">Extraordinary Together</span>
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-sm lg:text-base text-[#666] max-w-2xl mx-auto mb-12 leading-relaxed">
              Ready to transform your infrastructure? Whether you need DevOps consulting, cloud
              migration, or automation solutions, I am here to help you achieve zero-downtime
              deployments and cost optimization.
            </p>
          </ScrollReveal>

          {/* Quick stats */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="inline-flex border border-[#222] bg-[#111] divide-x divide-[#222]">
              <div className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-[#e0e0e0] font-mono">24h</div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider mt-1">
                  response
                </div>
              </div>
              <div className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-[#e0e0e0] font-mono">Global</div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider mt-1">remote</div>
              </div>
              <div className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-[#e0e0e0] font-mono">100%</div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider mt-1">success</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
