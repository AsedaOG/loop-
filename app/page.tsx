import ProductGrid from '@/components/ProductGrid'
import Hero from '@/components/Hero'
import { getProducts } from '@/lib/airtable'

export default async function Home() {
  const allProducts = await getProducts()
  
  // Filter out "Available In Ghana" products from main page
  const products = allProducts.filter(
    (product) => product.category !== 'Available In Ghana'
  )
  
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <Hero />
      
      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Explore Our Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover premium products carefully curated just for you
          </p>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

