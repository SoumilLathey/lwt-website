import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Products.css';

const products = [
    {
        id: 1,
        title: "Heavy-Duty Weighbridges",
        category: "Industrial Weighing",
        image: "/product-weighbridge.png",
        description: "Built for demanding industrial and logistics environments. Our industrial weighbridges deliver consistent precision for factories, warehouses, and transport hubs.",
        featured: true,
        link: "/weighbridges"
    },
    {
        id: 2,
        title: "Digital Platform Scales",
        category: "Precision Measurement",
        image: "/product-scale.png",
        description: "Precision measurement for controlled industrial operations. High-precision digital sensors with seamless workflow integration for faster operations.",
        featured: false,
        link: "/scales"
    },
    {
        id: 3,
        title: "AMC (Annual Maintenance Contract)",
        category: "Services",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        description: "Ensure accuracy. Minimize downtime. Extend equipment life. Our AMC services keep your weighing systems operating at peak performance.",
        featured: false,
        link: "/amc"
    }
];

const Products = () => {
    return (
        <section className="products-section">
            <div className="container">
                <div className="section-header">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-caption text-secondary"
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title"
                    >
                        Industrial Weighing Solutions Built for Accuracy & Durability
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="section-description"
                    >
                        In high-volume industrial environments, inaccurate weighing leads to <strong>financial loss, compliance issues, and operational inefficiencies</strong>. Our weighing systems are engineered to eliminate these risks through <strong>robust design and consistent accuracy</strong>.
                    </motion.p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="product-card"
                        >
                            <div className="product-image-container">
                                <img src={product.image} alt={product.title} className="product-image" />
                                {product.featured && (
                                    <span className="badge-featured">
                                        <Star size={10} fill="white" strokeWidth={0} style={{ display: 'inline', marginRight: '4px' }} />
                                        Best Seller
                                    </span>
                                )}
                            </div>
                            <div className="product-content">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-footer">
                                    <Link to={product.link} className="product-link">
                                        View Details <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center" style={{ marginTop: '3rem' }}>
                    <Link to="/products" className="btn btn-outline">
                        View All Weighing Solutions
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
