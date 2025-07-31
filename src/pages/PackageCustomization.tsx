import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Settings, X, Info, Star } from 'lucide-react';
import { pricingService, HuntData } from '../services/pricingService';
import PackageBuilder from '../components/PackageBuilder';
import HuntSelector from '../components/HuntSelector';

interface PackageCustomizationProps {
  darkMode: boolean;
}

interface CustomPackage {
  hunts: Array<{ hunt: HuntData; quantity: number }>;
  additionalDays: number;
  selectedExtras: Array<{ extraId: string; huntId: string; quantity: number }>;
  people: { hunters: number; nonHunters: number };
  totalPrice: number;
  totalDays: number;
}

// Mobile Package Builder Component
const MobilePackageBuilder: React.FC<{
  customPackage: CustomPackage;
  hunts: HuntData[];
  darkMode: boolean;
  dayRate: number;
  onAddHunt: (hunt: HuntData) => void;
  onRemoveHunt: (huntId: string) => void;
  onUpdateHuntQuantity: (huntId: string, quantity: number) => void;
  onUpdateAdditionalDays: (days: number) => void;
  onUpdateHunters: (count: number) => void;
  onUpdateNonHunters: (count: number) => void;
  onResetPackage: () => void;
  onGeneratePackageDetails: () => string;
  billBreakdown: Array<{
    item: string;
    price: number;
    description: string;
  }>;
}> = ({ customPackage, hunts, darkMode, dayRate, onAddHunt, onRemoveHunt, onUpdateHuntQuantity, onUpdateAdditionalDays, onUpdateHunters, onUpdateNonHunters, onResetPackage, onGeneratePackageDetails, billBreakdown }) => {
  const [activeTab, setActiveTab] = useState<'hunts' | 'summary'>('hunts');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('hunts')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'hunts'
              ? 'bg-white dark:bg-gray-700 text-amber-600 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Available Hunts
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'summary'
              ? 'bg-white dark:bg-gray-700 text-amber-600 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Package ({customPackage.hunts.length})
        </button>
      </div>

      {activeTab === 'hunts' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-amber-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Tap to add hunts to your package
            </span>
          </div>
          
          <div className="space-y-3">
            {hunts.map((hunt) => (
              <motion.div
                key={hunt.id}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } hover:border-amber-500 transition-colors`}
                onClick={() => onAddHunt(hunt)}
              >
                <div className="flex gap-3">
                  <img 
                    src={hunt.image} 
                    alt={hunt.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{hunt.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {hunt.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-600">
                        ${hunt.basePrice.toLocaleString()}
                      </span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {hunt.baseDays} days
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {customPackage.hunts.length === 0 ? (
            <div className="text-center py-8">
              <Settings size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No hunts selected yet. Tap "Available Hunts" to get started!
              </p>
            </div>
          ) : (
            <>
              {/* Selected Hunts */}
              <div className="space-y-3">
                {customPackage.hunts.map(({ hunt, quantity }) => (
                  <div key={hunt.id} className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{hunt.name}</span>
                      <button
                        onClick={() => onRemoveHunt(hunt.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateHuntQuantity(hunt.id, quantity - 1)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          <X size={12} />
                        </button>
                        <span className="text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => onUpdateHuntQuantity(hunt.id, quantity + 1)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        >
                          <X size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-amber-600">
                        ${pricingService.calculateHuntPrice(hunt, quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Days */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-3">Additional Days:</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateAdditionalDays(customPackage.additionalDays - 1)}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    <X size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium">{customPackage.additionalDays}</span>
                  <button
                    onClick={() => onUpdateAdditionalDays(customPackage.additionalDays + 1)}
                    className="p-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ${dayRate}/day (1x1 rate)
                </p>
              </div>

              {/* Package Summary */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-3">Package Summary:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Hunt Costs:</span>
                    <span>${customPackage.hunts.reduce((sum, h) => sum + pricingService.calculateHuntPrice(h.hunt, h.quantity), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Days:</span>
                    <span>${(customPackage.additionalDays * dayRate).toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Price:</span>
                    <span className="text-amber-600">${customPackage.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Days:</span>
                    <span>{customPackage.totalDays}</span>
                  </div>
                </div>
                
                {customPackage.hunts.length > 1 && (
                  <div className={`mt-3 p-3 rounded text-xs ${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                    <p className="font-medium mb-1">💡 Smart Day Calculation:</p>
                    <p>Each additional animal requires only 1 extra day, not the full hunt duration.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={onResetPackage}
                  className={`w-full py-3 border-2 rounded-lg font-medium transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400' 
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  Reset Package
                </button>
                
                <a
                  href={`/contact?customPackage=true&packageDetails=${onGeneratePackageDetails()}`}
                   className="block w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-center transition-colors"
                 >
                   Book Custom Package
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const PackageCustomization: React.FC<PackageCustomizationProps> = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [searchParams] = useSearchParams();
  const initialHuntId = searchParams.get('hunt');

  const [customPackage, setCustomPackage] = useState<CustomPackage>({
    hunts: [],
    additionalDays: 0,
    selectedExtras: [],
    people: { hunters: 1, nonHunters: 0 },
    totalPrice: 0,
    totalDays: 0
  });

  const [hunts, setHunts] = useState<HuntData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dayRate, setDayRate] = useState(290);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedHuntForDetails, setSelectedHuntForDetails] = useState<HuntData | null>(null);

  // Load hunts and pricing data
  useEffect(() => {
    const loadData = async () => {
      try {
        const allHunts = await pricingService.getAllHunts();
        setHunts(allHunts);
        
        const dayRates = pricingService.getDayRates();
        setDayRate(dayRates.solo);

        // Add initial hunt if specified in URL
        if (initialHuntId) {
          const hunt = allHunts.find(h => h.id === initialHuntId);
          if (hunt) {
            setCustomPackage(prev => ({
              ...prev,
              hunts: [{ hunt, quantity: 1 }]
            }));
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initialHuntId]);

  // Calculate totals whenever package changes
  useEffect(() => {
    const totalDays = pricingService.calculatePackageDays(customPackage.hunts, customPackage.additionalDays);
    const totalPrice = pricingService.calculatePackagePrice(
      customPackage.hunts,
      customPackage.additionalDays,
      customPackage.people,
      customPackage.selectedExtras,
      totalDays
    );

    setCustomPackage(prev => ({
      ...prev,
      totalPrice,
      totalDays
    }));
  }, [customPackage.hunts, customPackage.additionalDays, customPackage.selectedExtras, customPackage.people]);

  const addHunt = (hunt: HuntData) => {
    setCustomPackage(prev => {
      const existingHunt = prev.hunts.find(h => h.hunt.id === hunt.id);
      if (existingHunt) {
        return {
          ...prev,
          hunts: prev.hunts.map(h => 
            h.hunt.id === hunt.id 
              ? { ...h, quantity: h.quantity + 1 }
              : h
          )
        };
      } else {
        return {
          ...prev,
          hunts: [...prev.hunts, { hunt, quantity: 1 }]
        };
      }
    });
  };

  const removeHunt = (huntId: string) => {
    setCustomPackage(prev => ({
      ...prev,
      hunts: prev.hunts.filter(h => h.hunt.id !== huntId)
    }));
  };

  const updateHuntQuantity = (huntId: string, quantity: number) => {
    if (quantity <= 0) {
      removeHunt(huntId);
      return;
    }
    
    setCustomPackage(prev => ({
      ...prev,
      hunts: prev.hunts.map(h => 
        h.hunt.id === huntId 
          ? { ...h, quantity }
          : h
      )
    }));
  };

  const updateAdditionalDays = (days: number) => {
    setCustomPackage(prev => ({
      ...prev,
      additionalDays: Math.max(0, days)
    }));
  };

  const updateHunters = (count: number) => {
    setCustomPackage(prev => ({
      ...prev,
      people: { ...prev.people, hunters: Math.max(1, count) }
    }));
  };

  const updateNonHunters = (count: number) => {
    setCustomPackage(prev => ({
      ...prev,
      people: { ...prev.people, nonHunters: Math.max(0, count) }
    }));
  };

  const resetPackage = () => {
    setCustomPackage({
      hunts: [],
      additionalDays: 0,
      selectedExtras: [],
      people: { hunters: 1, nonHunters: 0 },
      totalPrice: 0,
      totalDays: 0
    });
  };

  const generatePackageDetails = () => {
    const details = {
      hunts: customPackage.hunts.map(({ hunt, quantity }) => ({
        name: hunt.name,
        species: hunt.species,
        quantity,
        price: pricingService.calculateHuntPrice(hunt, quantity),
        included: hunt.included,
        notIncluded: hunt.notIncluded
      })),
      additionalDays: customPackage.additionalDays,
      selectedExtras: customPackage.selectedExtras.map(selectedExtra => {
        const hunt = customPackage.hunts.find(h => h.hunt.id === selectedExtra.huntId);
        const extra = hunt?.hunt.extras.find(e => e.id === selectedExtra.extraId);
        return {
          name: extra?.name || 'Unknown Extra',
          description: extra?.description || '',
          quantity: selectedExtra.quantity,
          price: extra ? (extra.perDay ? extra.price * selectedExtra.quantity * customPackage.totalDays : extra.price * selectedExtra.quantity) : 0
        };
      }),
      totalPrice: customPackage.totalPrice,
      totalDays: customPackage.totalDays
    };
    
    return encodeURIComponent(JSON.stringify(details));
  };

  const billBreakdown = pricingService.generateBillBreakdown(
    customPackage.hunts,
    customPackage.additionalDays,
    customPackage.people,
    customPackage.selectedExtras,
    customPackage.totalDays
  );

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading hunting packages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Mobile Floating Widget */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsMobileModalOpen(true)}
          className={`p-4 rounded-full shadow-lg ${
            darkMode ? 'bg-amber-600 text-white' : 'bg-amber-600 text-white'
          } hover:bg-amber-700 transition-colors`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings size={24} />
        </motion.button>
      </div>

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
                          <span className="text-green-600 mt-1 flex-shrink-0">•</span>
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
                          <span className="text-red-600 mt-1 flex-shrink-0">•</span>
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
                          <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
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

      {/* Mobile Modal */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileModalOpen(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl max-h-[85vh] flex flex-col"
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Your Package</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Build your perfect hunting experience</p>
                  </div>
                  <button
                    onClick={() => setIsMobileModalOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {/* Mobile Package Builder */}
                <MobilePackageBuilder 
                  customPackage={customPackage}
                  hunts={hunts}
                  darkMode={darkMode}
                  dayRate={dayRate}
                  onAddHunt={addHunt}
                  onRemoveHunt={removeHunt}
                  onUpdateHuntQuantity={updateHuntQuantity}
                  onUpdateAdditionalDays={updateAdditionalDays}
                  onUpdateHunters={updateHunters}
                  onUpdateNonHunters={updateNonHunters}
                  onResetPackage={resetPackage}
                  onGeneratePackageDetails={generatePackageDetails}
                  billBreakdown={billBreakdown}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Customize Your Hunting Package
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Build your perfect hunting experience by selecting base hunts, adding extra days, and creating your ideal New Zealand adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Hunts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Hunts</h2>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
              >
                <Info size={16} />
                <span className="text-sm font-medium">How it works</span>
              </button>
            </div>
            
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-amber-50'} border-l-4 border-amber-500`}
              >
                <div className="flex items-start gap-3">
                  <Star size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Smart Package Building:</p>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                      <li>• <strong>First animal:</strong> Uses the full hunt duration (3-4 days)</li>
                      <li>• <strong>Additional animals:</strong> Only 1 extra day per animal</li>
                      <li>• <strong>Same location hunts:</strong> Can be combined efficiently</li>
                      <li>• <strong>Different locations:</strong> May require travel days</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
            
            <HuntSelector
              hunts={hunts}
              darkMode={darkMode}
              onAddHunt={addHunt}
              onViewDetails={setSelectedHuntForDetails}
            />
          </div>

          {/* Package Builder */}
          <div className="lg:col-span-1">
            <PackageBuilder
              darkMode={darkMode}
              customPackage={customPackage}
              dayRate={dayRate}
              onRemoveHunt={removeHunt}
              onUpdateHuntQuantity={updateHuntQuantity}
              onUpdateAdditionalDays={updateAdditionalDays}
              onUpdateHunters={updateHunters}
              onUpdateNonHunters={updateNonHunters}
              onResetPackage={resetPackage}
              onGeneratePackageDetails={generatePackageDetails}
              billBreakdown={billBreakdown}
            />
          </div>
        </div>

        {/* Pricing Information */}
        <div className="mt-16">
                      <h2 className="text-2xl font-bold mb-6 text-center">Pricing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className="text-xl font-bold mb-4">Day Rates (NZD)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>1 x 1 (Solo Hunter)</span>
                    <span className="font-bold text-amber-600">$290.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 x 1 (Two Hunters)</span>
                    <span className="font-bold text-amber-600">$200.00 pp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Non Hunter</span>
                    <span className="font-bold text-amber-600">$180.00 pp</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h3 className="text-xl font-bold mb-4">Booking Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                  <span>A $500.00 NZD deposit is required on booking (non-refundable)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Some conditions may apply</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>All prices in New Zealand Dollars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PackageCustomization;