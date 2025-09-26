import { useState, useEffect, useCallback, useRef } from 'react';

interface CriticalImage {
  src: string;
  id: string;
}

interface UseCriticalImageLoaderProps {
  criticalImages: CriticalImage[];
  onAllLoaded: () => void;
}

export const useCriticalImageLoader = ({ criticalImages, onAllLoaded }: UseCriticalImageLoaderProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const onAllLoadedRef = useRef(onAllLoaded);
  
  // Update ref when callback changes
  useEffect(() => {
    onAllLoadedRef.current = onAllLoaded;
  }, [onAllLoaded]);

  // Reset state when criticalImages change
  useEffect(() => {
    setLoadedImages(new Set());
    setIsLoading(true);
    setLoadingProgress(0);
  }, [criticalImages]);

  // Load images
  useEffect(() => {
    if (criticalImages.length === 0) {
      setIsLoading(false);
      onAllLoadedRef.current();
      return;
    }

    let cancelled = false;
    const loadedIds = new Set<string>();

    const loadImage = (src: string, id: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (!cancelled) {
            loadedIds.add(id);
            setLoadedImages(new Set(loadedIds));
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to load critical image: ${src}`);
          if (!cancelled) {
            loadedIds.add(id);
            setLoadedImages(new Set(loadedIds));
          }
          resolve();
        };
        
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      try {
        await Promise.all(
          criticalImages.map(({ src, id }) => loadImage(src, id))
        );
      } catch (error) {
        console.error('Error loading critical images:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          onAllLoadedRef.current();
        }
      }
    };

    loadAllImages();

    return () => {
      cancelled = true;
    };
  }, [criticalImages]);

  // Update progress as images load
  useEffect(() => {
    if (criticalImages.length > 0) {
      const progress = (loadedImages.size / criticalImages.length) * 100;
      setLoadingProgress(Math.round(progress));
    }
  }, [loadedImages.size, criticalImages.length]);

  return {
    isLoading,
    loadingProgress,
    loadedImages: Array.from(loadedImages)
  };
};
