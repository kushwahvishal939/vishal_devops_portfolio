'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const achievements = [
    { metric: '\u20B91.5L \u2192 \u20B965K', label: 'Monthly Cost Reduction' },
    { metric: '40%', label: 'Deployment Time Reduction' },
    { metric: '100%', label: 'Uptime Achievement' },
  ];

  return (
    <section className={`relative min-h-screen bg-[#0a0a0a] overflow-hidden ${className}`}>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Terminal Block */}
          <ScrollReveal direction="up" delay={0}>
            <div className="border border-[#222] bg-[#111] rounded-none mb-10">
              {/* Terminal Title Bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[#222]">
                <span className="w-2 h-2 bg-[#666] rounded-none" />
                <span className="w-2 h-2 bg-[#666] rounded-none" />
                <span className="w-2 h-2 bg-[#666] rounded-none" />
                <span className="ml-3 text-xs text-[#666] font-mono">~/vishal_kushwah</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 sm:p-8 font-mono space-y-4">
                <div className="text-[#666] text-sm">
                  <span className="text-[#f59e0b]">$</span> whoami
                </div>
                <div className="text-[#e0e0e0] text-sm sm:text-base">
                  vishal_kushwah // DevOps Engineer
                </div>

                <div className="h-px bg-[#222] my-4" />

                <div className="text-[#666] text-sm">
                  <span className="text-[#f59e0b]">$</span> cat /etc/motd
                </div>
                <p className="text-[#e0e0e0] text-sm leading-relaxed max-w-2xl">
                  The Cloud Infrastructure Virtuoso who transforms complex cloud chaos into elegant,
                  automated solutions. I don&apos;t just maintain infrastructure &mdash; I
                  revolutionize it.
                </p>

                <motion.span
                  className="inline-block w-2 h-4 bg-[#f59e0b] ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Name */}
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-7xl font-bold text-[#e0e0e0] tracking-tight mb-2">
              Vishal Kushwah
            </h1>
            <p className="font-mono text-lg sm:text-xl text-[#f59e0b] mb-10">
              &gt; DevOps Engineer
            </p>
          </ScrollReveal>

          {/* Achievement Metrics Grid */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#222] mb-10">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`p-5 sm:p-6 bg-[#111] font-mono ${
                    index < achievements.length - 1
                      ? 'border-b sm:border-b-0 sm:border-r border-[#222]'
                      : ''
                  }`}
                >
                  <div className="text-[#666] text-xs uppercase tracking-wider mb-2">
                    {achievement.label}
                  </div>
                  <div className="text-[#f59e0b] text-xl sm:text-2xl font-bold">
                    {achievement.metric}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#f59e0b] text-[#0a0a0a] font-mono font-bold text-sm tracking-wide hover:bg-[#d97706] transition-colors duration-150 inline-flex items-center gap-2"
              >
                <Icon name="RocketLaunchIcon" size={16} />
                <span>HIRE_ME</span>
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3 border border-[#f59e0b] text-[#f59e0b] font-mono font-bold text-sm tracking-wide hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-150 inline-flex items-center gap-2"
              >
                <Icon name="FolderOpenIcon" size={16} />
                <span>VIEW_PORTFOLIO</span>
              </Link>
              <a
                href="https://vishalkushwah.s3.us-east-1.amazonaws.com/vishalkushwah-exp-3.pdf"
                download
                className="px-6 py-3 border border-[#f59e0b] text-[#f59e0b] font-mono font-bold text-sm tracking-wide hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-150 inline-flex items-center gap-2"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                <span>RESUME</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <motion.div
            className="flex items-center gap-2 text-[#666] font-mono text-xs"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon name="ChevronDownIcon" size={16} className="text-[#666]" />
            <span>scroll</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
