import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Calendar, MapPin, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import CollapsibleHuntingPackages from '../components/CollapsibleHuntingPackages';
import TestimonialSlider from '../components/TestimonialSlider';
import AnimalGalleries from '../components/AnimalGalleries';
import OptimizedImage from '../components/OptimizedImage';

interface HomeProps {
  darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  useEffect(() => {
    document.title = 'Outback Hunting New Zealand | Premium Hunting Experiences in New Zealand';
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Outback Hunting New Zealand - Premium New Zealand Hunting Experiences",
    "description": "Experience the ultimate New Zealand hunting adventure with Outback Hunting New Zealand. Trophy hunting packages for Red Deer, Tahr, and Chamois. Experienced guides, luxury accommodations, and exclusive hunting grounds.",
    "url": "https://outbackhuntingnz.com",
    "mainEntity": {
      "@type": "TouristInformationCenter",
      "name": "Outback Hunting New Zealand",
      "description": "Premium New Zealand hunting experiences with experienced guides, luxury accommodations, and exclusive hunting grounds.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NZ",
        "addressRegion": "South Island"
      },
      "serviceType": "Hunting Tours",
      "priceRange": "$$$"
    }
  };

  return (
    <>
      <Helmet>
        <title>Outback Hunting New Zealand | Premier Red Deer, Tahr & Chamois Hunting | NZ Wilderness Adventures</title>
        <meta name="description" content="Experience world-class hunting in New Zealand's pristine wilderness. Guided Red Deer stag hunting, Tahr alpine adventures, and Chamois mountain hunts. Trophy hunting packages with experienced guide Gareth Hall in Canterbury's stunning landscapes." />
        <meta name="keywords" content="New Zealand hunting, NZ hunting, Red Deer hunting New Zealand, Tahr hunting, Chamois hunting, stag hunting, trophy hunting NZ, wilderness hunting, alpine hunting, Canterbury hunting, South Island hunting, deer stag antlers, guided hunting New Zealand, hunting outfitter NZ, New Zealand hunting guide, backcountry hunting, mountain hunting, trophy stag, red stag hunting, bull tahr, chamois hunting guide, hunting packages New Zealand, scenic hunting, outback hunting, deer hunting Canterbury, hunting adventures NZ, trophy deer hunting, New Zealand hunting experience, guided stag hunting, hunting guide Gareth Hall, wilderness adventures New Zealand, hunting scenery, New Zealand hunting lodge, hunting accommodation NZ, hunting trips New Zealand, hunting holidays NZ, red deer trophy, tahr trophy, chamois trophy, hunting South Island, Canterbury hunting guide, alpine hunting New Zealand, mountain hunting guide, wilderness hunting guide" />
        <link rel="canonical" href="https://outbackhuntingnz.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premier New Zealand Red Deer, Tahr & Chamois Hunting | Outback Hunting NZ" />
        <meta property="og:description" content="Experience world-class hunting in New Zealand's pristine wilderness. Guided Red Deer stag hunting, Tahr alpine adventures, and Chamois mountain hunts with experienced guide Gareth Hall." />
        <meta property="og:image" content="/assets/img/gareth/profile/Pic2.JPG" />
        <meta property="og:url" content="https://outbackhuntingnz.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_NZ" />
        <meta property="og:site_name" content="Outback Hunting New Zealand" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premier New Zealand Red Deer, Tahr & Chamois Hunting | Outback Hunting NZ" />
        <meta name="twitter:description" content="Experience world-class hunting in New Zealand's pristine wilderness. Guided Red Deer stag hunting, Tahr alpine adventures, and Chamois mountain hunts." />
        <meta name="twitter:image" content="/assets/img/gareth/profile/Pic2.JPG" />
        <meta name="twitter:site" content="@OutbackHuntingNZ" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Clean Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/img/gareth/Scenery and camps/IMG_1675.JPG)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <OptimizedImage 
                src="/assets/img/gareth/GarethLogoC.png" 
                alt="Outback Hunting New Zealand Logo" 
                className="h-24 md:h-32 w-auto drop-shadow-2xl"
                priority={true}
              />
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Experience the Ultimate <span className="text-amber-500">New Zealand</span> Hunting Adventure
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Personal guided hunts for Red Deer, Chamois, and Tahr in New Zealand's most breathtaking wilderness areas. 
              Experience the thrill of hunting with 30+ years of expertise in the Canterbury Highlands and Southern Alps.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/packages"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg inline-flex items-center transform hover:scale-105"
              >
                View Pricing <ChevronRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full transition-all duration-300 text-lg font-semibold transform hover:scale-105"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats/Features Section */}
      <section 
        ref={statsRef}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Award size={36} className="text-amber-500" />, 
                stat: '30+', 
                text: 'Years Experience' 
              },
              { 
                icon: <Target size={36} className="text-amber-500" />, 
                stat: '3', 
                text: 'Species Available' 
              },
              { 
                icon: <MapPin size={36} className="text-amber-500" />, 
                stat: 'Canterbury', 
                text: 'South Island Base' 
              },
              { 
                icon: <Calendar size={36} className="text-amber-500" />, 
                stat: 'Personal', 
                text: 'Guided Hunts' 
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`text-center p-6 rounded-lg ${
                  darkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-md`}
              >
                <div className="inline-block mb-4">{item.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{item.stat}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages Section - Collapsible with Scroll Animations */}
      <CollapsibleHuntingPackages 
        darkMode={darkMode}
        onHuntSelect={(hunt) => {
          // Navigate to customize page with hunt
          window.location.href = `/customize?hunt=${hunt.id}`;
        }}
        onViewDetails={(hunt) => {
          // Navigate to detailed view or show modal
          window.location.href = `/pricing#${hunt.id}`;
        }}
      />

      {/* Animal Galleries Section */}
      <AnimalGalleries darkMode={darkMode} />

      {/* About/Intro Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <OptimizedImage
                src="/assets/img/scenery.jpg"
                alt="New Zealand hunting guide in scenic wilderness - Professional hunting experience"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                style={{ maxHeight: '600px' }}
                loading="lazy"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet <span className="text-amber-500">Gareth Hall</span>
              </h2>
              
              <p className="text-lg leading-relaxed">
                My hunting journey began at the age of 12 when I first picked up a pack and rifle, beginning to pursue all the big game New Zealand has to offer.
              </p>
              
              <p className="text-lg leading-relaxed">
                Over the past 30+ years, I've hunted deep into the South Island's wilderness, creating unforgettable memories for myself and for clients. I've also hunted abroad in Australia and South Africa, expanding my experience in the field.
              </p>
              
              <p className="text-lg leading-relaxed">
                Hunting is more than a hobby, it's a way of life, and I'm proud to now share that with others through Outback Hunting.
              </p>
              
              <ul className="space-y-4">
                {[
                  '30+ years of hunting experience across New Zealand and internationally',
                  'Experienced knowledge of Red Deer, Chamois, and Tahr hunting',
                  'Personalized guided hunts tailored to your goals and fitness level',
                  'Access to exclusive Canterbury Highlands and Southern Alps terrain',
                  'Professional field dressing and trophy preparation included',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-amber-500 rounded-full p-1 mt-1.5 flex-shrink-0">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium"
                >
                  Learn more about my story <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider darkMode={darkMode} />

      {/* CTA Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: 'url(/assets/img/body_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Embark on Your Next Hunting Adventure?
          </h2>
          
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Contact us today to book your custom hunting package and experience the wilderness of New Zealand like never before.
          </p>
          
          <Link
            to="/contact"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors shadow-lg hover:shadow-xl text-lg inline-flex items-center"
          >
            Book Your Hunt Now <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;