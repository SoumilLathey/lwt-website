import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Products.css';

const products = [
    {
        id: 1,
        title: "Heavy Duty Weighbridges",
        category: "Industrial",
        image: "/product-weighbridge.png",
        description: "Rugged, high-precision weighbridges designed for extreme industrial environments. Capacities up to 200 tons.",
        featured: true,
        link: "/weighbridges"
    },
    {
        id: 2,
        title: "Digital Platform Scales",
        category: "Precision",
        image: "/product-scale.png",
        description: "Stainless steel platform scales with advanced digital indicators for hygiene-sensitive industries.",
        featured: false,
        link: "/scales"
    },
    {
        id: 3,
        title: "Tank Weighing Systems",
        category: "Automation",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", // Fallback / placeholder for 3rd item to keep speed
        description: "Automated tank and hopper weighing modules for accurate inventory and batching control.",
        featured: false,
        link: "/automation"
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
                        Our Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-title"
                    >
                        Precision Weighing Solutions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="section-description"
                    >
                        From heavy-duty truck scales to laboratory precision balances, we engineer weighing systems that drive efficiency and accuracy for your business.
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

                <div className="text-center mt-12">
                    <Link to="/products" className="btn btn-outline">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
