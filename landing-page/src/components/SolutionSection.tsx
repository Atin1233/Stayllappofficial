import React from "react";

const SolutionSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-stayll-green/5 via-white to-stayll-blue/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-stayll-green/10 text-stayll-green font-semibold rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-stayll-green rounded-full mr-2 animate-pulse"></span>
            The Solution
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stayll-dark mb-6">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-stayll-green to-stayll-blue bg-clip-text text-transparent">
              Rental Management
            </span>
          </h2>
          <p className="font-sans text-xl text-stayll-gray-600 max-w-3xl mx-auto">
            Stayll automates every aspect of rental management, from listing creation to 
            tenant communication, so you can focus on growing your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-green/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-green to-stayll-green-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                AI-Generated Listings
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                Create professional listings in seconds with AI that writes compelling 
                descriptions, optimizes photos, and posts to multiple platforms.
              </p>
              <div className="flex items-center text-stayll-green font-semibold text-sm">
                <span className="bg-stayll-green/10 px-3 py-1 rounded-full">Save 5+ hours</span>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-blue/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-blue to-stayll-blue-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Smart Tenant Communication
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                AI responds to inquiries instantly, schedules showings, and maintains 
                professional communication 24/7 without your involvement.
              </p>
              <div className="flex items-center text-stayll-blue font-semibold text-sm">
                <span className="bg-stayll-blue/10 px-3 py-1 rounded-full">Instant responses</span>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-purple/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-purple/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-purple to-stayll-purple-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Automated Tenant Screening
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                AI analyzes applications, checks backgrounds, and provides detailed 
                reports in minutes instead of days.
              </p>
              <div className="flex items-center text-stayll-purple font-semibold text-sm">
                <span className="bg-stayll-purple/10 px-3 py-1 rounded-full">5-minute screening</span>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-orange/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-orange to-stayll-orange-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Market Intelligence
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                Get real-time market data, pricing insights, and competitive analysis 
                to maximize your rental income.
              </p>
              <div className="flex items-center text-stayll-orange font-semibold text-sm">
                <span className="bg-stayll-orange/10 px-3 py-1 rounded-full">+15% revenue</span>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-pink/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-pink/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-pink to-stayll-pink-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Performance Analytics
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                Track key metrics, identify trends, and optimize your rental strategy 
                with detailed analytics and insights.
              </p>
              <div className="flex items-center text-stayll-pink font-semibold text-sm">
                <span className="bg-stayll-pink/10 px-3 py-1 rounded-full">Data-driven insights</span>
              </div>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-green/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-green/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-green to-stayll-green-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Automated Rent Collection
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed mb-4">
                Streamline rent collection with automated reminders, online payments, 
                and late fee management.
              </p>
              <div className="flex items-center text-stayll-green font-semibold text-sm">
                <span className="bg-stayll-green/10 px-3 py-1 rounded-full">99% on-time payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-stayll-green/10 via-white to-stayll-blue/10 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl font-bold text-stayll-dark mb-4">
              Real Results from Real Landlords
            </h3>
            <p className="font-sans text-lg text-stayll-gray-600">
              See how Stayll transforms rental management for landlords across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-stayll-green mb-2">10+</div>
              <div className="text-stayll-gray-600 font-medium">Hours saved per week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-stayll-blue mb-2">3x</div>
              <div className="text-stayll-gray-600 font-medium">More tenant inquiries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-stayll-purple mb-2">25%</div>
              <div className="text-stayll-gray-600 font-medium">Increase in rental income</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stayll-green to-stayll-blue text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Start Your Free Trial
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection; 