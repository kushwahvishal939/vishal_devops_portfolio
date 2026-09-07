'use client';

import { useState } from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import ExperienceStats from './ExperienceStats';
import CareerJourney from './CareerJourney';
import TestimonialsSection from './TestimonialsSection';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ExperienceInteractive = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const experienceData = [
    {
      id: 1,
      company: 'RDASH',
      position: 'DevOps Engineer',
      duration: 'Dec 22, 2025 - Present',
      isCurrent: true,
      location: 'Gurgaon, India',
      type: 'current' as const,
      description:
        'Driving platform reliability and automation at RDASH with cloud-native architectures, cost governance, and secure delivery pipelines across multiple environments.',
      keyAchievements: [
        {
          metric: 'Stability',
          value: '99.99%',
          description: 'Maintained near-perfect uptime for tier-1 services',
          icon: 'ShieldCheckIcon',
        },
        {
          metric: 'Cost Optimization',
          value: '45%',
          description: 'Reduced monthly cloud spend via right-sizing and autoscaling',
          icon: 'CurrencyRupeeIcon',
        },
        {
          metric: 'Delivery Velocity',
          value: '35%',
          description: 'Improved deployment cadence with progressive delivery',
          icon: 'RocketLaunchIcon',
        },
      ],
      projects: [
        {
          name: 'Multi-Cluster Platform Rollout',
          description:
            'Rolled out a hardened Kubernetes platform with GitOps-driven delivery and automated policy enforcement for RDASH services.',
          technologies: ['Kubernetes', 'ArgoCD', 'Terraform', 'Helm', 'OPA'],
          outcomes: [
            'Standardized deployments across staging and production clusters',
            'Policy violations reduced by 60% through automated checks',
            'Blue/green rollouts adopted for zero-downtime releases',
          ],
        },
        {
          name: 'FinOps & Autoscaling',
          description:
            'Implemented autoscaling policies and lifecycle rules to remove waste while keeping SLOs intact.',
          technologies: ['AWS', 'Karpenter', 'CloudWatch', 'Grafana', 'Prometheus'],
          outcomes: [
            '45% monthly cloud savings while preserving latency SLOs',
            'Predictive scaling reduced burst-related incidents by 70%',
            'Created dashboards for exec-level cost visibility',
          ],
        },
      ],
      technologies: [
        'AWS',
        'Kubernetes',
        'Terraform',
        'ArgoCD',
        'Helm',
        'Prometheus',
        'Grafana',
        'OPA',
      ],
      teamSize: '3 DevOps Engineers',
      budget: '75,000/mo',
    },
    {
      id: 2,
      company: 'XGrowth LLC',
      position: 'DevOps Engineer',
      duration: 'Oct 2023 - Dec 18, 2025',
      isCurrent: false,
      location: 'Noida, India',
      type: 'previous' as const,
      description:
        'Led DevOps transformation initiatives for enterprise-scale applications, implementing cloud-native solutions and automation frameworks that revolutionized deployment processes and infrastructure management.',
      keyAchievements: [
        {
          metric: 'Cost Reduction',
          value: '55%',
          description: 'Infrastructure costs from 1.5L to 65K monthly',
          icon: 'CurrencyRupeeIcon',
        },
        {
          metric: 'Deployment Speed',
          value: '40%',
          description: 'Faster deployment cycles with CI/CD automation',
          icon: 'RocketLaunchIcon',
        },
        {
          metric: 'System Uptime',
          value: '99.9%',
          description: 'Zero-downtime deployments achieved',
          icon: 'ShieldCheckIcon',
        },
      ],
      projects: [
        {
          name: 'Cloud Migration & Cost Optimization',
          description:
            'Led complete migration of legacy infrastructure to AWS cloud with comprehensive cost optimization strategies.',
          technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins'],
          outcomes: [
            'Reduced infrastructure costs by 55% (1.5L to 65K monthly)',
            'Improved system reliability to 99.9% uptime',
            'Automated 90% of deployment processes',
          ],
        },
        {
          name: 'CI/CD Pipeline Modernization',
          description:
            'Designed and implemented enterprise-grade CI/CD pipelines with automated testing and deployment workflows.',
          technologies: ['Jenkins', 'GitLab CI', 'Docker', 'Ansible', 'SonarQube'],
          outcomes: [
            '40% reduction in deployment time',
            'Zero production incidents in 8 months',
            '100% automated testing coverage',
          ],
        },
      ],
      technologies: [
        'AWS',
        'Kubernetes',
        'Docker',
        'Terraform',
        'Jenkins',
        'Ansible',
        'Prometheus',
        'Grafana',
      ],
      teamSize: '1 DevOps Engineer',
      budget: '50,000/mo',
    },
  ];

  const statsData = [
    { label: 'Years Experience', value: '2+', icon: 'CalendarIcon' },
    { label: 'Projects Shipped', value: '50+', icon: 'FolderIcon' },
    { label: 'Cost Savings', value: '8.5L+', icon: 'CurrencyRupeeIcon' },
    { label: 'System Uptime', value: '99.9%', icon: 'ShieldCheckIcon' },
  ];

  const journeyMilestones = [
    {
      year: '2022',
      title: 'Career Shift to DevOps',
      description:
        'After completing B.Tech and briefly working in the civil domain, I transitioned into IT. Joined an organization in a monitoring support role, where I worked with alerting tools, log analysis, and basic automation while building my DevOps foundation.',
      icon: 'CogIcon',
    },
    {
      year: '2023',
      title: 'AWS Cloud & DevOps Learning at Xgrowth',
      description:
        'Joined Xgrowth and focused on AWS, DevOps fundamentals, Linux, Git, scripting, networking, and CI/CD practices, while contributing to AWS cloud and automation tasks.',
      icon: 'CloudIcon',
    },
    {
      year: '2024',
      title: 'Kubernetes: From Learning to Production',
      description:
        'Implemented Kubernetes in production at Xgrowth with a complete monitoring stack using Prometheus, Grafana, Loki, Promtail, and Alertmanager. Integrated Cert-Manager and NGINX Ingress for SSL and traffic routing.',
      icon: 'BoltIcon',
    },
    {
      year: '2025',
      title: 'DevOps Engineer',
      description:
        'Currently working at Xgrowth as a DevOps Engineer, leading scalable infrastructure setups, cost optimization, Kubernetes enhancements, and automation improvements across the organization.',
      icon: 'TrophyIcon',
      highlight: true,
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      name: 'Mayank Jha',
      position: 'Senior Devops Engineer',
      company: 'Self Project',
      avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_13d7f1b79-1762274020857.png',
      avatarAlt: 'Professional headshot of Mayank Jha',
      content:
        "Vishal's DevOps expertise transformed our infrastructure completely. The 55% cost reduction he achieved while maintaining 99.9% uptime is remarkable. His automation solutions revolutionized our deployment processes.",
      rating: 4,
      project: 'Cloud Migration',
    },
  ];

  const handleToggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handlePreviousTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-16">
      {/* Stats readout */}
      <section>
        <ExperienceStats stats={statsData} />
      </section>

      {/* Timeline */}
      <section>
        <ScrollReveal direction="up">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#f59e0b] font-mono text-sm">$</span>
              <h2 className="text-2xl lg:text-3xl font-mono font-bold text-[#e0e0e0]">
                professional_experience
              </h2>
            </div>
            <p className="text-sm font-mono text-[#666] pl-6">
              # from maintaining systems to building infrastructure at scale
            </p>
          </div>
        </ScrollReveal>

        <ExperienceTimeline
          experiences={experienceData}
          expandedItems={expandedItems}
          onToggleExpand={handleToggleExpand}
        />
      </section>

      {/* Career Journey & Testimonials */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CareerJourney milestones={journeyMilestones} />
        <TestimonialsSection
          testimonials={testimonialsData}
          currentTestimonial={currentTestimonial}
          onNext={handleNextTestimonial}
          onPrevious={handlePreviousTestimonial}
        />
      </section>
    </div>
  );
};

export default ExperienceInteractive;
