'use client';

import { useState } from 'react';
import SkillCategory from './SkillCategory';
import CertificationBadge from './CertificationBadge';
import ToolPlayground from './ToolPlayground';
import SkillsMetrics from './SkillsMetrics';

export default function SkillsInteractive() {
  const [activeTab, setActiveTab] = useState('tools');

  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: '☁️',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        {
          name: 'Amazon Web Services',
          proficiency: 92,
          icon: '🟠',
          description:
            'Expert in EC2, S3, Lambda, RDS, CloudFormation, and cost optimization strategies',
          yearsExperience: 2,
        },
        {
          name: 'Microsoft Azure',
          proficiency: 88,
          icon: '🔵',
          description: 'Certified in DevOps solutions, ARM templates, and Azure Kubernetes Service',
          yearsExperience: 1,
        },
        {
          name: 'Google Cloud Platform',
          proficiency: 85,
          icon: '🔴',
          description:
            'Proficient in GKE, Cloud Functions, BigQuery, and infrastructure automation',
          yearsExperience: 1,
        },
      ],
    },
    {
      title: 'Container Orchestration',
      icon: '🐳',
      color: 'from-purple-500 to-pink-500',
      skills: [
        {
          name: 'Kubernetes',
          proficiency: 90,
          icon: '⚙️',
          description:
            'Advanced cluster management, RBAC, networking, and custom resource definitions',
          yearsExperience: 2,
        },
        {
          name: 'Docker',
          proficiency: 95,
          icon: '🐋',
          description: 'Container optimization, multi-stage builds, and security best practices',
          yearsExperience: 2,
        },
        {
          name: 'Helm',
          proficiency: 87,
          icon: '⛵',
          description: 'Chart development, templating, and application lifecycle management',
          yearsExperience: 2,
        },
      ],
    },
    {
      title: 'CI/CD & Automation',
      icon: '🔄',
      color: 'from-green-500 to-teal-500',
      skills: [
        {
          name: 'Jenkins',
          proficiency: 93,
          icon: '🔧',
          description: 'Pipeline as code, plugin development, and distributed build systems',
          yearsExperience: 2,
        },
        {
          name: 'GitHub Actions',
          proficiency: 89,
          icon: '🐙',
          description: 'Workflow automation, custom actions, and security scanning integration',
          yearsExperience: 2,
        },
        {
          name: 'GitLab CI/CD',
          proficiency: 86,
          icon: '🦊',
          description: 'Multi-stage pipelines, auto-scaling runners, and deployment strategies',
          yearsExperience: 2,
        },
      ],
    },
    {
      title: 'Infrastructure as Code',
      icon: '📜',
      color: 'from-orange-500 to-red-500',
      skills: [
        {
          name: 'Terraform',
          proficiency: 91,
          icon: '🏗️',
          description: 'Multi-cloud provisioning, state management, and module development',
          yearsExperience: 1,
        },
        // {
        //   name: "Ansible",
        //   proficiency: 88,
        //   icon: "📋",
        //   description: "Configuration management, playbook optimization, and inventory management",
        //   yearsExperience: 4
        // },
        // {
        //   name: "CloudFormation",
        //   proficiency: 85,
        //   icon: "☁️",
        //   description: "AWS resource provisioning, nested stacks, and custom resources",
        //   yearsExperience: 3
        // }
      ],
    },
  ];

  const certifications = [
    {
      name: 'Microsoft Certified: AZ-400',
      issuer: 'Microsoft',
      date: 'July 2023',
      credentialId: 'AZ-400-VK2024',
      verificationUrl:
        'https://www.credly.com/badges/7ea892bf-806d-423e-bf1f-149d2b10d2a6/linked_in_profile',
      badgeIcon: '🏆',
      status: 'active' as const,
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Aug 2024',
      credentialId: 'SAA-C03-VK2024',
      verificationUrl:
        'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      badgeIcon: '🎯',
      status: 'active' as const,
    },
    {
      name: 'Google Cloud: Gemini for DevOps Engineer',
      issuer: 'Google Cloud',
      date: 'Sept 2025',
      credentialId: 'GCP-PDE-VK2024',
      verificationUrl:
        'https://www.skills.google/public_profiles/2f0f4e69-4786-4ea0-af6c-89de4ea6d88b/badges/18053972?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
      badgeIcon: '⭐',
      status: 'active' as const,
    },
    {
      name: 'Cisco Network Automation Essentials',
      issuer: 'CISCO',
      date: 'Oct 2025',
      credentialId: 'CKA-VK2024',
      verificationUrl:
        'https://www.credly.com/badges/894eb797-6766-40fb-b680-44467bf68b54/linked_in_profile',
      badgeIcon: '🚀',
      status: 'active' as const,
    },
  ];

  const tools = [
    {
      name: 'Docker',
      category: 'Containerization',
      icon: '🐋',
      description: 'Container platform for building, shipping, and running applications',
      features: [
        'Multi-stage builds',
        'Image optimization',
        'Security scanning',
        'Registry management',
      ],
      proficiency: 95,
      projects: 15,
    },
    {
      name: 'Kubernetes',
      category: 'Orchestration',
      icon: '⚙️',
      description: 'Container orchestration platform for automated deployment and scaling',
      features: ['Cluster management', 'Service mesh', 'Auto-scaling', 'Rolling updates'],
      proficiency: 90,
      projects: 15,
    },
    {
      name: 'Jenkins',
      category: 'CI/CD',
      icon: '🔧',
      description: 'Automation server for continuous integration and deployment',
      features: ['Pipeline as code', 'Plugin ecosystem', 'Distributed builds', 'Blue Ocean UI'],
      proficiency: 93,
      projects: 20,
    },
    {
      name: 'Terraform',
      category: 'Infrastructure',
      icon: '🏗️',
      description: 'Infrastructure as code tool for building and managing cloud resources',
      features: ['Multi-cloud support', 'State management', 'Module system', 'Plan validation'],
      proficiency: 91,
      projects: 12,
    },
    {
      name: 'AWS',
      category: 'Cloud Platform',
      icon: '🟠',
      description: 'Comprehensive cloud computing platform with 200+ services',
      features: [
        'EC2 & Lambda',
        'S3 & RDS',
        'CloudFormation',
        'Cost optimization',
        'EKS',
        'ECS & ECS Fargate',
        'Application Load Balancer',
        'CloudWatch',
        'Route53',
        '',
      ],
      proficiency: 92,
      projects: 20,
    },
    // {
    //   name: "Ansible",
    //   category: "Configuration",
    //   icon: "📋",
    //   description: "Automation tool for configuration management and application deployment",
    //   features: ["Playbook automation", "Inventory management", "Idempotent operations", "Vault encryption"],
    //   proficiency: 88,
    //   projects: 20
    // },
    {
      name: 'Prometheus',
      category: 'Monitoring',
      icon: '📊',
      description: 'Open-source monitoring and alerting toolkit for cloud-native environments',
      features: ['Time-series database', 'PromQL queries', 'Alertmanager', 'Service discovery'],
      proficiency: 86,
      projects: 12,
    },
    {
      name: 'Grafana',
      category: 'Visualization',
      icon: '📈',
      description: 'Analytics and monitoring platform with beautiful dashboards',
      features: ['Custom dashboards', 'Data source integration', 'Alerting', 'Team collaboration'],
      proficiency: 89,
      projects: 18,
    },
  ];

  const metrics = [
    {
      label: 'Technologies Mastered',
      value: '50+',
      icon: '🛠️',
      color: 'from-blue-500 to-cyan-500',
      description: 'DevOps tools and platforms',
    },
    {
      label: 'Certifications Earned',
      value: '8',
      icon: '🏆',
      color: 'from-purple-500 to-pink-500',
      description: 'Industry-recognized credentials',
    },
    {
      label: 'Years Experience',
      value: '2+',
      icon: '⏱️',
      color: 'from-green-500 to-teal-500',
      description: 'Professional DevOps expertise',
    },
    {
      label: 'Projects Delivered',
      value: '50+',
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      description: 'Successful implementations',
    },
  ];

  const tabs = [
    { id: 'skills', label: 'Core Skills', icon: '🎯' },
    { id: 'tools', label: 'Tool Playground', icon: '🛠️' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'metrics', label: 'Metrics', icon: '📊' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium">
          <span className="animate-pulse">🔥</span>
          <span>Skills Laboratory</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">DevOps Mastery</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Interactive showcase of technical capabilities with real-time demonstrations, proficiency
          meters, and hands-on tool playground experiences
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-smooth focus-ring ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground shadow-neon'
                : 'bg-muted/20 text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={index}
                title={category.title}
                skills={category.skills}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
        )}

        {activeTab === 'tools' && <ToolPlayground tools={tools} />}

        {activeTab === 'certifications' && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-4">Professional Certifications</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Industry-recognized credentials validating expertise across cloud platforms and
                DevOps practices
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <CertificationBadge key={index} certification={cert} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient mb-4">Skills Overview</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quantified expertise and professional achievements in DevOps engineering
              </p>
            </div>
            <SkillsMetrics metrics={metrics} />
          </div>
        )}
      </div>

      {/* Floating Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-bounce opacity-25"></div>
      </div>
    </div>
  );
}
