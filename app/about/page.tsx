'use client'

import Link from 'next/link'
import { Package, Shield, Plane, Ship, MessageCircle, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
            About Loop Logistics
          </h1>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto">
            Your trusted partner for quality products from China to Ghana
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {/* What We Do Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At <strong className="text-primary-600">Loop Logistics</strong>, we specialize in sourcing high-quality products from China and delivering them directly to our clients in Ghana. Our platform offers a wide range of products available for <strong>pre-order</strong>, giving you access to premium goods at competitive prices.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're looking for products from our curated collection or have something specific in mind, we're here to help. We also accept <strong>personalized requests</strong> – simply contact us with your requirements, and we'll source exactly what you need.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Quality Guarantee */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quality Guarantee
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We inspect and verify the quality of your goods before they leave China, ensuring that what you ordered is exactly what you receive. Your satisfaction is our priority.
              </p>
            </div>

            {/* Available in Ghana */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MapPin className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Available in Ghana 🇬🇭
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Need something urgently? Check out our <strong>"Available in Ghana"</strong> section featuring products already in stock locally for immediate purchase and delivery.
              </p>
              <Link 
                href="/available-in-ghana"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition"
              >
                Browse Available Products →
              </Link>
            </div>

            {/* Personalized Requests */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageCircle className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Custom Orders
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Can't find what you're looking for? We accept personalized requests for specific products. Contact us with your requirements, and we'll source it for you.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition"
              >
                Contact Us →
              </Link>
            </div>

            {/* Flexible Shipping */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Package className="text-primary-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flexible Shipping Options
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Choose the shipping method that works best for you – fast air shipping for urgent orders or economical sea shipping for larger quantities.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Shipping Options
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              For products sourced from China, we offer two shipping methods to suit your needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Air Shipping */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Plane className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ✈️ Air Shipping
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Fast and reliable delivery by air freight
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Faster delivery time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Ideal for urgent orders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Higher shipping cost</span>
                </li>
              </ul>
            </div>

            {/* Sea Shipping */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg p-8 border-2 border-teal-200">
              <div className="bg-teal-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Ship className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🚢 Sea Shipping
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Cost-effective shipping by sea freight
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>More economical option</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Perfect for bulk orders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  <span>Longer delivery time</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 rounded-2xl shadow-2xl p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Explore our collection or get in touch for personalized requests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

