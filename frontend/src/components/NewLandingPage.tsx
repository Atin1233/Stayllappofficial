import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  MessageSquare,
  Users,
  Clock,
  Building,
  FileText,
  CheckCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const NewLandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email capture service
    console.log("Early access signup:", { name, email });
    alert("Thanks for signing up! We'll be in touch soon.");
    setEmail("");
    setName("");
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "Who is Stayll for?",
      answer:
        "Stayll is designed for landlords who manage 1-10 long-term rental units and want to automate repetitive administrative tasks.",
    },
    {
      question: "Is it hard to set up?",
      answer:
        "No. Just sign up and connect your rental information. Stayll handles the rest automatically.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Early users get free access while we build and refine the platform. We'll notify you before any pricing changes.",
    },
    {
      question: "Does it work for short-term rentals?",
      answer:
        "No, Stayll is specifically built for long-term rental properties and their unique management needs.",
    },
    {
      question: "How do I get started?",
      answer:
        "Join our early access list above! We'll send you an invitation as soon as your spot opens up.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-stayll-blue to-stayll-green rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  Stayll
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Meet Stayll – Your AI Assistant for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-stayll-blue to-stayll-green">
                Rental Properties
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Stayll saves landlords hours every week by automating listings,
              message replies, and tenant screening.
              <span className="font-semibold text-slate-700">
                {" "}
                No complex setup. Just real automation.
              </span>
            </p>

            {/* CTA Button */}
            <div className="mb-12">
              <Button
                size="lg"
                className="bg-stayll-blue hover:bg-stayll-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() =>
                  document
                    .getElementById("cta-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get Early Access
              </Button>
            </div>

            {/* Supporting Visual Placeholder */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 shadow-2xl border border-slate-200">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-stayll-blue to-stayll-green rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <Building className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-slate-500 font-medium">
                      Stayll Dashboard Preview
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Landlording is broken for small owners
            </h2>
            <p className="text-xl text-slate-600">
              You didn't sign up for endless admin work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Writing listings for every new vacancy
              </h3>
              <p className="text-slate-600">
                Crafting compelling property descriptions, uploading photos, and
                posting across multiple platforms takes hours.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Replying to dozens of messages on multiple platforms
              </h3>
              <p className="text-slate-600">
                Answering the same questions over and over across Zillow,
                Craigslist, Facebook, and more.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Manually screening and filtering tenants
              </h3>
              <p className="text-slate-600">
                Reviewing applications, checking references, and running
                background checks eats up your valuable time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Let Stayll do the work for you
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-stayll-blue-light rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-stayll-blue" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Auto-Generated Listings
              </h3>
              <p className="text-slate-600 mb-4">
                Beautiful, SEO-optimized listings in seconds
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Property description writing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Multi-platform posting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Photo optimization
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-stayll-green-light rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-stayll-green" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Instant Message Replies
              </h3>
              <p className="text-slate-600 mb-4">
                AI responds with context-aware messages 24/7
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Pre-qualified responses
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Scheduling automation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Follow-up sequences
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <div className="w-16 h-16 bg-gradient-to-br from-stayll-blue-light to-stayll-green-light rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-stayll-blue" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Smart Screening
              </h3>
              <p className="text-slate-600 mb-4">
                Filter applicants with automated checks and flags
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Credit score verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Income validation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-stayll-green mr-2" />
                  Reference checking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built by landlords, for landlords
            </h2>
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="bg-stayll-blue-light text-stayll-blue px-4 py-2 text-base font-semibold"
              >
                Join 40+ early users managing over 120 units with Stayll
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Sarah M.</h4>
                  <p className="text-sm text-slate-600">
                    6-unit portfolio owner
                  </p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "Stayll saved me 8 hours last week alone. The automated
                responses are so natural, tenants don't even know it's AI."
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Mike R.</h4>
                  <p className="text-sm text-slate-600">3-unit landlord</p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "I was skeptical about AI, but Stayll actually understands
                rental management. It's like having a property manager for each
                unit."
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Jennifer L.</h4>
                  <p className="text-sm text-slate-600">
                    4-unit property owner
                  </p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "Finally, a tool that gets it. Stayll handles the busy work so I
                can focus on growing my portfolio."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        className="py-16 sm:py-24 bg-gradient-to-br from-stayll-blue to-stayll-green"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to save hours every week?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our early access list and be the first to try Stayll for free.
          </p>

          <form
            onSubmit={handleEarlyAccess}
            className="max-w-md mx-auto space-y-4"
          >
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white border-white text-slate-900 placeholder:text-slate-500"
            />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white border-white text-slate-900 placeholder:text-slate-500"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white text-stayll-blue hover:bg-slate-50 font-semibold py-3"
            >
              Get Early Access
            </Button>
          </form>

          <p className="text-white/80 text-sm mt-4">
            No spam. We'll only email you when Stayll is ready.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Questions?
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-stayll-blue to-stayll-green rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Stayll</span>
            </div>

            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>

            <p className="text-slate-400 text-sm">
              © 2024 Stayll. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLandingPage; 