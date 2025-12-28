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
                description="Lathey Weigh Trix offers industrial digital scales designed for precise weight measurement, operational efficiency, and long-term reliability across manufacturing, warehousing, and quality-control environments. Built with robust components and precision sensors, our industrial scales deliver consistent accuracy even in high-usage industrial conditions."
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
                        <h2 className="text-3xl font-bold text-primary mb-6">Designed for Accuracy Where It Matters Most</h2>
                        <p className="text-muted text-lg mb-4">
                            In industrial workflows, inaccurate weighing can result in:
                        </p>
                        <ul className="text-muted text-lg space-y-2 text-left max-w-2xl mx-auto">
                            {problems.map((problem, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>{problem}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-muted text-lg mt-6">
                            Our industrial weighing scales are engineered to provide stable, repeatable measurements, helping businesses maintain accuracy at every stage of operation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Applications */}
            <section className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Applications Across Industries</h2>
                    <p className="text-muted text-lg mb-6">
                        Our industrial scales are suitable for a wide range of applications, including:
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
                    <h2 className="text-3xl font-bold text-primary mb-6">Types of Industrial Scales</h2>
                    <p className="text-muted text-lg mb-6">
                        We provide a range of industrial scale solutions, configured based on capacity, application, and environment:
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
                        Each solution is selected or engineered to meet specific operational requirements.
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
                        <h2 className="text-3xl font-bold text-primary mb-6">Installation, Calibration & Support</h2>
                        <p className="text-muted text-lg mb-6">
                            Our support extends beyond supply. We provide:
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
                            This ensures consistent performance and compliance over the life of the equipment.
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
                    <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Lathey Weigh Trix Industrial Scales?</h2>
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
                        <h2 className="text-3xl font-bold mb-4">Need an industrial scale solution tailored to your application?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Get expert consultation and technical specifications
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Request Industrial Scale Consultation <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Get Technical Specifications
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Scales;
