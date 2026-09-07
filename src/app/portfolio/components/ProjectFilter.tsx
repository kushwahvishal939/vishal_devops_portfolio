'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  icon: string;
  count: number;
}

interface ProjectFilterProps {
  categories: FilterOption[];
  technologies: FilterOption[];
  activeCategory: string;
  activeTechnology: string;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (technology: string) => void;
}

const ProjectFilter = ({
  categories,
  technologies,
  activeCategory,
  activeTechnology,
  onCategoryChange,
  onTechnologyChange,
}: ProjectFilterProps) => {
  return (
    <div className="space-y-6 font-mono">
      {/* Category Filter */}
      <div className="border border-[#222] bg-[#111]">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
          <Icon name="FolderIcon" size={14} className="text-[#f59e0b]" />
          <span className="text-[10px] uppercase tracking-widest text-[#666]">
            filter --category
          </span>
        </div>
        <div className="flex flex-wrap gap-0">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors duration-100 border-r border-[#222] last:border-r-0 ${
                  isActive
                    ? 'bg-[#f59e0b] text-[#0a0a0a]'
                    : 'text-[#666] hover:text-[#e0e0e0] hover:bg-[#161616]'
                }`}
              >
                <Icon name={category.icon as any} size={12} />
                <span>{category.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-[#0a0a0a]/60' : 'text-[#444]'}`}>
                  [{category.count}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technology Filter */}
      <div className="border border-[#222] bg-[#111]">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#0d0d0d]">
          <Icon name="CogIcon" size={14} className="text-[#f59e0b]" />
          <span className="text-[10px] uppercase tracking-widest text-[#666]">filter --tech</span>
        </div>
        <div className="flex flex-wrap">
          {technologies.map((tech) => {
            const isActive = activeTechnology === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => onTechnologyChange(tech.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[11px] transition-colors duration-100 border-r border-b border-[#222] ${
                  isActive
                    ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30'
                    : 'text-[#666] hover:text-[#e0e0e0] hover:bg-[#161616]'
                }`}
              >
                <Icon name={tech.icon as any} size={10} />
                <span>{tech.label}</span>
                <span className="text-[#444]">({tech.count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
