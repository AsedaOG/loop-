'use client'

import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import CartItemImage from '@/components/CartItemImage'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalShipping, hasEstimateOnArrival } = useCart()
  
  const subtotal = getTotalPrice()
  const shippingCost = getTotalShipping()
  const showEstimateMessage = hasEstimateOnArrival()
  const grandTotal = subtotal + shippingCost

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link
          href="/"
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              {/* Mobile & Tablet Layout */}
              <div className="flex gap-4">
                {/* Product Image - Dynamically loaded */}
                <CartItemImage
                  recordId={item.id}
                  productName={item.name}
                  fallbackImage={item.image}
                  className="w-20 h-20 sm:w-24 sm:h-24"
                />
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">GH₵ {item.price.toFixed(2)} each</p>
                  
                  {/* Quantity & Price Row for Mobile */}
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold text-base sm:text-lg w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1.5 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-base sm:text-lg text-gray-800 whitespace-nowrap">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>GH₵ {subtotal.toFixed(2)}</span>
              </div>
              
              {shippingCost > 0 ? (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>GH₵ {shippingCost.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              )}
              
              {showEstimateMessage && (
                <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  ⚠️ Some items: Shipping estimate on arrival
                </div>
              )}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>GH₵ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              href="/"
              className="block w-full text-center mt-3 text-primary-600 hover:text-primary-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

