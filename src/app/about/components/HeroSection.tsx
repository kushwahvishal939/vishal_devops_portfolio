'use client';
import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggleButton } from './ThemeToggleButton';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <section
        className={`relative min-h-screen-safe flex justify-center overflow-hidden pt-32 lg:pt-24 ${className}`}
      >
        {/* Background Effects */}
        <div className="absolute top-5 right-5 z-50">
          <ThemeToggleButton />
        </div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="absolute inset-0 neural-lines"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-accent rounded-full opacity-60 animate-bounce delay-500"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 text-sm font-medium text-accent">
                  <Icon name="SparklesIcon" size={16} />
                  <span>The Cloud Infrastructure Virtuoso</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Meet</span>{' '}
                  <span className="text-gradient">Vishal Kushwah</span>
                </h1>

                <p className="text-xl sm:text-2xl text-muted-foreground font-light">
                  DevOps Engineer who doesn't just maintain systems —{' '}
                  <span className="text-accent font-medium">I revolutionize them</span>
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-card-foreground leading-relaxed">
                  I embody the perfect fusion of technical mastery and innovative problem-solving in
                  the DevOps realm. My expertise lies at the intersection of cost optimization,
                  zero-downtime reliability, and automation excellence.
                </p>
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-success">55%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-accent">40%</div>
                    <div className="text-sm text-muted-foreground">Faster Deployments</div>
                  </div>
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-warning">100%</div>
                    <div className="text-sm text-muted-foreground">Uptime Record</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold text-lg transition-smooth hover:shadow-premium-lg magnetic-hover pulse-glow">
                  <div className="flex items-center space-x-2">
                    <Icon name="RocketLaunchIcon" size={20} />
                    <span>Explore My Journey</span>
                  </div>
                </button>

                <button className="px-8 py-4 border border-accent text-accent rounded-xl font-semibold text-lg transition-smooth hover:bg-accent/10 hover:shadow-premium">
                  <div className="flex items-center space-x-2">
                    <Icon name="DocumentTextIcon" size={20} />
                    <span>Download Resume</span>
                  </div>
                </button>
              </div>
            </div>
            {/* Profile Image */}
            <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-3xl blur-2xl opacity-30 scale-110"></div>

                {/* Main Image Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden glass-card border-2 border-accent/30">
                  <AppImage
                    src="https://vishalkushwah.s3.us-east-1.amazonaws.com/8221F8A0-E13A-4AD0-B0A8-CE2114B4383D_1_105_c.jpeg"
                    // src="https://images.unsplash.com/photo-1649957079837-a76aaf21ecf2"
                    alt="Professional headshot of Vishal Kushwah, DevOps engineer with confident smile wearing dark shirt against modern tech background"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-card border border-accent/30 rounded-2xl flex items-center justify-center glass-card animate-bounce">
                  <Icon name="CloudIcon" size={24} className="text-accent" />
                </div>

                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-card border border-primary/30 rounded-2xl flex items-center justify-center glass-card animate-bounce delay-500">
                  <Icon name="CogIcon" size={24} className="text-primary" />
                </div>

                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-card border border-success/30 rounded-xl flex items-center justify-center glass-card animate-pulse">
                  <Icon name="BoltIcon" size={20} className="text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default HeroSection;
