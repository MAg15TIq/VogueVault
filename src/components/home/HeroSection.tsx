'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play, Pause } from 'lucide-react';

interface HeroArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'fashion' | 'beauty' | 'lifestyle' | 'culture';
  image: string;
  videoUrl?: string; // Optional video URL for video background
  author: {
    name: string;
    image: string;
    role: string;
    email: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
}

const HeroSection = ({ featuredArticle }: { featuredArticle: HeroArticle }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  useEffect(() => {
    // Set loaded state after a short delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
      {/* Background Media (Image or Video) - Horizone Style */}
      <div
        className="absolute inset-0 w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full h-full relative">
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Gradient Overlay - Horizone Style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content - Horizone Style */}
      <div className="container mx-auto px-4 h-full flex items-end pb-24 relative z-10">
        <div className="max-w-3xl">
          <div
            className={`mb-4 transition-all duration-500 delay-100 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block px-3 py-1 bg-white/90 text-primary text-sm font-medium rounded-full uppercase tracking-wider shadow-lg transition-shadow">
              {featuredArticle.category}
            </span>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-serif transition-all duration-700 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {featuredArticle.title}
          </h1>

          <p
            className={`text-white/90 text-xl mb-8 max-w-2xl transition-all duration-700 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {featuredArticle.excerpt}
          </p>

          <div
            className={`flex items-center gap-6 transition-all duration-700 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src={featuredArticle.author.image}
                  alt={featuredArticle.author.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="text-white font-medium">{featuredArticle.author.name}</p>
                <p className="text-white/70 text-sm">
                  {formatDate(featuredArticle.publishDate)} • {featuredArticle.readTime} mins read
                </p>
              </div>
            </div>

            <Link href={`/articles/${featuredArticle.slug}`} className="ml-auto">
              <Button
                className="group bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-white/20 transition-all rounded-full px-6"
                size="lg"
              >
                Read Article
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
