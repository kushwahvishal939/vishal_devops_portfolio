'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ProjectStatsProps {
  totalProjects: number;
  completedProjects: number;
  totalCostSavings: string;
  averagePerformanceGain: string;
}

const ProjectStats = ({
  totalProjects,
  completedProjects,
  totalCostSavings,
  averagePerformanceGain,
}: ProjectStatsProps) => {
  const stats = [
    {
      label: 'TOTAL_PROJECTS',
      value: totalProjects.toString(),
      icon: 'FolderIcon',
      prefix: '>>',
    },
    {
      label: 'COMPLETED',
      value: completedProjects.toString(),
      icon: 'CheckCircleIcon',
      prefix: '[OK]',
    },
    {
      label: 'COST_SAVINGS',
      value: totalCostSavings,
      icon: 'CurrencyRupeeIcon',
      prefix: '$$',
    },
    {
      label: 'AVG_PERF_GAIN',
      value: averagePerformanceGain,
      icon: 'ChartBarIcon',
      prefix: '++',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
      {stats.map((stat, index) => (
        <ScrollReveal key={index} direction="up" delay={index * 0.08}>
          <div className="bg-[#111] p-5 font-mono group hover:bg-[#161616] transition-colors duration-150">
            <div className="flex items-center gap-2 mb-3">
              <Icon name={stat.icon as any} size={14} className="text-[#666]" />
              <span className="text-[10px] uppercase tracking-widest text-[#666]">
                {stat.label}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#f59e0b] text-xs font-mono">{stat.prefix}</span>
              <span className="text-[#e0e0e0] text-2xl font-mono font-bold tracking-tight">
                {stat.value}
              </span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ProjectStats;
