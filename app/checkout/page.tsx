'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [checkoutNumber, setCheckoutNumber] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    customerId: '',
    comments: '',
  })

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
              <div key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">
                  GH₵ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              <span>GH₵ {getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

