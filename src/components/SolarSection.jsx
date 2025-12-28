import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf, Battery, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SolarSection.css';

const SolarSection = () => {
    return (
        <section className="solar-section">
            <div className="solar-overlay-shape"></div>
            <div className="container solar-container">
                <div className="solar-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="solar-badge"
                    >
                        <Sun size={16} /> Solar EPC Solutions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="solar-title"
                    >
                        Clean Energy Solutions for <span className="text-secondary">Long-Term Cost Savings</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="solar-description"
                    >
                        We provide end-to-end solar EPC services, covering design, engineering, procurement, installation, and support for solar rooftop systems and ground-mounted solar power plants. Our solar solutions are designed for businesses looking to reduce electricity costs, improve energy reliability, and transition to sustainable power.
                    </motion.p>

                    <div className="benefits-grid">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="benefit-item"
                        >
                            <div className="benefit-icon"><Leaf size={24} /></div>
                            <div className="benefit-text">
                                <h4>Eco-Friendly</h4>
                                <p>Reduce carbon footprint with clean, renewable solar energy</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="benefit-item"
                        >
                            <div className="benefit-icon"><Battery size={24} /></div>
                            <div className="benefit-text">
                                <h4>Cost Efficient</h4>
                                <p>Lower long-term energy expenses with optimized solar power systems</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="benefit-item"
                        >
                            <div className="benefit-icon"><Zap size={24} /></div>
                            <div className="benefit-text">
                                <h4>High Performance</h4>
                                <p>Engineered for maximum energy generation and durability</p>
                            </div>
                        </motion.div>
                    </div>

                    <Link to="/solar-epc" className="btn btn-secondary">
                        Get Expert Consultation <ArrowRight size={16} />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="solar-image-wrapper"
                >
                    <p className="solar-visual-text">
                        Power your operations with scalable, reliable solar energy solutions designed to perform efficiently over decades.
                    </p>
                    <img src="/solar-epc.png" alt="Rooftop Solar Installation" className="solar-image" />
                </motion.div>
            </div>
        </section>
    );
};

export default SolarSection;
