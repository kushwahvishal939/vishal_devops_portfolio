import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ExpertiseArea {
  icon: string;
  title: string;
  description: string;
  skills: string[];
  achievement: string;
  color: string;
}

interface ExpertiseSectionProps {
  className?: string;
}

const ExpertiseSection = ({ className = '' }: ExpertiseSectionProps) => {
  const expertiseAreas: ExpertiseArea[] = [
    {
      icon: 'CloudIcon',
      title: 'Cloud Architecture & Migration',
      description:
        'Designing and implementing scalable cloud solutions across AWS, Azure, and GCP with focus on cost optimization and performance.',
      skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
      achievement: 'Reduced infrastructure costs by 55% through intelligent cloud optimization',
      color: 'accent',
    },
    {
      icon: 'CogIcon',
      title: 'CI/CD Pipeline Engineering',
      description:
        'Building robust deployment pipelines that ensure fast, reliable, and secure software delivery with automated testing and monitoring.',
      skills: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps', 'ArgoCD'],
      achievement: 'Improved deployment speed by 40% with zero-downtime deployments',
      color: 'primary',
    },
    {
      icon: 'ServerIcon',
      title: 'Container Orchestration',
      description:
        'Orchestrating containerized applications at scale using Kubernetes, Docker, and service mesh technologies for high availability.',
      skills: ['Kubernetes', 'Docker', 'Helm', 'Istio', 'Prometheus'],
      achievement: 'Achieved 100% uptime across production environments',
      color: 'success',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Infrastructure Security',
      description:
        'Implementing security-first DevOps practices with automated compliance, vulnerability scanning, and secure deployment strategies.',
      skills: ['Security Scanning', 'Compliance', 'RBAC', 'Network Security', 'Secrets Management'],
      achievement: 'Zero security incidents with automated threat detection',
      color: 'warning',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      accent: 'text-accent border-accent/30 bg-accent/10',
      primary: 'text-primary border-primary/30 bg-primary/10',
      success: 'text-success border-success/30 bg-success/10',
      warning: 'text-warning border-warning/30 bg-warning/10',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.accent;
  };

  return (
    <section className={`py-20 lg:py-32 relative ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 border border-success/30 rounded-full px-4 py-2 text-sm font-medium text-success mb-6">
            <Icon name="AcademicCapIcon" size={16} />
            <span>Core Expertise</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Technical</span>{' '}
            <span className="text-gradient">Mastery</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Deep expertise across the entire DevOps ecosystem, from cloud architecture to security
            implementation, with proven results in enterprise environments.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className="group relative p-8 glass-card rounded-3xl border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-premium-lg"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${getColorClasses(area.color)} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon name={area.icon as any} size={28} className={`text-${area.color}`} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-card-foreground mb-3">
                  Key Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs font-medium text-muted-foreground hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievement */}
              <div className={`p-4 rounded-xl border ${getColorClasses(area.color)} bg-opacity-50`}>
                <div className="flex items-center space-x-2">
                  <Icon name="TrophyIcon" size={16} className={`text-${area.color}`} />
                  <span className="text-sm font-medium text-card-foreground">
                    {area.achievement}
                  </span>
                </div>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 p-6 glass-card rounded-2xl border border-accent/20">
            <Icon name="ArrowRightIcon" size={24} className="text-accent" />
            <span className="text-lg font-medium text-foreground">
              Ready to see these skills in action?
            </span>
            <button
              onClick={() => (window.location.href = '/portfolio')}
              className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-sm transition-smooth hover:shadow-premium magnetic-hover"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
