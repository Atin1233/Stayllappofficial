import React from 'react';
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  MessageCircle,
  FileText,
  Users,
  GitCompareArrows,
  BotMessageSquare,
  Send,
  Menu,
  Check,
} from "lucide-react";

const LandingPage: React.FC = () => {
    // const navigate = useNavigate(); // unused

    const cardProps = [
        {
            icon: <FileText size={40} className="text-red-400" />,
            title: "Writing listings for every new vacancy",
            description:
                "Crafting compelling property descriptions, uploading photos, and posting across multiple platforms takes hours.",
        },
        {
            icon: <MessageCircle size={40} className="text-orange-400" />,
            title: "Replying to dozens of messages on multiple platforms",
            description:
                "Answering the same questions over and over across Zillow, Craigslist, Facebook, and more.",
        },
        {
            icon: <Users size={40} className="text-yellow-400" />,
            title: "Manually screening and filtering tenants",
            description:
                "Reviewing applications, checking references, and running background checks eats up your valuable time.",
        },
    ];

    const featureCardProps = [
        {
            icon: <BotMessageSquare size={40} className="text-stayll-blue" />,
            title: "Auto-Generated Listings",
            description: "Beautiful, SEO-optimized listings in seconds",
            features: [
                "Property description writing",
                "Multi-platform posting",
                "Photo optimization",
            ],
        },
        {
            icon: <Send size={40} className="text-stayll-green" />,
            title: "Instant Message Replies",
            description: "AI responds with content-aware messages 24/7",
            features: [
                "Pre-qualified responses",
                "Scheduling automation",
                "Follow-up sequences",
            ],
        },
        {
            icon: <GitCompareArrows size={40} className="text-stayll-blue" />,
            title: "Smart Screening",
            description: "Filter applicants with automated checks and flags",
            features: [
                "Credit score verification",
                "Income validation",
                "Reference checking",
            ],
        },
    ];

    const testimonialCardProps = [
        {
            image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            name: "Sarah M.",
            username: "6-unit portfolio owner",
            comment:
                "Stayll saved me 8 hours last week alone. The automated responses are so natural, tenants don't even know it's AI.",
        },
        {
            image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            name: "Mike R.",
            username: "3-unit landlord",
            comment:
                "I was skeptical about AI, but Stayll actually understands rental management. It's like having a property manager for each unit.",
        },
        {
            image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            name: "Jennifer L.",
            username: "4-unit property owner",
            comment:
                "Finally, a tool that gets it. Stayll handles the busy work so I can focus on growing my portfolio.",
        },
    ];

    const faqProps = [
        {
            question: "Who is Stayll for?",
            answer:
                "Stayll is designed for small to medium-sized landlords and property managers who want to automate their rental management tasks and save time. It's perfect for those managing between 1 and 50 units.",
        },
        {
            question: "Is it hard to set up?",
            answer:
                "No, Stayll is designed to be incredibly easy to set up. You can connect your listings and start automating messages in under 5 minutes. No complex integrations or technical skills required.",
        },
        {
            question: "How much does it cost?",
            answer:
                "Stayll offers a simple and affordable pricing plan based on the number of units you manage. We have a free trial available so you can experience the benefits before committing. Check our pricing page for more details.",
        },
        {
            question: "Does it work for short-term rentals?",
            answer:
                "Currently, Stayll is optimized for long-term residential rentals. We are exploring options for short-term rentals in the future, so stay tuned for updates!",
        },
        {
            question: "How do I get started?",
            answer:
                "Simple! Click the 'Get Early Access' button on our homepage, create an account, and you can start your free trial immediately. We're excited to have you on board!",
        },
    ];

    return (
        <div className="flex flex-col min-h-dvh">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <a className="flex items-center justify-center" href="#">
                    <BotMessageSquare className="h-6 w-6 text-stayll-blue" />
                    <span className="sr-only">Stayll</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button variant="ghost" asChild>
                        <a href="/login">Sign In</a>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="sm:hidden" size="icon" variant="outline">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>
                                    <a className="flex items-center justify-center" href="#">
                                        <BotMessageSquare className="h-6 w-6 text-stayll-blue" />
                                        <span className="sr-only">Stayll</span>
                                    </a>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-2 py-6">
                                <Button variant="ghost" asChild>
                                    <a href="/login">Sign In</a>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </header>
            <main className="flex-1">
                <section
                    id="hero-section"
                    className="w-full pt-12 md:pt-24 lg:pt-32 border-y"
                >
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Meet Stayll – Your AI Assistant for {""}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-stayll-blue to-stayll-green">
                                        Rental Properties
                                    </span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Stayll saves landlords hours every week by automating
                                    listings, message replies, and tenant screening. No complex
                                    setup. Just real automation.
                                </p>
                                <div className="space-x-4 mt-6">
                                    <Button asChild>
                                        <a href="#">Get Early Access</a>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <div className="bg-gray-100 rounded-lg p-8 w-full">
                                    <div className="flex flex-col items-center justify-center h-48">
                                        <FileText className="h-16 w-16 text-gray-400" />
                                        <p className="text-gray-500 mt-2 text-center">
                                            Stayll Dashboard Preview
                                            <br />
                                            <span className="text-sm">Coming Soon</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="card-section" className="py-16 sm:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Landlording is broken for small owners
                            </h2>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                You didn't sign up for endless admin work
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {cardProps.map((card, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                                            {card.icon}
                                        </div>
                                        <CardTitle>{card.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{card.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="feature-card-section" className="py-16 sm:py-24 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Let Stayll do the work for you
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {featureCardProps.map((card, index) => (
                                <Card key={index} className="bg-white">
                                    <CardHeader>
                                        <div className="flex items-center justify-start h-12 w-12 rounded-full mb-4">
                                            {card.icon}
                                        </div>
                                        <CardTitle>{card.title}</CardTitle>
                                        <CardDescription>{card.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {card.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-2">
                                                    <Check className="h-5 w-5 text-stayll-green" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="testimonial-card-section" className="py-16 sm:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center">
                            <Badge
                                variant="default"
                                className="bg-gradient-to-r from-stayll-blue to-stayll-green text-white"
                            >
                                Join 40+ early users managing over 120 units with Stayll
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mt-4">
                                Built by landlords, for landlords
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {testimonialCardProps.map((card, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={card.image} alt={card.name} />
                                                <AvatarFallback>{card.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle>{card.name}</CardTitle>
                                                <CardDescription>{card.username}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>"{card.comment}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="cta-section"
                    className="py-16 sm:py-24 bg-gradient-to-br from-stayll-blue to-stayll-green"
                >
                    <div className="container px-4 md:px-6 text-center text-white">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Ready to save hours every week?
                        </h2>
                        <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                            Join our early access list and be the first to try Stayll for
                            free.
                        </p>
                        <div className="mx-auto w-full max-w-sm space-y-2 mt-8">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1 text-black"
                                    placeholder="Your name"
                                    type="text"
                                />
                                <Input
                                    className="max-w-lg flex-1 text-black"
                                    placeholder="Your email address"
                                    type="email"
                                />
                                <Button type="submit" variant="outline">
                                    Get Early Access
                                </Button>
                            </form>
                            <p className="text-xs">
                                No spam. We'll only email you when Stayll is ready.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="faq-section" className="py-16 sm:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Questions?
                            </h2>
                        </div>
                        <div className="mx-auto max-w-3xl mt-8">
                            <Accordion type="single" collapsible className="w-full">
                                {faqProps.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 text-white py-8">
                <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BotMessageSquare className="h-6 w-6" />
                        <span>Stayll</span>
                    </div>
                    <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
                        <a className="text-sm hover:underline" href="#">
                            Terms
                        </a>
                        <a className="text-sm hover:underline" href="#">
                            Privacy
                        </a>
                        <a className="text-sm hover:underline" href="#">
                            Contact
                        </a>
                    </nav>
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-400">
                            © 2024 Stayll. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage; 