import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Weighbridges.css';

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
                description="Lathey Weigh Trix designs and manufactures high-performance electronic weighbridges built to deliver accurate, reliable, and repeatable vehicle weighing across demanding industrial environments."
                image="/images/weighbridge-bg.jpg"
            />

            {/* Problem Statement */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Built for High-Load, High-Usage Environments</h2>
                        <p className="section-desc">
                            In industrial operations, inaccurate vehicle weighing can lead to material loss, compliance issues, and inefficiency.
                        </p>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
                            <h4 className="text-xl font-bold text-primary mb-4">Common Risks of Poor Weighing:</h4>
                            <ul className="space-y-2">
                                <li className="list-item">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span className="text-muted">Material loss and billing discrepancies</span>
                                </li>
                                <li className="list-item">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span className="text-muted">Compliance and audit challenges</span>
                                </li>
                                <li className="list-item">
                                    <span className="text-red-500 font-bold">•</span>
                                    <span className="text-muted">Inefficient logistics and inventory control</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Capacity Range */}
            <section className="section section-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Weighbridge Capacity Range</h2>
                        <p className="section-desc">
                            We manufacture and supply electronic weighbridges ranging from <strong>5 to 200 tonnes</strong>, suitable for a wide variety of applications.
                        </p>
                        <div className="grid-2">
                            {applications.map((app, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{app}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Features */}
            <section className="section section-light">
                <div className="container">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-primary">Key Features</h2>
                        <p className="section-desc">Engineered for accuracy, durability, and ease of use.</p>
                    </div>
                    <div className="card-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={24} />
                                    <h4 className="text-xl font-bold text-primary m-0">{feature.title}</h4>
                                </div>
                                <p className="text-muted">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Types */}
            <section className="section section-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Types of Weighbridges</h2>
                        <p className="section-desc">
                            We offer weighbridge solutions tailored to different site and operational requirements.
                        </p>

                        <div className="flex flex-col gap-8">
                            <div className="weighbridge-type-card">
                                <div className="weighbridge-image">
                                    <img src="/images/pitless-weighbridge.jpg" alt="Pitless Electronic Weighbridge Installation" />
                                </div>

                                <div className="weighbridge-content">
                                    <span className="badge">Actual Site Installation</span>
                                    <h4>Pitless Electronic Weighbridges</h4>
                                    <p>
                                        Pitless weighbridges are installed above ground level, offering easy maintenance,
                                        better drainage, and faster installation. They are ideal for industries requiring frequent
                                        cleaning and inspection.
                                    </p>
                                    <ul className="list-disc pl-5">
                                        <li>Easy maintenance & cleaning</li>
                                        <li>Superior drainage system</li>
                                        <li>Faster site installation</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="weighbridge-type-card">
                                <div className="weighbridge-image">
                                    <img src="/images/pit-type-weighbridge.png" alt="Pit Type Weighbridge Installation" />
                                </div>

                                <div className="weighbridge-content">
                                    <span className="badge">Actual Site Installation</span>
                                    <h4>Pit-Type Weighbridges</h4>
                                    <p>
                                        Pit-type weighbridges are installed level with the ground, making them ideal for sites with limited space where vehicles need to move freely across the weighing area from multiple directions.
                                    </p>

                                    <ul className="list-disc pl-5">
                                        <li>Flush ground installation</li>
                                        <li>Ideal for space-constrained sites</li>
                                        <li>Heavy-duty industrial design</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Installation & Support */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Installation & Support</h2>
                        <p className="section-desc">
                            Our services extend beyond manufacturing. We provide comprehensive support throughout the lifecycle of your weighing system.
                        </p>

                        <div className="grid-2">
                            {services.map((service, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{service}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-white p-6 rounded-lg border-l-4 border-secondary shadow-sm">
                            <p className="text-muted text-lg m-0">
                                For long-term reliability, we also offer <Link to="/amc" className="text-secondary font-semibold hover:underline">Annual Maintenance Contracts (AMC)</Link> to ensure uninterrupted performance.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Why Choose Lathey Weigh Trix?</h2>
                        <p className="section-desc">Proven expertise and commitment to quality.</p>

                        <div className="grid-2">
                            {whyChoose.map((reason, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{reason}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-primary text-white text-center">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4 text-white">Looking for a reliable industrial weighbridge solution?</h2>
                        <p className="text-lg mb-8 opacity-90 text-white max-w-2xl mx-auto">
                            Get expert consultation tailored to your operational needs
                        </p>
                        <div className="flex justify-center">
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
