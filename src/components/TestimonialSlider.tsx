import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface TestimonialSliderProps {
  darkMode: boolean;
}

const testimonials = [
  {
    id: 1,
    text: "Just got back from a free range tahr hunt with Gareth and it was everything I hoped for and more. Gareth knows the mountains inside out and put us in the right spot from day one. He's calm, professional, and genuinely passionate about hunting. You're not just following a guide, you're learning as you go. The terrain was rugged and the tahr were wild, exactly what you want from a proper free range hunt. We worked hard for it, but that made the result even better. If you're after an authentic South Island alpine experience with someone who actually knows what they're doing, you won't go wrong with Gareth.",
    name: "Matt Porter",
    location: "Tahr Hunt, Unreal Alpine Experience",
    rating: 5
  },
  {
    id: 2,
    text: "Went out with Gareth again, this time for a fallow buck hunt in Mid Canterbury. Just like last time, he delivered. The country was classic rolling farmland, scattered Matagouri, and open faces ideal for glassing. We saw plenty of deer sign and after a bit of patience and a solid stalk, I dropped a great buck. Gareth's calm and practical approach makes the whole experience feel effortless. He knows how to read the animals and the land without overcomplicating things. If you're after a fair chase fallow hunt with a guide who actually knows what he's doing, I'd highly recommend booking with Gareth.",
    name: "Matt Porter",
    location: "Mid Canterbury Fallow Buck Hunt, Genuine Free Range Experience",
    rating: 5
  }
];

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ darkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref}
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Hunters Say
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Read testimonials from hunters who've experienced our world-class guided hunts
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className={`rounded-xl p-8 md:p-10 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-xl`}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 20 
                }}
                transition={{ duration: 0.5 }}
                className={`${index === activeIndex ? 'block' : 'hidden'}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#f59e0b" className="text-amber-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg italic mb-6">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="font-medium">
                    <span className="block text-amber-500">{testimonial.name}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-3">
            <button 
              onClick={prevSlide}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-200'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-amber-500" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-amber-500 w-6' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-200'
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-amber-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;