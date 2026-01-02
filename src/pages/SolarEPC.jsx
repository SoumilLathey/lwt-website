import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SolarPopup from '../components/SolarPopup';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SolarEPC.css';
import { solarSolutions } from '../data/solarSolutions';

const SolarEPC = () => {


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

    const whyChoose = [
        { text: "End-to-end EPC expertise under one roof" },
        { text: "Engineering-driven system design" },
        { text: "Use of high-quality, trusted solar components" },
        { text: "Professional installation and commissioning" },
        { text: "Long-term support and maintenance capability" }
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
            answer: "The required space depends on the plant size. On average, 1 kW of solar capacity requires 30–40 sq. ft. of shadow-free rooftop area."
        },
        {
            question: "How long does it take to install a solar power system?",
            answer: "Most rooftop solar installations are completed within 2–3 days (upto 10KW), depending on system size, site readiness, and approvals."
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
                image="/images/solar-farm-bg.jpg"
            />

            {/* Concept to Commissioning - Text Section */}
            <section className="section bg-white">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Concept to Commissioning</h2>
                        <h3 className="text-xl font-semibold text-secondary mb-6">Complete Solar EPC Execution</h3>
                        <p className="text-slate-600 text-lg leading-loose mb-8">
                            We manage the entire solar project lifecycle to ensure smooth execution, technical accuracy, and dependable outcomes.
                        </p>
                        <p className="font-bold text-slate-800 mb-8 text-lg">Our Solar EPC services include:</p>
                    </motion.div>

                    <ul className="list-none space-y-10">
                        {epcServices.map((service, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8"
                            >
                                {/* Custom Bullet Point */}
                                <span className="absolute left-0 top-[0.6rem] w-3 h-3 bg-secondary rounded-full"></span>

                                <h4 className="text-xl font-bold text-slate-800 mb-3 leading-relaxed">{service.title}</h4>
                                <p className="text-slate-600 text-lg leading-loose">
                                    {service.description}
                                </p>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Solar Solutions We Offer */}
            <section className="section bg-slate-50">
                <div className="container" style={{ maxWidth: '1280px', margin: 'auto', padding: '40px 24px' }}>
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold text-primary mb-2">Solar Solutions We Offer</h2>
                        <p className="text-sm text-muted">Click on any solution to learn more</p>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '40px',
                            alignItems: 'stretch'
                        }}
                        className="solar-grid"
                    >
                        {solarSolutions.map((solution, index) => (
                            <Link to={`/solar-epc/${solution.id}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="solar-card group relative cursor-pointer transform transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
                                    style={{
                                        borderRadius: '16px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                        background: '#ffffff'
                                    }}
                                >
                                    {/* Background Image */}
                                    <div className="overflow-hidden rounded-t-2xl">
                                        <img
                                            src={solution.heroImage}
                                            alt={solution.title}
                                            className="w-full transition-transform duration-500 group-hover:scale-105"
                                            style={{
                                                height: '260px',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                    </div>

                                    {/* White Content Section Below Image */}
                                    <div
                                        style={{
                                            padding: '24px',
                                            background: '#ffffff',
                                            borderRadius: '0 0 16px 16px',
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div className="mb-4 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                            {React.createElement(solution.icon, {
                                                size: 24,
                                                className: "text-[#005f99]" // Using primary blue color directly or use text-primary if defined in CSS
                                            })}
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: '22px',
                                                fontWeight: '700',
                                                marginBottom: '8px',
                                                color: '#0f172a'
                                            }}
                                        >
                                            {solution.title}
                                        </h3>

                                        <p
                                            style={{
                                                fontSize: '15px',
                                                color: '#475569',
                                                lineHeight: '1.6',
                                                marginBottom: '16px',
                                                flex: 1
                                            }}
                                        >
                                            {solution.subtitle}
                                        </p>

                                        <div
                                            className="transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: '#f59e0b',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 'auto'
                                            }}
                                        >
                                            <ArrowRight size={18} color="white" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
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
                                <span className="text-muted text-lg">{reason.text}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted text-lg">
                        We focus on delivering solar solutions that perform consistently over time, not just installations.
                    </p>
                </motion.div>
            </section>



            {/* Authorised Reseller */}
            <section className="section bg-slate-50 overflow-hidden">
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
                </div>

                <div className="relative w-full overflow-hidden py-8">
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

                    <div className="flex justify-center">
                        <motion.div
                            className="flex gap-24 items-center w-max"
                            animate={{
                                x: [0, -2688]
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear"
                                }
                            }}
                        >
                            {/* Triple set of logos for extra smooth infinite loop */}
                            {[...Array(3)].map((_, setIndex) => (
                                <div key={setIndex} className="flex gap-24">
                                    {[
                                        { name: 'Brand 1', logo: '/brands/brand-1.png' },
                                        { name: 'Brand 2', logo: '/brands/brand-2.png' },
                                        { name: 'Brand 3', logo: '/brands/brand-3.png' },
                                        { name: 'Brand 4', logo: '/brands/brand-4.png' },
                                        { name: 'Brand 5', logo: '/brands/brand-5.png' },
                                        { name: 'Brand 6', logo: '/brands/brand-6.png' },
                                        { name: 'Brand 7', logo: '/brands/brand-7.png' },
                                        { name: 'Brand 8', logo: '/brands/brand-8.png' }
                                    ].map((brand, index) => (
                                        <div
                                            key={`${setIndex}-${index}`}
                                            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center h-[140px] w-[240px] flex-shrink-0"
                                        >
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="h-[90px] w-[180px] object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            {/* FAQs */}
            <section className="section container">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-8 text-center">Recently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-lg shadow-sm border border-slate-100 p-6"
                            >
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-slate-800">Q. {faq.question}</h3>
                                </div>

                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
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
