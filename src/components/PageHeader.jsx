import React from 'react';
import { motion } from 'framer-motion';
import './PageHeader.css';

const PageHeader = ({ title, description, image = "/hero-bg.png" }) => {
    return (
        <div className="page-header">
            <div className="page-header-bg">
                <img src={image} alt={title} className="page-header-img" />
                <div className="page-header-overlay"></div>
            </div>
            <div className="page-header-content">
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
