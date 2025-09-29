import { useState, useRef, useEffect } from "react";

interface ImageCardProps {
  src: string;
  onHover: (isHovered: boolean, element: HTMLDivElement | null) => void;
  alt: string;
}

function ImageCard({ src, onHover, alt }: ImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative flex-shrink-0 w-40 h-28 mx-2 cursor-pointer group"
      onMouseEnter={() => onHover(true, cardRef.current)}
      onMouseLeave={() => onHover(false, null)}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-amber-500/50">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          style={{ imageRendering: "pixelated" }}
          loading="lazy"
          decoding="async"
          width={160}
          height={112}
          // SEO improvements
          itemProp="image"
          fetchPriority="low"
        />
        {/* Overlay for low-res effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none" />

        {/* Scan lines effect for retro feel */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px] bg-repeat-y" />
      </div>
    </div>
  );
}

interface MagnifyingLensProps {
  isVisible: boolean;
  position: { x: number; y: number };
  imageSrc: string;
  imageRect: DOMRect | null;
  darkMode: boolean;
}

function MagnifyingLens({ isVisible, position, imageSrc, imageRect, darkMode }: MagnifyingLensProps) {
  if (!isVisible || !imageRect) return null;

  // Calculate the magnified area position - larger scope size
  const lensSize = 320;
  const magnification = 2.5;

  // Ensure position is within bounds and prevent cutoff
  const clampedX = Math.max(imageRect.left, Math.min(position.x, imageRect.right));
  const clampedY = Math.max(imageRect.top, Math.min(position.y, imageRect.bottom));

  // Calculate the source area that should be magnified (0-1 range)
  const sourceX = Math.max(0, Math.min(1, (clampedX - imageRect.left) / imageRect.width));
  const sourceY = Math.max(0, Math.min(1, (clampedY - imageRect.top) / imageRect.height));

  // Calculate background position to center the magnified area
  const bgX = sourceX * imageRect.width * magnification - lensSize / 2;
  const bgY = sourceY * imageRect.height * magnification - lensSize / 2;

  // Calculate position with bounds checking to prevent cutoff
  const halfLens = lensSize / 2;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Adjust position to keep lens within viewport
  const lensLeft = Math.max(halfLens, Math.min(clampedX - halfLens, viewportWidth - halfLens));
  const lensTop = Math.max(halfLens, Math.min(clampedY - halfLens, viewportHeight - halfLens));

  return (
    <div
      className="fixed pointer-events-none z-50 overflow-hidden"
      style={{
        width: lensSize,
        height: lensSize,
        left: lensLeft,
        top: lensTop,
        transform: 'translate3d(-50%, -50%, 0)',
        willChange: 'transform',
      }}
    >
      {/* Rifle Scope Body */}
      <div 
        className="absolute inset-0 rounded-full border-4 shadow-2xl"
        style={{
          borderColor: darkMode ? '#1f2937' : '#6b7280',
          background: darkMode 
            ? 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
          boxShadow: darkMode 
            ? `
              0 0 30px rgba(0, 0, 0, 0.6),
              0 0 0 2px #374151,
              inset 0 0 0 1px rgba(255, 255, 255, 0.1)
            `
            : `
              0 0 30px rgba(0, 0, 0, 0.3),
              0 0 0 2px #e2e8f0,
              inset 0 0 0 1px rgba(0, 0, 0, 0.1)
            `
        }}
      >
        {/* Magnified Image */}
        <div
          className="absolute inset-4 rounded-full overflow-hidden"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${imageRect.width * magnification}px ${imageRect.height * magnification}px`,
            backgroundPosition: `${Math.round(-bgX)}px ${Math.round(-bgY)}px`,
            backgroundRepeat: 'no-repeat',
            filter: darkMode 
              ? "contrast(1.2) saturate(1.1) brightness(1.1)"
              : "contrast(1.1) saturate(1.05) brightness(1.05)",
            imageRendering: "auto",
            transform: 'translate3d(0, 0, 0)',
            willChange: 'background-position',
          }}
        >
          {/* Lens Reflection Overlay */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: darkMode 
                ? 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                : 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
            }}
          />
          
          {/* Lens Edge Vignette */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: darkMode 
                ? 'radial-gradient(circle, transparent 70%, rgba(0, 0, 0, 0.2) 100%)'
                : 'radial-gradient(circle, transparent 70%, rgba(0, 0, 0, 0.1) 100%)'
            }}
          />
          
          {/* Rifle Scope Crosshair */}
          <div className="absolute inset-0">
            {/* Main crosshair lines */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(185, 28, 28, 0.95)' }}
            />
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(185, 28, 28, 0.95)' }}
            />
            
            {/* Crosshair center dot */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
              style={{ backgroundColor: darkMode ? '#ef4444' : '#dc2626' }}
            />
            
            {/* Mil-dots for range estimation */}
            <div 
              className="absolute top-1/2 left-1/4 w-0.5 h-0.5 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.7)' : 'rgba(185, 28, 28, 0.8)' }}
            />
            <div 
              className="absolute top-1/2 right-1/4 w-0.5 h-0.5 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.7)' : 'rgba(185, 28, 28, 0.8)' }}
            />
            <div 
              className="absolute top-1/4 left-1/2 w-0.5 h-0.5 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.7)' : 'rgba(185, 28, 28, 0.8)' }}
            />
            <div 
              className="absolute bottom-1/4 left-1/2 w-0.5 h-0.5 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
              style={{ backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.7)' : 'rgba(185, 28, 28, 0.8)' }}
            />
          </div>
          
          {/* Scope Reticle Numbers */}
          <div 
            className="absolute top-2 left-2 text-xs font-mono px-1 rounded backdrop-blur-sm" 
            style={{ 
              color: darkMode ? 'rgba(239, 68, 68, 0.9)' : 'rgba(185, 28, 28, 0.95)',
              backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.9)',
              border: darkMode ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(185, 28, 28, 0.2)'
            }}
          >
            4x
          </div>
        </div>
      </div>
      
      {/* Scope Adjustment Knobs - Only show if not near edges */}
      {lensTop > 30 && (
        <div 
          className="absolute -top-2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2"
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #94a3b8',
            boxShadow: darkMode 
              ? '0 2px 8px rgba(0, 0, 0, 0.6)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
            style={{ backgroundColor: darkMode ? '#9ca3af' : '#6b7280' }}
          />
        </div>
      )}
      
      {lensTop < viewportHeight - 30 && (
        <div 
          className="absolute -bottom-2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2"
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #94a3b8',
            boxShadow: darkMode 
              ? '0 2px 8px rgba(0, 0, 0, 0.6)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
            style={{ backgroundColor: darkMode ? '#9ca3af' : '#6b7280' }}
          />
        </div>
      )}
      
      {lensLeft > 30 && (
        <div 
          className="absolute top-1/2 -left-2 w-3 h-3 rounded-full transform -translate-y-1/2"
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #94a3b8',
            boxShadow: darkMode 
              ? '0 2px 8px rgba(0, 0, 0, 0.6)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
            style={{ backgroundColor: darkMode ? '#9ca3af' : '#6b7280' }}
          />
        </div>
      )}
      
      {lensLeft < viewportWidth - 30 && (
        <div 
          className="absolute top-1/2 -right-2 w-3 h-3 rounded-full transform -translate-y-1/2"
          style={{
            background: darkMode 
              ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: darkMode ? '1px solid #4b5563' : '1px solid #94a3b8',
            boxShadow: darkMode 
              ? '0 2px 8px rgba(0, 0, 0, 0.6)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-1 transform -translate-x-1/2 -translate-y-1/2 rounded-full" 
            style={{ backgroundColor: darkMode ? '#9ca3af' : '#6b7280' }}
          />
        </div>
      )}
    </div>
  );
}

interface LowResImageSliderProps {
  images: string[];
  title: string;
  description: string;
  darkMode: boolean;
  altPrefix: string;
}

export function LowResImageSlider({ images, title, description, darkMode, altPrefix }: LowResImageSliderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [hoveredImageRect, setHoveredImageRect] = useState<DOMRect | null>(null);
  const [isLensVisible, setIsLensVisible] = useState(false);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);

  // Duplicate images for infinite scroll
  const duplicatedImages = [...images, ...images, ...images];

  // Generate structured data for the gallery
  const galleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": title,
    "description": description,
    "url": `https://outbackhuntingnz.com/gallery/${altPrefix.toLowerCase().replace(/\s+/g, '-')}`,
    "image": images.slice(0, 10).map((src, index) => ({
      "@type": "ImageObject",
      "url": src.startsWith('http') ? src : `https://outbackhuntingnz.com${src}`,
      "name": `${altPrefix} ${index + 1}`,
      "description": `${altPrefix} hunting gallery image ${index + 1}`,
      "contentUrl": src.startsWith('http') ? src : `https://outbackhuntingnz.com${src}`,
      "thumbnailUrl": src.startsWith('http') ? src : `https://outbackhuntingnz.com${src}`,
      "width": 160,
      "height": 112
    })),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://outbackhuntingnz.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Outback Hunting New Zealand",
      "logo": {
        "@type": "ImageObject",
        "url": "https://outbackhuntingnz.com/assets/img/gareth/GarethLogoC.png"
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isLensVisible) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isLensVisible]);

  const handleImageHover = (isHovered: boolean, element: HTMLDivElement | null) => {
    setIsLensVisible(isHovered);
    setIsScrollingPaused(isHovered); // Pause scrolling on hover

    if (isHovered && element) {
      const img = element.querySelector("img");
      if (img) {
        setHoveredImage(img.src);
        setHoveredImageRect(element.getBoundingClientRect());
      }
    } else {
      setHoveredImage(null);
      setHoveredImageRect(null);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/30'} rounded-xl p-6 mb-8`} itemScope itemType="https://schema.org/ImageGallery">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryStructuredData)
        }}
      />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} itemProp="name">
          {title}
        </h2>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} itemProp="description">
          {description}
        </p>
      </div>

      {/* First tier - scrolling right */}
      <div className="relative mb-4 overflow-hidden">
        <div className={`flex animate-scroll-right ${isScrollingPaused ? 'paused' : ''}`}>
          {duplicatedImages.map((src, index) => (
            <ImageCard
              key={`tier1-${index}`}
              src={src}
              onHover={handleImageHover}
              alt={`${altPrefix} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Second tier - scrolling left */}
      <div className="relative overflow-hidden">
        <div className={`flex animate-scroll-left ${isScrollingPaused ? 'paused' : ''}`}>
          {duplicatedImages
            .slice()
            .reverse()
            .map((src, index) => (
              <ImageCard
                key={`tier2-${index}`}
                src={src}
                onHover={handleImageHover}
                alt={`${altPrefix} ${index + 1}`}
              />
            ))}
        </div>
      </div>

      {/* Magnifying Lens */}
      <MagnifyingLens
        isVisible={isLensVisible}
        position={mousePosition}
        imageSrc={hoveredImage || ""}
        imageRect={hoveredImageRect}
        darkMode={darkMode}
      />

      {/* Gradient overlays for infinite scroll effect */}
      <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${darkMode ? 'from-gray-800/30' : 'from-gray-100/30'} to-transparent pointer-events-none z-10`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${darkMode ? 'from-gray-800/30' : 'from-gray-100/30'} to-transparent pointer-events-none z-10`} />
      
      {/* Paused scrolling indicator */}
      {isScrollingPaused && (
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            darkMode 
              ? 'bg-amber-600/90 text-white border border-amber-500/50' 
              : 'bg-amber-100/90 text-amber-800 border border-amber-300/50'
          }`}>
            ⏸️ Paused for magnification
          </div>
        </div>
      )}
    </div>
  );
}

