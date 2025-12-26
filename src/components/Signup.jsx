import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, MapPin, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        pincode: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        const { confirmPassword, ...signupData } = formData;
        const result = await signup(signupData);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="signup-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="signup-container"
                >
                    <div className="signup-header">
                        <h1>Create Account</h1>
                        <p>Join us to manage your solar installations and services</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="error-message"
                        >
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="success-message"
                        >
                            <CheckCircle size={18} />
                            <span>Account created! Please wait for admin verification before logging in.</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label>
                                <User size={18} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <Mail size={18} />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Phone size={18} />
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                <MapPin size={18} />
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Your complete address"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <MapPin size={18} />
                                Pincode
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="250004"
                                pattern="[0-9]{6}"
                                title="Please enter a valid 6-digit pincode"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <Lock size={18} />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 characters"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Lock size={18} />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading || success}
                        >
                            {loading ? 'Creating Account...' : (
                                <>
                                    <UserPlus size={18} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="signup-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="link">Login here</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
