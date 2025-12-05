'use client'

import Link from 'next/link'
import { ShoppingCart, User, Phone, Package, MapPin } from 'lucide-react'
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
          
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Shop Categories */}
            <div className="flex items-center space-x-1 sm:space-x-3 border-r border-gray-200 pr-3 sm:pr-5">
              <Link
                href="/available-in-ghana"
                className="flex items-center space-x-1.5 text-gray-700 hover:text-primary-600 transition px-2 py-1.5 rounded-lg hover:bg-primary-50"
              >
                <MapPin size={20} />
                <span className="hidden md:inline text-sm font-medium">In Ghana</span>
              </Link>
              
              <Link
                href="/bundles"
                className="flex items-center space-x-1.5 text-gray-700 hover:text-amber-600 transition px-2 py-1.5 rounded-lg hover:bg-amber-50"
              >
                <Package size={20} />
                <span className="hidden md:inline text-sm font-medium">Bundles</span>
              </Link>
            </div>
            
            {/* User Actions */}
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
            >
              <User size={22} />
              <span className="hidden lg:inline">Profile</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition"
            >
              <Phone size={22} />
              <span className="hidden lg:inline">Contact</span>
            </Link>
            
            <Link
              href="/cart"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition relative"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

