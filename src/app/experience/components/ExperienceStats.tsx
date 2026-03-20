import React from 'react';
import Icon from '@/components/ui/AppIcon';
import ScrollReveal from '@/components/animations/ScrollReveal';
import AntiGravityCard from '@/components/animations/AntiGravityCard';

interface StatItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

interface ExperienceStatsProps {
  stats: StatItem[];
}

const ExperienceStats = ({ stats }: ExperienceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <ScrollReveal key={index} direction="up" delay={index * 0.1}>
          <AntiGravityCard className="glass-card p-6 hover:shadow-premium-lg transition-all duration-300 magnetic-hover group">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={stat.icon as any} size={24} className="text-white" />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`}
              >
                <Icon name={stat.trend === 'up' ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={16} />
                <span>{stat.change}</span>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </AntiGravityCard>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ExperienceStats;
