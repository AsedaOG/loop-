export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold tracking-wider">✨ Premium Quality Products</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Welcome to
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-100 to-white">
              LOOP LOGISTICS
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl mb-10 text-primary-50 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for premium products delivered with excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#products"
              className="group px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              Shop Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a
              href="/about"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              Learn More
            </a>
            
            <a
              href="/available-in-ghana"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              Available In Ghana 🇬🇭
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

