'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface ContactCTAProps {
  className?: string;
}

const ContactCTA = ({ className = '' }: ContactCTAProps) => {
  const contactMethods = [
    {
      name: 'Email',
      value: 'kushwahvishal939@gmail.com',
      icon: 'EnvelopeIcon',
      href: 'mailto:kushwahvishal939@gmail.com',
      description: 'Drop me a line',
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/vishalkushwah939',
      icon: 'UserIcon',
      href: 'https://www.linkedin.com/in/vishalkushwah939',
      description: "Let's connect",
    },
    {
      name: 'Phone',
      value: '+91 8357862782',
      icon: 'PhoneIcon',
      href: 'tel:+918357862782',
      description: 'Call me directly',
    },
  ];

  return (
    <section
      className={`py-20 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
            Ready to Transform Your Infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help optimize your cloud infrastructure, reduce costs, and
            accelerate your DevOps journey with proven expertise.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-smooth hover:shadow-premium-lg magnetic-hover pulse-glow focus-ring"
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
                <span>Start Conversation</span>
              </div>
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold text-lg transition-smooth hover:bg-accent hover:text-background magnetic-hover focus-ring">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="DocumentArrowDownIcon" size={20} />
                <span>Download Resume</span>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={method.name}
              href={method.href}
              className="glass-card p-6 text-center transform-3d hover:scale-105 transition-smooth group focus-ring"
              style={{ animationDelay: `${index * 0.1}s` }}
              target={method.name === 'LinkedIn' ? '_blank' : undefined}
              rel={method.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:neon-glow transition-smooth">
                <Icon name={method.icon as any} size={24} className="text-background" />
              </div>

              {/* Method Name */}
              <h3 className="font-semibold text-foreground mb-2">{method.name}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>

              {/* Contact Value */}
              <p className="text-accent font-medium text-sm group-hover:text-accent transition-smooth">
                {method.value}
              </p>
            </a>
          ))}
        </div>

        {/* Availability Status */}
        <div className="mt-12 flex items-center justify-center space-x-3">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            Available for new opportunities • Response within 24 hours
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
