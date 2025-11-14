'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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

export default function ToolPlayground({ tools }: ToolPlaygroundProps) {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gradient mb-4">Interactive DevOps Playground</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hover over tools to see live demonstrations and click to explore detailed capabilities
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span>{category}</span>
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools
              .filter(tool => tool.category === category)
              .map((tool, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredTool(tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                  onClick={() => setSelectedTool(tool)}
                >
                  <div className={`
                    glass-card p-4 text-center transition-all duration-300 transform-3d
                    ${hoveredTool === tool.name ? 'scale-110 shadow-premium neon-glow' : 'hover:scale-105'}
                    ${selectedTool?.name === tool.name ? 'ring-2 ring-accent' : ''}
                  `}>
                    <div className="text-3xl mb-2 transform transition-transform duration-300 group-hover:rotate-12">
                      {tool.icon}
                    </div>
                    <h5 className="text-sm font-medium text-foreground group-hover:text-accent transition-smooth">
                      {tool.name}
                    </h5>
                    <div className="mt-2 w-full bg-muted rounded-full h-1">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000"
                        style={{ width: `${tool.proficiency}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {tool.proficiency}%
                    </span>
                  </div>

                  {/* Hover Tooltip */}
                  {hoveredTool === tool.name && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-premium-lg min-w-48">
                        <h6 className="font-semibold text-foreground text-sm mb-1">{tool.name}</h6>
                        <p className="text-xs text-muted-foreground mb-2">{tool.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-accent">{tool.projects} projects</span>
                          <span className="text-success">{tool.proficiency}% proficiency</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedTool.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{selectedTool.name}</h3>
                    <p className="text-muted-foreground">{selectedTool.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth focus-ring"
                >
                  <Icon name="XMarkIcon" size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedTool.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features & Capabilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTool.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="CheckIcon" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-accent">{selectedTool.proficiency}%</div>
                    <div className="text-sm text-muted-foreground">Proficiency</div>
                  </div>
                  <div className="text-center p-4 bg-muted/20 rounded-lg">
                    <div className="text-2xl font-bold text-success">{selectedTool.projects}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}