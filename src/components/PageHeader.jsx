import React from 'react';
import { motion } from 'framer-motion';
import './PageHeader.css';

const PageHeader = ({ title, description, badge, image = "/hero-bg.png", imagePosition = "center" }) => {
    return (
        <div className="page-header">
            <div className="page-header-bg">
                <img src={image} alt={title} className="page-header-img" style={{ objectPosition: imagePosition }} />
                <div className="page-header-overlay"></div>
            </div>
            <div className="page-header-content">
                {badge && (
                    <motion.div
                        className="page-header-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            borderRadius: '8px',
                            color: '#F59E0B',
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {badge}
                    </motion.div>
                )}
                <motion.h1
                    className="page-header-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        className="page-header-desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
