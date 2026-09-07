'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

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
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/vishalkushwah939',
      icon: 'UserIcon',
      href: 'https://www.linkedin.com/in/vishalkushwah939',
    },
    {
      name: 'Phone',
      value: '+91 8357862782',
      icon: 'PhoneIcon',
      href: 'tel:+918357862782',
    },
  ];

  return (
    <section className={`py-20 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-10">
            <p className="text-[#666] font-mono text-xs uppercase tracking-wider mb-2">
              <span className="text-[#f59e0b]">$</span> ./contact --init
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#e0e0e0] font-mono">
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="text-sm text-[#666] font-mono mt-3 max-w-2xl">
              Let&apos;s discuss how I can help optimize your cloud infrastructure, reduce costs,
              and accelerate your DevOps journey with proven expertise.
            </p>
            <div className="h-px bg-[#222] mt-6" />
          </div>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#f59e0b] text-[#0a0a0a] font-mono font-bold text-sm tracking-wide hover:bg-[#d97706] transition-colors duration-150 inline-flex items-center gap-2"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={16} />
              <span>START_CONVERSATION</span>
            </Link>
            <button className="px-6 py-3 border border-[#f59e0b] text-[#f59e0b] font-mono font-bold text-sm tracking-wide hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-150 inline-flex items-center gap-2">
              <Icon name="DocumentArrowDownIcon" size={16} />
              <span>DOWNLOAD_RESUME</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222]">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.name} direction="up" delay={0.15 + index * 0.08}>
              <a
                href={method.href}
                target={method.name === 'LinkedIn' ? '_blank' : undefined}
                rel={method.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                className={`block p-5 bg-[#111] hover:bg-[#1a1a1a] transition-colors duration-150 ${
                  index < contactMethods.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-[#222]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={method.icon as any} size={16} className="text-[#f59e0b]" />
                  <span className="text-sm font-bold text-[#e0e0e0] font-mono">{method.name}</span>
                </div>
                <p className="text-xs text-[#f59e0b] font-mono break-all">{method.value}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Availability Status */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-8 flex items-center gap-2 font-mono text-xs text-[#666]">
            <span className="w-2 h-2 bg-[#22c55e]" />
            <span>status: available // response within 24 hours</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactCTA;
