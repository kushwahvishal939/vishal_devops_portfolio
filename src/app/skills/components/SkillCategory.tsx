interface Skill {
  name: string;
  proficiency: number;
  icon: string;
  description: string;
  yearsExperience: number;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon: string;
  color: string;
}

export default function SkillCategory({ title, skills, icon, color }: SkillCategoryProps) {
  return (
    <div className="glass-card p-6 hover:shadow-premium-lg transition-smooth">
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{skill.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-smooth">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {skill.yearsExperience} years experience
                  </p>
                </div>
              </div>
              <span className="text-sm font-mono text-accent">{skill.proficiency}%</span>
            </div>

            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out group-hover:shadow-neon`}
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>

            <p className="text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-smooth">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
