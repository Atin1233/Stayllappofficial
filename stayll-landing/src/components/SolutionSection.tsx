import React from 'react';

const SolutionSection: React.FC = () => {
  const solutions = [
    {
      title: "AI-Generated Listings",
      description: "Create professional, compelling rental listings in seconds with our advanced AI",
      icon: "🤖"
    },
    {
      title: "Smart Tenant Management",
      description: "Automated screening, communication, and lease management tools",
      icon: "👥"
    },
    {
      title: "Real-Time Analytics",
      description: "Track property performance, market trends, and ROI with detailed insights",
      icon: "📈"
    },
    {
      title: "Seamless Integration",
      description: "Works with your existing tools and platforms for a smooth workflow",
      icon: "🔗"
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stayll is the Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform transforms how you manage properties, saving you time 
            and maximizing your returns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection; 