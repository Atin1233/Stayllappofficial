import React from "react";
import Logo from "./Logo";

const Hero: React.FC = () => {
  // Smooth scroll to signup
  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("signup-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stayll-purple via-stayll-blue to-stayll-pink pt-32 pb-24">
      {/* Font Test - Remove this after confirming fonts work */}
      <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-md p-4 rounded-lg text-xs">
        <div className="font-display font-bold text-stayll-dark">Poppins Font Test</div>
        <div className="font-sans text-stayll-dark">Inter Font Test</div>
        <div className="font-mono text-stayll-dark">JetBrains Mono Test</div>
      </div>

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
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full text-sm mb-8 border border-white/20">
            <span className="w-2 h-2 bg-stayll-green-light rounded-full mr-3 animate-pulse"></span>
            AI-Powered Rental Management Platform
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-stayll-green-light via-stayll-blue-light to-stayll-pink-light bg-clip-text text-transparent">
              Rental Business
            </span>
            <br />
            with AI Automation
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            Stayll saves landlords <span className="font-semibold text-white">10+ hours every week</span> by automating 
            listings, tenant screening, and communication. 
            <span className="block mt-2 text-lg text-white/70">No complex setup. Just real results.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleCTAClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-stayll-green to-stayll-green-dark text-white font-semibold text-lg rounded-xl shadow-glow-green hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-stayll-green-dark to-stayll-blue rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
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
              No credit card required
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Setup in 5 minutes
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24/7 AI support
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-white/10 px-6 py-4 border-b border-white/20 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white/90 font-medium">Stayll Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-stayll-green-light rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/70">AI Active</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-gradient-to-br from-stayll-blue/20 to-stayll-blue/10 p-6 rounded-2xl border border-stayll-blue/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/90 font-semibold">Active Listings</h3>
                    <div className="w-8 h-8 bg-stayll-blue/30 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-stayll-blue-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '16px', maxHeight: '16px' }}>
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-sm text-stayll-green-light font-medium">+3 this week</div>
                </div>

                <div className="bg-gradient-to-br from-stayll-green/20 to-stayll-green/10 p-6 rounded-2xl border border-stayll-green/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/90 font-semibold">Inquiries</h3>
                    <div className="w-8 h-8 bg-stayll-green/30 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-stayll-green-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '16px', maxHeight: '16px' }}>
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">47</div>
                  <div className="text-sm text-stayll-green-light font-medium">+12 today</div>
                </div>

                <div className="bg-gradient-to-br from-stayll-orange/20 to-stayll-orange/10 p-6 rounded-2xl border border-stayll-orange/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/90 font-semibold">Time Saved</h3>
                    <div className="w-8 h-8 bg-stayll-orange/30 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-stayll-orange-light flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '16px', maxHeight: '16px' }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">8.5h</div>
                  <div className="text-sm text-stayll-green-light font-medium">This week</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Recent AI Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-stayll-green-light rounded-full"></div>
                    <span className="text-sm text-white/80">AI responded to 3 tenant inquiries</span>
                    <span className="text-xs text-white/60">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-stayll-blue-light rounded-full"></div>
                    <span className="text-sm text-white/80">New listing created for 123 Main St</span>
                    <span className="text-xs text-white/60">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-stayll-orange-light rounded-full"></div>
                    <span className="text-sm text-white/80">Tenant screening completed for John D.</span>
                    <span className="text-xs text-white/60">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-stayll-blue/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-stayll-pink/20 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 