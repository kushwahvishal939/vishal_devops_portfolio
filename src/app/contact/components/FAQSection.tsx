'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'technical';
}

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>('1');

  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'general',
      question: 'What types of DevOps projects do you handle?',
      answer:
        "I specialize in cloud migrations (AWS, Azure, GCP), CI/CD pipeline setup, infrastructure automation with Terraform, Kubernetes deployments, monitoring & observability, cost optimization, and security implementation. Whether you're a startup scaling up or an enterprise modernizing legacy systems, I can help.",
    },
    {
      id: '2',
      category: 'pricing',
      question: 'How do you structure your pricing?',
      answer:
        'I offer flexible pricing models: hourly consulting ($75-100/hour), fixed-price projects for defined scopes, and retainer agreements for ongoing support. All pricing includes documentation, knowledge transfer, and 30 days of post-project support. I provide detailed estimates after understanding your requirements.',
    },
    {
      id: '3',
      category: 'process',
      question: 'What is your typical project timeline?',
      answer:
        'Project timelines vary based on complexity: Simple CI/CD setups (1-2 weeks), Cloud migrations (2-6 weeks), Complete infrastructure overhauls (1-3 months). I provide detailed project plans with milestones and always include buffer time for testing and optimization.',
    },
    {
      id: '4',
      category: 'technical',
      question: 'Do you provide ongoing support after project completion?',
      answer:
        'Yes! Every project includes 30 days of free support, comprehensive documentation, and knowledge transfer sessions. I also offer ongoing maintenance retainers for monitoring, updates, and scaling support. My goal is to make your team self-sufficient while being available when needed.',
    },
    {
      id: '5',
      category: 'general',
      question: 'Can you work with our existing team and tools?',
      answer:
        "Absolutely! I'm experienced in collaborative environments and can integrate with your existing workflows, tools, and team processes. I adapt to your communication style, whether it's Slack, Teams, or email, and work within your preferred project management systems.",
    },
    {
      id: '6',
      category: 'technical',
      question: 'What if our project requirements change during development?',
      answer:
        'Change is normal in DevOps projects! I use agile methodologies with regular check-ins and milestone reviews. For fixed-price projects, minor changes are included. Significant scope changes are discussed transparently with updated timelines and costs before proceeding.',
    },
    {
      id: '7',
      category: 'pricing',
      question: 'Do you offer emergency support for critical issues?',
      answer:
        'Yes, I provide emergency support for critical production issues. This includes 24/7 availability for existing clients with support retainers, and emergency consulting for new clients at premium rates. Response time is typically within 2 hours for critical issues.',
    },
    {
      id: '8',
      category: 'process',
      question: 'How do you ensure security and compliance in your solutions?',
      answer:
        'Security is built into every solution from day one. I follow industry best practices including least privilege access, encryption at rest and in transit, regular security audits, and compliance with standards like SOC 2, GDPR, and HIPAA where required. All infrastructure includes monitoring and alerting for security events.',
    },
  ];

  const categories = [
    { id: 'general', name: 'General', icon: 'QuestionMarkCircleIcon' },
    { id: 'pricing', name: 'Pricing', icon: 'CurrencyDollarIcon' },
    { id: 'process', name: 'Process', icon: 'Cog6ToothIcon' },
    { id: 'technical', name: 'Technical', icon: 'CodeBracketIcon' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const filteredFAQs = faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Frequently Asked
            <span className="block text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about working with me
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth focus-ring ${
                selectedCategory === category.id
                  ? 'bg-accent text-background'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category.icon as any} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="glass-card overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors focus-ring"
              >
                <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                <Icon
                  name="ChevronDownIcon"
                  size={20}
                  className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-6 pb-4 border-t border-border/50">
                  <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Let's discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:kushwahvishal939@gmail.com"
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold transition-smooth hover:shadow-neon focus-ring magnetic-hover"
              >
                <div className="flex items-center justify-center">
                  <Icon name="EnvelopeIcon" size={20} className="mr-2" />
                  Email Me Directly
                </div>
              </a>
              <a
                href="https://calendly.com/kushwahvishal939/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-background transition-smooth focus-ring"
              >
                <div className="flex items-center justify-center">
                  <Icon name="CalendarDaysIcon" size={20} className="mr-2" />
                  Schedule a Call
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
