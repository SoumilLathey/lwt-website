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
                        Engineering Solutions That Power Efficiency
                    </h2>
                    <p className="positioning-description">
                        We operate at the intersection of precision engineering and clean energy, serving industries that demand reliability, compliance, and performance at scale.
                    </p>

                    <div className="positioning-benefits">
                        <p className="benefits-intro">Our solutions are designed to:</p>
                        <div className="benefit-item">
                            <CheckCircle className="benefit-icon" size={20} />
                            <span>Improve operational accuracy</span>
                        </div>
                        <div className="benefit-item">
                            <CheckCircle className="benefit-icon" size={20} />
                            <span>Reduce energy and operational costs</span>
                        </div>
                        <div className="benefit-item">
                            <CheckCircle className="benefit-icon" size={20} />
                            <span>Support long-term business sustainability</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Positioning;
