'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

interface InteractiveTerminalProps {
  className?: string;
}

const START_DATE = new Date('2025-12-01T00:00:00');

const SKILLS_DATA = [
  { name: 'Kubernetes', level: 95, category: 'Container Orchestration' },
  { name: 'AWS', level: 92, category: 'Cloud Platform' },
  { name: 'Docker', level: 90, category: 'Containerization' },
  { name: 'Terraform', level: 88, category: 'Infrastructure as Code' },
  { name: 'Ansible', level: 87, category: 'Configuration Management' },
  { name: 'Jenkins', level: 85, category: 'CI/CD' },
  { name: 'Prometheus', level: 85, category: 'Monitoring' },
  { name: 'Grafana', level: 84, category: 'Observability' },
  { name: 'Helm', level: 87, category: 'Package Manager' },
  { name: 'ArgoCD', level: 83, category: 'GitOps' },
  { name: 'Linux', level: 90, category: 'Operating System' },
  { name: 'Python', level: 80, category: 'Scripting' },
  { name: 'Bash', level: 88, category: 'Shell Scripting' },
  { name: 'Git', level: 90, category: 'Version Control' },
  { name: 'Azure', level: 82, category: 'Cloud Platform' },
  { name: 'GCP', level: 78, category: 'Cloud Platform' },
];

const CERTS = [
  { name: 'AZ-400: Azure DevOps Engineer Expert', issuer: 'Microsoft', date: 'July 2023' },
  { name: 'AWS Solutions Architect - Associate', issuer: 'AWS', date: 'Aug 2024' },
  { name: 'AWS Solutions Architect - Professional', issuer: 'AWS', date: 'Aug 2026' },
  { name: 'Google Cloud Gemini for DevOps', issuer: 'Google Cloud', date: 'Sept 2025' },
  { name: 'Cisco Network Automation Essentials', issuer: 'Cisco', date: 'Oct 2025' },
];

const PROJECTS = [
  {
    name: 'Multi-Cloud Infrastructure Optimization',
    desc: 'Reduced cloud costs by 55%, achieved 99.9% uptime across AWS/Azure',
    tech: 'AWS, Azure, Kubernetes, Terraform, Prometheus',
  },
  {
    name: 'CI/CD Pipeline Automation Suite',
    desc: '94% reduction in deployment time, automated testing and security scanning',
    tech: 'Jenkins, GitLab CI, Docker, SonarQube, Helm',
  },
  {
    name: 'Kubernetes Cluster Management',
    desc: '45% cost reduction, 99.95% uptime with auto-scaling and monitoring',
    tech: 'Kubernetes, ArgoCD, Prometheus, Cert-Manager',
  },
  {
    name: 'Infrastructure Cost Optimization Engine',
    desc: 'Saved Rs.3.2L annually through automated resource rightsizing',
    tech: 'Python, AWS Cost Explorer, Lambda, CloudWatch',
  },
  {
    name: 'Microservices Security Framework',
    desc: '90% security incident reduction, 100% compliance score',
    tech: 'Istio, Falco, OPA, Vault, OWASP ZAP',
  },
  {
    name: 'Real-time Monitoring & Observability Stack',
    desc: '75% MTTR reduction, 99.99% monitoring uptime',
    tech: 'Prometheus, Grafana, Jaeger, ELK Stack, OpenTelemetry',
  },
];

function buildAsciiBar(level: number): string {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  return `[${'#'.repeat(filled)}${'-'.repeat(empty)}] ${level}%`;
}

