'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-premium-lg hover:border-accent/30 magnetic-hover">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={project.image}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full backdrop-blur-sm border border-accent/30">
            {project.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.demoUrl && (
            <button className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border hover:bg-accent hover:text-background transition-colors">
              <Icon name="EyeIcon" size={16} />
            </button>
          )}
          {project.githubUrl && (
            <button className="p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border hover:bg-accent hover:text-background transition-colors">
              <Icon name="CodeBracketIcon" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-md text-xs"
              >
                <Icon name={tech.icon as any} size={12} className="text-accent" />
                <span className="text-muted-foreground">{tech.name}</span>
              </div>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {project.metrics.costReduction && (
            <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="text-lg font-bold text-success">{project.metrics.costReduction}</div>
              <div className="text-xs text-muted-foreground">Cost Reduction</div>
            </div>
          )}
          {project.metrics.performanceImprovement && (
            <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="text-lg font-bold text-accent">{project.metrics.performanceImprovement}</div>
              <div className="text-xs text-muted-foreground">Performance</div>
            </div>
          )}
        </div>

        {/* Expand Button */}
        <button
          onClick={toggleExpanded}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors focus-ring"
        >
          <span className="text-sm font-medium">
            {isExpanded ? 'Show Less' : 'View Details'}
          </span>
          <Icon 
            name={isExpanded ? "ChevronUpIcon" : "ChevronDownIcon"} 
            size={16} 
            className="transition-transform duration-300"
          />
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/20">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {[
              { key: 'overview', label: 'Overview', icon: 'DocumentTextIcon' },
              { key: 'architecture', label: 'Architecture', icon: 'CubeIcon' },
              { key: 'metrics', label: 'Impact', icon: 'ChartBarIcon' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                <Icon name={tab.icon as any} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.longDescription}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="ExclamationTriangleIcon" size={16} className="text-warning" />
                      <span>Challenges</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="MinusIcon" size={12} className="text-warning mt-1 flex-shrink-0" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                      <Icon name="CheckCircleIcon" size={16} className="text-success" />
                      <span>Solutions</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="CheckIcon" size={12} className="text-success mt-1 flex-shrink-0" />
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* All Technologies */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technology Stack</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg"
                      >
                        <Icon name={tech.icon as any} size={16} className="text-accent" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{tech.name}</div>
                          <div className="text-xs text-muted-foreground">{tech.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                {project.architectureImage ? (
                  <div className="relative">
                    <AppImage
                      src={project.architectureImage}
                      alt={project.architectureAlt || `Architecture diagram for ${project.title}`}
                      className="w-full rounded-lg border border-border"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                      <Icon name="CubeIcon" size={48} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Architecture diagram coming soon</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="text-2xl font-bold text-accent mb-1">{value}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {project.testimonial && (
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="ChatBubbleLeftEllipsisIcon" size={20} className="text-accent mt-1" />
                      <div>
                        <p className="text-muted-foreground italic mb-3">"{project.testimonial.text}"</p>
                        <div className="text-sm">
                          <div className="font-semibold text-foreground">{project.testimonial.author}</div>
                          <div className="text-muted-foreground">
                            {project.testimonial.position} at {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;