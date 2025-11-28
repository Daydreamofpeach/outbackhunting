import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click anywhere to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-2 sm:p-4 cursor-pointer"
            onClick={onClose}
          >
            {/* Close button - larger on mobile for better touch targets */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] text-white hover:text-gray-300 transition-colors p-3 sm:p-2 rounded-full hover:bg-white/20 bg-black/50 backdrop-blur-sm touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close image"
            >
              <X size={24} strokeWidth={3} className="sm:w-8 sm:h-8" />
            </button>

            {/* Image container - clicking image also closes */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
              style={{
                paddingTop: '60px', // Space for close button
                paddingBottom: '50px', // Space for hint text
                paddingLeft: '8px',
                paddingRight: '8px'
              }}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
                style={{
                  maxHeight: 'calc(100vh - 120px)', // Account for button and hint
                  maxWidth: 'calc(100vw - 16px)',
                  width: 'auto',
                  height: 'auto'
                }}
                loading="eager"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              />
            </motion.div>

            {/* Mobile-friendly tap hint - only show on mobile */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-xs sm:text-sm pointer-events-none bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm sm:hidden">
              Tap to close
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm pointer-events-none hidden sm:block">
              Click anywhere to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;

