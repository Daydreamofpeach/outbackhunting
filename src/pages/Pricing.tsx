import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { pricingService, HuntData } from '../services/pricingService';

interface PricingProps {
  darkMode: boolean;
}

const Pricing: React.FC<PricingProps> = ({ darkMode }) => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [selectedHunt, setSelectedHunt] = useState<HuntData | null>(null);
  const [hunts, setHunts] = useState<HuntData[]>([]);

  useEffect(() => {
    document.title = 'Hunting Pricing | Outback Hunting New Zealand';
    
    // Load hunt data for modal functionality
    const loadHunts = async () => {
      try {
        const huntData = await pricingService.getAllHunts();
        setHunts(huntData);
      } catch (error) {
        console.error('Failed to load hunt data:', error);
      }
    };
    
    loadHunts();
  }, []);

  const getHuntByType = (species: string, type: string): HuntData | null => {
    return hunts.find(hunt => 
      hunt.species === species && 
      hunt.location.toLowerCase().includes(type.toLowerCase())
    ) || null;
  };

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Hunt Details Modal */}
      <AnimatePresence>
        {selectedHunt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedHunt(null)} />
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedHunt.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedHunt.species} • {selectedHunt.difficulty}</p>
                  </div>
                  <button
                    onClick={() => setSelectedHunt(null)}
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
                      <div className="text-2xl font-bold text-amber-600">{selectedHunt.priceOnApplication ? 'POA' : `$${selectedHunt.basePrice.toLocaleString()}`}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Base Price</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">{selectedHunt.baseDays}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedHunt.location}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedHunt.bestSeason}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Best Season</div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Hunt Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedHunt.description}</p>
                  </div>
                  
                  {/* What's Included */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedHunt.included.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* What's Not Included */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Not Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedHunt.notIncluded.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* What You Need to Bring */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">What You Need to Bring</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedHunt.youNeedToBring.map((item, index) => (
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
                        onClick={() => setSelectedHunt(null)}
                        className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-colors ${
                          darkMode 
                            ? 'border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400' 
                            : 'border-gray-300 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                        }`}
                      >
                        Close Details
                      </button>
                      
                      <Link
                        to={`/contact?hunt=${selectedHunt.id}&species=${encodeURIComponent(selectedHunt.species)}&price=${selectedHunt.basePrice}&days=${selectedHunt.baseDays}&location=${encodeURIComponent(selectedHunt.location)}`}
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

      {/* Header */}
      <section 
        ref={headerRef}
        className="relative py-24 md:py-32 pt-32 md:pt-40"
        style={{
          backgroundImage: 'url(/assets/img/gareth/Deer/IMG_5179.JPG)',
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
              Hunting Pricing
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Transparent pricing for our hunting services. All prices in New Zealand Dollars.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Lists */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Wilderness Hunts */}
            <div id="wilderness-packages" className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Wilderness Hunts</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Remote hunting experiences in New Zealand's wilderness areas</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Red Stag Wilderness */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Red Stag Wilderness</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Animal Cost</span>
                      <span className="font-bold">$2,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (4 days)</span>
                      <span className="font-bold">$1,520</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-amber-600">$4,000</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 4 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Red Stag', 'wilderness');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bull Tahr Wilderness */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Bull Tahr Wilderness - 12"</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Animal Cost</span>
                      <span className="font-bold">$3,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (4 days)</span>
                      <span className="font-bold">$1,520</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-amber-600">$5,000</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 4 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Bull Tahr', 'wilderness');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spring Tahr */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Spring Tahr - 12"</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Animal Cost</span>
                      <span className="font-bold">$3,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (4 days)</span>
                      <span className="font-bold">$1,520</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-amber-600">$4,500</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 4 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Bull Tahr', 'wilderness');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Private Land Hunts */}
            <div id="private-packages" className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Private Land Hunts</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Premium hunting experiences on private land with comfortable accommodation</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Red Stag Private */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Red Stag Private Land</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Silver Animal</span>
                      <span className="font-bold">$4,400</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gold Animal</span>
                      <span className="font-bold">$5,900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>400-450" Animal</span>
                      <span className="font-bold">$8,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>450"+ Animal</span>
                      <span className="font-bold text-amber-500">POA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (3 days)</span>
                      <span className="font-bold">$1,140</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="text-sm text-gray-500">
                        Total = Animal Cost + Daily Rates
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 3 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Red Stag', 'private');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bull Tahr Private */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Bull Tahr Private Land</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>12" Animal</span>
                      <span className="font-bold">$4,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>13" Animal</span>
                      <span className="font-bold">$5,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>14" Animal</span>
                      <span className="font-bold">$6,100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>15" Animal</span>
                      <span className="font-bold">$8,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (3 days)</span>
                      <span className="font-bold">$1,140</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="text-sm text-gray-500">
                        Total = Animal Cost + Daily Rates
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 3 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Bull Tahr', 'private');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chamois Private */}
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Chamois Private Land</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Animal Cost</span>
                      <span className="font-bold">$6,400</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (3 days)</span>
                      <span className="font-bold">$1,140</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-amber-600">$7,550</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 3 days
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Chamois', 'private');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chamois Wilderness */}
            <div id="chamois-wilderness" className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Chamois Wilderness</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Wilderness Chamois hunting - additional animals can be discussed</p>
              
              <div className="max-w-md mx-auto">
                <div className={`p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-amber-600">Chamois Wilderness Hunt</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Animal Cost</span>
                      <span className="font-bold">$3,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Rates (4 days)</span>
                      <span className="font-bold">$1,520</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span className="text-amber-600">$4,500</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Duration: 4 days
                    </div>
                    <div className="text-xs text-amber-600 mt-2">
                      *Additional animals pricing to be discussed
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          const hunt = getHuntByType('Chamois', 'wilderness');
                          if (hunt) setSelectedHunt(hunt);
                        }}
                        className="w-full py-2 px-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day Rates */}
            <div id="day-rates" className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Day Rates</h2>
              
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-2">$380</div>
                    <div className="font-medium">1 Person</div>
                    <div className="text-sm text-gray-500">Per day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-2">$600</div>
                    <div className="font-medium">2 People</div>
                    <div className="text-sm text-gray-500">Per day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600 mb-2">$180</div>
                    <div className="font-medium">Non Hunter</div>
                    <div className="text-sm text-gray-500">Per person per day</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div id="included" className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-green-600">Included in All Hunts</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Personalised guided hunt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Field dressing of game</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Transport of trophies to taxidermist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Digital photos and video footage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Accommodation (tent, hut, or lodge)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Airport pick-up and drop-off</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Meals and beverages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Sighting in gun before hunt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Plus size={16} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>Rifles supplied if required</span>
                    </li>
                  </ul>
                </div>

                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className="text-xl font-bold mb-4 text-red-600">Not Included</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Helicopter time (if required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Flights to New Zealand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Expediting services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Compensation for bad weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Travel insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Minus size={16} className="text-red-500 mt-1 flex-shrink-0" />
                      <span>Firearms permits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Additional Costs & Add-ons</h2>
              
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Booking & Deposits</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Booking deposit</span>
                        <span className="font-bold">25% of hunt cost</span>
                      </div>
                      <div className="text-sm text-gray-500">Non-refundable deposit required to secure booking</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Additional Services</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Helicopter access</span>
                        <span className="font-bold text-amber-500">POA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extra hunting days</span>
                        <span className="font-bold">Day rate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trophy shipping</span>
                        <span className="font-bold">POA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxidermy services</span>
                        <span className="font-bold">POA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Booking Information</h2>
              
              <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Payment Terms</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>25% deposit required on booking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Final payment due at conclusion of hunt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Pricing may vary based on specific requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>All prices in New Zealand Dollars</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">Cancellation Policy</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>90 days notice required for rescheduling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Deposit non-refundable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Some conditions may apply</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-lg font-medium mb-6">
                Ready to book your hunting adventure?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/customize"
                  className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-colors"
                >
                  Build Custom Package <ChevronRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex items-center px-6 py-3 border-2 rounded-full font-medium transition-colors ${
                    darkMode 
                      ? 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white' 
                      : 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                  }`}
                >
                  Contact Our Team <ChevronRight size={20} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;