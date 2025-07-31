import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Users, Target, Calendar, Plus, Minus, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { pricingService, HuntData } from '../services/pricingService';

interface FeaturedPackagesProps {
  darkMode: boolean;
}

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [selectedHuntForDetails, setSelectedHuntForDetails] = useState<HuntData | null>(null);
  const [hunts, setHunts] = useState<HuntData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHunts = async () => {
      try {
        const allHunts = await pricingService.getAllHunts();
        setHunts(allHunts);
      } catch (error) {
        console.error('Failed to load hunts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHunts();
  }, []);

  if (loading) {
    return (
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading hunting packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
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
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
                <div className="p-6 space-y-8">
                  {/* Hunt Image and Basic Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
                      <img 
                        src={selectedHuntForDetails.image} 
                        alt={selectedHuntForDetails.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${selectedHuntForDetails.basePrice.toLocaleString()}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Hunt Details</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedHuntForDetails.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                          <p className="font-semibold">{selectedHuntForDetails.baseDays} days</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                          <p className="font-semibold">{selectedHuntForDetails.location}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Best Season</p>
                          <p className="font-semibold">{selectedHuntForDetails.bestSeason}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
                          <p className="font-semibold">{selectedHuntForDetails.difficulty}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* What's Included */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      What's Included
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedHuntForDetails.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* What's Not Included */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✗</span>
                      </div>
                      Not Included
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedHuntForDetails.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* You Need to Bring */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">📦</span>
                      </div>
                      You Need to Bring
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedHuntForDetails.youNeedToBring.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Available Extras */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">★</span>
                      </div>
                      Available Extras
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {selectedHuntForDetails.extras.map((extra) => (
                        <div key={extra.id} className={`p-4 rounded-xl border-2 ${
                          darkMode ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-white border-gray-200'
                        } hover:border-amber-500 transition-colors`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{extra.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{extra.description}</p>
                            </div>
                            <span className="text-lg font-bold text-amber-600 ml-4">
                              ${extra.price.toLocaleString()}{extra.perDay ? '/day' : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <section ref={ref} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Hunting Packages</h2>
            <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose from our premium hunting experiences and customize your perfect New Zealand adventure
            </p>
          </motion.div>
        </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hunts.map((hunt, index) => (
            <motion.div
                key={hunt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`rounded-lg overflow-hidden shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
                } border-2 border-transparent hover:border-amber-500 transition-all hover:-translate-y-1`}
              >
                <div className="relative h-48">
                  <img 
                    src={hunt.image} 
                    alt={hunt.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-600 text-white px-2 py-1 rounded text-sm font-bold">
                    ${hunt.basePrice.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold">{hunt.name}</h3>
                    <span className="text-2xl font-bold text-amber-600">
                      ${hunt.basePrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {hunt.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hunt.difficulty === 'Challenging' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      hunt.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {hunt.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      {hunt.baseDays} days
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                      {hunt.species}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-amber-500" />
                      <span className="text-xs">{hunt.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-amber-500" />
                      <span className="text-xs">{hunt.bestSeason}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                      onClick={() => setSelectedHuntForDetails(hunt)}
                      className="flex-1 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                  <Link
                      to={`/customize?hunt=${hunt.id}`}
                      className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                      <Plus size={16} />
                      Add to Package
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to="/customize"
                className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
              >
                Customize Your Package
              </Link>
              <Link
                to="/contact"
              className={`inline-block px-6 py-3 border-2 rounded-full font-medium transition-colors ${
                darkMode 
                  ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white' 
                  : 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
              }`}
            >
                Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturedPackages;