'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'experience' | 'education';
  icon: string;
}

interface JourneyTimelineProps {
  className?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2024',
    title: 'DevOps Engineer',
    company: 'XGrowth LLC',
    description:
      'Leading cloud transformation initiatives and implementing enterprise-scale DevOps practices.',
    achievements: [
      'Designed multi-region disaster recovery',
      'Reduced infrastructure costs by 1.5L to 65K monthly',
      'Implemented zero-downtime deployment strategies',
      'Led team of 8 engineers across multiple projects',
    ],
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
    type: 'experience',
    icon: 'BriefcaseIcon',
  },
  {
    year: '2023',
    title: 'Monitoring & Observability Engineer',
    company: 'BlinkHealth',
    description:
      'Built scalable cloud infrastructure from ground up, focusing on cost optimization and security best practices.',
    achievements: [
      'Designed multi-region disaster recovery',
      'Implemented Infrastructure as Code practices',
      'Achieved SOC 2 compliance certification',
    ],
    technologies: ['AWS', 'Grafana', 'Icinga', 'EC2 Instances'],
    type: 'experience',
    icon: 'CloudIcon',
  },
  {
    year: '2020',
    title: 'B.Tech Civil',
    company: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
    description:
      'Graduated with honors, specializing in distributed systems and cloud computing architectures.',
    achievements: [
      'CGPA: 7.1/10',
      'Published research on container orchestration',
      'Led university DevOps club for 2 years',
    ],
    technologies: [
      'Python',
      'Linux',
      'Networking',
      'Database Systems',
      'Cloud Computing',
      'DevOps',
    ],
    type: 'education',
    icon: 'AcademicCapIcon',
  },
];

const JourneyTimeline = ({ className = '' }: JourneyTimelineProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpanded = useCallback((index: number) => {
    setExpandedItem((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="journey"
      className={`py-20 lg:py-28 ${className}`}
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="font-mono text-sm mb-3" style={{ color: '#666' }}>
              $ git log --oneline career
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                color: '#e0e0e0',
              }}
            >
              Professional Path
            </h2>
            <p className="font-mono text-sm mt-3 max-w-2xl" style={{ color: '#999' }}>
              A journey of continuous learning, innovation, and delivering measurable impact in
              DevOps and cloud technologies.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Amber left border */}
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: '#f59e0b' }} />

          <div className="space-y-0">
            {timelineEvents.map((event, index) => {
              const isExpanded = expandedItem === index;

              return (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <div className="relative pl-8">
                    {/* Dot on the amber line */}
                    <div
                      className="absolute left-0 top-6 w-2 h-2 -translate-x-[3.5px]"
                      style={{ background: '#f59e0b' }}
                    />

                    <div
                      className="group cursor-pointer"
                      style={{
                        background: '#111',
                        border: '1px solid #222',
                        marginBottom: '2px',
                      }}
                      onClick={() => toggleExpanded(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleExpanded(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                    >
                      {/* Header */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span
                                className="font-mono text-xs font-bold"
                                style={{ color: '#f59e0b' }}
                              >
                                {event.year}
                              </span>
                              <span
                                className="font-mono text-xs uppercase tracking-wider"
                                style={{ color: '#666' }}
                              >
                                {event.type}
                              </span>
                            </div>

                            <h3
                              className="font-mono text-base font-semibold mb-1"
                              style={{ color: '#e0e0e0' }}
                            >
                              {event.title}
                            </h3>

                            <p className="font-mono text-sm" style={{ color: '#f59e0b' }}>
                              {event.company}
                            </p>
                          </div>

                          <Icon
                            name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                            size={16}
                            className="shrink-0 mt-1"
                            style={{ color: '#666' }}
                          />
                        </div>

                        <p
                          className="font-mono text-sm leading-relaxed mt-3"
                          style={{ color: '#999' }}
                        >
                          {event.description}
                        </p>

                        {/* Technologies - always visible */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {event.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-xs px-2 py-0.5"
                              style={{
                                background: '#0a0a0a',
                                color: '#e0e0e0',
                                border: '1px solid #222',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanded: Achievements */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4"
                              style={{ borderTop: '1px solid #222' }}
                            >
                              <p
                                className="font-mono text-xs uppercase tracking-wider mb-3"
                                style={{ color: '#666' }}
                              >
                                Key Achievements
                              </p>
                              <ul className="space-y-2">
                                {event.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span
                                      className="font-mono text-xs mt-0.5 shrink-0"
                                      style={{ color: '#22c55e' }}
                                    >
                                      +
                                    </span>
                                    <span
                                      className="font-mono text-sm"
                                      style={{ color: '#e0e0e0' }}
                                    >
                                      {achievement}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
