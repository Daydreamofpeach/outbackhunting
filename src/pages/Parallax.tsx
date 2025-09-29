import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Calendar, MapPin, Target, Settings, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxComponent from '../components/ParallaxComponent';
import Footer from '../components/Footer';
import CollapsibleHuntingPackages from '../components/CollapsibleHuntingPackages';
import TestimonialSlider from '../components/TestimonialSlider';
import AnimalGalleries from '../components/AnimalGalleries';
import OptimizedImage from '../components/OptimizedImage';
import ImageSlider from '../components/ImageSlider';
import { HuntData } from '../services/pricingService';
import SEO from '../components/SEO';
// import Loading from '../components/Loading';
// import { useCriticalImageLoader } from '../hooks/useCriticalImageLoader';
import parallaxConfigs from '../data/parallaxConfigs.json';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Parallax: React.FC<ParallaxProps> = ({ darkMode, toggleDarkMode }) => {
  const [contentReady, setContentReady] = useState(true); // Always ready for optimal performance
  const [selectedHuntForDetails, setSelectedHuntForDetails] = useState<HuntData | null>(null);
  
  // Removed critical image loader to prevent 404 errors and improve performance
  // Images will load naturally without blocking content

  // SEO Structured Data for Home Page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    "name": "Outback Hunting New Zealand",
    "description": "Premier New Zealand hunting outfitter offering guided Red Deer, Tahr, and Chamois hunting experiences in Canterbury's pristine wilderness areas.",
    "url": "https://outbackhuntingnz.com",
    "logo": "https://outbackhuntingnz.com/assets/img/gareth/profile/GarethLogo-02.svg",
    "image": "https://outbackhuntingnz.com/assets/img/gareth/profile/Pic2.JPG",
    "telephone": "+64273113848",
    "email": "garethh85@hotmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NZ",
      "addressRegion": "Canterbury",
      "addressLocality": "South of Christchurch"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-43.5321",
      "longitude": "172.6362"
    },
    "serviceType": ["Hunting Tours", "Guided Hunting", "Trophy Hunting", "Wilderness Adventures"],
    "priceRange": "$$$",
    "areaServed": {
      "@type": "Place",
      "name": "Canterbury, New Zealand"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hunting Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Red Deer Hunting",
            "description": "Guided Red Deer stag hunting in New Zealand wilderness"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Tahr Hunting",
            "description": "Alpine Tahr hunting adventures in mountain terrain"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Chamois Hunting",
            "description": "Mountain Chamois hunting in scenic landscapes"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Gareth Hall",
      "jobTitle": "Professional Hunting Guide",
      "description": "Expert hunting guide with 30+ years experience in New Zealand wilderness hunting"
    }
  };

  useEffect(() => {
    // Only run animations when content is ready
    if (!contentReady) return;

    // Hide the header and footer for full-screen experience
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) {
      main.style.padding = '0';
      main.style.margin = '0';
    }
    
    // Ensure body and html take full viewport but allow scrolling
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto'; // Allow natural scrolling
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto'; // Allow natural scrolling
    
    // Cloud animations with seamless infinite tiling
    const cloudContainer1 = document.querySelector('.cloud-container-1');
    const cloudContainer2 = document.querySelector('.cloud-container-2');
    const cloudContainer3 = document.querySelector('.cloud-container-3');
    const cloudContainer1Flipped = document.querySelector('.cloud-container-1-flipped');
    const cloudContainer2Flipped = document.querySelector('.cloud-container-2-flipped');
    const cloudContainer3Flipped = document.querySelector('.cloud-container-3-flipped');
    const cloudContainer4Flipped = document.querySelector('.cloud-container-4-flipped');
    
    // Top clouds scroll animations - three phase animation
    if (cloudContainer1) {
      // Phase 1: Initial transition in
      gsap.fromTo(cloudContainer1, 
        { x: '0%', opacity: 0 },
        {
          x: '20%',
          opacity: 0.85,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '20% bottom',
            scrub: 0.5
          }
        }
      );
      
      // Phase 2: Stay static and fade out in middle - stays at opacity 0
      gsap.to(cloudContainer1, {
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: '40% bottom',
          end: '60% bottom',
          scrub: 0.5
        }
      });
      
      
      // Very subtle floating animation
      gsap.to(cloudContainer1, {
        y: '+=2',
        duration: 8,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }
    
    if (cloudContainer2) {
      // Phase 1: Initial transition in
      gsap.fromTo(cloudContainer2, 
        { x: '50%', opacity: 0 },
        {
          x: '30%',
          opacity: 0.7,
          duration: 2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '25% bottom',
            scrub: 0.6
          }
        }
      );
      
      // Phase 2: Stay static and fade out in middle - stays at opacity 0
      gsap.to(cloudContainer2, {
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: '45% bottom',
          end: '65% bottom',
          scrub: 0.6
        }
      });
      
      
      // Very subtle floating animation
      gsap.to(cloudContainer2, {
        y: '+=3',
        duration: 10,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }
    
    if (cloudContainer3) {
      gsap.fromTo(cloudContainer3, 
        { x: '25%' },
        {
          x: '75%',
          duration: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.content-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4
          }
        }
      );
      
      // Very subtle floating animation
      gsap.to(cloudContainer3, {
        y: '+=3',
        duration: 12,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }
    
    // Bottom flipped clouds - slowly float down as user scrolls
    if (cloudContainer1Flipped) {
      // Cloud floats down slowly
      gsap.fromTo(cloudContainer1Flipped, 
        { y: '-20%', opacity: 0.7 },
        {
          y: '20%',
          opacity: 0.7,
          duration: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bottom-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
      
    }
    
    if (cloudContainer2Flipped) {
      // Cloud floats down slowly
      gsap.fromTo(cloudContainer2Flipped, 
        { y: '-10%', opacity: 0.6 },
        {
          y: '30%',
          opacity: 0.6,
          duration: 3.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bottom-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        }
      );
      
    }
    
    if (cloudContainer3Flipped) {
      // Cloud floats down slowly
      gsap.fromTo(cloudContainer3Flipped, 
        { y: '0%', opacity: 0.5 },
        {
          y: '40%',
          opacity: 0.5,
          duration: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bottom-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.5
          }
        }
      );
      
    }
    
    if (cloudContainer4Flipped) {
      // Cloud floats down slowly
      gsap.fromTo(cloudContainer4Flipped, 
        { y: '-5%', opacity: 0.4 },
        {
          y: '25%',
          opacity: 0.4,
          duration: 3.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.bottom-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8
          }
        }
      );
      
    }
    
    // Ensure clouds are visible on mobile by adjusting container height and positioning
    const adjustCloudContainers = () => {
      const isMobile = window.innerWidth < 768;
      const cloudContainer1 = document.querySelector('.cloud-container-1') as HTMLElement;
      const cloudContainer2 = document.querySelector('.cloud-container-2') as HTMLElement;
      const cloudWrapper = document.querySelector('.cloud-wrapper') as HTMLElement;
      
      if (isMobile) {
        if (cloudContainer1) {
          cloudContainer1.style.minHeight = '120vh';
          cloudContainer1.style.width = '300%';
          cloudContainer1.style.left = '-100%';
          cloudContainer1.style.position = 'absolute';
          cloudContainer1.style.top = '0';
        }
        if (cloudContainer2) {
          cloudContainer2.style.minHeight = '120vh';
          cloudContainer2.style.width = '300%';
          cloudContainer2.style.left = '-100%';
          cloudContainer2.style.position = 'absolute';
          cloudContainer2.style.top = '0';
        }
        if (cloudWrapper) {
          cloudWrapper.style.width = '100vw';
          cloudWrapper.style.left = '0';
          cloudWrapper.style.right = '0';
          cloudWrapper.style.overflow = 'visible';
          cloudWrapper.style.position = 'fixed';
          cloudWrapper.style.top = '0';
          cloudWrapper.style.margin = '0';
        }
      } else {
        if (cloudContainer1) {
          cloudContainer1.style.minHeight = '100vh';
          cloudContainer1.style.width = '200%';
          cloudContainer1.style.left = '-50%';
        }
        if (cloudContainer2) {
          cloudContainer2.style.minHeight = '100vh';
          cloudContainer2.style.width = '200%';
          cloudContainer2.style.left = '-50%';
        }
        if (cloudWrapper) {
          cloudWrapper.style.width = '100%';
          cloudWrapper.style.left = '0';
          cloudWrapper.style.overflow = 'visible';
        }
      }
    };
    
    // Set initial cloud container heights
    adjustCloudContainers();
    
    // Update cloud container heights on resize
    window.addEventListener('resize', adjustCloudContainers);
    
    return () => {
      // Restore original styles when component unmounts
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (main) {
        main.style.padding = '';
        main.style.margin = '';
      }
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflowX = '';
      document.body.style.overflowY = ''; // Restore vertical overflow
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.overflowY = ''; // Restore vertical overflow
      
      // Remove resize event listener
      window.removeEventListener('resize', adjustCloudContainers);
      
      // Kill all GSAP animations
      gsap.killTweensOf('.cloud-container-1, .cloud-container-2, .cloud-container-3, .cloud-container-1-flipped, .cloud-container-2-flipped, .cloud-container-3-flipped, .cloud-container-4-flipped');
    };
  }, [contentReady]);

  return (
    <>
      <SEO 
        title="New Zealand Hunting Guides | Red Deer, Tahr & Chamois Hunting | Outback Hunting NZ"
        description="Professional New Zealand hunting guides specializing in Red Deer stag hunting, Tahr alpine hunting, and Chamois mountain hunting. 30+ years experience in Canterbury's wilderness. Book your trophy hunting adventure today."
        keywords="New Zealand hunting, NZ hunting guides, Red Deer hunting, Tahr hunting, Chamois hunting, stag hunting NZ, trophy hunting New Zealand, guided hunting NZ, Canterbury hunting, South Island hunting, deer stag hunting, alpine hunting NZ, mountain hunting, New Zealand hunting outfitter, wilderness hunting NZ, red stag hunting, bull tahr hunting, hunting guide Canterbury, New Zealand hunting packages, trophy stag NZ, deer hunting South Island, hunting adventures New Zealand, guided stag hunting, hunting trips NZ, backcountry hunting, scenic hunting NZ, hunting holidays New Zealand, trophy deer hunting, New Zealand hunting experience, hunting accommodation NZ, hunting guide Gareth Hall"
        image="/assets/img/gareth/profile/Pic2.JPG"
        url="/"
        type="website"
        canonical="https://outbackhuntingnz.com/"
        huntingSpecific={{
          species: ['Red Deer', 'Tahr', 'Chamois'],
          location: 'Canterbury',
          huntType: 'Guided Trophy Hunting'
        }}
        structuredData={structuredData}
      />
      <div className="w-full m-0 p-0 overflow-x-hidden" style={{ overflow: 'visible' }}>
        {/* Hunt Details Modal */}
        <AnimatePresence>
          {selectedHuntForDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedHuntForDetails(null)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedHuntForDetails.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedHuntForDetails.species} • {selectedHuntForDetails.difficulty}</p>
                    </div>
                    <button
                      onClick={() => setSelectedHuntForDetails(null)}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus size={20} className="rotate-45" />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
                  <div className="p-6">                    
                    {/* Hunt Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-amber-600">${selectedHuntForDetails.basePrice.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Base Price</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-amber-600">{selectedHuntForDetails.baseDays}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedHuntForDetails.location}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedHuntForDetails.bestSeason}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Best Season</div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Hunt Description</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedHuntForDetails.description}</p>
                    </div>
                    
                    {/* What's Included */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedHuntForDetails.included.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* What's Not Included */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Not Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedHuntForDetails.notIncluded.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <ChevronRight size={16} className="text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* What You Need to Bring */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What You Need to Bring</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedHuntForDetails.youNeedToBring.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Booking Actions */}
                    <div className="border-t pt-6 mt-8">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setSelectedHuntForDetails(null)}
                          className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-colors ${
                            darkMode 
                              ? 'border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400' 
                              : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                          }`}
                        >
                          Close Details
                        </button>
                        
                        <Link
                          to={`/contact?hunt=${selectedHuntForDetails.id}&species=${encodeURIComponent(selectedHuntForDetails.species)}&price=${selectedHuntForDetails.basePrice}&days=${selectedHuntForDetails.baseDays}&location=${encodeURIComponent(selectedHuntForDetails.location)}`}
                          className="flex-1 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-center"
                        >
                          Book This Hunt
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* No preloaders or loading screens - optimal performance */}
      
      {/* First Parallax - Explore New Zealand */}
      <ParallaxComponent config={parallaxConfigs.parallax1} />
      
      
      {/* Clouds positioned outside content section for full viewport coverage */}
      <div className="cloud-wrapper absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 30, overflow: 'visible', width: '100vw', left: '0', right: '0', margin: '0', position: 'fixed', top: '0' }}>
        {/* Cloud Layer 1 - Simplified single cloud for better performance */}
        <div className="cloud-container-1 cloud-container absolute top-0 left-0 w-full h-full" style={{ width: '200%', left: '-50%', minHeight: '100vh' }}>
          <OptimizedImage
            src="https://assets.codepen.io/721952/cloud1.png"
            alt="Cloud 1"
            className="absolute top-0 left-0 w-full h-full opacity-85 pointer-events-none"
            style={{
              objectFit: 'cover'
            }}
            loading="lazy"
            priority={false}
          />
          <OptimizedImage
            src="https://assets.codepen.io/721952/cloud1.png"
            alt="Cloud 1 Repeat"
            className="absolute top-0 left-full w-full h-full opacity-85 pointer-events-none"
            style={{
              objectFit: 'cover'
            }}
            loading="lazy"
            priority={false}
          />
        </div>
        
        {/* Cloud Layer 2 - Simplified single cloud for better performance */}
        <div className="cloud-container-2 cloud-container absolute top-0 left-0 w-full h-full" style={{ width: '200%', left: '-50%' }}>
          <OptimizedImage
            src="https://assets.codepen.io/721952/cloud2.png"
            alt="Cloud 2"
            className="absolute top-0 left-0 w-full h-full opacity-70 pointer-events-none"
            style={{
              objectFit: 'cover'
            }}
            loading="lazy"
            priority={false}
          />
          <OptimizedImage
            src="https://assets.codepen.io/721952/cloud2.png"
            alt="Cloud 2 Repeat"
            className="absolute top-0 left-full w-full h-full opacity-70 pointer-events-none"
            style={{
              objectFit: 'cover'
            }}
            loading="lazy"
            priority={false}
          />
        </div>
      </div>

      {/* Enhanced Content section with Home Page Elements */}
      <div className={`content-section relative min-h-screen ${darkMode ? 'bg-[#0f172a]' : 'bg-white'}`} style={{ overflow: 'visible' }}>
        
        {/* Hero Image - No text overlay */}
        <div className="relative w-full h-screen lg:h-[140vh] xl:h-[160vh] hero-section">
          <OptimizedImage
            src="/assets/img/gareth/profile/Pic2.JPG"
            alt="Gareth Hall - Professional New Zealand hunting guide with 30+ years experience specializing in Red Deer, Tahr and Chamois hunting in Canterbury's wilderness areas"
            className="w-full h-full"
            priority={true}
            sizes="100vw"
          />
        </div>
        
        {/* Hero Text - Positioned at bottom overlapping both sections */}
        <div className="relative -mt-32 z-20 pt-20">
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
            {/* Glassmorphic Container */}
            <div className={`backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border ${
              darkMode 
                ? 'bg-black/30 border-white/20' 
                : 'bg-white/30 border-white/40'
            }`}>
              <header>
                <h1 className={`text-5xl md:text-6xl font-extrabold mb-2 text-center leading-tight ${
                  darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900 drop-shadow-md'
                }`}>
                  Outback Hunting New Zealand
                </h1>
                <h2 className={`text-2xl md:text-3xl font-semibold mb-2 text-center tracking-wide ${
                  darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-800 drop-shadow-md'
                }`}>
                  Professional Red Deer, Tahr & Chamois Hunting Guides
                </h2>
              </header>
              <hr className="w-24 border-t-4 border-amber-500 my-4 mx-auto" />
              <p className={`font-light text-lg md:text-xl leading-relaxed text-center mt-2 mb-8 ${
                darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-800 drop-shadow-md'
              }`}>
                Expert New Zealand hunting guides with 30+ years experience specializing in Red Deer stag hunting, 
                alpine Tahr hunting, and Chamois mountain hunting in Canterbury's pristine wilderness areas. 
                Every trophy hunting adventure is customized to your goals, fitness level, and preferences.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/packages"
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg inline-flex items-center transform hover:scale-105"
                >
                  View Pricing <ChevronRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className={`px-8 py-4 bg-transparent border-2 rounded-full transition-all duration-300 text-lg font-semibold transform hover:scale-105 ${
                    darkMode 
                      ? 'hover:bg-white/20 text-white border-white' 
                      : 'hover:bg-gray-100/50 text-gray-800 border-gray-800'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About <span className="text-amber-500">Outback Hunting</span>
            </h2>
            
            <div className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}`}>
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                I grew up on a deer farm on the rugged West Coast of New Zealand's South Island. From a young age, I was out hunting small game, and as soon as I was strong enough to carry a pack and rifle, I began pursuing all the big game New Zealand has to offer.
              </p>
              
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Over the past 30+ years, I've hunted deep into the South Island's wilderness, creating unforgettable memories for myself and for clients. I've also hunted abroad in Australia and South Africa, expanding my experience in the field. Hunting is more than a hobby, it's a way of life, and I'm proud to now share that with others through Outback Hunting.
              </p>
              
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Outback Hunting was originally run by my uncle David and his wife Hayley. I'm now taking over the business, with Dave supporting the handover to ensure we continue delivering top-quality guided hunts.
              </p>
            </div>
            
            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className={`text-center p-6 rounded-lg shadow-md ${darkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}>
                <div className="inline-block mb-4">
                  <Target size={36} className="text-amber-500" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3 Species</h3>
                <p className={darkMode ? 'text-gray-200' : 'text-gray-600'}>Red Deer, Chamois & Tahr</p>
              </div>
              
              <div className={`text-center p-6 rounded-lg shadow-md ${darkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}>
                <div className="inline-block mb-4">
                  <Award size={36} className="text-amber-500" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>30+ Years</h3>
                <p className={darkMode ? 'text-gray-200' : 'text-gray-600'}>Hunting Experience</p>
              </div>
              
              <div className={`text-center p-6 rounded-lg shadow-md ${darkMode ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}>
                <div className="inline-block mb-4">
                  <MapPin size={36} className="text-amber-500" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Canterbury</h3>
                <p className={darkMode ? 'text-gray-200' : 'text-gray-600'}>South Island Base</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <ImageSlider darkMode={darkMode} />

      {/* Featured Packages Section - Collapsible with Scroll Animations */}
      <CollapsibleHuntingPackages 
        darkMode={darkMode}
        onHuntSelect={(hunt) => {
          // Navigate to customize page with hunt
          window.location.href = `/customize?hunt=${hunt.id}`;
        }}
        onViewDetails={setSelectedHuntForDetails}
      />

      {/* Animal Galleries Section */}
      <AnimalGalleries darkMode={darkMode} />

      {/* About/Intro Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <OptimizedImage
                src="/assets/img/gareth/Scenery and camps/Arawhata tops 1.JPG"
                alt="Breathtaking Canterbury wilderness landscape where Red Deer, Tahr and Chamois hunting adventures take place with Outback Hunting New Zealand"
                className="rounded-lg shadow-xl w-full h-auto"
                style={{ maxHeight: '600px' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-amber-500">Guided Hunts</span> & Services
              </h2>
              
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                I offer tailored wilderness foot hunts for Red Deer, Chamois, and Tahr. Every hunt is customized based on your goals, fitness level, and preferences.
              </p>
              
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hunt Options</h3>
                <ul className="space-y-2">
                  {[
                    'Backpack Hunts - Walk into remote alpine country and camp overnight in tents or huts',
                    'Base Camp Hunts - Comfortable day hunts based out of a lodge or cabin',
                    'Helicopter-Assisted Hunts - Fly into remote areas and save your energy for chasing trophies',
                    'Private Land Hunts - Available upon request for those after a more relaxed hunt'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-amber-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Included in Your Hunt</h3>
                <ul className="space-y-2">
                  {[
                    'Personalized guided hunt',
                    'Field dressing of game in the field',
                    'Transport of trophies to a taxidermist (if required)',
                    'Digital photos and video footage of your hunt',
                    'Douglas Scoring (available upon request)',
                    'Tent or hut accommodation for overnight hunts',
                    'Airport pick-up and drop-off (by arrangement)'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-amber-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{item}</span>
                  </li>
                ))}
              </ul>
              </div>
              
              <div className="pt-6">
                <Link
                  to="/packages"
                  className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium"
                >
                  View all packages and pricing <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider darkMode={darkMode} />

      {/* Booking Information Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Booking <span className="text-amber-500">Information</span>
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Ready to book your hunting adventure? Here's everything you need to know.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pricing Information */}
              <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target size={20} className="text-amber-500" />
                  Day Rates (NZD)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">1 Person</span>
                    <span className="text-lg font-bold text-amber-600">$380.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">2 People</span>
                    <span className="text-lg font-bold text-amber-600">$600.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Non Hunter</span>
                    <span className="text-lg font-bold text-amber-600">$180.00 pp</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-amber-500" />
                  Booking Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
nting-                      <p className="font-medium">Deposit Required</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">10% of hunt cost (non-refundable)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Balance Due</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">30 days before your hunt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Currency</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">All prices in New Zealand Dollars</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Terms & Conditions</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Some conditions may apply</p>
                    </div>
                  </div>
                </div>
              </div>
             </div>
           </div>
         </div>
       </section>

       {/* Call to Action Section */}
       <section className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-100'}`}>
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             {/* Contact CTA */}
             <div className="text-center">
              <div className={`inline-block p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ready to plan your hunt or have a few questions first? I'd be happy to chat and help design a trip you will never forget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={18} />
                    Contact Me
                  </Link>
                  <Link
                    to="/customize"
                    className="px-6 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-full transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Settings size={18} />
                    Customize Package
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<div>
      {/* Flipped clouds at the top of the bottom image - Seamless tiling */}
      {/* 
      <div className="bottom-section relative w-full bg-white">
        {/* Flipped clouds - vertical floating only */}
      
        {/* The bottom image itself */}
        <img 
          src="/assets/img/gareth/profile/pic1.JPG" 
          alt="Hunt Image" 
          className="w-full h-auto object-cover"
        />
      </div>
  
        <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </>
  );
};

export default Parallax;