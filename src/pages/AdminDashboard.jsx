import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Phone, CheckCircle, Clock, XCircle, RefreshCw, Users, Plus, UserCheck, UserX, Briefcase, ChevronDown, ChevronUp, Key, Zap, Scale, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('complaints');
    const [complaints, setComplaints] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
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
        department: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
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

    // User Editing State
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [showSolarModal, setShowSolarModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserForm, setEditUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        pincode: ''
    });
    const [userSolarInstallations, setUserSolarInstallations] = useState([]);
    const [newSolar, setNewSolar] = useState({
        capacity: '',
        installationDate: '',
        address: '',
        status: 'Active'
    });
    const [showEquipmentModal, setShowEquipmentModal] = useState(false);
    const [userWeighingEquipment, setUserWeighingEquipment] = useState([]);
    const [newEquipment, setNewEquipment] = useState({
        equipmentType: '',
        model: '',
        capacity: '',
        serialNumber: '',
        installationDate: '',
        location: '',
        status: 'Active',
        notes: ''
    });

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

            const [complaintsRes, enquiriesRes, employeesRes, projectsRes, usersRes] = await Promise.all([
                fetch(`${API_URL}/api/complaints/all`, { headers }),
                fetch(`${API_URL}/api/enquiries`, { headers }),
                fetch(`${API_URL}/api/admin/employees`, { headers }),
                fetch(`${API_URL}/api/projects`, { headers }),
                fetch(`${API_URL}/api/admin/users`, { headers })
            ]);

            if (complaintsRes.ok) setComplaints(await complaintsRes.json());
            if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json());
            if (employeesRes.ok) setEmployees(await employeesRes.json());
            if (projectsRes.ok) setProjects(await projectsRes.json());
            if (usersRes.ok) setUsers(await usersRes.json());
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

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEmployee({ ...newEmployee, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const createEmployee = async (e) => {
        e.preventDefault();

        const headers = getAuthHeader();
        if (!headers.Authorization) {
            alert('Session expired. Please log out and log in again.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('email', newEmployee.email);
            formData.append('password', newEmployee.password);
            formData.append('name', newEmployee.name);
            formData.append('phone', newEmployee.phone);
            formData.append('department', newEmployee.department);
            if (newEmployee.photo) {
                formData.append('photo', newEmployee.photo);
            }

            const response = await fetch(`${API_URL}/api/admin/employees`, {
                method: 'POST',
                headers: getAuthHeader(),
                body: formData
            });

            if (response.ok) {
                setShowEmployeeForm(false);
                setNewEmployee({
                    email: '',
                    password: '',
                    name: '',
                    phone: '',
                    department: '',
                    photo: null
                });
                setPhotoPreview(null);
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

    const toggleUserVerification = async (userId, currentStatus) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/users/${userId}/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ isVerified: !currentStatus })
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(users.map(u => u.id === userId ? { ...u, isVerified: data.isVerified } : u));
                setUpdateStatus({ show: true, success: true, message: data.message });
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error verifying user:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to update user status' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(editUserForm)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editUserForm } : u));
                setShowEditUserModal(false);
                setUpdateStatus({ show: true, success: true, message: 'User updated successfully' });
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to update user' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
    };

    const handleShowSolarModal = async (user) => {
        setSelectedUser(user);
        setNewSolar({
            capacity: '',
            installationDate: '',
            address: user.address || '',
            status: 'Active'
        });

        try {
            const response = await fetch(`${API_URL}/api/admin/solar-installations/user/${user.id}`, {
                headers: getAuthHeader()
            });
            if (response.ok) {
                const data = await response.json();
                setUserSolarInstallations(data);
                setShowSolarModal(true);
            }
        } catch (error) {
            console.error('Error fetching solar installations:', error);
        }
    };

    const handleAddSolar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/solar-installations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ ...newSolar, userId: selectedUser.id })
            });

            if (response.ok) {
                const createdSolar = await response.json();
                setUserSolarInstallations([createdSolar, ...userSolarInstallations]);
                setNewSolar({
                    capacity: '',
                    installationDate: '',
                    address: selectedUser.address || '',
                    status: 'Active'
                });
                setUpdateStatus({ show: true, success: true, message: 'Solar installation added successfully' });
            } else {
                throw new Error('Failed to add installation');
            }
        } catch (error) {
            console.error('Error adding solar installation:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to add solar installation' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
    };

    const handleDeleteSolar = async (solarId) => {
        if (!confirm('Are you sure you want to delete this installation?')) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/solar-installations/${solarId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });

            if (response.ok) {
                setUserSolarInstallations(userSolarInstallations.filter(s => s.id !== solarId));
                setUpdateStatus({ show: true, success: true, message: 'Installation deleted successfully' });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting solar installation:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to delete installation' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
    };

    const handleShowEquipmentModal = async (user) => {
        setSelectedUser(user);
        setNewEquipment({
            equipmentType: '',
            model: '',
            capacity: '',
            serialNumber: '',
            installationDate: '',
            location: user.address || '',
            status: 'Active',
            notes: ''
        });

        try {
            const response = await fetch(`${API_URL}/api/admin/weighing-equipment/user/${user.id}`, {
                headers: getAuthHeader()
            });
            if (response.ok) {
                const data = await response.json();
                setUserWeighingEquipment(data);
                setShowEquipmentModal(true);
            }
        } catch (error) {
            console.error('Error fetching weighing equipment:', error);
        }
    };

    const handleAddEquipment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/weighing-equipment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify({ ...newEquipment, userId: selectedUser.id })
            });

            if (response.ok) {
                const createdEquipment = await response.json();
                setUserWeighingEquipment([createdEquipment, ...userWeighingEquipment]);
                setNewEquipment({
                    equipmentType: '',
                    model: '',
                    capacity: '',
                    serialNumber: '',
                    installationDate: '',
                    location: selectedUser.address || '',
                    status: 'Active',
                    notes: ''
                });
                setUpdateStatus({ show: true, success: true, message: 'Weighing equipment added successfully' });
            } else {
                throw new Error('Failed to add equipment');
            }
        } catch (error) {
            console.error('Error adding weighing equipment:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to add weighing equipment' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
    };

    const handleDeleteEquipment = async (equipmentId) => {
        if (!confirm('Are you sure you want to delete this equipment?')) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/weighing-equipment/${equipmentId}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });

            if (response.ok) {
                setUserWeighingEquipment(userWeighingEquipment.filter(e => e.id !== equipmentId));
                setUpdateStatus({ show: true, success: true, message: 'Equipment deleted successfully' });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting weighing equipment:', error);
            setUpdateStatus({ show: true, success: false, message: 'Failed to delete equipment' });
        }
        setTimeout(() => setUpdateStatus(null), 3000);
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
                    <button
                        className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <UserCheck size={18} />
                        Users ({users.length})
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

                                                        {/* Visit Schedule Display */}
                                                        {complaint.visitSchedule && (
                                                            <div style={{
                                                                marginTop: '15px',
                                                                padding: '12px',
                                                                backgroundColor: '#dcfce7',
                                                                borderRadius: '6px',
                                                                border: '1px solid #86efac'
                                                            }}>
                                                                <strong style={{ color: '#166534', display: 'block', marginBottom: '8px' }}>
                                                                    📅 Scheduled Visit
                                                                </strong>
                                                                <div style={{ fontSize: '14px', color: '#166534' }}>
                                                                    <div><strong>Date:</strong> {new Date(complaint.visitSchedule.scheduledDate).toLocaleDateString('en-US', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}</div>
                                                                    <div><strong>Time:</strong> {complaint.visitSchedule.scheduledTime}</div>
                                                                    {complaint.visitSchedule.notes && (
                                                                        <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                                                                            <strong>Note:</strong> {complaint.visitSchedule.notes}
                                                                        </div>
                                                                    )}
                                                                    <div style={{ marginTop: '5px', fontSize: '12px', opacity: 0.8 }}>
                                                                        Scheduled by: {complaint.assignedEmployeeName || 'Employee'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

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

                                                    {/* Visit Schedule Display */}
                                                    {enquiry.visitSchedule && (
                                                        <div style={{
                                                            marginTop: '15px',
                                                            padding: '12px',
                                                            backgroundColor: '#dcfce7',
                                                            borderRadius: '6px',
                                                            border: '1px solid #86efac'
                                                        }}>
                                                            <strong style={{ color: '#166534', display: 'block', marginBottom: '8px' }}>
                                                                📅 Scheduled Visit
                                                            </strong>
                                                            <div style={{ fontSize: '14px', color: '#166534' }}>
                                                                <div><strong>Date:</strong> {new Date(enquiry.visitSchedule.scheduledDate).toLocaleDateString('en-US', {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}</div>
                                                                <div><strong>Time:</strong> {enquiry.visitSchedule.scheduledTime}</div>
                                                                {enquiry.visitSchedule.notes && (
                                                                    <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                                                                        <strong>Note:</strong> {enquiry.visitSchedule.notes}
                                                                    </div>
                                                                )}
                                                                <div style={{ marginTop: '5px', fontSize: '12px', opacity: 0.8 }}>
                                                                    Scheduled by: {enquiry.assignedEmployeeName || 'Employee'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

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
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                                                Employee Photo (Optional)
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                style={{
                                                    padding: '8px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    width: '100%'
                                                }}
                                            />
                                            {photoPreview && (
                                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                                    <img
                                                        src={photoPreview}
                                                        alt="Preview"
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: '3px solid #2563eb'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
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
                                                    {employee.photoPath ? (
                                                        <img
                                                            src={`${API_URL}${employee.photoPath}`}
                                                            alt={employee.name}
                                                            style={{
                                                                width: '48px',
                                                                height: '48px',
                                                                borderRadius: '50%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    ) : (
                                                        employee.isActive ? <UserCheck size={24} /> : <UserX size={24} />
                                                    )}
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

                    {activeTab === 'users' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="users-section"
                        >
                            <h2>User Management</h2>
                            <div className="users-list">
                                {users.length === 0 ? (
                                    <div className="empty-state">
                                        <Users size={48} />
                                        <p>No users found</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone || '-'}</td>
                                                        <td>
                                                            <span className={`status-badge ${user.isVerified ? 'resolved' : 'pending'}`}>
                                                                {user.isVerified ? 'Verified' : 'Pending'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                                                                <button
                                                                    className={`action-btn ${user.isVerified ? 'danger' : 'success'}`}
                                                                    onClick={() => toggleUserVerification(user.id, user.isVerified)}
                                                                    title={user.isVerified ? "Unverify User" : "Verify User"}
                                                                >
                                                                    {user.isVerified ? <UserX size={16} /> : <UserCheck size={16} />}
                                                                </button>
                                                                <button
                                                                    className="action-btn"
                                                                    onClick={() => {
                                                                        setSelectedUser(user);
                                                                        setEditUserForm({
                                                                            name: user.name,
                                                                            email: user.email,
                                                                            phone: user.phone || '',
                                                                            address: user.address || '',
                                                                            pincode: user.pincode || ''
                                                                        });
                                                                        setShowEditUserModal(true);
                                                                    }}
                                                                    title="Edit User Details"
                                                                    style={{ background: '#e0e7ff', color: '#4338ca' }}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="action-btn"
                                                                    onClick={() => handleShowSolarModal(user)}
                                                                    title="Manage Solar Installation"
                                                                    style={{ background: '#fef3c7', color: '#d97706' }}
                                                                >
                                                                    <Zap size={16} /> Solar
                                                                </button>
                                                                <button
                                                                    className="action-btn"
                                                                    onClick={() => handleShowEquipmentModal(user)}
                                                                    title="Manage Weighing Equipment"
                                                                    style={{ background: '#dbeafe', color: '#1e40af' }}
                                                                >
                                                                    <Scale size={16} /> Equipment
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Edit User Modal */}
                {showEditUserModal && selectedUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content">
                            <div className="modal-header">
                                <h2>Edit User: {selectedUser.name}</h2>
                                <button className="close-btn" onClick={() => setShowEditUserModal(false)}>
                                    <XCircle size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateUser} className="create-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            value={editUserForm.name}
                                            onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={editUserForm.email}
                                            onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            value={editUserForm.phone}
                                            onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            value={editUserForm.address}
                                            onChange={(e) => setEditUserForm({ ...editUserForm, address: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pincode</label>
                                        <input
                                            type="text"
                                            value={editUserForm.pincode}
                                            onChange={(e) => setEditUserForm({ ...editUserForm, pincode: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">Update User</button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowEditUserModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Solar Installation Modal */}
                {showSolarModal && selectedUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content" style={{ maxWidth: '800px' }}>
                            <div className="modal-header">
                                <h2>Solar Installations: {selectedUser.name}</h2>
                                <button className="close-btn" onClick={() => setShowSolarModal(false)}>
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="solar-installations-list" style={{ marginBottom: '2rem' }}>
                                <h3>Existing Installations</h3>
                                {userSolarInstallations.length === 0 ? (
                                    <p>No solar installations found for this user.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Capacity</th>
                                                    <th>Date</th>
                                                    <th>Location</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userSolarInstallations.map((solar) => (
                                                    <tr key={solar.id}>
                                                        <td>{solar.capacity}</td>
                                                        <td>{new Date(solar.installationDate).toLocaleDateString()}</td>
                                                        <td>{solar.address}</td>
                                                        <td>{solar.status}</td>
                                                        <td>
                                                            <button
                                                                className="action-btn danger"
                                                                onClick={() => handleDeleteSolar(solar.id)}
                                                                title="Delete Installation"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleAddSolar} className="create-form" style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <h3>Add New Installation</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Capacity (kW) *</label>
                                        <input
                                            type="text"
                                            value={newSolar.capacity}
                                            onChange={(e) => setNewSolar({ ...newSolar, capacity: e.target.value })}
                                            required
                                            placeholder="e.g. 5kW"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Installation Date *</label>
                                        <input
                                            type="date"
                                            value={newSolar.installationDate}
                                            onChange={(e) => setNewSolar({ ...newSolar, installationDate: e.target.value })}
                                            required
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Installation Address / Location *</label>
                                        <input
                                            type="text"
                                            value={newSolar.address}
                                            onChange={(e) => setNewSolar({ ...newSolar, address: e.target.value })}
                                            required
                                            placeholder="Full address where solar is installed"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            value={newSolar.status}
                                            onChange={(e) => setNewSolar({ ...newSolar, status: e.target.value })}
                                            className="form-input"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn" style={{ background: '#d97706' }}>
                                        <Zap size={18} style={{ marginRight: '8px' }} />
                                        Add Installation
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Weighing Equipment Modal */}
                {showEquipmentModal && selectedUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-overlay">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="modal-content" style={{ maxWidth: '900px' }}>
                            <div className="modal-header">
                                <h2>Weighing Equipment: {selectedUser.name}</h2>
                                <button className="close-btn" onClick={() => setShowEquipmentModal(false)}>
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="solar-installations-list" style={{ marginBottom: '2rem' }}>
                                <h3>Existing Equipment</h3>
                                {userWeighingEquipment.length === 0 ? (
                                    <p>No weighing equipment found for this user.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Type</th>
                                                    <th>Model</th>
                                                    <th>Capacity</th>
                                                    <th>Serial No</th>
                                                    <th>Location</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userWeighingEquipment.map((equipment) => (
                                                    <tr key={equipment.id}>
                                                        <td>{equipment.equipmentType}</td>
                                                        <td>{equipment.model}</td>
                                                        <td>{equipment.capacity}</td>
                                                        <td>{equipment.serialNumber || '-'}</td>
                                                        <td>{equipment.location || '-'}</td>
                                                        <td>{equipment.status}</td>
                                                        <td>
                                                            <button
                                                                className="action-btn danger"
                                                                onClick={() => handleDeleteEquipment(equipment.id)}
                                                                title="Delete Equipment"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleAddEquipment} className="create-form" style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <h3>Add New Equipment</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Equipment Type *</label>
                                        <select
                                            value={newEquipment.equipmentType}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, equipmentType: e.target.value })}
                                            required
                                            className="form-input"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Platform Scale">Platform Scale</option>
                                            <option value="Weighbridge">Weighbridge</option>
                                            <option value="Bench Scale">Bench Scale</option>
                                            <option value="Crane Scale">Crane Scale</option>
                                            <option value="Counting Scale">Counting Scale</option>
                                            <option value="Analytical Balance">Analytical Balance</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Model *</label>
                                        <input
                                            type="text"
                                            value={newEquipment.model}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                                            required
                                            placeholder="e.g., WB-5000"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Capacity *</label>
                                        <input
                                            type="text"
                                            value={newEquipment.capacity}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, capacity: e.target.value })}
                                            required
                                            placeholder="e.g., 5000 kg"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Serial Number</label>
                                        <input
                                            type="text"
                                            value={newEquipment.serialNumber}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, serialNumber: e.target.value })}
                                            placeholder="Serial number"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Installation Date</label>
                                        <input
                                            type="date"
                                            value={newEquipment.installationDate}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, installationDate: e.target.value })}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            value={newEquipment.status}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, status: e.target.value })}
                                            className="form-input"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Installation Location</label>
                                        <input
                                            type="text"
                                            value={newEquipment.location}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
                                            placeholder="Full address where equipment is installed"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Notes</label>
                                        <textarea
                                            value={newEquipment.notes}
                                            onChange={(e) => setNewEquipment({ ...newEquipment, notes: e.target.value })}
                                            placeholder="Additional notes or specifications..."
                                            rows="3"
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn" style={{ background: '#1e40af' }}>
                                        <Scale size={18} style={{ marginRight: '8px' }} />
                                        Add Equipment
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

            </div>
        </div >
    );
};

export default AdminDashboard;
