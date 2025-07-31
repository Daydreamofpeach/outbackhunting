import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Calendar, Users, DollarSign, X, Plus, Minus, Receipt, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { HuntData } from '../services/pricingService';

interface PackageBuilderProps {
  darkMode: boolean;
  customPackage: {
    hunts: Array<{ hunt: HuntData; quantity: number }>;
    additionalDays: number;
    selectedExtras: Array<{ extraId: string; huntId: string; quantity: number }>;
    people: { hunters: number; nonHunters: number };
    totalPrice: number;
    totalDays: number;
  };
  dayRate: number;
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
}

const PackageBuilder: React.FC<PackageBuilderProps> = ({
  darkMode,
  customPackage,
  dayRate,
  onRemoveHunt,
  onUpdateHuntQuantity,
  onUpdateAdditionalDays,
  onUpdateHunters,
  onUpdateNonHunters,
  onResetPackage,
  onGeneratePackageDetails,
  billBreakdown
}) => {
  const [expandedSections, setExpandedSections] = useState({
    hunts: true,
    additionalDays: true,
    people: true,
    breakdown: false,
    summary: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const totalHuntItems = customPackage.hunts.reduce((sum, { quantity }) => sum + quantity, 0);

  return (
    <div className={`sticky top-24 rounded-3xl border-4 shadow-2xl max-h-[85vh] overflow-hidden flex flex-col ${
      darkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-6 lg:p-8 border-b-4 border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Package</h2>
            <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
              {totalHuntItems} animal{totalHuntItems !== 1 ? 's' : ''} • {customPackage.totalDays} days
            </p>
          </div>
          {customPackage.hunts.length > 0 && (
            <span className="px-4 lg:px-6 py-2 lg:py-3 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xl lg:text-2xl font-bold rounded-2xl border-2 border-amber-300 dark:border-amber-700 self-start">
              ${customPackage.totalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {customPackage.hunts.length === 0 && customPackage.additionalDays === 0 ? (
          <div className="text-center py-12 lg:py-20 px-6 lg:px-8">
            <div className="w-20 lg:w-24 h-20 lg:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 border-4 border-gray-200 dark:border-gray-700">
              <Settings size={40} className="text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 lg:mb-4">
              Start Building Your Package
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 lg:mb-4 text-lg lg:text-xl`}>
              Select hunts from the left and add extra days as needed
            </p>
            <p className="text-base lg:text-lg text-gray-500 dark:text-gray-400">
              Your package will appear here once you add hunts
            </p>
          </div>
        ) : (
          <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
            {/* Selected Hunts Section */}
            <div className={`rounded-2xl border-4 shadow-xl ${
              darkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
            }`}>
              <button
                onClick={() => toggleSection('hunts')}
                className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-t-2xl"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className={`p-3 lg:p-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <Target size={24} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Selected Hunts</h3>
                    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                      {totalHuntItems} animal{totalHuntItems !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>
                <div className={`p-2 lg:p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  {expandedSections.hunts ? <ChevronUp size={20} className="text-amber-600" /> : <ChevronDown size={20} className="text-amber-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSections.hunts && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
                      {customPackage.hunts.map(({ hunt, quantity }) => (
                        <motion.div
                          key={hunt.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 lg:p-6 rounded-xl border-2 shadow-lg ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-500' 
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3 lg:mb-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">{hunt.name}</h4>
                              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300">{hunt.species}</p>
                            </div>
                            <button
                              onClick={() => onRemoveHunt(hunt.id)}
                              className="p-2 lg:p-3 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200 ml-3 lg:ml-4"
                            >
                              <X size={16} className="lg:w-5 lg:h-5" />
                            </button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3 lg:gap-4">
                              <button
                                onClick={() => onUpdateHuntQuantity(hunt.id, quantity - 1)}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                              >
                                <Minus size={16} className="lg:w-5 lg:h-5" />
                              </button>
                              <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-[2.5rem] lg:min-w-[3rem] text-center">{quantity}</span>
                              <button
                                onClick={() => onUpdateHuntQuantity(hunt.id, quantity + 1)}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                              >
                                <Plus size={16} className="lg:w-5 lg:h-5" />
                              </button>
                            </div>
                            <span className="text-xl lg:text-2xl font-bold text-amber-600">
                              ${(hunt.basePrice * quantity).toLocaleString()}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Additional Days Section */}
            <div className={`rounded-2xl border-4 shadow-xl ${
              darkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
            }`}>
              <button
                onClick={() => toggleSection('additionalDays')}
                className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-t-2xl"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className={`p-3 lg:p-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <Calendar size={24} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Additional Days</h3>
                    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                      {customPackage.additionalDays} day{customPackage.additionalDays !== 1 ? 's' : ''} added
                    </p>
                  </div>
                </div>
                <div className={`p-2 lg:p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  {expandedSections.additionalDays ? <ChevronUp size={20} className="text-amber-600" /> : <ChevronDown size={20} className="text-amber-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSections.additionalDays && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 lg:p-6 pt-0">
                      <div className="flex items-center gap-6 lg:gap-8">
                        <button
                          onClick={() => onUpdateAdditionalDays(customPackage.additionalDays - 1)}
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                        >
                          <Minus size={20} className="lg:w-6 lg:h-6" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{customPackage.additionalDays}</span>
                          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mt-1 lg:mt-2">days</p>
                        </div>
                        <button
                          onClick={() => onUpdateAdditionalDays(customPackage.additionalDays + 1)}
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                        >
                          <Plus size={20} className="lg:w-6 lg:h-6" />
                        </button>
                      </div>
                      <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mt-3 lg:mt-4 text-center">
                        ${dayRate}/day (1x1 rate)
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* People Section */}
            <div className={`rounded-2xl border-4 shadow-xl ${
              darkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
            }`}>
              <button
                onClick={() => toggleSection('people')}
                className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-t-2xl"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className={`p-3 lg:p-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <Users size={24} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">People</h3>
                    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                      {customPackage.people.hunters} hunter{customPackage.people.hunters !== 1 ? 's' : ''}, {customPackage.people.nonHunters} non-hunter{customPackage.people.nonHunters !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className={`p-2 lg:p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  {expandedSections.people ? <ChevronUp size={20} className="text-amber-600" /> : <ChevronDown size={20} className="text-amber-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSections.people && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <span className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Hunters</span>
                          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300">
                            {customPackage.people.hunters > 1 ? `Additional: $200/day each` : 'First hunter included'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 lg:gap-4">
                          <button
                            onClick={() => onUpdateHunters(customPackage.people.hunters - 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                          >
                            <Minus size={16} className="lg:w-5 lg:h-5" />
                          </button>
                          <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-[2.5rem] lg:min-w-[3rem] text-center">{customPackage.people.hunters}</span>
                          <button
                            onClick={() => onUpdateHunters(customPackage.people.hunters + 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                          >
                            <Plus size={16} className="lg:w-5 lg:h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <span className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Non-Hunters</span>
                          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300">
                            {customPackage.people.nonHunters > 0 ? `$180/day each` : 'No additional cost'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 lg:gap-4">
                          <button
                            onClick={() => onUpdateNonHunters(customPackage.people.nonHunters - 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                          >
                            <Minus size={16} className="lg:w-5 lg:h-5" />
                          </button>
                          <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-[2.5rem] lg:min-w-[3rem] text-center">{customPackage.people.nonHunters}</span>
                          <button
                            onClick={() => onUpdateNonHunters(customPackage.people.nonHunters + 1)}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-all duration-200"
                          >
                            <Plus size={16} className="lg:w-5 lg:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bill Breakdown Section */}
            {billBreakdown.length > 0 && (
              <div className={`rounded-2xl border-4 shadow-xl ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <button
                  onClick={() => toggleSection('breakdown')}
                  className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-t-2xl"
                >
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className={`p-3 lg:p-4 rounded-2xl ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    }`}>
                      <Receipt size={24} className="text-amber-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Bill Breakdown</h3>
                      <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                        {billBreakdown.length} item{billBreakdown.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className={`p-2 lg:p-3 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    {expandedSections.breakdown ? <ChevronUp size={20} className="text-amber-600" /> : <ChevronDown size={20} className="text-amber-600" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedSections.breakdown && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 lg:p-6 pt-0 space-y-3 lg:space-y-4">
                        {billBreakdown.map((item, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 lg:py-4 border-b-2 border-gray-200 dark:border-gray-600 last:border-b-0 gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">{item.item}</p>
                              <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300">{item.description}</p>
                            </div>
                            <span className="text-xl lg:text-2xl font-bold text-amber-600 sm:ml-4 flex-shrink-0">
                              ${item.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Package Summary Section */}
            <div className={`rounded-2xl border-4 shadow-xl ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-amber-500' 
                : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300'
            }`}>
              <button
                onClick={() => toggleSection('summary')}
                className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-amber-100 dark:hover:bg-gray-700 transition-all duration-200 rounded-t-2xl"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className={`p-3 lg:p-4 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}>
                    <DollarSign size={24} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Package Summary</h3>
                    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">
                      Total: ${customPackage.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className={`p-2 lg:p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}>
                  {expandedSections.summary ? <ChevronUp size={20} className="text-amber-600" /> : <ChevronDown size={20} className="text-amber-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSections.summary && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 lg:p-6 pt-0 space-y-4 lg:space-y-6 text-lg lg:text-xl">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Total Price:</span>
                        <span className="text-3xl lg:text-4xl font-bold text-amber-600">${customPackage.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-lg lg:text-xl text-gray-700 dark:text-gray-300">Total Days:</span>
                        <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{customPackage.totalDays}</span>
                      </div>
                      
                      {/* Day Calculation Explanation */}
                      {customPackage.hunts.length > 1 && (
                        <div className={`mt-4 lg:mt-6 p-4 lg:p-6 rounded-xl text-base lg:text-lg ${
                          darkMode 
                            ? 'bg-gray-700 border-2 border-gray-600' 
                            : 'bg-amber-100 border-2 border-amber-200'
                        }`}>
                          <p className="font-bold mb-2 lg:mb-3 text-amber-700 dark:text-amber-300">💡 Smart Day Calculation:</p>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Multiple hunts in the same location are calculated with overlap to maximize your hunting time. Each additional animal requires only 1 extra day, not the full hunt duration.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Always Visible */}
      <div className="p-6 lg:p-8 border-t-4 border-gray-200 dark:border-gray-700 flex-shrink-0 space-y-4 lg:space-y-6">
        <button
          onClick={onResetPackage}
          className={`w-full py-4 lg:py-6 border-4 rounded-2xl font-bold text-lg lg:text-xl transition-all duration-200 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 hover:bg-red-900/20' 
              : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          Reset Package
        </button>
        
        <a
          href={`/contact?customPackage=true&packageDetails=${onGeneratePackageDetails()}`}
          className="block w-full py-4 lg:py-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-lg lg:text-xl rounded-2xl text-center transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Book Custom Package
        </a>
      </div>
    </div>
  );
};

export default PackageBuilder; 