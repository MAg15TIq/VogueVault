'use client';

import { useState } from 'react';
import Image from 'next/image';

// Types for testimonials
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

// Types for stats
interface Stat {
  label: string;
  value: string;
}

interface SocialProofProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  stats?: Stat[];
  variant?: 'default' | 'compact' | 'minimal';
  showTestimonials?: boolean;
  showStats?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah J.',
    role: 'Fashion Enthusiast',
    content: 'VogueVault has become my go-to source for fashion inspiration. The articles are well-researched and provide practical advice I can actually use in my daily life.',
    rating: 5,
    image: '/images/testimonials/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Michael T.',
    role: 'Regular Reader',
    content: 'The lifestyle articles have genuinely helped me improve my daily routines. I appreciate the depth and thoughtfulness that goes into each piece. Highly recommended!',
    rating: 5,
    image: '/images/testimonials/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Aisha K.',
    role: 'Beauty Blogger',
    content: 'The beauty articles on VogueVault have completely transformed my skincare routine. I love how they explain the science behind products and provide honest reviews.',
    rating: 5,
    image: '/images/testimonials/testimonial-3.jpg'
  }
];

const defaultStats: Stat[] = [
  { label: 'Monthly Readers', value: '10k+' },
  { label: 'Quality Articles', value: '40+' },
  { label: 'Average Rating', value: '4.8' },
  { label: 'Social Followers', value: '2k+' }
];

export default function SocialProof({
  title = 'What Our Readers Say',
  description = 'Join thousands of readers who trust VogueVault for quality content on fashion, lifestyle, beauty, and culture.',
  testimonials = defaultTestimonials,
  stats = defaultStats,
  variant = 'default',
  showTestimonials = true,
  showStats = true
}: SocialProofProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Render different variants
  if (variant === 'compact') {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
        {showStats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {showTestimonials && testimonials.length > 0 && (
          <div>
            <div className="mb-4">
              {renderStars(testimonials[activeTestimonial].rating)}
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 italic">"{testimonials[activeTestimonial].content}"</p>
            <div className="flex items-center">
              <div className="font-medium text-sm">{testimonials[activeTestimonial].name}</div>
              <div className="mx-2 text-xs">•</div>
              <div className="text-neutral-500 text-xs">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="py-4">
        {showStats && (
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="flex items-center">
                <span className="font-bold text-primary mr-2">{stat.value}</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-300">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        
        {showTestimonials && testimonials.length > 0 && (
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-300 text-sm italic mb-2">"{testimonials[0].content.substring(0, 100)}..."</p>
            <div className="text-xs text-neutral-500">- {testimonials[0].name}</div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold mb-3">{title}</h2>}
            {description && (
              <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Social Proof Stats */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Testimonials */}
        {showTestimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  {testimonial.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-neutral-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
