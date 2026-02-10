'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  achievements: string[];
  technologies: string[];
  icon: string;
}

interface ExperienceTimelineProps {
  className?: string;
}

const ExperienceTimeline = ({ className = '' }: ExperienceTimelineProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      id: 1,
      company: 'RDASH',
      position: 'DevOps Engineer',
      duration: 'Dec 22, 2025 - Present',
      location: 'Gurgaon, India',
      achievements: [
        'Designed and implemented GitHub Actions CI/CD pipelines for automated build & deployment',
        'Managed cloud infrastructure using Microsoft Azure',
        'Built custom monitoring dashboards using Grafana for real-time system insights',
        'Worked with databases: PostgreSQL & MySQL',
        'Integrated Metabase for internal analytics and reporting',
        'Configured OAuth Proxy for internal authentication & secure access',
        'Improved deployment cadence with progressive delivery'
      ],
      technologies: ['Kubernetes', 'AWS', 'Azure', 'Terraform', 'GitHub Actions', 'Helm'],
      icon: 'BuildingOfficeIcon'
    },
    {
      id: 2,
      company: 'XGrowth LLC',
      position: 'DevOps Engineer',
      duration: 'Oct 2023 - Dec 18, 2025',
      location: 'Noida, India',
      achievements: [
        'Reduced infrastructure costs by 57% through intelligent resource optimization',
        'Achieved 100% uptime for critical production systems',
        'Implemented automated CI/CD pipelines reducing deployment time by 40%'
      ],
      technologies: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Docker'],
      icon: 'BriefcaseIcon'
    },
    // {
    //   id: 2,
    //   company: 'CloudScale Innovations',
    //   position: 'DevOps Engineer',
    //   duration: '2020 - 2022',
    //   location: 'Mumbai, India',
    //   achievements: [
    //     'Migrated legacy infrastructure to cloud-native architecture',
    //     'Established monitoring and alerting systems with 99.9% accuracy',
    //     'Led team of 5 engineers in infrastructure automation projects'
    //   ],
    //   technologies: ['AWS', 'Docker', 'Ansible', 'Prometheus', 'Grafana'],
    //   icon: 'CloudIcon'
    // },
    // {
    //   id: 3,
    //   company: 'StartupTech',
    //   position: 'Junior DevOps Engineer',
    //   duration: '2018 - 2020',
    //   location: 'Pune, India',
    //   achievements: [
    //     'Built scalable infrastructure from ground up',
    //     'Implemented security best practices and compliance standards',
    //     'Automated deployment processes reducing manual errors by 85%'
    //   ],
    //   technologies: ['Linux', 'Git', 'Jenkins', 'Docker', 'AWS'],
    //   icon: 'RocketLaunchIcon'
    // }
  ];

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building reliable infrastructure and leading digital transformation across innovative companies
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-primary hidden md:block"></div>

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full border-4 border-background hidden md:block pulse-glow"></div>

                {/* Experience Card */}
                <div className="md:ml-16 glass-card p-6 transform-3d hover:scale-[1.02] transition-smooth">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Company Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center neon-glow">
                        <Icon name={experience.icon as any} size={24} className="text-background" />
                      </div>

                      {/* Position & Company */}
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {experience.position}
                        </h3>
                        <p className="text-accent font-semibold mb-1">
                          {experience.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {experience.duration} • {experience.location}
                        </p>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => setExpandedItem(expandedItem === experience.id ? null : experience.id)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth focus-ring"
                      aria-label={`${expandedItem === experience.id ? 'Collapse' : 'Expand'} details for ${experience.company}`}
                    >
                      <Icon 
                        name={expandedItem === experience.id ? "ChevronUpIcon" : "ChevronDownIcon"} 
                        size={20} 
                      />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedItem === experience.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wide">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Experience CTA */}
        <div className="text-center mt-12">
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold transition-smooth hover:bg-accent hover:text-background magnetic-hover focus-ring"
          >
            <span>View Complete Experience</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
