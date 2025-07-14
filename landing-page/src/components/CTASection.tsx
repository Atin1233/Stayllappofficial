import React from "react";

const CTASection: React.FC = () => {
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("signup-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="signup-section" className="py-24 bg-gradient-to-br from-stayll-purple via-stayll-blue to-stayll-pink relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-stayll-blue/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-stayll-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-stayll-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" className="absolute inset-0" style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <defs>
              <pattern id="grid-cta" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cta)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-sm mb-8 border border-white/20">
            <span className="w-2 h-2 bg-stayll-green-light rounded-full mr-3 animate-pulse"></span>
            Limited Time Offer
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-stayll-green-light via-stayll-blue-light to-stayll-pink-light bg-clip-text text-transparent">
              Rental Business?
            </span>
          </h2>

          {/* Subheadline */}
          <p className="font-sans text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of landlords who are saving time, increasing income, and 
            providing better tenant experiences with AI-powered automation.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center text-white/90">
              <div className="w-12 h-12 bg-stayll-green/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-sans font-medium">No credit card required</span>
            </div>
            <div className="flex items-center justify-center text-white/90">
              <div className="w-12 h-12 bg-stayll-blue/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-stayll-blue-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-sans font-medium">Setup in 5 minutes</span>
            </div>
            <div className="flex items-center justify-center text-white/90">
              <div className="w-12 h-12 bg-stayll-purple/30 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-stayll-purple-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-sans font-medium">14-day free trial</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleCTAClick}
              className="group relative px-10 py-5 bg-gradient-to-r from-stayll-green to-stayll-green-dark text-white font-semibold text-xl rounded-xl shadow-glow-green hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-stayll-green-dark to-stayll-blue rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="flex items-center px-10 py-5 border-2 border-white/30 text-white font-semibold text-xl rounded-xl hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Full access to all features
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24/7 AI support included
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '32px', maxHeight: '32px' }}>
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">AI Listings</h3>
            <p className="font-sans text-white/70 text-sm">Professional listings in seconds</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stayll-blue-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '32px', maxHeight: '32px' }}>
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">Smart Chat</h3>
            <p className="font-sans text-white/70 text-sm">24/7 tenant communication</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stayll-purple-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '32px', maxHeight: '32px' }}>
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">Auto Screening</h3>
            <p className="font-sans text-white/70 text-sm">5-minute background checks</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-stayll-pink-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '32px', maxHeight: '32px' }}>
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="font-sans text-white/70 text-sm">Data-driven insights</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 