'use client'

import { useEffect, useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/lib/airtable'
import { Search, Loader2, X, Package, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function BundlesPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Filter products to show only "BUNDLES" product type
        const bundleProducts = data.products.filter(
          (product: Product) => product.category === 'BUNDLES'
        )
        
        // Randomize product order
        const shuffledProducts = shuffleArray(bundleProducts)
        setAllProducts(shuffledProducts)
        setFilteredProducts(shuffledProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(allProducts)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery, allProducts])

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to All Products</span>
          </Link>
          <div className="flex items-center justify-center mb-4">
            <Package size={48} className="mr-3" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              Bundles
            </h1>
          </div>
          <p className="text-xl text-amber-50 max-w-2xl mx-auto">
            Save more with our specially curated product bundles and combo deals
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bundles by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-full focus:border-amber-500 focus:outline-none text-gray-900 placeholder-gray-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-amber-600" size={48} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {searchQuery ? (
                  <>
                    Found <strong>{filteredProducts.length}</strong> bundle{filteredProducts.length !== 1 ? 's' : ''}
                  </>
                ) : (
                  <>
                    Showing <strong>{filteredProducts.length}</strong> bundle{filteredProducts.length !== 1 ? 's' : ''} available
                  </>
                )}
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </>
        ) : (
          <div className="text-center py-20">
            {searchQuery ? (
              <>
                <p className="text-xl text-gray-600 mb-4">
                  No bundles found matching &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={clearSearch}
                  className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-600 mb-4">
                  No bundles are currently available.
                </p>
                <a
                  href="/"
                  className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Browse All Products
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

