'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  technologies: string[];
  impact: string;
  category: string;
  icon: string;
}

interface FeaturedProjectsProps {
  className?: string;
}

const FeaturedProjects = ({ className = '' }: FeaturedProjectsProps) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: 'Cloud Migration & Cost Optimization',
      description:
        'Migrated legacy monolithic application to microservices architecture on AWS, implementing auto-scaling and cost optimization strategies.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=70',
      alt: 'Abstract cloud computing visualization with servers and data connections',
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
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
      alt: 'Developer screen showing automated build and deployment pipeline code',
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
      image:
        'https://images.unsplash.com/photo-1649682892309-e10e0b7cd40b?auto=format&fit=crop&w=1600&q=70',
      alt: 'Glowing container network visualization representing Kubernetes orchestration',
      technologies: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
      impact: '100% Uptime Achieved',
      category: 'Container Orchestration',
      icon: 'CubeIcon',
    },
  ];

  return (
    <section className={`py-20 bg-card/30 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions that deliver measurable business impact through innovative DevOps
            practices
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card overflow-hidden transform-3d hover:scale-105 transition-smooth cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                {/* Project Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center neon-glow">
                    <Icon name={project.icon as any} size={20} className="text-background" />
                  </div>
                </div>

                {/* Impact Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-success/90 text-success-foreground rounded-full text-xs font-semibold backdrop-blur-sm">
                    {project.impact}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-accent font-semibold uppercase tracking-wide">
                    {project.category}
                  </span>
                  <Icon
                    name="ArrowTopRightOnSquareIcon"
                    size={16}
                    className={`text-muted-foreground transition-smooth ${
                      hoveredProject === project.id ? 'text-accent transform rotate-45' : ''
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Button */}
                <div
                  className={`transition-all duration-300 ${
                    hoveredProject === project.id
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-accent to-primary text-background rounded-lg font-semibold text-sm transition-smooth hover:shadow-premium focus-ring">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-smooth hover:shadow-premium-lg magnetic-hover focus-ring"
          >
            <span>Explore All Projects</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
