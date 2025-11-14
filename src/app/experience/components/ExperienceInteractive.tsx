'use client';

import React, { useState, useEffect } from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import ExperienceStats from './ExperienceStats';
import CareerJourney from './CareerJourney';
import TestimonialsSection from './TestimonialsSection';

const ExperienceInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const experienceData = [
  {
    id: 1,
    company: "XGrowth LLC",
    position: "DevOps Engineer",
    duration: "Oct 2023 - Present",
    location: "Noida, India",
    type: "current" as const,
    companyLogo: "https://images.unsplash.com/photo-1735306104001-835e59d817b2",
    companyLogoAlt: "Modern tech company office building with glass facade and blue lighting",
    description: "Leading DevOps transformation initiatives for enterprise-scale applications, implementing cloud-native solutions and automation frameworks that revolutionized deployment processes and infrastructure management.",
    keyAchievements: [
    {
      metric: "Cost Reduction",
      value: "55%",
      description: "Infrastructure costs from ₹1.5L to ₹65K monthly",
      icon: "CurrencyRupeeIcon"
    },
    {
      metric: "Deployment Speed",
      value: "40%",
      description: "Faster deployment cycles with CI/CD automation",
      icon: "RocketLaunchIcon"
    },
    {
      metric: "System Uptime",
      value: "99.9%",
      description: "Zero-downtime deployments achieved",
      icon: "ShieldCheckIcon"
    }],

    projects: [
    {
      name: "Cloud Migration & Cost Optimization",
      description: "Led complete migration of legacy infrastructure to AWS cloud with comprehensive cost optimization strategies.",
      technologies: ["AWS", "Terraform", "Docker", "Kubernetes", "Jenkins"],
      outcomes: [
      "Reduced infrastructure costs by 55% (₹1.5L → ₹65K monthly)",
      "Improved system reliability to 99.9% uptime",
      "Automated 90% of deployment processes"]

    },
    {
      name: "CI/CD Pipeline Modernization",
      description: "Designed and implemented enterprise-grade CI/CD pipelines with automated testing and deployment workflows.",
      technologies: ["Jenkins", "GitLab CI", "Docker", "Ansible", "SonarQube"],
      outcomes: [
      "40% reduction in deployment time",
      "Zero production incidents in 8 months",
      "100% automated testing coverage"]

    }],

    technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "Jenkins", "Ansible", "Prometheus", "Grafana"],
    teamSize: "1 DevOps Engineers",
    budget: "₹50,000"
  },
  // {
  //   id: 2,
  //   company: "InnovateTech Systems",
  //   position: "DevOps Engineer",
  //   duration: "Mar 2021 - Dec 2022",
  //   location: "Mumbai, India",
  //   type: "previous" as const,
  //   companyLogo: "https://images.unsplash.com/photo-1690214141347-9ffa889e369f",
  //   companyLogoAlt: "Corporate office building with modern architecture and reflective windows",
  //   description: "Managed multi-cloud infrastructure and implemented automation solutions for scalable application deployment, focusing on reliability and performance optimization.",
  //   keyAchievements: [
  //   {
  //     metric: "Automation",
  //     value: "85%",
  //     description: "Infrastructure provisioning automated",
  //     icon: "CogIcon"
  //   },
  //   {
  //     metric: "Performance",
  //     value: "60%",
  //     description: "Application response time improvement",
  //     icon: "BoltIcon"
  //   },
  //   {
  //     metric: "Incidents",
  //     value: "90%",
  //     description: "Reduction in production incidents",
  //     icon: "ExclamationTriangleIcon"
  //   }],

  //   projects: [
  //   {
  //     name: "Multi-Cloud Infrastructure Setup",
  //     description: "Established hybrid cloud infrastructure across AWS and Azure with automated failover mechanisms.",
  //     technologies: ["AWS", "Azure", "Terraform", "Ansible", "Nginx"],
  //     outcomes: [
  //     "99.8% system availability achieved",
  //     "60% improvement in application performance",
  //     "Seamless disaster recovery implementation"]

  //   }],

  //   technologies: ["AWS", "Azure", "Docker", "Terraform", "Ansible", "Nginx", "MySQL", "Redis"],
  //   teamSize: "5 Engineers",
  //   budget: "₹1.2 Crores"
  // },
  // {
  //   id: 3,
  //   company: "StartupHub Technologies",
  //   position: "Junior DevOps Engineer",
  //   duration: "Jun 2019 - Feb 2021",
  //   location: "Pune, India",
  //   type: "previous" as const,
  //   companyLogo: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  //   companyLogoAlt: "Modern startup office space with open layout and collaborative work areas",
  //   description: "Started DevOps journey by managing server infrastructure and implementing basic automation for small to medium-scale applications.",
  //   keyAchievements: [
  //   {
  //     metric: "Learning",
  //     value: "15+",
  //     description: "Technologies mastered in 2 years",
  //     icon: "AcademicCapIcon"
  //   },
  //   {
  //     metric: "Projects",
  //     value: "12",
  //     description: "Successful deployments completed",
  //     icon: "CheckBadgeIcon"
  //   },
  //   {
  //     metric: "Efficiency",
  //     value: "50%",
  //     description: "Manual processes automated",
  //     icon: "ArrowTrendingUpIcon"
  //   }],

  //   projects: [
  //   {
  //     name: "Basic CI/CD Implementation",
  //     description: "Set up fundamental CI/CD pipelines for web applications with automated testing and deployment.",
  //     technologies: ["Jenkins", "Git", "Docker", "Linux", "Apache"],
  //     outcomes: [
  //     "Reduced deployment time from hours to minutes",
  //     "Eliminated manual deployment errors",
  //     "Established monitoring and alerting systems"]

  //   }],

  //   technologies: ["Linux", "Docker", "Jenkins", "Git", "Apache", "MySQL", "Bash", "Python"]
  // }
];


  const statsData = [
  {
    label: "Years of Experience",
    value: "2+",
    change: "+2 years",
    trend: "up" as const,
    icon: "CalendarIcon",
    color: "bg-gradient-to-br from-accent to-primary"
  },
  {
    label: "Projects Completed",
    value: "50+",
    change: "+3 this year",
    trend: "up" as const,
    icon: "FolderIcon",
    color: "bg-gradient-to-br from-success to-success/80"
  },
  {
    label: "Cost Savings Achieved",
    value: "₹8.5L+",
    change: "55% reduction",
    trend: "down" as const,
    icon: "CurrencyRupeeIcon",
    color: "bg-gradient-to-br from-warning to-warning/80"
  },
  {
    label: "System Uptime",
    value: "99.9%",
    change: "+0.5%",
    trend: "up" as const,
    icon: "ShieldCheckIcon",
    color: "bg-gradient-to-br from-primary to-primary/80"
  }];


  const journeyMilestones = [
  {
  year: "2022",
  title: "Career Shift to DevOps",
  description: "After completing B.Tech and briefly working in the civil domain, I transitioned into IT. Joined an organization in a monitoring support role, where I worked with alerting tools, log analysis, and basic automation while building my DevOps foundation.",
  icon: "CogIcon"
  },
  {
    year: "2023",
    title: "AWS Cloud & DevOps Learning at Xgrowth",
    description: "Joined Xgrowth and focused on AWS, DevOps fundamentals, Linux, Git, scripting, networking, and CI/CD practices, while contributing to AWS cloud and automation tasks.",
    icon: "CloudIcon"
  },
  {
  year: "2024",
  title: "Kubernetes: From Learning to Production Implementation",
  description: "Implemented Kubernetes in production at Xgrowth with a complete monitoring stack using Prometheus, Grafana, Loki, Promtail, and Alertmanager. Integrated Cert-Manager and NGINX Ingress for SSL and traffic routing.",
  icon: "BoltIcon"
  },
  {
    year: "2025",
    title: "DevOps Engineer",
    description: "Currently working at Xgrowth as a DevOps Engineer, leading scalable infrastructure setups, cost optimization, Kubernetes enhancements, and automation improvements across the organization.",
    icon: "TrophyIcon",
    highlight: true
  }];


  const testimonialsData = [
  {
    id: 1,
    name: "Mayank Jha",
    position: "Senior Devops Engineer",
    company: "Self Project",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13d7f1b79-1762274020857.png",
    avatarAlt: "Professional headshot of middle-aged Indian man with glasses in business attire",
    content: "Vishal's DevOps expertise transformed our infrastructure completely. The 55% cost reduction he achieved while maintaining 99.9% uptime is remarkable. His automation solutions revolutionized our deployment processes.",
    rating: 4,
    project: "Cloud Migration"
  },
  // {
  //   id: 2,
  //   name: "Priya Sharma",
  //   position: "Engineering Manager",
  //   company: "InnovateTech Systems",
  //   avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_197273911-1762249066359.png",
  //   avatarAlt: "Professional portrait of young Indian woman with long dark hair in corporate setting",
  //   content: "Working with Vishal was exceptional. His multi-cloud expertise and performance optimization skills delivered 60% faster applications. He\'s a true DevOps architect who thinks beyond just maintenance.",
  //   rating: 5,
  //   project: "Performance Optimization"
  // },
  // {
  //   id: 3,
  //   name: "Amit Patel",
  //   position: "Lead Developer",
  //   company: "StartupHub Technologies",
  //   avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3cd52ab-1762249032403.png",
  //   avatarAlt: "Casual portrait of young Indian man with beard in modern office environment",
  //   content: "Vishal's learning agility and problem-solving approach impressed everyone. Even as a junior engineer, he automated 50% of our manual processes and eliminated deployment errors completely.",
  //   rating: 5,
  //   project: "CI/CD Implementation"
  // }
];


  const handleToggleExpand = (id: number) => {
    if (!isHydrated) return;

    setExpandedItems((prev) =>
    prev.includes(id) ?
    prev.filter((item) => item !== id) :
    [...prev, id]
    );
  };

  const handleNextTestimonial = () => {
    if (!isHydrated) return;

    setCurrentTestimonial((prev) =>
    prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const handlePreviousTestimonial = () => {
    if (!isHydrated) return;

    setCurrentTestimonial((prev) =>
    prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) =>
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
              )}
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) =>
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="space-y-16">
      {/* Experience Stats */}
      <section>
        <ExperienceStats stats={statsData} />
      </section>

      {/* Experience Timeline */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey from maintaining systems to revolutionizing infrastructure with quantified achievements and measurable impact
          </p>
        </div>
        
        <ExperienceTimeline
          experiences={experienceData}
          expandedItems={expandedItems}
          onToggleExpand={handleToggleExpand} />

      </section>

      {/* Career Journey & Testimonials Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CareerJourney milestones={journeyMilestones} />
        <TestimonialsSection
          testimonials={testimonialsData}
          currentTestimonial={currentTestimonial}
          onNext={handleNextTestimonial}
          onPrevious={handlePreviousTestimonial} />

      </section>
    </div>);

};

export default ExperienceInteractive;