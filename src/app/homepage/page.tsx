import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Vishal DevOps Portfolio',
  description: 'Vishal Kushwah\'s premium DevOps portfolio showcasing cloud infrastructure expertise, cost optimization achievements, and innovative automation solutions with interactive 3D visualizations.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HomepageInteractive />
    </main>
  );
}