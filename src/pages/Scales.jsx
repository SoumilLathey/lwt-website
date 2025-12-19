import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';

const Scales = () => {
    const scales = [
        { name: "Platform Scales", desc: "Heavy duty platform scales for varied industrial applications.", capacity: "Up to 5 Ton" },
        { name: "Table Top Scales", desc: "Compact high-precision scales for detailed weighing.", capacity: "Up to 50 Kg" },
        { name: "Crane Scales", desc: "Robust hanging scales for lifting and weighing simultaneously.", capacity: "Up to 30 Ton" },
        { name: "Jewellery Scales", desc: "Ultra-precision scales for precious metals.", capacity: "0.01g Accuracy" },
        { name: "Counter Scales", desc: "Retail and shop counters weighing solutions.", capacity: "Up to 30 Kg" },
        { name: "Piece Counting Scales", desc: "Calculates quantity based on weight for inventory management.", capacity: "Custom" }
    ];

    return (
        <div className="page-scales">
            <PageHeader
                title="Industrial Scales"
                description="Precision digital scales for every industry requirement."
            />

            <section className="section container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scales.map((scale, index) => (
                        <motion.div
                            key={index}
                            className="card group hover:border-secondary transition-colors"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="h-48 bg-slate-100 rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-muted">Image: {scale.name}</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{scale.name}</h3>
                            <p className="text-muted mb-4 text-sm">{scale.desc}</p>
                            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                                {scale.capacity}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Scales;
