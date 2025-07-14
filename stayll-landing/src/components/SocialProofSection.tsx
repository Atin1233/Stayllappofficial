import React from 'react';

const SocialProofSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Properties",
      content: "Stayll has saved me 10+ hours per week. The AI-generated listings are professional and effective.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Real Estate Investor",
      company: "Chen Investments",
      content: "The analytics insights have helped me optimize my portfolio and increase rental income by 15%.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Landlord",
      company: "Self-Managed",
      content: "Finally, a tool that makes property management feel effortless. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Property Managers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of property managers who have transformed their business with Stayll.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection; 