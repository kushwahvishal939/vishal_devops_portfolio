import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PhilosophyItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface PhilosophySectionProps {
  className?: string;
}

const PhilosophySection = ({ className = '' }: PhilosophySectionProps) => {
  const philosophyItems: PhilosophyItem[] = [
    {
      icon: 'LightBulbIcon',
      title: 'Innovation Through Automation',
      description:
        'I believe in transforming manual processes into intelligent, self-healing systems that anticipate problems before they occur.',
      color: 'text-accent',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Reliability as Foundation',
      description:
        "Zero downtime isn't luck—it's engineering. Every system I design prioritizes bulletproof reliability and graceful failure handling.",
      color: 'text-success',
    },
    {
      icon: 'ChartBarIcon',
      title: 'Cost-Conscious Excellence',
      description:
        "Optimization isn't just about performance—it's about delivering maximum value while minimizing resource waste and operational costs.",
      color: 'text-warning',
    },
    {
      icon: 'UsersIcon',
      title: 'Collaborative Leadership',
      description:
        'The best infrastructure solutions emerge from cross-functional collaboration, knowledge sharing, and empowering team growth.',
      color: 'text-primary',
    },
  ];

  return (
    <section className={`py-20 lg:py-32 relative ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 text-sm font-medium text-primary mb-6">
            <Icon name="HeartIcon" size={16} />
            <span>My Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">The DevOps</span>{' '}
            <span className="text-gradient">Mindset</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            My approach to DevOps goes beyond tools and technologies—it's about creating
            sustainable, scalable solutions that empower teams and drive business success.
          </p>
        </div>

        {/* Philosophy Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {philosophyItems.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 glass-card rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-premium-lg"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-card to-muted rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={item.icon as any}
                    size={28}
                    className={`${item.color} group-hover:drop-shadow-lg`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 lg:p-12 glass-card rounded-3xl border border-accent/20">
            <Icon
              name="ChatBubbleLeftRightIcon"
              size={48}
              className="text-accent mx-auto mb-6 opacity-60"
            />

            <blockquote className="text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-6">
              "I don't just maintain infrastructure—I revolutionize it. Every challenge is an
              opportunity to create something more elegant, more efficient, and more reliable than
              before."
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="text-accent font-semibold">Vishal Kushwah</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
