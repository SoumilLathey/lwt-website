import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Sun } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col footer-brand">
                        <h2 className="!m-0 text-xl mb-4">LWT</h2>
                        <p>
                            Lathey Weigh Trix delivers precision-engineered weighing systems and efficient solar energy solutions that help businesses operate smarter, leaner, and more sustainably.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/in/hareelathey/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="https://www.instagram.com/lwtsolar/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/products" className="footer-link">Weighing Equipments</Link></li>
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
                            <li><Link to="/amc" className="footer-link">AMC</Link></li>
                            <li><Link to="/solar-epc" className="footer-link">Solar Power Plants</Link></li>
                            <li><Link to="/accessories" className="footer-link">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3>Get in Touch</h3>
                        <div className="footer-contact-item">
                            <MapPin size={20} className="shrink-0 text-secondary" />
                            <span>40, Prem Prayag colony, Garh road,<br />Meerut, Uttar Pradesh, India - 250004</span>
                        </div>
                        <div className="footer-contact-item">
                            <Phone size={20} className="shrink-0 text-secondary" />
                            <span>+91 92591 60644</span>
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
