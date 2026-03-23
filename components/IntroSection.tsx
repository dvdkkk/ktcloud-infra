
import React, { useEffect, useRef, useState } from 'react';
import { Users, Zap, Target } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { ImageCarousel } from './ImageCarousel';

export const IntroSection: React.FC = () => {
  const { content } = useContent();
  const { intro } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const transitionBase = "transition-all duration-500 ease-out transform";
  
  const getStyle = (delay: string) => ({
    className: `${transitionBase} ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-black relative border-b border-zinc-900 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Image Carousel */}
          <div className={`mb-16 ${getStyle("delay-300").className}`}>
            <ImageCarousel images={intro.images} />
          </div>

          {/* Top Badge */}
          <div className={getStyle("delay-0").className}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-red-600 mb-8 shadow-[0_0_15px_rgba(185,28,28,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">{intro.badge}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className={`text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[1.3] md:leading-[1.1] mb-10 tracking-tight break-keep ${getStyle("delay-100").className}`}>
            {intro.title1}<br />
            <span className="relative inline-block px-2">
                <span className="absolute inset-0 bg-red-700 rounded-lg transform translate-y-1"></span>
                <span className="relative text-white">{intro.highlight}</span>
            </span>{intro.title2}
          </h2>

          {/* Description */}
          <p className={`text-base md:text-xl text-zinc-400 font-light leading-relaxed mb-16 break-keep animate-blink ${getStyle("delay-200").className}`}>
            {intro.description}
          </p>

        </div>
      </div>
    </section>
  );
};
