'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string | null;
  location: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceTimelineProps {
  className?: string;
}

const ExperienceTimeline = ({ className = '' }: ExperienceTimelineProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(1);

  const experiences: Experience[] = [
    {
      id: 1,
      company: 'RDASH',
      position: 'DevOps Engineer',
      duration: 'Dec 22, 2025 - Present',
      startDate: '2025-12-22',
      endDate: null,
      location: 'Remote, India',
      achievements: [
        'Designed and implemented GitHub Actions CI/CD pipelines for automated build & deployment',
        'Managed cloud infrastructure using Microsoft Azure',
        'Built custom monitoring dashboards using Grafana for real-time system insights',
        'Set up and configured Kibana for log monitoring and debugging',
        'Worked with databases: PostgreSQL & MySQL',
        'Configured OAuth Proxy for internal authentication & secure access',
        'Improved deployment cadence with progressive delivery',
      ],
      technologies: ['Kubernetes', 'AWS', 'Terraform', 'Azure', 'Helm'],
    },
    {
      id: 2,
      company: 'XGrowth LLC',
      position: 'DevOps Engineer',
      duration: 'Oct 2023 - Dec 18, 2025',
      startDate: '2023-10-01',
      endDate: '2025-12-18',
      location: 'Noida, India',
      achievements: [
        'Reduced infrastructure costs by 57% through intelligent resource optimization',
        'Achieved 100% uptime for critical production systems',
        'Implemented automated CI/CD pipelines reducing deployment time by 40%',
      ],
      technologies: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Docker'],
    },
  ];

  const ordered = useMemo(() => {
    return [...experiences].sort((a, b) => {
      if (a.endDate === null) return -1;
      if (b.endDate === null) return 1;
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={`relative py-20 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="text-[#666] font-mono text-xs uppercase tracking-wider mb-2">
              <span className="text-[#f59e0b]">$</span> history --career
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#e0e0e0] font-mono">Experience</h2>
            <p className="text-sm text-[#666] font-mono mt-2">
              From cost-cutting migrations to platform reliability &mdash; the story in uptime,
              pipelines, and autoscaling.
            </p>
            <div className="h-px bg-[#222] mt-6" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#f59e0b]/30" />

          <div className="space-y-8">
            {ordered.map((exp, index) => (
              <ScrollReveal key={exp.id} direction="up" delay={index * 0.12}>
                <div className="relative pl-8">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-5 w-2 h-2 bg-[#f59e0b] -translate-x-[3.5px]" />

                  {/* Card */}
                  <div className="border border-[#222] bg-[#111]">
                    <div className="p-5 sm:p-6">
                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#e0e0e0] font-mono">
                            {exp.position}
                          </h3>
                          <p className="text-[#f59e0b] font-mono text-sm font-bold">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#666] font-mono mt-1">
                            <span className="flex items-center gap-1">
                              <Icon name="CalendarIcon" size={12} />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="MapPinIcon" size={12} />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        {exp.endDate === null ? (
                          <span className="px-2 py-1 text-xs font-mono font-bold border border-[#22c55e]/40 text-[#22c55e] bg-[#22c55e]/10">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-mono font-bold border border-[#222] text-[#666]">
                            PREV
                          </span>
                        )}
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-wider text-[#f59e0b] font-mono font-bold mb-2">
                          &gt; achievements
                        </p>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#e0e0e0]/80 font-mono"
                            >
                              <span className="text-[#22c55e] flex-shrink-0 mt-0.5">+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="mb-3">
                        <p className="text-xs uppercase tracking-wider text-[#f59e0b] font-mono font-bold mb-2">
                          &gt; stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 border border-[#222] bg-[#0a0a0a] text-[#e0e0e0] text-xs font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Toggle metrics */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#222]">
                        <span className="text-xs text-[#666] font-mono">
                          {exp.endDate === null
                            ? '// live SRE/DevOps ownership'
                            : '// closed with 100% uptime streak'}
                        </span>
                        <button
                          className="text-xs font-mono font-bold text-[#f59e0b] hover:text-[#e0e0e0] transition-colors duration-150"
                          onClick={() => setExpandedItem(expandedItem === exp.id ? null : exp.id)}
                          aria-expanded={expandedItem === exp.id}
                        >
                          {expandedItem === exp.id ? '[ - ] hide_metrics' : '[ + ] view_metrics'}
                        </button>
                      </div>
                    </div>

                    {/* Expandable metrics */}
                    <AnimatePresence>
                      {expandedItem === exp.id && (
                        <motion.div
                          className="border-t border-[#222] overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <MetricBlock label="Deploy cadence" value="40% faster" />
                            <MetricBlock label="Uptime" value={exp.endDate ? '99.9%' : '99.99%'} />
                            <MetricBlock
                              label="Cost impact"
                              value={exp.id === 1 ? '45% down' : '57% down'}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#f59e0b] text-[#f59e0b] font-mono text-sm font-bold hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-150"
            >
              <span>FULL_TIMELINE</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const MetricBlock = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-[#222] bg-[#0a0a0a] p-3">
    <p className="text-xs text-[#666] font-mono uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-bold text-[#f59e0b] font-mono">{value}</p>
  </div>
);

export default ExperienceTimeline;
