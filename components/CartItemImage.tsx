'use client'

import { useDynamicImages } from '@/hooks/useDynamicImages'
import { ShoppingBag } from 'lucide-react'

interface CartItemImageProps {
  recordId: string
  productName: string
  fallbackImage?: string
  className?: string
}

export default function CartItemImage({ 
  recordId, 
  productName, 
  fallbackImage,
  className = "w-20 h-20 sm:w-24 sm:h-24"
}: CartItemImageProps) {
  const { images, isLoading } = useDynamicImages(recordId)
  
  const imageUrl = images.length > 0 ? images[0] : fallbackImage

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-200 rounded-lg flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className={`${className} bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <ShoppingBag size={32} />
        </div>
      )}
    </div>
  )
}

