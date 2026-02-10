interface Metric {
  label: string;
  value: string;
  icon: string;
  color: string;
  description: string;
}

interface SkillsMetricsProps {
  metrics: Metric[];
}

export default function SkillsMetrics({ metrics }: SkillsMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="glass-card p-6 text-center hover:shadow-premium-lg transition-smooth magnetic-hover group"
        >
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${metric.color} flex items-center justify-center group-hover:scale-110 transition-smooth`}
          >
            <span className="text-2xl">{metric.icon}</span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-bold text-gradient group-hover:scale-105 transition-smooth">
              {metric.value}
            </div>
            <h4 className="font-semibold text-foreground">{metric.label}</h4>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
