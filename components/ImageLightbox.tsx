'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  productName: string
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  productName
}: ImageLightboxProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-3 bg-black/50 rounded-full backdrop-blur-sm z-10 hover:scale-110 transition-transform"
        aria-label="Close"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      {/* Image Container - Large Size */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] min-w-[50vw] min-h-[50vh] w-auto h-auto object-contain"
        />

        {/* Navigation Arrows (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} strokeWidth={2.5} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={36} strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-semibold z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Instruction Text */}
      <div className="absolute bottom-6 right-6 text-white/60 text-sm hidden sm:block">
        Press <kbd className="px-2 py-1 bg-white/20 rounded font-mono">ESC</kbd> to close
      </div>
    </div>
  )
}

