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
    text: "My Red Stag hunting experience with Outback Hunting New Zealand exceeded all expectations. The guides were incredibly knowledgeable and put me onto a magnificent 14-point stag. The accommodations were top-notch, with amazing meals. I'm already planning my return trip!",
    name: "James Wilson",
    location: "Texas, USA",
    rating: 5,
    image: "/src/assets/img/profile/profile1.png"
  },
  {
    id: 2,
    text: "Hunting Tahr in the Southern Alps was a truly once-in-a-lifetime experience. The terrain was challenging but the views were breathtaking. My guide, Mike, was patient and experienced, ensuring I got a trophy-class bull. The helicopter ride to the hunting area was an adventure in itself!",
    name: "Robert Johnson",
    location: "Alberta, Canada",
    rating: 5,
    image: "/src/assets/img/profile/profile3.png"
  },
  {
    id: 3,
    text: "As a female hunter, I was looking for an outfitter that would take my hunt seriously. Outback Hunting New Zealand delivered beyond my expectations. The entire staff was professional, the lodging was comfortable, and I took a beautiful Chamois. I highly recommend them to any hunter visiting New Zealand.",
    name: "Sarah Mitchell",
    location: "Colorado, USA",
    rating: 5,
    image: "/src/assets/img/profile/profile4.gif"
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
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/4 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-500">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} - ${testimonial.location} hunting client testimonial`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="flex mb-4">
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