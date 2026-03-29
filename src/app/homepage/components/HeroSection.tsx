'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import FloatingParticles from '@/components/animations/FloatingParticles';
import MagneticButton from '@/components/animations/MagneticButton';
import TiltCard from '@/components/animations/TiltCard';
import StaggeredReveal from '@/components/animations/StaggeredReveal';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const achievements = [
    { metric: '₹1.5L → ₹65K', label: 'Monthly Cost Reduction', icon: 'CurrencyRupeeIcon' },
    { metric: '40%', label: 'Deployment Time Reduction', icon: 'RocketLaunchIcon' },
    { metric: '100%', label: 'Uptime Achievement', icon: 'ShieldCheckIcon' },
  ];

  const floatingLogos = [
    { name: 'Kubernetes', icon: 'CubeIcon', delay: 0 },
    { name: 'Docker', icon: 'ServerIcon', delay: 0.5 },
    { name: 'AWS', icon: 'CloudIcon', delay: 1 },
    { name: 'Jenkins', icon: 'CogIcon', delay: 1.5 },
    { name: 'Terraform', icon: 'CommandLineIcon', delay: 2 },
    { name: 'Ansible', icon: 'WrenchScrewdriverIcon', delay: 2.5 },
  ];

  return (
    <section className={`relative min-h-screen-safe bg-background overflow-hidden ${className}`}>
      {/* Particle Background */}
      <FloatingParticles className="z-0" />

      {/* Floating DevOps Logos */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {floatingLogos.map((logo, index) => (
          <motion.div
            key={logo.name}
            className="absolute"
            style={{
              top: `${20 + index * 12}%`,
              left: `${10 + index * 15}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { delay: logo.delay, duration: 0.5 },
              scale: { delay: logo.delay, duration: 0.5, type: 'spring' },
              y: {
                delay: logo.delay + 0.5,
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/30">
              <Icon name={logo.icon as any} size={24} className="text-accent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Pipeline Animation */}
      <div className="absolute top-1/4 right-10 hidden lg:block z-[1]">
        <div className="relative w-64 h-64">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-4 left-4 w-4 h-4 bg-accent rounded-full pulse-glow"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 bg-primary rounded-full pulse-glow"></div>
          </motion.div>
          <motion.div
            className="absolute inset-4 rounded-full border border-primary/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Icon name="CubeIcon" size={16} className="text-background" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center min-h-screen-safe px-4 sm:px-6 lg:px-8 pt-32 lg:pt-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Professional Avatar */}
          <ScrollReveal direction="up" delay={0}>
            <MagneticButton className="inline-block">
              <div className="relative mb-8 mt-12">
                <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto relative">
                  <div className="absolute inset-0 bg-[#00F5FF]/20 rounded-full animate-levitate blur-md"></div>
                  <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center neon-glow">
                      <span className="text-2xl lg:text-4xl font-bold text-background font-mono">
                        VK
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </MagneticButton>
          </ScrollReveal>

          {/* Hero Typography */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-12 flex flex-col items-center">
              <StaggeredReveal
                text="Vishal Kushwah"
                className="text-5xl sm:text-6xl lg:text-8xl font-bold text-gradient-cyan mb-4 font-primary"
                delay={2}
              />
              <motion.div
                className="text-lg sm:text-xl lg:text-2xl text-accent font-semibold mb-4"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              >
                DevOps Engineer
              </motion.div>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The Cloud Infrastructure Virtuoso who transforms complex cloud chaos into elegant,
                automated solutions. I don&apos;t just maintain infrastructure — I revolutionize it.
              </p>
            </div>
          </ScrollReveal>

          {/* Achievement Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <ScrollReveal key={achievement.label} direction="up" delay={0.2 + index * 0.15}>
                <TiltCard className="p-6 text-center group glass-card">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center border border-[#CCFF00]/30 transition-transform group-hover:scale-110">
                      <Icon name={achievement.icon as any} size={24} className="text-[#CCFF00]" />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-accent mb-2">
                    {achievement.metric}
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">{achievement.label}</div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-[#00F5FF] text-black rounded-lg font-bold text-lg transition-smooth hover:neon-glow-cyan focus-ring inline-block"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="RocketLaunchIcon" size={20} />
                    <span>Hire Me</span>
                  </div>
                </Link>
              </MagneticButton>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold text-lg transition-smooth hover:bg-accent hover:text-background focus-ring inline-block"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="FolderOpenIcon" size={20} />
                  <span>View Portfolio</span>
                </div>
              </Link>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon name="ChevronDownIcon" size={32} className="text-accent mx-auto" />
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
