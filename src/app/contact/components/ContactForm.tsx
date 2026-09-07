'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'DevOps Consulting',
    'Cloud Migration',
    'CI/CD Pipeline Setup',
    'Infrastructure Automation',
    'Monitoring & Observability',
    'Cost Optimization',
    'Security Implementation',
    'Other',
  ];

  const budgetRanges = ['$50 - $100', '$100 - $200', '$300 - $500', '$1000 - $5000', '$10000+'];

  const timelineOptions = [
    'ASAP (Rush Job)',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project description is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (minimum 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 bg-[#0d0d0d] border text-[#e0e0e0] text-xs font-mono placeholder-[#333] focus:outline-none focus:border-[#f59e0b] transition-colors duration-100 ${
      errors[fieldName] ? 'border-red-500/60' : 'border-[#222]'
    }`;

  const labelClasses = 'block text-[10px] uppercase tracking-widest text-[#666] mb-2 font-mono';

  if (isSubmitted) {
    return (
      <div className={`border border-[#222] bg-[#111] p-8 text-center font-mono ${className}`}>
        <div className="w-12 h-12 border border-[#22c55e] flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={24} className="text-[#22c55e]" />
        </div>
        <h3 className="text-xl font-bold text-[#e0e0e0] mb-3">message sent successfully</h3>
        <p className="text-[#666] text-xs mb-6">
          I will review your project details and respond within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-[#f59e0b] text-[#0a0a0a] text-xs font-bold hover:bg-[#d97706] transition-colors duration-100"
        >
          send --new
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`border border-[#222] bg-[#111] font-mono ${className}`}
    >
      {/* Form header */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-[#222] bg-[#0d0d0d]">
        <span className="w-2 h-2 bg-[#f59e0b]" />
        <span className="text-[10px] uppercase tracking-widest text-[#666]">
          new_project_inquiry
        </span>
      </div>

      <div className="p-6 space-y-5">
        <ScrollReveal direction="up">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#e0e0e0] mb-1">Start Your Project</h2>
            <p className="text-[#444] text-xs">describe your DevOps challenges</p>
          </div>
        </ScrollReveal>

        {/* Name and Email */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClasses}>
                full_name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClasses('name')}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500/80 text-[10px] mt-1.5 flex items-center gap-1">
                  <span>!!</span> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClasses('email')}
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="text-red-500/80 text-[10px] mt-1.5 flex items-center gap-1">
                  <span>!!</span> {errors.email}
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Company */}
        <ScrollReveal direction="up" delay={0.15}>
          <div>
            <label htmlFor="company" className={labelClasses}>
              company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={inputClasses('company')}
              placeholder="Your Company Name"
            />
          </div>
        </ScrollReveal>

        {/* Project Type */}
        <ScrollReveal direction="up" delay={0.2}>
          <div>
            <label htmlFor="projectType" className={labelClasses}>
              project_type *
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={inputClasses('projectType')}
            >
              <option value="">-- select type --</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-red-500/80 text-[10px] mt-1.5 flex items-center gap-1">
                <span>!!</span> {errors.projectType}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Budget and Timeline */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budget" className={labelClasses}>
                budget_range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={inputClasses('budget')}
              >
                <option value="">-- select budget --</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className={labelClasses}>
                timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className={inputClasses('timeline')}
              >
                <option value="">-- select timeline --</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Message */}
        <ScrollReveal direction="up" delay={0.3}>
          <div>
            <label htmlFor="message" className={labelClasses}>
              project_description *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className={`${inputClasses('message')} resize-none`}
              placeholder="Describe your project requirements, current challenges, and what you're looking to achieve..."
            />
            {errors.message && (
              <p className="text-red-500/80 text-[10px] mt-1.5 flex items-center gap-1">
                <span>!!</span> {errors.message}
              </p>
            )}
            <p className="text-[10px] text-[#333] mt-1.5 text-right">
              {formData.message.length}/500
            </p>
          </div>
        </ScrollReveal>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#f59e0b] text-[#0a0a0a] text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] transition-colors duration-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 border-2 border-[#0a0a0a] border-t-transparent animate-spin" />
              submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Icon name="PaperAirplaneIcon" size={14} />
              submit --project-details
            </span>
          )}
        </button>

        <p className="text-[10px] text-[#333] text-center">
          your information is secure and will never be shared
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
