'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface MCPArchitectureProps {
  className?: string;
}

// Animated pulse dot for live connections
function PulseDot({ color, delay = 0 }: { color: string; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="w-1.5 h-1.5 inline-block" style={{ background: color }} />;
  return (
    <motion.span
      className="w-1.5 h-1.5 inline-block"
      style={{ background: color }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
  );
}

// Animated data flowing down a vertical line
function DataFlow({ color, height = 32 }: { color: string; height?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: 1, height, background: '#222' }}>
        {!reduced && (
          <motion.div
            className="absolute left-0 w-full"
            style={{ height: 8, background: color }}
            animate={{ top: [-8, height] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
}

// Animated data flowing across a horizontal line
function DataFlowH({ color, width = 40 }: { color: string; width?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex items-center">
      <div className="relative overflow-hidden" style={{ width, height: 1, background: '#1a1a1a' }}>
        {!reduced && (
          <motion.div
            className="absolute top-0 h-full"
            style={{ width: 10, background: color }}
            animate={{ left: [-10, width] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  );
}

export default function MCPArchitecture({ className = '' }: MCPArchitectureProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeBase =
    'border border-[#222] bg-[#111] font-mono transition-all duration-100 hover:border-[#333]';
  const activeNode = (id: string) => (hoveredNode === id ? 'border-[#444] bg-[#141414]' : '');

  return (
    <section className={`font-mono ${className}`}>
      <ScrollReveal direction="up">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#f59e0b] text-xs">$</span>
            <span className="text-[#e0e0e0] text-sm font-bold">cat architecture.yml</span>
          </div>
          <p className="text-[#444] text-xs max-w-2xl">
            End-to-end system topology. Hover nodes for details.
          </p>
        </div>
      </ScrollReveal>

      {/* ========== MAIN ARCHITECTURE ========== */}
      <div className="border border-[#222] bg-[#0a0a0a] p-4 sm:p-6 lg:p-8">
        {/* ---- LAYER 1: CLIENT ---- */}
        <div className="text-[9px] text-[#333] uppercase tracking-widest mb-2">
          {'// client_layer'}
        </div>
        <div
          className={`${nodeBase} ${activeNode('client')} p-3 max-w-sm`}
          onMouseEnter={() => setHoveredNode('client')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="flex items-center gap-2">
            <PulseDot color="#22c55e" />
            <span className="text-xs text-[#e0e0e0] font-bold">Team Member</span>
            <span className="text-[9px] text-[#444] ml-auto">HTTPS / SSE</span>
          </div>
          <div className="text-[10px] text-[#555] mt-1">
            Claude Desktop / Claude CLI / claude.ai
          </div>
          {hoveredNode === 'client' && (
            <div className="text-[10px] text-[#666] mt-2 pt-2 border-t border-[#1a1a1a]">
              Any team member asks questions in plain English. The AI handles tool selection and
              correlation automatically.
            </div>
          )}
        </div>

        <DataFlow color="#f59e0b" height={28} />

        {/* ---- LAYER 2: INGRESS + AUTH ---- */}
        <div className="text-[9px] text-[#333] uppercase tracking-widest mb-2">
          {'// ingress_layer'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#222] max-w-2xl mb-0">
          <div
            className={`bg-[#111] p-3 ${activeNode('nginx')}`}
            onMouseEnter={() => setHoveredNode('nginx')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="flex items-center gap-2 mb-1">
              <PulseDot color="#3b82f6" />
              <span className="text-xs text-[#e0e0e0] font-bold">NGINX Ingress</span>
            </div>
            <div className="text-[10px] text-[#555]">TLS 1.3 | Rate Limit 10rps | HSTS</div>
            {hoveredNode === 'nginx' && (
              <div className="text-[10px] text-[#666] mt-2 pt-2 border-t border-[#1a1a1a] space-y-0.5">
                <div>+ cert-manager + Let&apos;s Encrypt auto-renewal</div>
                <div>+ Per-user rate limiting (10 RPS, 5 conn)</div>
                <div>+ Security headers (CSP, X-Frame, HSTS)</div>
                <div>+ NetworkPolicy: only ingress can reach pod</div>
              </div>
            )}
          </div>
          <div
            className={`bg-[#111] p-3 ${activeNode('oauth')}`}
            onMouseEnter={() => setHoveredNode('oauth')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="flex items-center gap-2 mb-1">
              <PulseDot color="#a855f7" delay={0.3} />
              <span className="text-xs text-[#e0e0e0] font-bold">OAuth2 Proxy</span>
            </div>
            <div className="text-[10px] text-[#555]">Google SSO | @rdash.io domain lock</div>
            {hoveredNode === 'oauth' && (
              <div className="text-[10px] text-[#666] mt-2 pt-2 border-t border-[#1a1a1a] space-y-0.5">
                <div>+ Google Workspace SSO integration</div>
                <div>+ Strict @rdash.io email domain filter</div>
                <div>+ Per-user token map (MCP_TOKEN_MAP)</div>
                <div>+ Audit log: email, IP, tool, timestamp</div>
              </div>
            )}
          </div>
        </div>

        <DataFlow color="#f59e0b" height={28} />

        {/* ---- LAYER 3: MCP SERVER (CORE) ---- */}
        <div className="text-[9px] text-[#333] uppercase tracking-widest mb-2">
          {'// core_server'}
        </div>
        <div
          className={`${nodeBase} ${activeNode('mcp')} p-4 max-w-2xl border-[#f59e0b30]`}
          onMouseEnter={() => setHoveredNode('mcp')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="flex items-center gap-2 mb-2">
            <PulseDot color="#f59e0b" delay={0.5} />
            <span className="text-sm text-[#f59e0b] font-bold">MCP Server</span>
            <span className="text-[9px] text-[#444] ml-auto">Python 3.11 | FastAPI | SSE</span>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[#1a1a1a] text-center text-[10px]">
            <div className="bg-[#0d0d0d] py-1.5">
              <span className="text-[#f59e0b] font-bold">54</span>
              <span className="text-[#444]"> tools</span>
            </div>
            <div className="bg-[#0d0d0d] py-1.5">
              <span className="text-[#3b82f6] font-bold">7</span>
              <span className="text-[#444]"> databases</span>
            </div>
            <div className="bg-[#0d0d0d] py-1.5">
              <span className="text-[#a855f7] font-bold">8</span>
              <span className="text-[#444]"> namespaces</span>
            </div>
          </div>
          {hoveredNode === 'mcp' && (
            <div className="text-[10px] text-[#666] mt-3 pt-3 border-t border-[#1a1a1a] space-y-0.5">
              <div>+ Auth middleware (ASGI) + Audit middleware</div>
              <div>+ Read-only DB connections (no mutation possible)</div>
              <div>+ Async concurrent tool execution</div>
              <div>+ Auto-saves every investigation to memory</div>
            </div>
          )}
        </div>

        {/* ---- FAN-OUT ARROWS ---- */}
        <div className="flex items-end gap-0 max-w-2xl mt-0">
          <div className="flex-1">
            <DataFlow color="#3b82f6" height={24} />
          </div>
          <div className="flex-1">
            <DataFlow color="#22c55e" height={24} />
          </div>
          <div className="flex-1">
            <DataFlow color="#a855f7" height={24} />
          </div>
          <div className="flex-1">
            <DataFlow color="#f59e0b" height={24} />
          </div>
        </div>

        {/* ---- LAYER 4: DATA SOURCES ---- */}
        <div className="text-[9px] text-[#333] uppercase tracking-widest mb-2">
          {'// data_sources'}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] max-w-2xl">
          {[
            {
              id: 'pg',
              name: 'PostgreSQL',
              tools: 17,
              color: '#3b82f6',
              sub: '7 databases | pg_stat_*',
              detail:
                'Slow queries, connections, locks, replication, bloat, vacuum, indexes, cache ratio',
            },
            {
              id: 'loki',
              name: 'Loki',
              tools: 8,
              color: '#22c55e',
              sub: 'Centralized logs',
              detail:
                'Error patterns, pod logs, request tracing, Django ORM, latency outliers, error trends',
            },
            {
              id: 'k8s',
              name: 'Kubernetes',
              tools: 7,
              color: '#a855f7',
              sub: '8 namespaces',
              detail: 'Pod health, OOMKill, events, deployments, HPA, cronjobs, node pressure',
            },
            {
              id: 'prom',
              name: 'Prometheus',
              tools: 5,
              color: '#f59e0b',
              sub: 'Metrics engine',
              detail: 'CPU/memory trends, HTTP metrics, cluster summary, node metrics, pod metrics',
            },
          ].map((src) => (
            <div
              key={src.id}
              className={`bg-[#111] p-3 cursor-default transition-colors duration-100 ${activeNode(src.id)}`}
              onMouseEnter={() => setHoveredNode(src.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <PulseDot color={src.color} delay={Math.random()} />
                  <span className="text-[11px] text-[#e0e0e0] font-bold">{src.name}</span>
                </div>
                <span
                  className="text-[9px] px-1 py-0.5 font-bold"
                  style={{
                    color: src.color,
                    background: src.color + '15',
                    border: `1px solid ${src.color}30`,
                  }}
                >
                  {src.tools}
                </span>
              </div>
              <div className="text-[9px] text-[#444]">{src.sub}</div>
              {hoveredNode === src.id && (
                <div className="text-[9px] text-[#555] mt-2 pt-2 border-t border-[#1a1a1a]">
                  {src.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ---- SEPARATOR ---- */}
        <div className="max-w-2xl my-6">
          <div className="h-px bg-[#1a1a1a]" />
        </div>

        {/* ---- LAYER 5: 3-LAYER MEMORY ---- */}
        <div className="text-[9px] text-[#333] uppercase tracking-widest mb-3">
          {'// incident_memory_system'}
        </div>

        <div className="max-w-2xl">
          {/* Trigger */}
          <div className="flex items-center gap-3 mb-0">
            <div className="border border-[#f59e0b30] bg-[#111] px-3 py-2">
              <span className="text-[10px] text-[#f59e0b]">INVESTIGATION TRIGGER</span>
            </div>
            <DataFlowH color="#f59e0b" width={30} />
            <span className="text-[9px] text-[#333]">auto-save to all 3 layers</span>
          </div>

          <DataFlow color="#f59e0b" height={20} />

          {/* Memory layers side by side on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#222]">
            {[
              {
                id: 'redis',
                layer: 'L1',
                name: 'Redis',
                color: '#ef4444',
                ttl: '24h TTL',
                purpose: 'FAST_CONTEXT',
                desc: 'Recent incidents cached for instant recall. "What happened in prod last hour?"',
              },
              {
                id: 'qdrant',
                layer: 'L2',
                name: 'Qdrant',
                color: '#3b82f6',
                ttl: 'Permanent',
                purpose: 'SEMANTIC_SEARCH',
                desc: 'Vector embeddings of every incident. "Has this error pattern happened before?"',
              },
              {
                id: 'neo4j',
                layer: 'L3',
                name: 'Neo4j',
                color: '#22c55e',
                ttl: 'Permanent',
                purpose: 'CAUSAL_GRAPH',
                desc: 'Knowledge graph with RCA chains. "Why does this keep coming back?"',
              },
            ].map((mem) => (
              <div
                key={mem.id}
                className={`bg-[#111] p-3 cursor-default transition-colors duration-100 ${activeNode(mem.id)}`}
                onMouseEnter={() => setHoveredNode(mem.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[9px] font-bold px-1 py-0.5"
                    style={{
                      color: mem.color,
                      border: `1px solid ${mem.color}40`,
                    }}
                  >
                    {mem.layer}
                  </span>
                  <span className="text-[11px] text-[#e0e0e0] font-bold">{mem.name}</span>
                  <PulseDot color={mem.color} delay={0.5} />
                </div>
                <div className="text-[9px] text-[#444] mb-1">{mem.ttl}</div>
                <div
                  className="text-[8px] uppercase tracking-widest mb-2"
                  style={{ color: mem.color + '80' }}
                >
                  {mem.purpose}
                </div>
                {hoveredNode === mem.id && (
                  <div className="text-[9px] text-[#555] pt-2 border-t border-[#1a1a1a]">
                    {mem.desc}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Neo4j graph relationships */}
          <div className="mt-3 p-3 bg-[#0d0d0d] border border-[#1a1a1a] text-[9px] text-[#444] font-mono">
            <div className="text-[#333] mb-1">{'// neo4j_schema'}</div>
            <div>
              <span className="text-[#a855f7]">(Incident)</span>
              <span className="text-[#333]">-[:CAUSED_BY]-&gt;</span>
              <span className="text-[#ef4444]">(RootCause)</span>
            </div>
            <div>
              <span className="text-[#a855f7]">(Incident)</span>
              <span className="text-[#333]">-[:FIXED_BY]-&gt;</span>
              <span className="text-[#22c55e]">(Fix)</span>
            </div>
            <div>
              <span className="text-[#a855f7]">(Incident)</span>
              <span className="text-[#333]">-[:RECURRED_FROM]-&gt;</span>
              <span className="text-[#f59e0b]">(Incident)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== STATS BAR ========== */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-px bg-[#222] mt-px">
        {[
          { value: '54', label: 'tools', color: '#f59e0b' },
          { value: '7', label: 'databases', color: '#3b82f6' },
          { value: '8', label: 'namespaces', color: '#a855f7' },
          { value: '3-layer', label: 'memory', color: '#22c55e' },
          { value: '10/10', label: 'security', color: '#ef4444' },
          { value: '<1 min', label: 'RCA time', color: '#f59e0b' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0d0d0d] py-2.5 text-center">
            <div className="text-xs font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[8px] text-[#333] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