// Individual animal gallery components

// Generate image paths for each animal based on actual files
const getAnimalImages = (animalFolder: string, fileList: string[]) => {
  return fileList.map(fileName => 
    `/assets/img/gallimg/${animalFolder}/${fileName}`
  );
};

export function RedStagGallery({ darkMode }: { darkMode: boolean }) {
  // Red Stag images: 1-21 (all .png files)
  const redStagFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png',
    '21.png'
  ];
  const redStagImages = getAnimalImages('redstag', redStagFiles);
  
  return (
    <LowResImageSlider
      images={redStagImages}
      title="Red Stag Gallery"
      description="Hover over images to enhance and magnify • Infinite scrolling tiers"
      darkMode={darkMode}
      altPrefix="Red Stag"
    />
  );
}

export function ChamoisGallery({ darkMode }: { darkMode: boolean }) {
  // Chamois images: mixed .png and .jpg files (excluding 19.html)
  const chamoisFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '20.png',
    '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png', '29.png',
    '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.png', '36.png', '37.png'
  ];
  const chamoisImages = getAnimalImages('Chamois', chamoisFiles);
  
  return (
    <LowResImageSlider
      images={chamoisImages}
      title="Chamois Gallery"
      description="Mountain Chamois hunting adventures in scenic landscapes"
      darkMode={darkMode}
      altPrefix="Chamois"
    />
  );
}

