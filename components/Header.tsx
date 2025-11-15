'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import LoopLogo from './LoopLogo'

export default function Header() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <LoopLogo className="h-10 w-auto" iconOnly={true} color="#4a4a4a" />
            <span className="ml-3 text-xl font-semibold text-gray-800">LOOP LOGISTICS</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
            >
              <User size={24} />
              <span className="hidden sm:inline">Create Profile</span>
            </Link>
            
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition relative"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

