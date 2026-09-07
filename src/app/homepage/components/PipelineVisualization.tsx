'use client';

import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface PipelineStage {
  id: string;
  name: string;
  icon: string;
  description: string;
  tools: string[];
}

interface PipelineVisualizationProps {
  className?: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'code',
    name: 'CODE',
    icon: 'CodeBracketIcon',
    description: 'Git Push',
    tools: ['Git', 'GitHub'],
  },
  {
    id: 'build',
    name: 'BUILD',
    icon: 'CogIcon',
    description: 'Docker Build',
    tools: ['Docker', 'Dockerfile'],
  },
  {
    id: 'test',
    name: 'TEST',
    icon: 'BeakerIcon',
    description: 'Automated Tests',
    tools: ['Jest', 'SonarQube'],
  },
  {
    id: 'security',
    name: 'SECURITY',
    icon: 'ShieldCheckIcon',
    description: 'Vulnerability Scan',
    tools: ['Trivy', 'OWASP'],
  },
  {
    id: 'deploy',
    name: 'DEPLOY',
    icon: 'RocketLaunchIcon',
    description: 'K8s Rollout',
    tools: ['ArgoCD', 'Helm'],
  },
  {
    id: 'monitor',
    name: 'MONITOR',
    icon: 'ChartBarIcon',
    description: 'Observability',
    tools: ['Prometheus', 'Grafana'],
  },
];

const STATS = [
  { label: 'deployments this month', value: '127' },
  { label: 'success rate', value: '99.99%' },
  { label: 'avg pipeline', value: '12min' },
];

const DOT_COUNT = 4;
const CYCLE_DURATION = 6;

function DataDot({ index }: { index: number }) {
  const delay = index * (CYCLE_DURATION / DOT_COUNT);

  return (
    <>
      {/* Horizontal dot (desktop) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-[#f59e0b] hidden md:block"
        style={{ left: 0 }}
        initial={{ left: '0%', opacity: 0 }}
        animate={{
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: CYCLE_DURATION,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {/* Vertical dot (mobile) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[4px] h-[4px] bg-[#f59e0b] block md:hidden"
        style={{ top: 0 }}
        initial={{ top: '0%', opacity: 0 }}
        animate={{
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{
          duration: CYCLE_DURATION,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  );
}

function ConnectorLine() {
  return (
    <div className="relative md:flex-1 md:h-[2px] md:self-center md:min-w-[20px] w-[2px] h-8 self-center bg-[#222] overflow-hidden">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <DataDot key={i} index={i} />
      ))}
    </div>
  );
}

function StatusDot() {
  return (
    <motion.span
      className="inline-block w-[6px] h-[6px] bg-[#22c55e]"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function StageCard({ stage, index }: { stage: PipelineStage; index: number }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <ScrollReveal direction="up" delay={index * 0.1} className="flex-shrink-0">
      <motion.div
        className="relative bg-[#111] border border-[#222] p-4 font-mono w-full md:w-[150px] cursor-default select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ borderColor: '#f59e0b', y: -2 }}
        transition={{ duration: 0.15 }}
      >
        {/* Status indicator */}
        <div className="absolute top-2 right-2">
          <StatusDot />
        </div>

        {/* Icon */}
        <div className="mb-3 text-[#f59e0b]">
          <Icon name={stage.icon} size={20} className="text-[#f59e0b]" />
        </div>

        {/* Stage name */}
        <h3 className="text-[#f59e0b] text-xs font-bold tracking-wider mb-1">{stage.name}</h3>

        {/* Description */}
        <p className="text-[#666] text-[10px] leading-tight">{stage.description}</p>

        {/* Tools tooltip on hover */}
        <motion.div
          className="mt-2 flex flex-wrap gap-1 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={hovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {stage.tools.map((tool) => (
            <span
              key={tool}
              className="inline-block bg-[#0a0a0a] border border-[#333] px-1.5 py-0.5 text-[9px] text-[#e0e0e0]"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function PipelineVisualization({ className = '' }: PipelineVisualizationProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="text-[#666] font-mono text-xs uppercase tracking-wider mb-2">
              <span className="text-[#f59e0b]">$</span> pipeline --visualize
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#e0e0e0] font-mono">
              CI/CD Pipeline
            </h2>
            <p className="text-sm text-[#666] font-mono mt-2">
              Real-time CI/CD pipeline architecture powering every deployment
            </p>
          </div>
        </ScrollReveal>

        {/* Pipeline */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            {STAGES.map((stage, i) => (
              <React.Fragment key={stage.id}>
                <StageCard stage={stage} index={i} />
                {i < STAGES.length - 1 &&
                  (prefersReducedMotion ? (
                    <div className="md:flex-1 md:h-[2px] md:self-center md:min-w-[20px] w-[2px] h-8 self-center bg-[#222]" />
                  ) : (
                    <ConnectorLine />
                  ))}
              </React.Fragment>
            ))}
          </div>
        </ScrollReveal>

        {/* Stats Bar */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 border border-[#222] bg-[#111] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#222] font-mono">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex-1 px-6 py-4 text-center">
                <span className="text-[#f59e0b] text-xl font-bold">{stat.value}</span>
                <span className="text-[#666] text-xs ml-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
