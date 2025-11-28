import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LOOP LOGISTICS - Premium Products',
  description: 'Browse and order premium products from LOOP LOGISTICS',
  icons: {
    icon: '/loop-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* About Section */}
                <div>
                  <h3 className="text-lg font-bold mb-4">LOOP LOGISTICS</h3>
                  <p className="text-gray-400 text-sm">
                    Your trusted partner for premium products and reliable delivery services across Ghana.
                  </p>
                </div>
                
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a href="/" className="hover:text-white transition">Home</a>
                    </li>
                    <li>
                      <a href="/about" className="hover:text-white transition">About Us</a>
                    </li>
                    <li>
                      <a href="/available-in-ghana" className="hover:text-white transition">Available In Ghana</a>
                    </li>
                    <li>
                      <a href="/reviews" className="hover:text-white transition">Customer Reviews</a>
                    </li>
                    <li>
                      <a href="/profile" className="hover:text-white transition">Create Profile</a>
                    </li>
                    <li>
                      <a href="/contact" className="hover:text-white transition">Contact Us</a>
                    </li>
                    <li>
                      <a href="/cart" className="hover:text-white transition">Shopping Cart</a>
                    </li>
                  </ul>
                </div>
                
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a href="mailto:importscoop@gmail.com" className="hover:text-white transition">
                        importscoop@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:0267608944" className="hover:text-white transition">
                        0267608944
                      </a>
                    </li>
                    <li className="text-gray-400">Ghana</li>
                  </ul>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-gray-400 text-sm">&copy; 2025 LOOP LOGISTICS. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}

