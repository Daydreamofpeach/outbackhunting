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

  // For gallery images, we can optimize them locally
  if (src.includes('/gallimg/')) {
    // Add cache-busting and optimization hints
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality !== 80) params.set('q', quality.toString());
    if (format !== 'webp') params.set('f', format);
    if (blur) params.set('blur', '1');
    
    const paramString = params.toString();
    return paramString ? `${src}?${paramString}` : src;
  }

  // For other images, return as-is for now
  // In production, you could implement:
  // - Sharp for server-side optimization
  // - Cloudinary/ImageKit integration
  // - Custom image optimization API
  
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
