'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'experience' | 'education' | 'certification';
  icon: string;
}

interface JourneyTimelineProps {
  className?: string;
}

const JourneyTimeline = ({ className = '' }: JourneyTimelineProps) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2024",
      title: "DevOps Enginer",
      company: "XGrowth LLC",
      description: "Leading cloud transformation initiatives and implementing enterprise-scale DevOps practices.",
      achievements: [
        "Designed multi-region disaster recovery",
        "Reduced infrastructure costs by ₹1.5L to ₹65K monthly",
        "Implemented zero-downtime deployment strategies",
        "Led team of 8 engineers across multiple projects"
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Prometheus"],
      type: "experience",
      icon: "BriefcaseIcon"
    },
    // {
    //   year: "2023",
    //   title: "Microsoft Azure DevOps Expert",
    //   company: "Microsoft Certification",
    //   description: "Achieved AZ-400 certification demonstrating expertise in Azure DevOps solutions and practices.",
    //   achievements: [
    //     "Scored 95% on certification exam",
    //     "Specialized in Azure Pipeline optimization",
    //     "Recognized as Azure Community Contributor"
    //   ],
    //   technologies: ["Azure DevOps", "Azure Cloud", "ARM Templates", "PowerShell"],
    //   type: "certification",
    //   icon: "AcademicCapIcon"
    // },
    // {
    //   year: "2022",
    //   title: "DevOps Engineer",
    //   company: "CloudTech Innovations",
    //   description: "Designed and implemented CI/CD pipelines, automated infrastructure provisioning, and monitoring solutions.",
    //   achievements: [
    //     "Improved deployment frequency by 300%",
    //     "Reduced mean time to recovery by 60%",
    //     "Automated 90% of manual deployment processes"
    //   ],
    //   technologies: ["Docker", "GitLab CI", "Ansible", "ELK Stack", "Grafana"],
    //   type: "experience",
    //   icon: "CogIcon"
    // },
    {
      year: "2023",
      title: "Monitoring & Observability Engineer",
      company: "BlinkHealth",
      description: "Built scalable cloud infrastructure from ground up, focusing on cost optimization and security best practices.",
      achievements: [
        "Designed multi-region disaster recovery",
        "Implemented Infrastructure as Code practices",
        "Achieved SOC 2 compliance certification"
      ],
      technologies: ["AWS", "Grafana", "Icinga", "EC2 Instancea"],
      type: "experience",
      icon: "CloudIcon"
    },
    {
      year: "2020",
      title: "B.Tech Civil",
      company: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
      description: "Graduated with honors, specializing in distributed systems and other cloud computing architectures.",
      achievements: [
        "CGPA: 7.1/10",
        "Published research on container orchestration",
        "Led university DevOps club for 2 years"
      ],
      technologies: ["Python", "Linux", "Networking", "Database Systems", "Cloud Computing", "DevOps"],
      type: "education",
      icon: "AcademicCapIcon"
    }
  ];

  const getTypeColor = (type: string) => {
    const colorMap = {
      experience: 'accent',
      education: 'primary',
      certification: 'success'
    };
    return colorMap[type as keyof typeof colorMap] || 'accent';
  };

  const getTypeIcon = (type: string) => {
    const iconMap = {
      experience: 'BriefcaseIcon',
      education: 'AcademicCapIcon',
      certification: 'ShieldCheckIcon'
    };
    return iconMap[type as keyof typeof iconMap] || 'BriefcaseIcon';
  };

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <section className={`py-20 lg:py-32 relative ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2 text-sm font-medium text-warning mb-6">
            <Icon name="ClockIcon" size={16} />
            <span>Career Journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">My</span>{' '}
            <span className="text-gradient">Professional Path</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A journey of continuous learning, innovation, and delivering measurable impact 
            in the ever-evolving world of DevOps and cloud technologies.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-success"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start space-x-6">
                {/* Timeline Dot */}
                <div className={`relative z-10 w-16 h-16 bg-card border-2 border-${getTypeColor(event.type)} rounded-2xl flex items-center justify-center glass-card`}>
                  <Icon 
                    name={event.icon as any} 
                    size={24} 
                    className={`text-${getTypeColor(event.type)}`} 
                  />
                </div>
                
                {/* Content Card */}
                <div className="flex-1 pb-8">
                  <div 
                    className="group p-6 glass-card rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
                    onClick={() => toggleExpanded(index)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 bg-${getTypeColor(event.type)}/10 border border-${getTypeColor(event.type)}/30 rounded-full text-xs font-medium text-${getTypeColor(event.type)}`}>
                            {event.year}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {event.type}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                          {event.title}
                        </h3>
                        
                        <p className="text-primary font-medium">
                          {event.company}
                        </p>
                      </div>
                      
                      <Icon 
                        name={expandedItem === index ? "ChevronUpIcon" : "ChevronDownIcon"} 
                        size={20} 
                        className="text-muted-foreground group-hover:text-accent transition-colors duration-300" 
                      />
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {event.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {event.technologies.slice(0, 5).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-muted/30 border border-border rounded text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {event.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs text-accent">
                          +{event.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedItem === index && (
                      <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-in slide-in-from-top duration-300">
                        <div>
                          <h4 className="text-sm font-semibold text-card-foreground mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {event.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start space-x-2">
                                <Icon name="CheckCircleIcon" size={16} className="text-success mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {event.technologies.length > 5 && (
                          <div>
                            <h4 className="text-sm font-semibold text-card-foreground mb-3">All Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs text-muted-foreground hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;