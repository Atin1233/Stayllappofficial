import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  CreditCard, 
  Wrench, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe, 
  Database, 
  Headphones,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Target,
  Clock,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    category: "Property Management",
    icon: Home,
    title: "Comprehensive Property Management",
    description: "Manage all your properties from a single dashboard with detailed insights and analytics.",
    features: [
      "Create and manage unlimited properties",
      "Property portfolio overview",
      "Detailed property analytics",
      "Property performance tracking",
      "Custom property categories"
    ]
  },
  {
    category: "AI-Powered Listings",
    icon: Zap,
    title: "AI-Generated Rental Listings",
    description: "Create compelling rental listings in seconds with our advanced AI technology.",
    features: [
      "Automated listing generation",
      "Smart content optimization",
      "SEO-optimized descriptions",
      "Professional photography suggestions",
      "Market-based pricing recommendations"
    ]
  },
  {
    category: "Tenant Management",
    icon: Users,
    title: "Complete Tenant Lifecycle Management",
    description: "Streamline tenant screening, onboarding, and ongoing relationship management.",
    features: [
      "Advanced tenant screening",
      "Background and credit checks",
      "Tenant application processing",
      "Lease agreement management",
      "Tenant communication tools"
    ]
  },
  {
    category: "Financial Management",
    icon: CreditCard,
    title: "Automated Rent Collection & Financial Tracking",
    description: "Simplify rent collection and maintain complete financial records automatically.",
    features: [
      "Automated rent collection",
      "Multiple payment methods",
      "Financial reporting and analytics",
      "Expense tracking",
      "Tax preparation tools"
    ]
  },
  {
    category: "Maintenance Management",
    icon: Wrench,
    title: "Proactive Maintenance Tracking",
    description: "Keep your properties in top condition with comprehensive maintenance management.",
    features: [
      "Maintenance request tracking",
      "Scheduled maintenance alerts",
      "Vendor management",
      "Cost tracking and budgeting",
      "Preventive maintenance scheduling"
    ]
  },
  {
    category: "Analytics & Reporting",
    icon: BarChart3,
    title: "Advanced Analytics & Insights",
    description: "Make data-driven decisions with comprehensive analytics and reporting tools.",
    features: [
      "Real-time performance metrics",
      "Custom report generation",
      "Market trend analysis",
      "ROI calculations",
      "Predictive analytics"
    ]
  }
];

const integrations = [
  { name: "Payment Processors", icon: CreditCard },
  { name: "Accounting Software", icon: FileText },
  { name: "CRM Systems", icon: Users },
  { name: "Marketing Platforms", icon: TrendingUp },
  { name: "Communication Tools", icon: MessageSquare },
  { name: "Document Management", icon: Database }
];

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate repetitive tasks and focus on growing your business"
  },
  {
    icon: DollarSign,
    title: "Increase Revenue",
    description: "Optimize pricing and reduce vacancies with data-driven insights"
  },
  {
    icon: Shield,
    title: "Reduce Risk",
    description: "Comprehensive screening and compliance tools protect your investment"
  },
  {
    icon: TrendingUp,
    title: "Scale Efficiently",
    description: "Manage unlimited properties with the same efficiency as one"
  }
];

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="w-full px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-stayll-blue text-white px-4 py-1">
            <Star className="w-3 h-3 mr-1" />
            AI-Powered Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Everything You Need to
            <span className="text-stayll-blue"> Manage Properties</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Stayll combines cutting-edge AI technology with comprehensive property management tools 
            to streamline your rental business from listing to lease renewal.
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
              onClick={() => window.open('http://localhost:3003', '_blank')}
            >
              View Pricing
            </Button>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-stayll-blue/10">
                    <benefit.icon className="w-6 h-6 text-stayll-blue" />
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={index} className={cn(
              "flex flex-col lg:flex-row items-center gap-12",
              index % 2 === 1 && "lg:flex-row-reverse"
            )}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-stayll-blue/10">
                    <feature.icon className="w-5 h-5 text-stayll-blue" />
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700">
                    {feature.category}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-stayll-green flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <Card className="border-0 shadow-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="p-6 rounded-full bg-stayll-blue/10">
                        <feature.icon className="w-12 h-12 text-stayll-blue" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-slate-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-center text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Seamless Integrations
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Connect with your favorite tools and services to create a complete property management ecosystem.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-700">
                      <integration.icon className="w-6 h-6 text-stayll-blue" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {integration.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-24 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our platform leverages cutting-edge technology to deliver the best experience.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-3">
                <Zap className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">AI-Powered</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Advanced machine learning</p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 mb-3">
                <Shield className="w-8 h-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Secure</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise-grade security</p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 mb-3">
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Mobile-First</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Responsive design</p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 mb-3">
                <Globe className="w-8 h-8 text-orange-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Cloud-Based</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Always accessible</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-stayll-blue to-stayll-green rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-stayll-blue-light mb-6 max-w-2xl mx-auto">
              Join thousands of property managers who trust Stayll to streamline their operations 
              and maximize their returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-stayll-blue hover:bg-slate-100"
                onClick={() => window.open('http://localhost:5173', '_blank')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
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