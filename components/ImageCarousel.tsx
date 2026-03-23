import React from 'react';

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className="w-full overflow-hidden py-10">
      <div className="flex animate-scroll gap-6">
        {[...images, ...images].map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[535px] h-[620px] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
            <img 
              src={src} 
              alt={`Carousel image ${index + 1}`} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
