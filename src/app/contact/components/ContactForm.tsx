'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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
    message: ''
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
    'Other'
  ];

  const budgetRanges = [
    '$50 - $100',
    '$100 - $200',
    '$300 - $500',
    '$1000 - $5000',
    '$10000+'
  ];

  const timelineOptions = [
    'ASAP (Rush Job)',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    '3-6 months',
    '6+ months'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`glass-card p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={32} className="text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out! I'll review your project details and get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold transition-smooth hover:shadow-neon focus-ring"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`glass-card p-8 space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Start Your Project</h2>
        <p className="text-muted-foreground">
          Tell me about your DevOps challenges and let's discuss how I can help
        </p>
      </div>

      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-input border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth ${
              errors.name ? 'border-error' : 'border-border'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-input border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth ${
              errors.email ? 'border-error' : 'border-border'
            }`}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-error text-sm mt-1 flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company / Organization
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
          placeholder="Your Company Name"
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
          Project Type *
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-input border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth ${
            errors.projectType ? 'border-error' : 'border-border'
          }`}
        >
          <option value="">Select a project type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.projectType && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Budget and Timeline Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Project Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
          >
            <option value="">Select budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
          >
            <option value="">Select timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-input border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth resize-none ${
            errors.message ? 'border-error' : 'border-border'
          }`}
          placeholder="Describe your project requirements, current challenges, and what you're looking to achieve..."
        />
        {errors.message && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
            {errors.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formData.message.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-smooth hover:shadow-neon focus-ring disabled:opacity-50 disabled:cursor-not-allowed magnetic-hover"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending Message...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Icon name="PaperAirplaneIcon" size={20} className="mr-2" />
            Send Project Details
          </div>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to receive project-related communications. 
        Your information is secure and will never be shared.
      </p>
    </form>
  );
};

export default ContactForm;
