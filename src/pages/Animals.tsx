import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  RotateCcw,
  Target,
  Calendar,
  MapPin
} from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

interface AnimalsProps {
  darkMode: boolean;
}

interface AnimalGallery {
  name: string;
  displayName: string;
  images: string[];
  description: string;
  season: string;
  location: string;
}

// Utility function to randomize array while keeping first element in place
const randomizeArrayAfterFirst = (arr: string[]): string[] => {
  if (arr.length <= 1) return arr;
  const first = arr[0];
  const rest = arr.slice(1);
  // Fisher-Yates shuffle for the rest of the array
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [first, ...rest];
};

const animalGalleries: AnimalGallery[] = [
  {
    name: 'deer',
    displayName: 'Red Deer',
    images: randomizeArrayAfterFirst([
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
    ]),
    description: 'Hunt the iconic red deer, New Zealand\'s most prized trophy animal.',
    season: 'March - July',
    location: 'Canterbury Highlands'
  },
  {
    name: 'tahr',
    displayName: 'Tahr',
    images: randomizeArrayAfterFirst([
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
    ]),
    description: 'Challenge yourself with tahr hunting in New Zealand\'s alpine regions.',
    season: 'May - August',
    location: 'Southern Alps'
  },
  {
    name: 'chamois',
    displayName: 'Chamois',
    images: randomizeArrayAfterFirst([
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
    ]),
    description: 'Experience the thrill of hunting chamois in New Zealand\'s alpine terrain.',
    season: 'May - October',
    location: 'Alpine Regions'
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
    description: 'Breathtaking New Zealand landscapes where your hunting adventure unfolds.',
    season: 'Year Round',
    location: 'Various Locations'
  }
];


