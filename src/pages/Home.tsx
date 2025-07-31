import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Calendar, MapPin, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import FeaturedPackages from '../components/FeaturedPackages';
import TestimonialSlider from '../components/TestimonialSlider';
import AnimalGalleries from '../components/AnimalGalleries';

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
    "description": "Experience the ultimate New Zealand hunting adventure with Outback Hunting New Zealand. Trophy hunting packages for Red Stag, Tahr, Chamois, Fallow Deer, Elk, Rams, and Whitetail. Expert guides, luxury accommodations, and exclusive hunting grounds.",
    "url": "https://outbackhuntingnz.com",
    "mainEntity": {
      "@type": "TouristInformationCenter",
      "name": "Outback Hunting New Zealand",
      "description": "Premium New Zealand hunting experiences with expert guides, luxury accommodations, and exclusive hunting grounds.",
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
        <title>Outback Hunting New Zealand | Premium New Zealand Hunting Experiences</title>
        <meta name="description" content="Outback Hunting New Zealand offers premium hunting packages for Red Deer, Tahr, and Chamois. Expert guides, luxury accommodations, and exclusive hunting grounds." />
        <meta name="keywords" content="New Zealand hunting, Red Deer hunting, Tahr hunting, Chamois hunting, trophy hunting, guided hunting, hunting packages, hunting outfitter, New Zealand hunting guide" />
        <link rel="canonical" href="https://outbackhuntingnz.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Outback Hunting New Zealand - Premium New Zealand Hunting Experiences" />
        <meta property="og:description" content="Outback Hunting New Zealand offers premium hunting packages for Red Deer, Tahr, and Chamois. Expert guides, luxury accommodations, and exclusive hunting grounds." />
        <meta property="og:image" content="/assets/img/scenery.jpg" />
        <meta property="og:url" content="https://outbackhuntingnz.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Outback Hunting New Zealand - Premium New Zealand Hunting Experiences" />
        <meta name="twitter:description" content="Outback Hunting New Zealand offers premium hunting packages for Red Deer, Tahr, and Chamois. Expert guides, luxury accommodations, and exclusive hunting grounds." />
        <meta name="twitter:image" content="/assets/img/backgrounds/landscape.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/img/backgrounds/landscape.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 z-10 text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Experience the Ultimate <span className="text-amber-500">New Zealand</span> Hunting Adventure
            </h1>
            
            <p className="text-xl text-gray-200 mb-10">
              Personal guided hunts for Red Deer, Chamois, and Tahr in New Zealand's most breathtaking wilderness areas. 
              Experience the thrill of hunting with 30+ years of expertise in the Canterbury Highlands and Southern Alps.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/packages"
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors shadow-lg hover:shadow-xl text-lg inline-flex items-center"
              >
                View Pricing <ChevronRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full transition-colors text-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
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

      {/* Featured Packages Section */}
      <FeaturedPackages darkMode={darkMode} />

      {/* Animal Galleries Section */}
      <AnimalGalleries darkMode={darkMode} />

      {/* About/Intro Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
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
                  'Expert knowledge of Red Deer, Chamois, and Tahr hunting',
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