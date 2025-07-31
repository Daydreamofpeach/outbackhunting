import React from 'react';
import { Dialog } from '@headlessui/react';
import { X, Clock, MapPin, Users, Calendar, Shield, Compass, Utensils, ChevronRight, Target, Award } from 'lucide-react';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: any;
  darkMode: boolean;
}

const PackageModal: React.FC<PackageModalProps> = ({ isOpen, onClose, package: pkg, darkMode }) => {
  if (!pkg) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <Dialog.Panel className="w-full max-w-4xl max-h-[85vh] overflow-y-auto">
          <div className={`relative rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Header */}
            <div className="relative h-64 md:h-80">
              <img
                src={pkg.image}
                alt={`${pkg.title} - New Zealand hunting package`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'
                }`}
              >
                <X size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
              </button>
              
              {/* Price badge */}
              <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                ${pkg.price.toLocaleString('en-US')}
              </div>
              
              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-white'}`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{pkg.title}</h2>
                <p className="text-lg text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{pkg.description}</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.duration}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.location}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>1-2 Hunters</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Group Size</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pkg.bestSeason}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Best Season</p>
                  </div>
                </div>
              </div>
              
              {/* Difficulty and Species */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Species</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pkg.species.map((species: string, index: number) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-800'}`}
                        >
                          {species}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-amber-500" />
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Difficulty</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      pkg.difficulty === 'Challenging'
                        ? darkMode
                          ? 'bg-red-700 text-red-100'
                          : 'bg-red-100 text-red-800'
                        : pkg.difficulty === 'Moderate'
                        ? darkMode
                          ? 'bg-yellow-700 text-yellow-100'
                          : 'bg-yellow-100 text-yellow-800'
                        : darkMode
                        ? 'bg-green-700 text-green-100'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {pkg.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* What's Included */}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.included.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <ChevronRight size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                      <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Important Information */}
              <div className={`p-6 rounded-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Important Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Insurance</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>We recommend comprehensive travel and medical insurance for your hunting trip.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Compass size={20} className="text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Physical Requirements</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.difficulty === 'Challenging' ? 'This hunt requires good fitness and experience with challenging terrain.' : 'Moderate fitness level required. Please let us know about any health concerns.'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Utensils size={20} className="text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Accommodation</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.included.some((item: string) => item.includes('Luxury lodge')) ? 'Luxury lodge accommodation with all meals included.' : 'Comfortable accommodation with all meals provided.'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking Section */}
              <div className="border-t pt-6 mt-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onClose}
                    className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-colors ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400' 
                        : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                    }`}
                  >
                    Close Details
                  </button>
                  
                  <a
                    href={`/contact?package=${pkg.id}&huntType=${encodeURIComponent(pkg.huntType)}&species=${encodeURIComponent(pkg.species.join(', '))}&price=${pkg.price}&duration=${pkg.duration}&location=${encodeURIComponent(pkg.location)}`}
                    className="flex-1 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-center"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PackageModal; 