const Animals: React.FC<AnimalsProps> = ({ darkMode }) => {
  const [selectedGallery, setSelectedGallery] = useState<AnimalGallery | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [heroImageLoading, setHeroImageLoading] = useState(true);
  
  const imageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Single hero image for faster loading
  const heroImage = '/assets/img/gareth/Chamois/IMG_3541.JPG';

  useEffect(() => {
    document.title = 'New Zealand Hunting Species | Red Deer, Tahr & Chamois Gallery | Outback Hunting NZ';
  }, []);

  // Simple hero image loading
  useEffect(() => {
    setHeroImageLoading(true);
    const img = new Image();
    img.onload = () => {
      setHeroImageLoading(false);
    };
    img.onerror = () => {
      console.error('Failed to load hero image:', heroImage);
      setHeroImageLoading(false);
    };
    img.src = heroImage;
  }, [heroImage]);


  // Image loading handler
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };


  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const openGallery = (gallery: AnimalGallery) => {
    setSelectedGallery(gallery);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    setIsFullscreen(false);
    setImageLoading(true);
    setImageError(false);
  };

  const closeGallery = () => {
    setIsModalOpen(false);
    setSelectedGallery(null);
    setCurrentImageIndex(0);
    setIsFullscreen(false);
    setImageLoading(false);
    setImageError(false);
  };

  const nextImage = () => {
    if (selectedGallery && selectedGallery.images.length > 0) {
      setImageLoading(true);
      setImageError(false);
      setCurrentImageIndex((prev) => 
        prev === selectedGallery.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedGallery && selectedGallery.images.length > 0) {
      setImageLoading(true);
      setImageError(false);
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedGallery.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    if (selectedGallery && index >= 0 && index < selectedGallery.images.length) {
      setImageLoading(true);
      setImageError(false);
      setCurrentImageIndex(index);
    }
  };


  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen || !selectedGallery) return;
    
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeGallery();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        previousImage();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, handleKeyDown]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "New Zealand Hunting Species Gallery",
    "description": "Professional hunting gallery featuring Red Deer, Tahr, and Chamois hunting photos from New Zealand wilderness areas",
    "contentLocation": {
      "@type": "Place",
      "name": "Canterbury, New Zealand"
    },
    "creator": {
      "@type": "Person",
      "name": "Gareth Hall",
      "jobTitle": "Professional Hunting Guide"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Red Deer Hunting",
        "description": "Trophy Red Deer stag hunting in New Zealand"
      },
      {
        "@type": "Thing", 
        "name": "Tahr Hunting",
        "description": "Alpine Tahr hunting in Southern Alps"
      },
      {
        "@type": "Thing",
        "name": "Chamois Hunting", 
        "description": "Mountain Chamois hunting in alpine terrain"
      }
    ]
  };

  return (
    <>
      <SEO 
        title="New Zealand Hunting Species | Red Deer, Tahr & Chamois Gallery"
        description="Explore our hunting species gallery featuring Red Deer stag hunting, alpine Tahr hunting, and Chamois hunting photos from New Zealand's Canterbury wilderness. Professional hunting guide with 30+ years experience. View trophy hunting galleries and hunting season information."
        keywords="New Zealand hunting species, Red Deer hunting gallery, Tahr hunting photos, Chamois hunting images, hunting species NZ, trophy hunting gallery, Red Deer stag photos, alpine hunting images, mountain hunting gallery, Canterbury hunting species, South Island hunting animals, New Zealand hunting photos, trophy hunting images, deer hunting gallery NZ, tahr hunting pictures, chamois hunting photos, hunting seasons New Zealand, wildlife hunting gallery"
        image="/assets/img/gareth/Deer/DSC00169.JPG"
        url="/animals"
        type="article"
        canonical="https://outbackhuntingnz.com/animals"
        huntingSpecific={{
          species: ['Red Deer', 'Tahr', 'Chamois'],
          location: 'Canterbury',
          huntType: 'Trophy Hunting Gallery'
        }}
        structuredData={structuredData}
      />
      <div className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
      {/* Hero Image Section */}
      <section className="relative h-[75vh] overflow-hidden bg-gray-800 pt-20">
        {/* Fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        
        {/* Loading indicator */}
        {heroImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-black/50 text-white p-4 rounded-lg">
              <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
              <div>Loading image...</div>
            </div>
          </div>
        )}
        
        {/* Hero Image */}
        <OptimizedImage
          src={heroImage}
          alt="Chamois hunting in New Zealand mountains"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            heroImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setHeroImageLoading(false)}
          onError={() => {
            console.error('Failed to load hero image:', heroImage);
            setHeroImageLoading(false);
          }}
          style={{
            // High-quality image from Gareth's collection
            imageRendering: 'auto'
          }}
          priority={true}
        />
      </section>

      {/* Content Section */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full max-w-6xl mx-auto"
          >
            {/* Glassmorphic Container */}
            <div className={`backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border ${
              darkMode 
                ? 'bg-black/30 border-white/20' 
                : 'bg-white/30 border-white/40'
            }`}>
              <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 text-center leading-tight ${
                darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900 drop-shadow-md'
              }`}>
                New Zealand Hunting Species
              </h1>
              <h2 className={`text-2xl md:text-3xl font-semibold mb-4 text-center tracking-wide ${
                darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-800 drop-shadow-md'
              }`}>
                Red Deer, Tahr & Chamois Hunting Gallery
              </h2>
              <hr className="w-24 border-t-4 border-amber-500 my-6 mx-auto" />
              <p className={`font-light text-lg md:text-xl leading-relaxed text-center mb-8 ${
                darkMode ? 'text-gray-200 drop-shadow-lg' : 'text-gray-800 drop-shadow-md'
              }`}>
                Discover the diverse range of game species and breathtaking scenery from our real New Zealand hunting expeditions. 
                Experience authentic trophy hunting in some of the world's most spectacular wilderness areas.
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-3 bg-amber-500 rounded-full">
                    <Target size={24} className="text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Species Available</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-3 bg-amber-500 rounded-full">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>365</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Days Hunting</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-3 bg-amber-500 rounded-full">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>30+</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="galleries" className="text-3xl md:text-4xl font-bold mb-6">
              Explore Our <span className="text-amber-500">Hunting Galleries</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Click on any gallery to view high-quality images from our hunting expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animalGalleries.map((gallery, index) => (
              <motion.div
                key={gallery.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={() => openGallery(gallery)}
              >
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={gallery.images[0]}
                    alt={`${gallery.displayName} hunting in New Zealand`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{gallery.displayName}</h3>
                      <p className="text-sm opacity-90">{gallery.images.length} Photos</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {gallery.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{gallery.season}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{gallery.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Modal Gallery */}
      <AnimatePresence>
        {isModalOpen && selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <div 
              ref={modalRef}
              className={`relative w-full h-full ${isFullscreen ? 'max-w-full max-h-full' : 'max-w-6xl max-h-[90vh]'} ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center space-x-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedGallery.displayName} Gallery
                  </h2>
                  <div className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {currentImageIndex + 1} / {selectedGallery.images.length}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Close button */}
                  <button
                    onClick={closeGallery}
                    className={`p-2 rounded-full transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-200 text-gray-900'
                    }`}
                    title="Close gallery (Esc)"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative bg-black min-h-[400px] max-h-[60vh] flex items-center justify-center">
                {/* Loading indicator */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
                      <p className="text-white text-sm">Loading image...</p>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <RotateCcw size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Failed to load image</p>
                      <button
                        onClick={() => {
                          setImageError(false);
                          setImageLoading(true);
                        }}
                        className="px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Image */}
                {selectedGallery && !imageError && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selectedGallery.name}-${currentImageIndex}`}
                      ref={imageRef}
                      src={selectedGallery.images[currentImageIndex]}
                      alt={`${selectedGallery.displayName} hunting photo ${currentImageIndex + 1}`}
                      className="object-contain"
                      style={{
                        minWidth: '800px',
                        minHeight: '600px',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        transform: selectedGallery.images[currentImageIndex].includes('/assets/img/gareth/Deer/IMG_1792.JPG')
                          ? 'rotate(-90deg)'
                          : 'none',
                        imageRendering: selectedGallery.images[currentImageIndex].includes('/gallimg/')
                          ? 'pixelated' // For low-res images, use pixelated rendering
                          : 'auto',
                        filter: selectedGallery.images[currentImageIndex].includes('/gallimg/')
                          ? 'contrast(1.1) saturate(1.1) brightness(1.05)' // Enhance low-res images
                          : 'none'
                      }}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                  </AnimatePresence>
                )}

                {/* Navigation Arrows */}
                {selectedGallery && selectedGallery.images.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-300 group backdrop-blur-sm"
                      title="Previous image (←)"
                    >
                      <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 transition-all duration-300 group backdrop-blur-sm"
                      title="Next image (→)"
                    >
                      <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </>
                )}

                {/* Image info overlay */}
                {selectedGallery && !imageLoading && !imageError && (
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
                    {selectedGallery.displayName} - Image {currentImageIndex + 1}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {selectedGallery && selectedGallery.images.length > 1 && (
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} max-h-[20vh] overflow-y-auto`}>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {selectedGallery.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-amber-500 scale-105 shadow-lg'
                            : darkMode
                            ? 'border-gray-600 hover:border-gray-400 hover:scale-105'
                            : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                        }`}
                      >
                        <OptimizedImage
                          src={image}
                          alt={`${selectedGallery.displayName} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          style={{
                            // Apply same upsampling to thumbnails for consistency
                            imageRendering: image.includes('/gallimg/')
                              ? 'pixelated'
                              : 'auto',
                            filter: image.includes('/gallimg/')
                              ? 'contrast(1.1) saturate(1.1) brightness(1.05)'
                              : 'none',
                            transform: image.includes('/assets/img/gareth/Deer/IMG_1792.JPG')
                              ? 'rotate(-90deg)'
                              : 'none'
                          }}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/img/placeholder.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Keyboard shortcuts info */}
              <div className={`absolute bottom-4 right-4 text-xs space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} hidden sm:block`}>
                <div>← → Navigate</div>
                <div>Esc Close</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="information" className="text-3xl font-bold mb-8 text-center">
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
                      <td className="py-3 px-4 font-medium">Red Deer</td>
                      <td className="py-3 px-4">March - July</td>
                      <td className="py-3 px-4">Roar/rut in April</td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
                      <td className="py-3 px-4 font-medium">Himalayan Tahr</td>
                      <td className="py-3 px-4">May - August</td>
                      <td className="py-3 px-4">Best winter coats in June/July</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Chamois</td>
                      <td className="py-3 px-4">May - October</td>
                      <td className="py-3 px-4">Best winter coats in July/August</td>
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
    </>
  );
};

export default Animals;