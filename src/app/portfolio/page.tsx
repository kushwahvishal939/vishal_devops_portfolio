import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PortfolioInteractive from './components/PortfolioInteractive';

export const metadata: Metadata = {
  title: 'Portfolio - VishTech DevOps Portfolio',
  description: 'Explore Vishal Kushwah\'s comprehensive DevOps project portfolio featuring cloud migration, automation, cost optimization, and infrastructure solutions with measurable business impact.',
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen-safe bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 cyber-grid opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Project Showcase Arena</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                DevOps Project
                <span className="block text-gradient">Portfolio</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Explore real-world DevOps solutions that transformed infrastructure, optimized costs, and delivered measurable business impact. Each project demonstrates technical excellence and innovative problem-solving.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-2 text-success">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">₹8.5L+ Total Cost Savings</span>
                </div>
                <div className="flex items-center space-x-2 text-accent">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-medium">99.9% Average Uptime</span>
                </div>
                <div className="flex items-center space-x-2 text-warning">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-sm font-medium">48% Avg Performance Gain</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortfolioInteractive />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how these proven DevOps strategies can optimize your systems, reduce costs, and improve reliability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-neon magnetic-hover"
              >
                Start Your Project
              </a>
              <a
                href="/experience"
                className="px-8 py-4 bg-muted/30 text-foreground border border-border rounded-lg font-semibold text-lg hover:bg-muted/50 transition-colors"
              >
                View Experience
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
