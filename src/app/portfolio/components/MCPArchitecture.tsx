'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
  tools?: number;
  details: string[];
}

interface MCPArchitectureProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INGRESS_NODES: ArchNode[] = [
  {
    id: 'users',
    label: 'Users',
    sublabel: 'Claude CLI / Desktop / Browser',
    icon: 'UserGroupIcon',
    color: '#e0e0e0',
    details: [
      'Claude CLI (terminal)',
      'Claude Desktop (macOS/Win)',
      'Browser-based clients',
      'SSE streaming transport',
    ],
  },
  {
    id: 'ingress',
    label: 'NGINX Ingress',
    sublabel: 'TLS + Rate Limit + Auth',
    icon: 'ShieldCheckIcon',
    color: '#3b82f6',
    details: [
      "TLS termination (Let's Encrypt)",
      'Rate limiting per-user',
      'Request size limits',
      'CORS + security headers',
    ],
  },
  {
    id: 'oauth',
    label: 'OAuth2 Proxy',
    sublabel: 'Google SSO (@rdash.io)',
    icon: 'LockClosedIcon',
    color: '#a855f7',
    details: [
      'Google Workspace SSO',
      '@rdash.io domain restriction',
      'Session cookie management',
      'Token refresh handling',
    ],
  },
  {
    id: 'mcp',
    label: 'MCP Server',
    sublabel: 'Python / SSE / 54 tools',
    icon: 'CpuChipIcon',
    color: '#f59e0b',
    details: [
      'Python FastAPI runtime',
      'SSE transport layer',
      '54 registered tools',
      'Async request handling',
    ],
  },
];

const BACKEND_NODES: ArchNode[] = [
  {
    id: 'postgres',
    label: 'PostgreSQL',
    sublabel: '7 databases',
    icon: 'CircleStackIcon',
    color: '#3b82f6',
    tools: 17,
    details: [
      'Health checks & slow queries',
      'Connection pool monitoring',
      'Table bloat & vacuum stats',
      'Index usage analysis',
    ],
  },
  {
    id: 'loki',
    label: 'Loki Logs',
    sublabel: 'Centralized logging',
    icon: 'DocumentTextIcon',
    color: '#22c55e',
    tools: 8,
    details: [
      'Pod log search',
      'Error summary aggregation',
      'Request tracing by ID',
      'Django ORM query logs',
    ],
  },
  {
    id: 'k8s',
    label: 'Kubernetes',
    sublabel: '8 namespaces',
    icon: 'CubeIcon',
    color: '#a855f7',
    tools: 7,
    details: [
      'Pod health & events',
      'Deployment status',
      'HPA scaling metrics',
      'Node resource usage',
    ],
  },
  {
    id: 'prometheus',
    label: 'Prometheus',
    sublabel: 'Metrics engine',
    icon: 'ChartBarIcon',
    color: '#f59e0b',
    tools: 5,
    details: [
      'CPU & memory trends',
      'HTTP request metrics',
      'Cluster summary',
      'Custom PromQL queries',
    ],
  },
];

