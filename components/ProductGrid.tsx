'use client'

import { Product } from '@/lib/airtable'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import { useState, useMemo } from 'react'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = products
      .map((p) => p.category)
      .filter((cat): cat is string => Boolean(cat))
    return Array.from(new Set(cats)).sort()
  }, [products])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products
    }
    return products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available at the moment.</p>
        <p className="text-gray-400 text-sm mt-2">Please check back later!</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-10">
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-xl mb-2">No products found in this category</p>
          <p className="text-gray-400 text-sm mb-6">Try browsing our full collection</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-lg"
          >
            View All Products
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

