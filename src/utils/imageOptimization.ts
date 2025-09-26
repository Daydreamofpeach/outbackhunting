// Image optimization utilities for better performance

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  blur?: boolean;
}

export const getOptimizedImageUrl = (
  src: string, 
  options: ImageOptimizationOptions = {}
): string => {
  // For external images, return as-is
  if (src.startsWith('http')) {
    return src;
  }

  const {
    quality = 80,
    format = 'webp',
    width,
    height,
    blur = false
  } = options;

  // In a real production environment, you'd use a service like:
  // - Vercel Image Optimization
  // - Cloudinary
  // - ImageKit
  // - Or your own image optimization service

  // For now, return the original src
  // In production, this would generate optimized URLs like:
  // `/api/image?src=${encodeURIComponent(src)}&w=${width}&h=${height}&q=${quality}&f=${format}`
  
  return src;
};

export const generateResponsiveImageSrcSet = (
  src: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  if (src.startsWith('http')) {
    return src;
  }

  return sizes
    .map(size => `${getOptimizedImageUrl(src, { width: size })} ${size}w`)
    .join(', ');
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (srcs: string[]): Promise<void> => {
  try {
    await Promise.all(srcs.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Critical image dimensions for LCP optimization
export const CRITICAL_IMAGE_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  cloud: { width: 1920, height: 1080 },
  gallery: { width: 800, height: 600 },
  thumbnail: { width: 400, height: 300 }
};

// Generate optimized image URLs for different use cases
export const getOptimizedImageForUseCase = (
  src: string,
  useCase: keyof typeof CRITICAL_IMAGE_DIMENSIONS
): string => {
  const dimensions = CRITICAL_IMAGE_DIMENSIONS[useCase];
  return getOptimizedImageUrl(src, {
    ...dimensions,
    quality: useCase === 'hero' ? 90 : 80,
    format: 'webp'
  });
};
