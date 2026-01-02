import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowRight } from 'lucide-react';
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
                        We provide end-to-end solar EPC services, covering design, engineering, procurement, installation, and support for solar rooftop systems and ground-mounted solar power plants.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="solar-description"
                        style={{ marginTop: '1rem', fontWeight: '600' }}
                    >
                        Our solar solutions are designed for businesses looking to:
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="solar-benefits-list"
                    >
                        <li>Reduce electricity costs</li>
                        <li>Improve energy reliability</li>
                        <li>Transition to sustainable power</li>
                    </motion.ul>



                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                        <Link to="/solar-epc" className="btn btn-secondary">
                            Get Expert Consultation <ArrowRight size={16} />
                        </Link>
                        <Link to="/solar-roi" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#cbd5e1',
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.target.style.color = '#f59e0b'}
                            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="9" y2="15"></line>
                                <line x1="15" y1="9" x2="15" y2="15"></line>
                                <line x1="9" y1="12" x2="15" y2="12"></line>
                            </svg>
                            Calculate Your Solar ROI
                        </Link>
                    </div>
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
