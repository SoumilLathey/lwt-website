import React, { useState } from 'react';
import { Menu, X, ChevronDown, Phone, Scale, Sun, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <header className="header-main">
            <div className="container header-container">
                {/* Logo */}
                <Link to="/" className="logo-group no-underline hover:opacity-90 transition-opacity">
                    <span style={{ color: '#24528F', fontWeight: '900', fontSize: '28px', fontFamily: 'Outfit, sans-serif' }}>LWT</span>
                    <span style={{ color: '#94a3b8', margin: '0 12px', fontWeight: '300', fontSize: '28px' }}>|</span>
                    <span style={{ color: '#24528F', fontWeight: '600', fontSize: '20px', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.5px' }}>Lathey Weigh Trix</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>

                    <div className="nav-item-dropdown">
                        <span className="nav-link flex items-center gap-1">
                            Weighing Equipments <ChevronDown size={14} />
                        </span>
                        {/* Dropdown */}
                        <div className="dropdown-menu">
                            <Link to="/products" className="dropdown-link">All Products</Link>
                            <Link to="/weighbridges" className="dropdown-link">Weighbridges</Link>
                            <Link to="/scales" className="dropdown-link">Industrial Scales</Link>
                            <Link to="/amc" className="dropdown-link">AMC (Annual Maintenance Contracts)</Link>
                        </div>
                    </div>

                    <div className="nav-item-dropdown">
                        <span className="nav-link flex items-center gap-1">
                            <Sun size={16} className="text-secondary" /> Solar EPC <ChevronDown size={14} />
                        </span>
                        <div className="dropdown-menu">
                            <Link to="/solar-epc" className="dropdown-link">Solar EPC Services</Link>
                            <Link to="/solar-roi" className="dropdown-link">ROI Calculator</Link>
                        </div>
                    </div>

                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>

                {/* Auth Menu */}
                <div className="header-cta">
                    {user ? (
                        <div className="user-menu-container">
                            <button
                                className="user-menu-button"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <User size={18} />
                                {user.name}
                                <ChevronDown size={14} />
                            </button>
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <Link
                                        to="/dashboard"
                                        className="user-dropdown-link"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="user-dropdown-link"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <LayoutDashboard size={16} />
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        className="user-dropdown-link logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/employee/login" className="btn btn-outline-secondary" title="Employee Portal">
                                <User size={16} />
                                Employee
                            </Link>
                            <Link to="/login" className="btn btn-secondary">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className="mobile-link" onClick={toggleMenu}>About Us</Link>
                    <Link to="/products" className="mobile-link" onClick={toggleMenu}>Weighing Equipments</Link>
                    <Link to="/solar-epc" className="mobile-link" onClick={toggleMenu}>Solar EPC</Link>
                    <Link to="/solar-roi" className="mobile-link" onClick={toggleMenu}>Solar ROI Calculator</Link>
                    <Link to="/contact" className="mobile-link" onClick={toggleMenu}>Contact</Link>

                    <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }}></div>

                    {user ? (
                        <>
                            <div style={{ padding: '8px 12px', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                                {user.name}
                            </div>
                            <Link to="/dashboard" className="mobile-link" onClick={toggleMenu}>
                                <LayoutDashboard size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                Dashboard
                            </Link>
                            {isAdmin && (
                                <Link to="/admin" className="mobile-link" onClick={toggleMenu}>
                                    <LayoutDashboard size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                className="mobile-link"
                                onClick={() => { handleLogout(); toggleMenu(); }}
                                style={{ width: '100%', textAlign: 'left', color: '#dc2626' }}
                            >
                                <LogOut size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/employee/login" className="mobile-link" onClick={toggleMenu}>
                                <User size={16} style={{ display: 'inline', marginRight: '8px' }} />
                                Employee Login
                            </Link>
                            <Link to="/login" className="mobile-link" onClick={toggleMenu}>Customer Login</Link>
                            <Link to="/signup" className="btn btn-primary justify-center" onClick={toggleMenu}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
