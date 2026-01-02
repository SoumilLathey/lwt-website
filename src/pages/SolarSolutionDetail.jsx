import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Sun, ArrowLeft, ArrowRight } from 'lucide-react';
import { solarSolutions } from '../data/solarSolutions';
import PageHeader from '../components/PageHeader';

const SolarSolutionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [solution, setSolution] = useState(null);

    useEffect(() => {
        const foundSolution = solarSolutions.find(s => s.id === id);
        if (foundSolution) {
            setSolution(foundSolution);
            window.scrollTo(0, 0);
        } else {
            // Redirect or show not found if invalid ID
            navigate('/solar-epc');
        }
    }, [id, navigate]);

    if (!solution) return null;

    return (
        <div className="page-solar-detail">
            <PageHeader
                title={solution.title}
                description={solution.subtitle}
                image={solution.heroImage}
            />

            <section className="section bg-white">
                <div className="container max-w-5xl mx-auto px-4">
                    <Link to="/solar-epc" className="inline-flex items-center text-primary font-semibold mb-8 hover:text-secondary transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Solar Services
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                        <p className="text-lg text-slate-700 mb-12 leading-loose">
                            {solution.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Ideal For */}
                            <motion.div
                                className="bg-blue-50 rounded-2xl p-8 shadow-sm border border-blue-100"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Check className="text-primary" size={20} />
                                    </div>
                                    Ideal For
                                </h3>
                                <ul className="space-y-4">
                                    {solution.idealFor.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg">
                                            <span className="text-secondary mt-1.5 font-bold text-xl">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Benefits */}
                            <motion.div
                                className="bg-green-50 rounded-2xl p-8 shadow-sm border border-green-100"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <Zap className="text-green-600" size={20} />
                                    </div>
                                    Key Benefits
                                </h3>
                                <ul className="space-y-4">
                                    {solution.benefits.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg">
                                            <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Technical Specifications */}
                        <motion.div
                            className="bg-amber-50 rounded-2xl p-8 shadow-sm border border-amber-100 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <Sun className="text-amber-600" size={20} />
                                </div>
                                Technical Specifications
                            </h3>
                            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                                {solution.technicalSpecs.map((spec, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-slate-700 text-lg">
                                        <span className="text-amber-600 font-bold mt-1">→</span>
                                        <span>{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <div className="bg-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/50 to-transparent opacity-30"></div>
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-4">Ready to Switch to Solar?</h2>
                                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                    Contact us today for a detailed feasibility study and a customized quote for your {solution.title.toLowerCase()}.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/contact"
                                        className="btn bg-secondary text-white hover:bg-white hover:text-primary border-none text-lg px-8 py-4"
                                    >
                                        Get a Quote <ArrowRight size={20} className="ml-2" />
                                    </Link>
                                    <Link
                                        to="/solar-roi"
                                        className="btn btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                                    >
                                        Calculate ROI
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default SolarSolutionDetail;
