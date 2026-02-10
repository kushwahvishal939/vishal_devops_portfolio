import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ExperienceInteractive from './components/ExperienceInteractive';

export const metadata: Metadata = {
  title: 'Experience - VishTech DevOps Portfolio',
  description:
    "Explore Vishal Kushwah's professional DevOps journey with quantified achievements including 55% cost reduction, 40% deployment improvements, and 99.9% uptime records across enterprise-scale projects.",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 cyber-grid opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span>Professional Journey</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gradient mb-6">
                Experience Timeline
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
                From maintaining systems to{' '}
                <span className="text-accent font-semibold">revolutionizing infrastructure</span> —
                a journey of measurable impact and continuous innovation in the DevOps ecosystem
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span>2+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>50+ Projects Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span>₹4L+ Cost Savings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>99.9% Uptime Achieved</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <ExperienceInteractive />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-6">
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how my proven DevOps expertise can revolutionize your systems, reduce
                costs, and achieve zero-downtime reliability for your organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg transition-smooth hover:shadow-neon magnetic-hover"
                >
                  Start a Conversation
                </a>
                <a
                  href="/portfolio"
                  className="px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg font-semibold text-lg transition-smooth hover:bg-accent/10"
                >
                  View My Projects
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
