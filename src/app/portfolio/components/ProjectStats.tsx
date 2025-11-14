import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ProjectStatsProps {
  totalProjects: number;
  completedProjects: number;
  totalCostSavings: string;
  averagePerformanceGain: string;
}

const ProjectStats = ({
  totalProjects,
  completedProjects,
  totalCostSavings,
  averagePerformanceGain
}: ProjectStatsProps) => {
  const stats: Stat[] = [
    {
      label: 'Total Projects',
      value: totalProjects.toString(),
      icon: 'FolderIcon',
      color: 'text-accent'
    },
    {
      label: 'Completed',
      value: completedProjects.toString(),
      icon: 'CheckCircleIcon',
      color: 'text-success'
    },
    {
      label: 'Cost Savings',
      value: totalCostSavings,
      icon: 'CurrencyRupeeIcon',
      color: 'text-warning'
    },
    {
      label: 'Avg Performance',
      value: averagePerformanceGain,
      icon: 'ChartBarIcon',
      color: 'text-primary'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 bg-card border border-border rounded-xl hover:shadow-premium transition-all duration-300 group"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted/30 group-hover:bg-muted/50 transition-colors`}>
              <Icon name={stat.icon as any} size={20} className={stat.color} />
            </div>
            <div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;