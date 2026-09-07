'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  name: string;
  icon: string;
  category: string;
}

interface ProjectMetrics {
  costReduction?: string;
  performanceImprovement?: string;
  uptime?: string;
  deploymentTime?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  alt: string;
  technologies: Technology[];
  metrics: ProjectMetrics;
  challenges: string[];
  solutions: string[];
  demoUrl?: string;
  githubUrl?: string;
  architectureImage?: string;
  architectureAlt?: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics'>('overview');

  return (
    <ScrollReveal direction="up">
      <div className="border border-[#222] bg-[#111] font-mono group hover:border-[#333] transition-colors duration-150">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#f59e0b]" />
            <span className="text-[10px] uppercase tracking-widest text-[#666]">
              {project.category.replace('-', '_')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] hover:text-[#f59e0b] transition-colors duration-100"
                aria-label={`Demo for ${project.title}`}
              >
                <Icon name="EyeIcon" size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] hover:text-[#f59e0b] transition-colors duration-100"
                aria-label={`Source code for ${project.title}`}
              >
                <Icon name="CodeBracketIcon" size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-[#e0e0e0] text-base font-bold mb-2 leading-tight">{project.title}</h3>
          <p className="text-[#666] text-xs leading-relaxed mb-4">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-[10px] border border-[#222] text-[#888] bg-[#0d0d0d]"
              >
                <Icon name={tech.icon as any} size={10} className="text-[#f59e0b]/60" />
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 text-[10px] border border-[#222] text-[#444]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 gap-px bg-[#222] mb-4">
            {project.metrics.costReduction && (
              <div className="bg-[#0d0d0d] p-3">
                <div className="text-[#f59e0b] text-sm font-bold font-mono">
                  {project.metrics.costReduction}
                </div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider">
                  cost_reduction
                </div>
              </div>
            )}
            {project.metrics.performanceImprovement && (
              <div className="bg-[#0d0d0d] p-3">
                <div className="text-[#e0e0e0] text-sm font-bold font-mono">
                  {project.metrics.performanceImprovement}
                </div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider">performance</div>
              </div>
            )}
            {project.metrics.uptime && (
              <div className="bg-[#0d0d0d] p-3">
                <div className="text-[#22c55e] text-sm font-bold font-mono">
                  {project.metrics.uptime}
                </div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider">uptime</div>
              </div>
            )}
            {project.metrics.deploymentTime && (
              <div className="bg-[#0d0d0d] p-3">
                <div className="text-[#e0e0e0] text-sm font-bold font-mono">
                  {project.metrics.deploymentTime}
                </div>
                <div className="text-[10px] text-[#444] uppercase tracking-wider">deploy_time</div>
              </div>
            )}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#222] text-[#666] hover:text-[#e0e0e0] hover:border-[#333] transition-colors duration-100 text-xs"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? '[-] collapse' : '[+] expand --details'}</span>
          </button>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#222]">
                {/* Tab bar */}
                <div className="flex border-b border-[#222]">
                  {(
                    [
                      { key: 'overview', label: 'overview' },
                      { key: 'architecture', label: 'arch' },
                      { key: 'metrics', label: 'impact' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 py-2.5 text-[11px] uppercase tracking-wider transition-colors duration-100 ${
                        activeTab === tab.key
                          ? 'text-[#f59e0b] border-b border-[#f59e0b] bg-[#111]'
                          : 'text-[#444] hover:text-[#666] bg-[#0d0d0d]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-5">
                  {activeTab === 'overview' && (
                    <div className="space-y-5">
                      <p className="text-[#888] text-xs leading-relaxed">
                        {project.longDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Challenges */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#f59e0b] text-[10px]">!!</span>
                            <span className="text-[11px] uppercase tracking-wider text-[#666]">
                              challenges
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {project.challenges.map((challenge, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-[11px] text-[#666]"
                              >
                                <span className="text-[#f59e0b] mt-px shrink-0">-</span>
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Solutions */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#22c55e] text-[10px]">[ok]</span>
                            <span className="text-[11px] uppercase tracking-wider text-[#666]">
                              solutions
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {project.solutions.map((solution, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-[11px] text-[#666]"
                              >
                                <span className="text-[#22c55e] mt-px shrink-0">+</span>
                                <span>{solution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Full tech stack */}
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-[#666] mb-3">
                          stack --full
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#222]">
                          {project.technologies.map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 bg-[#0d0d0d]"
                            >
                              <Icon
                                name={tech.icon as any}
                                size={12}
                                className="text-[#f59e0b]/50"
                              />
                              <div>
                                <div className="text-[11px] text-[#e0e0e0]">{tech.name}</div>
                                <div className="text-[9px] text-[#444]">{tech.category}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div>
                      {project.architectureImage ? (
                        <div className="border border-[#222]">
                          <img
                            src={project.architectureImage}
                            alt={
                              project.architectureAlt || `Architecture diagram for ${project.title}`
                            }
                            className="w-full"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-48 border border-dashed border-[#222] bg-[#0d0d0d]">
                          <div className="text-center font-mono">
                            <Icon name="CubeIcon" size={32} className="text-[#333] mx-auto mb-2" />
                            <p className="text-[#444] text-xs">{`// architecture diagram pending`}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222]">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="bg-[#0d0d0d] p-4">
                            <div className="text-[#f59e0b] text-lg font-bold font-mono mb-1">
                              {value}
                            </div>
                            <div className="text-[10px] text-[#444] uppercase tracking-wider font-mono">
                              {key.replace(/([A-Z])/g, '_$1').toLowerCase()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {project.testimonial && (
                        <div className="border-l-2 border-[#f59e0b] bg-[#0d0d0d] p-4">
                          <p className="text-[#888] text-xs leading-relaxed italic mb-3">
                            &quot;{project.testimonial.text}&quot;
                          </p>
                          <div className="text-[11px]">
                            <span className="text-[#e0e0e0]">{project.testimonial.author}</span>
                            <span className="text-[#444] mx-2">|</span>
                            <span className="text-[#666]">
                              {project.testimonial.position}, {project.testimonial.company}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
};

export default ProjectCard;
