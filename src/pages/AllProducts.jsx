import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Scale, Cpu, Sun } from 'lucide-react';

const AllProducts = () => {
    const categories = [
        {
            title: "Weighbridges",
            icon: Truck,
            desc: "Pit & pitless type weighbridges for heavy logistics.",
            link: "/weighbridges",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Industrial Scales",
            icon: Scale,
            desc: "Platform, crane, and table-top scales for precision.",
            link: "/scales",
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Automation",
            icon: Cpu,
            desc: "Unmanned systems, boom barriers, and software.",
            link: "/automation",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Solar EPC",
            icon: Sun,
            desc: "Complete solar energy solutions and power plants.",
            link: "/solar-epc",
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];

    return (
        <div className="page-products">
            <PageHeader
                title="Our Products & Services"
                description="Explore our comprehensive range of weighing and energy solutions."
            />

            <section className="section container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {categories.map((cat, index) => (
                        <Link to={cat.link} key={index} className="block group">
                            <motion.div
                                className="card bg-white hover:bg-slate-50 border border-slate-100 flex items-center gap-6"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className={`p-4 rounded-full ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                                    <cat.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-blue-700 transition-colors">{cat.title}</h3>
                                    <p className="text-muted">{cat.desc}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AllProducts;
