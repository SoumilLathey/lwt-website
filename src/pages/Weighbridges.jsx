import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Weighbridges = () => {
    const products = [
        {
            title: "Pit Type Weighbridge",
            desc: "Ideal for areas with limited space. The platform is flush with the ground level, allowing easy movement of vehicles.",
            features: ["Space Saving", "Easy Vehicle Movement", "Heavy Duty Construction"],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" // Placeholder
        },
        {
            title: "Pitless Type Weighbridge",
            desc: "Requires less civil work and is easier to maintain. The platform is elevated above ground level.",
            features: ["Low Civil Cost", "Easy Maintenance", "No Water Logging Issues"],
            image: "https://images.unsplash.com/photo-1565514020176-db76ae427cb0?auto=format&fit=crop&q=80&w=600" // Placeholder
        },
        {
            title: "Mobile Weighbridge",
            desc: "Portable solution effectively used for temporary sites. No foundation required, set up in hours.",
            features: ["Portable", "Quick Installation", "Foundationless"],
            image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=600" // Placeholder
        }
    ];

    return (
        <div className="page-weighbridges">
            <PageHeader
                title="Industrial Weighbridges"
                description="Heavy-duty weighing solutions engineered for durability and precision."
            />

            <section className="section container">
                <div className="grid gap-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex-1">
                                <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-80 w-full relative group">
                                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                                        <span className="text-muted">Image: {product.title}</span>
                                    </div>
                                    {/* <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> */}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-primary mb-4">{product.title}</h3>
                                <p className="text-muted mb-6 text-lg">{product.desc}</p>
                                <ul className="space-y-3">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <CheckCircle className="text-secondary" size={20} />
                                            <span className="text-primary font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn btn-primary mt-8">Enquire Now</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Weighbridges;
