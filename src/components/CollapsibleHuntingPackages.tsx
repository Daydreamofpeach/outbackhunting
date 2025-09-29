import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { pricingService, HuntData } from '../services/pricingService';
import HuntCard from './HuntCard';
import { RedStagGallery, ChamoisGallery, TahrGallery } from './LowResImageSlider';

interface CollapsibleHuntingPackagesProps {
  darkMode: boolean;
  onHuntSelect?: (hunt: HuntData) => void;
  onViewDetails?: (hunt: HuntData) => void;
}

interface AnimalSection {
  species: string;
  totalHunts: number;
  wilderness: HuntData[];
  private: HuntData[];
}

const CollapsibleHuntingPackages: React.FC<CollapsibleHuntingPackagesProps> = ({ 
  darkMode, 
  onHuntSelect, 
  onViewDetails 
}) => {
  const [loading, setLoading] = useState(true);
  const [animalSections, setAnimalSections] = useState<AnimalSection[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openSubsections, setOpenSubsections] = useState<Record<string, boolean>>({});

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const loadHunts = async () => {
      try {
        const allHunts = await pricingService.getAllHunts();
        
        // Group hunts by species and location type
        const grouped = allHunts.reduce((acc, hunt) => {
          const species = hunt.species;
          if (!acc[species]) {
            acc[species] = { 
              species, 
              totalHunts: 0,
              wilderness: [], 
              private: [] 
            };
          }
          
          acc[species].totalHunts++;
          
          if (hunt.location.toLowerCase().includes('wilderness')) {
            acc[species].wilderness.push(hunt);
          } else if (hunt.location.toLowerCase().includes('private')) {
            acc[species].private.push(hunt);
          }
          
          return acc;
        }, {} as Record<string, AnimalSection>);
        
        const sectionsArray = Object.values(grouped);
        setAnimalSections(sectionsArray);
        
        // Sections will be initialized as open in the useEffect hook
        
      } catch (error) {
        console.error('Failed to load hunts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHunts();
  }, []);

  useEffect(() => {
    if (!loading && animalSections.length > 0) {
      // Initialize all sections as open for better UX - let user see content immediately
      const initialOpenState = animalSections.reduce((acc, section) => {
        acc[section.species] = true;
        acc[`${section.species}-wilderness`] = true;
        acc[`${section.species}-private`] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setOpenSections(initialOpenState);
      setOpenSubsections(initialOpenState);
    }
  }, [loading, animalSections]);

  const toggleSection = (species: string) => {
    setOpenSections(prev => ({ ...prev, [species]: !prev[species] }));
  };

  const toggleSubsection = (key: string) => {
    setOpenSubsections(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
    <section ref={ref} className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Premium Hunting Experiences
            </h2>
            <p className={`max-w-3xl mx-auto text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discover our carefully curated hunting packages, organized by species and terrain. 
              Each experience is designed to provide unforgettable adventures in New Zealand's pristine wilderness.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12">
          {animalSections.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No hunting packages available at the moment.</p>
            </div>
          ) : (
            animalSections.map((section, sectionIndex) => (
                <div 
                  key={section.species} 
                  className="relative"
                >
              {/* Main Species Section Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className={`section-header sticky top-4 z-10 mb-8 rounded-2xl shadow-xl backdrop-blur-sm ${
                  darkMode 
                    ? 'bg-gray-800/90 border border-gray-700' 
                    : 'bg-white/95 border border-gray-200 shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.species)}
                  className={`w-full p-8 text-left transition-colors rounded-2xl ${
                    darkMode 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      <div>
                        <h3 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {section.species} Hunting
                        </h3>
                        <p className={`text-lg mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {section.wilderness.length + section.private.length} packages available
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-xl font-bold ${
                        darkMode ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {section.wilderness.length > 0 && section.private.length > 0 
                          ? 'Wilderness & Private'
                          : section.wilderness.length > 0 
                          ? 'Wilderness' 
                          : 'Private Land'
                        }
                      </div>
                      {openSections[section.species] ? (
                        <ChevronUp size={28} className="text-amber-500" />
                      ) : (
                        <ChevronDown size={28} className="text-amber-500" />
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Animal Gallery - shown when section is open */}
              {openSections[section.species] && (
                <div className="mb-8">
                  {section.species === 'Red Stag' && <RedStagGallery darkMode={darkMode} />}
                  {section.species === 'Chamois' && <ChamoisGallery darkMode={darkMode} />}
                  {section.species === 'Bull Tahr' && <TahrGallery darkMode={darkMode} />}
                </div>
              )}

              {/* Section Content */}
              {openSections[section.species] && (
                <div className="section-content">
                  <div className="space-y-8 pb-8">
                      {/* Wilderness Subsection */}
                      {section.wilderness.length > 0 && (
                        <div 
                          className={`rounded-2xl overflow-hidden ${
                            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200 shadow-sm'
                          } border`}
                        >
                          <button
                            onClick={() => toggleSubsection(`${section.species}-wilderness`)}
                            className={`w-full p-6 text-left transition-colors ${
                              darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <MapPin size={24} className="text-green-500" />
                                <div>
                                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Wilderness Areas
                                  </h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {section.wilderness.length} remote hunting experiences
                                  </p>
                                </div>
                              </div>
                              {openSubsections[`${section.species}-wilderness`] ? (
                                <ChevronUp size={24} className="text-green-500" />
                              ) : (
                                <ChevronDown size={24} className="text-green-500" />
                              )}
                            </div>
                          </button>

                          {openSubsections[`${section.species}-wilderness`] && (
                            <div className="subsection-content">
                              <div className="p-6 pt-0">
                                <div className="space-y-4">
                                  {section.wilderness.map((hunt) => (
                                    <div key={hunt.id} className="hunt-card">
                                      <HuntCard 
                                        hunt={hunt}
                                        darkMode={darkMode}
                                        onAddHunt={onHuntSelect || (() => {})}
                                        onViewDetails={onViewDetails || (() => {})}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Private Land Subsection */}
                      {section.private.length > 0 && (
                        <div 
                          className={`rounded-2xl overflow-hidden ${
                            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200 shadow-sm'
                          } border`}
                        >
                          <button
                            onClick={() => toggleSubsection(`${section.species}-private`)}
                            className={`w-full p-6 text-left transition-colors ${
                              darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <MapPin size={24} className="text-amber-500" />
                                <div>
                                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Private Land
                                  </h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {section.private.length} exclusive hunting experiences
                                  </p>
                                </div>
                              </div>
                              {openSubsections[`${section.species}-private`] ? (
                                <ChevronUp size={24} className="text-amber-500" />
                              ) : (
                                <ChevronDown size={24} className="text-amber-500" />
                              )}
                            </div>
                          </button>

                          {openSubsections[`${section.species}-private`] && (
                            <div className="subsection-content">
                              <div className="p-6 pt-0">
                                <div className="space-y-4">
                                  {section.private.map((hunt) => (
                                    <div key={hunt.id} className="hunt-card">
                                      <HuntCard 
                                        hunt={hunt}
                                        darkMode={darkMode}
                                        onAddHunt={onHuntSelect || (() => {})}
                                        onViewDetails={onViewDetails || (() => {})}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CollapsibleHuntingPackages;
