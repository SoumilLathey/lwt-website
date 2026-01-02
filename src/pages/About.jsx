import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Award, Users, Target, History, Zap, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="page-about">
            <PageHeader
                title="About Us"
                description="Lathey Weigh Trix is a manufacturer of electronic weighbridges and a full-service solar EPC company, delivering reliable weighing systems and solar energy solutions for industrial and commercial applications. With over two decades of experience, we combine engineering expertise and modern technology to help businesses operate accurately, efficiently, and sustainably."
            />

            <section className="section container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-secondary text-lg font-semibold mb-2">Our Story</h2>
                        <h3 className="text-3xl font-bold text-primary mb-4">25+ Years of Engineering Excellence</h3>
                        <p className="text-muted mb-4">
                            Founded in 2000, Lathey Weigh Trix began as a specialized electronic weighbridge manufacturing company focused on accuracy, durability, and affordability. Over time, our capabilities expanded across a comprehensive range of industrial weighing solutions, including weighbridges (5–200 tonnes), digital indicators, load cells, and weighing automation systems.
                        </p>
                        <p className="text-muted">
                            As industries increasingly moved toward cleaner energy, we extended our engineering expertise into solar EPC services, offering complete solutions for solar rooftop installations and ground-mounted solar power systems. Today, we operate across both precision engineering and clean energy, supporting diverse industrial requirements.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section bg-white">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">What We Do</h2>
                        <p className="text-muted mb-6">Integrated Weighing & Solar EPC Solutions</p>
                        <p className="text-muted">
                            We provide end-to-end solutions across two core areas: <strong>Precision Weighing Systems</strong> and <strong>Solar EPC Services</strong>. All products are designed to meet international standards, ensuring consistent accuracy and long-term reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="card"
                        >
                            <h4 className="text-xl font-bold mb-3 text-primary">Precision Weighing Systems</h4>
                            <ul className="text-muted space-y-2">
                                <li>• Electronic weighbridges (5–200 tonnes)</li>
                                <li>• Digital indicators and load cells</li>
                                <li>• Platform scales and weighing automation</li>
                                <li>• AMC and maintenance services</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="card"
                        >
                            <h4 className="text-xl font-bold mb-3 text-primary">Solar EPC Services</h4>
                            <p className="text-muted mb-3">
                                As an Engineering, Procurement, and Construction (EPC) solar company, we manage the complete project lifecycle:
                            </p>
                            <ul className="text-muted space-y-2">
                                <li>• System design and engineering</li>
                                <li>• Equipment procurement</li>
                                <li>• Installation and commissioning</li>
                                <li>• Ongoing support, maintenance, and warranty assistance</li>
                            </ul>
                            <p className="text-muted mt-3">
                                Our solar solutions help organizations reduce energy costs while improving operational resilience.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Us?</h2>
                        <p className="text-muted">Reliable Solutions. Proven Engineering. Long-Term Value.</p>
                        <p className="text-muted mt-3">
                            Clients choose Lathey Weigh Trix for solutions that deliver accuracy, dependability, and sustained performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: History, title: "25+ Years Experience", desc: "Over two decades of industry expertise and proven engineering solutions." },
                            { icon: Target, title: "Engineering-Driven", desc: "<strong>Engineering-driven approach</strong> to every solution with advanced manufacturing technology." },
                            { icon: Users, title: "End-to-End Support", desc: "Complete lifecycle support from installation to maintenance." },
                            { icon: Award, title: "International Standards", desc: "Products designed to meet global quality and accuracy standards." },
                            { icon: Zap, title: "Cost-Effective", desc: "Solutions that deliver value without compromising on accuracy." },
                            { icon: Shield, title: "Long-Term Value", desc: "Reliable engineering built for sustained performance and durability." }
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

                    <div className="text-center mt-12 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-primary mb-4">Our Commitment</h3>
                        <p className="text-muted mb-3">We are committed to delivering:</p>
                        <ul className="text-muted space-y-2 text-left inline-block">
                            <li>• High-quality, performance-driven products</li>
                            <li>• Cost-effective solutions without compromising accuracy</li>
                            <li>• Responsive technical support and maintenance</li>
                            <li>• Long-term value through reliable engineering</li>
                        </ul>
                        <p className="text-muted mt-6 font-semibold">
                            For us, precision is not just a requirement—it is the standard we build by.
                        </p>
                    </div>

                    <div className="text-center mt-16 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-primary mb-4">Closing Statement</h3>
                        <p className="text-muted text-lg">
                            Lathey Weigh Trix continues to support industries with <strong>precision weighing systems</strong> and <strong>solar EPC solutions</strong> that enable <strong>efficient operations</strong> and a more sustainable future.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
