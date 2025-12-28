import React from 'react';
import { motion } from 'framer-motion';
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
                    <div className="positioning-label">WHAT WE DO</div>
                    <div className="positioning-grid">
                        <div className="positioning-left">
                            <h2 className="positioning-title">
                                Industrial Weighing Solutions Built for Accuracy & Durability
                            </h2>
                        </div>
                        <div className="positioning-right">
                            <p className="positioning-description">
                                In high-volume industrial environments, inaccurate weighing leads to financial loss, compliance issues, and operational inefficiencies. Our weighing systems are engineered to eliminate these risks through robust design and consistent accuracy.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Positioning;
