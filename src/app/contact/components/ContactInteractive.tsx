'use client';

import React, { useEffect, useState } from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactMethods from './ContactMethods';
import FAQSection from './FAQSection';
import Icon from '@/components/ui/AppIcon';

interface ContactInteractiveProps {
  className?: string;
}

const ContactInteractive = ({ className = '' }: ContactInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className={`min-h-screen bg-[#0a0a0a] ${className}`}>
        <div className="pt-20">
          <div className="animate-pulse font-mono">
            <div className="h-72 bg-[#111] border-b border-[#222]" />
            <div className="max-w-4xl mx-auto px-4 space-y-4 mt-8">
              <div className="h-64 bg-[#111] border border-[#222]" />
              <div className="grid grid-cols-2 gap-px bg-[#222]">
                <div className="h-32 bg-[#111]" />
                <div className="h-32 bg-[#111]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0a] ${className}`}>
      <div className="pt-20">
        {/* Hero */}
        <ContactHero />

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-4 font-mono">
              {/* Quick contact */}
              <div className="border border-[#222] bg-[#111]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#222] bg-[#0d0d0d]">
                  <span className="w-2 h-2 bg-[#f59e0b]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#666]">
                    quick_contact
                  </span>
                </div>
                <div className="divide-y divide-[#1a1a1a]">
                  <a
                    href="mailto:kushwahvishal939@gmail.com"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#161616] transition-colors duration-100"
                  >
                    <span className="text-[#f59e0b] text-xs">@</span>
                    <div>
                      <div className="text-xs text-[#e0e0e0]">Email</div>
                      <div className="text-[10px] text-[#444]">kushwahvishal939@gmail.com</div>
                    </div>
                  </a>
                  <a
                    href="tel:+918357862782"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#161616] transition-colors duration-100"
                  >
                    <Icon name="PhoneIcon" size={12} className="text-[#f59e0b]" />
                    <div>
                      <div className="text-xs text-[#e0e0e0]">Phone</div>
                      <div className="text-[10px] text-[#444]">+918357862782</div>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/vishal-kushwah-devops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#161616] transition-colors duration-100"
                  >
                    <span className="text-[#f59e0b] text-xs font-bold">in</span>
                    <div>
                      <div className="text-xs text-[#e0e0e0]">LinkedIn</div>
                      <div className="text-[10px] text-[#444]">Professional Network</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="border border-[#222] bg-[#111]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#222] bg-[#0d0d0d]">
                  <span className="w-2 h-2 bg-[#22c55e] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-[#666]">
                    availability
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#22c55e] text-xs font-bold">[OPEN]</span>
                    <span className="text-[#22c55e] text-xs">Available for New Projects</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#666]">
                    <p>
                      <span className="text-[#444]">next_start:</span> December 2024
                    </p>
                    <p>
                      <span className="text-[#444]">response:</span> &lt; 24 hours
                    </p>
                    <p>
                      <span className="text-[#444]">hours:</span> Mon-Fri 9AM-6PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <ContactMethods />

        {/* FAQ */}
        <FAQSection />
      </div>
    </div>
  );
};

export default ContactInteractive;
