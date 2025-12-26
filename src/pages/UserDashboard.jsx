import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Zap, AlertCircle, Send, CheckCircle, Clock, XCircle, Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import './UserDashboard.css';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(null);
    const [installations, setInstallations] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [weighingEquipment, setWeighingEquipment] = useState([]);
    const [complaintForm, setComplaintForm] = useState({ subject: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState(null);
    const { getAuthHeader } = useAuth();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            };

            const [profileRes, installationsRes, complaintsRes, equipmentRes] = await Promise.all([
                fetch(`${API_URL}/api/users/profile`, { headers }),
                fetch(`${API_URL}/api/users/installations`, { headers }),
                fetch(`${API_URL}/api/complaints/user`, { headers }),
                fetch(`${API_URL}/api/admin/weighing-equipment/user/${profile?.id || 'temp'}`, { headers })
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);

                // Fetch equipment with the actual user ID
                if (profileData?.id) {
                    const equipRes = await fetch(`${API_URL}/api/admin/weighing-equipment/user/${profileData.id}`, { headers });
                    if (equipRes.ok) setWeighingEquipment(await equipRes.json());
                }
            }
            if (installationsRes.ok) setInstallations(await installationsRes.json());
            if (complaintsRes.ok) setComplaints(await complaintsRes.json());
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplaintSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');

        try {
            const response = await fetch(`${API_URL}/api/complaints`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(complaintForm)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setComplaintForm({ subject: '', description: '' });
                fetchUserData(); // Refresh complaints
                setTimeout(() => setSubmitStatus(null), 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            setSubmitStatus('error');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <Clock size={16} className="status-icon pending" />;
            case 'In Progress':
                return <AlertCircle size={16} className="status-icon progress" />;
            case 'Resolved':
                return <CheckCircle size={16} className="status-icon resolved" />;
            default:
                return <XCircle size={16} className="status-icon" />;
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loader"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="user-dashboard">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1>Welcome, {profile?.name}!</h1>
                    <p>Manage your solar installations and support requests</p>
                </motion.div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={18} />
                        Profile
                    </button>
                    <button
                        className={`tab ${activeTab === 'installations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('installations')}
                    >
                        <Zap size={18} />
                        Solar Installations
                    </button>
                    <button
                        className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
                        onClick={() => setActiveTab('equipment')}
                    >
                        <Scale size={18} />
                        Weighing Equipment
                    </button>
                    <button
                        className={`tab ${activeTab === 'complaints' ? 'active' : ''}`}
                        onClick={() => setActiveTab('complaints')}
                    >
                        <AlertCircle size={18} />
                        Complaints
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="profile-section"
                        >
                            <div className="info-card">
                                <h2>Personal Information</h2>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <User size={20} />
                                        <div>
                                            <label>Full Name</label>
                                            <p>{profile?.name}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Mail size={20} />
                                        <div>
                                            <label>Email</label>
                                            <p>{profile?.email}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <Phone size={20} />
                                        <div>
                                            <label>Phone</label>
                                            <p>{profile?.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={20} />
                                        <div>
                                            <label>Address</label>
                                            <p>{profile?.address || 'Not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <MapPin size={20} />
                                        <div>
                                            <label>Pincode</label>
                                            <p>{profile?.pincode || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'installations' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="installations-section"
                        >
                            <h2>Your Solar Installations</h2>
                            {installations.length === 0 ? (
                                <div className="empty-state">
                                    <Zap size={48} />
                                    <p>No solar installations found</p>
                                    <small>Contact us to get started with solar energy!</small>
                                </div>
                            ) : (
                                <div className="installations-grid">
                                    {installations.map((installation) => (
                                        <div key={installation.id} className="installation-card">
                                            <div className="installation-header">
                                                <Zap size={24} />
                                                <span className={`status-badge ${installation.status.toLowerCase()}`}>
                                                    {installation.status}
                                                </span>
                                            </div>
                                            <h3>{installation.capacity}</h3>
                                            <p className="installation-address">{installation.address}</p>
                                            <div className="installation-date">
                                                Installed: {new Date(installation.installationDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'equipment' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="installations-section"
                        >
                            <h2>Your Weighing Equipment</h2>
                            {weighingEquipment.length === 0 ? (
                                <div className="empty-state">
                                    <Scale size={48} />
                                    <p>No weighing equipment found</p>
                                    <small>Contact us for weighing equipment solutions!</small>
                                </div>
                            ) : (
                                <div className="installations-grid">
                                    {weighingEquipment.map((equipment) => (
                                        <div key={equipment.id} className="installation-card">
                                            <div className="installation-header">
                                                <Scale size={24} />
                                                <span className={`status-badge ${equipment.status.toLowerCase()}`}>
                                                    {equipment.status}
                                                </span>
                                            </div>
                                            <h3>{equipment.equipmentType}</h3>
                                            <div className="equipment-details" style={{ marginTop: '1rem' }}>
                                                <p><strong>Model:</strong> {equipment.model}</p>
                                                <p><strong>Capacity:</strong> {equipment.capacity}</p>
                                                {equipment.serialNumber && (
                                                    <p><strong>Serial No:</strong> {equipment.serialNumber}</p>
                                                )}
                                                {equipment.location && (
                                                    <p className="installation-address">{equipment.location}</p>
                                                )}
                                                {equipment.installationDate && (
                                                    <div className="installation-date">
                                                        Installed: {new Date(equipment.installationDate).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'complaints' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="complaints-section"
                        >
                            <div className="complaint-form-card">
                                <h2>Register a Complaint</h2>
                                {submitStatus === 'success' && (
                                    <div className="success-message">
                                        <CheckCircle size={18} />
                                        Complaint submitted successfully!
                                    </div>
                                )}
                                {submitStatus === 'error' && (
                                    <div className="error-message">
                                        <XCircle size={18} />
                                        Failed to submit complaint. Please try again.
                                    </div>
                                )}
                                <form onSubmit={handleComplaintSubmit}>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            value={complaintForm.subject}
                                            onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                                            placeholder="Brief description of the issue"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={complaintForm.description}
                                            onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                                            placeholder="Provide detailed information about your complaint..."
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={submitStatus === 'loading'}>
                                        <Send size={18} />
                                        {submitStatus === 'loading' ? 'Submitting...' : 'Submit Complaint'}
                                    </button>
                                </form>
                            </div>

                            <div className="complaints-history">
                                <h2>Your Complaints</h2>
                                {complaints.length === 0 ? (
                                    <div className="empty-state">
                                        <AlertCircle size={48} />
                                        <p>No complaints registered</p>
                                    </div>
                                ) : (
                                    <div className="complaints-list">
                                        {complaints.map((complaint) => (
                                            <div key={complaint.id} className="complaint-card">
                                                <div className="complaint-header">
                                                    <h3>{complaint.subject}</h3>
                                                    <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                                                        {getStatusIcon(complaint.status)}
                                                        {complaint.status}
                                                    </span>
                                                </div>
                                                <p className="complaint-description">{complaint.description}</p>
                                                <div className="complaint-footer">
                                                    <small>Submitted: {new Date(complaint.createdAt).toLocaleString()}</small>
                                                    {complaint.updatedAt !== complaint.createdAt && (
                                                        <small>Updated: {new Date(complaint.updatedAt).toLocaleString()}</small>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
