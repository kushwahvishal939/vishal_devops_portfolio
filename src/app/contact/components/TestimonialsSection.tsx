import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  testimonial: string;
  projectType: string;
  results: string;
}

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'TechFlow Solutions',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_129b1ff05-1762273604073.png',
      alt: 'Professional Asian woman with shoulder-length black hair in navy blazer smiling confidently',
      rating: 5,
      testimonial: `Vishal transformed our entire deployment process. What used to take 4 hours now takes 15 minutes. His expertise in Kubernetes and CI/CD automation saved us both time and money. The infrastructure he built has been rock-solid for 8 months now.`,
      projectType: 'CI/CD Pipeline & Kubernetes Migration',
      results: '75% faster deployments, ₹2.5L monthly savings',
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      role: 'Engineering Manager',
      company: 'CloudScale Inc',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_146fb5593-1762274292741.png',
      alt: 'Hispanic man with short dark hair and beard in white dress shirt smiling professionally',
      rating: 5,
      testimonial: `Working with Vishal was a game-changer for our startup. He migrated our entire infrastructure to AWS, set up monitoring, and implemented cost optimization strategies. His proactive approach and deep knowledge made the complex simple.`,
      projectType: 'AWS Cloud Migration & Cost Optimization',
      results: '60% cost reduction, 99.9% uptime achieved',
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'DevOps Lead',
      company: 'InnovateTech',
      image: 'https://images.unsplash.com/photo-1636393913936-187da0a372e3',
      alt: 'Caucasian woman with blonde hair in professional gray suit jacket with confident expression',
      rating: 5,
      testimonial: `Vishal's monitoring and alerting setup caught critical issues before they became outages. His Terraform modules are clean, well-documented, and reusable. He's the kind of DevOps engineer every team needs.`,
      projectType: 'Infrastructure as Code & Monitoring',
      results: 'Zero unplanned downtime, 50% faster incident response',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        size={16}
        variant={index < rating ? 'solid' : 'outline'}
        className={index < rating ? 'text-warning' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Clients Say About
            <span className="block text-gradient">Working With Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real projects. See how I've helped teams achieve their DevOps goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-6 hover:shadow-premium-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
                    <Icon name="CheckIcon" size={12} className="text-background" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-accent">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
                <span className="text-sm text-muted-foreground ml-2">{testimonial.rating}.0</span>
              </div>

              {/* Testimonial */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Project Details */}
              <div className="border-t border-border pt-4 space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="CogIcon" size={14} className="text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">PROJECT TYPE</span>
                  </div>
                  <p className="text-sm font-medium">{testimonial.projectType}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="ChartBarIcon" size={14} className="text-success" />
                    <span className="text-xs font-medium text-muted-foreground">RESULTS</span>
                  </div>
                  <p className="text-sm font-medium text-success">{testimonial.results}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Trusted by Teams Worldwide</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Average Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">24h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
