import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './Positioning.css';

const Positioning = () => {
    return (
        <section className="positioning-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="positioning-content"
                >
                    <h2 className="positioning-title">
                        Engineering Solutions That <span className="text-secondary">Power Efficiency</span>
                    </h2>
                    <p className="positioning-description">
                        We operate at the intersection of <strong>precision engineering</strong> and <strong>clean energy</strong>, serving industries that demand reliability, compliance, and performance at scale.
                    </p>

                    <div className="positioning-benefits">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="benefit-item"
                        >
                            <CheckCircle className="benefit-icon" size={24} />
                            <span>Improve operational accuracy</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="benefit-item"
                        >
                            <CheckCircle className="benefit-icon" size={24} />
                            <span>Reduce energy and operational costs</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="benefit-item"
                        >
                            <CheckCircle className="benefit-icon" size={24} />
                            <span>Support long-term business sustainability</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Positioning;
