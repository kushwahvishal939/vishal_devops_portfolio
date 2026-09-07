import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PortfolioInteractive from './components/PortfolioInteractive';

export const metadata: Metadata = {
  title: 'Portfolio - Vishal Kushwah DevOps',
  description:
    "Explore Vishal Kushwah's DevOps project portfolio featuring cloud migration, automation, cost optimization, and infrastructure solutions.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#f59e0b] text-xs">$</span>
                <span className="text-[#666] text-xs">ls -la ./portfolio</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-[#e0e0e0] mb-3 font-display">
                Project Portfolio
              </h1>
              <p className="text-sm text-[#666] max-w-2xl mb-6">
                Real-world DevOps solutions that transformed infrastructure, optimized costs, and
                delivered measurable business impact.
              </p>
              <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#22c55e]" />
                  <span className="text-[#666]">Rs.8.5L+ cost savings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#f59e0b]" />
                  <span className="text-[#666]">99.9% avg uptime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#3b82f6]" />
                  <span className="text-[#666]">48% avg performance gain</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Content */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortfolioInteractive />
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-[#222]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center font-mono">
            <h2 className="text-xl font-bold text-[#e0e0e0] mb-3">
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="text-sm text-[#666] mb-6">
              Let&apos;s discuss how these proven DevOps strategies can optimize your systems.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="px-6 py-2.5 bg-[#f59e0b] text-[#0a0a0a] text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] transition-colors"
              >
                start_project
              </a>
              <a
                href="https://vishalkushwah.s3.us-east-1.amazonaws.com/vishalkushwah-exp-3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-[#f59e0b] text-[#f59e0b] text-xs font-bold uppercase tracking-wider hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors"
              >
                download_resume
              </a>
              <a
                href="/experience"
                className="px-6 py-2.5 border border-[#222] text-[#666] text-xs uppercase tracking-wider hover:border-[#444] hover:text-[#e0e0e0] transition-colors"
              >
                view_experience
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
