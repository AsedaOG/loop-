'use client'

import { useEffect, useState } from 'react'
import ProductGrid from '@/components/ProductGrid'
import Hero from '@/components/Hero'
import { Product } from '@/lib/airtable'
import { Search, Loader2, X } from 'lucide-react'

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Filter out "Available In Ghana" and "BUNDLES" products from main page
        // These have their own dedicated pages
        const products = data.products.filter(
          (product: Product) => 
            product.category !== 'Available In Ghana' && 
            product.category !== 'BUNDLES'
        )
        
        // Randomize product order
        const shuffledProducts = shuffleArray(products)
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
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <Hero />
      
      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Explore Our Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Discover premium products carefully curated just for you
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-gray-900 placeholder-gray-400 shadow-sm"
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

          {/* Results Count */}
          {searchQuery && (
            <p className="text-gray-600 mt-4">
              Found <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={48} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              No products found matching "{searchQuery}"
            </p>
            <button
              onClick={clearSearch}
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

