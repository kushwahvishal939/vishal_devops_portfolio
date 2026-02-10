import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Choose Your Preferred
            <span className="block text-gradient">Communication Channel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multiple ways to connect based on your project urgency and communication style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <Link
              key={method.id}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group glass-card p-6 hover:shadow-premium-lg transition-all duration-300 magnetic-hover focus-ring"
            >
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    name={method.icon as any}
                    size={32}
                    className="text-accent group-hover:text-primary transition-colors duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {method.description}
                </p>

                {/* Availability Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center text-xs">
                    <Icon name="ClockIcon" size={14} className="text-success mr-1" />
                    <span className="text-success">{method.availability}</span>
                  </div>
                  <div className="flex items-center justify-center text-xs">
                    <Icon name="BoltIcon" size={14} className="text-warning mr-1" />
                    <span className="text-muted-foreground">Response: {method.responseTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm font-medium group-hover:bg-accent group-hover:text-background transition-all duration-300">
                  {method.action}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Location & Availability</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="MapPinIcon" size={24} className="text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Based in India</h4>
                <p className="text-sm text-muted-foreground">
                  Serving global clients with competitive rates and quality delivery
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="GlobeAltIcon" size={24} className="text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Remote Ready</h4>
                <p className="text-sm text-muted-foreground">
                  Experienced in distributed teams and async collaboration
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="CalendarDaysIcon" size={24} className="text-success" />
                </div>
                <h4 className="font-semibold mb-2">Flexible Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Available across time zones for urgent project needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
