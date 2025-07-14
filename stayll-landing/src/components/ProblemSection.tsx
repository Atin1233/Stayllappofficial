import React from 'react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Time-Consuming Listings",
      description: "Writing compelling rental listings takes hours of research and writing",
      icon: "⏰"
    },
    {
      title: "Inconsistent Quality",
      description: "Manual listings often miss key details or fail to highlight property strengths",
      icon: "📝"
    },
    {
      title: "Poor Tenant Screening",
      description: "Traditional screening methods are slow and often miss red flags",
      icon: "🔍"
    },
    {
      title: "Limited Analytics",
      description: "No insights into property performance or market trends",
      icon: "📊"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Management is Broken
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional property management is time-consuming, error-prone, and lacks the insights 
            you need to maximize your returns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection; 