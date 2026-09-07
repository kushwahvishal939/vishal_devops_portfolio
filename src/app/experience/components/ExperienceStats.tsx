'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

interface ExperienceStatsProps {
  stats: StatItem[];
}

const ExperienceStats = ({ stats }: ExperienceStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <ScrollReveal key={index} direction="up" delay={index * 0.08}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="terminal-card p-5 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 border border-[#222] flex items-center justify-center">
                <Icon name={stat.icon} size={16} className="text-[#f59e0b]" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#666]">
                {stat.label}
              </span>
            </div>

            <p className="text-3xl lg:text-4xl font-mono font-bold text-[#f59e0b] tracking-tight">
              {stat.value}
            </p>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ExperienceStats;
