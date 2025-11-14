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
  onTechnologyChange
}: ProjectFilterProps) => {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="FolderIcon" size={20} className="text-accent" />
          <span>Project Categories</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-accent text-background shadow-neon'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Icon name={category.icon as any} size={16} />
              <span>{category.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeCategory === category.id
                  ? 'bg-background/20 text-background' :'bg-accent/20 text-accent'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Technology Filter */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="CogIcon" size={20} className="text-accent" />
          <span>Technologies</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => onTechnologyChange(tech.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTechnology === tech.id
                  ? 'bg-accent/20 text-accent border border-accent/30' :'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground border border-transparent'
              }`}
            >
              <Icon name={tech.icon as any} size={12} />
              <span>{tech.label}</span>
              <span className="text-xs opacity-70">({tech.count})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;