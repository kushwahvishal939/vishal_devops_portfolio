'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ExpertiseArea {
  icon: string;
  title: string;
  description: string;
  skills: string[];
  achievement: string;
}

interface ExpertiseSectionProps {
  className?: string;
}

const expertiseAreas: ExpertiseArea[] = [
  {
    icon: 'CloudIcon',
    title: 'Cloud Architecture & Migration',
    description:
      'Designing and implementing scalable cloud solutions across AWS, Azure, and GCP with focus on cost optimization and performance.',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
    achievement: 'Reduced infrastructure costs by 55% through intelligent cloud optimization',
  },
  {
    icon: 'CogIcon',
    title: 'CI/CD Pipeline Engineering',
    description:
      'Building robust deployment pipelines that ensure fast, reliable, and secure software delivery with automated testing and monitoring.',
    skills: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps', 'ArgoCD'],
    achievement: 'Improved deployment speed by 40% with zero-downtime deployments',
  },
  {
    icon: 'ServerIcon',
    title: 'Container Orchestration',
    description:
      'Orchestrating containerized applications at scale using Kubernetes, Docker, and service mesh technologies for high availability.',
    skills: ['Kubernetes', 'Docker', 'Helm', 'Istio', 'Prometheus'],
    achievement: 'Achieved 100% uptime across production environments',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Infrastructure Security',
    description:
      'Implementing security-first DevOps practices with automated compliance, vulnerability scanning, and secure deployment strategies.',
    skills: ['Security Scanning', 'Compliance', 'RBAC', 'Network Security', 'Secrets Mgmt'],
    achievement: 'Zero security incidents with automated threat detection',
  },
];

const ExpertiseSection = ({ className = '' }: ExpertiseSectionProps) => {
  return (
    <section className={`py-20 lg:py-28 ${className}`} style={{ background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="font-mono text-sm mb-3" style={{ color: '#666' }}>
              $ ls -la expertise/
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                color: '#e0e0e0',
              }}
            >
              Technical Mastery
            </h2>
            <p className="font-mono text-sm mt-3 max-w-2xl" style={{ color: '#999' }}>
              Deep expertise across the entire DevOps ecosystem, from cloud architecture to security
              implementation, with proven results in enterprise environments.
            </p>
          </div>
        </ScrollReveal>

        {/* Expertise Grid */}
        <div className="grid lg:grid-cols-2 gap-px" style={{ background: '#222' }}>
          {expertiseAreas.map((area, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.08}>
              <div className="p-6 sm:p-8" style={{ background: '#111' }}>
                {/* Title Row */}
                <div className="flex items-center gap-3 mb-4">
                  <Icon name={area.icon as any} size={18} style={{ color: '#f59e0b' }} />
                  <h3 className="font-mono text-base font-semibold" style={{ color: '#e0e0e0' }}>
                    {area.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-mono text-sm leading-relaxed mb-5" style={{ color: '#999' }}>
                  {area.description}
                </p>

                {/* Skills */}
                <div className="mb-5">
                  <p
                    className="font-mono text-xs uppercase tracking-wider mb-2"
                    style={{ color: '#666' }}
                  >
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2 py-1"
                        style={{
                          background: '#0a0a0a',
                          color: '#e0e0e0',
                          border: '1px solid #222',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievement */}
                <div
                  className="flex items-start gap-2 p-3"
                  style={{
                    background: '#0a0a0a',
                    borderLeft: '2px solid #f59e0b',
                  }}
                >
                  <Icon
                    name="CheckCircleIcon"
                    size={14}
                    className="shrink-0 mt-0.5"
                    style={{ color: '#22c55e' }}
                  />
                  <span className="font-mono text-xs" style={{ color: '#e0e0e0' }}>
                    {area.achievement}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div
            className="mt-px p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderTop: 'none',
            }}
          >
            <span className="font-mono text-sm" style={{ color: '#999' }}>
              {'>'} Ready to see these skills in action?
            </span>
            <Link href="/portfolio">
              <motion.button
                whileHover={{ y: -1 }}
                className="font-mono text-sm font-semibold px-5 py-2 flex items-center gap-2"
                style={{
                  background: '#f59e0b',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '0',
                }}
              >
                <span>View Portfolio</span>
                <Icon name="ArrowRightIcon" size={14} />
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExpertiseSection;
