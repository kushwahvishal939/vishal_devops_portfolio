'use client';

import React, { useEffect, useState } from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactMethods from './ContactMethods';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';

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
      <div className={`min-h-screen-safe bg-background ${className}`}>
        <div className="pt-20">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-96 bg-muted/20 mb-8"></div>
            <div className="max-w-4xl mx-auto px-4 space-y-8">
              <div className="h-64 bg-muted/20 rounded-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-muted/20 rounded-lg"></div>
                <div className="h-32 bg-muted/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen-safe bg-background ${className}`}>
      <div className="pt-20">
        {/* Hero Section */}
        <ContactHero />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Methods - Takes 1 column */}
            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:kushwahvishal939@gmail.com"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-accent text-sm">@</span>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">kushwahvishal939@gmail.com</div>
                    </div>
                  </a>
                  
                  <a
                    href="tel:+919876543210"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary text-sm">📞</span>
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">+918357862782</div>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/vishal-kushwah-devops"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <span className="text-success text-sm">in</span>
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">Professional Network</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability Status */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">Current Availability</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-success font-medium">Available for New Projects</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Next available start date: December 2024</p>
                    <p>• Response time: &lt; 24 hours</p>
                    <p>• Consultation calls: Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods Section */}
        <ContactMethods />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

export default ContactInteractive;
