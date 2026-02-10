import React from 'react';
import Icon from '@/components/ui/AppIcon';

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
    <div className="glass-card p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
          <Icon name="MapIcon" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gradient">Career Journey</h3>
          <p className="text-muted-foreground">From maintaining systems to revolutionizing them</p>
        </div>
      </div>

      <div className="relative">
        {/* Journey Path */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 via-primary to-accent"></div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-start space-x-6">
              {/* Milestone Node */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${
                  milestone.highlight
                    ? 'bg-gradient-to-br from-accent to-primary shadow-neon'
                    : 'bg-muted'
                }`}
              >
                <Icon
                  name={milestone.icon as any}
                  size={20}
                  className={milestone.highlight ? 'text-white' : 'text-muted-foreground'}
                />
                {milestone.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full animate-ping opacity-30"></div>
                )}
              </div>

              {/* Milestone Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      milestone.highlight
                        ? 'bg-accent/20 text-accent'
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {milestone.year}
                  </span>
                  {milestone.highlight && (
                    <span className="px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
                <h4
                  className={`text-lg font-semibold mb-2 ${
                    milestone.highlight ? 'text-gradient' : 'text-foreground'
                  }`}
                >
                  {milestone.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerJourney;