export function TahrGallery({ darkMode }: { darkMode: boolean }) {
  // Tahr images: .png files (excluding 15.html and 67.html)
  const tahrFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '9.png',
    '11.png', '12.png', '13.png', '14.png', '16.png', '17.png', '18.png', '19.png',
    '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png',
    '28.png', '29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png',
    '36.png', '37.png', '38.png', '39.png', '40.png', '41.png', '42.png', '43.png',
    '44.png', '46.png', '47.png', '48.png', '49.png', '51.png', '52.png', '53.png',
    '54.png', '55.png', '56.png', '57.png', '58.png', '59.png', '60.png', '61.png',
    '62.png', '63.png', '64.png', '65.png', '66.png', '68.png', '69.png', '70.png',
    '71.png', '72.png', '73.png', '74.png'
  ];
  const tahrImages = getAnimalImages('Tahr', tahrFiles);
  
  return (
    <LowResImageSlider
      images={tahrImages}
      title="Tahr Gallery"
      description="Alpine Tahr hunting in New Zealand's mountain terrain"
      darkMode={darkMode}
      altPrefix="Tahr"
    />
  );
}

// Main component that renders all animal sliders (kept for backward compatibility)
interface AnimalGallerySliderProps {
  darkMode: boolean;
}

export function AnimalGallerySlider({ darkMode }: AnimalGallerySliderProps) {
  // Use the same file lists as the individual components
  const redStagFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png',
    '21.png'
  ];
  const chamoisFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '20.png',
    '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png', '28.png', '29.png',
    '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.png', '36.png', '37.png'
  ];
  const tahrFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '9.png',
    '11.png', '12.png', '13.png', '14.png', '16.png', '17.png', '18.png', '19.png',
    '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png',
    '28.png', '29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png',
    '36.png', '37.png', '38.png', '39.png', '40.png', '41.png', '42.png', '43.png',
    '44.png', '46.png', '47.png', '48.png', '49.png', '51.png', '52.png', '53.png',
    '54.png', '55.png', '56.png', '57.png', '58.png', '59.png', '60.png', '61.png',
    '62.png', '63.png', '64.png', '65.png', '66.png', '68.png', '69.png', '70.png',
    '71.png', '72.png', '73.png', '74.png'
  ];
  
  const redStagImages = getAnimalImages('redstag', redStagFiles);
  const chamoisImages = getAnimalImages('Chamois', chamoisFiles);
  const tahrImages = getAnimalImages('Tahr', tahrFiles);

  // Main gallery structured data
  const mainGalleryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "New Zealand Hunting Gallery Collection",
    "description": "Comprehensive gallery showcasing Red Stag, Chamois, and Tahr hunting experiences in New Zealand's wilderness areas",
    "url": "https://outbackhuntingnz.com/gallery",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": redStagFiles.length + chamoisFiles.length + tahrFiles.length,
      "itemListElement": [
        {
          "@type": "ImageGallery",
          "name": "Red Stag Hunting Gallery",
          "description": "Red Stag hunting gallery showcasing trophy stags and hunting experiences",
          "numberOfItems": redStagFiles.length
        },
        {
          "@type": "ImageGallery", 
          "name": "Chamois Hunting Gallery",
          "description": "Chamois hunting gallery featuring mountain hunting adventures",
          "numberOfItems": chamoisFiles.length
        },
        {
          "@type": "ImageGallery",
          "name": "Tahr Hunting Gallery", 
          "description": "Tahr hunting gallery displaying alpine hunting experiences",
          "numberOfItems": tahrFiles.length
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Outback Hunting New Zealand"
    }
  };

  return (
    <section className={`py-20 ${darkMode ? 'bg-[#0f172a]' : 'bg-white'}`} itemScope itemType="https://schema.org/CollectionPage">
      {/* Main Gallery Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainGalleryStructuredData)
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} itemProp="name">
            Gallery <span className="text-amber-500">Collection</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} itemProp="description">
            Low-resolution gallery showcasing our hunting experiences across New Zealand's wilderness areas
          </p>
        </div>

        {/* Red Stag Gallery */}
        <LowResImageSlider
          images={redStagImages}
          title="Red Stag Gallery"
          description="Hover over images to enhance and magnify • Infinite scrolling tiers"
          darkMode={darkMode}
          altPrefix="Red Stag"
        />

        {/* Chamois Gallery */}
        <LowResImageSlider
          images={chamoisImages}
          title="Chamois Gallery"
          description="Mountain Chamois hunting adventures in scenic landscapes"
          darkMode={darkMode}
          altPrefix="Chamois"
        />

        {/* Tahr Gallery */}
        <LowResImageSlider
          images={tahrImages}
          title="Tahr Gallery"
          description="Alpine Tahr hunting in New Zealand's mountain terrain"
          darkMode={darkMode}
          altPrefix="Tahr"
        />
      </div>
    </section>
  );
}
