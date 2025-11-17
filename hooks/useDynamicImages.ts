'use client'

import { useState, useEffect } from 'react'

interface ImageData {
  images: string[]
  primaryImage: string
  totalImages: number
}

export function useDynamicImages(recordId: string) {
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!recordId) {
      setIsLoading(false)
      return
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/images/${recordId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }

        const data: ImageData = await response.json()
        setImages(data.images || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching dynamic images:', err)
        setError('Failed to load images')
        setImages([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [recordId])

  return { images, isLoading, error }
}

