'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { metric: '₹1.5L → ₹65K', label: 'Monthly Cost Reduction', icon: 'CurrencyRupeeIcon' },
    { metric: '40%', label: 'Deployment Time Reduction', icon: 'RocketLaunchIcon' },
    { metric: '100%', label: 'Uptime Achievement', icon: 'ShieldCheckIcon' }
  ];

  const floatingLogos = [
    { name: 'Kubernetes', icon: 'CubeIcon', delay: '0s' },
    { name: 'Docker', icon: 'ServerIcon', delay: '1s' },
    { name: 'AWS', icon: 'CloudIcon', delay: '2s' },
    { name: 'Jenkins', icon: 'CogIcon', delay: '3s' },
    { name: 'Terraform', icon: 'CommandLineIcon', delay: '4s' },
    { name: 'Ansible', icon: 'WrenchScrewdriverIcon', delay: '5s' }
  ];
  return (
    <section className={`relative min-h-screen-safe bg-background overflow-hidden ${className}`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 neural-lines"></div>
      
      {/* Floating DevOps Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingLogos.map((logo, index) => (
          <div
            key={logo.name}
            className="absolute animate-pulse"
            style={{
              top: `${20 + (index * 12)}%`,
              left: `${10 + (index * 15)}%`,
              animationDelay: logo.delay,
              animationDuration: '3s'
            }}
          >
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/30 transform-3d hover:scale-110 transition-smooth">
              <Icon name={logo.icon as any} size={24} className="text-accent" />
            </div>
          </div>
        ))}
      </div>

      {/* 3D Pipeline Animation */}
      <div className="absolute top-1/4 right-10 hidden lg:block">
        <div className="relative w-64 h-64 transform-3d">
          <div className={`absolute inset-0 rounded-full border-2 border-accent/50 ${currentAnimation === 0 ? 'animate-spin' : ''}`}>
            <div className="absolute top-4 left-4 w-4 h-4 bg-accent rounded-full pulse-glow"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-primary rounded-full pulse-glow"></div>
          </div>
          <div className={`absolute inset-4 rounded-full border border-primary/30 ${currentAnimation === 1 ? 'animate-pulse' : ''}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Icon name="CubeIcon" size={16} className="text-background" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center min-h-screen-safe px-4 sm:px-6 lg:px-8 pt-32 lg:pt-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Professional Avatar */}
          <div className="relative mb-8 mt-12">
            <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center neon-glow">
                  <span className="text-2xl lg:text-4xl font-bold text-background font-mono">VK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gradient mb-4 font-primary">
              Vishal Kushwah
            </h1>
            <div className="text-lg sm:text-xl lg:text-2xl text-accent font-semibold mb-4">
              DevOps Engineer
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The Cloud Infrastructure Virtuoso who transforms complex cloud chaos into elegant, automated solutions. 
              I don't just maintain infrastructure — I revolutionize it.
            </p>
          </div>

          {/* Achievement Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className="glass-card p-6 text-center transform-3d hover:scale-105 transition-smooth"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Icon name={achievement.icon as any} size={24} className="text-background" />
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">
                  {achievement.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-smooth hover:shadow-premium-lg magnetic-hover pulse-glow focus-ring"
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RocketLaunchIcon" size={20} />
                <span>Hire Me</span>
              </div>
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold text-lg transition-smooth hover:bg-accent hover:text-background magnetic-hover focus-ring"
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="FolderOpenIcon" size={20} />
                <span>View Portfolio</span>
              </div>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <Icon name="ChevronDownIcon" size={32} className="text-accent mx-auto" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
