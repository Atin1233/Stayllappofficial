import React, { useState } from "react";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Stayll's AI automation work?",
      answer: "Stayll uses advanced AI to automate every aspect of rental management. Our AI creates professional listings, responds to tenant inquiries 24/7, screens applicants, and provides market insights. You simply provide basic property information, and our AI handles the rest with human-like intelligence and professionalism."
    },
    {
      question: "What makes Stayll different from other rental management tools?",
      answer: "Unlike traditional property management software, Stayll is built specifically for AI automation. We don't just provide tools—we provide an AI assistant that works for you. Our platform learns your preferences, communicates naturally with tenants, and continuously improves its performance based on your specific needs and market conditions."
    },
    {
      question: "How much time can I really save with Stayll?",
      answer: "Our customers report saving 10-15 hours per week on average. This includes time saved on listing creation, tenant communication, screening, and administrative tasks. Many landlords who previously spent their weekends managing properties now have that time back for family, hobbies, or growing their business."
    },
    {
      question: "Is the AI communication really natural?",
      answer: "Absolutely. Our AI is trained on millions of real rental conversations and can handle complex inquiries, schedule showings, answer questions about amenities, and even negotiate terms. Tenants often don't realize they're talking to AI because the responses are so natural and helpful."
    },
    {
      question: "What about tenant screening and background checks?",
      answer: "Stayll's AI performs comprehensive tenant screening in minutes, not days. This includes credit checks, background verification, rental history analysis, and income verification. Our AI then provides you with detailed reports and recommendations, helping you make informed decisions quickly."
    },
    {
      question: "Can I customize the AI's communication style?",
      answer: "Yes! You can set your preferred tone, communication style, and specific policies. The AI learns your preferences and maintains consistency across all interactions. Whether you prefer formal, friendly, or professional communication, our AI adapts to match your brand."
    },
    {
      question: "What if I need to step in and handle something personally?",
      answer: "You always have full control. You can review all AI communications, step in at any time to handle specific situations, and override any AI decisions. The platform provides complete transparency and keeps you informed of all activities while giving you the flexibility to intervene when needed."
    },
    {
      question: "How secure is my data and tenant information?",
      answer: "Security is our top priority. We use bank-level encryption, comply with all data protection regulations, and never share your information with third parties. All tenant data is handled with the same care and security standards as financial institutions."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-stayll-gray-50 via-white to-stayll-blue/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-stayll-blue/10 text-stayll-blue font-semibold rounded-full text-sm mb-6">
            <span className="w-2 h-2 bg-stayll-blue rounded-full mr-2 animate-pulse"></span>
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stayll-dark mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-stayll-blue to-stayll-purple bg-clip-text text-transparent">
              Know
            </span>
          </h2>
          <p className="font-sans text-xl text-stayll-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about Stayll's AI-powered 
            rental management platform.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-stayll-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-stayll-blue/20 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-stayll-dark pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-6 h-6 text-stayll-blue transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '24px', maxHeight: '24px' }}>
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <div className="border-t border-stayll-gray-100 pt-6">
                    <p className="font-sans text-stayll-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-stayll-blue/10 via-white to-stayll-purple/10 rounded-3xl p-8 border border-stayll-gray-100">
            <h3 className="font-display text-2xl font-bold text-stayll-dark mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-stayll-gray-600 mb-6">
              Our team is here to help you get started with AI-powered rental management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-stayll-blue to-stayll-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Support
              </button>
              <button className="inline-flex items-center px-6 py-3 border-2 border-stayll-gray-200 text-stayll-dark font-semibold rounded-xl hover:border-stayll-blue hover:text-stayll-blue transition-all duration-300">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ maxWidth: '20px', maxHeight: '20px' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 