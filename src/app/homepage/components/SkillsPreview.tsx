'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

interface SkillsPreviewProps {
  className?: string;
}

const SkillsPreview = ({ className = '' }: SkillsPreviewProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const featuredSkills: Skill[] = [
    { name: 'Kubernetes', icon: 'CubeIcon', proficiency: 95, category: 'Container Orchestration' },
    { name: 'AWS', icon: 'CloudIcon', proficiency: 92, category: 'Cloud Platform' },
    { name: 'Docker', icon: 'ServerIcon', proficiency: 90, category: 'Containerization' },
    { name: 'Terraform', icon: 'CommandLineIcon', proficiency: 88, category: 'Infrastructure as Code' },
    { name: 'Jenkins', icon: 'CogIcon', proficiency: 85, category: 'CI/CD Pipeline' },
    { name: 'Ansible', icon: 'WrenchScrewdriverIcon', proficiency: 87, category: 'Configuration Management' }
  ];

  return (
    <section className={`py-20 bg-card/50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
            DevOps Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mastering the tools that power modern cloud infrastructure and automation
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {featuredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass-card p-6 text-center transform-3d hover:scale-105 transition-smooth cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Icon */}
              <div className="relative mb-4">
                <div className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center transition-smooth ${
                  hoveredSkill === skill.name 
                    ? 'bg-gradient-to-br from-accent to-primary neon-glow' :'bg-accent/20'
                }`}>
                  <Icon 
                    name={skill.icon as any} 
                    size={32} 
                    className={`transition-smooth ${
                      hoveredSkill === skill.name ? 'text-background' : 'text-accent'
                    }`}
                  />
                </div>
                {hoveredSkill === skill.name && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="CheckIcon" size={16} className="text-background" />
                  </div>
                )}
              </div>

              {/* Skill Name */}
              <h3 className="font-semibold text-foreground mb-2 text-sm lg:text-base">
                {skill.name}
              </h3>

              {/* Proficiency Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: hoveredSkill === skill.name ? `${skill.proficiency}%` : '0%' 
                  }}
                ></div>
              </div>

              {/* Proficiency Percentage */}
              <div className="text-xs text-muted-foreground">
                {hoveredSkill === skill.name ? `${skill.proficiency}%` : skill.category}
              </div>
            </div>
          ))}
        </div>

        {/* View All Skills CTA */}
        <div className="text-center">
          <Link
            href="/skills"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold transition-smooth hover:bg-accent hover:text-background magnetic-hover focus-ring"
          >
            <span>Explore All Skills</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsPreview;
