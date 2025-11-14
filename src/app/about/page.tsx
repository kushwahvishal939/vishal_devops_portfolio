import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AboutInteractive from './components/AboutInteractive';

export const metadata: Metadata = {
  title: 'Vishal DevOps Portfolio',
  description: 'Meet Vishal Kushwah, The Cloud Infrastructure Virtuoso who revolutionizes DevOps systems with 55% cost reduction, 40% faster deployments, and 100% uptime achievements.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen-safe bg-background">
      <Header />
      <AboutInteractive />
    </main>
  );
}
