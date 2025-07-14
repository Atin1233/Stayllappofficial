import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does the AI listing generation work?",
      answer: "Our AI analyzes your property details, local market data, and successful listing patterns to create compelling, professional rental listings that attract quality tenants."
    },
    {
      question: "Can I integrate Stayll with my existing tools?",
      answer: "Yes! Stayll integrates with popular property management software, listing platforms, and communication tools to streamline your workflow."
    },
    {
      question: "What kind of analytics do you provide?",
      answer: "We provide comprehensive analytics including rental performance, market trends, tenant satisfaction scores, and ROI insights to help you make data-driven decisions."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to get started."
    },
    {
      question: "How secure is my property and tenant data?",
      answer: "We use enterprise-grade security with encryption, regular backups, and compliance with data protection regulations to keep your information safe."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Stayll and how it can transform your property management.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 