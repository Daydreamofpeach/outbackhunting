import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Info } from 'lucide-react';
import AnimalGalleries from '../components/AnimalGalleries';

interface AnimalsProps {
  darkMode: boolean;
}

const animalTabs = [
  { id: 'redstag', name: 'Red Stag', folder: 'redstag' },
  { id: 'fallow', name: 'Fallow Deer', folder: 'fallow' },
  { id: 'elk', name: 'Elk', folder: 'Elk' },
  { id: 'rams', name: 'Rams', folder: 'Rams' },
  { id: 'tahr', name: 'Tahr', folder: 'Tahr' },
  { id: 'whitetail', name: 'Whitetail', folder: 'Whitetail' },
  { id: 'chamois', name: 'Chamois', folder: 'Chamois' },
  { id: 'fishing', name: 'Fishing', folder: 'fishing' },
  { id: 'scenery', name: 'Scenery', folder: 'scenery' },
];

// Helper to get all images for a folder (static import for Vite/CRA, dynamic for Node)
const animalImages: Record<string, string[]> = {
  redstag: [
    '/assets/img/gallimg/redstag/1.png','/assets/img/gallimg/redstag/2.png','/assets/img/gallimg/redstag/3.png','/assets/img/gallimg/redstag/4.png','/assets/img/gallimg/redstag/5.png','/assets/img/gallimg/redstag/6.png','/assets/img/gallimg/redstag/7.png','/assets/img/gallimg/redstag/8.png','/assets/img/gallimg/redstag/9.png','/assets/img/gallimg/redstag/10.png','/assets/img/gallimg/redstag/11.png','/assets/img/gallimg/redstag/12.png','/assets/img/gallimg/redstag/13.png','/assets/img/gallimg/redstag/14.png','/assets/img/gallimg/redstag/15.png','/assets/img/gallimg/redstag/16.png','/assets/img/gallimg/redstag/17.png','/assets/img/gallimg/redstag/18.png','/assets/img/gallimg/redstag/19.png','/assets/img/gallimg/redstag/20.png','/assets/img/gallimg/redstag/21.png','/assets/img/gallimg/redstag/22.png','/assets/img/gallimg/redstag/23.png','/assets/img/gallimg/redstag/24.png','/assets/img/gallimg/redstag/25.png','/assets/img/gallimg/redstag/26.png','/assets/img/gallimg/redstag/27.png','/assets/img/gallimg/redstag/28.png','/assets/img/gallimg/redstag/29.png','/assets/img/gallimg/redstag/30.jpg','/assets/img/gallimg/redstag/31.jpg','/assets/img/gallimg/redstag/32.jpg','/assets/img/gallimg/redstag/33.jpg','/assets/img/gallimg/redstag/34.jpg','/assets/img/gallimg/redstag/35.png','/assets/img/gallimg/redstag/36.png','/assets/img/gallimg/redstag/37.png'
  ],
  fallow: [
    '/assets/img/gallimg/fallow/3.png','/assets/img/gallimg/fallow/4.png','/assets/img/gallimg/fallow/5.png','/assets/img/gallimg/fallow/6.png','/assets/img/gallimg/fallow/7.png','/assets/img/gallimg/fallow/8.png','/assets/img/gallimg/fallow/9.png','/assets/img/gallimg/fallow/10.png','/assets/img/gallimg/fallow/11.png','/assets/img/gallimg/fallow/12.png','/assets/img/gallimg/fallow/13.png','/assets/img/gallimg/fallow/14.png','/assets/img/gallimg/fallow/15.png','/assets/img/gallimg/fallow/16.png','/assets/img/gallimg/fallow/17.png','/assets/img/gallimg/fallow/18.png'
  ],
  elk: [
    '/assets/img/gallimg/Elk/1.png','/assets/img/gallimg/Elk/2.png','/assets/img/gallimg/Elk/3.png'
  ],
  rams: [
    '/assets/img/gallimg/Rams/1.png','/assets/img/gallimg/Rams/3.png','/assets/img/gallimg/Rams/4.png','/assets/img/gallimg/Rams/5.png','/assets/img/gallimg/Rams/6.png','/assets/img/gallimg/Rams/10.png','/assets/img/gallimg/Rams/11.png'
  ],
  tahr: [
    '/assets/img/gallimg/Tahr/1.png','/assets/img/gallimg/Tahr/2.png','/assets/img/gallimg/Tahr/3.png','/assets/img/gallimg/Tahr/4.png','/assets/img/gallimg/Tahr/5.png','/assets/img/gallimg/Tahr/6.png','/assets/img/gallimg/Tahr/7.png','/assets/img/gallimg/Tahr/9.png','/assets/img/gallimg/Tahr/11.png','/assets/img/gallimg/Tahr/12.png','/assets/img/gallimg/Tahr/13.png','/assets/img/gallimg/Tahr/14.png','/assets/img/gallimg/Tahr/16.png','/assets/img/gallimg/Tahr/17.png','/assets/img/gallimg/Tahr/18.png','/assets/img/gallimg/Tahr/19.png','/assets/img/gallimg/Tahr/20.png','/assets/img/gallimg/Tahr/21.png','/assets/img/gallimg/Tahr/22.png','/assets/img/gallimg/Tahr/23.png','/assets/img/gallimg/Tahr/24.png','/assets/img/gallimg/Tahr/25.png','/assets/img/gallimg/Tahr/26.png','/assets/img/gallimg/Tahr/27.png','/assets/img/gallimg/Tahr/28.png','/assets/img/gallimg/Tahr/29.png','/assets/img/gallimg/Tahr/30.png','/assets/img/gallimg/Tahr/31.png','/assets/img/gallimg/Tahr/32.png','/assets/img/gallimg/Tahr/33.png','/assets/img/gallimg/Tahr/34.png','/assets/img/gallimg/Tahr/35.png','/assets/img/gallimg/Tahr/36.png','/assets/img/gallimg/Tahr/37.png','/assets/img/gallimg/Tahr/38.png','/assets/img/gallimg/Tahr/39.png','/assets/img/gallimg/Tahr/40.png','/assets/img/gallimg/Tahr/41.png','/assets/img/gallimg/Tahr/42.png','/assets/img/gallimg/Tahr/43.png','/assets/img/gallimg/Tahr/44.png','/assets/img/gallimg/Tahr/46.png','/assets/img/gallimg/Tahr/47.png','/assets/img/gallimg/Tahr/48.png','/assets/img/gallimg/Tahr/49.png','/assets/img/gallimg/Tahr/5.png','/assets/img/gallimg/Tahr/51.png','/assets/img/gallimg/Tahr/52.png','/assets/img/gallimg/Tahr/53.png','/assets/img/gallimg/Tahr/54.png','/assets/img/gallimg/Tahr/55.png','/assets/img/gallimg/Tahr/56.png','/assets/img/gallimg/Tahr/57.png','/assets/img/gallimg/Tahr/58.png','/assets/img/gallimg/Tahr/59.png','/assets/img/gallimg/Tahr/6.png','/assets/img/gallimg/Tahr/60.png','/assets/img/gallimg/Tahr/61.png','/assets/img/gallimg/Tahr/62.png','/assets/img/gallimg/Tahr/63.png','/assets/img/gallimg/Tahr/64.png','/assets/img/gallimg/Tahr/65.png','/assets/img/gallimg/Tahr/66.png','/assets/img/gallimg/Tahr/68.png','/assets/img/gallimg/Tahr/69.png','/assets/img/gallimg/Tahr/7.png','/assets/img/gallimg/Tahr/70.png','/assets/img/gallimg/Tahr/71.png','/assets/img/gallimg/Tahr/72.png','/assets/img/gallimg/Tahr/73.png','/assets/img/gallimg/Tahr/74.png'
  ],
  whitetail: [
    '/assets/img/gallimg/Whitetail/1.png','/assets/img/gallimg/Whitetail/2.png','/assets/img/gallimg/Whitetail/3.png','/assets/img/gallimg/Whitetail/4.png','/assets/img/gallimg/Whitetail/5.png','/assets/img/gallimg/Whitetail/6.png','/assets/img/gallimg/Whitetail/8.jpg','/assets/img/gallimg/Whitetail/9.jpg','/assets/img/gallimg/Whitetail/10.jpg'
  ],
  chamois: [
    '/assets/img/gallimg/Chamois/1.png','/assets/img/gallimg/Chamois/2.png','/assets/img/gallimg/Chamois/3.png','/assets/img/gallimg/Chamois/4.png','/assets/img/gallimg/Chamois/5.png','/assets/img/gallimg/Chamois/6.png','/assets/img/gallimg/Chamois/7.png','/assets/img/gallimg/Chamois/8.png','/assets/img/gallimg/Chamois/9.png','/assets/img/gallimg/Chamois/10.png','/assets/img/gallimg/Chamois/11.png','/assets/img/gallimg/Chamois/12.png','/assets/img/gallimg/Chamois/13.png','/assets/img/gallimg/Chamois/14.png','/assets/img/gallimg/Chamois/15.png','/assets/img/gallimg/Chamois/16.png','/assets/img/gallimg/Chamois/17.png','/assets/img/gallimg/Chamois/18.png','/assets/img/gallimg/Chamois/19.png','/assets/img/gallimg/Chamois/20.png','/assets/img/gallimg/Chamois/21.png','/assets/img/gallimg/Chamois/22.png','/assets/img/gallimg/Chamois/23.png','/assets/img/gallimg/Chamois/24.png','/assets/img/gallimg/Chamois/25.png','/assets/img/gallimg/Chamois/26.png','/assets/img/gallimg/Chamois/27.png','/assets/img/gallimg/Chamois/28.png','/assets/img/gallimg/Chamois/29.png','/assets/img/gallimg/Chamois/30.jpg','/assets/img/gallimg/Chamois/31.jpg','/assets/img/gallimg/Chamois/32.jpg','/assets/img/gallimg/Chamois/33.jpg','/assets/img/gallimg/Chamois/34.jpg','/assets/img/gallimg/Chamois/35.png','/assets/img/gallimg/Chamois/36.png','/assets/img/gallimg/Chamois/37.png'
  ],
  fishing: [
    '/assets/img/gallimg/fishing/1.png','/assets/img/gallimg/fishing/2.png','/assets/img/gallimg/fishing/3.png','/assets/img/gallimg/fishing/4.png','/assets/img/gallimg/fishing/6.png','/assets/img/gallimg/fishing/7.png','/assets/img/gallimg/fishing/8.png','/assets/img/gallimg/fishing/9.png','/assets/img/gallimg/fishing/10.png','/assets/img/gallimg/fishing/11.png','/assets/img/gallimg/fishing/12.png','/assets/img/gallimg/fishing/13.png'
  ],
  scenery: [
    '/assets/img/gallimg/scenery/1.png','/assets/img/gallimg/scenery/2.png','/assets/img/gallimg/scenery/3.png','/assets/img/gallimg/scenery/4.png','/assets/img/gallimg/scenery/5.png','/assets/img/gallimg/scenery/6.png','/assets/img/gallimg/scenery/7.png','/assets/img/gallimg/scenery/8.png','/assets/img/gallimg/scenery/9.png','/assets/img/gallimg/scenery/10.png','/assets/img/gallimg/scenery/11.png','/assets/img/gallimg/scenery/12.png','/assets/img/gallimg/scenery/13.png','/assets/img/gallimg/scenery/14.png','/assets/img/gallimg/scenery/15.png','/assets/img/gallimg/scenery/16.png','/assets/img/gallimg/scenery/17.png','/assets/img/gallimg/scenery/18.png','/assets/img/gallimg/scenery/19.png','/assets/img/gallimg/scenery/20.png','/assets/img/gallimg/scenery/21.png','/assets/img/gallimg/scenery/22.png','/assets/img/gallimg/scenery/23.png','/assets/img/gallimg/scenery/24.png','/assets/img/gallimg/scenery/25.png','/assets/img/gallimg/scenery/26.png','/assets/img/gallimg/scenery/27.png','/assets/img/gallimg/scenery/28.png','/assets/img/gallimg/scenery/29.png','/assets/img/gallimg/scenery/30.png','/assets/img/gallimg/scenery/31.png','/assets/img/gallimg/scenery/32.png','/assets/img/gallimg/scenery/33.png','/assets/img/gallimg/scenery/34.png','/assets/img/gallimg/scenery/35.png','/assets/img/gallimg/scenery/36.png','/assets/img/gallimg/scenery/37.png','/assets/img/gallimg/scenery/38.png','/assets/img/gallimg/scenery/39.png','/assets/img/gallimg/scenery/40.png','/assets/img/gallimg/scenery/41.png','/assets/img/gallimg/scenery/42.png','/assets/img/gallimg/scenery/43.png','/assets/img/gallimg/scenery/44.png','/assets/img/gallimg/scenery/45.png','/assets/img/gallimg/scenery/46.png','/assets/img/gallimg/scenery/47.png','/assets/img/gallimg/scenery/48.png','/assets/img/gallimg/scenery/49.png','/assets/img/gallimg/scenery/50.png','/assets/img/gallimg/scenery/51.png','/assets/img/gallimg/scenery/52.png','/assets/img/gallimg/scenery/53.png','/assets/img/gallimg/scenery/54.png','/assets/img/gallimg/scenery/55.png','/assets/img/gallimg/scenery/56.png','/assets/img/gallimg/scenery/57.png','/assets/img/gallimg/scenery/58.png','/assets/img/gallimg/scenery/59.png','/assets/img/gallimg/scenery/60.png','/assets/img/gallimg/scenery/61.png'
  ]
};

