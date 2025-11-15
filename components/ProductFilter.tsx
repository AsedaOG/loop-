'use client'

import { Filter } from 'lucide-react'

interface ProductFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2.5 text-gray-900 font-bold">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Filter size={20} className="text-primary-600" strokeWidth={2.5} />
          </div>
          <span>Filter by Type</span>
        </div>
        
        <div className="flex-1 sm:max-w-xs">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer transition-all hover:border-primary-300"
          >
            <option value="all">All Products</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

