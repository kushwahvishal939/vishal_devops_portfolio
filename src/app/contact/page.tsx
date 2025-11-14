import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Vishal DevOps Portfolio',
  description: 'Get in touch with Vishal Kushwah for DevOps consulting, cloud migration, and infrastructure automation projects. Multiple communication channels available with 24-hour response time.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactInteractive />
      </main>
    </>
  );
}
