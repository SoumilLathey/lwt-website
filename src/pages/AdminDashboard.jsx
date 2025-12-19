import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Phone, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('complaints');
    const [complaints, setComplaints] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(null);
    const { getAuthHeader } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            };

            const [complaintsRes, enquiriesRes] = await Promise.all([
                fetch(`${API_URL}/api/complaints/all`, { headers }),
                fetch(`${API_URL}/api/enquiries`, { headers })
            ]);

            if (complaintsRes.ok) setComplaints(await complaintsRes.json());
            if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json());
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateComplaintStatus = async (complaintId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/complaints/${complaintId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setUpdateStatus({ type: 'success', id: complaintId });
                fetchData(); // Refresh data
                setTimeout(() => setUpdateStatus(null), 2000);
            } else {
                setUpdateStatus({ type: 'error', id: complaintId });
            }
        } catch (error) {
            console.error('Error updating complaint:', error);
            setUpdateStatus({ type: 'error', id: complaintId });
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending':
                return <Clock size={16} className="status-icon" />;
            case 'In Progress':
                return <RefreshCw size={16} className="status-icon" />;
            case 'Resolved':
                return <CheckCircle size={16} className="status-icon" />;
            default:
                return <XCircle size={16} className="status-icon" />;
        }
    };

    const getStats = () => {
        const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
        const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;
        const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
        const totalEnquiries = enquiries.length;

        return { pendingComplaints, inProgressComplaints, resolvedComplaints, totalEnquiries };
    };

    const stats = getStats();

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loader"></div>
                <p>Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dashboard-header"
                >
                    <h1>Admin Dashboard</h1>
                    <p>Manage customer complaints and enquiries</p>
                </motion.div>

                <div className="stats-grid">
                    <div className="stat-card pending">
                        <div className="stat-icon">
                            <Clock size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.pendingComplaints}</h3>
                            <p>Pending Complaints</p>
                        </div>
                    </div>
                    <div className="stat-card progress">
                        <div className="stat-icon">
                            <RefreshCw size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.inProgressComplaints}</h3>
                            <p>In Progress</p>
                        </div>
                    </div>
                    <div className="stat-card resolved">
                        <div className="stat-icon">
                            <CheckCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.resolvedComplaints}</h3>
                            <p>Resolved</p>
                        </div>
                    </div>
                    <div className="stat-card enquiries">
                        <div className="stat-icon">
                            <Mail size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalEnquiries}</h3>
                            <p>Total Enquiries</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button
                        className={`tab ${activeTab === 'complaints' ? 'active' : ''}`}
                        onClick={() => setActiveTab('complaints')}
                    >
                        <AlertCircle size={18} />
                        Complaints ({complaints.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'enquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <Mail size={18} />
                        Enquiries ({enquiries.length})
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'complaints' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="complaints-section"
                        >
                            <h2>All Complaints</h2>
                            {complaints.length === 0 ? (
                                <div className="empty-state">
                                    <AlertCircle size={48} />
                                    <p>No complaints found</p>
                                </div>
                            ) : (
                                <div className="complaints-table">
                                    {complaints.map((complaint) => (
                                        <div key={complaint.id} className="complaint-row">
                                            <div className="complaint-main">
                                                <div className="complaint-info">
                                                    <h3>{complaint.subject}</h3>
                                                    <p className="complaint-description">{complaint.description}</p>
                                                    <div className="complaint-meta">
                                                        <span><strong>User:</strong> {complaint.userName}</span>
                                                        <span><strong>Email:</strong> {complaint.userEmail}</span>
                                                        {complaint.userPhone && (
                                                            <span><strong>Phone:</strong> {complaint.userPhone}</span>
                                                        )}
                                                        <span><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="complaint-actions">
                                                    <div className="status-display">
                                                        <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                                                            {getStatusIcon(complaint.status)}
                                                            {complaint.status}
                                                        </span>
                                                    </div>
                                                    <div className="status-buttons">
                                                        <button
                                                            className="status-btn pending"
                                                            onClick={() => updateComplaintStatus(complaint.id, 'Pending')}
                                                            disabled={complaint.status === 'Pending'}
                                                        >
                                                            Pending
                                                        </button>
                                                        <button
                                                            className="status-btn progress"
                                                            onClick={() => updateComplaintStatus(complaint.id, 'In Progress')}
                                                            disabled={complaint.status === 'In Progress'}
                                                        >
                                                            In Progress
                                                        </button>
                                                        <button
                                                            className="status-btn resolved"
                                                            onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                                                            disabled={complaint.status === 'Resolved'}
                                                        >
                                                            Resolved
                                                        </button>
                                                    </div>
                                                    {updateStatus?.id === complaint.id && (
                                                        <div className={`update-message ${updateStatus.type}`}>
                                                            {updateStatus.type === 'success' ? '✓ Updated' : '✗ Failed'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'enquiries' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="enquiries-section"
                        >
                            <h2>All Enquiries</h2>
                            {enquiries.length === 0 ? (
                                <div className="empty-state">
                                    <Mail size={48} />
                                    <p>No enquiries found</p>
                                </div>
                            ) : (
                                <div className="enquiries-grid">
                                    {enquiries.map((enquiry) => (
                                        <div key={enquiry.id} className="enquiry-card">
                                            <div className="enquiry-header">
                                                <h3>{enquiry.name}</h3>
                                                {enquiry.service && (
                                                    <span className="service-badge">{enquiry.service}</span>
                                                )}
                                            </div>
                                            <div className="enquiry-contact">
                                                <div className="contact-item">
                                                    <Mail size={16} />
                                                    <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                                                </div>
                                                {enquiry.phone && (
                                                    <div className="contact-item">
                                                        <Phone size={16} />
                                                        <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="enquiry-message">{enquiry.message}</p>
                                            <div className="enquiry-footer">
                                                <small>{new Date(enquiry.createdAt).toLocaleString()}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
