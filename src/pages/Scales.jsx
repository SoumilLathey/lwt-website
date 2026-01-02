import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Scales = () => {
    const features = [
        {
            title: "High-Precision Load Sensors",
            description: "Ensure accurate and repeatable weight readings"
        },
        {
            title: "Digital Weight Indicators",
            description: "Clear, stable, and easy-to-read displays"
        },
        {
            title: "Robust Industrial Construction",
            description: "Designed to withstand continuous use and demanding environments"
        },
        {
            title: "Fast Response Time",
            description: "Enables efficient weighing and faster operational flow"
        },
        {
            title: "Low Maintenance Design",
            description: "Reduces downtime and long-term maintenance costs"
        }
    ];

    const problems = [
        "Production inconsistencies",
        "Inventory mismatches",
        "Quality control issues",
        "Operational delays"
    ];

    const applications = [
        "Manufacturing and assembly lines",
        "Warehousing and logistics",
        "Packaging and dispatch operations",
        "Quality control and inspection processes",
        "Material handling and processing units"
    ];

    const types = [
        "Digital platform scales",
        "Floor-mounted industrial scales",
        "Custom-configured weighing systems"
    ];

    const services = [
        "Installation and setup assistance",
        "Calibration and accuracy verification",
        "Ongoing technical support",
        "Preventive maintenance through Annual Maintenance Contracts (AMC)"
    ];

    const whyChoose = [
        "Precision-engineered industrial weighing solutions",
        "Proven reliability across diverse industrial applications",
        "Skilled technical and service support teams",
        "End-to-end lifecycle support"
    ];

    return (
        <div className="page-scales">
            <PageHeader
                title="Industrial Scales for Accurate & Efficient Operations"
                description="Lathey Weigh Trix offers industrial digital scales designed for precise weight measurement, operational efficiency, and long-term reliability across manufacturing, warehousing, and quality-control environments."
                image="/images/scales-bg.jpg"
            />

            {/* Problem Statement */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Designed for Accuracy Where It Matters Most</h2>
                        <p className="section-desc">
                            In industrial workflows, inaccurate weighing can result in production inconsistencies and operational delays.
                        </p>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
                            <h4 className="text-xl font-bold text-primary mb-4">Common Risks of Inaccurate Weighing:</h4>
                            <ul className="space-y-2">
                                {problems.map((problem, index) => (
                                    <li key={index} className="list-item">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span className="text-muted">{problem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Applications */}
            <section className="section section-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Applications Across Industries</h2>
                        <p className="section-desc">
                            Our industrial scales are suitable for a wide range of applications.
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
                        <p className="section-desc">Engineered to provide stable, repeatable measurements.</p>
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
                        <h2 className="text-3xl font-bold text-primary">Types of Industrial Scales</h2>
                        <p className="section-desc">
                            We provide a range of solution configurations based on capacity, application, and environment.
                        </p>
                        <div className="grid-2">
                            {types.map((type, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{type}</span>
                                </div>
                            ))}
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
                        <h2 className="text-3xl font-bold text-primary">Installation, Calibration & Support</h2>
                        <p className="section-desc">
                            Our support extends beyond supply to ensure consistent performance.
                        </p>
                        <div className="grid-2">
                            {services.map((service, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{service}</span>
                                </div>
                            ))}
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
                        <p className="section-desc">Precision-engineered industrial weighing solutions.</p>
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
                        <h2 className="text-3xl font-bold mb-4 text-white">Need an industrial scale solution tailored to your application?</h2>
                        <p className="text-lg mb-8 opacity-90 text-white max-w-2xl mx-auto">
                            Get expert consultation and technical specifications
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Request Consultation <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Technical Specs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Scales;
