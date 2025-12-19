import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Cpu, Server, ShieldCheck, Activity } from 'lucide-react';

const Automation = () => {
    return (
        <div className="page-automation">
            <PageHeader
                title="Industrial Automation"
                description="Smart solutions to streamline your weighing operations and enhance efficiency."
            />

            <section className="section container">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-primary mb-6">Unmanned Weighbridge Systems</h2>
                        <p className="text-muted text-lg leading-relaxed">
                            Our automated weighing systems eliminate manual intervention, reducing errors and fraud.
                            Complete with RFID integration, Boom Barriers, and Traffic Lights, we ensure a seamless
                            weighing process for your logistics.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: Cpu, title: "RFID Integration", desc: "Automatic vehicle identification for secure and fast processing." },
                            { icon: Server, title: "Data Management Software", desc: "Centralized cloud-based logging and reporting." },
                            { icon: ShieldCheck, title: "Boom Barriers", desc: "Physical access control synchronized with weighing status." },
                            { icon: Activity, title: "Surveillance Cameras", desc: "Image capture of vehicle and license plate during weighing." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-secondary">
                                    <item.icon size={40} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Automation;
