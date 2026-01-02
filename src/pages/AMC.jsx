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
                description="Lathey Weigh Trix offers Annual Maintenance Contracts (AMC) designed to ensure the continued accuracy, reliability, and performance of industrial weighing systems."
                image="/images/amc-bg.jpg"
                imagePosition="center 70%"
            />

            {/* Why Maintenance Matters */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Why Maintenance Matters in Industrial Weighing</h2>
                        <p className="section-desc">
                            Continuous usage and environmental conditions can affect weighing accuracy. Without regular maintenance, risks increase significantly.
                        </p>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
                            <h4 className="text-xl font-bold text-primary mb-4">Risks of Neglected Maintenance:</h4>
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

            {/* What Our AMC Covers */}
            <section className="section section-white">
                <div className="container">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-primary">What Our AMC Covers</h2>
                        <p className="section-desc">
                            Our Annual Maintenance Contracts are structured to provide complete peace of mind.
                        </p>
                    </div>
                    <div className="card-grid">
                        {coverage.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="inline-flex p-3 rounded-lg bg-blue-50 text-secondary mb-4 w-fit">
                                    <item.icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold text-primary">{item.title}</h4>
                                <p className="text-muted">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Covered */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Equipment Covered Under AMC</h2>
                        <p className="section-desc">
                            Contracts can be tailored based on equipment type and usage intensity.
                        </p>
                        <div className="grid-2">
                            {equipment.map((item, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section section-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Benefits of Our AMC Services</h2>
                        <p className="section-desc">Maximize uptime and ensure compliance.</p>
                        <div className="grid-2">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="list-item">
                                    <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                                    <span className="text-muted text-lg">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section section-light">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-primary">Why Choose Lathey Weigh Trix AMC?</h2>
                        <p className="section-desc">
                            Our preventive care approach helps businesses operate without disruption.
                        </p>
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
                        <h2 className="text-3xl font-bold mb-4 text-white">Looking to protect your investment?</h2>
                        <p className="text-lg mb-8 opacity-90 text-white max-w-2xl mx-auto">
                            Get in touch to learn about our AMC plans and schedule a maintenance assessment
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
                                Enquire About AMC <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                                Schedule Assessment
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AMC;
