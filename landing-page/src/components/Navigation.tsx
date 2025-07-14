import React, { useState, useEffect } from "react";
import Logo from "./Logo";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("signup-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-stayll-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className={`font-sans font-medium transition-colors duration-300 ${
                isScrolled ? "text-stayll-dark hover:text-stayll-blue" : "text-white hover:text-stayll-blue-light"
              }`}
            >
              Features
            </a>
            <a
              href="#pricing"
              className={`font-sans font-medium transition-colors duration-300 ${
                isScrolled ? "text-stayll-dark hover:text-stayll-blue" : "text-white hover:text-stayll-blue-light"
              }`}
            >
              Pricing
            </a>
            <a
              href="#about"
              className={`font-sans font-medium transition-colors duration-300 ${
                isScrolled ? "text-stayll-dark hover:text-stayll-blue" : "text-white hover:text-stayll-blue-light"
              }`}
            >
              About
            </a>
            <a
              href="#contact"
              className={`font-sans font-medium transition-colors duration-300 ${
                isScrolled ? "text-stayll-dark hover:text-stayll-blue" : "text-white hover:text-stayll-blue-light"
              }`}
            >
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              className={`font-sans font-medium transition-colors duration-300 ${
                isScrolled ? "text-stayll-dark hover:text-stayll-blue" : "text-white hover:text-stayll-blue-light"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={handleCTAClick}
              className="px-6 py-3 bg-gradient-to-r from-stayll-green to-stayll-green-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-stayll-blue/20"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isScrolled ? "bg-stayll-dark" : "bg-white"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isScrolled ? "bg-stayll-dark" : "bg-white"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isScrolled ? "bg-stayll-dark" : "bg-white"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-stayll-gray-200">
            <a
              href="#features"
              className="block font-sans font-medium text-stayll-dark hover:text-stayll-blue transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block font-sans font-medium text-stayll-dark hover:text-stayll-blue transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block font-sans font-medium text-stayll-dark hover:text-stayll-blue transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="block font-sans font-medium text-stayll-dark hover:text-stayll-blue transition-colors duration-300"
            >
              Contact
            </a>
            <div className="pt-4 border-t border-stayll-gray-200">
              <button className="block w-full text-left font-sans font-medium text-stayll-dark hover:text-stayll-blue transition-colors duration-300 mb-4">
                Sign In
              </button>
              <button
                onClick={handleCTAClick}
                className="w-full px-6 py-3 bg-gradient-to-r from-stayll-green to-stayll-green-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 