import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Plus, ChevronRight } from 'lucide-react';
import { HuntData } from '../services/pricingService';

interface HuntCardProps {
  hunt: HuntData;
  darkMode: boolean;
  onAddHunt: (hunt: HuntData) => void;
  onViewDetails: (hunt: HuntData) => void;
}

const HuntCard: React.FC<HuntCardProps> = ({
  hunt,
  darkMode,
  onAddHunt,
  onViewDetails
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-lg overflow-hidden shadow-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } border-2 border-transparent hover:border-amber-500 transition-all`}
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
         
        <div className="mb-3">
          <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Included:</p>
          <div className="flex flex-wrap gap-1">
            {hunt.included.slice(0, 3).map((item, index) => (
              <span key={index} className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                {item}
              </span>
            ))}
            {hunt.included.length > 3 && (
              <span className="text-xs text-gray-500">+{hunt.included.length - 3} more</span>
            )}
          </div>
        </div>
        
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
            onClick={() => onViewDetails(hunt)}
            className="flex-1 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-medium rounded-lg transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onAddHunt(hunt)}
            className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add to Package
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HuntCard; 