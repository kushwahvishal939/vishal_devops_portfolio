'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Tool {
  name: string;
  category: string;
  icon: string;
  description: string;
  features: string[];
  proficiency: number;
  projects: number;
}

interface ToolPlaygroundProps {
  tools: Tool[];
}

function buildAsciiBar(value: number, length: number = 20): string {
  const filled = Math.round((value / 100) * length);
  const empty = length - filled;
  return '[' + '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + ']';
}

export default function ToolPlayground({ tools }: ToolPlaygroundProps) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setExpandedTool((prev) => (prev === name ? null : name));
  };

  return (
    <div className="space-y-6">
      <ScrollReveal direction="up">
        <div className="mb-8">
          <p className="font-mono text-sm text-[#666]">
            <span className="text-[#f59e0b]">$</span> ls --tools --interactive
          </p>
          <p className="font-mono text-xs text-[#666] mt-1">
            {tools.length} tools loaded. Click to inspect.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((tool, index) => {
          const isExpanded = expandedTool === tool.name;

          return (
            <ScrollReveal key={tool.name} direction="up" delay={index * 0.05}>
              <motion.div
                layout
                className={`
                  bg-[#111] border cursor-pointer font-mono transition-colors duration-150
                  ${isExpanded ? 'border-[#f59e0b] col-span-1' : 'border-[#222] hover:border-[#333]'}
                `}
                style={{ borderRadius: '2px' }}
                onClick={() => handleToggle(tool.name)}
              >
                {/* Tool Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tool.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-[#e0e0e0]">{tool.name}</h4>
                        <span className="text-xs text-[#666]">{tool.category}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Icon
                        name="ChevronRightIcon"
                        size={14}
                        className={isExpanded ? 'text-[#f59e0b]' : 'text-[#666]'}
                      />
                    </motion.div>
                  </div>

                  {/* ASCII Progress Bar */}
                  <div className="text-xs">
                    <span className="text-[#666]">prof </span>
                    <span className="text-[#f59e0b]">{buildAsciiBar(tool.proficiency, 16)}</span>
                    <span className="text-[#e0e0e0] ml-1">{tool.proficiency}%</span>
                  </div>
                </div>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#222] p-4 space-y-3">
                        <p className="text-xs text-[#666] leading-relaxed">{tool.description}</p>

                        <div>
                          <p className="text-xs text-[#f59e0b] mb-2">&gt; features</p>
                          <div className="space-y-1">
                            {tool.features
                              .filter((f) => f.trim() !== '')
                              .map((feature, i) => (
                                <p key={i} className="text-xs text-[#e0e0e0]">
                                  <span className="text-[#666]"> - </span>
                                  {feature}
                                </p>
                              ))}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-2 border-t border-[#1a1a1a]">
                          <div className="text-xs">
                            <span className="text-[#666]">projects: </span>
                            <span className="text-[#f59e0b] font-bold">{tool.projects}</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-[#666]">status: </span>
                            <span className="text-[#22c55e]">active</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
