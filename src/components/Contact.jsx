import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${API_URL}/api/enquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
            setSubmitStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="contact-wrapper"
                >
                    <div className="contact-info">
                        <h2>Let's Build the Right Solution for Your Business</h2>
                        <p>Whether you're planning a <strong>solar installation</strong>, upgrading <strong>industrial weighing systems</strong>, or securing a <strong>maintenance contract</strong>, <strong>our team is ready</strong> to help.</p>

                        <div className="info-item">
                            <div className="info-icon"><Phone size={20} /></div>
                            <div className="info-content">
                                <h4>Call Us</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon"><Mail size={20} /></div>
                            <div className="info-content">
                                <h4>Email Us</h4>
                                <p>latheysoumil@gmail.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon"><MapPin size={20} /></div>
                            <div className="info-content">
                                <h4>Visit Us</h4>
                                <p>40, Prem Prayag colony, Garh road,<br />Meerut, Uttar Pradesh, India - 250004</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {submitStatus === 'success' && (
                            <div className="success-message">
                                ✓ Thank you! Your enquiry has been sent successfully. We'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="error-message">
                                ✗ Failed to send enquiry. Please try again or contact us directly.
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Service Interest</label>
                            <select
                                name="service"
                                className="form-input"
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="">Select Service</option>
                                <option value="Weighbridges">Weighbridges</option>
                                <option value="Industrial Scales">Industrial Scales</option>
                                <option value="Solar EPC">Solar EPC</option>
                                <option value="Automation">Automation</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                className="form-textarea"
                                placeholder="Tell us about your requirements..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary w-full justify-center"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : (
                                <>
                                    Get Expert Consultation <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Google Maps Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="map-section"
                >
                    <h3 className="map-title">Find Us on the Map</h3>
                    <div className="map-container">
                        <iframe
                            src="https://maps.google.com/maps?q=Lathey+Weigh+Trix+Meerut&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: '12px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lathey Weigh Trix Location"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
