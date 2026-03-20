'use client';

import React from 'react';
import PageTransition from '@/components/animations/PageTransition';
import HeroSection from './HeroSection';
import SkillsPreview from './SkillsPreview';
import ExperienceTimeline from './ExperienceTimeline';
import FeaturedProjects from './FeaturedProjects';
import ContactCTA from './ContactCTA';

interface HomepageInteractiveProps {
  className?: string;
}

const HomepageInteractive = ({ className = '' }: HomepageInteractiveProps) => {
  return (
    <PageTransition>
      <div className={`min-h-screen bg-background ${className}`}>
        <HeroSection />
        <SkillsPreview />
        <ExperienceTimeline />
        <FeaturedProjects />
        <ContactCTA />
      </div>
    </PageTransition>
  );
};

export default HomepageInteractive;
