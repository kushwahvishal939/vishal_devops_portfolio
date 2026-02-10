'use client';

import React from 'react';
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
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Hero Command Center */}
      <HeroSection />

      {/* Skills Laboratory Preview */}
      <SkillsPreview />

      {/* Experience Timeline Portal */}
      <ExperienceTimeline />

      {/* Project Showcase Arena */}
      <FeaturedProjects />

      {/* Contact & Collaboration Zone */}
      <ContactCTA />
    </div>
  );
};

export default HomepageInteractive;
