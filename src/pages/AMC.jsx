import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Shield, Clock, Wrench, HeadphonesIcon, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AMC = () => {
    const problems = [
        "Inaccurate weight readings",
        "Increased breakdown risk",
        "Operational delays",
        "Higher repair costs"
    ];

    const coverage = [
        {
            icon: Wrench,
            title: "Preventive Maintenance",
            description: "Regular inspections to identify and resolve issues before failure"
        },
        {
            icon: Activity,
            title: "Calibration & Accuracy Verification",
            description: "Ensures weighing systems maintain consistent and compliant performance"
        },
        {
            icon: Shield,
            title: "Corrective Maintenance",
            description: "Prompt resolution of faults and performance issues"
        },
        {
            icon: HeadphonesIcon,
            title: "Priority Service Support",
            description: "Faster response times for AMC customers"
        },
        {
            icon: Clock,
            title: "System Health Checks",
            description: "Evaluation of load cells, indicators, cabling, and structural components"
        }
    ];

    const equipment = [
        "Electronic weighbridges",
        "Industrial and platform scales",
        "Digital weighing systems and indicators"
    ];

    const benefits = [
        "Consistent weighing accuracy",
        "Reduced operational downtime",
        "Predictable maintenance costs",
        "Extended equipment lifespan",
        "Improved compliance and audit readiness"
    ];

    const whyChoose = [
        "In-depth understanding of weighing system performance",
        "Experienced service engineers and technical teams",
        "Structured maintenance schedules",
        "Reliable after-sales support"
    ];

    return (
        <div className="page-amc">
            <PageHeader
                title="Annual Maintenance Contracts for Uninterrupted Accuracy"
                description="Lathey Weigh Trix offers Annual Maintenance Contracts (AMC) designed to ensure the continued accuracy, reliability, and performance of industrial weighing systems. Our AMC services help businesses minimize downtime, maintain compliance, and extend the operational life of weighbridges and industrial scales."
            />

            {/* Why Maintenance Matters */}
            <section className="section bg-slate-50">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Why Maintenance Matters in Industrial Weighing</h2>
                        <p className="text-muted text-lg mb-4">
                            Over time, continuous usage, environmental conditions, and mechanical stress can affect weighing accuracy and system performance. Without regular maintenance, this can lead to:
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
                            Our weighbridge AMC services address these risks through scheduled maintenance and proactive support.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What Our AMC Covers */}
            <section className="section container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">What Our AMC Covers</h2>
                    <p className="text-muted text-lg max-w-3xl mx-auto">
                        Our Annual Maintenance Contracts are structured to provide complete peace of mind:
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {coverage.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card text-center"
                        >
                            <div className="inline-flex p-4 rounded-full bg-blue-50 text-secondary mb-4">
                                <item.icon size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                            <p className="text-muted">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Equipment Covered */}
            <section className="section bg-white">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Equipment Covered Under AMC</h2>
                        <p className="text-muted text-lg mb-6">
                            Our AMC services are available for:
                        </p>
                        <div className="space-y-3">
                            {equipment.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted text-lg mt-6">
                            Contracts can be tailored based on equipment type, usage intensity, and operational requirements.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Benefits of Choosing Our AMC Services</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                <span className="text-muted text-lg">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <section className="section bg-slate-50">
                <div className="container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Lathey Weigh Trix AMC?</h2>
                        <div className="space-y-3 mb-6">
                            {whyChoose.map((reason, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{reason}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-muted text-lg">
                            Our approach focuses on <strong>preventive care</strong> rather than reactive repairs, helping businesses operate without disruption.
                        </p>
                    </motion.div>
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
                        <h2 className="text-3xl font-bold mb-4">Looking to protect your investment and ensure reliable performance?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Get in touch to learn about our AMC plans and schedule a maintenance assessment
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Enquire About AMC Plans <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Schedule a Maintenance Assessment
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AMC;
