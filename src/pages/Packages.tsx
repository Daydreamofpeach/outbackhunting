import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Calendar, Shield, Compass, Utensils, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PackageModal from '../components/PackageModal';

interface PackagesProps {
  darkMode: boolean;
}

const packages = [
  {
    id: 1,
    image: '/assets/img/gallimg/redstag/3.png',
    species: ['Red Deer'],
    difficulty: 'Moderate',
    included: [
      'Personalised guided hunt',
      'Field dressing of game in the field',
      'Transport of trophies to a taxidermist (if required)',
      'Digital photos and video footage of your hunt – included at no extra cost',
      'Tent or hut accommodation for overnight hunts',
      'Airport pick-up and drop-off (by arrangement)'
    ]
  },
  {
    id: 2,
    image: '/assets/img/gallimg/Tahr/3.png',
    species: ['Himalayan Tahr'],
    difficulty: 'Challenging',
    included: [
      'Personalised guided hunt',
      'Field dressing of game in the field',
      'Transport of trophies to a taxidermist (if required)',
      'Digital photos and video footage of your hunt – included at no extra cost',
      'Tent or hut accommodation for overnight hunts',
      'Airport pick-up and drop-off (by arrangement)'
    ]
  },
  {
    id: 3,
    image: '/assets/img/gallimg/Chamois/3.png',
    species: ['Chamois'],
    difficulty: 'Challenging',
    included: [
      'Personalised guided hunt',
      'Field dressing of game in the field',
      'Transport of trophies to a taxidermist (if required)',
      'Digital photos and video footage of your hunt – included at no extra cost',
      'Tent or hut accommodation for overnight hunts',
      'Airport pick-up and drop-off (by arrangement)'
    ]
  }
];

const Packages: React.FC<PackagesProps> = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricing, setPricing] = useState<any[]>([]);

  const openModal = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  useEffect(() => {
    document.title = 'Hunting Packages | Outback Hunting New Zealand';
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

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Header */}
      <section 
        ref={headerRef}
        className="relative py-24 md:py-32"
        style={{
          backgroundImage: 'url(/assets/img/backgrounds/landscape.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hunting Packages
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Choose from our carefully designed hunting experiences across New Zealand's most pristine wilderness areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mergedPackages.map((pkg) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.1
              });
              return (
                <motion.div
                  id={`package-${pkg.id}`}
                  ref={ref}
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
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
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ${typeof pkg.price === 'number' ? pkg.price.toLocaleString('en-US') : '0'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{pkg.title || ''}</h3>
                    
                    <div className="flex flex-wrap gap-y-2 mb-4">
                      <div className="w-1/2 flex items-center gap-1.5">
                        <Clock size={16} className="text-amber-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.duration || ''}</span>
                      </div>
                      
                      <div className="w-1/2 flex items-center gap-1.5">
                        <MapPin size={16} className="text-amber-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.location || ''}</span>
                      </div>
                      
                      <div className="w-1/2 flex items-center gap-1.5">
                        <Users size={16} className="text-amber-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1-2 Hunters</span>
                      </div>
                      
                      <div className="w-1/2 flex items-center gap-1.5">
                        <Calendar size={16} className="text-amber-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.bestSeason || ''}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pkg.difficulty === 'Challenging' ? 'bg-red-100 text-red-800' :
                        pkg.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {pkg.difficulty}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best: {pkg.bestSeason || ''}</span>
                    </div>
                    
                    <p className={`text-sm mb-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.description}</p>
                    
                    <div className="mb-5">
                      <h4 className="font-medium mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {pkg.included.slice(0, 3).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <ChevronRight size={14} className="text-amber-500 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {pkg.included.length > 3 && (
                          <li className="text-sm text-amber-500">
                            +{pkg.included.length - 3} more inclusions
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(pkg)}
                        className={`flex-1 text-center py-2.5 px-4 rounded-md border font-medium transition-colors ${
                          darkMode 
                            ? 'border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400' 
                            : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                        }`}
                      >
                        View More Details
                      </button>
                      
                      <Link
                        to={`/contact?package=${pkg.id}&huntType=${encodeURIComponent(pkg.huntType || '')}&species=${encodeURIComponent((pkg.species || []).join(', '))}&price=${pkg.price || 0}&duration=${encodeURIComponent(pkg.duration || '')}&location=${encodeURIComponent(pkg.location || '')}`}
                        className={`flex-1 text-center py-2.5 rounded-md transition-colors ${
                          darkMode ? 
                            'bg-amber-600 hover:bg-amber-700 text-white' : 
                            'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        Book This Package
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info/FAQ Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Important Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Shield size={32} className="text-amber-500" />,
                  title: 'Insurance',
                  text: 'We recommend all clients purchase comprehensive travel and medical insurance for their hunting trip.'
                },
                {
                  icon: <Compass size={32} className="text-amber-500" />,
                  title: 'Physical Requirements',
                  text: 'Most hunts require a moderate level of fitness. Please let us know if you have any health concerns.'
                },
                {
                  icon: <Utensils size={32} className="text-amber-500" />,
                  title: 'Dietary Needs',
                  text: 'Special dietary requirements can be accommodated with advance notice.'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg text-center ${
                    darkMode ? 'bg-gray-900' : 'bg-white'
                  } shadow-md`}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-amber-600 bg-opacity-10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                {[
                  {
                    question: 'What is the booking process?',
                    answer: 'To secure your hunt, we require a 50% deposit. The remaining balance is due 60 days before your hunt date. We\'ll work with you to create a custom itinerary based on your preferences.'
                  },
                  {
                    question: 'What happens if I can\'t hunt on my scheduled dates?',
                    answer: 'If you need to reschedule, we require 90 days\' notice for a full transfer of your deposit to new dates. Cancellations made less than 90 days before the hunt are subject to our cancellation policy.'
                  },
                  {
                    question: 'What about trophy export and shipping?',
                    answer: 'We handle all paperwork for exporting trophies from New Zealand. Shipping and import charges to your home country are not included in package prices. We work with reliable shipping partners to ensure your trophies arrive safely.'
                  },
                  {
                    question: 'What type of firearms can I bring to New Zealand?',
                    answer: 'Visitors can bring their own firearms with proper permits. We can assist with the paperwork. Alternatively, we have quality firearms available for rent. Most clients prefer calibers between .270 and .300 for our hunting conditions.'
                  }
                ].map((item, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-medium mb-2">
                      {item.question}
                    </h4>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="mb-6">
                Have other questions or need a custom package? Contact us for personalized assistance.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
              >
                Contact Our Team <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Package Modal */}
      <PackageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        package={selectedPackage}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Packages;