import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HuntData } from '../services/pricingService';
import CollapsibleHuntingPackages from './CollapsibleHuntingPackages';

interface FeaturedPackagesProps {
  darkMode: boolean;
}

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ darkMode }) => {
  const [selectedHuntForDetails, setSelectedHuntForDetails] = useState<HuntData | null>(null);

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
                  {/* Hunt Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hunt Details</h3>
                        <div className="bg-amber-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                          {selectedHuntForDetails.priceOnApplication ? 'POA' : `$${selectedHuntForDetails.basePrice.toLocaleString()}`}
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{selectedHuntForDetails.description}</p>
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
                              {extra.priceOnApplication ? 'POA' : `$${extra.price.toLocaleString()}${extra.perDay ? '/day' : ''}`}
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

    <>
      <CollapsibleHuntingPackages 
        darkMode={darkMode}
        onHuntSelect={(hunt) => {
          // Navigate to customize page with hunt
          window.location.href = `/customize?hunt=${hunt.id}`;
        }}
        onViewDetails={setSelectedHuntForDetails}
      />
      
      <section className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                  to="/customize"
                  className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-2xl transition-all duration-200 hover:shadow-lg"
                >
                  Customize Your Package
                </Link>
                <Link
                  to="/contact"
                className={`inline-block px-8 py-4 border-2 rounded-2xl font-bold text-lg transition-all duration-200 ${
                  darkMode 
                    ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black' 
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
    </>
  );
};

export default FeaturedPackages;