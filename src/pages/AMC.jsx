import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Wrench, ClipboardCheck, Shield, Calendar } from 'lucide-react';

const AMC = () => {
    return (
        <div className="page-amc">
            <PageHeader
                title="AMC (Annual Maintenance Contracts)"
                description="Comprehensive maintenance services to keep your weighing equipment running at peak performance year-round."
            />

            <section className="section container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Complete Maintenance Solutions</h2>
                        <p className="text-muted text-lg leading-relaxed">
                            Our Annual Maintenance Contracts ensure your weighing equipment operates with maximum accuracy and reliability.
                            We provide comprehensive services including calibration, legal stamping, preventive maintenance, and emergency repairs
                            to minimize downtime and extend the life of your equipment.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Wrench,
                                title: "Regular Calibration",
                                desc: "Scheduled calibration services to ensure accuracy and compliance with industry standards."
                            },
                            {
                                icon: ClipboardCheck,
                                title: "Legal Stamping & Certification",
                                desc: "Official stamping and certification as per government regulations and legal metrology requirements."
                            },
                            {
                                icon: Shield,
                                title: "Preventive Maintenance",
                                desc: "Routine inspections and maintenance to prevent breakdowns and ensure optimal performance."
                            },
                            {
                                icon: Calendar,
                                title: "Priority Support",
                                desc: "Fast-track repair services and priority scheduling for AMC customers with minimal downtime."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-secondary">
                                    <item.icon size={40} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-primary mb-4">Why Choose Our AMC?</h3>
                        <ul className="space-y-3 text-muted">
                            <li className="flex items-start gap-3">
                                <span className="text-secondary font-bold">✓</span>
                                <span>Experienced technicians with 25+ years of industry expertise</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-secondary font-bold">✓</span>
                                <span>Genuine spare parts and components for all major brands</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-secondary font-bold">✓</span>
                                <span>Flexible AMC plans tailored to your business needs</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-secondary font-bold">✓</span>
                                <span>Comprehensive documentation and compliance support</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AMC;
