import React from 'react';
import { Button } from './ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Property Management?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of property managers who are already saving time and increasing 
          their rental income with Stayll.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3" asChild>
            <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
              Start Free Trial
            </a>
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
            Schedule Demo
          </Button>
        </div>
        <p className="text-blue-200 mt-4 text-sm">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection; 