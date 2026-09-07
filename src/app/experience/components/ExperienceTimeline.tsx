'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Icon from '@/components/ui/AppIcon';

interface Achievement {
  metric: string;
  value: string;
  description: string;
  icon: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  outcomes: string[];
}

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: 'current' | 'previous';
  isCurrent?: boolean;
  description: string;
  keyAchievements: Achievement[];
  projects: Project[];
  technologies: string[];
  teamSize?: string;
  budget?: string;
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  expandedItems: number[];
  onToggleExpand: (id: number) => void;
}

const ExperienceTimeline = ({
  experiences,
  expandedItems,
  onToggleExpand,
}: ExperienceTimelineProps) => {
  const isExpanded = (id: number) => expandedItems.includes(id);

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
    return 0;
  });

  return (
    <div className="relative">
      {/* Amber timeline line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[#f59e0b]/30" />

      <div className="space-y-8">
        {sortedExperiences.map((experience, index) => (
          <ScrollReveal key={experience.id} direction="up" delay={index * 0.1}>
            <div className="relative pl-10">
              {/* Timeline node */}
              <div className="absolute left-0 top-1.5 w-[23px] h-[23px] border-2 border-[#f59e0b] bg-[#0a0a0a] flex items-center justify-center">
                <div
                  className={`w-2 h-2 ${experience.isCurrent ? 'bg-[#22c55e]' : 'bg-[#f59e0b]'}`}
                />
              </div>

              {/* Card */}
              <div className="terminal-card p-6">
                {/* Header row */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-mono font-bold text-[#e0e0e0]">
                        {experience.position}
                      </h3>
                      {experience.isCurrent && (
                        <span className="px-2 py-0.5 text-xs font-mono border border-[#22c55e]/40 text-[#22c55e] bg-[#22c55e]/5">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[#f59e0b] font-mono text-sm mb-2">@ {experience.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666]">
                      <span className="flex items-center gap-1.5">
                        <Icon name="CalendarIcon" size={14} className="text-[#666]" />
                        {experience.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="MapPinIcon" size={14} className="text-[#666]" />
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleExpand(experience.id)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-[#222] hover:border-[#f59e0b]/50 text-xs font-mono text-[#666] hover:text-[#f59e0b] transition-colors"
                    aria-expanded={isExpanded(experience.id)}
                  >
                    [{isExpanded(experience.id) ? '-' : '+'}]{' '}
                    {isExpanded(experience.id) ? 'COLLAPSE' : 'EXPAND'}
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm font-mono text-[#666] leading-relaxed mb-5">
                  {experience.description}
                </p>

                {/* Achievement readouts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  {experience.keyAchievements.map((achievement, idx) => (
                    <div key={idx} className="border border-[#222] bg-[#0a0a0a] p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={achievement.icon} size={14} className="text-[#f59e0b]" />
                        <span className="text-xs font-mono uppercase tracking-wider text-[#666]">
                          {achievement.metric}
                        </span>
                      </div>
                      <p className="text-2xl font-mono font-bold text-[#f59e0b]">
                        {achievement.value}
                      </p>
                      <p className="text-xs font-mono text-[#666] mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-[#666] uppercase tracking-wider">
                    stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {experience.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-mono border border-[#222] text-[#e0e0e0] bg-[#0a0a0a] hover:border-[#f59e0b]/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable section */}
                <AnimatePresence>
                  {isExpanded(experience.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#222] pt-5 mt-2 space-y-5">
                        {/* Team & Budget */}
                        {(experience.teamSize || experience.budget) && (
                          <div className="flex flex-wrap gap-6">
                            {experience.teamSize && (
                              <div className="flex items-center gap-2">
                                <Icon name="UsersIcon" size={14} className="text-[#f59e0b]" />
                                <span className="text-xs font-mono text-[#666]">team:</span>
                                <span className="text-sm font-mono text-[#e0e0e0]">
                                  {experience.teamSize}
                                </span>
                              </div>
                            )}
                            {experience.budget && (
                              <div className="flex items-center gap-2">
                                <Icon
                                  name="CurrencyRupeeIcon"
                                  size={14}
                                  className="text-[#f59e0b]"
                                />
                                <span className="text-xs font-mono text-[#666]">budget:</span>
                                <span className="text-sm font-mono text-[#e0e0e0]">
                                  {experience.budget}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Projects */}
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-[#f59e0b] mb-3">
                            {`// key projects`}
                          </h4>
                          <div className="space-y-4">
                            {experience.projects.map((project, idx) => (
                              <div key={idx} className="border border-[#222] bg-[#0a0a0a] p-4">
                                <h5 className="text-sm font-mono font-bold text-[#e0e0e0] mb-2">
                                  {project.name}
                                </h5>
                                <p className="text-xs font-mono text-[#666] mb-3 leading-relaxed">
                                  {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-3">
                                  {project.technologies.map((tech, techIdx) => (
                                    <span
                                      key={techIdx}
                                      className="px-1.5 py-0.5 text-[10px] font-mono border border-[#f59e0b]/20 text-[#f59e0b]"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                <ul className="space-y-1.5">
                                  {project.outcomes.map((outcome, outcomeIdx) => (
                                    <li
                                      key={outcomeIdx}
                                      className="flex items-start gap-2 text-xs font-mono text-[#666]"
                                    >
                                      <span className="text-[#22c55e] mt-0.5 flex-shrink-0">
                                        &gt;
                                      </span>
                                      <span>{outcome}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
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
  );
};

export default ExperienceTimeline;
