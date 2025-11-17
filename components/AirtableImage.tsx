'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface AirtableImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  useProxy?: boolean
}

export default function AirtableImage({ 
  src, 
  alt, 
  className = '', 
  width,
  height,
  priority = false,
  useProxy = true 
}: AirtableImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (useProxy && src && src.includes('airtable')) {
      // Use the proxy route for Airtable images
      setImageSrc(`/api/image-proxy?url=${encodeURIComponent(src)}`)
    } else {
      setImageSrc(src)
    }
  }, [src, useProxy])

  if (!src) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <svg 
          className="text-gray-400" 
          width="64" 
          height="64" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    )
  }

  // If width and height are provided, use Next.js Image component
  if (width && height) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
      />
    )
  }

  // Otherwise use regular img tag
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={() => setIsLoading(false)}
    />
  )
}

