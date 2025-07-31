import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Target, MapPin, Calendar } from 'lucide-react';
import { HuntData } from '../services/pricingService';

interface HuntSelectorProps {
  hunts: HuntData[];
  darkMode: boolean;
  onAddHunt: (hunt: HuntData) => void;
  onViewDetails: (hunt: HuntData) => void;
}

const HuntSelector: React.FC<HuntSelectorProps> = ({
  hunts,
  darkMode,
  onAddHunt,
  onViewDetails
}) => {
  const [expandedSpecies, setExpandedSpecies] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');

  // Group hunts by species
  const huntsBySpecies = hunts.reduce((groups, hunt) => {
    if (!groups[hunt.species]) {
      groups[hunt.species] = [];
    }
    groups[hunt.species].push(hunt);
    return groups;
  }, {} as Record<string, HuntData[]>);

  const speciesList = Object.keys(huntsBySpecies);

  const toggleSpecies = (species: string) => {
    setExpandedSpecies(prev => 
      prev.includes(species) 
        ? prev.filter(s => s !== species)
        : [...prev, species]
    );
  };

  const filteredHunts = selectedSpecies === 'all' 
    ? hunts 
    : hunts.filter(hunt => hunt.species === selectedSpecies);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Species Filter */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedSpecies('all')}
          className={`px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 ${
            selectedSpecies === 'all'
              ? 'bg-amber-600 text-white shadow-xl scale-105'
              : darkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 border-2 border-gray-600'
                : 'bg-white text-gray-900 hover:bg-gray-50 hover:scale-105 border-2 border-gray-300 shadow-lg'
          }`}
        >
          All Species ({hunts.length})
        </button>
        {speciesList.map(species => (
          <button
            key={species}
            onClick={() => setSelectedSpecies(species)}
            className={`px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 ${
              selectedSpecies === species
                ? 'bg-amber-600 text-white shadow-xl scale-105'
                : darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 border-2 border-gray-600'
                  : 'bg-white text-gray-900 hover:bg-gray-50 hover:scale-105 border-2 border-gray-300 shadow-lg'
            }`}
          >
            {species} ({huntsBySpecies[species].length})
          </button>
        ))}
      </div>

      {/* Hunts Display */}
      <div className="space-y-8">
        {selectedSpecies === 'all' ? (
          // Show by species groups when "all" is selected
          speciesList.map(species => (
            <div key={species} className={`rounded-3xl border-4 shadow-2xl ${
              darkMode 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <button
                onClick={() => toggleSpecies(species)}
                className="w-full p-8 flex items-center justify-between hover:bg-amber-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-t-3xl"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <Target size={32} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{species}</h3>
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                      {huntsBySpecies[species].length} hunt{huntsBySpecies[species].length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  {expandedSpecies.includes(species) ? <ChevronUp size={28} className="text-amber-600" /> : <ChevronDown size={28} className="text-amber-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSpecies.includes(species) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 space-y-6">
                      {huntsBySpecies[species].map((hunt) => (
                        <motion.div
                          key={hunt.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-8 rounded-2xl border-4 shadow-xl transition-all duration-200 hover:scale-105 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-600 hover:border-amber-500' 
                              : 'bg-white border-gray-200 hover:border-amber-500'
                          }`}
                        >
                          <div className="flex flex-col lg:flex-row gap-6">
                            <img 
                              src={hunt.image} 
                              alt={hunt.name}
                              className="w-full lg:w-48 h-48 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{hunt.name}</h4>
                              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                {hunt.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className={`px-4 py-2 rounded-xl text-lg font-bold ${
                                  hunt.difficulty === 'Challenging' 
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                                  hunt.difficulty === 'Moderate' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                                }`}>
                                  {hunt.difficulty}
                                </span>
                                <span className={`px-4 py-2 rounded-xl text-lg font-bold ${
                                  darkMode 
                                    ? 'bg-gray-700 text-white' 
                                    : 'bg-gray-200 text-gray-900'
                                }`}>
                                  {hunt.baseDays} days
                                </span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg text-gray-700 dark:text-gray-300">
                                  <div className="flex items-center gap-3">
                                    <MapPin size={20} className="text-amber-600" />
                                    <span className="font-semibold">{hunt.location}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Calendar size={20} className="text-amber-600" />
                                    <span className="font-semibold">{hunt.bestSeason}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <span className="text-4xl font-bold text-amber-600">
                                  ${hunt.basePrice.toLocaleString()}
                                </span>
                                <div className="flex flex-col sm:flex-row gap-4">
                                  <button
                                    onClick={() => onViewDetails(hunt)}
                                    className="px-6 py-3 text-lg font-bold border-3 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all duration-200 hover:scale-105"
                                  >
                                    Details
                                  </button>
                                  <button
                                    onClick={() => onAddHunt(hunt)}
                                    className="px-6 py-3 text-lg font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                  >
                                    <Plus size={20} />
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          // Show individual hunts when a specific species is selected
          <div className="space-y-6">
            {filteredHunts.map((hunt) => (
              <motion.div
                key={hunt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-8 rounded-2xl border-4 shadow-xl transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 hover:border-amber-500' 
                    : 'bg-white border-gray-200 hover:border-amber-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <img 
                    src={hunt.image} 
                    alt={hunt.name}
                    className="w-full lg:w-48 h-48 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{hunt.name}</h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {hunt.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className={`px-4 py-2 rounded-xl text-lg font-bold ${
                        hunt.difficulty === 'Challenging' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                        hunt.difficulty === 'Moderate' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      }`}>
                        {hunt.difficulty}
                      </span>
                      <span className={`px-4 py-2 rounded-xl text-lg font-bold ${
                        darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        {hunt.baseDays} days
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-lg text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                          <MapPin size={20} className="text-amber-600" />
                          <span className="font-semibold">{hunt.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className="text-amber-600" />
                          <span className="font-semibold">{hunt.bestSeason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-4xl font-bold text-amber-600">
                        ${hunt.basePrice.toLocaleString()}
                      </span>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => onViewDetails(hunt)}
                          className="px-6 py-3 text-lg font-bold border-3 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all duration-200 hover:scale-105"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onAddHunt(hunt)}
                          className="px-6 py-3 text-lg font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Plus size={20} />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HuntSelector; 