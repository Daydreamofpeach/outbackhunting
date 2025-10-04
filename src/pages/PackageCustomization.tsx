import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, Info, Star } from 'lucide-react';
import { pricingService, HuntData } from '../services/pricingService';
import PackageBuilder from '../components/PackageBuilder';
import HuntSelector from '../components/HuntSelector';
import SEO from '../components/SEO';

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
  const [dayRate, setDayRate] = useState(380);
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

  const addAnimal = (hunt: HuntData) => {
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

  const removeAnimal = (huntId: string) => {
    setCustomPackage(prev => ({
      ...prev,
      hunts: prev.hunts.filter(h => h.hunt.id !== huntId)
    }));
  };

  const updateAnimalQuantity = (huntId: string, quantity: number) => {
    if (quantity <= 0) {
      removeAnimal(huntId);
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom New Zealand Hunting Package Builder",
    "description": "Build your perfect New Zealand hunting package with our interactive package builder. Customize Red Deer, Tahr, and Chamois hunting adventures.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Outback Hunting New Zealand",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NZ",
        "addressRegion": "Canterbury"
      }
    },
    "areaServed": "Canterbury, New Zealand",
    "serviceType": "Custom Hunting Package Builder"
  };

  return (
    <>
      <SEO 
        title="Customize Your New Zealand Hunting Package | Build Custom Hunt | Outback Hunting NZ"
        description="Build your perfect New Zealand hunting package with our interactive package builder. Customize Red Deer, Tahr, and Chamois hunting adventures. Select hunt durations, add extra days, and create your ideal Canterbury wilderness hunting experience. Get instant pricing and book today."
        keywords="customize hunting package NZ, build hunting package New Zealand, custom hunting trips NZ, personalized hunting packages, New Zealand hunting package builder, custom Red Deer hunting, custom Tahr hunting, custom Chamois hunting, hunting package customization, tailored hunting adventures NZ, bespoke hunting packages, hunting trip planner New Zealand"
        image="/assets/img/gareth/Scenery and camps/IMG_6356.JPG"
        url="/customize"
        type="service"
        canonical="https://outbackhuntingnz.com/customize"
        huntingSpecific={{
          species: ['Red Deer', 'Tahr', 'Chamois'],
          location: 'Canterbury',
          huntType: 'Custom Hunting Packages'
        }}
        structuredData={structuredData}
      />
      <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>

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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedHuntForDetails.species}</p>
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
                  {/* Hunt Details */}
                  <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hunt Details</h3>
                        <div className="bg-amber-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                          {selectedHuntForDetails.priceOnApplication ? 'POA' : `$${selectedHuntForDetails.basePrice.toLocaleString()}`}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{selectedHuntForDetails.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Duration</p>
                          <p className="font-bold text-lg">{selectedHuntForDetails.baseDays} days</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Location</p>
                          <p className="font-bold text-lg">{selectedHuntForDetails.location}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Best Season</p>
                          <p className="font-bold text-lg">{selectedHuntForDetails.bestSeason}</p>
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


      {/* Header */}
      <section 
        ref={headerRef}
        className="relative py-24 md:py-32 pt-32 md:pt-40"
        style={{
          backgroundImage: 'url(/assets/img/gareth/Scenery and camps/IMG_6356.JPG)',
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
              Customize Your New Zealand Hunting Package
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Build your perfect Red Deer, Tahr, or Chamois hunting experience with our interactive package builder. Select hunts, customize durations, and create your ideal Canterbury wilderness adventure.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {/* Available Hunts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Animals</h2>
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
                      <li>• <strong>First animal:</strong> Includes full hunt duration + daily rates</li>
                      <li>• <strong>Additional animals:</strong> Only animal cost (no extra daily rates)</li>
                      <li>• <strong>Same location animals:</strong> Can be combined efficiently</li>
                      <li>• <strong>Different locations:</strong> May require travel days</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
            
            <HuntSelector
              hunts={hunts}
              darkMode={darkMode}
              onAddHunt={addAnimal}
              onViewDetails={setSelectedHuntForDetails}
            />
          </div>

          {/* Package Builder */}
          <div className="max-w-4xl mx-auto">
            <PackageBuilder
              darkMode={darkMode}
              customPackage={customPackage}
              dayRate={dayRate}
              onRemoveHunt={removeAnimal}
              onUpdateHuntQuantity={updateAnimalQuantity}
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
                    <span>1 Person</span>
                    <span className="font-bold text-amber-600">$380.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 People</span>
                    <span className="font-bold text-amber-600">$600.00</span>
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
                  <span>A 25% deposit is required on booking (non-refundable). Final payment due at conclusion of hunt as pricing may vary based on your specific requirements.</span>
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
    </>
  );
};

export default PackageCustomization;