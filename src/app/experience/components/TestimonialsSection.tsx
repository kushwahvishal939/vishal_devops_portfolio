import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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

const TestimonialsSection = ({ 
  testimonials, 
  currentTestimonial, 
  onNext, 
  onPrevious 
}: TestimonialsSectionProps) => {
  const testimonial = testimonials[currentTestimonial];

  if (!testimonial) return null;

  return (
    <div className="glass-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gradient">Client Testimonials</h3>
            <p className="text-muted-foreground">What colleagues and clients say</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevious}
            className="w-10 h-10 bg-muted/50 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-smooth focus-ring"
          >
            <Icon name="ChevronLeftIcon" size={20} className="text-muted-foreground hover:text-accent" />
          </button>
          <button
            onClick={onNext}
            className="w-10 h-10 bg-muted/50 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-smooth focus-ring"
          >
            <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground hover:text-accent" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <AppImage
              src={testimonial.avatar}
              alt={testimonial.avatarAlt}
              className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
            />
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={16}
                    variant={i < testimonial.rating ? 'solid' : 'outline'}
                    className={i < testimonial.rating ? 'text-warning' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <blockquote className="text-lg text-foreground leading-relaxed mb-4">
                "{testimonial.content}"
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.position} at {testimonial.company}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {testimonial.project}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation Dots */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-accent w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => {
                // This would be handled by parent component
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;