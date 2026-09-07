'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface LiveDashboardProps {
  className?: string;
}

const UPTIME_START = new Date('2025-12-01T00:00:00Z').getTime();
const INITIAL_DEPLOYMENTS = 847;
const INITIAL_SAVINGS = 850000;
const SPARKLINE_COUNT = 20;

function generateSparkline(min: number, max: number): number[] {
  return Array.from({ length: SPARKLINE_COUNT }, () => min + Math.random() * (max - min));
}

function formatLakh(value: number): string {
  const lakh = value / 100000;
  return `\u20B9${lakh.toFixed(2)}L`;
}

function Sparkline({ data, accent = false }: { data: number[]; accent?: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-[2px] h-8 mt-3">
      {data.map((value, i) => {
        const height = ((value - min) / range) * 100;
        const isLast = i === data.length - 1;
        return (
          <div
            key={i}
            className="flex-1 min-w-0"
            style={{
              height: `${Math.max(height, 8)}%`,
              backgroundColor: isLast && accent ? '#f59e0b' : '#222',
            }}
          />
        );
      })}
    </div>
  );
}

function StatusDot() {
  return (
    <span className="relative inline-flex h-2 w-2 mr-2">
      <span className="absolute inline-flex h-full w-full animate-ping bg-[#22c55e] opacity-75" />
      <span className="relative inline-flex h-2 w-2 bg-[#22c55e]" />
    </span>
  );
}

const LiveDashboard = ({ className = '' }: LiveDashboardProps) => {
  const mountedRef = useRef(true);
  const [uptime, setUptime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [deployments, setDeployments] = useState(INITIAL_DEPLOYMENTS);
  const [savings, setSavings] = useState(INITIAL_SAVINGS);
  const [responseTime, setResponseTime] = useState(24);
  const [uptimeSparkline, setUptimeSparkline] = useState(() => generateSparkline(99.5, 100));
  const [deploySparkline, setDeploySparkline] = useState(() => generateSparkline(2, 12));
  const [savingsSparkline, setSavingsSparkline] = useState(() => generateSparkline(5000, 25000));
  const [responseSparkline, setResponseSparkline] = useState(() => generateSparkline(12, 45));

  const computeUptime = useCallback(() => {
    const diff = Date.now() - UPTIME_START;
    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return { d, h, m, s };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    setUptime(computeUptime());

    // Uptime ticker - every second
    const uptimeInterval = setInterval(() => {
      if (!mountedRef.current) return;
      setUptime(computeUptime());
    }, 1000);

    // Deployments - random 30-45s interval
    let deployTimeout: ReturnType<typeof setTimeout>;
    const scheduleDeployIncrement = () => {
      const delay = 30000 + Math.random() * 15000;
      deployTimeout = setTimeout(() => {
        if (!mountedRef.current) return;
        setDeployments((prev) => prev + 1);
        setDeploySparkline((prev) => {
          const next = [...prev.slice(1), 1 + Math.random() * 11];
          return next;
        });
        scheduleDeployIncrement();
      }, delay);
    };
    scheduleDeployIncrement();

    // Cost savings - every 3-5 seconds
    const savingsInterval = setInterval(
      () => {
        if (!mountedRef.current) return;
        const increment = 50 + Math.random() * 200;
        setSavings((prev) => prev + increment);
        setSavingsSparkline((prev) => {
          const next = [...prev.slice(1), 5000 + Math.random() * 20000];
          return next;
        });
      },
      3000 + Math.random() * 2000
    );

    // Response time - every 2 seconds
    const responseInterval = setInterval(() => {
      if (!mountedRef.current) return;
      const newTime = 12 + Math.random() * 33;
      setResponseTime(Math.round(newTime));
      setResponseSparkline((prev) => {
        const next = [...prev.slice(1), newTime];
        return next;
      });
    }, 2000);

    // Uptime sparkline - every 5 seconds
    const uptimeSparkInterval = setInterval(() => {
      if (!mountedRef.current) return;
      setUptimeSparkline((prev) => {
        const next = [...prev.slice(1), 99.5 + Math.random() * 0.5];
        return next;
      });
    }, 5000);

    return () => {
      mountedRef.current = false;
      clearInterval(uptimeInterval);
      clearTimeout(deployTimeout);
      clearInterval(savingsInterval);
      clearInterval(responseInterval);
      clearInterval(uptimeSparkInterval);
    };
  }, [computeUptime]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const metrics = [
    {
      label: 'SYSTEM_UPTIME',
      value: (
        <span className="flex items-center">
          <StatusDot />
          <span>
            {uptime.d}d {pad(uptime.h)}h {pad(uptime.m)}m {pad(uptime.s)}s
          </span>
        </span>
      ),
      sub: 'since last incident',
      sparkline: uptimeSparkline,
    },
    {
      label: 'TOTAL_DEPLOYMENTS',
      value: deployments.toLocaleString(),
      sub: 'zero-downtime releases',
      sparkline: deploySparkline,
    },
    {
      label: 'COST_SAVINGS',
      value: formatLakh(savings),
      sub: 'infrastructure optimization',
      sparkline: savingsSparkline,
    },
    {
      label: 'AVG_RESPONSE',
      value: (
        <span className={responseTime < 30 ? 'text-[#22c55e]' : 'text-[#f59e0b]'}>
          {responseTime}ms
        </span>
      ),
      sub: 'p95 latency',
      sparkline: responseSparkline,
      accentSpark: true,
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] ${className}`}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-10">
            <h2 className="font-mono text-[#f59e0b] text-sm sm:text-base mb-2">
              <span className="text-[#666]">$</span> dashboard --live
            </h2>
            <p className="font-mono text-[#666] text-xs sm:text-sm">
              Infrastructure metrics updated in real-time
            </p>
          </div>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#222]"
          style={{ gap: '1px' }}
        >
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} direction="up" delay={i * 0.1}>
              <div className="bg-[#111] p-5 sm:p-6 font-mono flex flex-col justify-between h-full min-h-[180px]">
                <span className="text-[10px] sm:text-xs text-[#666] uppercase tracking-wider block">
                  {metric.label}
                </span>

                <div className="text-xl sm:text-2xl lg:text-3xl text-[#e0e0e0] font-bold my-3 tabular-nums">
                  {metric.value}
                </div>

                <div>
                  <span className="text-[10px] text-[#666] block mb-1">{metric.sub}</span>
                  <Sparkline data={metric.sparkline} accent={metric.accentSpark} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveDashboard;
