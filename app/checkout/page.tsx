'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, CheckCircle, Info, Truck } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, getTotalPrice, getTotalShipping, hasEstimateOnArrival, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [checkoutNumber, setCheckoutNumber] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    customerId: '',
    comments: '',
  })
  
  const subtotal = getTotalPrice()
  const shippingCost = getTotalShipping()
  const showEstimateMessage = hasEstimateOnArrival()
  const grandTotal = subtotal + shippingCost
  
  // Get list of items with estimate-on-arrival shipping
  const estimateItems = cart.filter(item => 
    item.includeShip?.toLowerCase().includes('estimate')
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: formData.customerId,
          comments: formData.comments,
          products: cart.map((item) => ({
            productId: item.id, // Airtable record ID for linked record
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: getTotalPrice(),
          totalShipping: getTotalShipping(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setCheckoutNumber(data.checkoutNumber)
        clearCart()
        setTimeout(() => {
          router.push('/')
        }, 5000)
      } else {
        alert(data.error || 'Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0 && !success) {
    router.push('/cart')
    return null
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
        {checkoutNumber && (
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 max-w-md mx-auto mb-6">
            <p className="text-gray-700 mb-2">Your Checkout Number:</p>
            <p className="text-4xl font-bold text-primary-600">#{checkoutNumber}</p>
            <p className="text-sm text-gray-600 mt-2">Please save this number for your records</p>
          </div>
        )}
        <p className="text-gray-600 mb-8">
          Thank you for your order. Your order has been submitted.
        </p>
        <p className="text-gray-500">Redirecting to home page...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Checkout Information</h2>
          
          {/* Profile Notice */}
          <div className="mb-6 bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <Info className="text-primary-600 mr-3 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Need a Customer ID?</strong> You must create a profile first before checking out.
                </p>
                <Link 
                  href="/profile"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition"
                >
                  Create Profile
                </Link>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Customer ID *
              </label>
              <input
                type="text"
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your customer ID"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description / Comments
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add any special instructions or comments (optional)"
                rows={4}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-gray-700">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    GH₵ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                {/* Shipping indicator */}
                {item.includeShip?.toLowerCase().includes('estimate') ? (
                  <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                    <Truck size={12} />
                    Shipping estimate on arrival
                  </div>
                ) : item.shipping && item.shipping > 0 ? (
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                    <Truck size={12} />
                    Shipping: GH₵ {(item.shipping * item.quantity).toFixed(2)}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">GH₵ {subtotal.toFixed(2)}</span>
            </div>
            
            {shippingCost > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold">GH₵ {shippingCost.toFixed(2)}</span>
              </div>
            )}
            
            {showEstimateMessage && (
              <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Truck size={14} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Shipping estimate on arrival:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {estimateItems.map((item) => (
                        <li key={item.id} className="text-xs">{item.name} x {item.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>GH₵ {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

