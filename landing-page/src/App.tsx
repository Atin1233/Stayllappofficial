import React from "react";
import { Hero } from "./components";
import Navigation from "./components/Navigation";

// Placeholders for other sections (to be implemented)
const ProblemSection = React.lazy(() => import("./components/ProblemSection"));
const SolutionSection = React.lazy(() => import("./components/SolutionSection"));
const SocialProofSection = React.lazy(() => import("./components/SocialProofSection"));
const CTASection = React.lazy(() => import("./components/CTASection"));
const FAQSection = React.lazy(() => import("./components/FAQSection"));
const Footer = React.lazy(() => import("./components/Footer"));

function App() {
  return (
    <div className="bg-white min-h-screen font-sans text-stayll-charcoal">
      <Navigation />
      <Hero />
      <React.Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </React.Suspense>
    </div>
  );
}

export default App;
