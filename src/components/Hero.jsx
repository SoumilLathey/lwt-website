import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sun, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-background">
                <video autoPlay loop muted playsInline className="hero-img">
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <div className="hero-text-box">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-subtitle"
                    >
                        <span className="hero-line"></span>
                        <span>Since 2000</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hero-title"
                    >
                        Precision <span className="text-secondary">Weighing</span> & Sustainable <span className="text-secondary">Energy</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hero-description"
                    >
                        Lathey Weigh Trix powers the future of industry with high-precision weighing solutions and advanced Solar EPC services. Engineering excellence for over two decades.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="hero-actions"
                    >
                        <Link to="/products" className="btn btn-primary">
                            Weighing Equipments <Scale size={18} />
                        </Link>
                        <Link to="/solar-epc" className="btn btn-outline">
                            Solar Solutions <Sun size={18} />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="hero-stats"
                >
                    <div className="stat-item">
                        <div className="flex items-center gap-2">
                            <h4>25+</h4>
                            <ArrowRight size={20} className="text-secondary opacity-50" />
                        </div>
                        <p>Years Experience</p>
                    </div>
                    <div className="stat-item">
                        <div className="flex items-center gap-2">
                            <h4>2k+</h4>
                            <ArrowRight size={20} className="text-secondary opacity-50" />
                        </div>
                        <p>Projects Delivered</p>
                    </div>
                    <div className="stat-item">
                        <div className="flex items-center gap-2">
                            <h4>100%</h4>
                            <ArrowRight size={20} className="text-secondary opacity-50" />
                        </div>
                        <p>Client Satisfaction</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
