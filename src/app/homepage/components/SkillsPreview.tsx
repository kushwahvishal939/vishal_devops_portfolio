'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import AntiGravityCard from '@/components/animations/AntiGravityCard';

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

interface SkillsPreviewProps {
  className?: string;
}

const SkillBar = ({ proficiency }: { proficiency: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full bg-muted rounded-full h-2 mb-2">
      <motion.div
        className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${proficiency}%` } : { width: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  );
};

const SkillsPreview = ({ className = '' }: SkillsPreviewProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    <section className={`py-20 bg-card/50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">DevOps Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mastering the tools that power modern cloud infrastructure and automation
            </p>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {featuredSkills.map((skill, index) => (
            <ScrollReveal key={skill.name} direction="up" delay={index * 0.08}>
              <AntiGravityCard className="p-6 text-center cursor-pointer" tiltStrength={6}>
                <div
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Skill Icon */}
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center transition-smooth ${
                        hoveredSkill === skill.name
                          ? 'bg-gradient-to-br from-accent to-primary neon-glow'
                          : 'bg-accent/20'
                      }`}
                    >
                      <Icon
                        name={skill.icon as any}
                        size={32}
                        className={`transition-smooth ${
                          hoveredSkill === skill.name ? 'text-background' : 'text-accent'
                        }`}
                      />
                    </div>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Icon name="CheckIcon" size={16} className="text-background" />
                      </motion.div>
                    )}
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-semibold text-foreground mb-2 text-sm lg:text-base">
                    {skill.name}
                  </h3>

                  {/* Proficiency Bar — animates on scroll */}
                  <SkillBar proficiency={skill.proficiency} />

                  {/* Proficiency Percentage */}
                  <div className="text-xs text-muted-foreground">
                    {hoveredSkill === skill.name ? `${skill.proficiency}%` : skill.category}
                  </div>
                </div>
              </AntiGravityCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Skills CTA */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="text-center">
            <Link
              href="/skills"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold transition-smooth hover:bg-accent hover:text-background focus-ring"
            >
              <span>Explore All Skills</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SkillsPreview;
