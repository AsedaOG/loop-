'use client'

import { Product } from '@/lib/airtable'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useDynamicImages } from '@/hooks/useDynamicImages'
import ImageLightbox from './ImageLightbox'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)
  
  // Fetch fresh images from Airtable dynamically
  const { images: dynamicImages, isLoading: imagesLoading } = useDynamicImages(product.id)
  
  const isInCart = cart.some((item) => item.id === product.id)
  // Use dynamic images if available, fallback to cached images
  const images = dynamicImages.length > 0 ? dynamicImages : (product.images || (product.image ? [product.image] : []))
  const hasMultipleImages = images.length > 1

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = () => {
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  const handleImageClick = () => {
    if (images.length > 0) {
      setShowLightbox(true)
    }
  }

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleLightboxPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {imagesLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
              onClick={handleImageClick}
            />
            
            {/* Product ID Badge - Prevent lightbox opening */}
            {product.productId && (
              <div 
                className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs font-bold text-gray-700">#{product.productId}</span>
              </div>
            )}

            {/* Category Badge - Prevent lightbox opening */}
            {product.category && (
              <div 
                className="absolute top-3 left-3 bg-primary-600/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-xs font-bold text-white uppercase tracking-wider">{product.category}</span>
              </div>
            )}
            
            {/* Image Navigation - Prevent lightbox opening when clicking arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage(e)
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage(e)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
                
                {/* Image Indicators - Prevent lightbox opening */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(idx)
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        idx === currentImageIndex
                          ? 'bg-white w-8 h-2'
                          : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart size={64} className="text-gray-300" strokeWidth={1.5} />
          </div>
        )}
        
        {!product.inStock && (
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] leading-tight">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              GH₵ {product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">Cedis</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              group/btn flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs
              transition-all duration-300 shadow-sm hover:shadow-md
              ${product.inStock
                ? showAdded 
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {showAdded ? (
              <>
                <Check size={16} strokeWidth={2.5} className="animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} strokeWidth={2.5} className="group-hover/btn:animate-pulse" />
                <span className="hidden sm:inline">{isInCart ? 'Add More' : 'Add to Cart'}</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>

    {/* Image Lightbox */}
    {showLightbox && (
      <ImageLightbox
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => setShowLightbox(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
        productName={product.name}
      />
    )}
    </>
  )
}

