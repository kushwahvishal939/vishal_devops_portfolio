'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import ProjectStats from './ProjectStats';
import Icon from '@/components/ui/AppIcon';

interface Technology {
  name: string;
  icon: string;
  category: string;
}

interface ProjectMetrics {
  costReduction?: string;
  performanceImprovement?: string;
  uptime?: string;
  deploymentTime?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  alt: string;
  technologies: Technology[];
  metrics: ProjectMetrics;
  challenges: string[];
  solutions: string[];
  demoUrl?: string;
  githubUrl?: string;
  architectureImage?: string;
  architectureAlt?: string;
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
}

interface FilterOption {
  id: string;
  label: string;
  icon: string;
  count: number;
}

const PortfolioInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTechnology, setActiveTechnology] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'impact' | 'complexity'>('recent');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Multi-Cloud Infrastructure Optimization',
      category: 'cloud-migration',
      description:
        'Migrated legacy monolithic application to microservices architecture across AWS and Azure, achieving 55% cost reduction and 99.9% uptime.',
      longDescription:
        'Led a comprehensive cloud transformation initiative that involved migrating a legacy e-commerce platform from on-premises infrastructure to a hybrid multi-cloud setup. The project required careful planning, zero-downtime migration strategies, and implementation of advanced monitoring and automation systems.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=70',
      alt: 'Abstract cloud architecture with connected servers representing multi-cloud migration',
      technologies: [
        { name: 'AWS', icon: 'CloudIcon', category: 'Cloud Platform' },
        { name: 'Azure', icon: 'CloudIcon', category: 'Cloud Platform' },
        { name: 'Kubernetes', icon: 'CubeIcon', category: 'Orchestration' },
        { name: 'Docker', icon: 'CubeIcon', category: 'Containerization' },
        { name: 'Terraform', icon: 'CodeBracketIcon', category: 'IaC' },
        { name: 'Prometheus', icon: 'ChartBarIcon', category: 'Monitoring' },
      ],

      metrics: {
        costReduction: '55%',
        performanceImprovement: '40%',
        uptime: '99.9%',
        deploymentTime: '85% faster',
      },
      challenges: [
        'Zero-downtime migration requirement for 24/7 e-commerce platform',
        'Complex data synchronization between multiple cloud providers',
        'Legacy application dependencies and tight coupling issues',
        'Compliance requirements for financial data handling',
      ],

      solutions: [
        'Implemented blue-green deployment strategy with automated rollback',
        'Designed event-driven architecture for real-time data synchronization',
        'Gradual microservices extraction using strangler fig pattern',
        'Established comprehensive security and compliance framework',
      ],

      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example',
      architectureImage:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=70',
      architectureAlt:
        'Whiteboard-style microservices and cloud architecture drawing with connected services and databases',
      testimonial: {
        text: "Vishal's expertise in cloud migration saved us over ₹2.5L annually while improving our system reliability. His attention to detail and proactive approach made the entire process seamless.",
        author: 'Rajesh Kumar',
        position: 'CTO',
        company: 'TechCorp Solutions',
      },
    },
    {
      id: 2,
      title: 'CI/CD Pipeline Automation Suite',
      category: 'automation',
      description:
        'Built enterprise-grade CI/CD pipeline reducing deployment time from 4 hours to 15 minutes with automated testing and security scanning.',
      longDescription:
        'Designed and implemented a comprehensive DevOps automation suite that transformed the software delivery process for a fintech startup. The solution included automated testing, security scanning, infrastructure provisioning, and deployment orchestration across multiple environments.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70',
      alt: 'Developer workstation showing CI/CD pipeline code and build status on screen',
      technologies: [
        { name: 'Jenkins', icon: 'CogIcon', category: 'CI/CD' },
        { name: 'GitLab CI', icon: 'CodeBracketIcon', category: 'CI/CD' },
        { name: 'SonarQube', icon: 'ShieldCheckIcon', category: 'Quality' },
        { name: 'Ansible', icon: 'CommandLineIcon', category: 'Automation' },
        { name: 'Helm', icon: 'CubeIcon', category: 'Package Manager' },
        { name: 'Grafana', icon: 'ChartBarIcon', category: 'Monitoring' },
      ],

      metrics: {
        deploymentTime: '94% reduction',
        performanceImprovement: '60%',
        costReduction: '40%',
      },
      challenges: [
        'Manual deployment process taking 4+ hours per release',
        'Inconsistent environments causing production issues',
        'Lack of automated testing and quality gates',
        'Security vulnerabilities discovered post-deployment',
      ],

      solutions: [
        'Implemented GitOps workflow with automated pipeline triggers',
        'Containerized applications with consistent environment configs',
        'Integrated comprehensive testing suite with quality gates',
        'Added security scanning and compliance checks in pipeline',
      ],

      demoUrl: 'https://pipeline-demo.example.com',
      githubUrl: 'https://github.com/example/cicd',
    },
    {
      id: 3,
      title: 'Kubernetes Cluster Management Platform',
      category: 'orchestration',
      description:
        'Developed custom Kubernetes management platform with auto-scaling, monitoring, and cost optimization features for enterprise workloads.',
      longDescription:
        'Created a comprehensive Kubernetes management solution that provides enterprise-grade features including intelligent auto-scaling, resource optimization, security policy enforcement, and cost management. The platform serves multiple development teams with isolated namespaces and RBAC controls.',
      image:
        'https://images.unsplash.com/photo-1649682892309-e10e0b7cd40b?auto=format&fit=crop&w=1600&q=70',
      alt: 'Futuristic network of containers and nodes representing Kubernetes orchestration',
      technologies: [
        { name: 'Kubernetes', icon: 'CubeIcon', category: 'Orchestration' },
        { name: 'Prometheus', icon: 'ChartBarIcon', category: 'Monitoring' },
        { name: 'Promtail', icon: 'DocumentTextIcon', category: 'Logging' },
        { name: 'Cert-Manager', icon: 'ShieldCheckIcon', category: 'Security' },
        { name: 'ArgoCD', icon: 'ArrowPathIcon', category: 'GitOps' },
      ],

      metrics: {
        costReduction: '45%',
        performanceImprovement: '70%',
        uptime: '99.95%',
      },
      challenges: [
        'Complex multi-tenant requirements with strict isolation',
        'Resource optimization across diverse workload patterns',
        'Security compliance for financial services industry',
        'Seamless integration with existing enterprise tools',
      ],

      solutions: [
        'Implemented namespace-based multi-tenancy with RBAC',
        'Developed custom HPA and VPA configurations',
        'Established comprehensive security policies and network policies',
        'Created custom operators for enterprise tool integration',
      ],

      architectureImage:
        'https://images.unsplash.com/photo-1667372459470-5f61c93c6d3f?auto=format&fit=crop&w=1400&q=70',
      architectureAlt:
        'Kubernetes cluster architecture diagram showing pods, services, and ingress controllers',
    },
    {
      id: 4,
      title: 'Infrastructure Cost Optimization Engine',
      category: 'cost-optimization',
      description:
        'Built intelligent cost optimization system that automatically rightsizes resources and schedules workloads, saving ₹3.2L annually.',
      longDescription:
        'Developed an AI-driven cost optimization platform that continuously monitors cloud resource utilization, identifies optimization opportunities, and automatically implements cost-saving measures while maintaining performance SLAs. The system includes predictive analytics for capacity planning and automated resource scheduling.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70',
      alt: 'Laptop displaying cost analytics dashboard with charts and savings metrics',
      technologies: [
        { name: 'Python', icon: 'CodeBracketIcon', category: 'Programming' },
        { name: 'AWS Cost Explorer', icon: 'ChartBarIcon', category: 'Analytics' },
        { name: 'Lambda', icon: 'BoltIcon', category: 'Serverless' },
        { name: 'CloudWatch', icon: 'EyeIcon', category: 'Monitoring' },
        { name: 'Elasticsearch', icon: 'MagnifyingGlassIcon', category: 'Search' },
        { name: 'Kibana', icon: 'ChartBarIcon', category: 'Visualization' },
      ],

      metrics: {
        costReduction: '₹3.2L annually',
        performanceImprovement: '25%',
        deploymentTime: '50% faster',
      },
      challenges: [
        'Unpredictable workload patterns causing over-provisioning',
        'Manual resource management leading to waste',
        'Lack of visibility into cost drivers and trends',
        'Balancing cost optimization with performance requirements',
      ],

      solutions: [
        'Implemented ML-based workload prediction algorithms',
        'Automated resource rightsizing based on historical data',
        'Created comprehensive cost visibility dashboards',
        'Established performance SLA monitoring with automated alerts',
      ],

      testimonial: {
        text: "The cost optimization engine Vishal built has been a game-changer for our startup. We've saved over ₹3L in the first year alone while actually improving our application performance.",
        author: 'Priya Sharma',
        position: 'Founder & CEO',
        company: 'InnovateTech',
      },
    },
    {
      id: 5,
      title: 'Microservices Security Framework',
      category: 'security',
      description:
        'Implemented zero-trust security architecture for microservices with automated threat detection and compliance monitoring.',
      longDescription:
        'Designed and deployed a comprehensive security framework for microservices architecture that implements zero-trust principles, automated threat detection, vulnerability scanning, and compliance monitoring. The solution includes service mesh security, API gateway protection, and runtime security monitoring.',
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=70',
      alt: 'Cybersecurity lock and shield hologram representing zero-trust protections',
      technologies: [
        { name: 'Istio', icon: 'ShieldCheckIcon', category: 'Service Mesh' },
        { name: 'Falco', icon: 'ExclamationTriangleIcon', category: 'Runtime Security' },
        { name: 'OPA', icon: 'DocumentCheckIcon', category: 'Policy Engine' },
        { name: 'Vault', icon: 'KeyIcon', category: 'Secrets Management' },
        { name: 'Twistlock', icon: 'LockClosedIcon', category: 'Container Security' },
        { name: 'OWASP ZAP', icon: 'BugAntIcon', category: 'Security Testing' },
      ],

      metrics: {
        performanceImprovement: 'Security incidents reduced by 90%',
        uptime: '100% compliance',
        costReduction: '30% security overhead reduction',
      },
      challenges: [
        'Complex service-to-service communication security',
        'Compliance requirements for healthcare data (HIPAA)',
        'Runtime threat detection without performance impact',
        'Automated security policy enforcement across environments',
      ],

      solutions: [
        'Implemented mTLS with automatic certificate rotation',
        'Established comprehensive audit logging and monitoring',
        'Deployed runtime security monitoring with ML-based detection',
        'Created policy-as-code framework for automated compliance',
      ],
    },
    {
      id: 6,
      title: 'Real-time Monitoring & Observability Stack',
      category: 'monitoring',
      description:
        'Built comprehensive observability platform with distributed tracing, metrics collection, and intelligent alerting for microservices ecosystem.',
      longDescription:
        'Architected and implemented a full-stack observability solution that provides deep insights into application performance, infrastructure health, and user experience. The platform includes distributed tracing, custom metrics, log aggregation, and AI-powered anomaly detection with intelligent alerting.',
      image:
        'https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1600&q=70',
      alt: 'Large monitor showing observability dashboards with metrics, logs, and traces',
      technologies: [
        { name: 'Prometheus', icon: 'ChartBarIcon', category: 'Metrics' },
        { name: 'Grafana', icon: 'PresentationChartLineIcon', category: 'Visualization' },
        { name: 'Jaeger', icon: 'MapIcon', category: 'Tracing' },
        { name: 'ELK Stack', icon: 'DocumentTextIcon', category: 'Logging' },
        { name: 'AlertManager', icon: 'BellIcon', category: 'Alerting' },
        { name: 'OpenTelemetry', icon: 'SignalIcon', category: 'Instrumentation' },
      ],

      metrics: {
        performanceImprovement: 'MTTR reduced by 75%',
        uptime: '99.99%',
        costReduction: '35% operational overhead',
      },
      challenges: [
        'Lack of visibility into distributed system performance',
        'Alert fatigue from too many false positives',
        'Difficulty correlating issues across multiple services',
        'High operational overhead for monitoring infrastructure',
      ],

      solutions: [
        'Implemented comprehensive distributed tracing across all services',
        'Developed intelligent alerting with ML-based anomaly detection',
        'Created unified dashboards with service dependency mapping',
        'Automated monitoring infrastructure with self-healing capabilities',
      ],
    },
  ];

  const categories: FilterOption[] = [
    { id: 'all', label: 'All Projects', icon: 'FolderIcon', count: mockProjects.length },
    { id: 'cloud-migration', label: 'Cloud Migration', icon: 'CloudIcon', count: 1 },
    { id: 'automation', label: 'Automation', icon: 'CogIcon', count: 1 },
    { id: 'orchestration', label: 'Orchestration', icon: 'CubeIcon', count: 1 },
    { id: 'cost-optimization', label: 'Cost Optimization', icon: 'CurrencyRupeeIcon', count: 1 },
    { id: 'security', label: 'Security', icon: 'ShieldCheckIcon', count: 1 },
    { id: 'monitoring', label: 'Monitoring', icon: 'ChartBarIcon', count: 1 },
  ];

  const technologies: FilterOption[] = [
    { id: 'all', label: 'All Technologies', icon: 'CogIcon', count: mockProjects.length },
    { id: 'aws', label: 'AWS', icon: 'CloudIcon', count: 2 },
    { id: 'kubernetes', label: 'Kubernetes', icon: 'CubeIcon', count: 3 },
    { id: 'docker', label: 'Docker', icon: 'CubeIcon', count: 2 },
    { id: 'terraform', label: 'Terraform', icon: 'CodeBracketIcon', count: 1 },
    { id: 'prometheus', label: 'Prometheus', icon: 'ChartBarIcon', count: 3 },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesTechnology =
      activeTechnology === 'all' ||
      project.technologies.some((tech) => tech.name.toLowerCase() === activeTechnology);
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTechnology && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'impact':
        return b.id - a.id; // Assuming higher ID means higher impact
      case 'complexity':
        return b.technologies.length - a.technologies.length;
      default:
        return b.id - a.id; // Most recent first
    }
  });

  if (!isHydrated) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-muted/30 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-muted/30 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-muted/30 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <ProjectStats
        totalProjects={mockProjects.length}
        completedProjects={mockProjects.length}
        totalCostSavings="₹8.5L+"
        averagePerformanceGain="48%"
      />

      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-muted/30 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="impact">Highest Impact</option>
            <option value="complexity">Most Complex</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <ProjectFilter
        categories={categories}
        technologies={technologies}
        activeCategory={activeCategory}
        activeTechnology={activeTechnology}
        onCategoryChange={setActiveCategory}
        onTechnologyChange={setActiveTechnology}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {sortedProjects.length} of {mockProjects.length} projects
        </p>
        {(activeCategory !== 'all' || activeTechnology !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveTechnology('all');
              setSearchQuery('');
            }}
            className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {sortedProjects.length === 0 && (
        <div className="text-center py-16">
          <Icon name="FolderIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveTechnology('all');
              setSearchQuery('');
            }}
            className="px-6 py-3 bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioInteractive;
