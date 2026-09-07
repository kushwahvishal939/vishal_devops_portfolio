'use client';

import ScrollReveal from '@/components/animations/ScrollReveal';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  avatarAlt: string;
  content: string;
  rating: number;
  project: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  onNext: () => void;
  onPrevious: () => void;
}

const TestimonialsSection = ({ testimonials, currentTestimonial }: TestimonialsSectionProps) => {
  const testimonial = testimonials[currentTestimonial];

  if (!testimonial) return null;

  return (
    <div className="terminal-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#f59e0b] font-mono text-sm">$</span>
        <h3 className="text-lg font-mono font-bold text-[#e0e0e0]">cat testimonials.log</h3>
      </div>

      <ScrollReveal direction="up">
        <div className="border-l-2 border-[#f59e0b]/40 pl-5">
          {/* Quote */}
          <p className="text-sm font-mono text-[#e0e0e0] leading-relaxed mb-5 italic">
            &quot;{testimonial.content}&quot;
          </p>

          {/* Attribution */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-mono font-bold text-[#f59e0b]">-- {testimonial.name}</p>
              <p className="text-xs font-mono text-[#666]">
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono border border-[#222] text-[#666]">
              {testimonial.project}
            </span>
          </div>

          {/* Rating as terminal stars */}
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs font-mono text-[#666] mr-1">rating:</span>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm font-mono ${
                  i < testimonial.rating ? 'text-[#f59e0b]' : 'text-[#222]'
                }`}
              >
                *
              </span>
            ))}
            <span className="text-xs font-mono text-[#666] ml-1">[{testimonial.rating}/5]</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default TestimonialsSection;
