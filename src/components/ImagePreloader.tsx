import React, { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images, priority = false }) => {
  useEffect(() => {
    if (!priority) return;

    const preloadImages = () => {
      images.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    preloadImages();
  }, [images, priority]);

  return null;
};

export default ImagePreloader;