const difficultyColors = {
  Easy: 'bg-green-500',
  Moderate: 'bg-amber-500',
  Challenging: 'bg-amber-600',
  Difficult: 'bg-red-600'
};

const Animals: React.FC<AnimalsProps> = ({ darkMode }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    document.title = 'Huntable Species | Outback Hunting New Zealand';
  }, []);

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
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
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Huntable Species
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Explore the diverse range of game species and scenery from our real New Zealand hunting adventures.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Animal Galleries Section */}
      <AnimalGalleries darkMode={darkMode} />
      {/* Info Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Hunting Information
            </h2>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg mb-10`}>
              <h3 className="text-2xl font-bold mb-6">Hunting Regulations</h3>
              
              <div className="space-y-6">
                <p>
                  New Zealand has specific regulations governing the hunting of game animals. Most big game animals can be hunted year-round on private land with landowner permission, while public land hunting may have seasonal restrictions.
                </p>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Licenses and Permits</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Foreign hunters are required to have a New Zealand firearms license or hunt with a licensed guide. All our packages include the arrangement of necessary permits and licenses. For hunting on public conservation land, additional permits may be required.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Trophy Export</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    New Zealand has specific requirements for exporting hunting trophies. All trophies must be properly cleaned and accompanied by relevant documentation. Our team handles all aspects of trophy preparation and export paperwork.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Firearms</h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Visitors can bring their own firearms to New Zealand with proper permits, or quality firearms can be rented locally. Most hunters prefer calibers between .270 and .300 for New Zealand hunting conditions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-bold mb-6">Hunting Seasons</h3>
              
              <div className="overflow-x-auto">
                <table className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <thead>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <th className="py-3 px-4 text-left">Species</th>
                      <th className="py-3 px-4 text-left">Peak Season</th>
                      <th className="py-3 px-4 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Red Stag</td>
                      <td className="py-3 px-4">March - July</td>
                      <td className="py-3 px-4">Roar/rut in April</td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Himalayan Tahr</td>
                      <td className="py-3 px-4">May - August</td>
                      <td className="py-3 px-4">Best winter coats in June/July</td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Chamois</td>
                      <td className="py-3 px-4">May - October</td>
                      <td className="py-3 px-4">Best winter coats in July/August</td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Fallow Deer</td>
                      <td className="py-3 px-4">March - June</td>
                      <td className="py-3 px-4">Rut in April</td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Sika Deer</td>
                      <td className="py-3 px-4">May - August</td>
                      <td className="py-3 px-4">Rut in May/June</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Wild Boar, Wallaby, Hare</td>
                      <td className="py-3 px-4">Year-round</td>
                      <td className="py-3 px-4">No seasonal restrictions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className={`mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Note: While most species can be hunted year-round on private land, the seasons listed above represent the optimal times for trophy quality and hunting conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Animals;