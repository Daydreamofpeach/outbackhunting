import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface ImageSliderProps {
  darkMode: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ darkMode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of slider images using the dedicated slider directory
  const sliderImages = [
    '/assets/img/gareth/Scenery and camps/DSC02245.JPG',
    '/assets/img/gareth/Scenery and camps/DSC00218.JPG',
    '/assets/img/gareth/Scenery and camps/resttime.JPG',
    '/assets/img/gareth/slider/3.png',
    '/assets/img/gareth/slider/4.png',
    '/assets/img/gareth/slider/5.png',
    '/assets/img/gareth/slider/6.png',
    '/assets/img/gareth/slider/8.png',
    '/assets/img/gareth/slider/9.png',
    '/assets/img/gareth/slider/10.png',
    '/assets/img/gareth/slider/11.png',
    '/assets/img/gareth/slider/12.png',
    '/assets/img/gareth/slider/13.png',
    '/assets/img/gareth/slider/14.png'
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const nextIndex = (currentIndex + 1) % sliderImages.length;
    setCurrentIndex(nextIndex);
    setIsTransitioning(false);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Slider Container */}
      <div 
        ref={sliderRef}
        className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
      >
        {/* Current Slide */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={sliderImages[currentIndex]}
            alt={`Hunting experience ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>


      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {sliderImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-amber-500 scale-125 shadow-lg'
                  : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / sliderImages.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default ImageSlider;
