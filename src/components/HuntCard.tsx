import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Clock } from 'lucide-react';
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
      className={`relative rounded-3xl overflow-hidden shadow-2xl ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 border-2 border-gray-800' 
          : 'bg-gradient-to-r from-white via-gray-50 to-white border-2 border-gray-200 shadow-lg'
      } hover:border-amber-500 transition-all duration-300 hover:shadow-3xl group transform hover:scale-[1.01]`}
    >
      {/* Price Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-xl font-black text-lg shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-amber-500">
          ${hunt.priceOnApplication ? 'POA' : hunt.basePrice.toLocaleString()}
        </div>
      </div>

      {/* Horizontal Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - Main Info */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg"></div>
              <span className={`text-xs font-black tracking-widest uppercase px-2 py-1 rounded ${
                darkMode 
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                  : 'text-amber-700 bg-amber-100 border border-amber-300'
              }`}>
                {hunt.species}
              </span>
            </div>
            <h3 className={`text-2xl font-black leading-tight mb-3 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
              {hunt.name}
            </h3>
            
            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <hr className={`border w-16 ${darkMode ? 'border-amber-500' : 'border-amber-600'}`} />
              <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-amber-500' : 'bg-amber-600'}`}></div>
              <hr className={`border flex-1 ${darkMode ? 'border-amber-500' : 'border-amber-600'}`} />
            </div>
            
            <p className={`text-sm leading-relaxed font-medium max-w-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {hunt.description}
            </p>
          </div>
        </div>

        {/* Right Section - Details & Actions */}
        <div className={`lg:w-72 p-6 lg:border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Details Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mb-6">
            <div className={`p-3 rounded-lg border ${
              darkMode 
                ? 'border-amber-500/30 bg-gradient-to-br from-gray-800 to-gray-900' 
                : 'border-amber-300 bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
                <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  Duration
                </span>
              </div>
              <p className={`font-black text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {hunt.baseDays} Days
              </p>
            </div>
            
            <div className={`p-3 rounded-lg border ${
              darkMode 
                ? 'border-amber-500/30 bg-gradient-to-br from-gray-800 to-gray-900' 
                : 'border-amber-300 bg-gradient-to-br from-gray-50 to-gray-100'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} className={darkMode ? 'text-amber-400' : 'text-amber-600'} />
                <span className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  Location
                </span>
              </div>
              <p className={`font-black text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {hunt.location}
              </p>
            </div>
          </div>

          {/* Difficulty Tag & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <span className={`inline-block px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg border ${
              hunt.difficulty === 'Challenging' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500' :
              hunt.difficulty === 'Moderate' ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-yellow-500' :
              'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-500'
            }`}>
              {hunt.difficulty}
            </span>
            
            {/* Action Buttons */}
            <div className="flex gap-2 lg:flex-1">
              <button
                onClick={() => onViewDetails(hunt)}
                className={`flex-1 py-2 px-4 border-2 font-black rounded-lg transition-all duration-200 uppercase tracking-wider text-xs shadow-lg hover:shadow-xl ${
                  darkMode 
                    ? 'border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black' 
                    : 'border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => onAddHunt(hunt)}
                className={`flex-1 py-2 px-4 bg-gradient-to-r hover:from-amber-700 hover:to-orange-700 text-white font-black rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-xl uppercase tracking-wider text-xs border ${
                  darkMode 
                    ? 'from-amber-600 to-orange-600 border-amber-500' 
                    : 'from-amber-700 to-orange-700 border-amber-600'
                }`}
              >
                <Plus size={16} className="font-bold" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HuntCard; 