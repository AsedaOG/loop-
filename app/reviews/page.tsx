'use client'

import { useEffect, useState } from 'react'
import { Review } from '@/lib/airtable'
import { Loader2, Star, Quote } from 'lucide-react'
import Image from 'next/image'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        setReviews(data.reviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="text-yellow-300 fill-yellow-300 mr-2" size={32} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              Customer Reviews
            </h1>
            <Star className="text-yellow-300 fill-yellow-300 ml-2" size={32} />
          </div>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            See what our customers are saying about their purchases
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : reviews.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Showing <strong>{reviews.length}</strong> customer review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Review Image */}
                  {review.reviewImage && (
                    <div 
                      className="relative h-64 bg-gray-100 cursor-pointer group overflow-hidden"
                      onClick={() => openImageModal(review.reviewImage!)}
                    >
                      <Image
                        src={`/api/image-proxy?recordId=${review.id}&tableName=${encodeURIComponent('Reviews')}&fieldName=${encodeURIComponent('Review Image')}`}
                        alt="Customer review"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view full size
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Review Comments */}
                  <div className="p-6">
                    <div className="flex items-start mb-3">
                      <Quote className="text-primary-300 mr-2 flex-shrink-0" size={24} />
                      <div className="flex-1">
                        <p className="text-gray-700 italic leading-relaxed">
                          {review.comments}
                        </p>
                      </div>
                    </div>
                    
                    {/* Star Rating Display */}
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={18}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Star className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-xl text-gray-600 mb-4">
              No reviews available yet.
            </p>
            <a
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Browse Products
            </a>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition z-10"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Review full size"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

