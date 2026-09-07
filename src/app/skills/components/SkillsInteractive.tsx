'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolPlayground from './ToolPlayground';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Icon from '@/components/ui/AppIcon';

function buildAsciiBar(value: number, length: number = 24): string {
  const filled = Math.round((value / 100) * length);
  const empty = length - filled;
  return '[' + '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + ']';
}

export default function SkillsInteractive() {
  const [activeTab, setActiveTab] = useState('tools');

  const skillCategories = [
    {
      title: 'Cloud Platforms',
      skills: [
        {
          name: 'Amazon Web Services',
          proficiency: 92,
          description:
            'Expert in EC2, S3, Lambda, RDS, CloudFormation, and cost optimization strategies',
          yearsExperience: 2,
        },
        {
          name: 'Microsoft Azure',
          proficiency: 88,
          description: 'Certified in DevOps solutions, ARM templates, and Azure Kubernetes Service',
          yearsExperience: 1,
        },
        {
          name: 'Google Cloud Platform',
          proficiency: 85,
          description:
            'Proficient in GKE, Cloud Functions, BigQuery, and infrastructure automation',
          yearsExperience: 1,
        },
      ],
    },
    {
      title: 'Container Orchestration',
      skills: [
        {
          name: 'Kubernetes',
          proficiency: 90,
          description:
            'Advanced cluster management, RBAC, networking, and custom resource definitions',
          yearsExperience: 2,
        },
        {
          name: 'Docker',
          proficiency: 95,
          description: 'Container optimization, multi-stage builds, and security best practices',
          yearsExperience: 2,
        },
        {
          name: 'Helm',
          proficiency: 87,
          description: 'Chart development, templating, and application lifecycle management',
          yearsExperience: 2,
        },
      ],
    },
    {
      title: 'CI/CD & Automation',
      skills: [
        {
          name: 'Jenkins',
          proficiency: 93,
          description: 'Pipeline as code, plugin development, and distributed build systems',
          yearsExperience: 2,
        },
        {
          name: 'GitHub Actions',
          proficiency: 89,
          description: 'Workflow automation, custom actions, and security scanning integration',
          yearsExperience: 2,
        },
        {
          name: 'GitLab CI/CD',
          proficiency: 86,
          description: 'Multi-stage pipelines, auto-scaling runners, and deployment strategies',
          yearsExperience: 2,
        },
      ],
    },
    {
      title: 'Infrastructure as Code',
      skills: [
        {
          name: 'Terraform',
          proficiency: 91,
          description: 'Multi-cloud provisioning, state management, and module development',
          yearsExperience: 1,
        },
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
      status: 'active' as const,
    },
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Aug 2024',
      credentialId: 'SAA-C03-VK2024',
      verificationUrl:
        'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
      status: 'active' as const,
    },
    {
      name: 'Google Cloud: Gemini for DevOps Engineer',
      issuer: 'Google Cloud',
      date: 'Sept 2025',
      credentialId: 'GCP-PDE-VK2024',
      verificationUrl:
        'https://www.skills.google/public_profiles/2f0f4e69-4786-4ea0-af6c-89de4ea6d88b/badges/18053972?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
      status: 'active' as const,
    },
    {
      name: 'AWS Certified Solutions Architect - Professional',
      issuer: 'Amazon Web Services',
      date: 'Aug 2026',
      credentialId: 'SAP-C02-VK2026',
      verificationUrl:
        'https://www.credly.com/badges/d927676d-a144-44a7-9bb7-73e8cc31579c/linked_in_profile',
      status: 'active' as const,
    },
    {
      name: 'Cisco Network Automation Essentials',
      issuer: 'CISCO',
      date: 'Oct 2025',
      credentialId: 'CKA-VK2024',
      verificationUrl:
        'https://www.credly.com/badges/894eb797-6766-40fb-b680-44467bf68b54/linked_in_profile',
      status: 'active' as const,
    },
  ];

  const tools = [
    {
      name: 'Docker',
      category: 'Containerization',
      icon: '\uD83D\uDC0B',
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
      icon: '\u2699\uFE0F',
      description: 'Container orchestration platform for automated deployment and scaling',
      features: ['Cluster management', 'Service mesh', 'Auto-scaling', 'Rolling updates'],
      proficiency: 90,
      projects: 15,
    },
    {
      name: 'Jenkins',
      category: 'CI/CD',
      icon: '\uD83D\uDD27',
      description: 'Automation server for continuous integration and deployment',
      features: ['Pipeline as code', 'Plugin ecosystem', 'Distributed builds', 'Blue Ocean UI'],
      proficiency: 93,
      projects: 20,
    },
    {
      name: 'Terraform',
      category: 'Infrastructure',
      icon: '\uD83C\uDFD7\uFE0F',
      description: 'Infrastructure as code tool for building and managing cloud resources',
      features: ['Multi-cloud support', 'State management', 'Module system', 'Plan validation'],
      proficiency: 91,
      projects: 12,
    },
    {
      name: 'AWS',
      category: 'Cloud Platform',
      icon: '\uD83D\uDFE0',
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
    {
      name: 'Prometheus',
      category: 'Monitoring',
      icon: '\uD83D\uDCCA',
      description: 'Open-source monitoring and alerting toolkit for cloud-native environments',
      features: ['Time-series database', 'PromQL queries', 'Alertmanager', 'Service discovery'],
      proficiency: 86,
      projects: 12,
    },
    {
      name: 'Grafana',
      category: 'Visualization',
      icon: '\uD83D\uDCC8',
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
      description: 'DevOps tools and platforms',
    },
    {
      label: 'Certifications Earned',
      value: '8',
      description: 'Industry-recognized credentials',
    },
    {
      label: 'Years Experience',
      value: '2+',
      description: 'Professional DevOps expertise',
    },
    {
      label: 'Projects Delivered',
      value: '50+',
      description: 'Successful implementations',
    },
  ];

  const tabs = [
    { id: 'skills', label: 'skills' },
    { id: 'tools', label: 'tools' },
    { id: 'certs', label: 'certs' },
    { id: 'metrics', label: 'metrics' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <p className="font-mono text-sm text-[#666]">
            <span className="text-[#f59e0b]">$</span> cat /etc/skills.conf
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#e0e0e0] tracking-tight">
            DevOps Mastery
          </h1>
          <p className="font-mono text-sm text-[#666] max-w-2xl">
            Technical capabilities, proficiency metrics, certifications, and tooling -- all in one
            place.
          </p>
        </div>
      </ScrollReveal>

      {/* Terminal Tab Navigation */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="border-b border-[#222]">
          <div className="flex gap-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-5 py-3 font-mono text-sm transition-colors duration-150
                    border border-b-0 -mb-px
                    ${
                      isActive
                        ? 'bg-[#111] text-[#f59e0b] border-[#222] border-b-[#111]'
                        : 'bg-transparent text-[#666] border-transparent hover:text-[#e0e0e0]'
                    }
                  `}
                  style={{ borderRadius: '2px 2px 0 0' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-[#f59e0b]"
                      style={{ borderRadius: '2px 2px 0 0' }}
                    />
                  )}
                  <span className="text-[#666] mr-1">&gt;</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {/* ===== SKILLS TAB ===== */}
        {activeTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {skillCategories.map((category, catIndex) => (
              <ScrollReveal key={catIndex} direction="up" delay={catIndex * 0.08}>
                <div className="bg-[#111] border border-[#222] p-5" style={{ borderRadius: '2px' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#f59e0b] font-mono text-sm">$</span>
                    <h3 className="font-mono text-sm font-bold text-[#e0e0e0]">{category.title}</h3>
                    <span className="font-mono text-xs text-[#666]">
                      ({category.skills.length})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex items-baseline justify-between mb-1">
                          <span className="font-mono text-sm text-[#e0e0e0]">{skill.name}</span>
                          <span className="font-mono text-xs text-[#666]">
                            {skill.yearsExperience}y exp
                          </span>
                        </div>
                        <div className="font-mono text-xs flex items-center gap-2">
                          <span className="text-[#f59e0b] whitespace-pre">
                            {buildAsciiBar(skill.proficiency)}
                          </span>
                          <span className="text-[#e0e0e0] tabular-nums w-8 text-right">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <p className="font-mono text-xs text-[#666] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        )}

        {/* ===== TOOLS TAB ===== */}
        {activeTab === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <ToolPlayground tools={tools} />
          </motion.div>
        )}

        {/* ===== CERTIFICATIONS TAB ===== */}
        {activeTab === 'certs' && (
          <motion.div
            key="certs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <ScrollReveal direction="up">
              <div className="mb-6">
                <p className="font-mono text-sm text-[#666]">
                  <span className="text-[#f59e0b]">$</span> kubectl get certifications
                </p>
              </div>
            </ScrollReveal>

            {/* Table Header */}
            <ScrollReveal direction="up" delay={0.05}>
              <div
                className="bg-[#111] border border-[#222] overflow-hidden"
                style={{ borderRadius: '2px' }}
              >
                <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
                  <span className="col-span-5 font-mono text-xs text-[#666] uppercase tracking-wider">
                    Name
                  </span>
                  <span className="col-span-2 font-mono text-xs text-[#666] uppercase tracking-wider">
                    Issuer
                  </span>
                  <span className="col-span-2 font-mono text-xs text-[#666] uppercase tracking-wider">
                    Date
                  </span>
                  <span className="col-span-1 font-mono text-xs text-[#666] uppercase tracking-wider">
                    Status
                  </span>
                  <span className="col-span-2 font-mono text-xs text-[#666] uppercase tracking-wider text-right">
                    Action
                  </span>
                </div>

                {certifications.map((cert, index) => (
                  <ScrollReveal key={index} direction="up" delay={index * 0.06}>
                    <div
                      className={`
                        grid grid-cols-12 gap-2 px-4 py-3 items-center
                        hover:bg-[#1a1a1a] transition-colors duration-100
                        ${index < certifications.length - 1 ? 'border-b border-[#1a1a1a]' : ''}
                      `}
                    >
                      <div className="col-span-5">
                        <p className="font-mono text-sm text-[#e0e0e0] truncate">{cert.name}</p>
                        <p className="font-mono text-xs text-[#666] truncate">
                          {cert.credentialId}
                        </p>
                      </div>
                      <span className="col-span-2 font-mono text-xs text-[#666]">
                        {cert.issuer}
                      </span>
                      <span className="col-span-2 font-mono text-xs text-[#666]">{cert.date}</span>
                      <span className="col-span-1">
                        <span className="font-mono text-xs text-[#22c55e]">{cert.status}</span>
                      </span>
                      <div className="col-span-2 text-right">
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-[#f59e0b] hover:underline"
                        >
                          verify
                          <Icon
                            name="ArrowTopRightOnSquareIcon"
                            size={12}
                            className="text-[#f59e0b]"
                          />
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            {/* Mobile-friendly card fallback */}
            <div className="block sm:hidden space-y-3">
              {certifications.map((cert, index) => (
                <ScrollReveal key={`mobile-${index}`} direction="up" delay={index * 0.06}>
                  <div
                    className="bg-[#111] border border-[#222] p-4 space-y-2"
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-sm text-[#e0e0e0]">{cert.name}</p>
                        <p className="font-mono text-xs text-[#666]">
                          {cert.issuer} -- {cert.date}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#22c55e]">{cert.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#666]">{cert.credentialId}</span>
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-[#f59e0b] hover:underline"
                      >
                        verify
                        <Icon
                          name="ArrowTopRightOnSquareIcon"
                          size={12}
                          className="text-[#f59e0b]"
                        />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== METRICS TAB ===== */}
        {activeTab === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <ScrollReveal direction="up">
              <div className="mb-6">
                <p className="font-mono text-sm text-[#666]">
                  <span className="text-[#f59e0b]">$</span> cat /var/log/career-metrics.json
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {metrics.map((metric, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.08}>
                  <div
                    className="bg-[#111] border border-[#222] p-5 hover:border-[#333] transition-colors duration-150"
                    style={{ borderRadius: '2px' }}
                  >
                    <p className="font-mono text-3xl font-bold text-[#f59e0b] mb-1">
                      {metric.value}
                    </p>
                    <p className="font-mono text-sm text-[#e0e0e0] mb-1">{metric.label}</p>
                    <p className="font-mono text-xs text-[#666]">{metric.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Summary block */}
            <ScrollReveal direction="up" delay={0.3}>
              <div
                className="bg-[#111] border border-[#222] p-5 font-mono text-xs text-[#666] space-y-1"
                style={{ borderRadius: '2px' }}
              >
                <p>
                  <span className="text-[#f59e0b]">&gt;</span> overview.status ={' '}
                  <span className="text-[#22c55e]">&quot;active&quot;</span>
                </p>
                <p>
                  <span className="text-[#f59e0b]">&gt;</span> overview.focus ={' '}
                  <span className="text-[#e0e0e0]">
                    &quot;Cloud-Native DevOps &amp; Platform Engineering&quot;
                  </span>
                </p>
                <p>
                  <span className="text-[#f59e0b]">&gt;</span> overview.learning ={' '}
                  <span className="text-[#e0e0e0]">&quot;Always&quot;</span>
                </p>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