const MEMORY_LAYERS: ArchNode[] = [
  {
    id: 'redis',
    label: 'Redis',
    sublabel: 'Layer 1 -- 24h TTL',
    icon: 'BoltIcon',
    color: '#ef4444',
    details: [
      'Fast context cache',
      'Session state storage',
      '24-hour TTL expiry',
      'Sub-ms read latency',
    ],
  },
  {
    id: 'qdrant',
    label: 'Qdrant',
    sublabel: 'Layer 2 -- Permanent',
    icon: 'MagnifyingGlassIcon',
    color: '#3b82f6',
    details: [
      'Vector embeddings',
      'Semantic similarity search',
      'Permanent storage',
      'Incident pattern matching',
    ],
  },
  {
    id: 'neo4j',
    label: 'Neo4j',
    sublabel: 'Layer 3 -- Permanent',
    icon: 'ShareIcon',
    color: '#22c55e',
    details: [
      'Knowledge graph',
      'Causal memory chains',
      'Root cause analysis',
      'Incident relationships',
    ],
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function NodeCard({
  node,
  isActive,
  onHover,
  onLeave,
  index,
  compact,
}: {
  node: ArchNode;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div
        className={`border bg-[#111] font-mono cursor-default transition-colors duration-100 ${
          isActive ? 'border-[#444]' : 'border-[#222]'
        } ${compact ? 'p-3' : 'p-4'}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        role="button"
        tabIndex={0}
        aria-label={`${node.label}: ${node.sublabel}`}
        onFocus={onHover}
        onBlur={onLeave}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 flex items-center justify-center" style={{ color: node.color }}>
            <Icon name={node.icon} size={16} />
          </div>
          <span className="text-[#e0e0e0] text-xs font-bold leading-none">{node.label}</span>
          {node.tools !== undefined && (
            <span
              className="ml-auto text-[10px] px-1.5 py-0.5 border font-bold"
              style={{
                color: node.color,
                borderColor: node.color + '40',
                backgroundColor: node.color + '10',
              }}
            >
              {node.tools} tools
            </span>
          )}
        </div>

        {/* Sublabel */}
        {node.sublabel && (
          <div className="text-[10px] text-[#444] leading-tight">{node.sublabel}</div>
        )}
      </div>

      {/* Tooltip */}
      {isActive && (
        <motion.div
          className="absolute z-50 left-0 right-0 mt-1 bg-[#0d0d0d] border border-[#333] p-3 font-mono"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.12 }}
        >
          <div className="text-[10px] text-[#666] uppercase tracking-wider mb-2">
            {`${node.label} // details`}
          </div>
          <ul className="space-y-1">
            {node.details.map((detail, i) => (
              <li key={i} className="text-[11px] text-[#888] flex items-start gap-1.5">
                <span style={{ color: node.color }} className="mt-px shrink-0">
                  -
                </span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

function FlowConnector({
  direction,
  color,
  animated,
}: {
  direction: 'horizontal' | 'vertical';
  color: string;
  animated: boolean;
}) {
  if (!animated) {
    return (
      <div
        className={`${
          direction === 'horizontal' ? 'w-6 h-px self-center shrink-0' : 'h-6 w-px mx-auto shrink-0'
        }`}
        style={{ backgroundColor: color + '30' }}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        direction === 'horizontal' ? 'w-8 h-px self-center shrink-0' : 'h-8 w-px mx-auto shrink-0'
      }`}
      style={{ backgroundColor: color + '20' }}
    >
      <motion.div
        className={`absolute ${direction === 'horizontal' ? 'w-3 h-px top-0' : 'h-3 w-px left-0'}`}
        style={{ backgroundColor: color }}
        animate={
          direction === 'horizontal' ? { left: ['-12px', '32px'] } : { top: ['-12px', '32px'] }
        }
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

function _AnimatedDataDot({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center h-6 shrink-0">
      <motion.div
        className="w-1.5 h-1.5"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function MemoryFlowArrow({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1">
      <div className="w-px h-4 bg-[#222]" />
      {!prefersReduced && (
        <motion.div
          className="w-1 h-1 bg-[#f59e0b]"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      )}
      <div className="w-px h-4 bg-[#222]" />
      <div className="text-[#333] text-[8px] leading-none select-none">v</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function MCPArchitecture({ className = '' }: MCPArchitectureProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [_tick, setTick] = useState(0);
  const prefersReduced = useReducedMotion() ?? false;

  // Slow tick for ambient pulse animation
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  const handleHover = useCallback((id: string) => setActiveNode(id), []);
  const handleLeave = useCallback(() => setActiveNode(null), []);

  const totalTools = useMemo(() => BACKEND_NODES.reduce((sum, n) => sum + (n.tools ?? 0), 0), []);

  return (
    <section className={`font-mono ${className}`} aria-label="MCP Architecture Diagram">
      {/* Section Header */}
      <ScrollReveal direction="up">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#f59e0b] text-xs">$</span>
            <span className="text-[#e0e0e0] text-sm font-bold">cat architecture.yml</span>
          </div>
          <p className="text-[#444] text-xs leading-relaxed max-w-2xl">
            Full system topology: user requests flow through TLS-terminated ingress, Google SSO
            authentication, into the MCP server which orchestrates 54 monitoring tools across 7
            databases, centralized logs, Kubernetes clusters, and a 3-layer incident memory system.
          </p>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* MAIN FLOW: Users -> Ingress -> OAuth -> MCP Server                */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="mb-6">
          <div className="text-[10px] uppercase tracking-widest text-[#333] mb-3">
            {`// request_flow`}
          </div>

          {/* Desktop: horizontal chain */}
          <div className="hidden lg:flex items-start gap-0">
            {INGRESS_NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <div className="flex-1 min-w-0">
                  <NodeCard
                    node={node}
                    isActive={activeNode === node.id}
                    onHover={() => handleHover(node.id)}
                    onLeave={handleLeave}
                    index={i}
                  />
                </div>
                {i < INGRESS_NODES.length - 1 && (
                  <FlowConnector
                    direction="horizontal"
                    color="#f59e0b"
                    animated={!prefersReduced}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical chain */}
          <div className="lg:hidden space-y-0">
            {INGRESS_NODES.map((node, i) => (
              <React.Fragment key={node.id}>
                <NodeCard
                  node={node}
                  isActive={activeNode === node.id}
                  onHover={() => handleHover(node.id)}
                  onLeave={handleLeave}
                  index={i}
                />
                {i < INGRESS_NODES.length - 1 && (
                  <FlowConnector direction="vertical" color="#f59e0b" animated={!prefersReduced} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* FAN-OUT: MCP -> Backend Services                                  */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mb-8">
          {/* Connector line from MCP to backends */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-px h-4 bg-[#222] mx-auto lg:hidden" />
            <div className="text-[10px] uppercase tracking-widest text-[#333]">
              {`// backend_services (${totalTools} tools)`}
            </div>
            {!prefersReduced && (
              <motion.span
                className="inline-block w-1.5 h-1.5 bg-[#f59e0b]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222]">
            {BACKEND_NODES.map((node, i) => (
              <div key={node.id} className="bg-[#0a0a0a]">
                <NodeCard
                  node={node}
                  isActive={activeNode === node.id}
                  onHover={() => handleHover(node.id)}
                  onLeave={handleLeave}
                  index={i + INGRESS_NODES.length}
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* 3-LAYER MEMORY SYSTEM                                             */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.3}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-[10px] uppercase tracking-widest text-[#333]">
              {`// 3-layer_incident_memory`}
            </div>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* Trigger label */}
          <div className="border border-[#222] bg-[#111] p-3 mb-0 max-w-xs">
            <div className="flex items-center gap-2">
              <Icon name="ExclamationTriangleIcon" size={14} className="text-[#f59e0b]" />
              <span className="text-[#e0e0e0] text-xs font-bold">Investigation / Alert</span>
            </div>
            <div className="text-[10px] text-[#444] mt-1">
              Incoming incident triggers memory cascade
            </div>
          </div>

          <MemoryFlowArrow prefersReduced={prefersReduced} />

          {/* Memory layers - vertical stack */}
          <div className="space-y-0">
            {MEMORY_LAYERS.map((layer, i) => (
              <React.Fragment key={layer.id}>
                <div className="max-w-md">
                  <div
                    className={`border bg-[#111] p-4 transition-colors duration-100 ${
                      activeNode === layer.id ? 'border-[#444]' : 'border-[#222]'
                    }`}
                    onMouseEnter={() => handleHover(layer.id)}
                    onMouseLeave={handleLeave}
                    role="button"
                    tabIndex={0}
                    aria-label={`${layer.label}: ${layer.sublabel}`}
                    onFocus={() => handleHover(layer.id)}
                    onBlur={handleLeave}
                  >
                    <div className="flex items-center gap-3">
                      {/* Layer number */}
                      <div
                        className="w-8 h-8 flex items-center justify-center border text-xs font-bold shrink-0"
                        style={{
                          color: layer.color,
                          borderColor: layer.color + '40',
                        }}
                      >
                        L{i + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Icon
                            name={layer.icon}
                            size={14}
                            className="shrink-0"
                            style={{ color: layer.color }}
                          />
                          <span className="text-[#e0e0e0] text-xs font-bold">{layer.label}</span>
                        </div>
                        <div className="text-[10px] text-[#444] mt-0.5">{layer.sublabel}</div>
                      </div>

                      {/* Purpose tag */}
                      <div className="text-[9px] text-[#444] uppercase tracking-wider shrink-0 hidden sm:block">
                        {i === 0 && 'fast_context'}
                        {i === 1 && 'semantic_search'}
                        {i === 2 && 'causal_memory'}
                      </div>
                    </div>

                    {/* Expanded details on hover */}
                    {activeNode === layer.id && (
                      <motion.div
                        className="mt-3 pt-3 border-t border-[#222]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.12 }}
                      >
                        <ul className="grid grid-cols-2 gap-1">
                          {layer.details.map((d, j) => (
                            <li key={j} className="text-[10px] text-[#666] flex items-start gap-1">
                              <span style={{ color: layer.color }} className="shrink-0">
                                -
                              </span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>

                {i < MEMORY_LAYERS.length - 1 && (
                  <MemoryFlowArrow prefersReduced={prefersReduced} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ================================================================= */}
      {/* STATS BAR                                                         */}
      {/* ================================================================= */}
      <ScrollReveal direction="up" delay={0.4}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#222]">
          {[
            { value: '54', label: 'tools', color: '#f59e0b' },
            { value: '7', label: 'databases', color: '#3b82f6' },
            { value: '8', label: 'namespaces', color: '#a855f7' },
            { value: '3-layer', label: 'memory', color: '#22c55e' },
            { value: '10/10', label: 'security', color: '#ef4444' },
            { value: '<1 min', label: 'investigation', color: '#f59e0b' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-[#0d0d0d] p-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="text-sm font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[9px] text-[#444] uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
