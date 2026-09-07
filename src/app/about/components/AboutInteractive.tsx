'use client';

import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/animations/PageTransition';
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
      <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
        <div className="h-screen" />
        <div className="h-96" />
        <div className="h-96" />
        <div className="h-96" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className={`min-h-screen ${className}`} style={{ background: '#0a0a0a' }}>
        <HeroSection />
        <PhilosophySection />
        <ExpertiseSection />
        <JourneyTimeline />
      </div>
    </PageTransition>
  );
};

export default AboutInteractive;
