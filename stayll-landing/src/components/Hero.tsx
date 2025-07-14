import React from 'react';
import { Button } from './ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Property Management
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Automate your rental listings, manage tenants, and analyze property performance 
            with cutting-edge AI technology. Save hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
              <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
                Start Free Trial
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 