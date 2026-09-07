'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  href: string;
  availability: string;
  responseTime: string;
}

interface ContactMethodsProps {
  className?: string;
}

const ContactMethods = ({ className = '' }: ContactMethodsProps) => {
  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      title: 'Email Discussion',
      description: 'Perfect for detailed project requirements and technical discussions',
      icon: 'EnvelopeIcon',
      action: 'Send Email',
      href: 'mailto:kushwahvishal939@gmail.com',
      availability: 'Always Available',
      responseTime: '< 24 hours',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Connect',
      description: 'Professional networking and quick project inquiries',
      icon: 'UserGroupIcon',
      action: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/kushwahvishal939',
      availability: 'Business Hours',
      responseTime: '< 12 hours',
    },
    {
      id: 'phone',
      title: 'Phone Consultation',
      description: 'Direct conversation for urgent projects and complex requirements',
      icon: 'PhoneIcon',
      action: 'Schedule Call',
      href: 'tel:+919876543210',
      availability: 'Mon-Fri 9AM-6PM IST',
      responseTime: 'Immediate',
    },
    {
      id: 'calendar',
      title: 'Video Meeting',
      description: 'Screen sharing sessions for architecture reviews and planning',
      icon: 'VideoCameraIcon',
      action: 'Book Meeting',
      href: 'https://calendly.com/kushwahvishal939/30min',
      availability: 'Flexible Scheduling',
      responseTime: 'Same Day',
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e0e0e0] mb-3">
              Choose Your Preferred
              <span className="block text-[#f59e0b]">Communication Channel</span>
            </h2>
            <p className="text-[#666] text-sm max-w-xl mx-auto">
              Multiple ways to connect based on your project urgency and communication style
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.id} direction="up" delay={index * 0.08}>
              <Link
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block bg-[#111] p-6 hover:bg-[#161616] transition-colors duration-150 group h-full"
              >
                {/* Icon */}
                <div className="w-10 h-10 border border-[#222] flex items-center justify-center mb-4 group-hover:border-[#f59e0b] transition-colors duration-150">
                  <Icon
                    name={method.icon as any}
                    size={20}
                    className="text-[#666] group-hover:text-[#f59e0b] transition-colors duration-150"
                  />
                </div>

                {/* Content */}
                <h3 className="text-sm font-bold text-[#e0e0e0] mb-2 group-hover:text-[#f59e0b] transition-colors duration-150">
                  {method.title}
                </h3>
                <p className="text-[#666] text-[11px] leading-relaxed mb-4">{method.description}</p>

                {/* Meta */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-[#22c55e]">[on]</span>
                    <span className="text-[#666]">{method.availability}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-[#f59e0b]">&gt;&gt;</span>
                    <span className="text-[#444]">{method.responseTime}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="py-2 border border-[#222] text-center text-[11px] text-[#666] group-hover:border-[#f59e0b] group-hover:text-[#f59e0b] transition-colors duration-150">
                  {method.action}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Location info */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-12 border border-[#222] bg-[#111]">
            <div className="flex items-center gap-2 px-6 py-3 border-b border-[#222] bg-[#0d0d0d]">
              <span className="w-2 h-2 bg-[#f59e0b]" />
              <span className="text-[10px] uppercase tracking-widest text-[#666]">
                location_and_availability
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222]">
              <div className="bg-[#111] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="MapPinIcon" size={14} className="text-[#f59e0b]" />
                  <span className="text-xs font-bold text-[#e0e0e0]">Based in India</span>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  Serving global clients with competitive rates and quality delivery
                </p>
              </div>
              <div className="bg-[#111] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="GlobeAltIcon" size={14} className="text-[#f59e0b]" />
                  <span className="text-xs font-bold text-[#e0e0e0]">Remote Ready</span>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  Experienced in distributed teams and async collaboration
                </p>
              </div>
              <div className="bg-[#111] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="CalendarDaysIcon" size={14} className="text-[#f59e0b]" />
                  <span className="text-xs font-bold text-[#e0e0e0]">Flexible Hours</span>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">
                  Available across time zones for urgent project needs
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactMethods;
