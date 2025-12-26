import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Phone, CheckCircle, Clock, XCircle, RefreshCw, Users, Plus, UserCheck, UserX, Briefcase, ChevronDown, ChevronUp, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('complaints');
    const [complaints, setComplaints] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [showEmployeeForm, setShowEmployeeForm] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [expandedItems, setExpandedItems] = useState({});
    const [showComplaintForm, setShowComplaintForm] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);

    const [newEmployee, setNewEmployee] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        department: ''
    });
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        employeeIds: []
    });
    const [newComplaint, setNewComplaint] = useState({ clientName: '', clientPhone: '', clientEmail: '', clientAddress: '', subject: '', description: '' });
    const [complaintImages, setComplaintImages] = useState([]);
    const [imageType, setImageType] = useState('before'); // 'before' or 'after'
    const [newEnquiry, setNewEnquiry] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const { getAuthHeader } = useAuth();

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const sortItems = (items) => {
        return [...items].sort((a, b) => {
            const isCompletedA = a.status === 'Resolved' || a.status === 'Completed';
            const isCompletedB = b.status === 'Resolved' || b.status === 'Completed';
            if (isCompletedA === isCompletedB) return 0;
            return isCompletedA ? 1 : -1;
        });
    };

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

            const [complaintsRes, enquiriesRes, employeesRes, projectsRes] = await Promise.all([
                fetch(`${API_URL}/api/complaints/all`, { headers }),
                fetch(`${API_URL}/api/enquiries`, { headers }),
                fetch(`${API_URL}/api/admin/employees`, { headers }),
                fetch(`${API_URL}/api/projects`, { headers })
            ]);

            if (complaintsRes.ok) setComplaints(await complaintsRes.json());
            if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json());
            if (employeesRes.ok) setEmployees(await employeesRes.json());
            if (projectsRes.ok) setProjects(await projectsRes.json());
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
                fetchData();
                setTimeout(() => setUpdateStatus(null), 2000);
            } else {
                setUpdateStatus({ type: 'error', id: complaintId });
            }
        } catch (error) {
            console.error('Error updating complaint:', error);
            setUpdateStatus({ type: 'error', id: complaintId });
        }
    };

    const assignComplaint = async (complaintId, employeeId) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/complaints/${complaintId}/assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ employeeId: employeeId || null })
            });

            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Error assigning complaint:', error);
        }
    };

    const assignEnquiry = async (enquiryId, employeeId) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/enquiries/${enquiryId}/assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ employeeId: employeeId || null })
            });

            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Error assigning enquiry:', error);
        }
    };

    const resetEmployeePassword = async (employeeId, employeeName) => {
        const newPassword = prompt(`Enter new password for ${employeeName}:`);
        if (!newPassword) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/employees/${employeeId}/reset-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ password: newPassword })
            });

            if (response.ok) {
                alert('Password reset successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Failed to reset password');
        }
    };

    const createEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/employees`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(newEmployee)
            });

            if (response.ok) {
                setShowEmployeeForm(false);
                setNewEmployee({
                    email: '',
                    password: '',
                    name: '',
                    phone: '',
                    department: ''
                });
                fetchData();
                alert('Employee created successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create employee');
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('Failed to create employee');
        }
    };

    const toggleEmployeeStatus = async (employeeId) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/employees/${employeeId}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                }
            });

            if (response.ok) {
                fetchData();
            }
        } catch (error) {
            console.error('Error toggling employee status:', error);
        }
    };

    const createComplaint = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/complaints/admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify(newComplaint)
            });
            if (response.ok) {
                // Upload images if any
                if (complaintImages.length > 0) {
                    const complaintId = (await response.json()).complaintId;

                    for (let i = 0; i < complaintImages.length; i++) {
                        const formData = new FormData();
                        formData.append('image', complaintImages[i]);
                        formData.append('type', imageType);

                        await fetch(`${API_URL}/api/complaints/admin/${complaintId}/images`, {
                            method: 'POST',
                            headers: getAuthHeader(), // No Content-Type for FormData
                            body: formData
                        });
                    }
                }

                setShowComplaintForm(false);
                setNewComplaint({ clientName: '', clientPhone: '', clientEmail: '', clientAddress: '', subject: '', description: '' });
                setComplaintImages([]);
                fetchData();
                alert('Complaint created successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create complaint');
            }
        } catch (error) {
            console.error('Error creating complaint:', error);
        }
    };

    const createEnquiry = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/enquiries/admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify(newEnquiry)
            });
            if (response.ok) {
                setShowEnquiryForm(false);
                setNewEnquiry({ name: '', email: '', phone: '', service: '', message: '' });
                fetchData();
                alert('Enquiry created successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create enquiry');
            }
        } catch (error) {
            console.error('Error creating enquiry:', error);
        }
    };

    const updateProjectStatus = async (projectId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchData();
                setUpdateStatus({ type: 'success', id: projectId });
                setTimeout(() => setUpdateStatus(null), 2000);
            } else {
                setUpdateStatus({ type: 'error', id: projectId });
            }
        } catch (error) {
            console.error('Error updating project status:', error);
            setUpdateStatus({ type: 'error', id: projectId });
        }
    };

    const createProject = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(newProject)
            });
            if (response.ok) {
                setShowProjectForm(false);
                setNewProject({
                    name: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    employeeIds: []
                });
                fetchData();
                alert('Project created successfully!');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project');
        }
    };

    const toggleEmployeeSelection = (employeeId) => {
        setNewProject(prev => ({
            ...prev,
            employeeIds: prev.employeeIds.includes(employeeId)
                ? prev.employeeIds.filter(id => id !== employeeId)
                : [...prev.employeeIds, employeeId]
        }));
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
        const totalProjects = projects.length;
        const activeProjects = projects.filter(p => !['Completed', 'Resolved'].includes(p.status)).length;
        const completedProjects = projects.filter(p => ['Completed', 'Resolved'].includes(p.status)).length;
        const totalEmployees = employees.length;
        const activeEmployees = employees.filter(e => e.isActive).length;

        return {
            pendingComplaints, inProgressComplaints, resolvedComplaints,
            totalEnquiries,
            totalProjects, activeProjects, completedProjects,
            totalEmployees, activeEmployees
        };

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
                    <p>Manage customer complaints, enquiries, and employees</p>
                </motion.div>

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
                    <button
                        className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
                        onClick={() => setActiveTab('employees')}
                    >
                        <Users size={18} />
                        Employees ({employees.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <Briefcase size={18} />
                        Projects ({projects.length})
                    </button>
                </div>

                <div className="dashboard-content">
                    {activeTab === 'complaints' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="complaints-section"
                        >
                            <div className="stats-grid" style={{ marginBottom: '30px' }}>
                                <div className="stat-card pending">
                                    <div className="stat-icon">
                                        <Clock size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.pendingComplaints}</h3>
                                        <p>Pending</p>
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
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2>All Complaints</h2>
                                <button className="add-btn" onClick={() => setShowComplaintForm(true)}>
                                    <Plus size={20} /> New Complaint
                                </button>
                            </div>

                            {showComplaintForm && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay">
                                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content">
                                        <div className="modal-header">
                                            <h2>Create New Complaint</h2>
                                            <button className="close-btn" onClick={() => setShowComplaintForm(false)}>
                                                <XCircle size={24} />
                                            </button>
                                        </div>
                                        <form onSubmit={createComplaint} className="create-form">
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Client Name *</label>
                                                    <input
                                                        type="text"
                                                        value={newComplaint.clientName}
                                                        onChange={(e) => setNewComplaint({ ...newComplaint, clientName: e.target.value })}
                                                        required
                                                        className="form-input"
                                                        placeholder="Client Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Client Phone *</label>
                                                    <input
                                                        type="tel"
                                                        value={newComplaint.clientPhone}
                                                        onChange={(e) => setNewComplaint({ ...newComplaint, clientPhone: e.target.value })}
                                                        required
                                                        className="form-input"
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Client Email</label>
                                                    <input
                                                        type="email"
                                                        value={newComplaint.clientEmail}
                                                        onChange={(e) => setNewComplaint({ ...newComplaint, clientEmail: e.target.value })}
                                                        className="form-input"
                                                        placeholder="client@example.com (Required for OTP)"
                                                    />
                                                </div>
                                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                                    <label>Client Address</label>
                                                    <input
                                                        type="text"
                                                        value={newComplaint.clientAddress}
                                                        onChange={(e) => setNewComplaint({ ...newComplaint, clientAddress: e.target.value })}
                                                        className="form-input"
                                                        placeholder="Full Address"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Subject *</label>
                                                <input
                                                    type="text"
                                                    value={newComplaint.subject}
                                                    onChange={(e) => setNewComplaint({ ...newComplaint, subject: e.target.value })}
                                                    required
                                                    className="form-input"
                                                    placeholder="Complaint Subject"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description *</label>
                                                <textarea
                                                    value={newComplaint.description}
                                                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                                                    required
                                                    className="form-input"
                                                    rows="4"
                                                    placeholder="Detailed description of the issue..."
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Upload Images</label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={(e) => setComplaintImages([...e.target.files])}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Image Type</label>
                                                <select
                                                    value={imageType}
                                                    onChange={(e) => setImageType(e.target.value)}
                                                    className="form-input"
                                                >
                                                    <option value="before">Before Complaint (Issue)</option>
                                                    <option value="after">After Complaint (Resolution)</option>
                                                </select>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="submit-btn">Create Complaint</button>
                                                <button type="button" className="cancel-btn" onClick={() => setShowComplaintForm(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </motion.div>
                                </motion.div>
                            )}
                            {complaints.length === 0 ? (
                                <div className="empty-state">
                                    <AlertCircle size={48} />
                                    <p>No complaints found</p>
                                </div>
                            ) : (
                                <div className="complaints-table">
                                    {sortItems(complaints).map((complaint) => (
                                        <div key={complaint.id} className="complaint-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                                            <div
                                                className="row-header"
                                                onClick={() => toggleExpand(complaint.id)}
                                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                    <h3 style={{ margin: 0 }}>{complaint.subject}</h3>
                                                    <span className={`status-badge ${(complaint.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                                                        {getStatusIcon(complaint.status)}
                                                        {complaint.status}
                                                    </span>
                                                </div>
                                                {expandedItems[complaint.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[complaint.id] && (
                                                <div className="complaint-main" style={{ padding: '0 1rem 1rem', borderTop: '1px solid #eee', marginTop: '0.5rem', paddingTop: '1rem', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                                                    <div className="complaint-info" style={{ flex: 1 }}>
                                                        <p className="complaint-description">{complaint.description}</p>
                                                        <div className="complaint-meta">
                                                            <span><strong>User:</strong> {complaint.userName}</span>
                                                            <span><strong>Email:</strong> {complaint.userEmail}</span>
                                                            {complaint.userPhone && (
                                                                <span><strong>Phone:</strong> {complaint.userPhone}</span>
                                                            )}
                                                            <span><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</span>
                                                        </div>

                                                        {/* Assignment Section */}
                                                        <div className="assignment-section">
                                                            <label><strong>Assign to Employee:</strong></label>
                                                            <select
                                                                value={complaint.assignedEmployeeId || ''}
                                                                onChange={(e) => assignComplaint(complaint.id, e.target.value)}
                                                                className="assign-select"
                                                            >
                                                                <option value="">Unassigned</option>
                                                                {employees.filter(emp => emp.isActive).map(emp => (
                                                                    <option key={emp.id} value={emp.id}>
                                                                        {emp.name} ({emp.department || 'No Dept'})
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {complaint.assignedEmployeeName && (
                                                                <span className="assigned-badge">
                                                                    Assigned to: {complaint.assignedEmployeeName}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Images Display */}
                                                        {complaint.images && complaint.images.length > 0 && (
                                                            <div className="images-display">
                                                                <strong>Uploaded Images:</strong>
                                                                <div className="image-grid">
                                                                    {complaint.images.map(img => (
                                                                        <a
                                                                            key={img.id}
                                                                            href={`${API_URL}${img.imagePath}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="image-link"
                                                                        >
                                                                            {img.imageType === 'before' ? 'Before Repair' : 'After Repair'}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="complaint-actions" style={{ width: '200px', flexShrink: 0 }}>
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
                                            )}
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
                            <div className="stats-grid" style={{ marginBottom: '30px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
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

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2>All Enquiries</h2>
                                <button className="add-btn" onClick={() => setShowEnquiryForm(true)}>
                                    <Plus size={20} /> New Enquiry
                                </button>
                            </div>

                            {showEnquiryForm && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay">
                                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content">
                                        <div className="modal-header">
                                            <h2>Create New Enquiry</h2>
                                            <button className="close-btn" onClick={() => setShowEnquiryForm(false)}>
                                                <XCircle size={24} />
                                            </button>
                                        </div>
                                        <form onSubmit={createEnquiry} className="create-form">
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Name *</label>
                                                    <input
                                                        type="text"
                                                        value={newEnquiry.name}
                                                        onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                                                        required
                                                        className="form-input"
                                                        placeholder="Customer Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Email *</label>
                                                    <input
                                                        type="email"
                                                        value={newEnquiry.email}
                                                        onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                                                        required
                                                        className="form-input"
                                                        placeholder="customer@example.com"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone</label>
                                                    <input
                                                        type="tel"
                                                        value={newEnquiry.phone}
                                                        onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                                                        className="form-input"
                                                        placeholder="Phone Number"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Service</label>
                                                    <input
                                                        type="text"
                                                        value={newEnquiry.service}
                                                        onChange={(e) => setNewEnquiry({ ...newEnquiry, service: e.target.value })}
                                                        className="form-input"
                                                        placeholder="Service Interest"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Message *</label>
                                                <textarea
                                                    value={newEnquiry.message}
                                                    onChange={(e) => setNewEnquiry({ ...newEnquiry, message: e.target.value })}
                                                    required
                                                    className="form-input"
                                                    rows="4"
                                                    placeholder="Enquiry details..."
                                                />
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="submit-btn">Create Enquiry</button>
                                                <button type="button" className="cancel-btn" onClick={() => setShowEnquiryForm(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </motion.div>
                                </motion.div>
                            )}
                            {enquiries.length === 0 ? (
                                <div className="empty-state">
                                    <Mail size={48} />
                                    <p>No enquiries found</p>
                                </div>
                            ) : (
                                <div className="enquiries-grid">
                                    {sortItems(enquiries).map((enquiry) => (
                                        <div key={enquiry.id} className="enquiry-card">
                                            <div
                                                className="enquiry-header"
                                                onClick={() => toggleExpand(enquiry.id)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <h3>{enquiry.name}</h3>
                                                    {enquiry.service && (
                                                        <span className="service-badge">{enquiry.service}</span>
                                                    )}
                                                </div>
                                                {expandedItems[enquiry.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[enquiry.id] && (
                                                <div className="enquiry-details" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
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

                                                    {/* Assignment Section */}
                                                    <div className="assignment-section" style={{ marginTop: '1rem' }}>
                                                        <label><strong>Assign to Employee:</strong></label>
                                                        <select
                                                            value={enquiry.assignedEmployeeId || ''}
                                                            onChange={(e) => assignEnquiry(enquiry.id, e.target.value)}
                                                            className="assign-select"
                                                            style={{ marginLeft: '10px', padding: '5px' }}
                                                        >
                                                            <option value="">Unassigned</option>
                                                            {employees.filter(emp => emp.isActive).map(emp => (
                                                                <option key={emp.id} value={emp.id}>
                                                                    {emp.name} ({emp.department || 'No Dept'})
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {enquiry.assignedEmployeeName && (
                                                            <span className="assigned-badge" style={{ marginLeft: '10px' }}>
                                                                Assigned to: {enquiry.assignedEmployeeName}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Images Display */}
                                                    {enquiry.images && enquiry.images.length > 0 && (
                                                        <div className="images-display">
                                                            <strong>Uploaded Images:</strong>
                                                            <div className="image-grid">
                                                                {enquiry.images.map(img => (
                                                                    <a
                                                                        key={img.id}
                                                                        href={`${API_URL}${img.imagePath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="image-link"
                                                                    >
                                                                        {img.imageType === 'before' ? 'Before Installation' : 'After Installation'}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="enquiry-footer">
                                                        <small>{new Date(enquiry.createdAt).toLocaleString()}</small>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'employees' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="employees-section"
                        >
                            <div className="stats-grid" style={{ marginBottom: '30px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                                <div className="stat-card" style={{ borderLeft: '4px solid #6366f1' }}>
                                    <div className="stat-icon" style={{ color: '#6366f1' }}>
                                        <Users size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.totalEmployees}</h3>
                                        <p>Total Employees</p>
                                    </div>
                                </div>
                                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                                    <div className="stat-icon" style={{ color: '#10b981' }}>
                                        <UserCheck size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.activeEmployees}</h3>
                                        <p>Active</p>
                                    </div>
                                </div>
                            </div>

                            <div className="section-header">
                                <h2>Employees</h2>
                                <button
                                    className="add-employee-btn"
                                    onClick={() => setShowEmployeeForm(!showEmployeeForm)}
                                >
                                    <Plus size={20} />
                                    Add Employee
                                </button>
                            </div>

                            {showEmployeeForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="employee-form"
                                    onSubmit={createEmployee}
                                >
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Name *"
                                            value={newEmployee.name}
                                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email *"
                                            value={newEmployee.email}
                                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password *"
                                            value={newEmployee.password}
                                            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone"
                                            value={newEmployee.phone}
                                            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Department"
                                            value={newEmployee.department}
                                            onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn">Create Employee</button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setShowEmployeeForm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {employees.length === 0 ? (
                                <div className="empty-state">
                                    <Users size={48} />
                                    <p>No employees found</p>
                                </div>
                            ) : (
                                <div className="employees-grid">
                                    {employees.map((employee) => (
                                        <div key={employee.id} className="employee-card">
                                            <div className="employee-header">
                                                <div className="employee-avatar">
                                                    {employee.isActive ? <UserCheck size={24} /> : <UserX size={24} />}
                                                </div>
                                                <div className="employee-info">
                                                    <h3>{employee.name}</h3>
                                                    <p>{employee.department || 'No Department'}</p>
                                                </div>
                                                <button
                                                    className={`status-toggle ${employee.isActive ? 'active' : 'inactive'}`}
                                                    onClick={() => toggleEmployeeStatus(employee.id)}
                                                >
                                                    {employee.isActive ? 'Active' : 'Inactive'}
                                                </button>
                                            </div>
                                            <div className="employee-details">
                                                <div className="detail-item">
                                                    <Mail size={16} />
                                                    <span>{employee.email}</span>
                                                </div>
                                                {employee.phone && (
                                                    <div className="detail-item">
                                                        <Phone size={16} />
                                                        <span>{employee.phone}</span>
                                                    </div>
                                                )}
                                                <div className="detail-item">
                                                    <small>Joined: {new Date(employee.createdAt).toLocaleDateString()}</small>
                                                </div>
                                                <button
                                                    onClick={() => resetEmployeePassword(employee.id, employee.name)}
                                                    style={{
                                                        marginTop: '10px',
                                                        width: '100%',
                                                        padding: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '8px',
                                                        background: '#e0e7ff',
                                                        color: '#4338ca',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    <Key size={16} />
                                                    Reset Password
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="projects-section"
                        >
                            <div className="stats-grid" style={{ marginBottom: '30px' }}>
                                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                                    <div className="stat-icon" style={{ color: '#3b82f6' }}>
                                        <Briefcase size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.totalProjects}</h3>
                                        <p>Total Projects</p>
                                    </div>
                                </div>
                                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                                    <div className="stat-icon" style={{ color: '#f59e0b' }}>
                                        <Clock size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.activeProjects}</h3>
                                        <p>Active</p>
                                    </div>
                                </div>
                                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                                    <div className="stat-icon" style={{ color: '#10b981' }}>
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="stat-content">
                                        <h3>{stats.completedProjects}</h3>
                                        <p>Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="section-header">
                                <h2>Projects</h2>
                                <button
                                    className="add-employee-btn"
                                    onClick={() => setShowProjectForm(!showProjectForm)}
                                >
                                    <Plus size={20} />
                                    Create Project
                                </button>
                            </div>

                            {showProjectForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="employee-form"
                                    onSubmit={createProject}
                                >
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Project Name *"
                                            value={newProject.name}
                                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                            required
                                        />
                                        <textarea
                                            placeholder="Project Description *"
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            required
                                            rows="3"
                                            style={{ gridColumn: '1 / -1' }}
                                        />
                                        <input
                                            type="date"
                                            placeholder="Start Date"
                                            value={newProject.startDate}
                                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                        />
                                        <input
                                            type="date"
                                            placeholder="End Date"
                                            value={newProject.endDate}
                                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                                            Assign Team Members:
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                                            {employees.filter(emp => emp.isActive).map(emp => (
                                                <label key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={newProject.employeeIds.includes(emp.id)}
                                                        onChange={() => toggleEmployeeSelection(emp.id)}
                                                    />
                                                    <span>{emp.name} ({emp.department || 'No Dept'})</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="submit-btn">Create Project</button>
                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => setShowProjectForm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {projects.length === 0 ? (
                                <div className="empty-state">
                                    <Briefcase size={48} />
                                    <p>No projects found</p>
                                </div>
                            ) : (
                                <div className="projects-grid">
                                    {sortItems(projects).map((project) => (
                                        <div key={project.id} className="project-card">
                                            <div
                                                className="project-header"
                                                onClick={() => toggleExpand(project.id)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                    <h3>{project.name}</h3>
                                                    <span className={`status-badge ${(project.status || 'Active').toLowerCase().replace(' ', '-')}`}>
                                                        {project.status}
                                                    </span>
                                                </div>
                                                {expandedItems[project.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>

                                            {expandedItems[project.id] && (
                                                <div className="project-details" style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                                                        <label style={{ fontWeight: 'bold' }}>Project Status:</label>
                                                        <select
                                                            value={project.status}
                                                            onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                                                            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                                        >
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="On Hold">On Hold</option>
                                                        </select>
                                                    </div>
                                                    <p className="project-description">{project.description}</p>

                                                    <div className="project-meta">
                                                        <div>
                                                            <strong>Created by:</strong> {project.creatorName}
                                                        </div>
                                                        {project.startDate && (
                                                            <div>
                                                                <strong>Start:</strong> {new Date(project.startDate).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                        {project.endDate && (
                                                            <div>
                                                                <strong>End:</strong> {new Date(project.endDate).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {project.teamMembers && project.teamMembers.length > 0 && (
                                                        <div className="team-members">
                                                            <strong>Team Members ({project.teamMembers.length}):</strong>
                                                            <div className="team-list">
                                                                {project.teamMembers.map(member => (
                                                                    <span key={member.id} className="team-member-badge">
                                                                        {member.name}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {project.images && project.images.length > 0 && (
                                                        <div className="project-images">
                                                            <strong>Progress Images ({project.images.length}):</strong>
                                                            <div className="image-grid">
                                                                {project.images.map(img => (
                                                                    <a
                                                                        key={img.id}
                                                                        href={`${API_URL}${img.imagePath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="image-link"
                                                                    >
                                                                        Day {img.dayNumber}{img.isFinal ? ' (Final)' : ''}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="project-footer">
                                                        <small>Created: {new Date(project.createdAt).toLocaleString()}</small>
                                                    </div>
                                                </div>
                                            )}
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