function formatUptime(): string {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `System uptime: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const VALID_PAGES = ['about', 'skills', 'experience', 'portfolio', 'contact', 'homepage'];

// --- Natural language intent matching ---

function matchesAny(input: string, keywords: string[]): boolean {
  return keywords.some((kw) => input.includes(kw));
}

function detectIntent(
  input: string
):
  | 'help'
  | 'whoami'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'contact'
  | 'certs'
  | 'uptime'
  | 'resume'
  | 'about'
  | 'education'
  | 'location'
  | 'salary'
  | 'availability'
  | 'tools'
  | 'achievements'
  | 'why_hire'
  | null {
  const q = input
    .toLowerCase()
    .replace(/[?!.,]/g, '')
    .trim();

  // Help
  if (
    matchesAny(q, [
      'help',
      'commands',
      'what can i',
      'what can you',
      'how to use',
      'guide',
      'menu',
      'options',
    ])
  )
    return 'help';

  // Who / About / Intro
  if (
    matchesAny(q, [
      'who are you',
      'who is vishal',
      'whoami',
      'introduce',
      'yourself',
      'tell me about you',
      'about vishal',
      'what do you do',
      'what you do',
      'your role',
      'your name',
      'your designation',
      'your title',
      'your position',
    ])
  )
    return 'whoami';

  // About page / personal
  if (matchesAny(q, ['about', 'background', 'bio', 'summary', 'profile', 'overview']))
    return 'about';

  // Education
  if (
    matchesAny(q, [
      'education',
      'degree',
      'college',
      'university',
      'btech',
      'b.tech',
      'qualification',
      'studied',
      'school',
    ])
  )
    return 'education';

  // Skills / Tech stack
  if (
    matchesAny(q, [
      'skill',
      'tech stack',
      'technology',
      'technologies',
      'tools you use',
      'tools you know',
      'what tools',
      'proficiency',
      'expertise',
      'good at',
      'strong in',
      'specializ',
      'technical',
    ])
  )
    return 'skills';

  // Tools specifically
  if (
    matchesAny(q, [
      'tools',
      'software',
      'platforms',
      'which cloud',
      'which tool',
      'devops tools',
      'monitoring tools',
      'ci/cd tools',
      'cicd',
    ])
  )
    return 'tools';

  // Experience / Work
  if (
    matchesAny(q, [
      'experience',
      'work history',
      'work experience',
      'current job',
      'current company',
      'current role',
      'where do you work',
      'where are you working',
      'company',
      'employer',
      'rdash',
      'xgrowth',
      'previous job',
      'career',
      'job history',
      'years of experience',
      'how long',
      'how many years',
    ])
  )
    return 'experience';

  // Projects
  if (
    matchesAny(q, [
      'project',
      'portfolio',
      'what have you built',
      'what did you build',
      'case study',
      'work sample',
      'showcase',
    ])
  )
    return 'projects';

  // Certifications
  if (
    matchesAny(q, [
      'cert',
      'certification',
      'certified',
      'aws cert',
      'azure cert',
      'credential',
      'license',
      'accredit',
    ])
  )
    return 'certs';

  // Contact
  if (
    matchesAny(q, [
      'contact',
      'email',
      'phone',
      'reach',
      'linkedin',
      'hire',
      'connect',
      'get in touch',
      'call',
      'message',
      'whatsapp',
    ])
  )
    return 'contact';

  // Resume / CV
  if (matchesAny(q, ['resume', 'cv', 'download', 'pdf'])) return 'resume';

  // Uptime
  if (matchesAny(q, ['uptime', 'how long running', 'server time', 'system time'])) return 'uptime';

  // Achievements / Impact
  if (
    matchesAny(q, [
      'achievement',
      'impact',
      'result',
      'accomplish',
      'metric',
      'stats',
      'cost saving',
      'cost reduction',
      'saved',
      'reduced',
      'improved',
      'performance',
      'kpi',
    ])
  )
    return 'achievements';

  // Location
  if (
    matchesAny(q, [
      'location',
      'where are you',
      'based',
      'city',
      'country',
      'india',
      'remote',
      'onsite',
      'office',
      'timezone',
    ])
  )
    return 'location';

  // Availability / Salary
  if (
    matchesAny(q, [
      'available',
      'availability',
      'free',
      'open to',
      'looking for',
      'freelance',
      'contract',
      'full time',
      'part time',
      'notice period',
    ])
  )
    return 'availability';
  if (
    matchesAny(q, [
      'salary',
      'rate',
      'compensation',
      'pay',
      'ctc',
      'package',
      'pricing',
      'cost',
      'charge',
      'budget',
      'hourly',
    ])
  )
    return 'salary';

  // Why hire
  if (
    matchesAny(q, [
      'why hire',
      'why should',
      'why you',
      'what makes you',
      'why choose',
      'unique',
      'different',
      'stand out',
      'value',
      'strength',
    ])
  )
    return 'why_hire';

  return null;
}

function getIntentResponse(intent: string): string[] {
  switch (intent) {
    case 'about':
      return [
        '',
        '  Vishal Kushwah | Senior DevOps Engineer',
        '  ----------------------------------------',
        '  Cloud infrastructure specialist who transforms complex',
        '  systems into elegant, automated solutions.',
        '',
        '  2+ years of hands-on DevOps experience building',
        '  scalable infrastructure, CI/CD pipelines, and',
        '  cloud-native architectures for production systems.',
        '',
        '  Type "experience" for work history or "skills" for tech stack.',
        '',
      ];

    case 'education':
      return [
        '',
        '  EDUCATION',
        '  ---------',
        '  B.Tech in Civil Engineering',
        '  Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
        '  Graduated: 2020 | CGPA: 7.1/10',
        '',
        '  Career pivot to DevOps/Cloud in 2022.',
        '  Self-taught + certified in AWS, Azure, GCP.',
        '',
      ];

    case 'tools':
      return [
        '',
        '  DEVOPS TOOLCHAIN',
        '  ----------------',
        '  Cloud:        AWS, Azure, GCP',
        '  Containers:   Docker, Kubernetes, Helm',
        '  CI/CD:        Jenkins, GitLab CI, GitHub Actions, ArgoCD',
        '  IaC:          Terraform, Ansible, CloudFormation',
        '  Monitoring:   Prometheus, Grafana, ELK Stack, Jaeger',
        '  Security:     Trivy, Falco, OPA, Vault, OWASP ZAP',
        '  Scripting:    Bash, Python, YAML',
        '  OS:           Linux (Ubuntu, CentOS, Amazon Linux)',
        '  VCS:          Git, GitHub, GitLab',
        '',
      ];

    case 'achievements':
      return [
        '',
        '  KEY ACHIEVEMENTS',
        '  ----------------',
        '  + Reduced cloud costs from Rs.1.5L to Rs.65K/month (55% reduction)',
        '  + Cut deployment time by 40% (4 hours -> 15 minutes)',
        '  + Achieved 99.99% uptime across production clusters',
        '  + Managed 40+ microservices on multi-cluster Kubernetes',
        '  + Saved Rs.8.5L+ in total infrastructure costs',
        '  + Zero security incidents in production',
        '  + Automated 90% of manual infrastructure tasks',
        '',
      ];

    case 'location':
      return [
        '',
        '  LOCATION',
        '  --------',
        '  Based in India',
        '  Open to remote work globally',
        '  Flexible with timezones (IST, overlap with US/EU)',
        '  Available for on-site if required',
        '',
      ];

    case 'availability':
      return [
        '',
        '  AVAILABILITY',
        '  ------------',
        '  Status:       Available for new opportunities',
        '  Work type:    Full-time / Contract / Freelance',
        '  Start date:   Flexible (can discuss)',
        '  Response:     Within 24 hours',
        '  Timezone:     IST (flexible overlap)',
        '',
        '  Type "contact" to get in touch.',
        '',
      ];

    case 'salary':
      return [
        '',
        "  Let's discuss compensation based on the role scope.",
        "  I'm flexible and open to conversation.",
        '',
        '  Reach out: kushwahvishal939@gmail.com',
        '  Or type "contact" for all contact methods.',
        '',
      ];

    case 'why_hire':
      return [
        '',
        '  WHY HIRE VISHAL?',
        '  ----------------',
        '  + Proven cost optimizer: saved 55% on cloud infrastructure',
        '  + Full-stack DevOps: from CI/CD to monitoring to security',
        '  + 5 industry certifications (AWS, Azure, GCP, Cisco)',
        '  + Production-grade Kubernetes at scale (40+ microservices)',
        '  + Zero-downtime deployment track record',
        '  + Self-taught career pivoter -- fast learner, high adaptability',
        '  + Clean infrastructure-as-code with Terraform/Ansible',
        '',
        '  Type "projects" to see real impact or "contact" to connect.',
        '',
      ];

    default:
      return [];
  }
}

function processCommand(cmd: string, router: ReturnType<typeof useRouter>): string[] {
  const trimmed = cmd.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) return [];

  // --- Exact commands first ---

  if (lower === 'help') {
    return [
      'Available commands:',
      '',
      '  help            Show this help message',
      '  whoami          Who is vishal_kushwah?',
      '  skills          Technical skills breakdown',
      '  experience      Work experience timeline',
      '  projects        Featured projects (all 6)',
      '  contact         Contact information',
      '  certs           Certifications',
      '  uptime          System uptime counter',
      '  ls              List directory contents',
      '  cd <page>       Navigate to a page',
      '  cat resume.pdf  Download resume',
      '  clear           Clear the terminal',
      '',
      '  You can also ask questions naturally:',
      '  "what skills do you have?"',
      '  "where are you located?"',
      '  "why should I hire you?"',
      '  "what is your education?"',
      '',
    ];
  }

  if (lower === 'whoami') {
    return [
      '',
      '  vishal_kushwah // Senior DevOps Engineer',
      '  Cloud infrastructure specialist | Kubernetes expert',
      '  2+ years experience | 5 certifications | 50+ projects',
      '',
    ];
  }

  if (lower === 'skills') {
    const lines = ['', '  SKILL           PROFICIENCY'];
    lines.push('  ' + '-'.repeat(45));
    for (const skill of SKILLS_DATA) {
      const padded = skill.name.padEnd(16);
      lines.push(`  ${padded}${buildAsciiBar(skill.level)}`);
    }
    lines.push('');
    return lines;
  }

  if (lower === 'experience') {
    return [
      '',
      '  RDASH Technologies | DevOps Engineer',
      '  Dec 2025 - Present | Remote, Gurgaon',
      '  + Reduced cloud costs from Rs.1.5L to Rs.65K/month',
      '  + Achieved 99.99% uptime across production clusters',
      '  + Managed 40+ microservices on multi-cluster Kubernetes',
      '  + Implemented FinOps practices and autoscaling policies',
      '  Stack: AWS, Kubernetes, Terraform, ArgoCD, Helm, Prometheus',
      '',
      '  XGrowth Technologies | DevOps Engineer',
      '  Oct 2023 - Dec 2025 | Noida, India',
      '  + Built CI/CD pipelines reducing deployment time by 40%',
      '  + Implemented infrastructure-as-code with Terraform',
      '  + Migrated entire infrastructure to AWS with 99.9% uptime',
      '  + Automated server provisioning with Ansible',
      '  Stack: AWS, Docker, Jenkins, Terraform, Ansible, Prometheus',
      '',
    ];
  }

  if (lower === 'projects') {
    const lines = ['', '  PROJECTS (' + PROJECTS.length + ' total)', '  ' + '-'.repeat(50)];
    PROJECTS.forEach((p, i) => {
      lines.push(`  ${i + 1}. ${p.name}`);
      lines.push(`     ${p.desc}`);
      lines.push(`     Stack: ${p.tech}`);
      lines.push('');
    });
    return lines;
  }

  if (lower === 'contact') {
    return [
      '',
      '  CONTACT',
      '  -------',
      '  Email     kushwahvishal939@gmail.com',
      '  Phone     +91 8357862782',
      '  LinkedIn  linkedin.com/in/vishalkushwah939',
      '  Response  Within 24 hours',
      '',
      '  Type "cd contact" to visit the contact page.',
      '',
    ];
  }

  if (lower === 'certifications' || lower === 'certs') {
    const lines = ['', '  CERTIFICATIONS', '  ' + '-'.repeat(40)];
    CERTS.forEach((c) => {
      lines.push(`  [${c.date}] ${c.name}`);
      lines.push(`           Issuer: ${c.issuer}`);
    });
    lines.push('');
    return lines;
  }

  if (lower === 'uptime') {
    return [formatUptime()];
  }

  if (lower === 'cat resume.pdf') {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = 'https://hostile-ivory-nd1qhsn9.edgeone.dev/';
      link.download = 'vishal_kushwah_resume.pdf';
      link.click();
    }
    return ['Downloading resume...'];
  }

  if (lower === 'ls') {
    return ['about/  skills/  experience/  portfolio/  contact/  resume.pdf'];
  }

  if (lower.startsWith('cd ')) {
    const target = lower.replace('cd ', '').trim().replace(/\//g, '');
    if (VALID_PAGES.includes(target)) {
      setTimeout(() => router.push(`/${target}`), 500);
      return [`Navigating to /${target}...`];
    }
    return [`bash: cd: ${target}: No such file or directory`];
  }

  if (lower === 'clear') {
    return ['__CLEAR__'];
  }

  // --- Natural language matching ---
  const intent = detectIntent(lower);
  if (intent) {
    // Some intents map directly to commands
    if (intent === 'help') return processCommand('help', router);
    if (intent === 'whoami') return processCommand('whoami', router);
    if (intent === 'skills') return processCommand('skills', router);
    if (intent === 'experience') return processCommand('experience', router);
    if (intent === 'projects') return processCommand('projects', router);
    if (intent === 'contact') return processCommand('contact', router);
    if (intent === 'certs') return processCommand('certs', router);
    if (intent === 'uptime') return processCommand('uptime', router);
    if (intent === 'resume') return processCommand('cat resume.pdf', router);

    // Custom responses
    const response = getIntentResponse(intent);
    if (response.length > 0) return response;
  }

  // --- Fallback ---
  return [
    `  Command not recognized: "${trimmed}"`,
    '',
    '  Try one of these:',
    '  - Type "help" for all commands',
    '  - Ask a question like "what are your skills?"',
    '  - Or try: whoami, skills, experience, projects, contact, certs',
    '',
  ];
}

const WELCOME_LINES: TerminalLine[] = [
  { type: 'output', content: '' },
  { type: 'output', content: "  Welcome to vishal_kushwah's portfolio terminal." },
  { type: 'output', content: '' },
  { type: 'output', content: "  Type 'help' for commands, or ask any question:" },
  { type: 'output', content: '  "what skills do you have?" | "tell me about yourself"' },
  { type: 'output', content: '  "current experience" | "why should I hire you?"' },
  { type: 'output', content: '' },
];

const InteractiveTerminal = ({ className = '' }: InteractiveTerminalProps) => {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    const cmd = input.trim();
    const inputLine: TerminalLine = { type: 'input', content: cmd };

    if (cmd) {
      setCommandHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);

    const result = processCommand(cmd, router);

    if (result.length === 1 && result[0] === '__CLEAR__') {
      setLines([]);
      setInput('');
      return;
    }

    const outputLines: TerminalLine[] = result.map((content) => ({
      type: 'output' as const,
      content,
    }));

    setLines((prev) => [...prev, inputLine, ...outputLines]);
    setInput('');
  }, [input, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    },
    [handleSubmit, commandHistory, historyIndex]
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const isErrorLine = (content: string) => content.includes('Command not recognized');

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#222] bg-[#111] font-mono text-sm">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#0a0a0a]">
            <span className="w-2.5 h-2.5 bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 bg-[#28c840]" />
            <span className="ml-4 text-[#666] text-xs select-none">~/vishal_kushwah -- bash</span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto p-4 bg-[#0a0a0a] cursor-text"
            onClick={focusInput}
          >
            {lines.map((line, i) => (
              <div key={i} className="leading-6 whitespace-pre-wrap break-all">
                {line.type === 'input' ? (
                  <span>
                    <span className="text-[#f59e0b]">$ </span>
                    <span className="text-[#e0e0e0]">{line.content}</span>
                  </span>
                ) : (
                  <span className={isErrorLine(line.content) ? 'text-[#f59e0b]' : 'text-[#e0e0e0]'}>
                    {line.content}
                  </span>
                )}
              </div>
            ))}

            {/* Active input line */}
            <div className="flex items-center leading-6">
              <span className="text-[#f59e0b] shrink-0">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-[#e0e0e0] outline-none border-none caret-[#f59e0b] font-mono text-sm"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTerminal;
