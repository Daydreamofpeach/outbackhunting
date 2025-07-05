import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PackageModal from './PackageModal';

interface FeaturedPackagesProps {
  darkMode: boolean;
}

const packages = [
  {
    id: 1,
    image: '/assets/img/gallimg/redstag/3.png',
    species: ['Red Stag'],
    difficulty: 'Moderate',
    included: [
      'Professional hunting guide',
      'Luxury lodge accommodation',
      'All meals and refreshments',
      'Field preparation of trophies',
      'Transportation to hunting areas',
      'Hunting permits and licenses',
      'Safety equipment provided'
    ]
  },
  {
    id: 2,
    image: '/assets/img/gallimg/Tahr/3.png',
    species: ['Himalayan Tahr'],
    difficulty: 'Challenging',
    included: [
      'Expert alpine hunting guide',
      'Helicopter access to remote areas',
      'Mountain lodge accommodation',
      'All meals and high-energy snacks',
      'Field preparation of trophies',
      'Safety equipment and emergency gear',
      'Hunting permits and licenses',
      'Transportation to base locations'
    ]
  },
  {
    id: 3,
    image: '/assets/img/gallimg/fallow/4.png',
    species: ['Fallow Deer'],
    difficulty: 'Moderate',
    included: [
      'Experienced hunting guide',
      'Comfortable lodge accommodation',
      'All meals and refreshments',
      'Field preparation of trophies',
      'Transportation to hunting areas',
      'Hunting permits and licenses',
      'Basic safety equipment',
      'Trophy photography services'
    ]
  },
  {
    id: 4,
    image: '/assets/img/gallimg/Elk/2.png',
    species: ['Elk'],
    difficulty: 'Challenging',
    included: [
      'Expert wilderness guide',
      'Helicopter access to remote areas',
      'Luxury wilderness lodge',
      'All meals and premium refreshments',
      'Field preparation of trophies',
      'Advanced safety equipment',
      'Hunting permits and licenses',
      'Trophy export documentation',
      'Professional photography services'
    ]
  },
  {
    id: 5,
    image: '/assets/img/gallimg/Rams/3.png',
    species: ['Rams'],
    difficulty: 'Challenging',
    included: [
      'Expert mountain guide',
      'Helicopter access to alpine areas',
      'Mountain lodge accommodation',
      'All meals and high-energy provisions',
      'Field preparation of trophies',
      'Mountain safety equipment',
      'Hunting permits and licenses',
      'Emergency communication systems',
      'Trophy photography services'
    ]
  },
  {
    id: 6,
    image: '/assets/img/gallimg/scenery/3.png',
    species: ['Red Stag', 'Tahr', 'Chamois', 'Fallow Deer', 'Wild Boar'],
    difficulty: 'Variable',
    included: [
      'Multiple expert guides',
      'Luxury accommodations throughout',
      'Helicopter access to all areas',
      'All meals and premium refreshments',
      'Field preparation of all trophies',
      'Comprehensive safety equipment',
      'All hunting permits and licenses',
      'Trophy export documentation',
      'Professional photography services',
      'Trophy mounting consultation',
      'Personalized hunting strategy',
      'Flexible itinerary based on conditions'
    ]
  }
];

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricing, setPricing] = useState<any[]>([]);

  useEffect(() => {
    fetch('/pricing.json')
      .then(res => res.json())
      .then(data => setPricing(data));
  }, []);

  // Merge pricing.json fields into each package
  const mergedPackages = packages.map(pkg => {
    const pricingData = pricing.find((p: any) => p.id === pkg.id);
    return {
      ...pkg,
      ...pricingData
    };
  });

  const openModal = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <section ref={ref} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Hunting Packages</h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select from our most popular hunting experiences, crafted to provide the ultimate New Zealand adventure
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mergedPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`rounded-lg overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-xl transition-all hover:-translate-y-1`}
            >
              <div className="relative overflow-hidden h-60">
                <img 
                  src={pkg.image} 
                  alt={`${pkg.title || ''} - New Zealand hunting package in ${pkg.location || ''}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{pkg.title || ''}</h3>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-amber-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.duration || ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-amber-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.location || ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-amber-500" />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1-2</span>
                  </div>
                </div>
                
                <p className={`text-sm mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-amber-500">
                    ${typeof pkg.price === 'number' ? pkg.price.toLocaleString('en-US') : '0'}
                  </span>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      pkg.difficulty === 'Challenging' ? 'bg-red-100 text-red-800' :
                      pkg.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pkg.difficulty}
                    </span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.bestSeason || ''}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(pkg)}
                    className={`flex-1 text-center py-2 px-4 rounded-lg border font-medium transition-colors ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400' 
                        : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                    }`}
                  >
                    View Details
                  </button>
                  
                  <Link
                    to={`/contact?package=${pkg.id}&huntType=${encodeURIComponent(pkg.huntType || '')}&species=${encodeURIComponent((pkg.species || []).join(', '))}&price=${pkg.price || 0}&duration=${encodeURIComponent(pkg.duration || '')}&location=${encodeURIComponent(pkg.location || '')}`}
                    className="flex-1 text-center py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Book This Hunt
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/packages"
            className={`inline-block px-6 py-3 border-2 rounded-full font-medium transition-colors ${
              darkMode 
                ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white' 
                : 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
            }`}
          >
            View All Packages
          </Link>
        </div>
      </div>
      
      {/* Package Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        package={selectedPackage}
        darkMode={darkMode}
      />
    </section>
  );
};

export default FeaturedPackages;