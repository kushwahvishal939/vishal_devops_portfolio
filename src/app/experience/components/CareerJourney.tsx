'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

interface CareerJourneyProps {
  milestones: JourneyMilestone[];
}

const CareerJourney = ({ milestones }: CareerJourneyProps) => {
  return (
    <div className="terminal-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#f59e0b] font-mono text-sm">$</span>
        <h3 className="text-lg font-mono font-bold text-[#e0e0e0]">career --history</h3>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#f59e0b]/20" />

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <ScrollReveal key={index} direction="left" delay={index * 0.1}>
              <div className="relative pl-8">
                {/* Node */}
                <div
                  className={`absolute left-0 top-1 w-[15px] h-[15px] border flex items-center justify-center ${
                    milestone.highlight
                      ? 'border-[#22c55e] bg-[#22c55e]/10'
                      : 'border-[#f59e0b]/40 bg-[#0a0a0a]'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 ${
                      milestone.highlight ? 'bg-[#22c55e]' : 'bg-[#f59e0b]/60'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        milestone.highlight ? 'text-[#22c55e]' : 'text-[#f59e0b]'
                      }`}
                    >
                      {milestone.year}
                    </span>
                    {milestone.highlight && (
                      <span className="text-[10px] font-mono text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5">
                        NOW
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-mono font-bold text-[#e0e0e0] mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-xs font-mono text-[#666] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerJourney;
