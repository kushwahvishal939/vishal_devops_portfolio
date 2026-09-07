'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

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
    { id: 'general', name: 'general', icon: 'QuestionMarkCircleIcon' },
    { id: 'pricing', name: 'pricing', icon: 'CurrencyDollarIcon' },
    { id: 'process', name: 'process', icon: 'Cog6ToothIcon' },
    { id: 'technical', name: 'technical', icon: 'CodeBracketIcon' },
  ];

  const filteredFAQs = faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e0e0e0] mb-3">
              Frequently Asked
              <span className="block text-[#f59e0b]">Questions</span>
            </h2>
            <p className="text-[#666] text-sm">everything you need to know about working with me</p>
          </div>
        </ScrollReveal>

        {/* Category tabs */}
        <div className="flex border border-[#222] bg-[#0d0d0d] mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] uppercase tracking-wider transition-colors duration-100 ${
                selectedCategory === category.id
                  ? 'bg-[#f59e0b] text-[#0a0a0a]'
                  : 'text-[#666] hover:text-[#e0e0e0] hover:bg-[#111]'
              }`}
            >
              <Icon name={category.icon as any} size={12} />
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-px bg-[#222]">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-[#111]">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#161616] transition-colors duration-100"
                aria-expanded={openFAQ === faq.id}
              >
                <div className="flex items-start gap-3 pr-4">
                  <span className="text-[#f59e0b] text-xs mt-0.5 shrink-0">
                    {openFAQ === faq.id ? '[-]' : '[+]'}
                  </span>
                  <h3 className="text-xs font-bold text-[#e0e0e0]">{faq.question}</h3>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 border-t border-[#1a1a1a]">
                      <p className="text-[#666] text-[11px] leading-relaxed pt-4 pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-12 border border-[#222] bg-[#111]">
            <div className="flex items-center gap-2 px-6 py-3 border-b border-[#222] bg-[#0d0d0d]">
              <span className="w-2 h-2 bg-[#f59e0b]" />
              <span className="text-[10px] uppercase tracking-widest text-[#666]">
                need_more_help
              </span>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-base font-bold text-[#e0e0e0] mb-2">Still Have Questions?</h3>
              <p className="text-[#666] text-xs mb-6">let us discuss your specific needs</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:kushwahvishal939@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f59e0b] text-[#0a0a0a] text-xs font-bold hover:bg-[#d97706] transition-colors duration-100"
                >
                  <Icon name="EnvelopeIcon" size={14} />
                  email --direct
                </a>
                <a
                  href="https://calendly.com/kushwahvishal939/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[#f59e0b] text-[#f59e0b] text-xs font-bold hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors duration-100"
                >
                  <Icon name="CalendarDaysIcon" size={14} />
                  schedule --call
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
