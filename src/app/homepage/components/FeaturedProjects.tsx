'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  impact: string;
  category: string;
  icon: string;
}

interface FeaturedProjectsProps {
  className?: string;
}

const FeaturedProjects = ({ className = '' }: FeaturedProjectsProps) => {
  const featuredProjects: Project[] = [
    {
      id: 1,
      title: 'Cloud Migration & Cost Optimization',
      description:
        'Migrated legacy monolithic application to microservices architecture on AWS, implementing auto-scaling and cost optimization strategies.',
      technologies: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
      impact: '57% Cost Reduction',
      category: 'Cloud Architecture',
      icon: 'CloudIcon',
    },
    {
      id: 2,
      title: 'CI/CD Pipeline Automation',
      description:
        'Built comprehensive CI/CD pipeline with automated testing, security scanning, and deployment strategies for multiple environments.',
      technologies: ['Jenkins', 'GitLab', 'SonarQube', 'Ansible'],
      impact: '40% Faster Deployments',
      category: 'DevOps Automation',
      icon: 'CogIcon',
    },
    {
      id: 3,
      title: 'Kubernetes Orchestration Platform',
      description:
        'Designed and implemented enterprise-grade Kubernetes platform with monitoring, logging, and security best practices.',
      technologies: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
      impact: '100% Uptime Achieved',
      category: 'Container Orchestration',
      icon: 'CubeIcon',
    },
  ];

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="mb-12">
            <p className="text-[#666] font-mono text-xs uppercase tracking-wider mb-2">
              <span className="text-[#f59e0b]">$</span> ls ./projects
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#e0e0e0] font-mono">
              Featured Projects
            </h2>
            <p className="text-sm text-[#666] font-mono mt-2">
              Real-world solutions that deliver measurable business impact through innovative DevOps
              practices
            </p>
            <div className="h-px bg-[#222] mt-6" />
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
              <div className="border border-[#222] bg-[#111] h-full flex flex-col hover:border-[#f59e0b]/40 transition-colors duration-150">
                {/* Card Header */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#0a0a0a]">
                  <Icon name={project.icon as any} size={14} className="text-[#f59e0b]" />
                  <span className="text-xs text-[#666] font-mono truncate">{project.category}</span>
                  <span className="ml-auto text-xs text-[#22c55e] font-mono font-bold">
                    {project.impact}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-[#e0e0e0] font-mono mb-3 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#666] font-mono mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-xs text-[#f59e0b] font-mono font-bold mb-2">&gt; stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 border border-[#222] bg-[#0a0a0a] text-[#e0e0e0] text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider + link hint */}
                  <div className="pt-3 border-t border-[#222]">
                    <span className="text-xs text-[#666] font-mono">
                      <span className="text-[#f59e0b]">$</span> cat README.md{' '}
                      <span className="text-[#f59e0b]">--more</span>
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Projects CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f59e0b] text-[#0a0a0a] font-mono text-sm font-bold hover:bg-[#d97706] transition-colors duration-150"
            >
              <span>EXPLORE_ALL_PROJECTS</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedProjects;
