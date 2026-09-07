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
  { name: 'Kubernetes', level: 95 },
  { name: 'AWS', level: 92 },
  { name: 'Docker', level: 90 },
  { name: 'Terraform', level: 88 },
  { name: 'Ansible', level: 87 },
  { name: 'Jenkins', level: 85 },
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

const VALID_PAGES = ['about', 'skills', 'experience', 'portfolio', 'contact'];

function processCommand(cmd: string, router: ReturnType<typeof useRouter>): string[] {
  const trimmed = cmd.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) return [];

  if (lower === 'help') {
    return [
      'Available commands:',
      '',
      '  help            Show this help message',
      '  whoami          Who is vishal_kushwah?',
      '  skills          Technical skills breakdown',
      '  experience      Work experience timeline',
      '  projects        Featured projects',
      '  contact         Contact information',
      '  certs           Certifications',
      '  uptime          System uptime counter',
      '  ls              List directory contents',
      '  cd <page>       Navigate to a page',
      '  cat resume.pdf  Download resume',
      '  clear           Clear the terminal',
    ];
  }

  if (lower === 'whoami') {
    return ['vishal_kushwah // Senior DevOps Engineer'];
  }

  if (lower === 'skills') {
    const lines = ['', '  SKILL           PROFICIENCY', '  ----           -----------'];
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
      '  Dec 2025 - Present',
      '  - Reduced cloud costs from Rs.1.5L to Rs.65K/month',
      '  - Achieved 100% uptime across production clusters',
      '  - Managed 40+ microservices on Kubernetes',
      '',
      '  XGrowth Technologies | DevOps Engineer',
      '  Oct 2023 - Dec 2025',
      '  - Built CI/CD pipelines reducing deployment time by 40%',
      '  - Implemented infrastructure-as-code with Terraform',
      '  - Automated server provisioning with Ansible',
      '',
    ];
  }

  if (lower === 'projects') {
    return [
      '',
      '  1. k8s-cost-optimizer    Kubernetes cost optimization reducing cloud spend by 57%',
      '  2. ci-cd-pipeline        Automated CI/CD pipeline with Jenkins, Docker, and K8s',
      '  3. infra-as-code         Terraform modules for multi-cloud infrastructure',
      '',
    ];
  }

  if (lower === 'contact') {
    return [
      '',
      '  Email     kushwahvishal939@gmail.com',
      '  Phone     +91 8357862782',
      '  LinkedIn  linkedin.com/in/vishalkushwah',
      '',
    ];
  }

  if (lower === 'certifications' || lower === 'certs') {
    return [
      '',
      '  - AZ-400: Azure DevOps Engineer Expert',
      '  - AWS Solutions Architect - Associate',
      '  - AWS Solutions Architect - Professional',
      '  - Google Cloud Gemini Certification',
      '  - Cisco Networking Certification',
      '',
    ];
  }

  if (lower === 'uptime') {
    return [formatUptime()];
  }

  if (lower === 'cat resume.pdf') {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
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

  return [`bash: ${trimmed}: command not found`];
}

const WELCOME_LINES: TerminalLine[] = [
  { type: 'output', content: "Welcome to vishal_kushwah's portfolio terminal." },
  { type: 'output', content: "Type 'help' for available commands." },
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

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus on mount
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

  const isErrorLine = (content: string) =>
    content.startsWith('bash:') && content.includes('command not found');

  const isNavLine = (content: string) =>
    content.startsWith('bash: cd:') && content.includes('No such file');

  return (
    <div className={`border border-[#222] bg-[#111] font-mono text-sm ${className}`}>
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
        className="h-[400px] overflow-y-auto p-4 bg-[#0a0a0a] cursor-text"
        onClick={focusInput}
      >
        {/* Rendered lines */}
        {lines.map((line, i) => (
          <div key={i} className="leading-6 whitespace-pre-wrap break-all">
            {line.type === 'input' ? (
              <span>
                <span className="text-[#f59e0b]">$ </span>
                <span className="text-[#e0e0e0]">{line.content}</span>
              </span>
            ) : (
              <span
                className={
                  isErrorLine(line.content) || isNavLine(line.content)
                    ? 'text-red-500'
                    : 'text-[#e0e0e0]'
                }
              >
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
  );
};

export default InteractiveTerminal;
