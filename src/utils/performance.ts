// Performance optimization utilities

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  const promises = sources.map(src => preloadImage(src));
  await Promise.all(promises);
};

export const createImageOptimizationConfig = () => {
  return {
    quality: 75,
    format: 'webp',
    fallbackFormat: 'jpeg',
    sizes: {
      mobile: '640w',
      tablet: '768w',
      desktop: '1024w',
      large: '1920w'
    }
  };
};

export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  quality: number = 75
): string => {
  // For production, you'd integrate with an image optimization service
  // like Vercel's Image Optimization, Cloudinary, or similar
  if (process.env.NODE_ENV === 'production') {
    // Example for Vercel Image Optimization
    // return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  }
  
  return src;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
