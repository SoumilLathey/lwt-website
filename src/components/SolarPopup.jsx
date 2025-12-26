import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SolarPopup.css';

const SolarPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 1 second when component mounts
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="popup-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Popup Modal */}
                    <motion.div
                        className="popup-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        {/* Close Button */}
                        <button className="popup-close" onClick={handleClose}>
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="popup-header">
                            <div className="popup-logo">
                                <span style={{ color: '#24528F', fontWeight: '900', fontSize: '32px', fontFamily: 'Outfit, sans-serif' }}>LWT</span>
                                <span style={{ color: '#94a3b8', margin: '0 12px', fontWeight: '300', fontSize: '32px' }}>|</span>
                                <span style={{ color: '#24528F', fontWeight: '600', fontSize: '24px', fontFamily: 'Outfit, sans-serif' }}>Lathey Weigh Trix</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="popup-content">
                            {/* Solar Icon */}
                            <div className="popup-icon">
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                    {/* Sun */}
                                    <circle cx="40" cy="40" r="20" fill="#F59E0B" />
                                    <path d="M40 15 L40 25 M40 55 L40 65 M15 40 L25 40 M55 40 L65 40 M22 22 L28 28 M52 52 L58 58 M22 58 L28 52 M52 28 L58 22" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                                    {/* Solar Panel */}
                                    <rect x="50" y="50" width="50" height="30" rx="2" fill="#1e40af" />
                                    <path d="M55 50 L55 80 M65 50 L65 80 M75 50 L75 80 M85 50 L85 80 M95 50 L95 80" stroke="#60a5fa" strokeWidth="1.5" />
                                    <path d="M50 60 L100 60 M50 70 L100 70" stroke="#60a5fa" strokeWidth="1.5" />
                                    {/* Plant */}
                                    <ellipse cx="30" cy="95" rx="15" ry="8" fill="#22c55e" opacity="0.6" />
                                    <path d="M30 85 Q25 75 20 70 M30 85 Q35 75 40 70" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                    <path d="M30 85 L30 95" stroke="#16a34a" strokeWidth="3" />
                                </svg>
                            </div>

                            {/* Scheme Title */}
                            <h2 className="popup-title">PM Surya Ghar: Muft Bijli Yojna</h2>
                            <h3 className="popup-title-hindi">मुफ्त बिजली योजना</h3>

                            {/* Description */}
                            <p className="popup-description">
                                Get government subsidy for solar installation
                            </p>

                            {/* CTA */}
                            <div className="popup-cta">
                                <span className="popup-cta-text">To know more</span>
                                <Link to="/contact" className="popup-btn" onClick={handleClose}>
                                    Enquire Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SolarPopup;
