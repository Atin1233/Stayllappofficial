import React from 'react';
import { Button } from './ui/button';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Stayll</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="http://localhost:3004" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="http://localhost:3003" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:block" asChild>
              <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
                Sign In
              </a>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 