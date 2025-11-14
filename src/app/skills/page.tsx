import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SkillsInteractive from './components/SkillsInteractive';

export const metadata: Metadata = {
  title: 'Vishal DevOps Portfolio',
  description: 'Interactive showcase of DevOps expertise featuring cloud platforms, containerization, CI/CD automation, and infrastructure as code with real-time demonstrations and proficiency metrics.',
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsInteractive />
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="cyber-grid opacity-5"></div>
        <div className="neural-lines"></div>
      </div>
    </div>
  );
}
