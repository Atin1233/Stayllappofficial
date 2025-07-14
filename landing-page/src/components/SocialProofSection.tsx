import React from "react";

const SocialProofSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Properties",
      avatar: "SJ",
      content: "Stayll has completely transformed how I manage my 15 rental properties. The AI handles all the repetitive tasks, and I've saved over 20 hours per week. My tenants love the instant responses!",
      rating: 5,
      color: "from-stayll-blue to-stayll-blue-light",
    },
    {
      name: "Michael Chen",
      role: "Real Estate Investor",
      company: "Chen Investments",
      avatar: "MC",
      content: "The automated tenant screening is incredible. What used to take me days now happens in minutes. I've increased my rental income by 30% thanks to better tenant selection and faster turnover.",
      rating: 5,
      color: "from-stayll-green to-stayll-green-light",
    },
    {
      name: "Emily Rodriguez",
      role: "Landlord",
      company: "Self-Managed",
      avatar: "ER",
      content: "As a busy professional, I was spending all my weekends managing rentals. Stayll changed everything. The AI-generated listings are professional and the communication is seamless.",
      rating: 5,
      color: "from-stayll-purple to-stayll-purple-light",
    },
    {
      name: "David Thompson",
      role: "Property Owner",
      company: "Thompson Real Estate",
      avatar: "DT",
      content: "The market intelligence features helped me optimize my pricing strategy. I'm now getting 25% more inquiries and filling vacancies 60% faster. This tool pays for itself.",
      rating: 5,
      color: "from-stayll-orange to-stayll-orange-light",
    },
    {
      name: "Lisa Park",
      role: "Property Manager",
      company: "Park Management",
      avatar: "LP",
      content: "I was skeptical about AI at first, but Stayll exceeded all expectations. The platform is intuitive, the support is excellent, and the results speak for themselves.",
      rating: 5,
      color: "from-stayll-pink to-stayll-pink-light",
    },
    {
      name: "Robert Williams",
      role: "Real Estate Developer",
      company: "Williams Development",
      avatar: "RW",
      content: "Managing 50+ units used to be a nightmare. Stayll's automation has made it effortless. The analytics help me make data-driven decisions that maximize my ROI.",
      rating: 5,
      color: "from-stayll-green to-stayll-blue",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-stayll-gray-50 via-white to-stayll-purple/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-stayll-purple/10 text-stayll-purple font-semibold rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-stayll-purple rounded-full mr-2 animate-pulse"></span>
            Customer Success
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stayll-dark mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-stayll-purple to-stayll-blue bg-clip-text text-transparent">
              Thousands of Landlords
            </span>
          </h2>
          <p className="font-sans text-xl text-stayll-gray-600 max-w-3xl mx-auto">
            See how real landlords are transforming their rental businesses with Stayll's 
            AI-powered platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-stayll-purple mb-2">2,500+</div>
            <div className="text-stayll-gray-600 font-medium">Active Landlords</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stayll-blue mb-2">15,000+</div>
            <div className="text-stayll-gray-600 font-medium">Properties Managed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stayll-green mb-2">4.9/5</div>
            <div className="text-stayll-gray-600 font-medium">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-stayll-orange mb-2">98%</div>
            <div className="text-stayll-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stayll-gray-100 hover:border-stayll-purple/20"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color}/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-stayll-orange flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ maxWidth: '20px', maxHeight: '20px' }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <blockquote className="font-sans text-stayll-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center text-white font-semibold text-lg mr-4`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-stayll-dark">
                      {testimonial.name}
                    </div>
                    <div className="font-sans text-sm text-stayll-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stayll-gray-100">
            <h3 className="font-display text-2xl font-bold text-stayll-dark mb-6">
              Trusted by Industry Leaders
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-stayll-gray-400 font-semibold text-lg">Zillow</div>
              <div className="text-stayll-gray-400 font-semibold text-lg">Apartments.com</div>
              <div className="text-stayll-gray-400 font-semibold text-lg">RentSpree</div>
              <div className="text-stayll-gray-400 font-semibold text-lg">Cozy</div>
              <div className="text-stayll-gray-400 font-semibold text-lg">RentPrep</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-stayll-purple to-stayll-blue text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Join Thousands of Happy Landlords
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection; 