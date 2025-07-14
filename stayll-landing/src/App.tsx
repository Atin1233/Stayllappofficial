import React from 'react';
import './App.css';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import SocialProofSection from './components/SocialProofSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App; 