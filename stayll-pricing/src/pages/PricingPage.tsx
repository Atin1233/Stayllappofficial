import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Building2, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individual landlords",
    price: { monthly: 29, yearly: 290 },
    features: [
      "Up to 5 properties",
      "Basic listing management",
      "Tenant screening (5/month)",
      "Email support",
      "Mobile app access",
      "Basic analytics"
    ],
    icon: Building2,
    popular: false
  },
  {
    name: "Professional",
    description: "Ideal for growing property managers",
    price: { monthly: 79, yearly: 790 },
    features: [
      "Up to 25 properties",
      "Advanced listing management",
      "Tenant screening (25/month)",
      "Priority email support",
      "Mobile app access",
      "Advanced analytics",
      "Automated rent collection",
      "Maintenance tracking"
    ],
    icon: Zap,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large property portfolios",
    price: { monthly: 199, yearly: 1990 },
    features: [
      "Unlimited properties",
      "Full listing management",
      "Unlimited tenant screening",
      "24/7 phone support",
      "Mobile app access",
      "Advanced analytics & reporting",
      "Automated rent collection",
      "Maintenance tracking",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options"
    ],
    icon: Crown,
    popular: false
  }
];

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isYearly, setIsYearly] = useState(false);

  const toggleBillingCycle = () => {
    const newCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly';
    setBillingCycle(newCycle);
    setIsYearly(newCycle === 'yearly');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="w-full px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your property management needs. 
            All plans include our core features with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'monthly' ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
            )}>
              Monthly
            </span>
            <button
              onClick={toggleBillingCycle}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                isYearly ? "bg-stayll-blue" : "bg-slate-200 dark:bg-slate-700"
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  isYearly ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn(
              "text-sm font-medium transition-colors",
              billingCycle === 'yearly' ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
            )}>
              Yearly
              <Badge variant="secondary" className="ml-2 bg-stayll-green text-white">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={cn(
                "relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                plan.popular && "ring-2 ring-stayll-blue shadow-lg scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-stayll-blue text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                    <plan.icon className="w-6 h-6 text-stayll-blue" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center pb-8">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-stayll-green flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  className={cn(
                    "w-full",
                    plan.popular 
                      ? "bg-stayll-blue hover:bg-stayll-blue/90" 
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  )}
                  onClick={() => window.open('http://localhost:5173', '_blank')}
                >
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center w-full px-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We offer a 14-day free trial on all plans. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center w-full px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Join thousands of property managers who trust Stayll to manage their properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-stayll-blue hover:bg-stayll-blue/90"
                onClick={() => window.open('http://localhost:5173', '_blank')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('http://localhost:3001', '_blank')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 