import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SolarPopup from '../components/SolarPopup';
import { motion } from 'framer-motion';
import { Sun, Check, Zap, Home, Factory, Building2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolarEPC = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const epcServices = [
        {
            title: "Site Survey & Feasibility Study",
            description: "Technical and structural evaluation to assess system suitability and performance potential"
        },
        {
            title: "Customized System Design & Engineering",
            description: "Optimized solar plant design based on load requirements, space availability, and efficiency goals"
        },
        {
            title: "Procurement of Tier-1 Solar Modules",
            description: "High-quality components selected for durability, efficiency, and long service life"
        },
        {
            title: "Installation & Commissioning",
            description: "Professional execution with strict adherence to safety and performance standards"
        },
        {
            title: "Operation & Maintenance (O&M)",
            description: "Ongoing support to ensure consistent energy generation and system reliability"
        }
    ];

    const solutions = [
        {
            icon: Factory,
            title: "Industrial Rooftop Solar Systems",
            description: "High-capacity rooftop solar plants designed for factories and industrial facilities to reduce energy costs and improve power reliability."
        },
        {
            icon: Building2,
            title: "Commercial Rooftop Solar Systems",
            description: "Optimized solar rooftop solutions for commercial buildings, offices, institutions, and business parks.",
            idealFor: ["Commercial complexes", "Offices and IT parks", "Educational and healthcare facilities"],
            benefits: ["Reduced electricity expenses", "Predictable energy costs", "Efficient use of rooftop space"]
        },
        {
            icon: Home,
            title: "Residential Rooftop Solar Systems",
            description: "Smart rooftop solar solutions designed for homes, villas, and residential buildings.",
            idealFor: ["Individual homes", "Residential societies", "Independent houses"],
            benefits: ["Lower monthly electricity bills", "Clean and sustainable energy", "Long-term savings with minimal maintenance"]
        }
    ];

    const whyChoose = [
        "End-to-end EPC expertise under one roof",
        "Engineering-driven system design",
        "Use of high-quality, trusted solar components",
        "Professional installation and commissioning",
        "Long-term support and maintenance capability"
    ];

    const faqs = [
        {
            question: "What is Solar EPC?",
            answer: "Solar EPC (Engineering, Procurement, and Construction) refers to a complete service model where a single provider handles the design, supply, installation, commissioning, and support of a solar power system."
        },
        {
            question: "What types of solar systems do you install?",
            answer: "We install industrial, commercial, and residential rooftop solar systems, as well as ground-mounted solar power plants, based on site conditions and energy requirements."
        },
        {
            question: "Do you provide end-to-end solar installation services?",
            answer: "Yes. Our Solar EPC services cover the entire project lifecycle—from site survey and system design to installation, commissioning, and ongoing operation & maintenance (O&M)."
        },
        {
            question: "How much space is required for a rooftop solar system?",
            answer: "The required space depends on the plant size. On average, 1 kW of solar capacity requires 80–100 sq. ft. of shadow-free rooftop area."
        },
        {
            question: "How long does it take to install a solar power system?",
            answer: "Most rooftop solar installations are completed within 2–4 weeks, depending on system size, site readiness, and approvals."
        },
        {
            question: "What is the typical lifespan of a solar power plant?",
            answer: "Solar power systems are designed to operate for 25 years or more, with proper maintenance ensuring consistent performance over time."
        },
        {
            question: "Do you offer maintenance and support after installation?",
            answer: "Yes. We provide operation and maintenance (O&M) services to ensure optimal system performance, reliability, and long-term energy generation."
        },
        {
            question: "How can I estimate savings from a solar installation?",
            answer: "You can use our Solar ROI Calculator to get an estimate of installation cost, savings, and payback period based on your inputs."
        }
    ];

    return (
        <div className="page-solar">
            <SolarPopup />
            <PageHeader
                title="Solar EPC Services"
                description="Lathey Weigh Trix provides comprehensive Solar EPC (Engineering, Procurement, and Construction) services for industrial, commercial, and residential energy requirements. As an empanelled channel partner, we deliver reliable solar power systems designed for performance, cost efficiency, and long-term sustainability—from initial assessment to final commissioning."
            />

            {/* Concept to Commissioning */}
            <section className="section container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Concept to Commissioning</h2>
                        <p className="text-muted text-lg mb-8 text-center">
                            We manage the entire solar project lifecycle to ensure smooth execution, technical accuracy, and dependable outcomes.
                        </p>
                        <div className="space-y-4">
                            {epcServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
                                >
                                    <Check className="text-green-500 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">{service.title}</h4>
                                        <p className="text-muted">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Solar Solutions We Offer */}
            <section className="section bg-slate-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Solar Solutions We Offer</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 mb-4">
                                    <solution.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{solution.title}</h3>
                                <p className="text-muted mb-4">{solution.description}</p>
                                {solution.idealFor && (
                                    <>
                                        <p className="font-semibold text-primary text-sm mb-2">Ideal for:</p>
                                        <ul className="text-muted text-sm space-y-1 mb-4">
                                            {solution.idealFor.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-secondary mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {solution.benefits && (
                                    <>
                                        <p className="font-semibold text-primary text-sm mb-2">Benefits:</p>
                                        <ul className="text-muted text-sm space-y-1">
                                            {solution.benefits.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Lathey Weigh Trix for Solar EPC?</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {whyChoose.map((reason, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Check className="text-secondary flex-shrink-0" size={20} />
                                <span className="text-muted text-lg">{reason}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted text-lg">
                        We focus on delivering solar solutions that perform consistently over time, not just installations.
                    </p>
                </motion.div>
            </section>

            {/* Authorised Reseller */}
            <section className="section bg-slate-50">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-4">Authorised Reseller</h2>
                        <p className="text-muted text-lg">Trusted Partners in Solar Excellence</p>
                        <p className="text-muted mt-2">
                            We work with leading and trusted solar brands to ensure quality, performance, and reliability across every project.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { name: 'Waaree', logo: '/waaree-logo.png' },
                            { name: 'Reliance New Energy', logo: '/reliance-logo.png' },
                            { name: 'Tata Power Solar', logo: '/tata-logo.png' },
                            { name: 'Havells', logo: '/havells-logo.png' },
                            { name: 'Adani Solar', logo: '/adani-logo.png' },
                            { name: 'Deye', logo: '/deye-logo.png' },
                            { name: 'Hitachi Energy', logo: '/hitachi-logo.png' },
                            { name: 'Solis', logo: '/solis-logo.png' }
                        ].map((brand, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center min-h-[100px]"
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-16 object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="section container">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-semibold text-primary">{faq.question}</span>
                                    {openFAQ === index ? (
                                        <ChevronUp className="text-secondary flex-shrink-0" size={20} />
                                    ) : (
                                        <ChevronDown className="text-secondary flex-shrink-0" size={20} />
                                    )}
                                </button>
                                {openFAQ === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-muted">{faq.answer}</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-primary text-white">
                <div className="container max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Planning a solar installation or evaluating a solar investment?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Get expert consultation and calculate your potential savings
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Get a Solar EPC Consultation <ArrowRight size={18} />
                            </Link>
                            <Link to="/solar-roi" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Calculate Your Solar ROI
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SolarEPC;
