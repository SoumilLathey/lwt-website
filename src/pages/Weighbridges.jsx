import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Weighbridges = () => {
    const features = [
        {
            title: "High Load-Bearing Capacity",
            description: "Designed to withstand heavy vehicle movement without compromising accuracy"
        },
        {
            title: "Precision Load Cell Technology",
            description: "Ensures consistent and reliable weight measurement"
        },
        {
            title: "Rugged Structural Design",
            description: "Built for long service life and minimal deformation"
        },
        {
            title: "Digital Weight Indicators",
            description: "Clear, stable, and easy-to-read weight display"
        },
        {
            title: "Low Maintenance Design",
            description: "Optimized for durability and reduced operational downtime"
        }
    ];

    const types = [
        "Electronic weighbridges",
        "Pit-type and pitless weighbridges",
        "Modular and custom-engineered configurations"
    ];

    const applications = [
        "Manufacturing plants",
        "Logistics and transport hubs",
        "Warehouses and distribution centers",
        "Infrastructure and construction sites",
        "Mining and material handling operations"
    ];

    const services = [
        "Site assessment and technical guidance",
        "Professional installation and commissioning",
        "Calibration and accuracy verification",
        "Ongoing service support and maintenance"
    ];

    const whyChoose = [
        "Over two decades of engineering expertise",
        "Precision-manufactured systems built to international standards",
        "End-to-end support—from supply to after-sales service",
        "Proven performance across diverse industries"
    ];

    return (
        <div className="page-weighbridges">
            <PageHeader
                title="Precision Weighbridges for Industrial Accuracy"
                description="Lathey Weigh Trix designs and manufactures high-performance electronic weighbridges built to deliver accurate, reliable, and repeatable vehicle weighing across demanding industrial environments. Our weighbridges are engineered to handle heavy loads, continuous usage, and harsh operating conditions, making them ideal for industries where accuracy directly impacts cost control, compliance, and operational efficiency."
            />

            {/* Problem Statement */}
            <section className="section bg-slate-50">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Built for High-Load, High-Usage Environments</h2>
                        <p className="text-muted text-lg mb-4">
                            In industrial operations, inaccurate vehicle weighing can lead to:
                        </p>
                        <ul className="text-muted text-lg space-y-2 text-left max-w-2xl mx-auto">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Material loss and billing discrepancies</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Compliance and audit challenges</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Inefficient logistics and inventory control</span>
                            </li>
                        </ul>
                        <p className="text-muted text-lg mt-6">
                            Our industrial weighbridges are designed to eliminate these risks through robust construction, precision load cells, and stable digital systems.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Capacity Range */}
            <section className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Weighbridge Capacity Range</h2>
                    <p className="text-muted text-lg mb-6">
                        We manufacture and supply electronic weighbridges ranging from <strong>5 to 200 tonnes</strong>, suitable for a wide variety of applications, including:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {applications.map((app, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                <span className="text-muted">{app}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Key Features */}
            <section className="section bg-white">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Key Features</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                                    <h4 className="text-xl font-bold text-primary">{feature.title}</h4>
                                </div>
                                <p className="text-muted">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Types */}
            <section className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Types of Weighbridges</h2>
                    <p className="text-muted text-lg mb-6">
                        We offer weighbridge solutions tailored to different site and operational requirements, including:
                    </p>
                    <div className="space-y-3">
                        {types.map((type, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                <span className="text-muted text-lg">{type}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-muted text-lg mt-6">
                        Each system is configured based on site conditions, traffic volume, and operational needs.
                    </p>
                </motion.div>
            </section>

            {/* Installation & Support */}
            <section className="section bg-slate-50">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Installation & Support</h2>
                        <p className="text-muted text-lg mb-6">
                            Our services extend beyond manufacturing. We provide:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {services.map((service, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted">{service}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted text-lg">
                            For long-term reliability, we also offer <Link to="/amc" className="text-secondary font-semibold hover:underline">Annual Maintenance Contracts (AMC)</Link> to ensure uninterrupted performance.
                        </p>
                    </motion.div>
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
                    <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Lathey Weigh Trix Weighbridges?</h2>
                    <div className="space-y-3">
                        {whyChoose.map((reason, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                <span className="text-muted text-lg">{reason}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="section bg-primary text-white">
                <div className="container max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Looking for a reliable industrial weighbridge solution?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Get expert consultation tailored to your operational needs
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Get a Weighbridge Consultation <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Request Technical Specifications
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Weighbridges;
