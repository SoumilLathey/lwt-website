import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Sun, Scale } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-brand">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                                <Scale size={18} />
                            </div>
                            <h2 className="!m-0 text-xl">LATHEY</h2>
                        </div>
                        <p>
                            Pioneering industrial precision and sustainable energy solutions.
                            We manufacture excellence for a smarter tomorrow.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/products" className="footer-link">Products</Link></li>
                            <li><Link to="/solar-epc" className="footer-link text-secondary"><Sun size={14} /> Solar EPC</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="footer-col">
                        <h3>Our Products</h3>
                        <ul className="footer-links">
                            <li><Link to="/weighbridges" className="footer-link">Weighbridges</Link></li>
                            <li><Link to="/scales" className="footer-link">Platform Scales</Link></li>
                            <li><Link to="/automation" className="footer-link">Weighing Automation</Link></li>
                            <li><Link to="/solar-epc" className="footer-link">Solar Power Plants</Link></li>
                            <li><Link to="/accessories" className="footer-link">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3>Get in Touch</h3>
                        <div className="footer-contact-item">
                            <MapPin size={20} className="shrink-0 text-secondary" />
                            <span>123 Industrial Area, Phase II,<br />New Delhi, India - 110020</span>
                        </div>
                        <div className="footer-contact-item">
                            <Phone size={20} className="shrink-0 text-secondary" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="footer-contact-item">
                            <Mail size={20} className="shrink-0 text-secondary" />
                            <span>info@latheyweightrix.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Lathey Weigh Trix. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
