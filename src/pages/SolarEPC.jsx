import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Sun, Check, Zap, Home, Factory } from 'lucide-react';

const SolarEPC = () => {
    return (
        <div className="page-solar">
            <PageHeader
                badge="Empanelled Channel Partner: MNRE & UPNEDA"
                title="Solar EPC Services"
                description="End-to-end solar energy solutions for industrial, commercial, and residential needs."
            />

            <section className="section container">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Concept to Commissioning</h2>
                        <p className="text-muted text-lg mb-6">
                            Lathey Weigh Trix provides comprehensive Engineering, Procurement, and Construction (EPC) services for solar power plants.
                            We handle everything from site feasibility analysis to system design, installation, and grid synchronization.
                        </p>
                        <ul className="space-y-4">
                            {["Site Survey & Feasibility Study", "Customized System Design & Engineering", "Procurement of Tier-1 Solar Modules", "Installation & Commissioning", "Operation & Maintenance (O&M)"].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <Check className="text-green-500" size={20} />
                                    <span className="font-medium text-primary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-amber-100 rounded-2xl p-1 h-80 flex items-center justify-center">
                            <span className="text-amber-600 font-semibold">Solar Installation Image</span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Factory, title: "Industrial Rooftop", desc: "Reduce operational costs with high-capacity rooftop solar plants for factories." },
                        { icon: Zap, title: "Ground Mounted", desc: "Large scale solar parks and ground-mounted systems for utility power." },
                        { icon: Home, title: "Residential Solutions", desc: "Sustainable energy for modern homes with net-metering support." }
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            className="card text-center hover:border-amber-400"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="inline-flex p-4 rounded-full bg-amber-50 text-amber-500 mb-6">
                                <service.icon size={36} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                            <p className="text-muted">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Authorised Reseller Section */}
            <section className="section" style={{ background: '#F8FAFC', paddingTop: '60px', paddingBottom: '60px' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#24528F', marginBottom: '1rem' }}>
                            Authorised Reseller
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1.1rem' }}>
                            Trusted partners in solar excellence
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        alignItems: 'center',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {[
                            { name: 'Waaree', logo: '/waaree-logo.png' },
                            { name: 'Reliance New Energy', logo: '/reliance-logo.png' },
                            { name: 'Tata Power Solar', logo: '/tata-logo.png' },
                            { name: 'Havells', logo: '/havells-logo.png' },
                            { name: 'Adani Solar', logo: '/adani-logo.png' }
                        ].map((brand, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '120px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolarEPC;
