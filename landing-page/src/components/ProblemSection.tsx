import React from "react";

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-stayll-gray-50 via-white to-stayll-blue/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-stayll-red/10 text-stayll-red font-semibold rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-stayll-red rounded-full mr-2 animate-pulse"></span>
            The Problem
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stayll-dark mb-6">
            Rental Management is{" "}
            <span className="bg-gradient-to-r from-stayll-red to-stayll-orange bg-clip-text text-transparent">
              Broken
            </span>
          </h2>
          <p className="font-sans text-xl text-stayll-gray-600 max-w-3xl mx-auto">
            Landlords waste countless hours on repetitive tasks while missing opportunities 
            to maximize their rental income and provide better tenant experiences.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-red/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-red/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-red to-stayll-red-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Time-Consuming Manual Tasks
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                Hours wasted on listing creation, tenant screening, and responding to repetitive 
                inquiries. Your time is valuable - don't spend it on administrative work.
              </p>
              <div className="mt-6 flex items-center text-stayll-red font-semibold">
                <span className="text-2xl font-bold">15+ hours</span>
                <span className="ml-2 text-sm">per week wasted</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-orange/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-orange to-stayll-orange-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Poor Tenant Communication
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                Delayed responses, missed inquiries, and inconsistent communication lead to 
                frustrated tenants and lost rental opportunities.
              </p>
              <div className="mt-6 flex items-center text-stayll-orange font-semibold">
                <span className="text-2xl font-bold">40%</span>
                <span className="ml-2 text-sm">inquiries go unanswered</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-yellow/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-yellow/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-yellow to-stayll-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Inconsistent Listings
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                Poor listing quality, missing information, and outdated photos result in 
                fewer inquiries and longer vacancy periods.
              </p>
              <div className="mt-6 flex items-center text-stayll-yellow font-semibold">
                <span className="text-2xl font-bold">60%</span>
                <span className="ml-2 text-sm">longer vacancy periods</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-red/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-red/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-red to-stayll-red-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Limited Market Insights
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                No data-driven insights to optimize pricing, understand market trends, 
                or make informed decisions about your rental properties.
              </p>
              <div className="mt-6 flex items-center text-stayll-red font-semibold">
                <span className="text-2xl font-bold">25%</span>
                <span className="ml-2 text-sm">potential revenue lost</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-orange/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-orange to-stayll-orange-dark rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Inefficient Screening
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                Manual background checks, reference calls, and application reviews take 
                days or weeks, delaying the rental process.
              </p>
              <div className="mt-6 flex items-center text-stayll-orange font-semibold">
                <span className="text-2xl font-bold">7+ days</span>
                <span className="ml-2 text-sm">average screening time</span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-yellow/20">
            <div className="absolute inset-0 bg-gradient-to-br from-stayll-yellow/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-stayll-yellow to-stayll-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-stayll-dark mb-4">
                Declining Rental Income
              </h3>
              <p className="font-sans text-stayll-gray-600 leading-relaxed">
                Missed rent payments, high turnover rates, and suboptimal pricing strategies 
                directly impact your bottom line and property value.
              </p>
              <div className="mt-6 flex items-center text-stayll-yellow font-semibold">
                <span className="text-2xl font-bold">$12K</span>
                <span className="ml-2 text-sm">average annual loss</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-stayll-red to-stayll-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Ready to Fix These Problems?
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection; 