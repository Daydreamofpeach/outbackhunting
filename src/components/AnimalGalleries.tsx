import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimalGalleriesProps {
  darkMode: boolean;
}

interface AnimalGallery {
  name: string;
  displayName: string;
  images: string[];
  description: string;
}

const AnimalGalleries: React.FC<AnimalGalleriesProps> = ({ darkMode }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalGallery | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const animalGalleries: AnimalGallery[] = [
    {
      name: 'deer',
      displayName: 'Red Deer',
      images: [
        // Original Gareth images
        '/assets/img/gareth/Deer/12pts 4 persistence.JPG',
        '/assets/img/gareth/Deer/DSC00169.JPG',
        '/assets/img/gareth/Deer/DSC00199.JPG',
        '/assets/img/gareth/Deer/DSC00233.JPG',
        '/assets/img/gareth/Deer/DSC00340.JPG',
        '/assets/img/gareth/Deer/DSC00356.JPG',
        '/assets/img/gareth/Deer/DSC00388.JPG',
        '/assets/img/gareth/Deer/IMG_1792.JPG',
        '/assets/img/gareth/Deer/IMG_3217.JPEG',
        '/assets/img/gareth/Deer/IMG_5179.JPG',
        '/assets/img/gareth/Deer/IMG_5184.JPG',
        '/assets/img/gareth/Deer/IMG_5565.JPEG',
        '/assets/img/gareth/Deer/P4083013.JPG',
        // Additional Red Stag images from gallimg
        '/assets/img/gallimg/redstag/1.png',
        '/assets/img/gallimg/redstag/2.png',
        '/assets/img/gallimg/redstag/3.png',
        '/assets/img/gallimg/redstag/4.png',
        '/assets/img/gallimg/redstag/5.png',
        '/assets/img/gallimg/redstag/6.png',
        '/assets/img/gallimg/redstag/7.png',
        '/assets/img/gallimg/redstag/8.png',
        '/assets/img/gallimg/redstag/9.png',
        '/assets/img/gallimg/redstag/10.png',
        '/assets/img/gallimg/redstag/11.png',
        '/assets/img/gallimg/redstag/12.png',
        '/assets/img/gallimg/redstag/13.png',
        '/assets/img/gallimg/redstag/14.png',
        '/assets/img/gallimg/redstag/15.png',
        '/assets/img/gallimg/redstag/16.png',
        '/assets/img/gallimg/redstag/17.png',
        '/assets/img/gallimg/redstag/18.png',
        '/assets/img/gallimg/redstag/19.png',
        '/assets/img/gallimg/redstag/20.png',
        '/assets/img/gallimg/redstag/21.png'
      ],
      description: 'Hunt the iconic red deer, New Zealand\'s most prized trophy animal.'
    },
    {
      name: 'tahr',
      displayName: 'Tahr',
      images: [
        // Original Gareth images
        '/assets/img/gareth/Tahr/DSC00990.JPG',
        '/assets/img/gareth/Tahr/DSC01355.JPG',
        '/assets/img/gareth/Tahr/DSC01358.JPG',
        '/assets/img/gareth/Tahr/DSC02282.JPG',
        '/assets/img/gareth/Tahr/DSC02290 - Copy.JPG',
        '/assets/img/gareth/Tahr/IMG_0368.JPG',
        '/assets/img/gareth/Tahr/IMG_0396.JPG',
        '/assets/img/gareth/Tahr/IMG_0486.JPEG',
        '/assets/img/gareth/Tahr/IMG_0778.JPG',
        '/assets/img/gareth/Tahr/IMG_0793.JPG',
        '/assets/img/gareth/Tahr/IMG_0795.JPG',
        '/assets/img/gareth/Tahr/IMG_0811.JPG',
        '/assets/img/gareth/Tahr/IMG_1711.JPG',
        '/assets/img/gareth/Tahr/IMG_1812.PNG',
        '/assets/img/gareth/Tahr/IMG_2335.JPEG',
        '/assets/img/gareth/Tahr/IMG_6741.JPG',
        '/assets/img/gareth/Tahr/IMG_6812.JPEG',
        '/assets/img/gareth/Tahr/IMG_6813.JPEG',
        // Additional Tahr images from gallimg
        '/assets/img/gallimg/Tahr/1.png',
        '/assets/img/gallimg/Tahr/2.png',
        '/assets/img/gallimg/Tahr/3.png',
        '/assets/img/gallimg/Tahr/4.png',
        '/assets/img/gallimg/Tahr/5.png',
        '/assets/img/gallimg/Tahr/6.png',
        '/assets/img/gallimg/Tahr/7.png',
        '/assets/img/gallimg/Tahr/9.png',
        '/assets/img/gallimg/Tahr/11.png',
        '/assets/img/gallimg/Tahr/12.png',
        '/assets/img/gallimg/Tahr/13.png',
        '/assets/img/gallimg/Tahr/14.png',
        '/assets/img/gallimg/Tahr/16.png',
        '/assets/img/gallimg/Tahr/17.png',
        '/assets/img/gallimg/Tahr/18.png',
        '/assets/img/gallimg/Tahr/19.png',
        '/assets/img/gallimg/Tahr/20.png',
        '/assets/img/gallimg/Tahr/21.png',
        '/assets/img/gallimg/Tahr/22.png',
        '/assets/img/gallimg/Tahr/23.png',
        '/assets/img/gallimg/Tahr/24.png',
        '/assets/img/gallimg/Tahr/25.png',
        '/assets/img/gallimg/Tahr/26.png',
        '/assets/img/gallimg/Tahr/27.png',
        '/assets/img/gallimg/Tahr/28.png',
        '/assets/img/gallimg/Tahr/29.png',
        '/assets/img/gallimg/Tahr/30.png',
        '/assets/img/gallimg/Tahr/31.png',
        '/assets/img/gallimg/Tahr/32.png',
        '/assets/img/gallimg/Tahr/33.png',
        '/assets/img/gallimg/Tahr/34.png',
        '/assets/img/gallimg/Tahr/35.png',
        '/assets/img/gallimg/Tahr/36.png',
        '/assets/img/gallimg/Tahr/37.png',
        '/assets/img/gallimg/Tahr/38.png',
        '/assets/img/gallimg/Tahr/39.png',
        '/assets/img/gallimg/Tahr/40.png',
        '/assets/img/gallimg/Tahr/41.png',
        '/assets/img/gallimg/Tahr/42.png',
        '/assets/img/gallimg/Tahr/43.png',
        '/assets/img/gallimg/Tahr/44.png',
        '/assets/img/gallimg/Tahr/46.png',
        '/assets/img/gallimg/Tahr/47.png',
        '/assets/img/gallimg/Tahr/48.png',
        '/assets/img/gallimg/Tahr/49.png',
        '/assets/img/gallimg/Tahr/51.png',
        '/assets/img/gallimg/Tahr/52.png',
        '/assets/img/gallimg/Tahr/53.png',
        '/assets/img/gallimg/Tahr/54.png',
        '/assets/img/gallimg/Tahr/55.png',
        '/assets/img/gallimg/Tahr/56.png',
        '/assets/img/gallimg/Tahr/57.png',
        '/assets/img/gallimg/Tahr/58.png',
        '/assets/img/gallimg/Tahr/59.png',
        '/assets/img/gallimg/Tahr/60.png',
        '/assets/img/gallimg/Tahr/61.png',
        '/assets/img/gallimg/Tahr/62.png',
        '/assets/img/gallimg/Tahr/63.png',
        '/assets/img/gallimg/Tahr/64.png',
        '/assets/img/gallimg/Tahr/65.png',
        '/assets/img/gallimg/Tahr/66.png',
        '/assets/img/gallimg/Tahr/68.png',
        '/assets/img/gallimg/Tahr/69.png',
        '/assets/img/gallimg/Tahr/70.png',
        '/assets/img/gallimg/Tahr/71.png',
        '/assets/img/gallimg/Tahr/72.png',
        '/assets/img/gallimg/Tahr/73.png',
        '/assets/img/gallimg/Tahr/74.png'
      ],
      description: 'Challenge yourself with tahr hunting in New Zealand\'s alpine regions.'
    },
    {
      name: 'chamois',
      displayName: 'Chamois',
      images: [
        // Original Gareth images
        '/assets/img/gareth/Chamois/DSC01085.JPG',
        '/assets/img/gareth/Chamois/IMG_3131.JPEG',
        '/assets/img/gareth/Chamois/IMG_3507.JPG',
        '/assets/img/gareth/Chamois/IMG_3541.JPG',
        '/assets/img/gareth/Chamois/IMG_6841.JPEG',
        '/assets/img/gareth/Chamois/IMG_7726.JPEG',
        '/assets/img/gareth/Chamois/IMG_8510.JPG',
        // Additional Chamois images from gallimg
        '/assets/img/gallimg/Chamois/1.png',
        '/assets/img/gallimg/Chamois/2.png',
        '/assets/img/gallimg/Chamois/3.png',
        '/assets/img/gallimg/Chamois/4.png',
        '/assets/img/gallimg/Chamois/5.png',
        '/assets/img/gallimg/Chamois/6.png',
        '/assets/img/gallimg/Chamois/7.png',
        '/assets/img/gallimg/Chamois/8.png',
        '/assets/img/gallimg/Chamois/9.png',
        '/assets/img/gallimg/Chamois/10.png',
        '/assets/img/gallimg/Chamois/11.png',
        '/assets/img/gallimg/Chamois/12.png',
        '/assets/img/gallimg/Chamois/13.png',
        '/assets/img/gallimg/Chamois/14.png',
        '/assets/img/gallimg/Chamois/15.png',
        '/assets/img/gallimg/Chamois/16.png',
        '/assets/img/gallimg/Chamois/17.png',
        '/assets/img/gallimg/Chamois/18.png',
        '/assets/img/gallimg/Chamois/20.png',
        '/assets/img/gallimg/Chamois/21.png',
        '/assets/img/gallimg/Chamois/22.png',
        '/assets/img/gallimg/Chamois/23.png',
        '/assets/img/gallimg/Chamois/24.png',
        '/assets/img/gallimg/Chamois/25.png',
        '/assets/img/gallimg/Chamois/26.png',
        '/assets/img/gallimg/Chamois/27.png',
        '/assets/img/gallimg/Chamois/28.png',
        '/assets/img/gallimg/Chamois/29.png',
        '/assets/img/gallimg/Chamois/30.jpg',
        '/assets/img/gallimg/Chamois/31.jpg',
        '/assets/img/gallimg/Chamois/32.jpg',
        '/assets/img/gallimg/Chamois/33.jpg',
        '/assets/img/gallimg/Chamois/34.jpg',
        '/assets/img/gallimg/Chamois/35.png',
        '/assets/img/gallimg/Chamois/36.png',
        '/assets/img/gallimg/Chamois/37.png'
      ],
      description: 'Experience the thrill of hunting chamois in New Zealand\'s alpine terrain.'
    },
    {
      name: 'scenery',
      displayName: 'Scenery',
      images: [
        '/assets/img/gareth/Scenery and camps/Arawhata tops 1.JPG',
        '/assets/img/gareth/Scenery and camps/camp4.JPG',
        '/assets/img/gareth/Scenery and camps/DSC00218.JPG',
        '/assets/img/gareth/Scenery and camps/DSC02245.JPG',
        '/assets/img/gareth/Scenery and camps/imagejpeg_2.jpg',
        '/assets/img/gareth/Scenery and camps/IMG_0266.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_0269.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_0307.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_0310.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_0566.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_0664.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_0773.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_0808.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_0815.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_1675.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_1682.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_1973.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_2542.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_2725.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_3656.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_5544.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_6356.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_6560.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_6643.JPEG',
        '/assets/img/gareth/Scenery and camps/IMG_7930.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_8499.JPG',
        '/assets/img/gareth/Scenery and camps/IMG_8545.JPG',
        '/assets/img/gareth/Scenery and camps/IMG20230415100325.jpg',
        '/assets/img/gareth/Scenery and camps/PA070096.JPG',
        '/assets/img/gareth/Scenery and camps/Rest time d.JPG',
        '/assets/img/gareth/Scenery and camps/Tekapo wint _06.JPG',
        '/assets/img/gareth/Scenery and camps/Upper Burke 020.jpg'
      ],
      description: 'Breathtaking New Zealand landscapes where your hunting adventure unfolds.'
    }
  ];

  const openGallery = (animal: AnimalGallery) => {
    setSelectedAnimal(animal);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeGallery = () => {
    setIsModalOpen(false);
    setSelectedAnimal(null);
    setCurrentImageIndex(0);
    setIsFullscreen(false);
  };

  const nextImage = () => {
    if (selectedAnimal) {
      setCurrentImageIndex((prev) => 
        prev === selectedAnimal.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedAnimal) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedAnimal.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore Our <span className="text-amber-500">Hunting Galleries</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the diverse wildlife and stunning landscapes that await you on your New Zealand hunting adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animalGalleries.map((animal, index) => (
            <motion.div
              key={animal.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={() => openGallery(animal)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={animal.images[0]}
                  alt={`${animal.displayName} hunting in New Zealand - Trophy ${animal.displayName} gallery`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  style={{ imageRendering: 'crisp-edges' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{animal.displayName}</h3>
                    <p className="text-sm opacity-90">{animal.images.length} Photos</p>
                  </div>
                </div>
              </div>
              <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {animal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Gallery */}
        <Dialog
          open={isModalOpen}
          onClose={closeGallery}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className={`w-full ${isFullscreen ? 'max-w-full max-h-full' : 'max-w-6xl max-h-full'}`}>
              <div className={`relative ${isFullscreen ? 'h-full' : 'rounded-lg'} overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Dialog.Title className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAnimal?.displayName} Gallery
                  </Dialog.Title>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {isFullscreen ? (
                        <Minimize2 size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
                      ) : (
                        <Maximize2 size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
                      )}
                    </button>
                    <button
                      onClick={closeGallery}
                      className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <X size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
                    </button>
                  </div>
                </div>

                {/* Main Image */}
                <div className="relative bg-gray-900">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedAnimal?.images[currentImageIndex]}
                      alt={`${selectedAnimal?.displayName} hunting trophy - New Zealand ${selectedAnimal?.displayName} hunting photo ${currentImageIndex + 1}`}
                      className={`w-full ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96 md:h-[600px]'} object-contain mx-auto`}
                      style={{ imageRendering: 'crisp-edges' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedAnimal?.images.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedAnimal?.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-amber-500'
                            : darkMode
                            ? 'border-gray-600 hover:border-gray-400'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedAnimal?.displayName} hunting thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'crisp-edges' }}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </section>
  );
};

export default AnimalGalleries; 