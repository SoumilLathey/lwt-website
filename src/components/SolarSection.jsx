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
                        Powering Industries with <span className="text-secondary">Clean Energy</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="solar-description"
                    >
                        We provide end-to-end solar power solutions (EPC) tailored for industrial and commercial excellence. From design to grid integration, we ensure maximum efficiency and ROI.
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
                                <p>Reduce carbon footprint significantly.</p>
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
                                <h4>Cost Savings</h4>
                                <p>Drastically cut electricity bills.</p>
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
                                <h4>High Efficiency</h4>
                                <p>Tier-1 PV modules & inverters.</p>
                            </div>
                        </motion.div>
                    </div>

                    <Link to="/solar-epc" className="btn btn-secondary">
                        Get Solar Evaluation <ArrowRight size={16} />
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="solar-image-wrapper"
                >
                    <img src="/solar-epc.png" alt="Rooftop Solar Installation" className="solar-image" />
                </motion.div>
            </div>
        </section>
    );
};

export default SolarSection;
