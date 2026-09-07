'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

interface SkillsPreviewProps {
  className?: string;
}

const TOTAL_BLOCKS = 20;

const renderBar = (proficiency: number): string => {
  const filled = Math.round((proficiency / 100) * TOTAL_BLOCKS);
  const empty = TOTAL_BLOCKS - filled;
  return '[' + '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + ']';
};

const SkillsPreview = ({ className = '' }: SkillsPreviewProps) => {
  const featuredSkills: Skill[] = [
    { name: 'Kubernetes', icon: 'CubeIcon', proficiency: 95, category: 'Container Orchestration' },
    { name: 'AWS', icon: 'CloudIcon', proficiency: 92, category: 'Cloud Platform' },
    { name: 'Docker', icon: 'ServerIcon', proficiency: 90, category: 'Containerization' },
    {
      name: 'Terraform',
      icon: 'CommandLineIcon',
      proficiency: 88,
      category: 'Infrastructure as Code',
    },
    { name: 'Jenkins', icon: 'CogIcon', proficiency: 85, category: 'CI/CD Pipeline' },
    {
      name: 'Ansible',
      icon: 'WrenchScrewdriverIcon',
      proficiency: 87,
      category: 'Configuration Management',
    },
  ];

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="text-[#666] font-mono text-xs uppercase tracking-wider mb-2">
              <span className="text-[#f59e0b]">$</span> cat skills.log
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#e0e0e0] font-mono">
              DevOps Expertise
            </h2>
            <p className="text-sm text-[#666] font-mono mt-2">
              Mastering the tools that power modern cloud infrastructure and automation
            </p>
            <div className="h-px bg-[#222] mt-6" />
          </div>
        </ScrollReveal>

        {/* Skills List */}
        <div className="space-y-4 mb-12">
          {featuredSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} direction="up" delay={index * 0.06}>
              <div className="border border-[#222] bg-[#111] p-4 hover:border-[#f59e0b]/40 transition-colors duration-150">
                <div className="flex items-center gap-3 mb-2">
                  <Icon
                    name={skill.icon as any}
                    size={16}
                    className="text-[#f59e0b] flex-shrink-0"
                  />
                  <span className="text-[#e0e0e0] font-mono text-sm font-bold min-w-[100px]">
                    {skill.name}
                  </span>
                  <span className="text-[#666] font-mono text-xs hidden sm:inline">
                    {`// ${skill.category}`}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-[#f59e0b] text-xs sm:text-sm whitespace-pre tracking-tight">
                    {renderBar(skill.proficiency)}
                  </span>
                  <span className="text-[#e0e0e0] text-xs font-bold ml-auto">
                    {skill.proficiency}%
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Skills CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#f59e0b] text-[#f59e0b] font-mono text-sm font-bold hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-150"
            >
              <span>EXPLORE_ALL_SKILLS</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsPreview;
