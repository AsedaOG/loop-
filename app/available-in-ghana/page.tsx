'use client'

import { useEffect, useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/lib/airtable'
import { Loader2 } from 'lucide-react'

export default function AvailableInGhanaPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Filter products to show only "Available In Ghana" category
        const filteredProducts = data.products.filter(
          (product: Product) => product.category === 'Available In Ghana'
        )
        
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            Available In Ghana 🇬🇭
          </h1>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            Products currently in stock and ready for immediate delivery across Ghana
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Showing <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''} available in Ghana
              </p>
            </div>
            <ProductGrid products={products} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              No products are currently available in Ghana.
            </p>
            <a
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Browse All Products
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

