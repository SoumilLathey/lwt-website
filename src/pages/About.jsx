import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Award, Users, Target, History } from 'lucide-react';

const About = () => {
    return (
        <div className="page-about">
            <PageHeader
                title="About Us"
                description="Leading the industry with precision weighing solutions and sustainable energy since 1995."
            />

            <section className="section container">
                <div className="grid grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-secondary text-lg font-semibold mb-2">Our Story</h2>
                        <h3 className="text-3xl font-bold text-primary mb-4">Over 25 Years of Engineering Excellence</h3>
                        <p className="text-muted mb-4">
                            Lathey Weigh Trix was established in 1995 with a vision to revolutionize the weighing industry in India.
                            Starting as a small manufacturing unit, we have grown into a premier provider of industrial weighing
                            solutions and recently expanded into the renewable energy sector with our Solar EPC division.
                        </p>
                        <p className="text-muted">
                            Our journey is defined by a relentless pursuit of quality and innovation. We understand that in industry,
                            precision is not just a requirement—it's the foundation of trust. That's why thousands of clients
                            across India trust LWT for their critical weighing and energy needs.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Placeholder for About Image, using a colored block for now if image missing */}
                        <div className="rounded-lg overflow-hidden shadow-xl bg-slate-200 h-80 flex items-center justify-center">
                            <span className="text-muted">Office / Factory Image</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Us?</h2>
                        <p className="text-muted">We don't just deliver products; we deliver reliability, efficiency, and peace of mind.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: History, title: "25+ Years", desc: "Decades of industry experience backend by expert engineering." },
                            { icon: Target, title: "High Precision", desc: "State-of-the-art technology ensuring 99.9% accuracy." },
                            { icon: Users, title: "Client Focus", desc: "Dedicated support and customized solutions for every client." },
                            { icon: Award, title: "Certified Quality", desc: "ISO 9001:2015 certified manufacturing processes." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="card text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="inline-flex p-4 rounded-full bg-blue-50 text-secondary mb-4">
                                    <item.icon size={32} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-muted text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
