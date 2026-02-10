import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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
  startDate?: string;
  endDate?: string | null;
  isCurrent?: boolean;
  location: string;
  type: 'current' | 'previous';
  companyLogo: string;
  companyLogoAlt: string;
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

  // Order: current first, then most recent by start/end date
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;

    const aDate = a.startDate || a.endDate || '';
    const bDate = b.startDate || b.endDate || '';

    const aTime = aDate ? new Date(aDate).getTime() : 0;
    const bTime = bDate ? new Date(bDate).getTime() : 0;

    return bTime - aTime; // newer first
  });

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent/30"></div>

      <div className="space-y-12">
        {sortedExperiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`relative transition-all duration-700 transform ${
              index % 2 === 0 ? 'translate-x-0' : 'translate-x-0'
            }`}
          >
            {/* Timeline Node */}
            <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full border-4 border-background shadow-premium z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full animate-ping opacity-30"></div>
            </div>

            {/* Experience Card */}
            <div className="ml-20 glass-card p-6 lg:p-8 hover:shadow-premium-lg transition-all duration-300 magnetic-hover">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                  <div className="flex-shrink-0">
                    <AppImage
                      src={experience.companyLogo}
                      alt={experience.companyLogoAlt}
                      className="w-16 h-16 rounded-xl object-cover border border-border"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gradient mb-1">
                      {experience.position}
                    </h3>
                    <p className="text-lg font-semibold text-foreground mb-1">
                      {experience.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="CalendarIcon" size={16} />
                        <span>{experience.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPinIcon" size={16} />
                        <span>{experience.location}</span>
                      </span>
                      {experience.type === 'current' ? (
                        <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                          Current Organization
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-muted/30 text-muted-foreground rounded-full text-xs font-medium">
                          Previous Experience
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onToggleExpand(experience.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-smooth focus-ring"
                >
                  <span className="text-sm font-medium">
                    {isExpanded(experience.id) ? 'Show Less' : 'View Details'}
                  </span>
                  <Icon
                    name={isExpanded(experience.id) ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                    size={16}
                    className={`transition-transform duration-300 ${
                      isExpanded(experience.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">{experience.description}</p>

              {/* Key Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {experience.keyAchievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="bg-background/50 rounded-lg p-4 border border-border hover:border-accent/50 transition-smooth"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Icon name={achievement.icon as any} size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gradient">{achievement.value}</p>
                        <p className="text-xs text-muted-foreground">{achievement.metric}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="CogIcon" size={16} />
                  <span>Technologies Used</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isExpanded(experience.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-border pt-6 space-y-6">
                  {/* Additional Info */}
                  {(experience.teamSize || experience.budget) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {experience.teamSize && (
                        <div className="flex items-center space-x-3">
                          <Icon name="UsersIcon" size={20} className="text-accent" />
                          <div>
                            <p className="text-sm text-muted-foreground">Team Size</p>
                            <p className="font-semibold text-foreground">{experience.teamSize}</p>
                          </div>
                        </div>
                      )}
                      {experience.budget && (
                        <div className="flex items-center space-x-3">
                          <Icon name="CurrencyRupeeIcon" size={20} className="text-accent" />
                          <div>
                            <p className="text-sm text-muted-foreground">Budget Managed</p>
                            <p className="font-semibold text-foreground">{experience.budget}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Projects */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <Icon name="FolderIcon" size={20} />
                      <span>Key Projects</span>
                    </h4>
                    <div className="space-y-4">
                      {experience.projects.map((project, idx) => (
                        <div
                          key={idx}
                          className="bg-background/30 rounded-lg p-4 border border-border"
                        >
                          <h5 className="font-semibold text-foreground mb-2">{project.name}</h5>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>

                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Technologies:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, techIdx) => (
                                <span
                                  key={techIdx}
                                  className="px-2 py-1 bg-accent/10 text-accent rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                              Outcomes:
                            </p>
                            <ul className="space-y-1">
                              {project.outcomes.map((outcome, outcomeIdx) => (
                                <li
                                  key={outcomeIdx}
                                  className="text-sm text-muted-foreground flex items-start space-x-2"
                                >
                                  <Icon
                                    name="CheckIcon"
                                    size={14}
                                    className="text-success mt-0.5 flex-shrink-0"
                                  />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
