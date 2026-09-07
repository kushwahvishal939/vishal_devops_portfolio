'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import MCPArchitecture from './MCPArchitecture';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MCPShowcaseProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TOOL_CATEGORIES = [
  { label: 'Database', count: 17, icon: 'CircleStackIcon', color: '#3b82f6' },
  { label: 'Logs', count: 8, icon: 'DocumentTextIcon', color: '#22c55e' },
  { label: 'Kubernetes', count: 7, icon: 'CubeIcon', color: '#a855f7' },
  { label: 'Prometheus', count: 5, icon: 'ChartBarIcon', color: '#f59e0b' },
  { label: 'Intelligence', count: 5, icon: 'SparklesIcon', color: '#f59e0b' },
  { label: 'Knowledge Graph', count: 4, icon: 'ShareIcon', color: '#22c55e' },
  { label: 'Alerts', count: 4, icon: 'BellAlertIcon', color: '#ef4444' },
  { label: 'Meta', count: 2, icon: 'CogIcon', color: '#666' },
];

const KEY_FEATURES = [
  {
    title: 'Natural Language Operations',
    desc: 'Ask "why is prod slow?" and get a full investigation with root cause analysis, not just raw metrics.',
  },
  {
    title: 'Cross-System Correlation',
    desc: 'Automatically correlates database slow queries with pod restarts, deployment events, and error spikes.',
  },
  {
    title: 'Incident Memory',
    desc: '3-layer memory system remembers past incidents. When similar patterns emerge, it recalls prior root causes.',
  },
  {
    title: 'Security-First Design',
    desc: 'Google SSO with domain restriction, OAuth2 proxy, TLS everywhere, rate limiting. 10/10 audit score.',
  },
];

const SECURITY_HIGHLIGHTS = [
  'OAuth2 Proxy with Google SSO (@rdash.io domain lock)',
  'TLS termination at NGINX ingress',
  'Per-user rate limiting and request size caps',
  'Read-only database connections (no mutation)',
  'Kubernetes RBAC with scoped service accounts',
  'No secrets in code -- HashiCorp Vault integration',
];

const TERMINAL_EXAMPLE = `$ claude

> Why is the checkout service slow in production?

Investigating checkout-service in prod namespace...

[1/4] Querying Prometheus for latency metrics...
  - p99 latency: 4.2s (normal: 800ms)
  - Spike started: 14:23 UTC

[2/4] Checking PostgreSQL for slow queries...
  - Found: SELECT * FROM orders JOIN inventory...
  - Duration: 3.8s (missing index on inventory.sku)

[3/4] Checking Kubernetes pod health...
  - checkout-service-7d4f8b: 3 OOMKill restarts
  - Memory limit: 512Mi, actual usage: 498Mi

[4/4] Searching incident memory...
  - Similar incident: 2024-11-15 (same query, same fix)
  - Resolution: Added composite index + bumped memory to 1Gi

Root Cause: Missing index on inventory.sku causing full
table scan under Black Friday traffic load.

Suggested Fix:
  CREATE INDEX idx_inventory_sku ON inventory(sku);
  kubectl set resources deploy/checkout-service \\
    -c checkout --limits=memory=1Gi`;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ImpactCard({
  before,
  after,
  label,
  color,
  index,
}: {
  before: string;
  after: string;
  label: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      className="border border-[#222] bg-[#111] p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="text-[10px] text-[#444] uppercase tracking-wider mb-3">{label}</div>
      <div className="flex items-center gap-3">
        <span className="text-[#666] text-xs line-through">{before}</span>
        <span className="text-[#333]">-&gt;</span>
        <span className="text-sm font-bold" style={{ color }}>
          {after}
        </span>
      </div>
    </motion.div>
  );
}

function ToolCategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#222]">
      {TOOL_CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.label}
          className="bg-[#0d0d0d] p-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Icon name={cat.icon} size={14} style={{ color: cat.color }} />
            <span className="text-[11px] text-[#888]">{cat.label}</span>
          </div>
          <div className="text-lg font-bold" style={{ color: cat.color }}>
            {cat.count}
          </div>
          <div className="text-[9px] text-[#333] uppercase tracking-wider">tools</div>
        </motion.div>
      ))}
    </div>
  );
}

function TerminalBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border border-[#222] bg-[#0a0a0a]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#ef4444]" />
          <span className="w-2 h-2 bg-[#f59e0b]" />
          <span className="w-2 h-2 bg-[#22c55e]" />
          <span className="text-[10px] text-[#444] ml-2">terminal -- mcp_demo.sh</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-[10px] text-[#444] hover:text-[#e0e0e0] transition-colors duration-100"
          aria-label="Copy terminal output"
        >
          {copied ? '[copied]' : '[copy]'}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-[11px] leading-relaxed text-[#888] whitespace-pre font-mono">
          {code.split('\n').map((line, i) => {
            let lineColor = '#888';
            if (line.startsWith('$') || line.startsWith('>')) lineColor = '#e0e0e0';
            else if (line.startsWith('  -')) lineColor = '#666';
            else if (line.includes('Root Cause:')) lineColor = '#ef4444';
            else if (line.includes('Suggested Fix:')) lineColor = '#22c55e';
            else if (line.match(/^\[[\d/]+\]/)) lineColor = '#f59e0b';
            else if (line.includes('Similar incident:')) lineColor = '#a855f7';
            else if (line.includes('Resolution:')) lineColor = '#22c55e';

            return (
              <div key={i} style={{ color: lineColor }}>
                {line || '\u00A0'}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function MCPShowcase({ className = '' }: MCPShowcaseProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={`font-mono ${className}`}
      aria-label="DevOps AI Assistant MCP Project Showcase"
    >
      {/* ================================================================= */}
      {/* HERO HEADER                                                       */}
      {/* ================================================================= */}
      <ScrollReveal direction="up">
        <div className="border border-[#222] bg-[#111] mb-8">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f59e0b]" />
              <span className="text-[10px] uppercase tracking-widest text-[#666]">
                featured_project
              </span>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[10px] text-[#666] hover:text-[#f59e0b] transition-colors duration-100"
              aria-label="View project on GitHub"
            >
              <Icon name="CodeBracketIcon" size={12} />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="CpuChipIcon" size={20} className="text-[#f59e0b]" />
              <div className="text-[10px] text-[#22c55e] uppercase tracking-wider">production</div>
            </div>

            <h2 className="text-[#e0e0e0] text-xl lg:text-2xl font-bold mb-3 leading-tight">
              DevOps AI Assistant (MCP Server)
            </h2>

            <p className="text-[#888] text-sm leading-relaxed max-w-3xl mb-6">
              Connected production infrastructure to Claude AI -- 30 min investigations now take
              under 1 minute. A Model Context Protocol server that gives AI direct, read-only access
              to PostgreSQL, Loki, Kubernetes, Prometheus, and a 3-layer incident memory system.
            </p>

            {/* Impact numbers row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
              <ImpactCard
                before="30-60 min"
                after="<1 min"
                label="investigation_time"
                color="#f59e0b"
                index={0}
              />
              <ImpactCard
                before="manual"
                after="54 tools"
                label="monitoring_coverage"
                color="#3b82f6"
                index={1}
              />
              <ImpactCard
                before="1 database"
                after="7 databases"
                label="simultaneous_monitoring"
                color="#a855f7"
                index={2}
              />
              <ImpactCard
                before="no memory"
                after="3-layer"
                label="incident_memory"
                color="#22c55e"
                index={3}
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* PROBLEM -> SOLUTION -> IMPACT                                     */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#222] mb-8">
          {/* Problem */}
          <div className="bg-[#0d0d0d] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#ef4444] text-xs font-bold">!!</span>
              <span className="text-[11px] uppercase tracking-wider text-[#666]">problem</span>
            </div>
            <ul className="space-y-3">
              {[
                'DevOps engineers manually SSH into servers, run queries, check dashboards across 5+ tools',
                'Incident investigation takes 30-60 minutes of context switching',
                'No memory of past incidents -- same problems get re-investigated from scratch',
                "Knowledge siloed in individual engineers' heads",
              ].map((item, i) => (
                <li key={i} className="text-[11px] text-[#666] flex items-start gap-2">
                  <span className="text-[#ef4444] mt-px shrink-0">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-[#0d0d0d] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#f59e0b] text-xs font-bold">-&gt;</span>
              <span className="text-[11px] uppercase tracking-wider text-[#666]">solution</span>
            </div>
            <ul className="space-y-3">
              {[
                'MCP server gives Claude AI direct read-only access to all infrastructure',
                'Natural language queries replace manual tool switching',
                'Automated cross-system correlation finds root causes instantly',
                '3-layer memory system remembers and learns from every incident',
              ].map((item, i) => (
                <li key={i} className="text-[11px] text-[#666] flex items-start gap-2">
                  <span className="text-[#f59e0b] mt-px shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-[#0d0d0d] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#22c55e] text-xs font-bold">[ok]</span>
              <span className="text-[11px] uppercase tracking-wider text-[#666]">impact</span>
            </div>
            <ul className="space-y-3">
              {[
                '30x faster incident investigation (30 min to <1 min)',
                '54 tools accessible through natural language',
                'Institutional knowledge preserved in graph database',
                '10/10 security audit -- production-safe from day one',
              ].map((item, i) => (
                <li key={i} className="text-[11px] text-[#666] flex items-start gap-2">
                  <span className="text-[#22c55e] mt-px shrink-0">*</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* TOOL CATEGORIES                                                   */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#f59e0b] text-xs">$</span>
            <span className="text-[11px] text-[#666]">mcp --list-tools --group-by=category</span>
          </div>
          <ToolCategoryGrid />
          <div className="text-[10px] text-[#333] mt-2 text-right">
            total: 52 registered + 2 meta = 54 tools
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* ARCHITECTURE DIAGRAM                                              */}
      {/* ================================================================= */}
      <div className="mb-8">
        <MCPArchitecture />
      </div>

      {/* ================================================================= */}
      {/* KEY FEATURES                                                      */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#f59e0b] text-xs">$</span>
            <span className="text-[11px] text-[#666]">cat features.md</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#222]">
            {KEY_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-[#0d0d0d] p-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center border border-[#f59e0b40] text-[#f59e0b] text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-[#e0e0e0] text-xs font-bold mb-1.5">{feature.title}</h4>
                    <p className="text-[11px] text-[#666] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* TERMINAL DEMO                                                     */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#f59e0b] text-xs">$</span>
            <span className="text-[11px] text-[#666]">cat example_session.log</span>
          </div>
          <TerminalBlock code={TERMINAL_EXAMPLE} />
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* SECURITY                                                          */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-8">
          <button
            onClick={() => toggleSection('security')}
            className="w-full flex items-center justify-between px-4 py-3 border border-[#222] bg-[#111] hover:border-[#333] transition-colors duration-100 text-left"
            aria-expanded={expandedSection === 'security'}
          >
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={14} className="text-[#22c55e]" />
              <span className="text-[#e0e0e0] text-xs font-bold">Security Posture</span>
              <span className="text-[10px] text-[#22c55e] border border-[#22c55e40] px-1.5 py-0.5">
                10/10
              </span>
            </div>
            <span className="text-[#666] text-xs">
              {expandedSection === 'security' ? '[-]' : '[+]'}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {expandedSection === 'security' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="border border-t-0 border-[#222] bg-[#0d0d0d] p-4">
                  <ul className="space-y-2">
                    {SECURITY_HIGHLIGHTS.map((item, i) => (
                      <li key={i} className="text-[11px] text-[#666] flex items-start gap-2">
                        <Icon
                          name="CheckIcon"
                          size={12}
                          className="text-[#22c55e] mt-px shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* FOOTER CTA                                                        */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#f59e0b] text-[#0a0a0a] text-xs font-bold hover:bg-[#d97706] transition-colors duration-100"
            aria-label="View DevOps MCP project on GitHub"
          >
            <Icon name="CodeBracketIcon" size={14} />
            <span>View on GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[#222] text-[#e0e0e0] text-xs hover:border-[#444] transition-colors duration-100"
            aria-label="Read the technical write-up"
          >
            <Icon name="DocumentTextIcon" size={14} />
            <span>Technical Write-up</span>
          </a>
          <div className="flex-1" />
          <div className="text-[10px] text-[#333] text-right">
            Python / FastAPI / SSE / K8s / PostgreSQL / Loki / Prometheus
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
