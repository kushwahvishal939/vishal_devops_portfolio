'use client';

import React, { useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggeredReveal from '@/components/animations/StaggeredReveal';

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
  icon: string;
}

interface ExperienceTimelineProps {
  className?: string;
}

const ExperienceTimeline = ({ className = '' }: ExperienceTimelineProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(1);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

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
      icon: 'BuildingOfficeIcon',
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
      icon: 'BriefcaseIcon',
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

  const statusPill = (exp: Experience) =>
    exp.endDate === null ? (
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success/15 text-success border border-success/30 animate-pulse">
        Current • SRE/DevOps
      </span>
    ) : (
      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-muted/40 text-muted-foreground border border-border">
        Previous • DevOps
      </span>
    );

  return (
    <section
      ref={timelineRef}
      className={`relative overflow-hidden py-20 bg-background ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.08),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(0,153,204,0.1),transparent_40%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal direction="up">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-sm font-semibold mb-4">
              <Icon name="BoltIcon" size={16} />
              <span>DevOps Career Path</span>
            </div>
            <StaggeredReveal
              text="Reliability-Driven Journey"
              className="text-4xl lg:text-5xl font-bold text-gradient-cyan"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-mono">
              From cost-cutting migrations to platform reliability, here&apos;s the story in uptime,
              pipelines, and autoscaling.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary/50 to-transparent origin-top"
            style={{ scaleY: lineScaleY }}
          />

          <div className="space-y-8">
            {ordered.map((exp, index) => (
              <ScrollReveal key={exp.id} direction="up" delay={index * 0.15}>
                <div className="relative group">
                  {/* Timeline dot with spring animation */}
                  <motion.div
                    className="absolute left-0 md:left-6 top-6 w-3 h-3 rounded-full bg-gradient-to-br from-accent to-primary shadow-neon"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                  />

                  <div className="md:ml-12 glass-card border border-border/60 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-premium-lg">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF] shadow-neon">
                              <Icon name={exp.icon as any} size={22} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                {exp.position}
                              </h3>
                              <p className="text-accent font-semibold">{exp.company}</p>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Icon name="CalendarIcon" size={16} />
                                  {exp.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="MapPinIcon" size={16} />
                                  {exp.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          {statusPill(exp)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-xs uppercase tracking-wide text-accent font-semibold">
                              Reliability Wins
                            </p>
                            <ul className="space-y-2">
                              {exp.achievements.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <Icon
                                    name="CheckCircleIcon"
                                    size={16}
                                    className="text-success mt-0.5 flex-shrink-0"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs uppercase tracking-wide text-accent font-semibold">
                              Stack & Tooling
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <Icon name="SparklesIcon" size={16} className="text-accent" />
                            <span>
                              {exp.endDate === null
                                ? 'Live SRE/DevOps ownership'
                                : 'Closed out with 100% uptime streak'}
                            </span>
                          </div>
                          <button
                            className="text-sm font-semibold text-accent hover:text-primary transition-colors"
                            onClick={() => setExpandedItem(expandedItem === exp.id ? null : exp.id)}
                            aria-expanded={expandedItem === exp.id}
                          >
                            {expandedItem === exp.id ? 'Hide metrics' : 'View metrics'}
                          </button>
                        </div>
                      </div>

                      {/* Expandable metrics with AnimatePresence */}
                      <AnimatePresence>
                        {expandedItem === exp.id && (
                          <motion.div
                            className="border-t border-border/60 bg-background/70 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <StatPill
                                icon="ArrowTrendingUpIcon"
                                label="Deploy cadence"
                                value="40% faster"
                              />
                              <StatPill
                                icon="ShieldCheckIcon"
                                label="Uptime"
                                value={exp.endDate ? '99.9%' : '99.99%'}
                              />
                              <StatPill
                                icon="CurrencyRupeeIcon"
                                label="Cost impact"
                                value={exp.id === 1 ? '45% ↓' : '57% ↓'}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-background rounded-lg font-semibold transition-smooth hover:shadow-premium"
            >
              <span>See full timeline</span>
              <Icon name="ArrowRightIcon" size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const StatPill = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-background">
      <Icon name={icon as any} size={18} />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default ExperienceTimeline;
