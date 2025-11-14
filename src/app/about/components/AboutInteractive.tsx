'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import PhilosophySection from './PhilosophySection';
import ExpertiseSection from './ExpertiseSection';
import JourneyTimeline from './JourneyTimeline';

interface AboutInteractiveProps {
  className?: string;
}

const AboutInteractive = ({ className = '' }: AboutInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen-safe bg-background">
        <div className="animate-pulse">
          <div className="h-screen bg-muted/20"></div>
          <div className="h-96 bg-muted/10"></div>
          <div className="h-96 bg-muted/20"></div>
          <div className="h-96 bg-muted/10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen-safe bg-background ${className}`}>
      <HeroSection />
      <PhilosophySection />
      <ExpertiseSection />
      <JourneyTimeline />
    </div>
  );
};

export default AboutInteractive;