import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, generateResponsiveImageSrcSet } from '../utils/imageOptimization';
import ImageModal from './ImageModal';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  clickToView?: boolean; // Enable click-to-view full size
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  priority = false,
  sizes = '100vw',
  loading = 'lazy',
  quality = 80,
  width,
  height,
  onLoad,
  onError,
  clickToView = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '100px', // Load images 100px before they come into view
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  const handleImageClick = () => {
    if (clickToView && isLoaded) {
      setIsModalOpen(true);
    }
  };

  // Get the full-size image URL for the modal (remove any optimization query params)
  const getFullSizeImageSrc = (imageSrc: string): string => {
    // For external URLs, return as-is
    if (imageSrc.startsWith('http')) {
      return imageSrc;
    }
    // For local images, remove any query parameters that might have been added for optimization
    const url = new URL(imageSrc, window.location.origin);
    // Remove optimization params (w, h, q, f, blur)
    const paramsToRemove = ['w', 'h', 'q', 'f', 'blur'];
    paramsToRemove.forEach(param => url.searchParams.delete(param));
    // Return the pathname (relative path) without query params for local images
    return url.pathname;
  };
  
  const modalImageSrc = getFullSizeImageSrc(src);

  return (
    <>
      <div 
        ref={imgRef}
        className={`relative overflow-hidden ${className} ${clickToView ? 'cursor-pointer' : ''}`}
        style={style}
        onClick={handleImageClick}
        role={clickToView ? 'button' : undefined}
        tabIndex={clickToView ? 0 : undefined}
        onKeyDown={(e) => {
          if (clickToView && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleImageClick();
          }
        }}
        aria-label={clickToView ? `Click to view full size ${alt}` : undefined}
      >
        {/* Placeholder with aspect ratio */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image unavailable</span>
          </div>
        )}

        {/* Actual image */}
        {isInView && !hasError && (
          <picture>
            {/* WebP source for better compression */}
            <source
              srcSet={generateResponsiveImageSrcSet(
                getOptimizedImageUrl(src, { 
                  quality, 
                  width, 
                  height, 
                  format: 'webp' 
                })
              )}
              sizes={sizes}
              type="image/webp"
            />
            {/* Fallback for browsers that don't support WebP */}
            <img
              src={getOptimizedImageUrl(src, { quality, width, height })}
              alt={alt}
              className={`transition-opacity duration-200 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${clickToView ? 'hover:opacity-90' : ''} ${className}`}
              style={{
                ...style,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              loading={priority ? 'eager' : loading}
              decoding="async"
              onLoad={handleLoad}
              onError={handleError}
              sizes={sizes}
              width={width}
              height={height}
            />
          </picture>
        )}
      </div>

      {/* Image Modal */}
      {clickToView && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          src={modalImageSrc}
          alt={alt}
        />
      )}
    </>
  );
};

export default OptimizedImage;
