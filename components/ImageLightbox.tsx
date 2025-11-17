'use client'

import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  productName?: string
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  productName
}: ImageLightboxProps) {
  const hasMultipleImages = images.length > 1

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        onPrev()
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNext, onPrev, hasMultipleImages])

  // Handle click on backdrop to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all backdrop-blur-sm hover:scale-110"
        aria-label="Close"
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      {/* Product Name (Optional) */}
      {productName && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[110] bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full">
          <p className="text-sm sm:text-base font-semibold">{productName}</p>
        </div>
      )}

      {/* Navigation Arrows */}
      {hasMultipleImages && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 sm:p-4 rounded-full transition-all backdrop-blur-sm hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={32} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Main Image */}
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`${productName || 'Product'} - Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Image Indicators */}
      {hasMultipleImages && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] flex gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                const diff = idx - currentIndex
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext()
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) onPrev()
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'bg-white w-10 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-3 h-3'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[110] bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

